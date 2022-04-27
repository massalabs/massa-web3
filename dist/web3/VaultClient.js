"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultClient = void 0;
const tslib_1 = require("tslib");
const aes_password_1 = require("aes-password");
const bip39 = require("bip39");
/** Vault module that intenrally uses the wallet client */
class VaultClient {
    constructor(clientConfig, walletClient) {
        // ========== bind vault methods ========= //
        this.clientConfig = clientConfig;
        this.walletClient = walletClient;
        this.password = null;
        this.mnemonic = null;
        // vault methods
        this.setPassword = this.setPassword.bind(this);
        this.getPassword = this.getPassword.bind(this);
        this.generateMnemonic = this.generateMnemonic.bind(this);
        this.exportVault = this.exportVault.bind(this);
        this.encryptVault = this.encryptVault.bind(this);
        this.decryptVault = this.decryptVault.bind(this);
    }
    /** initializes a vault with a wallet base account */
    init() {
        if (!this.mnemonic) {
            const baseAccount = this.walletClient.getBaseAccount();
            this.mnemonic = this.generateMnemonic(baseAccount.randomEntropy);
        }
    }
    /** set password */
    setPassword(password) {
        this.password = password;
    }
    /** get password */
    getPassword() {
        return this.password;
    }
    /** export vault */
    exportVault() {
        if (!this.mnemonic) {
            throw new Error("No mnemonic for the vault. Maybe init() was not called");
        }
        return {
            network: this.clientConfig.providers[0].type.valueOf(),
            accounts: this.walletClient.getWalletAccounts(),
            mnemonic: this.mnemonic,
        };
    }
    encryptVault(password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            };
            // encrypt and return the encrypted vault
            let encrypted = null;
            try {
                encrypted = yield aes_password_1.AESEncryption.encrypt(JSON.stringify(dataObj), pwd);
            }
            catch (ex) {
                console.error("Error when encrypting vault with password", ex);
                throw ex;
            }
            return encrypted;
        });
    }
    decryptVault(encryptedData, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pwd = password || this.password;
            if (!this.password) {
                throw new Error("No password for the vault");
            }
            // decrypt and return the decrypted vault
            let decrypted = null;
            try {
                decrypted = yield aes_password_1.AESEncryption.decrypt(encryptedData, pwd);
            }
            catch (ex) {
                console.error("Error when decrypting vault with password", ex);
                throw ex;
            }
            return JSON.parse(decrypted);
        });
    }
    generateMnemonic(dataObj) {
        return bip39.entropyToMnemonic(dataObj);
    }
}
exports.VaultClient = VaultClient;
//# sourceMappingURL=VaultClient.js.map