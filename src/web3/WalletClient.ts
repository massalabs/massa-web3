import { IClientConfig } from "../interfaces/IClientConfig";
import { IAccount } from "../interfaces/IAccount";
import { BaseJsonRpcClient } from "./BaseJsonRpcClient";
import { IAddressInfo } from "../interfaces/IAddressInfo";
import { IFullAddressInfo } from "../interfaces/IFullAddressInfo";
import { ISignature } from "../interfaces/ISignature";
import { base58Decode, base58Encode, varintEncode, hashBlake3 } from "../utils/Xbqcrypto";
import { JSON_RPC_REQUEST_METHOD } from "../interfaces/JsonRpcMethods";
import { trySafeExecute } from "../utils/retryExecuteFunction";
import { ITransactionData } from "../interfaces/ITransactionData";
import { OperationTypeId } from "../interfaces/OperationTypes";
import { PublicApiClient } from "./PublicApiClient";
import { IRollsData } from "../interfaces/IRollsData";
import { INodeStatus } from "../interfaces/INodeStatus";
import { IBalance } from "../interfaces/IBalance";
import * as ed from "@noble/ed25519";
import { IWalletClient } from "../interfaces/IWalletClient";

const VERSION_NUMBER: number = 0;
const ADDRESS_PREFIX = "A";
const PUBLIC_KEY_PREFIX = "P";
const SECRET_KEY_PREFIX = "S";
const MAX_WALLET_ACCOUNTS: number = 256;

const getThreadNumber = (address: string): number => {
	const pubKeyHash = base58Decode(address.slice(1));
	const threadNumber = pubKeyHash.slice(1).readUInt8(0) >> 3;
	return threadNumber;
};

/** Wallet module that will under the hood interact with WebExtension, native client or interactively with user */
export class WalletClient extends BaseJsonRpcClient implements IWalletClient {

	private wallet: Array<IAccount> = [];
	private baseAccount: IAccount;

