import { IClientConfig } from '../interfaces/IClientConfig';
import { IAccount } from '../interfaces/IAccount';
import { BaseClient } from './BaseClient';
import { IAddressInfo } from '../interfaces/IAddressInfo';
import { IFullAddressInfo } from '../interfaces/IFullAddressInfo';
import { ISignature } from '../interfaces/ISignature';
import {
  base58Decode,
  base58Encode,
  varintEncode,
  hashBlake3,
} from '../utils/Xbqcrypto';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { trySafeExecute } from '../utils/retryExecuteFunction';
import { ITransactionData } from '../interfaces/ITransactionData';
import { PublicApiClient } from './PublicApiClient';
import { IRollsData } from '../interfaces/IRollsData';
import { IBalance } from '../interfaces/IBalance';
import * as ed from '@noble/ed25519';
import { IWalletClient } from '../interfaces/IWalletClient';
import { fromMAS } from '../utils/converters';

import { Address, SecretKey, PublicKey } from '../utils/keyAndAddresses';
import { IBaseAccount } from '../interfaces/IBaseAccount';
import { Web3Account } from './accounts/Web3Account';
import { type } from 'os';
const SECRET_KEY_PREFIX = 'S';
const VERSION_NUMBER = 0;
const MAX_WALLET_ACCOUNTS = 256;

/**
 * A client class for interacting with wallets, which can seamlessly work with WebExtensions.
 *
 * @remarks
 * The WalletClient manages multiple accounts and handles operations such as transaction signing,
 * fetching account information, and interacting with the blockchain. It extends the BaseClient
 * class and implements the IWalletClient interface.
 */
export class WalletClient extends BaseClient implements IWalletClient {
  private wallet: Array<IAccount> = [];
  private baseAccount?: IBaseAccount;

  /**
   * Constructor of the {@link WalletClient} class.
   *
   * @param clientConfig - Configuration parameters for the client.
   * @param publicApiClient - A {@link PublicApiClient} instance used for making API calls.
   * @param baseAccount - (Optional) An {@link IAccount} to set as the base account for the wallet.
   */
  public constructor(
    clientConfig: IClientConfig,
    private readonly publicApiClient: PublicApiClient,
    baseAccount?: IBaseAccount,
  ) {
    super(clientConfig);
    if (baseAccount) {
      this.baseAccount = baseAccount;
    }

    // ========== bind wallet methods ========= //

    // wallet methods
    this.cleanWallet = this.cleanWallet.bind(this);
    this.getWalletAccounts = this.getWalletAccounts.bind(this);
    this.getWalletAccountByAddress = this.getWalletAccountByAddress.bind(this);
    this.addSecretKeysToWallet = this.addSecretKeysToWallet.bind(this);
    this.addAccountsToWallet = this.addAccountsToWallet.bind(this);
    this.removeAddressesFromWallet = this.removeAddressesFromWallet.bind(this);
    this.walletInfo = this.walletInfo.bind(this);
    this.signMessage = this.signMessage.bind(this);
    this.getWalletAddressesInfo = this.getWalletAddressesInfo.bind(this);
    this.setBaseAccount = this.setBaseAccount.bind(this);
    this.getBaseAccount = this.getBaseAccount.bind(this);
    this.sendTransaction = this.sendTransaction.bind(this);
    this.sellRolls = this.sellRolls.bind(this);
    this.buyRolls = this.buyRolls.bind(this);
    this.getAccountBalance = this.getAccountBalance.bind(this);
  }

  /**
   * Sets a provided account as the default (base) account for the wallet.
   *
   * @param baseAccount - An {@link IAccount} to be set as the base account.
   *
   * @returns A Promise that resolves to `void` when the base account has been set successfully.
   */
  public async setBaseAccount(baseAccount: IBaseAccount): Promise<void> {
    if (!baseAccount.address()) {
      throw new Error('Invalid base account address');
    }
    await baseAccount.verify();
    this.baseAccount = baseAccount;
  }

  /**
   * Retrieves the default (base) account of the wallet.
   *
   * @returns The default {@link IAccount} of the wallet. If no default account is set, it returns `null`.
   */
  public getBaseAccount(): IBaseAccount | null {
    return this.baseAccount;
  }

  /**
   * Retrieves all accounts stored in the wallet.
   *
   * @returns An array of {@link IAccount} objects.
   */
  public getWalletAccounts(): Array<IAccount> {
    return this.wallet;
  }

