import { IClientConfig } from '../interfaces/IClientConfig';
import { IAccount } from '../interfaces/IAccount';
import { PrivateApiClient } from './PrivateApiClient';
import { PublicApiClient } from './PublicApiClient';
import { WalletClient } from './WalletClient';
import { SmartContractsClient } from './SmartContractsClient';
import { IProvider, ProviderType } from '../interfaces/IProvider';
import { DefaultProviderUrls, DefaultWsProviderUrls } from './ClientFactory';
import { IClient } from '../interfaces/IClient';
import { WsSubscriptionClient } from './WsSubscriptionClient';
import { IWalletClient } from '../interfaces/IWalletClient';

/**
 * Get websocket provider from json rpc provider
 *
 * @param provider - json rpc provider
 * @returns the default websocket provider url
 *
 */
export const getWsProvider = (
  provider: DefaultProviderUrls,
): DefaultWsProviderUrls => {
  let wsProvider: DefaultWsProviderUrls;
  switch (provider) {
    case DefaultProviderUrls.LABNET: {
      wsProvider = DefaultWsProviderUrls.LABNET;
      break;
    }
    case DefaultProviderUrls.MAINNET: {
      wsProvider = DefaultWsProviderUrls.MAINNET;
      break;
    }
    case DefaultProviderUrls.LOCALNET: {
      wsProvider = DefaultWsProviderUrls.LOCALNET;
      break;
    }
    case DefaultProviderUrls.TESTNET: {
      wsProvider = DefaultWsProviderUrls.TESTNET;
      break;
    }
    default: {
      wsProvider = DefaultWsProviderUrls.LOCALNET;
    }
  }
  return wsProvider;
};

/**
 * Massa Web3 Client object wraps all public, private, wallet and smart-contracts-related functionalities
 */
export class Client implements IClient {
  private publicApiClient: PublicApiClient;
  private privateApiClient: PrivateApiClient;
  private walletClient: WalletClient;
  private smartContractsClient: SmartContractsClient;
  private wsSubscriptionClient: WsSubscriptionClient | null;

  /**
   * Constructor of the Client class
   *
   * @param clientConfig - client configuration object
   * @param baseAccount - base account to use for signing transactions (optional)
   */
  public constructor(
    private clientConfig: IClientConfig,
    baseAccount?: IAccount,
  ) {
    this.publicApiClient = new PublicApiClient(clientConfig);
    this.privateApiClient = new PrivateApiClient(clientConfig);
    this.walletClient = new WalletClient(
      clientConfig,
      this.publicApiClient,
      baseAccount,
    );
    this.smartContractsClient = new SmartContractsClient(
      clientConfig,
      this.publicApiClient,
      this.walletClient,
    );
    if (
      clientConfig.providers.find(
        (provider) => provider.type === ProviderType.WS,
      )
    ) {
      this.wsSubscriptionClient = new WsSubscriptionClient(clientConfig);
    }

    // subclients
    this.privateApi = this.privateApi.bind(this);
    this.publicApi = this.publicApi.bind(this);
    this.wallet = this.wallet.bind(this);
    this.smartContracts = this.smartContracts.bind(this);
    this.ws = this.ws.bind(this);
    // setters
    this.setCustomProviders = this.setCustomProviders.bind(this);
    this.setNewDefaultProvider = this.setNewDefaultProvider.bind(this);
    // getters
    this.getProviders = this.getProviders.bind(this);
    this.getPrivateProviders = this.getPrivateProviders.bind(this);
    this.getPublicProviders = this.getPublicProviders.bind(this);
  }

  /**
   * Get the private api related RPC methods
   *
   * @return PrivateApiClient object
   */
  public privateApi(): PrivateApiClient {
    return this.privateApiClient;
  }

  /**
   * Get the public api related RPC methods
   *
   * @return PublicApiClient object
   */
  public publicApi(): PublicApiClient {
    return this.publicApiClient;
  }

  /**
   * Get the Wallet related methods
   *
   * @return WalletClient object
   */
  public wallet(): IWalletClient {
    return this.walletClient;
  }

  /**
   * Get the smart Contracts related methods
   *
   * @return SmartContractsClient object
   */
  public smartContracts(): SmartContractsClient {
    return this.smartContractsClient;
  }

  /**
   * Get the websocket RPC methods
   *
   * @return WsSubscriptionClient object or null if no ws provider is set
   */
  public ws(): WsSubscriptionClient | null {
    return this.wsSubscriptionClient;
  }

  /**
   * Set new providers
   *
   * @param providers - array of providers to set
   */
  public setCustomProviders(providers: Array<IProvider>): void {
    this.publicApiClient.setProviders(providers);
    this.privateApiClient.setProviders(providers);
    this.walletClient.setProviders(providers);
    this.smartContractsClient.setProviders(providers);
    this.wsSubscriptionClient.setProviders(providers);
  }

  /**
   * Get the currently set providers
   *
   * @return array of the known providers
   */
  public getProviders(): Array<IProvider> {
    return this.clientConfig.providers;
  }

  /**
   * Get all private providers
   *
   * @return all private providers
   */
  public getPrivateProviders(): Array<IProvider> {
    return this.clientConfig.providers.filter(
      (provider) => provider.type === ProviderType.PRIVATE,
    );
  }

  /**
   * Get all public providers
   *
   * @return all public providers
   */
  public getPublicProviders(): Array<IProvider> {
    return this.clientConfig.providers.filter(
      (provider) => provider.type === ProviderType.PUBLIC,
    );
  }

  /**
   * Set a new default json rpc provider
   *
   * @param provider - The new default provider to set
   */
  public setNewDefaultProvider(provider: DefaultProviderUrls): void {
    const providers = [
      {
        url: provider,
        type: ProviderType.PUBLIC,
      } as IProvider,
      {
        url: provider,
        type: ProviderType.PRIVATE,
      } as IProvider,
      {
        url: getWsProvider(provider),
        type: ProviderType.WS,
      } as IProvider,
    ];
    this.publicApiClient.setProviders(providers);
    this.privateApiClient.setProviders(providers);
    this.walletClient.setProviders(providers);
    this.smartContractsClient.setProviders(providers);
    this.wsSubscriptionClient.setProviders(providers);
  }
}
