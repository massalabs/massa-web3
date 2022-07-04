import { IAccount } from "../interfaces/IAccount";
import { IClientConfig } from "../interfaces/IClientConfig";
import { WalletClient } from "./WalletClient";
import { base58Decode, base58Encode } from "../utils/Xbqcrypto";
import { IVault } from "../interfaces/IVault";
import { IVaultClient } from "../interfaces/IVaultClient";
const bip39 = require("bip39");
const CryptoJS = require("crypto-js");

/** Vault module that internally uses the wallet client */
export class VaultClient implements IVaultClient {

	private password: string = null;
	private mnemonic: string = null;

	public constructor(private readonly clientConfig: IClientConfig, private readonly walletClient: WalletClient) {

		// ========== bind vault methods ========= //

		// vault methods
		this.setPassword = this.setPassword.bind(this);
		this.getPassword = this.getPassword.bind(this);
		this.entropyHexToMnemonic = this.entropyHexToMnemonic.bind(this);
		this.mnemonicToHexEntropy = this.mnemonicToHexEntropy.bind(this);
		this.exportVault = this.exportVault.bind(this);
		this.encryptVault = this.encryptVault.bind(this);
		this.decryptVault = this.decryptVault.bind(this);
		this.recoverVault = this.recoverVault.bind(this);
	}

	/** initializes a vault with a wallet base account */
	public init(): void {
		if (!this.mnemonic) {
			const baseAccount: IAccount = WalletClient.walletGenerateNewAccount();
			const hex = Buffer.from(base58Decode(baseAccount.randomEntropy)).toString("hex");
			this.walletClient.setBaseAccount(baseAccount);
			this.mnemonic = this.entropyHexToMnemonic(hex);
		}
	}

	/** set password */
	public setPassword(password: string): void {
		this.password = password;
	}

	/** get password */
	public getPassword(): string {
		return this.password;
	}

	/** recover vault */
	public recoverVault(mnemonic: string) {
        const bytes: Buffer = Buffer.from(this.mnemonicToHexEntropy(mnemonic), "hex");
		this.walletClient.setBaseAccount(WalletClient.getAccountFromEntropy(base58Encode(bytes)));
        this.mnemonic = mnemonic;
    }

	/** export vault */
	public exportVault(): IVault {
		if (!this.mnemonic) {
			throw new Error("No mnemonic for the vault. Maybe init() was not called");
		}
        return {
            network: this.clientConfig.providers[0].type.valueOf(),
            accounts: this.walletClient.getWalletAccounts(),
            mnemonic: this.mnemonic,
        };
	}

	/** encrypt vault */
	public async encryptVault(password?: string): Promise<string> {
		const pwd = password || this.password;
		if (!this.password) {
			throw new Error("No password for the vault");
		}
		if (!this.mnemonic) {
			throw new Error("No mnemonic for the vault. Maybe init() was not called");
		}

		// generate an object to encrypt
        const dataObj = {
            network: this.clientConfig.providers[0].type.valueOf(),
            accounts: this.walletClient.getWalletAccounts(),
            mnemonic: this.mnemonic,
        } as IVault;
		// encrypt and return the encrypted vault
		let encrypted: string = null;
		try {
			encrypted = CryptoJS.AES.encrypt(JSON.stringify(dataObj), pwd).toString();
		} catch (ex) {
			console.error("Error when encrypting vault with password", ex);
			throw ex;
		}

		return encrypted;
    }

	/** decrypt vault */
	public async decryptVault(encryptedData: string, password?: string): Promise<IVault> {
		const pwd = password || this.password;
		if (!this.password) {
			throw new Error("No password for the vault");
		}
		// decrypt and return the decrypted vault
		let decrypted: string = null;
		try {
			const bytes = CryptoJS.AES.decrypt(encryptedData, pwd);
			decrypted = bytes.toString(CryptoJS.enc.Utf8);
		} catch (ex) {
			console.error("Error when decrypting vault with password", ex);
			throw ex;
		}

		return JSON.parse(decrypted) as IVault;
	}

	/** entropy to hex mnemonic */
	public entropyHexToMnemonic(data: any): string {
        return bip39.entropyToMnemonic(data);
    }

	/** mnemonic to hex entropy */
	public mnemonicToHexEntropy(mnemonic: string): any {
        return bip39.mnemonicToEntropy(mnemonic);
    }
}
