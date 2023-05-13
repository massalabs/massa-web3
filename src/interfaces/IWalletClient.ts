import { IAccount } from './IAccount';
import { IFullAddressInfo } from './IFullAddressInfo';
import { IBalance } from './IBalance';
import { IRollsData } from './IRollsData';
import { ISignature } from './ISignature';
import { ITransactionData } from './ITransactionData';
import { Buffer } from 'buffer';

export interface IWalletClient {
  setBaseAccount(baseAccount: IAccount): void;
  getBaseAccount(): IAccount | null;
  getWalletAccounts(): Array<IAccount>;
  cleanWallet(): void;
  getWalletAccountByAddress(address: string): IAccount | undefined;
  addSecretKeysToWallet(secretKeys: Array<string>): Promise<Array<IAccount>>;
  addAccountsToWallet(accounts: Array<IAccount>): Promise<Array<IAccount>>;
  removeAddressesFromWallet(addresses: Array<string>): void;
  walletInfo(): Promise<Array<IFullAddressInfo>>;
  signMessage(
    data: string | Buffer,
    accountSignerAddress: string,
  ): Promise<ISignature>;
  getAccountBalance(address: string): Promise<IBalance | null>;
  sendTransaction(
    txData: ITransactionData,
    executor: IAccount,
  ): Promise<Array<string>>;
  buyRolls(txData: IRollsData, executor: IAccount): Promise<Array<string>>;
  sellRolls(txData: IRollsData, executor: IAccount): Promise<Array<string>>;
}
