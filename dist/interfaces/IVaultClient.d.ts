import { IVault } from "./IVault";
export interface IVaultClient {
    init(): void;
    setPassword(password: string): void;
    getPassword(): string;
    recoverVault(mnemonic: string): any;
    encryptVault(password?: string): Promise<string>;
    decryptVault(encryptedData: string, password?: string): Promise<IVault>;
    exportVault(): IVault;
    secretKeyToMnemonic(data: any): string;
    mnemonicToSecretKey(mnemonic: string): any;
}
