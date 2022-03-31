import { IProvider } from "../interfaces/IProvider";
import { IAccount } from "../interfaces/IAccount";
import { Client } from "./Client";
/** Global connection urls, for Massa's MAINNET, TESTNET and LABNET */
export declare enum DefaultProviderUrls {
    MAINNET = "https://massa.net/api/v2",
    TESTNET = "https://test.massa.net/api/v2",
    LABNET = "http://145.239.66.206:33035/api/v2"
}
/** Massa Web3 Client Factory for easy initialization */
export declare class ClientFactory {
    /** Factory Method for easy initializing a client using a default provider */
    static createDefaultClient(provider: DefaultProviderUrls, retryStrategyOn?: boolean, baseAccount?: IAccount): Client;
    /** Factory Method for easy initializing a client using a custom set of private and public providers. Suitable for local node interaction */
    static createCustomClient(providers: Array<IProvider>, retryStrategyOn?: boolean, baseAccount?: IAccount): Client;
}
