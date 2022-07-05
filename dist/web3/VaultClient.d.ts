import { IClientConfig } from "../interfaces/IClientConfig";
import { WalletClient } from "./WalletClient";
import { IVault } from "../interfaces/IVault";
import { IVaultClient } from "../interfaces/IVaultClient";
/** Vault module that internally uses the wallet client */
export declare class VaultClient implements IVaultClient {
    private readonly clientConfig;
    private readonly walletClient;
    private password;
    private mnemonic;
    constructor(clientConfig: IClientConfig, walletClient: WalletClient);
    /** initializes a vault with a wallet base account */
    init(): Promise<void>;
    /** set password */
    setPassword(password: string): void;
    /** get password */
    getPassword(): string;
    /** recover vault */
    recoverVault(mnemonic: string): void;
    /** export vault */
    exportVault(): IVault;
    /** encrypt vault */
    encryptVault(password?: string): Promise<string>;
    /** decrypt vault */
    decryptVault(encryptedData: string, password?: string): Promise<IVault>;
    /** entropy to hex mnemonic */
    secretKeyToMnemonic(data: any): string;
    /** mnemonic to hex entropy */
    mnemonicToSecretKey(mnemonic: string): any;
}
