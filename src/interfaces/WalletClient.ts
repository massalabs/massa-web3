import { Account } from './Account';
import { FullAddressInfo } from './FullAddressInfo';
import { Balance } from './Balance';
import { RollsData } from './RollsData';
import { Signature } from './Signature';
import { TransactionData } from './TransactionData';

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
export interface WalletClient {
  /**
   * Set the base account.
   *
   * @param baseAccount - The base account as an Account object.
   */
  setBaseAccount(baseAccount: Account): void;

  /**
   * Get the base account.
   *
   * @returns The base account (or null if the base account is not set).
   */
  getBaseAccount(): Account | null;

  /**
   * Get all accounts in the wallet.
   *
   * @returns An array of Account objects.
   */
  getWalletAccounts(): Array<Account>;

  /**
   * Delete all accounts from the wallet.
   */
  cleanWallet(): void;

  /**
   * Get an account by its address.
   *
   * @param address - The address of the account.
   *
   * @returns An Account object or undefined if not found.
   */
  getWalletAccountByAddress(address: string): Account | undefined;

  /**
   * Add accounts to the wallet by secret keys.
   *
   * @param secretKeys - An array of secret keys.
   *
   * @returns A promise that resolves to an array of Account.
   */
  addSecretKeysToWallet(secretKeys: Array<string>): Promise<Array<Account>>;

  /**
   * Add accounts to the wallet.
   *
   * @param accounts - An array of Account objects.
   *
   * @returns A promise that resolves to an array of Account objects.
   */
  addAccountsToWallet(accounts: Array<Account>): Promise<Array<Account>>;

  /**
   * Remove accounts from the wallet using their addresses.
   *
   * @param addresses - An array of addresses.
   */
  removeAddressesFromWallet(addresses: Array<string>): void;

  /**
   * Get all accounts info.
   *
   * @returns A promise that resolves to an array of FullAddressInfo objects.
   */
  walletInfo(): Promise<Array<FullAddressInfo>>;

  /**
   * Sign a message using a specific account.
   *
   * @param data - The message to sign.
   * @param accountSignerAddress - The address of the account used to sign the message.
   *
   * @returns A promise that resolves to the signed data as an Signature object.
   */
  signMessage(
    data: string | Buffer,
    accountSignerAddress: string,
  ): Promise<Signature>;

  /**
   * Verify a signature.
   *
   * @param data - The message to verify.
   * @param signature - The signature to verify.
   * @param signerPublicKey - The public key of the signer.
   *
   * @returns A promise that resolves to a boolean (true if the signature is valid,
   * false otherwise).
   */
  verifySignature(
    data: string | Buffer,
    signature: Signature,
    signerPublicKey: string,
  ): Promise<boolean>;

  /**
   * Get the account balance.
   *
   * @param address - The address of the account.
   *
   * @returns A promise that resolves to an Balance object or null if not found.
   */
  getAccountBalance(address: string): Promise<Balance | null>;

  /**
   * Send a transaction.
   *
   * @param txData - The transaction data.
   * @param executor - The account used to send the transaction.
   *
   * @returns A promise that resolves to an array of operation ids as strings.
   */
  sendTransaction(
    txData: TransactionData,
    executor?: Account,
  ): Promise<Array<string>>;

  /**
   * Buy rolls.
   *
   * @param txData - The transaction data.
   * @param executor - The account used to send the transaction.
   *
   * @returns A promise that resolves to an array of operation ids as strings.
   */
  buyRolls(txData: RollsData, executor?: Account): Promise<Array<string>>;

  /**
   * Sell rolls.
   *
   * @param txData - The transaction data.
   * @param executor - The account used to send the transaction.
   *
   * @returns A promise that resolves to an array of operation ids as strings.
   */
  sellRolls(txData: RollsData, executor: Account): Promise<Array<string>>;
}
