import { IAccount } from './IAccount';
import { IFullAddressInfo } from './IFullAddressInfo';
import { IBalance } from './IBalance';
import { IRollsData } from './IRollsData';
import { ISignature } from './ISignature';
import { ITransactionData } from './ITransactionData';

/**
 * Interface for WalletClient objects
 *
 * @see setBaseAccount - set base account for wallet
 * @see getBaseAccount - get base account for wallet
 * @see getWalletAccounts - get all accounts in wallet
 * @see cleanWallet - delete all accounts from wallet
 * @see getWalletAccountByAddress - get account by address
 * @see addSecretKeysToWallet - add accounts to wallet by secret keys
 * @see addAccountsToWallet - add accounts to wallet
 * @see removeAddressesFromWallet - remove accounts from wallet
 * @see walletInfo - get all accounts info
 * @see signMessage - sign message by account
 * @see getAccountBalance - get account balance
 * @see sendTransaction - send transaction
 * @see buyRolls - buy rolls
 * @see sellRolls - sell rolls
 */
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
