import { IClientConfig } from "../interfaces/IClientConfig";
import { IAccount } from "../interfaces/IAccount";
import { PrivateApiClient } from "./PrivateApiClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";
import { SmartContractsClient } from "./SmartContractsClient";
import { IProvider, ProviderType } from "../interfaces/IProvider";
import { DefaultProviderUrls, DefaultWsProviderUrls } from "./ClientFactory";
import { IClient } from "../interfaces/IClient";
import { WsSubscriptionClient } from "./WsSubscriptionClient";

/**
 * Maps and retrieves a websocket provider by a default provider
 *
 * @param provider - an enum of type `DefaultProviderUrls`
 * @returns mapped `DefaultWsProviderUrls`
 */
export const getWsProvider = (provider: DefaultProviderUrls): DefaultWsProviderUrls => {
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
 * Massa Web3 Client wrapping all public, private, wallet, websockets and smart-contracts-related functionalities 
 *
 */
export class Client implements IClient {
	/** @private */
	private publicApiClient: PublicApiClient;
	/** @private */
	private privateApiClient: PrivateApiClient;
	/** @private */
	private walletClient: WalletClient;
	/** @private */
	private smartContractsClient: SmartContractsClient;
	/** @private */
	private wsSubscriptionClient: WsSubscriptionClient|null;

	/**
   * Constructs a new Client with a config and an optional base account
   *
   * @param clientConfig - Client Configuration Object.
   * @param baseAccount - Optional Base Account.
   * @returns `Client` Instance
   */
	public constructor(private clientConfig: IClientConfig, baseAccount?: IAccount) {
	  this.publicApiClient = new PublicApiClient(clientConfig);
	  this.privateApiClient = new PrivateApiClient(clientConfig);
	  this.walletClient = new WalletClient(clientConfig, this.publicApiClient, baseAccount);
	  this.smartContractsClient = new SmartContractsClient(clientConfig, this.publicApiClient, this.walletClient);
	  if (clientConfig.providers.find((provider) => provider.type === ProviderType.WS)) {
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
   * Returns the wrapped private api client
   * @readonly
   * @returns `PrivateApiClient` Instance
   */
	public privateApi(): PrivateApiClient {
	  return this.privateApiClient;
	}

	/**
   * Returns the wrapped public api client
   * @readonly
   * @returns `PublicApiClient` Instance
   */
	public publicApi(): PublicApiClient {
	  return this.publicApiClient;
	}

	/**
   * Returns the wrapped wallet client
   * @readonly
   * @returns `WalletClient` Instance
   */
	public wallet(): WalletClient {
	  return this.walletClient;
	}

	/**
   * Returns the wrapped smart contracts client
   * @readonly
   * @returns `SmartContractsClient` Instance
   */
	public smartContracts(): SmartContractsClient {
	  return this.smartContractsClient;
	}

	/**
   * Returns the websockets subscription client
   * @readonly
   * @returns `WsSubscriptionClient` instance or none if not initialized
   */
	public ws(): WsSubscriptionClient|null {
	  return this.wsSubscriptionClient;
	}

	/**
   * Sets new providers for all the wrapped clients
   * 
   * @param providers - An array of provider configurations
   */
	public setCustomProviders(providers: Array<IProvider>): void {
	  this.publicApiClient.setProviders(providers);
	  this.privateApiClient.setProviders(providers);
	  this.walletClient.setProviders(providers);
	  this.smartContractsClient.setProviders(providers);
	  this.wsSubscriptionClient.setProviders(providers);
	}

	/**
   * Returns the currently set provider configurations
   * @readonly
   * @returns An array of all currently set provider configurations
   */
	public getProviders(): Array<IProvider> {
	  return this.clientConfig.providers;
	}

	/**
   * Returns the currently set private provider configurations
   * @readonly
   * @returns An array of all currently set private provider configurations
   */
	public getPrivateProviders(): Array<IProvider> {
	  return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PRIVATE);
	}

	/**
   * Returns the currently set public provider configurations
   * @readonly
   * @returns An array of all currently set public provider configurations
   */
	public getPublicProviders(): Array<IProvider> {
	  return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PUBLIC);
	}

	/**
   * Sets a new default provider. See DefaultProviderUrls
   * 
   * @param provider - An enum variant of type `DefaultProviderUrls`
   */
	public setNewDefaultProvider(provider: DefaultProviderUrls): void {
	  const providers = [{
	    url: provider,
	    type: ProviderType.PUBLIC
	  } as IProvider,
		{
		  url: provider,
		  type: ProviderType.PRIVATE
		} as IProvider,
		{
		  url: getWsProvider(provider),
		  type: ProviderType.WS
		} as IProvider];
	  this.publicApiClient.setProviders(providers);
	  this.privateApiClient.setProviders(providers);
	  this.walletClient.setProviders(providers);
	  this.smartContractsClient.setProviders(providers);
	  this.wsSubscriptionClient.setProviders(providers);
	}
}
