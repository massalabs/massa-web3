import { IAccount } from "../interfaces/IAccount";
import { IClientConfig } from "../interfaces/IClientConfig";
import { WalletClient } from "./WalletClient";
export interface IVault {
    network: number;
    accounts: IAccount[];
    mnemonic: string;
}
/** Vault module that intenrally uses the wallet client */
export declare class VaultClient {
    private readonly clientConfig;
    private readonly walletClient;
    private password;
    private mnemonic;
    constructor(clientConfig: IClientConfig, walletClient: WalletClient);
    /** initializes a vault with a wallet base account */
    init(): void;
    /** set password */
    setPassword(password: string): void;
    /** get password */
    getPassword(): string;
    /** recover vault */
    recoverVault(mnemonic: string): void;
    /** export vault */
    exportVault(): IVault;
    encryptVault(password?: string): Promise<string>;
    decryptVault(encryptedData: string, password?: string): Promise<IVault>;
    private entropyHexToMnemonic;
    private mnemonicToHexEntropy;
}
