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
  /**
   * Set base account for wallet
   *
   * @param baseAccount - base account as IAccount object
   */
  setBaseAccount(baseAccount: IAccount): void;

  /**
   * Get the base account.
   *
   * @returns base account as IAccount object (or null if not set)
   */
  getBaseAccount(): IAccount | null;

  /**
   * Get all accounts in wallet.
   *
   * @returns array of IAccount objects
   */
  getWalletAccounts(): Array<IAccount>;

  /**
   * Delete all accounts from wallet.
   */
  cleanWallet(): void;

  /**
   * Get an account by its address.
   *
   * @param address - address of the account
   *
   * @returns IAccount object or undefined if not found
   */
  getWalletAccountByAddress(address: string): IAccount | undefined;

  /**
   * Add accounts to wallet by secret keys.
   *
   * @param secretKeys - array of secret keys
   *
   * @returns array of IAccount objects corresponding to the secret keys
   */
  addSecretKeysToWallet(secretKeys: Array<string>): Promise<Array<IAccount>>;

  /**
   * Add accounts to wallet.
   *
   * @param accounts - array of IAccount objects
   *
   * @returns array of IAccount objects
   */
  addAccountsToWallet(accounts: Array<IAccount>): Promise<Array<IAccount>>;

  /**
   * Remove accounts from wallet using their addresses.
   *
   * @param addresses - array of addresses
   */
  removeAddressesFromWallet(addresses: Array<string>): void;

  /**
   * Get all accounts info.
   *
   * @returns array of IFullAddressInfo objects
   */
  walletInfo(): Promise<Array<IFullAddressInfo>>;

  /**
   * Sign message using a specific account.
   *
   * @param data - message to sign
   * @param accountSignerAddress - address of the account used to sign the message
   *
   * @returns the signed data as an ISignature object
   */
  signMessage(
    data: string | Buffer,
    accountSignerAddress: string,
  ): Promise<ISignature>;

  /**
   * Verify signature.
   *
   * @param data - message to verify
   * @param signature - signature to verify
   * @param accountSignerAddress - address of the account used to sign the message
   *
   * @returns true if the signature is valid, false otherwise
   */
  verifySignature(
    data: string | Buffer,
    signature: ISignature,
    accountSignerAddress: string,
  ): Promise<boolean>;

  /**
   * Get account balance.
   *
   * @param address - address of the account
   *
   * @returns IBalance object or null if not found
   */
  getAccountBalance(address: string): Promise<IBalance | null>;

  /**
   * Send transaction.
   *
   * @param txData - transaction data
   * @param executor - account used to send the transaction
   *
   * @returns array of operation ids
   */
  sendTransaction(
    txData: ITransactionData,
    executor?: IAccount,
  ): Promise<Array<string>>;

  /**
   * Buy rolls.
   *
   * @param txData - transaction data
   * @param executor - account used to send the transaction
   *
   * @returns array of operation ids
   */
  buyRolls(txData: IRollsData, executor?: IAccount): Promise<Array<string>>;

  /**
   * Sell rolls.
   *
   * @param txData - transaction data
   * @param executor - account used to send the transaction
   *
   * @returns array of operation ids
   */
  sellRolls(txData: IRollsData, executor: IAccount): Promise<Array<string>>;
}
