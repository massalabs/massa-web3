import { IProvider } from '../interfaces/IProvider';
import { IAccount } from '../interfaces/IAccount';
import { Client, DefaultProviderUrls } from './Client';
/** Massa Web3 Client Factory for easy initialization */
export declare class ClientFactory {
    /** Factory Method for easy initializing a client using a default provider */
    static createDefaultClient(provider: DefaultProviderUrls, retryStrategyOn?: boolean, baseAccount?: IAccount): Promise<Client>;
    /** Factory Method for easy initializing a client using a custom set of private and public providers. Suitable for local node interaction */
    static createCustomClient(providers: Array<IProvider>, retryStrategyOn?: boolean, baseAccount?: IAccount): Promise<Client>;
}
