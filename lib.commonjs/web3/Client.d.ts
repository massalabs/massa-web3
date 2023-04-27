import { IClientConfig } from '../interfaces/IClientConfig';
import { IAccount } from '../interfaces/IAccount';
import { PrivateApiClient } from './PrivateApiClient';
import { PublicApiClient } from './PublicApiClient';
import { WalletClient } from './WalletClient';
import { SmartContractsClient } from './SmartContractsClient';
import { IProvider } from '../interfaces/IProvider';
import { DefaultProviderUrls, DefaultWsProviderUrls } from './ClientFactory';
import { IClient } from '../interfaces/IClient';
import { WsSubscriptionClient } from './WsSubscriptionClient';
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