  /**
   * Removes all accounts from the wallet.
   */
  public cleanWallet(): void {
    this.wallet.length = 0;
    this.baseAccount = null;
  }

  /**
   * Retrieves a wallet account based on its address.
   *
   * @param address - The address of the account to retrieve.
   *
   * @returns The {@link IAccount} associated with the provided address
   * or `undefined` if no account with the given address is found in the wallet.
   */
  public getWalletAccountByAddress(address: string): IAccount | undefined {
    return this.wallet.find(
      (w) => w.address.toLowerCase() === address.toLowerCase(),
    ); // ignore case for flexibility
  }

  /**
   * Adds a set of private keys to the wallet.
   *
   * @param secretKeys - An array of base58 encoded private keys to be added to the wallet.
   *
   * @throws if the number of private keys exceeds the maximum limit.
   *
   * @returns A Promise that resolves to an array of {@link IAccount} objects.
   */
  public async addSecretKeysToWallet(
    secretKeys: Array<string>,
  ): Promise<Array<IAccount>> {
    if (secretKeys.length > MAX_WALLET_ACCOUNTS) {
      throw new Error(
        `Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted private keys: ${secretKeys.length}`,
      );
    }
    const accountsToCreate: IAccount[] = [];

    const uniqueSecretKeys = secretKeys.filter(
      (value, index, self) => self.indexOf(value) === index,
    );

    for (const secretKeyBase58Encoded of uniqueSecretKeys) {
      const secretKey = new SecretKey(secretKeyBase58Encoded);
      const publicKey: PublicKey = await secretKey.getPublicKey();
      const address: Address = new Address(publicKey);

      if (!this.getWalletAccountByAddress(address.base58Encode)) {
        accountsToCreate.push({
          secretKey: secretKeyBase58Encoded,
          publicKey: publicKey.base58Encode,
          address: address.base58Encode,
        } as IAccount);
      }
    }

    this.wallet.push(...accountsToCreate);
    return accountsToCreate;
  }

  /**
   * Adds a set of accounts to the wallet.
   *
   * @privateRemarks
   * Each account must have a base58 encoded random entropy or private key.
   *
   * @param accounts - An array of accounts ({@link IAccount} objects) to be added to the wallet.
   *
   * @throws
   * - If the number of accounts exceeds the {@link MAX_WALLET_ACCOUNTS} limit
   * - If an account is missing a private key
   * - If a submitted public key doesn't correspond to the associated private key
   * - If an account address doesn't correspond to the private key-derived address
   *
   * @returns A Promise that resolves to an array of {@link IAccount} objects.
   */
  public async addAccountsToWallet(
    accounts: Array<IAccount>,
  ): Promise<Array<IAccount>> {
    if (accounts.length > MAX_WALLET_ACCOUNTS) {
      throw new Error(
        `Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted accounts: ${accounts.length}`,
      );
    }
    const accountsAdded: Array<IAccount> = [];

    for (const account of accounts) {
      if (!account.secretKey) {
        throw new Error('Missing account private key');
      }

      // Create the secret key object
      const secretKeyBase58Encoded: string = account.secretKey;
      const secretKey: SecretKey = new SecretKey(secretKeyBase58Encoded);

      // create the public key object
      const publicKey: PublicKey = await secretKey.getPublicKey();
      if (account.publicKey && account.publicKey !== publicKey.base58Encode) {
        throw new Error(
          'Public key does not correspond the the private key submitted',
        );
      }

      // get wallet account address
      const address: Address = new Address(publicKey);
      if (account.address && account.address !== address.base58Encode) {
        throw new Error(
          'Account address not correspond the the address submitted',
        );
      }

      if (!this.getWalletAccountByAddress(address.base58Encode)) {
        accountsAdded.push({
          address: address.base58Encode,
          secretKey: secretKeyBase58Encoded,
          publicKey: publicKey.base58Encode,
        } as IAccount);
      }
    }

    this.wallet.push(...accountsAdded);
    return accountsAdded;
  }

  /**
   * Remove a list of addresses from the wallet.
   *
   * @param addresses - An array of addresses to remove from the wallet.
   */
  public removeAddressesFromWallet(addresses: Array<string>): void {
    for (const address of addresses) {
      const index = this.wallet.findIndex((w) => w.address === address);
      if (index > -1) {
        this.wallet.splice(index, 1);
      }
    }
  }