	public constructor(clientConfig: IClientConfig, private readonly publicApiClient: PublicApiClient, baseAccount?: IAccount) {
		super(clientConfig);

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

	/** set the default (base) account */
	public async setBaseAccount(baseAccount: IAccount): Promise<void> {
		// in case of not set thread number, compute the value
		if (!baseAccount.createdInThread && baseAccount.address) {
			baseAccount.createdInThread = getThreadNumber(baseAccount.address);
		}
		// see if base account is already added, if not, add it
		let baseAccountAdded: Array<IAccount> = null;
		if (!this.getWalletAccountByAddress(baseAccount.address)) {
			baseAccountAdded = await this.addAccountsToWallet([baseAccount]);
			this.baseAccount = baseAccountAdded[0];
		} else {
			this.baseAccount = baseAccount;
		}
	}

	/** get the default (base) account */
	public getBaseAccount(): IAccount {
		return this.baseAccount;
	}

	/** get all accounts under a wallet */
	public getWalletAccounts(): Array<IAccount> {
		return this.wallet;
	}

	/** delete all accounts under a wallet */
	public cleanWallet(): void {
		this.wallet.length = 0;
	}

	/** get wallet account by an address */
	public getWalletAccountByAddress(address: string): IAccount | undefined {
		return this.wallet.find((w) => w.address.toLowerCase() === address.toLowerCase()); // ignore case for flexibility
	}

	/** add a list of private keys to the wallet */
	public async addSecretKeysToWallet(secretKeys: Array<string>): Promise<Array<IAccount>> {
		if (secretKeys.length > MAX_WALLET_ACCOUNTS) {
			throw new Error(`Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted private keys: ${secretKeys.length}`);
		}
		const accountsToCreate = new Array<IAccount>();

		for (const secretKey of secretKeys) {
			const secretKeyBase58Decoded = WalletClient.getBytesSecretKey(secretKey);
			const publicKey: Uint8Array = await ed.getPublicKey(secretKeyBase58Decoded);

			const version = Buffer.from(varintEncode(VERSION_NUMBER));
			const publicKeyBase58Encoded: string = PUBLIC_KEY_PREFIX + base58Encode(Buffer.concat([version, publicKey]));
			const addressBase58Encoded = ADDRESS_PREFIX + base58Encode(Buffer.concat([version, hashBlake3(publicKey)]));

			if (!this.getWalletAccountByAddress(addressBase58Encoded)) {
				accountsToCreate.push({
					secretKey: secretKey, // submitted in base58
					publicKey: publicKeyBase58Encoded,
					address: addressBase58Encoded,
					createdInThread: getThreadNumber(addressBase58Encoded)
				} as IAccount);
			}
		}

		this.wallet.push(...accountsToCreate);
		return accountsToCreate;
	}

	/** add accounts to wallet. Prerequisite: each account must have a base58 encoded random entropy or private key */
	public async addAccountsToWallet(accounts: Array<IAccount>): Promise<Array<IAccount>> {
		if (accounts.length > MAX_WALLET_ACCOUNTS) {
			throw new Error(`Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted accounts: ${accounts.length}`);
		}
		const accountsAdded: Array<IAccount> = [];

		for (const account of accounts) {
			if (!account.secretKey) {
				throw new Error("Missing account private key");
			}

			const secretKeyBase58Encoded: string = account.secretKey;
			const secretKeyBase58Decoded = WalletClient.getBytesSecretKey(secretKeyBase58Encoded);
			// get public key
			const publicKey: Uint8Array = await ed.getPublicKey(secretKeyBase58Decoded);
			const version = Buffer.from(varintEncode(VERSION_NUMBER));
			const publicKeyBase58Encoded: string = PUBLIC_KEY_PREFIX + base58Encode(Buffer.concat([version, publicKey]));
			if (account.publicKey && account.publicKey !== publicKeyBase58Encoded) {
				throw new Error("Public key does not correspond the the private key submitted");
			}

			// get wallet account address
			const addressBase58Encoded = ADDRESS_PREFIX + base58Encode(Buffer.concat([version, hashBlake3(publicKey)]));
			if (account.address && account.address !== addressBase58Encoded) {
				throw new Error("Account address not correspond the the address submitted");
			}

			if (!this.getWalletAccountByAddress(addressBase58Encoded)) {
				accountsAdded.push({
					address: addressBase58Encoded,
					secretKey: secretKeyBase58Encoded,
					publicKey: publicKeyBase58Encoded,
					createdInThread: getThreadNumber(addressBase58Encoded)
				} as IAccount);
			}
		}

		this.wallet.push(...accountsAdded);
		return accountsAdded;
	}

	/** remove a list of addresses from the wallet */
	public removeAddressesFromWallet(addresses: Array<string>): void {
		for (const address of addresses) {
			const index = this.wallet.findIndex((w) => w.address === address);
			if (index > -1) {
				this.wallet.splice(index, 1);
			}
		}
	}

	/** show wallet info (private keys, public keys, addresses, balances ...) */
	public async walletInfo(): Promise<Array<IFullAddressInfo>> {
		if (this.wallet.length === 0) {
			return [];
		}
		const addresses: Array<string> = this.wallet.map((account) => account.address);
		const addressesInfo: Array<IAddressInfo> = await this.getWalletAddressesInfo(addresses);

		if (addressesInfo.length !== this.wallet.length) {
			throw new Error(`Requested wallets not fully retrieved. Got ${addressesInfo.length}, expected: ${this.wallet.length}`);
		}

		return addressesInfo.map((info, index) => {
			return {
				publicKey: this.wallet[index].publicKey,
				secretKey: this.wallet[index].secretKey,
				...info
			} as IFullAddressInfo;
		});
	}

	 /** generate a new account */
	public static async walletGenerateNewAccount(): Promise<IAccount> {

		// generate private key
		const secretKey: Uint8Array = ed.utils.randomPrivateKey();
		const version = Buffer.from(varintEncode(VERSION_NUMBER));
		const secretKeyBase58Encoded: string = SECRET_KEY_PREFIX + base58Encode(Buffer.concat([version, secretKey]));

		// get public key
		const publicKey: Uint8Array = await ed.getPublicKey(secretKey);
		const publicKeyBase58Encoded: string = PUBLIC_KEY_PREFIX + base58Encode(Buffer.concat([version, publicKey]));

		// get wallet account address
		const addressBase58Encoded = ADDRESS_PREFIX + base58Encode(Buffer.concat([version, hashBlake3(publicKey)]));

		return {
			address: addressBase58Encoded,
			secretKey: secretKeyBase58Encoded,
			publicKey: publicKeyBase58Encoded,
			createdInThread: getThreadNumber(addressBase58Encoded)
		} as IAccount;
	}

	/** returns an account from private key */
	public static async getAccountFromSecretKey(secretKeyBase58: string): Promise<IAccount> {
		const version = Buffer.from(varintEncode(VERSION_NUMBER));
		// get private key
		const secretKeyBase58Decoded = this.getBytesSecretKey(secretKeyBase58);
		// get public key
		const publicKey: Uint8Array = await ed.getPublicKey(secretKeyBase58Decoded);
		const publicKeyBase58Encoded: string = PUBLIC_KEY_PREFIX + base58Encode(Buffer.concat([version, publicKey]));

		// get wallet account address
		const addressBase58Encoded = ADDRESS_PREFIX + base58Encode(Buffer.concat([version, hashBlake3(publicKey)]));

		return {
			address: addressBase58Encoded,
			secretKey: secretKeyBase58,
			publicKey: publicKeyBase58Encoded,
			createdInThread: getThreadNumber(addressBase58Encoded)
		} as IAccount;
	}

	/** sign random message data with an already added wallet account */
	public async signMessage(data: string | Buffer, accountSignerAddress: string): Promise<ISignature> {
		const signerAccount = this.getWalletAccountByAddress(accountSignerAddress);
		if (!signerAccount) {
			throw new Error(`No signer account ${accountSignerAddress} found in wallet`);
		}
		return WalletClient.walletSignMessage(data, signerAccount);
	}

	/** get wallet addresses info */
	private async getWalletAddressesInfo(addresses: Array<string>): Promise<Array<IAddressInfo>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ADDRESSES;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IAddressInfo>>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [addresses]]);
		} else {
			return await this.sendJsonRPCRequest<Array<IAddressInfo>>(jsonRpcRequestMethod, [addresses]);
		}
	}

	/** sign provided string with given address (address must be in the wallet) */
	public static async walletSignMessage(data: string | Buffer, signer: IAccount): Promise<ISignature> {

		// check private keys to sign the message with
		if (!signer.secretKey) {
			throw new Error("No private key to sign the message with");
		}

		// check public key to verify the message with
		if (!signer.publicKey) {
			throw new Error("No public key to verify the signed message with");
		}

		// get private key
		const secretKeyBase58Decoded = this.getBytesSecretKey(signer.secretKey);

		// bytes compaction
		const bytesCompact: Buffer = Buffer.from(data);
		// Hash byte compact
		const messageHashDigest: Uint8Array = hashBlake3(bytesCompact);

		// sign the digest
		const sig = await ed.sign(messageHashDigest, secretKeyBase58Decoded);

		// check sig length
		if (sig.length != 64) {
			throw new Error(`Invalid signature length. Expected 64, got ${sig.length}`);
		}

		// verify signature
		if (signer.publicKey) {
			// get public key
			const publicKeyBase58Decoded = this.getBytesPublicKey(signer.publicKey);
			const isVerified = await ed.verify(sig, messageHashDigest, publicKeyBase58Decoded);
			if (!isVerified) {
				throw new Error(`Signature could not be verified with public key. Please inspect`);
			}
		}

		// convert sig
		const base58Encoded = base58Encode(sig);

		return {
			base58Encoded
		} as ISignature;
	}

	public static getBytesPublicKey(publicKey: string): Uint8Array {
		if (!(publicKey[0] == PUBLIC_KEY_PREFIX)) {
			throw new Error(`Invalid public key prefix: ${publicKey[0]} should be ${PUBLIC_KEY_PREFIX}`);
		}
		const publicKeyVersionBase58Decoded: Buffer = base58Decode(publicKey.slice(1));
		// Version is little for now
		const _version = publicKeyVersionBase58Decoded.readUInt8(0);
		const publicKeyBase58Decoded = publicKeyVersionBase58Decoded.slice(1);
		return publicKeyBase58Decoded;
	}

	public static getBytesSecretKey(secretKey: string): Uint8Array {
		if (!(secretKey[0] == SECRET_KEY_PREFIX)) {
			throw new Error(`Invalid secret key prefix: ${secretKey[0]} should be ${SECRET_KEY_PREFIX}`);
		}
		const secretKeyVersionBase58Decoded: Buffer = base58Decode(secretKey.slice(1));
		// Version is little for now
		const _version = secretKeyVersionBase58Decoded.readUInt8(0);
		const secretKeyBase58Decoded = secretKeyVersionBase58Decoded.slice(1);
		return secretKeyBase58Decoded;
	}

	/** Returns the account balance  */
	public async getAccountBalance(address: string): Promise<IBalance | null> {
		const addresses: Array<IAddressInfo> = await this.publicApiClient.getAddresses([address]);
		if (addresses.length === 0) return null;
		const addressInfo: IAddressInfo = addresses.at(0);
		return {
			candidate: addressInfo.candidate_balance,
			final: addressInfo.final_balance
		} as IBalance;
	}

	/** send native MAS from a wallet address to another */
	public async sendTransaction(txData: ITransactionData, executor?: IAccount): Promise<Array<string>> {

		// check sender account
		const sender: IAccount = executor || this.getBaseAccount();
		if (!sender) {
			throw new Error(`No tx sender available`);
		}

		// get next period info
		const nodeStatusInfo: INodeStatus = await this.publicApiClient.getNodeStatus();
		const expiryPeriod: number = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

		// bytes compaction
		const bytesCompact: Buffer = this.compactBytesForOperation(txData, OperationTypeId.Transaction, sender, expiryPeriod);

		// sign payload
		const signature: ISignature = await WalletClient.walletSignMessage(Buffer.concat([WalletClient.getBytesPublicKey(sender.publicKey), bytesCompact]), sender);

		// prepare tx data
		const data = {
			serialized_content: Array.prototype.slice.call(bytesCompact),
			creator_public_key: sender.publicKey,
			signature: signature.base58Encoded,
		};
		// returns operation ids
		const opIds: Array<string> = await this.sendJsonRPCRequest(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
		return opIds;
	}

	/** buy rolls with wallet address */
	public async buyRolls(txData: IRollsData, executor?: IAccount): Promise<Array<string>> {

		// check sender account
		const sender: IAccount = executor || this.getBaseAccount();
		if (!sender) {
			throw new Error(`No tx sender available`);
		}

		// get next period info
		const nodeStatusInfo: INodeStatus = await this.publicApiClient.getNodeStatus();
		const expiryPeriod: number = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

		// bytes compaction
		const bytesCompact: Buffer = this.compactBytesForOperation(txData, OperationTypeId.RollBuy, sender, expiryPeriod);

		// sign payload
		const signature: ISignature = await WalletClient.walletSignMessage(Buffer.concat([WalletClient.getBytesPublicKey(sender.publicKey), bytesCompact]), sender);

		const data = {
			serialized_content: Array.prototype.slice.call(bytesCompact),
			creator_public_key: sender.publicKey,
			signature: signature.base58Encoded,
		};
		// returns operation ids
		const opIds: Array<string> = await this.sendJsonRPCRequest(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
		return opIds;
	}

	/** sell rolls with wallet address */
	public async sellRolls(txData: IRollsData, executor?: IAccount): Promise<Array<string>> {

		// check sender account
		const sender: IAccount = executor || this.getBaseAccount();
		if (!sender) {
			throw new Error(`No tx sender available`);
		}

		// get next period info
		const nodeStatusInfo: INodeStatus = await this.publicApiClient.getNodeStatus();
		const expiryPeriod: number = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

		// bytes compaction
		const bytesCompact: Buffer = this.compactBytesForOperation(txData, OperationTypeId.RollSell, sender, expiryPeriod);

		// sign payload
		const signature: ISignature = await WalletClient.walletSignMessage(Buffer.concat([WalletClient.getBytesPublicKey(sender.publicKey), bytesCompact]), sender);

		const data = {
			serialized_content: Array.prototype.slice.call(bytesCompact),
			creator_public_key: sender.publicKey,
			signature: signature.base58Encoded,
		};
		// returns operation ids
		const opIds: Array<string> = await this.sendJsonRPCRequest(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
		return opIds;
	}
}
