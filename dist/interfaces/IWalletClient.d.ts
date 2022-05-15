/// <reference types="node" />
import { IAccount } from "./IAccount";
import { IFullAddressInfo } from "./IAddressInfo";
import { IBalance } from "./IBalance";
import { IRollsData } from "./IRollsData";
import { ISignature } from "./ISignature";
import { ITransactionData } from "./ITransactionData";
export interface IWalletClient {
    setBaseAccount(baseAccount: IAccount): void;
    getBaseAccount(): IAccount;
    getWalletAccounts(): Array<IAccount>;
    cleanWallet(): void;
    getWalletAccountByAddress(address: string): IAccount | undefined;
    addPrivateKeysToWallet(privateKeys: Array<string>): Array<IAccount>;
    addAccountsToWallet(accounts: Array<IAccount>): Array<IAccount>;
    removeAddressesFromWallet(addresses: Array<string>): void;
    walletInfo(): Promise<Array<IFullAddressInfo>>;
    signMessage(data: string | Buffer, accountSignerAddress: string): ISignature;
    getAccountSequentialBalance(address: string): Promise<IBalance | null>;
    sendTransaction(txData: ITransactionData, executor: IAccount): Promise<Array<string>>;
    buyRolls(txData: IRollsData, executor: IAccount): Promise<Array<string>>;
    sellRolls(txData: IRollsData, executor: IAccount): Promise<Array<string>>;
}
