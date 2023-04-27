import { PrivateApiClient } from './PrivateApiClient';
import { PublicApiClient } from './PublicApiClient';
import { WalletClient } from './WalletClient';
import { SmartContractsClient } from './SmartContractsClient';
import { ProviderType } from '../interfaces/IProvider';
import { WsSubscriptionClient } from './WsSubscriptionClient';
/** Global connection urls, for Massa's MAINNET, TESTNET and LABNET */
export var DefaultProviderUrls;
(function (DefaultProviderUrls) {
    DefaultProviderUrls["MAINNET"] = "https://massa.net/api/v2";
    DefaultProviderUrls["TESTNET"] = "https://test.massa.net/api/v2";
    DefaultProviderUrls["LABNET"] = "https://labnet.massa.net/api/v2";
    DefaultProviderUrls["LOCALNET"] = "http://127.0.0.1";
})(DefaultProviderUrls || (DefaultProviderUrls = {}));
export var DefaultWsProviderUrls;
(function (DefaultWsProviderUrls) {
    DefaultWsProviderUrls["MAINNET"] = "wss://massa.net/api/websocket";
    DefaultWsProviderUrls["TESTNET"] = "wss://test.massa.net/api/websocket";
    DefaultWsProviderUrls["LABNET"] = "wss://labnet.massa.net/api/websocket";
    DefaultWsProviderUrls["LOCALNET"] = "ws://localhost";
})(DefaultWsProviderUrls || (DefaultWsProviderUrls = {}));
export const getWsProvider = (provider) => {
    let wsProvider;
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
export class Client {
    clientConfig;
    publicApiClient;
    privateApiClient;
    walletClient;
    smartContractsClient;
    wsSubscriptionClient;
    constructor(clientConfig, baseAccount) {
        this.clientConfig = clientConfig;
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
    /** Private Api related RPC methods */
    privateApi() {
        return this.privateApiClient;
    }
    /** Public Api related RPC methods */
    publicApi() {
        return this.publicApiClient;
    }
    /** Wallet related methods */
    wallet() {
        return this.walletClient;
    }
    /** Smart Contracts related methods */
    smartContracts() {
        return this.smartContractsClient;
    }
    /** Websocket RPC methods */
    ws() {
        return this.wsSubscriptionClient;
    }
    /** set new providers */
    setCustomProviders(providers) {
        this.publicApiClient.setProviders(providers);
        this.privateApiClient.setProviders(providers);
        this.walletClient.setProviders(providers);
        this.smartContractsClient.setProviders(providers);
        this.wsSubscriptionClient.setProviders(providers);
    }
    /** get currently set providers */
    getProviders() {
        return this.clientConfig.providers;
    }
    /** return all private providers */
    getPrivateProviders() {
        return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PRIVATE);
    }
    /** return all public providers */
    getPublicProviders() {
        return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PUBLIC);
    }
    /** sets a new default json rpc provider */
    setNewDefaultProvider(provider) {
        const providers = [
            {
                url: provider,
                type: ProviderType.PUBLIC,
            },
            {
                url: provider,
                type: ProviderType.PRIVATE,
            },
            {
                url: getWsProvider(provider),
                type: ProviderType.WS,
            },
        ];
        this.publicApiClient.setProviders(providers);
        this.privateApiClient.setProviders(providers);
        this.walletClient.setProviders(providers);
        this.smartContractsClient.setProviders(providers);
        this.wsSubscriptionClient.setProviders(providers);
    }
}
//# sourceMappingURL=Client.js.map