  /**
   * Retrieves detailed information about the wallet.
   *
   * @throws Will throw an error if the number of retrieved wallets does not match the number of addresses in the wallet.
   *
   * @returns A Promise that resolves to an array of {@link IFullAddressInfo} objects.
   */
  public async walletInfo(): Promise<Array<IFullAddressInfo>> {
    if (this.wallet.length === 0) {
      return [];
    }
    const addresses: Array<string> = this.wallet.map(
      (account) => account.address,
    );
    const addressesInfo: Array<IAddressInfo> =
      await this.getWalletAddressesInfo(addresses);

    if (addressesInfo.length !== this.wallet.length) {
      throw new Error(
        `Requested wallets not fully retrieved. Got ${addressesInfo.length}, expected: ${this.wallet.length}`,
      );
    }

    return addressesInfo.map((info, index) => {
      return {
        publicKey: this.wallet[index].publicKey,
        secretKey: this.wallet[index].secretKey,
        ...info,
      } as IFullAddressInfo;
    });
  }

  /**
   * Generates a new wallet account.
   * @param version_number - The version number of the secret key to be generated, to create a new account.
   *
   * @returns A Promise that resolves to an {@link IAccount} object, which represents the newly created account.
   */
  public static async walletGenerateNewAccount(): Promise<IAccount> {
    // generate private key
    const secretKeyArray: Uint8Array = ed.utils.randomPrivateKey();

    const version = Buffer.from(varintEncode(VERSION_NUMBER));
    const secretKeyBase58Encoded: string =
      SECRET_KEY_PREFIX +
      base58Encode(Buffer.concat([version, secretKeyArray]));
    const secretKey: SecretKey = new SecretKey(secretKeyBase58Encoded);

    // get public key
    const publicKey: PublicKey = await secretKey.getPublicKey();

    // get wallet account address
    const address: Address = new Address(publicKey);

    return {
      address: address.base58Encode,
      secretKey: secretKeyBase58Encoded,
      publicKey: publicKey.base58Encode,
    } as IAccount;
  }

  /**
   * Generates an account from a given private key.
   *
   * @param secretKeyBase58 - A base58 encoded private key from which the account will be generated.
   *
   * @returns A Promise that resolves to an {@link IAccount} object.
   */
  public static async getAccountFromSecretKey(
    secretKeyBase58: string,
  ): Promise<IAccount> {
    // get private key
    const secretKey: SecretKey = new SecretKey(secretKeyBase58);
    // get public key
    const publicKey: PublicKey = await secretKey.getPublicKey();

    // get wallet account address
    const address: Address = new Address(publicKey);

    return {
      address: address.base58Encode,
      secretKey: secretKeyBase58,
      publicKey: publicKey.base58Encode,
    } as IAccount;
  }

  /**
   * Signs a random message data using a wallet account that has already been added.
   *
   * @param data - The data to be signed.
   * @param accountSignerAddress - The address of the wallet account that will sign the data.
   *
   * @throws Will throw an error if the account associated with the provided address is not found in the wallet.
   *
   * @returns A Promise that resolves to an {@link ISignature} object representing the signature.
   */
  public async signMessage(
    data: string | Buffer,
    accountSignerAddress: string,
  ): Promise<ISignature> {
    let signerAccount = this.getWalletAccountByAddress(accountSignerAddress);
    let account: IBaseAccount;
    if (!signerAccount) {
      if (this.baseAccount.address() === accountSignerAddress) {
        account = this.baseAccount;
      } else {
        throw new Error(
          `No signer account ${accountSignerAddress} found in wallet`,
        );
      }
    } else {
      account = new Web3Account(signerAccount, this.publicApiClient);
    }
    if (typeof data === 'string') {
      data = Buffer.from(data);
    }
    return account.sign(data);
  }

