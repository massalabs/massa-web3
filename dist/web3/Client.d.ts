import { IClientConfig } from "../interfaces/IClientConfig";
import { IAccount } from "../interfaces/IAccount";
import { PrivateApiClient } from "./PrivateApiClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";
import { SmartContractsClient } from "./SmartContractsClient";
import { VaultClient } from "./VaultClient";
import { IProvider } from "../interfaces/IProvider";
import { DefaultProviderUrls } from "./ClientFactory";
import { IClient } from "../interfaces/IClient";
/** Massa Web3 Client wrapping all public, private, wallet and smart-contracts-related functionalities */
export declare class Client implements IClient {
    private publicApiClient;
    private privateApiClient;
    private walletClient;
    private smartContractsClient;
    private vaultClient;
    constructor(clientConfig: IClientConfig, baseAccount?: IAccount);
    /** starts all listeners on all sub-clients */
    startAllListeners(): void;
    /** Private Api related RPC methods */
    privateApi(): PrivateApiClient;
    /** Public Api related RPC methods */
    publicApi(): PublicApiClient;
    /** Wallet related methods */
    wallet(): WalletClient;
    /** Smart Contracts related methods */
    smartContracts(): SmartContractsClient;
    /** Vault related methods */
    vault(): VaultClient;
    /** set new providers */
    setCustomProviders(providers: Array<IProvider>): void;
    setNewDefaultProvider(provider: DefaultProviderUrls): void;
}
