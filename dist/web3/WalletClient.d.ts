/// <reference types="node" />
import { IClientConfig } from "../interfaces/IClientConfig";
import { IAccount } from "../interfaces/IAccount";
import { BaseClient } from "./BaseClient";
import { IFullAddressInfo } from "../interfaces/IAddressInfo";
import { ISignature } from "../interfaces/ISignature";
import { ITransactionData } from "../interfaces/ITransactionData";
import { PublicApiClient } from "./PublicApiClient";
import { IRollsData } from "../interfaces/IRollsData";
import { IBalance } from "../interfaces/IBalance";
/** Wallet module that will under the hood interact with WebExtension, native client or interactively with user */
export declare class WalletClient extends BaseClient {
    private readonly publicApiClient;
    private wallet;
    private baseAccount;
    constructor(clientConfig: IClientConfig, publicApiClient: PublicApiClient, baseAccount?: IAccount);
    /** set the default (base) account */
    setBaseAccount(baseAccount: IAccount): void;
    /** get the default (base) account */
    getBaseAccount(): IAccount;
    /** get all accounts under a wallet */
    getWalletAccounts(): Array<IAccount>;
    /** delete all accounts under a wallet */
    cleanWallet(): void;
    /** get wallet account by an address */
    getWalletAccountByAddress(address: string): IAccount | undefined;
    /** add a list of private keys to the wallet */
    addPrivateKeysToWallet(privateKeys: Array<string>): Promise<Array<IAccount>>;
    /** add accounts to wallet. Prerequisite: each account must have a full set of data (private, public keys and an address) */
    addAccountsToWallet(accounts: Array<IAccount>): void;
    /** remove a list of addresses from the wallet */
    removeAddressesFromWallet(addresses: Array<string>): void;
    /** show wallet info (private keys, public keys, addresses, balances ...) */
    walletInfo(): Promise<Array<IFullAddressInfo>>;
    /** generate a private and public key account and add it into the wallet */
    static walletGenerateNewAccount(): Promise<IAccount>;
    /** generate an account from private key */
    static getAccountFromPrivateKey(privateKeyBase58: string): Promise<IAccount>;
    /** sign random message data with an already added wallet account */
    signMessage(data: string | Buffer, accountSignerAddress: string): Promise<ISignature>;
    /** get wallet addresses info */
    private getWalletAddressesInfo;
    /** sign provided string with given address (address must be in the wallet) */
    static walletSignMessage(data: string | Buffer, signer: IAccount): Promise<ISignature>;
    /** Returns the account sequential balance - the consensus side balance  */
    getAccountSequentialBalance(address: string): Promise<IBalance | null>;
    /** send native MAS from a wallet address to another */
    sendTransaction(txData: ITransactionData, executor: IAccount): Promise<Array<string>>;
    /** buy rolls with wallet address */
    buyRolls(txData: IRollsData, executor: IAccount): Promise<Array<string>>;
    /** sell rolls with wallet address */
    sellRolls(txData: IRollsData, executor: IAccount): Promise<Array<string>>;
}