  /**
   * Retrieves information about specified wallet addresses.
   *
   * @param addresses - An array of wallet addresses for which information is to be retrieved.
   *
   * @returns A Promise that resolves to an array of {@link IAddressInfo} objects, each containing
   * information about a corresponding wallet address.
   */
  private async getWalletAddressesInfo(
    addresses: Array<string>,
  ): Promise<Array<IAddressInfo>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ADDRESSES;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<IAddressInfo>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [addresses]],
      );
    } else {
      return await this.sendJsonRPCRequest<Array<IAddressInfo>>(
        jsonRpcRequestMethod,
        [addresses],
      );
    }
  }

  /**
   * Signs the provided data with the given address.
   *
   * @remarks
   * The address must be present in the wallet.
   *
   * @param data - The data to be signed.
   * @param signer - The account that will be used to sign the data.
   *
   * @throws
   * - if no private key is available for signing the message.
   * - if no public key is available for verifying the signed message.
   * - if the length of the generated signature is not valid.
   * - if the signature could not be verified with the public key.
   *
   * @returns A Promise that resolves to an {@link ISignature} object representing the signature.
   */
  public static async walletSignMessage(
    data: string | Buffer,
    signer: IBaseAccount,
  ): Promise<ISignature> {
    return signer.sign(Buffer.from(data));
  }

  /**
   * Verify a signature.
   *
   * @param data - The signed data to verify.
   * @param signature - The signature to verify.
   * @param signerPubKey - The public key of the signer.
   *
   * @returns A Promise that resolves to `true` if the signature is valid, `false` otherwise.
   */
  public async verifySignature(
    data: string | Buffer,
    signature: ISignature,
    signerPubKey: string,
  ): Promise<boolean> {
    // setup the public key.
    const publicKey: PublicKey = PublicKey.fromString(signerPubKey);

    // setup the message digest.
    const bytesCompact: Buffer = Buffer.from(data);
    const messageDigest: Uint8Array = hashBlake3(bytesCompact);

    try {
      // setup the signature.
      const versionAndSignatureBytes: Buffer = base58Decode(
        signature.base58Encoded,
      );

      // removing the version byte
      const signatureBytes: Uint8Array = versionAndSignatureBytes.slice(1);
      // check sig length
      if (signatureBytes.length != 64) {
        throw new Error(
          `Invalid signature length. Expected 64, got ${signatureBytes.length}`,
        );
      }
      // verify signature.
      const isVerified = await ed.verify(
        signatureBytes,
        messageDigest,
        publicKey.bytes,
      );
      return isVerified;
    } catch (err) {
      console.error('Failed to verify signature:', err);
      return false;
    }
  }

  /**
   * Retrieves the balance of an account.
   *
   * @param address - The address to get the balance from.
   *
   * @returns A Promise that resolves to an {@link IBalance}. If the address is not found,
   * it returns `null`.
   */
  public async getAccountBalance(address: string): Promise<IBalance | null> {
    try {
      const addresses: Array<IAddressInfo> =
        await this.publicApiClient.getAddresses([address]);
      if (addresses.length === 0) return null;

      const addressInfo: IAddressInfo = addresses.at(0);
      return {
        candidate: fromMAS(addressInfo.candidate_balance),
        final: fromMAS(addressInfo.final_balance),
      } as IBalance;
    } catch (err) {
      console.error('Failed to get account balance:', err);
      return null;
    }
  }

  /**
   * Sends native MAS from a wallet address to another.
   *
   * @param txData - The transaction data.
   * @param executor - (Optional) The account that will execute the transaction. If not
   * provided, the base account is used.
   *
   * @throws if no sender account is available for the transaction.
   *
   * @returns a promise that resolves to an array of operations ids.
   */
  public async sendTransaction(
    txData: ITransactionData,
    executor?: IBaseAccount,
  ): Promise<Array<string>> {
    // check sender account
    const sender: IBaseAccount = executor || this.getBaseAccount();
    if (!sender) {
      throw new Error('No tx sender available');
    }
    return [await sender.sendTransaction(txData)];
  }

  /**
   * Buy rolls with wallet address.
   *
   * @param txData - The transaction data
   * @param executor - (Optional) The account that will execute the transaction.
   * If not specified, the base account is used by default.
   *
   * @throws if no sender account is available for the transaction.
   *
   * @returns a promise that resolves to an array of operations ids.
   */
  public async buyRolls(
    txData: IRollsData,
    executor?: IBaseAccount,
  ): Promise<Array<string>> {
    // check sender account
    const sender: IBaseAccount = executor || this.getBaseAccount();
    if (!sender) {
      throw new Error('No tx sender available');
    }
    return [await sender.buyRolls(txData)];
  }

  /**
   * Sell rolls with wallet address.
   *
   * @param txData - The transaction data.
   * @param executor - (Optional) The account that will execute the transaction.
   * If not specified, the base account is used by default.
   *
   * @throws if no sender account is available for the transaction.
   *
   * @returns a promise that resolves to an array of operations ids.
   */
  public async sellRolls(
    txData: IRollsData,
    executor?: IBaseAccount,
  ): Promise<Array<string>> {
    // check sender account
    const sender: IBaseAccount = executor || this.getBaseAccount();
    if (!sender) {
      throw new Error('No tx sender available');
    }
    return [await sender.sellRolls(txData)];
  }
}
