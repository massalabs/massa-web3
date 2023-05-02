/// <reference types="node" />
import { IClientConfig } from '../interfaces/IClientConfig';
import { IAccount } from '../interfaces/IAccount';
import { BaseClient } from './BaseClient';
import { IFullAddressInfo } from '../interfaces/IFullAddressInfo';
import { ISignature } from '../interfaces/ISignature';
import { ITransactionData } from '../interfaces/ITransactionData';
import { PublicApiClient } from './PublicApiClient';
import { IRollsData } from '../interfaces/IRollsData';
import { IBalance } from '../interfaces/IBalance';
import { IWalletClient } from '../interfaces/IWalletClient';
/** Wallet module that will under the hood interact with WebExtension, native client or interactively with user */
export declare class WalletClient extends BaseClient implements IWalletClient {
    private readonly publicApiClient;
    private wallet;
    private baseAccount?;
    constructor(clientConfig: IClientConfig, publicApiClient: PublicApiClient, baseAccount?: IAccount);
    /** set the default (base) account */
    setBaseAccount(baseAccount: IAccount): Promise<void>;
    /** get the default (base) account */
    getBaseAccount(): IAccount | null;
    /** get all accounts under a wallet */
    getWalletAccounts(): Array<IAccount>;
    /** delete all accounts under a wallet */
    cleanWallet(): void;
    /** get wallet account by an address */
    getWalletAccountByAddress(address: string): IAccount | undefined;
    /** add a list of private keys to the wallet */
    addSecretKeysToWallet(secretKeys: Array<string>): Promise<Array<IAccount>>;
    /** add accounts to wallet. Prerequisite: each account must have a base58 encoded random entropy or private key */
    addAccountsToWallet(accounts: Array<IAccount>): Promise<Array<IAccount>>;
    /** remove a list of addresses from the wallet */
    removeAddressesFromWallet(addresses: Array<string>): void;
    /** show wallet info (private keys, public keys, addresses, balances ...) */
    walletInfo(): Promise<Array<IFullAddressInfo>>;
    /** generate a new account */
    static walletGenerateNewAccount(): Promise<IAccount>;
    /** returns an account from private key */
    static getAccountFromSecretKey(secretKeyBase58: string): Promise<IAccount>;
    /** sign random message data with an already added wallet account */
    signMessage(data: string | Buffer, accountSignerAddress: string): Promise<ISignature>;
    /** get wallet addresses info */
    private getWalletAddressesInfo;
    /** sign provided string with given address (address must be in the wallet) */
    static walletSignMessage(data: string | Buffer, signer: IAccount): Promise<ISignature>;
    static getBytesPublicKey(publicKey: string): Uint8Array;
    static getBytesSecretKey(secretKey: string): Uint8Array;
    /** Returns the account balance  */
    getAccountBalance(address: string): Promise<IBalance | null>;
    /** send native MAS from a wallet address to another */
    sendTransaction(txData: ITransactionData, executor?: IAccount): Promise<Array<string>>;
    /** buy rolls with wallet address */
    buyRolls(txData: IRollsData, executor?: IAccount): Promise<Array<string>>;
    /** sell rolls with wallet address */
    sellRolls(txData: IRollsData, executor?: IAccount): Promise<Array<string>>;
}
