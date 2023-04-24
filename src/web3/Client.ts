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
import {
  providers as getExternalWalletProviders,
  IProvider as IExternalWalletProvider,
} from '@massalabs/wallet-provider';
import { Timeout } from '../utils/time';

const EXTERNAL_WALLET_PROVIDERS_DISCOVERY_TIMEOUT_MS = 1000;

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

/** Massa Web3 Client wrapping all public, private, wallet and smart-contracts-related functionalities */
export class Client implements IClient {
  private publicApiClient: PublicApiClient;
  private privateApiClient: PrivateApiClient;
  private walletClient: WalletClient;
  private smartContractsClient: SmartContractsClient;
  private wsSubscriptionClient: WsSubscriptionClient | null;
  private externalWalletProvidersDiscoveryTimeoutId: Timeout | null = null;
  private externalWalletProvidersDiscoveryInterval =
    EXTERNAL_WALLET_PROVIDERS_DISCOVERY_TIMEOUT_MS;
  private externalWalletProviders: IExternalWalletProvider[] = [];

  public constructor(
    private clientConfig: IClientConfig,
    baseAccount?: IAccount,
    withExternalProviderDiscovery?: boolean,
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
    // client discovery
    this.clientDiscoveryCallback = this.clientDiscoveryCallback.bind(this);
    this.stopClientDiscovery = this.stopClientDiscovery.bind(this);
    this.startClientDiscovery = this.startClientDiscovery.bind(this);

    // start client discovery
    if (withExternalProviderDiscovery) {
      this.startClientDiscovery();
    }
  }

  /**
   * A callback method that triggers a ping of the Thyra's server
   *
   * @returns void
   */
  private async clientDiscoveryCallback(): Promise<void> {
    let externalWalletProviders: IExternalWalletProvider[] | null = null;
    try {
      externalWalletProviders = await getExternalWalletProviders();
    } catch (ex) {
      console.error(`Error getting external wallet providers`);
    }
    if (externalWalletProviders) {
      // add only newly discovered providers
      // NOTE: we dont remove providers which we have been disconnected from
      const alreadyDiscoveredProviders = new Set(
        this.externalWalletProviders.map((p) => p.name()),
      );
      for (const item of externalWalletProviders) {
        if (!alreadyDiscoveredProviders.has(item.name())) {
          this.externalWalletProviders.push(item);
        }
      }
      this.externalWalletProviders = externalWalletProviders;
    }

    // reset the interval
    this.externalWalletProvidersDiscoveryTimeoutId = new Timeout(
      this.externalWalletProvidersDiscoveryInterval,
      () => this.clientDiscoveryCallback(),
    );
  }

  /**
   * A method to stop listening for a connection to Thyra's server
   *
   * @returns void
   */
  public stopClientDiscovery(): void {
    if (this.externalWalletProvidersDiscoveryTimeoutId)
      this.externalWalletProvidersDiscoveryTimeoutId.clear();
  }

  /**
   * A method to start listening for a connection to Thyra's server.
   *
   * @returns void
   */
  public startClientDiscovery(): void {
    const that = this;
    if (this.externalWalletProvidersDiscoveryTimeoutId) {
      return;
    }
    this.externalWalletProvidersDiscoveryTimeoutId = new Timeout(
      this.externalWalletProvidersDiscoveryInterval,
      () => that.clientDiscoveryCallback(),
    );
  }

  /** Private Api related RPC methods */
  public privateApi(): PrivateApiClient {
    return this.privateApiClient;
  }

  /** Public Api related RPC methods */
  public publicApi(): PublicApiClient {
    return this.publicApiClient;
  }

  /** Wallet related methods */
  public wallet(): WalletClient {
    return this.walletClient;
  }

  /** Smart Contracts related methods */
  public smartContracts(): SmartContractsClient {
    return this.smartContractsClient;
  }

  /** Websocket RPC methods */
  public ws(): WsSubscriptionClient | null {
    return this.wsSubscriptionClient;
  }

  /** External Wallet Providers */
  public externalWallets(): IExternalWalletProvider[] {
    return this.externalWalletProviders;
  }

  /** set new providers */
  public setCustomProviders(providers: Array<IProvider>): void {
    this.publicApiClient.setProviders(providers);
    this.privateApiClient.setProviders(providers);
    this.walletClient.setProviders(providers);
    this.smartContractsClient.setProviders(providers);
    this.wsSubscriptionClient.setProviders(providers);
  }

  /** get currently set providers */
  public getProviders(): Array<IProvider> {
    return this.clientConfig.providers;
  }

  /** return all private providers */
  public getPrivateProviders(): Array<IProvider> {
    return this.clientConfig.providers.filter(
      (provider) => provider.type === ProviderType.PRIVATE,
    );
  }

  /** return all public providers */
  public getPublicProviders(): Array<IProvider> {
    return this.clientConfig.providers.filter(
      (provider) => provider.type === ProviderType.PUBLIC,
    );
  }

  /** sets a new default json rpc provider */
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
