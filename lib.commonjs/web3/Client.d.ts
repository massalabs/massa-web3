import { IClientConfig } from '../interfaces/IClientConfig';
import { IAccount } from '../interfaces/IAccount';
import { PrivateApiClient } from './PrivateApiClient';
import { PublicApiClient } from './PublicApiClient';
import { WalletClient } from './WalletClient';
import { SmartContractsClient } from './SmartContractsClient';
import { IProvider } from '../interfaces/IProvider';
import { IClient } from '../interfaces/IClient';
import { WsSubscriptionClient } from './WsSubscriptionClient';
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
export declare const getWsProvider: (provider: DefaultProviderUrls) => DefaultWsProviderUrls;
/** Massa Web3 Client wrapping all public, private, wallet and smart-contracts-related functionalities */
export declare class Client implements IClient {
    private clientConfig;
    private publicApiClient;
    private privateApiClient;
    private walletClient;
    private smartContractsClient;
    private wsSubscriptionClient;
    constructor(clientConfig: IClientConfig, baseAccount?: IAccount);
    /** Private Api related RPC methods */
    privateApi(): PrivateApiClient;
    /** Public Api related RPC methods */
    publicApi(): PublicApiClient;
    /** Wallet related methods */
    wallet(): WalletClient;
    /** Smart Contracts related methods */
    smartContracts(): SmartContractsClient;
    /** Websocket RPC methods */
    ws(): WsSubscriptionClient | null;
    /** set new providers */
    setCustomProviders(providers: Array<IProvider>): void;
    /** get currently set providers */
    getProviders(): Array<IProvider>;
    /** return all private providers */
    getPrivateProviders(): Array<IProvider>;
    /** return all public providers */
    getPublicProviders(): Array<IProvider>;
    /** sets a new default json rpc provider */
    setNewDefaultProvider(provider: DefaultProviderUrls): void;
}
