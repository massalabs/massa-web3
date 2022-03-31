"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFactory = exports.DefaultProviderUrls = void 0;
const IProvider_1 = require("../interfaces/IProvider");
const Client_1 = require("./Client");
/** Global connection urls, for Massa's MAINNET, TESTNET and LABNET */
var DefaultProviderUrls;
(function (DefaultProviderUrls) {
    DefaultProviderUrls["MAINNET"] = "https://massa.net/api/v2";
    DefaultProviderUrls["TESTNET"] = "https://test.massa.net/api/v2";
    DefaultProviderUrls["LABNET"] = "http://145.239.66.206:33035/api/v2";
})(DefaultProviderUrls = exports.DefaultProviderUrls || (exports.DefaultProviderUrls = {}));
/** Massa Web3 Client Factory for easy initialization */
class ClientFactory {
    /** Factory Method for easy initializing a client using a default provider */
    static createDefaultClient(provider, retryStrategyOn = true, baseAccount) {
        const providers = new Array({
            url: provider,
            type: IProvider_1.ProviderType.PUBLIC
        }, {
            url: provider,
            type: IProvider_1.ProviderType.PRIVATE
        });
        const client = new Client_1.Client({
            retryStrategyOn,
            providers,
        }, baseAccount);
        return client;
    }
    /** Factory Method for easy initializing a client using a custom set of private and public providers. Suitable for local node interaction */
    static createCustomClient(providers, retryStrategyOn = true, baseAccount) {
        const client = new Client_1.Client({
            retryStrategyOn,
            providers
        }, baseAccount);
        return client;
    }
}
exports.ClientFactory = ClientFactory;
//# sourceMappingURL=ClientFactory.js.map