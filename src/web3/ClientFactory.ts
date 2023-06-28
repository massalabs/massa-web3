import { IProvider, ProviderType } from '../interfaces/IProvider';
import { IAccount } from '../interfaces/IAccount';
import { Client } from './Client';
import { IClientConfig } from '../interfaces/IClientConfig';

/** Global connection urls, for Massa's MAINNET, TESTNET, LABNET, LOCALNET and BUILDNET */
export enum DefaultProviderUrls {
  MAINNET = 'https://massa.net/api/v2',
  TESTNET = 'https://test.massa.net/api/v2',
  BUILDNET = 'https://buildnet.massa.net/api/v2',
  LABNET = 'https://labnet.massa.net/api/v2',
  LOCALNET = 'http://127.0.0.1',
}

/**
 * Massa Web3 ClientFactory class allows you to easily initialize a client to
 * connect to the massa blockchain.
 *
 * @remarks
 * The client can be initialized using a default provider (MAINNET, TESTNET, LABNET, LOCALNET)
 * or a custom set of providers.
 */
export class ClientFactory {
  /**
   * Creates a default client using a default provider (MAINNET, TESTNET, LABNET, LOCALNET).
   *
   * @param provider - Default provider to be used by the client.
   * @param retryStrategyOn - Whether to retry failed requests.
   * @param baseAccount - Base account to use with the client (optional).
   *
   * @returns A promise that resolves to a Client object.
   */
  public static async createDefaultClient(
    provider: DefaultProviderUrls,
    retryStrategyOn = true,
    baseAccount?: IAccount,
  ): Promise<Client> {
    let publicProviderUrl = provider.toString();
    let privateProviderUrl = provider.toString();
    switch (provider) {
      // in the case of LocalNet append specific default ports to url.
      case DefaultProviderUrls.LOCALNET: {
        privateProviderUrl = `${privateProviderUrl}:33034`;
        publicProviderUrl = `${publicProviderUrl}:33035`;
        break;
      }
      // all other networks should have public access only.
      default: {
        break;
      }
    }

    const providers = [
      {
        url: publicProviderUrl,
        type: ProviderType.PUBLIC,
      } as IProvider,
      {
        url: privateProviderUrl,
        type: ProviderType.PRIVATE,
      } as IProvider,
    ];

    const client: Client = new Client(
      {
        retryStrategyOn,
        providers,
      } as IClientConfig,
      baseAccount,
    );

    if (baseAccount) await client.wallet().setBaseAccount(baseAccount);

    return client;
  }

  /**
   * Initializes a new client using a custom set of private and public providers.
   *
   * @remarks
   * Suitable for local node interactions.
   *
   * @param providers - Array of providers to be used by the client.
   * @param retryStrategyOn - Whether to retry failed requests.
   * @param baseAccount - Base account to be used by the client (optional).
   *
   * @returns A promise that resolves to a Client object.
   */
  public static async createCustomClient(
    providers: Array<IProvider>,
    retryStrategyOn = true,
    baseAccount?: IAccount,
  ): Promise<Client> {
    const client: Client = new Client(
      {
        retryStrategyOn,
        providers,
      } as IClientConfig,
      baseAccount,
    );

    if (baseAccount) await client.wallet().setBaseAccount(baseAccount);

    return client;
  }
}
