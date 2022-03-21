import { IClientConfig } from "../interfaces/IClientConfig";
import { IAccount } from "../interfaces/IAccount";
import * as secp from "@noble/secp256k1";
import { BaseClient } from "./BaseClient";
import { PublicApiClient } from "./PublicApiClient";
import { IAddressInfo, IFullAddressInfo } from "../interfaces/IAddressInfo";
import { ISignature } from "../interfaces/ISignature";
import { base58checkDecode, base58checkEncode } from "../utils/Xbqcrypto";
import { BN }  from "bn.js";

const MAX_WALLET_ACCOUNTS: number = 256;

export class Wallet extends BaseClient {

	private wallet: Array<IAccount> = [];

	public constructor(clientConfig: IClientConfig, private readonly publicApiClient: PublicApiClient, baseAccount?: IAccount) {
		super(clientConfig, baseAccount);
		
		// ========== bind wallet methods ========= //

		// wallet methods
		this.getWalletAccounts = this.getWalletAccounts.bind(this);
		this.getWalletAccountByAddress = this.getWalletAccountByAddress.bind(this);
		this.addPrivateKeysToWallet = this.addPrivateKeysToWallet.bind(this);
		this.addAccountsToWallet = this.addAccountsToWallet.bind(this);
		this.removeAddressesFromWallet = this.removeAddressesFromWallet.bind(this);
		this.walletInfo = this.walletInfo.bind(this);

		// init wallet with a base account if any
		if (baseAccount) {
			this.addAccountsToWallet([baseAccount]);
		}
	}

	// get all accounts under a wallet
	public getWalletAccounts(): Array<IAccount> {
		return this.wallet;
	}

	// get wallet account by an address
	public getWalletAccountByAddress(address: string): IAccount | undefined {
		return this.wallet.find((w) => w.address === address);
	}

	// add a list of private keys to the wallet
	public addPrivateKeysToWallet(privateKeys: Array<string>): void {
		if (privateKeys.length >= MAX_WALLET_ACCOUNTS) {
			throw new Error(`Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted private keys: ${privateKeys.length}`);
		}
		for (const privateKey of privateKeys) {
			// get public key and address
			// check if address already inside wallet, if not push it
			const address = "0x0";
			if (!this.getWalletAccountByAddress(address)) {
				this.wallet.push({
					privateKey: privateKey,
					address: address
				} as IAccount);
			}
		}
	}

	// add accounts to wallet. Prerequisite: each account must have a full set of data (private, public keys and an address)
	public addAccountsToWallet(accounts: Array<IAccount>): void {
		if (accounts.length >= MAX_WALLET_ACCOUNTS) {
			throw new Error(`Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted accounts: ${accounts.length}`);
		}
		for (const account of accounts) {
			if (!account.privateKey) {
				throw new Error("Missing account private key");
			}
			if (!account.publicKey) {
				throw new Error("Missing account public key");
			}
			if (!account.address) {
				throw new Error("Missing account address");
			}
			if (!this.getWalletAccountByAddress(account.address)) {
				this.wallet.push(account);
			}
		}
	}

	// remove a list of addresses from the wallet
	public removeAddressesFromWallet(addresses: Array<string>): void {
		for (const address of addresses) {
			const index = this.wallet.findIndex((w) => w.address === address);
			if (index > -1) {
				this.wallet.splice(index, 1);
			}
		}
	}

	/* web3/wallet.js module that will under the hood interact with WebExtension, native client or interactively with user */

	// show wallet info (private keys, public keys, addresses, balances ...)
	public async walletInfo(): Promise<Array<IFullAddressInfo>> {
		if (this.wallet.length === 0) {
			return [];
		}
		const addresses: Array<string> = this.wallet.map((account) => account.address);
		const addressesInfo: Array<IAddressInfo> = await this.publicApiClient.getAddresses(addresses);

		if (addressesInfo.length !== this.wallet.length) {
			throw new Error(`Requested wallets not fully retrieved. Got ${addressesInfo.length}, expected: ${this.wallet.length}`);
		}

		return addressesInfo.map((info, index) => {
			return {
				publicKey: this.wallet[index].publicKey,
				privateKey: this.wallet[index].privateKey,
				...info
			} as IFullAddressInfo
		});
	} 

	 // generate a private key and add it into the wallet
	public static walletGenerateNewAccount = () => {
		// generate private key
		const privateKey: Uint8Array = secp.utils.randomPrivateKey();
		const privateKeyHex: string = secp.utils.bytesToHex(privateKey);

		// generate public key
		const publicKey: Uint8Array = secp.getPublicKey(privateKey);
		const publicKeyHex: string = secp.utils.bytesToHex(publicKey);

		return {
			address: null, // TODO: get the address
			privateKey: privateKeyHex,
			publicKey: publicKeyHex
		} as IAccount;
	}

	// sign provided string with given address (address must be in the wallet)
	public static async walletSign(data: string | Buffer, signer?: IAccount): Promise<ISignature> {

		// check private keys to sign the message with
		if (!signer?.privateKey) {
			throw new Error("No private key to sign the message with");
		}

		// check public key to verify the message with
		if (!signer?.publicKey) {
			throw new Error("No public key to verify the signed message with");
		}
		
    	// cast private key
		const privateKeyBase58Decoded = base58checkDecode(signer?.privateKey);
		const base58PrivateKey = new BN(privateKeyBase58Decoded, 16);

		// bytes compaction
		const bytesCompact: Buffer = Buffer.from(data);
		// Hash byte compact
		const messageHashDigest: Uint8Array = await secp.utils.sha256(bytesCompact);

		// sign the digest
		const sig = await secp.sign(messageHashDigest, base58PrivateKey.toBuffer(), {
			der: false,
			recovered: true
		});

		// check sig length
		if (sig[0].length != 64) {
			throw new Error(`Invalid signature length. Expected 64, got ${sig[0].length}`);
		}

		// verify signature
		if (signer?.publicKey) {
			const publicKeyBase58Decoded = base58checkDecode(signer?.publicKey);
			const base58PublicKey = new BN(publicKeyBase58Decoded, 16);
			const isVerified = secp.verify(sig[0], messageHashDigest, base58PublicKey.toBuffer());
			if (!isVerified) {
				throw new Error(`Signature could not be verified with public key. Please inspect`);
			}
		}

		// extract sig vector
		const r: Uint8Array = sig[0].slice(0,32);
		const s: Uint8Array = sig[0].slice(32, 64);
		const v: number = sig[1];
		const hex = secp.utils.bytesToHex(sig[0]);
		const base58Encoded = base58checkEncode(Buffer.concat([r, s]));
		
		return {
			r,
			s,
			v,
			hex,
			base58Encoded
		} as ISignature;
	}
}