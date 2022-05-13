import { IAccount } from "../interfaces/IAccount";
import { IClientConfig } from "../interfaces/IClientConfig";
import { WalletClient } from "./WalletClient";
import Aes from "../utils/aes";
import { base58checkDecode, base58checkEncode } from "../utils/Xbqcrypto";
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
			const hex = Buffer.from(base58checkDecode(baseAccount.randomEntropy)).toString('hex');
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
        let bytes: Buffer = Buffer.from(this.mnemonicToHexEntropy(mnemonic), 'hex');
		this.walletClient.setBaseAccount(WalletClient.getAccountFromEntropy(base58checkEncode(bytes)));
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
			encrypted = await Aes.encrypt(JSON.stringify(dataObj), pwd);
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
			decrypted = await Aes.decrypt(encryptedData, pwd);
		} catch (ex) {
			console.error("Error when decrypting vault with password", ex);
			throw ex;
		}

		return JSON.parse(decrypted) as IVault;
	}

	private entropyHexToMnemonic(data: any): string {
        return bip39.entropyToMnemonic(data);
    }

	private mnemonicToHexEntropy(mnemonic: string): any {
        return bip39.mnemonicToEntropy(mnemonic);
    }
}
