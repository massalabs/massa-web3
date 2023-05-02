import { IProvider, ProviderType } from '../interfaces/IProvider';
import { IAccount } from '../interfaces/IAccount';
import { Client, DefaultProviderUrls, getWsProvider } from './Client';
import { IClientConfig } from '../interfaces/IClientConfig';

/** Massa Web3 Client Factory for easy initialization */
export class ClientFactory {
  /** Factory Method for easy initializing a client using a default provider */
  public static async createDefaultClient(
    provider: DefaultProviderUrls,
    retryStrategyOn = true,
    baseAccount?: IAccount,
  ): Promise<Client> {
    let publicProviderUrl = provider.toString();
    let privateProviderUrl = provider.toString();
    switch (provider) {
      // in the case of localnet append specific default ports to url
      case DefaultProviderUrls.LOCALNET: {
        privateProviderUrl = `${privateProviderUrl}:33034`;
        publicProviderUrl = `${publicProviderUrl}:33035`;
        break;
      }
      // all other networks should be public only access
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

  /** Factory Method for easy initializing a client using a custom set of private and public providers. Suitable for local node interaction */
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
