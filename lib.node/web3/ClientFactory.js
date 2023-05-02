"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFactory = void 0;
const IProvider_1 = require("../interfaces/IProvider");
const Client_1 = require("./Client");
/** Massa Web3 Client Factory for easy initialization */
class ClientFactory {
    /** Factory Method for easy initializing a client using a default provider */
    static async createDefaultClient(provider, retryStrategyOn = true, baseAccount) {
        let publicProviderUrl = provider.toString();
        let privateProviderUrl = provider.toString();
        switch (provider) {
            // in the case of localnet append specific default ports to url
            case Client_1.DefaultProviderUrls.LOCALNET: {
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
                type: IProvider_1.ProviderType.PUBLIC,
            },
            {
                url: privateProviderUrl,
                type: IProvider_1.ProviderType.PRIVATE,
            },
        ];
        const client = new Client_1.Client({
            retryStrategyOn,
            providers,
        }, baseAccount);
        if (baseAccount)
            await client.wallet().setBaseAccount(baseAccount);
        return client;
    }
    /** Factory Method for easy initializing a client using a custom set of private and public providers. Suitable for local node interaction */
    static async createCustomClient(providers, retryStrategyOn = true, baseAccount) {
        const client = new Client_1.Client({
            retryStrategyOn,
            providers,
        }, baseAccount);
        if (baseAccount)
            await client.wallet().setBaseAccount(baseAccount);
        return client;
    }
}
exports.ClientFactory = ClientFactory;
//# sourceMappingURL=ClientFactory.js.map