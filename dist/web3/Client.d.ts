import { IClientConfig } from "../interfaces/IClientConfig";
import { IAccount } from "../interfaces/IAccount";
import { PrivateApiClient } from "./PrivateApiClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";
import { SmartContractsClient } from "./SmartContractsClient";
/** Massa Web3 Client wrapping all public, private, wallet and smart-contracts-related functionalities */
export declare class Client {
    private publicApiClient;
    private privateApiClient;
    private walletClient;
    private smartContractsClient;
    constructor(clientConfig: IClientConfig, baseAccount?: IAccount);
    /** Private Api related RPC methods */
    privateApi(): PrivateApiClient;
    /** Public Api related RPC methods */
    publicApi(): PublicApiClient;
    /** Wallet related methods */
    wallet(): WalletClient;
    /** Smart Contracts related methods */
    smartContracts(): SmartContractsClient;
}
