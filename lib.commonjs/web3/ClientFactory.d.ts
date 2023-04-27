import { IProvider } from '../interfaces/IProvider';
import { IAccount } from '../interfaces/IAccount';
import { Client } from './Client';
/** Global connection urls, for Massa's MAINNET, TESTNET and LABNET */
export declare enum DefaultProviderUrls {
    MAINNET = "https://massa.net/api/v2",
    TESTNET = "https://test.massa.net/api/v2",
    LABNET = "https://labnet.massa.net/api/v2",
    LOCALNET = "http://127.0.0.1"
}
export declare enum DefaultWsProviderUrls {
    MAINNET = "wss://massa.net/api/websocket",
    TESTNET = "wss://test.massa.net/api/websocket",
    LABNET = "wss://labnet.massa.net/api/websocket",
    LOCALNET = "ws://localhost"
}
/** Massa Web3 Client Factory for easy initialization */
export declare class ClientFactory {
    /** Factory Method for easy initializing a client using a default provider */
    static createDefaultClient(provider: DefaultProviderUrls, retryStrategyOn?: boolean, baseAccount?: IAccount): Promise<Client>;
    /** Factory Method for easy initializing a client using a custom set of private and public providers. Suitable for local node interaction */
    static createCustomClient(providers: Array<IProvider>, retryStrategyOn?: boolean, baseAccount?: IAccount): Promise<Client>;
}
