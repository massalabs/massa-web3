import { IAccount } from "../interfaces/IAccount";
import { IClientConfig } from "../interfaces/IClientConfig";
import { WalletClient } from "./WalletClient";
import { AESEncryption } from "aes-password";

const bip39 = require("bip39");

export interface IVault {
	network: number;
	accounts: IAccount[];
	mnemonic: string;
}

/** Vault module that intenrally uses the wallet client */
export class VaultClient {

	private password: string = null;
	private mnemonic: string = null;

	public constructor(private readonly clientConfig: IClientConfig, private readonly walletClient: WalletClient) {

		// ========== bind vault methods ========= //

		// vault methods
		this.setPassword = this.setPassword.bind(this);
		this.getPassword = this.getPassword.bind(this);
		this.generateMnemonic = this.generateMnemonic.bind(this);
		this.exportVault = this.exportVault.bind(this);
		this.encryptVault = this.encryptVault.bind(this);
		this.decryptVault = this.decryptVault.bind(this);
	}

	/** initializes a vault with a wallet base account */
	public init(): void {
		if (!this.mnemonic) {
			const baseAccount: IAccount = this.walletClient.getBaseAccount();
			this.mnemonic = this.generateMnemonic(baseAccount.randomEntropy);
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
			encrypted = await AESEncryption.encrypt(JSON.stringify(dataObj), pwd);
		} catch (ex) {
			console.error("Error when encrypting vault with password", ex);
			throw ex;
		}

		return encrypted;
    }

	public async decryptVault(encryptedData: string, password?: string): Promise<IVault>  {
		const pwd = password || this.password;
		if (!this.password) {
			throw new Error("No password for the vault");
		}
		// decrypt and return the decrypted vault
		let decrypted: string = null;
		try {
			decrypted = await AESEncryption.decrypt(encryptedData, pwd);
		} catch (ex) {
			console.error("Error when decrypting vault with password", ex);
			throw ex;
		}

		return JSON.parse(decrypted) as IVault;
	}

	private generateMnemonic(dataObj: any): string {
        return bip39.entropyToMnemonic(dataObj);
    }
}
