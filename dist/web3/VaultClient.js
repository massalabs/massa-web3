"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VaultClient = void 0;
const tslib_1 = require("tslib");
const WalletClient_1 = require("./WalletClient");
const Xbqcrypto_1 = require("../utils/Xbqcrypto");
const bip39 = require("bip39");
const CryptoJS = require("crypto-js");
/** Vault module that internally uses the wallet client */
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
        this.entropyHexToMnemonic = this.entropyHexToMnemonic.bind(this);
        this.mnemonicToHexEntropy = this.mnemonicToHexEntropy.bind(this);
        this.exportVault = this.exportVault.bind(this);
        this.encryptVault = this.encryptVault.bind(this);
        this.decryptVault = this.decryptVault.bind(this);
        this.recoverVault = this.recoverVault.bind(this);
    }
    /** initializes a vault with a wallet base account */
    init() {
        if (!this.mnemonic) {
            const baseAccount = WalletClient_1.WalletClient.walletGenerateNewAccount();
            const hex = Buffer.from((0, Xbqcrypto_1.base58checkDecode)(baseAccount.randomEntropy)).toString("hex");
            this.walletClient.setBaseAccount(baseAccount);
            this.mnemonic = this.entropyHexToMnemonic(hex);
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
    /** recover vault */
    recoverVault(mnemonic) {
        const bytes = Buffer.from(this.mnemonicToHexEntropy(mnemonic), "hex");
        this.walletClient.setBaseAccount(WalletClient_1.WalletClient.getAccountFromEntropy((0, Xbqcrypto_1.base58checkEncode)(bytes)));
        this.mnemonic = mnemonic;
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
    /** encrypt vault */
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
                encrypted = CryptoJS.AES.encrypt(JSON.stringify(dataObj), pwd).toString();
            }
            catch (ex) {
                console.error("Error when encrypting vault with password", ex);
                throw ex;
            }
            return encrypted;
        });
    }
    /** decrypt vault */
    decryptVault(encryptedData, password) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pwd = password || this.password;
            if (!this.password) {
                throw new Error("No password for the vault");
            }
            // decrypt and return the decrypted vault
            let decrypted = null;
            try {
                const bytes = CryptoJS.AES.decrypt(encryptedData, pwd);
                decrypted = bytes.toString(CryptoJS.enc.Utf8);
            }
            catch (ex) {
                console.error("Error when decrypting vault with password", ex);
                throw ex;
            }
            return JSON.parse(decrypted);
        });
    }
    /** entropy to hex mnemonic */
    entropyHexToMnemonic(data) {
        return bip39.entropyToMnemonic(data);
    }
    /** mnemonic to hex entropy */
    mnemonicToHexEntropy(mnemonic) {
        return bip39.mnemonicToEntropy(mnemonic);
    }
}
exports.VaultClient = VaultClient;
//# sourceMappingURL=VaultClient.js.map