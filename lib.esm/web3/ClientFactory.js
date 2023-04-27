import { ProviderType } from '../interfaces/IProvider';
import { Client, getWsProvider } from './Client';
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
/** Massa Web3 Client Factory for easy initialization */
export class ClientFactory {
    /** Factory Method for easy initializing a client using a default provider */
    static async createDefaultClient(provider, retryStrategyOn = true, baseAccount) {
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
            },
            {
                url: privateProviderUrl,
                type: ProviderType.PRIVATE,
            },
            {
                url: getWsProvider(provider),
                type: ProviderType.WS,
            },
        ];
        const client = new Client({
            retryStrategyOn,
            providers,
        }, baseAccount);
        if (baseAccount)
            await client.wallet().setBaseAccount(baseAccount);
        return client;
    }
    /** Factory Method for easy initializing a client using a custom set of private and public providers. Suitable for local node interaction */
    static async createCustomClient(providers, retryStrategyOn = true, baseAccount) {
        const client = new Client({
            retryStrategyOn,
            providers,
        }, baseAccount);
        if (baseAccount)
            await client.wallet().setBaseAccount(baseAccount);
        return client;
    }
}
//# sourceMappingURL=ClientFactory.js.map