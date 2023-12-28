import { IProvider, ProviderType } from '../interfaces/IProvider';
import { IAccount } from '../interfaces/IAccount';
import { Client } from './Client';
import { IClientConfig } from '../interfaces/IClientConfig';
import {
  IAccount as IAccountWalletProvider,
  IProvider as IProviderWalletProvider,
} from '@massalabs/wallet-provider';
import { Web3Account } from './accounts/Web3Account';
import { PublicApiClient } from './PublicApiClient';
import { WalletProviderAccount } from './accounts/WalletProviderAccount';

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
 * The client can be initialized using a default provider (MAINNET, TESTNET, LABNET, LOCALNET and BUILDNET)
 * or a custom set of providers.
 */
export class ClientFactory {
  /**
   * Creates a default client using a default provider (MAINNET, TESTNET, LABNET, LOCALNET and BUILDNET).
   *
   * @param provider - Default provider to be used by the client.
   * @param chainId - Chain id matching the network used by the provider
   * @param retryStrategyOn - Whether to retry failed requests.
   * @param baseAccount - Base account to use with the client (optional).
   *
   * @returns A promise that resolves to a Client object.
   */
  public static async createDefaultClient(
    provider: DefaultProviderUrls,
    chainId: bigint,
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

    let clientConfig = {
      retryStrategyOn,
      providers,
    } as IClientConfig;
    let publicApi = new PublicApiClient(clientConfig);
    let account: Web3Account = null;
    if (baseAccount) {
      account = new Web3Account(baseAccount, publicApi, chainId);
    }
    const client: Client = new Client(
      {
        retryStrategyOn,
        providers,
      } as IClientConfig,
      account,
      publicApi,
    );
    return client;
  }

  /**
   * Initializes a new client using a custom set of private and public providers.
   *
   * @remarks
   * Suitable for local node interactions.
   *
   * @param providers - Array of providers to be used by the client.
   * @param chainId - Chain id matching the network used by the provider
   * @param retryStrategyOn - Whether to retry failed requests.
   * @param baseAccount - Base account to be used by the client (optional).
   *
   * @returns A promise that resolves to a Client object.
   */
  public static async createCustomClient(
    providers: Array<IProvider>,
    chainId: bigint,
    retryStrategyOn = true,
    baseAccount?: IAccount,
  ): Promise<Client> {
    let clientConfig = {
      retryStrategyOn,
      providers,
    } as IClientConfig;
    let publicApi = new PublicApiClient(clientConfig);
    let account: Web3Account = null;
    if (baseAccount) {
      account = new Web3Account(baseAccount, publicApi, chainId);
    }
    const client: Client = new Client(clientConfig, account, publicApi);
    return client;
  }

  /**
   * Initializes a new client using the wallet provider.
   *
   * @remarks
   * Suitable for local node interactions.
   *
   * @param provider - Provider from wallet provider to be used by the client.
   * @param baseAccount - Base account from the wallet provider to be used by the client.
   * @param retryStrategyOn - Whether to retry failed requests.
   *
   * @returns A promise that resolves to a Client object.
   */
  public static async fromWalletProvider(
    provider: IProviderWalletProvider,
    baseAccount: IAccountWalletProvider,
    retryStrategyOn = true,
  ): Promise<Client> {
    const providers = (await provider.getNodesUrls()).map((url) => {
      return {
        url,
        type: ProviderType.PUBLIC,
      };
    });
    const client: Client = new Client(
      {
        retryStrategyOn,
        providers,
      },
      new WalletProviderAccount(baseAccount),
    );

    return client;
  }
}
