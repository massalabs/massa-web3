import { ProviderType } from '../interfaces/IProvider';
import { Client, DefaultProviderUrls } from './Client';
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