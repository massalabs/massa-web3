"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletClient = void 0;
const tslib_1 = require("tslib");
const BaseClient_1 = require("./BaseClient");
const Xbqcrypto_1 = require("../utils/Xbqcrypto");
const JsonRpcMethods_1 = require("../interfaces/JsonRpcMethods");
const retryExecuteFunction_1 = require("../utils/retryExecuteFunction");
const OperationTypes_1 = require("../interfaces/OperationTypes");
const ed = require("@noble/ed25519");
const VERSION_NUMBER = 0;
const ADDRESS_PREFIX = "A";
const PUBLIC_KEY_PREFIX = "P";
const SECRET_KEY_PREFIX = "S";
const MAX_WALLET_ACCOUNTS = 256;
/** Wallet module that will under the hood interact with WebExtension, native client or interactively with user */
class WalletClient extends BaseClient_1.BaseClient {
    constructor(clientConfig, publicApiClient, baseAccount) {
        super(clientConfig);
        this.publicApiClient = publicApiClient;
        this.wallet = [];
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
        this.getAccountSequentialBalance = this.getAccountSequentialBalance.bind(this);
        // init wallet with a base account if any
        if (baseAccount) {
            this.setBaseAccount(baseAccount);
        }
    }
    /** set the default (base) account */
    setBaseAccount(baseAccount) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // see if base account is already added, if not, add it
            let baseAccountAdded = null;
            if (!this.getWalletAccountByAddress(baseAccount.address)) {
                baseAccountAdded = yield this.addAccountsToWallet([baseAccount]);
                this.baseAccount = baseAccountAdded[0];
            }
            else {
                this.baseAccount = baseAccount;
            }
        });
    }
    /** get the default (base) account */
    getBaseAccount() {
        return this.baseAccount;
    }
    /** get all accounts under a wallet */
    getWalletAccounts() {
        return this.wallet;
    }
    /** delete all accounts under a wallet */
    cleanWallet() {
        this.wallet.length = 0;
    }
    /** get wallet account by an address */
    getWalletAccountByAddress(address) {
        return this.wallet.find((w) => w.address.toLowerCase() === address.toLowerCase()); // ignore case for flexibility
    }
    /** add a list of private keys to the wallet */
    addSecretKeysToWallet(secretKeys) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (secretKeys.length > MAX_WALLET_ACCOUNTS) {
                throw new Error(`Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted private keys: ${secretKeys.length}`);
            }
            const accountsToCreate = new Array();
            for (const secretKey of secretKeys) {
                const secretKeyBase58Decoded = WalletClient.getBytesSecretKey(secretKey);
                const publicKey = yield ed.getPublicKey(secretKeyBase58Decoded);
                const version = Buffer.from((0, Xbqcrypto_1.varintEncode)(VERSION_NUMBER));
                const publicKeyBase58Encoded = PUBLIC_KEY_PREFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, publicKey]));
                const addressBase58Encoded = ADDRESS_PREFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, (0, Xbqcrypto_1.hashBlake3)(publicKey)]));
                if (!this.getWalletAccountByAddress(addressBase58Encoded)) {
                    accountsToCreate.push({
                        secretKey: secretKey,
                        publicKey: publicKeyBase58Encoded,
                        address: addressBase58Encoded
                    });
                }
            }
            this.wallet.push(...accountsToCreate);
            return accountsToCreate;
        });
    }
    /** add accounts to wallet. Prerequisite: each account must have a base58 encoded random entropy or private key */
    addAccountsToWallet(accounts) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (accounts.length > MAX_WALLET_ACCOUNTS) {
                throw new Error(`Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted accounts: ${accounts.length}`);
            }
            const accountsAdded = [];
            for (const account of accounts) {
                if (!account.secretKey) {
                    throw new Error("Missing account private key");
                }
                let secretKeyBase58Encoded = account.secretKey;
                const secretKeyBase58Decoded = WalletClient.getBytesSecretKey(secretKeyBase58Encoded);
                // get public key
                const publicKey = yield ed.getPublicKey(secretKeyBase58Decoded);
                const version = Buffer.from((0, Xbqcrypto_1.varintEncode)(VERSION_NUMBER));
                const publicKeyBase58Encoded = PUBLIC_KEY_PREFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, publicKey]));
                if (account.publicKey && account.publicKey !== publicKeyBase58Encoded) {
                    throw new Error("Public key does not correspond the the private key submitted");
                }
                // get wallet account address
                const addressBase58Encoded = ADDRESS_PREFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, (0, Xbqcrypto_1.hashBlake3)(publicKey)]));
                if (account.address && account.address !== addressBase58Encoded) {
                    throw new Error("Account address not correspond the the address submitted");
                }
                if (!this.getWalletAccountByAddress(addressBase58Encoded)) {
                    accountsAdded.push({
                        address: addressBase58Encoded,
                        secretKey: secretKeyBase58Encoded,
                        publicKey: publicKeyBase58Encoded,
                    });
                }
            }
            this.wallet.push(...accountsAdded);
            return accountsAdded;
        });
    }
    /** remove a list of addresses from the wallet */
    removeAddressesFromWallet(addresses) {
        for (const address of addresses) {
            const index = this.wallet.findIndex((w) => w.address === address);
            if (index > -1) {
                this.wallet.splice(index, 1);
            }
        }
    }
    /** show wallet info (private keys, public keys, addresses, balances ...) */
    walletInfo() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.wallet.length === 0) {
                return [];
            }
            const addresses = this.wallet.map((account) => account.address);
            const addressesInfo = yield this.getWalletAddressesInfo(addresses);
            if (addressesInfo.length !== this.wallet.length) {
                throw new Error(`Requested wallets not fully retrieved. Got ${addressesInfo.length}, expected: ${this.wallet.length}`);
            }
            return addressesInfo.map((info, index) => {
                return Object.assign({ publicKey: this.wallet[index].publicKey, secretKey: this.wallet[index].secretKey }, info);
            });
        });
    }
    /** generate a new account */
    static walletGenerateNewAccount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // generate private key
            const secretKey = ed.utils.randomPrivateKey();
            const version = Buffer.from((0, Xbqcrypto_1.varintEncode)(VERSION_NUMBER));
            const secretKeyBase58Encoded = SECRET_KEY_PREFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, secretKey]));
            // get public key
            const publicKey = yield ed.getPublicKey(secretKey);
            const publicKeyBase58Encoded = PUBLIC_KEY_PREFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, publicKey]));
            // get wallet account address
            const addressBase58Encoded = ADDRESS_PREFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, (0, Xbqcrypto_1.hashBlake3)(publicKey)]));
            return {
                address: addressBase58Encoded,
                secretKey: secretKeyBase58Encoded,
                publicKey: publicKeyBase58Encoded,
            };
        });
    }
    /** returns an account from private key */
    static getAccountFromSecretKey(secretKeyBase58) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // get private key
            const secretKeyBase58Decoded = this.getBytesSecretKey(secretKeyBase58);
            // get public key
            const publicKey = yield ed.getPublicKey(secretKeyBase58Decoded);
            const publicKeyBase58Encoded = (0, Xbqcrypto_1.base58Encode)(publicKey);
            // get wallet account address
            const version = Buffer.from((0, Xbqcrypto_1.varintEncode)(VERSION_NUMBER));
            const addressBase58Encoded = ADDRESS_PREFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, (0, Xbqcrypto_1.hashBlake3)(publicKey)]));
            return {
                address: addressBase58Encoded,
                secretKey: secretKeyBase58,
                publicKey: publicKeyBase58Encoded,
            };
        });
    }
    /** sign random message data with an already added wallet account */
    signMessage(data, accountSignerAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const signerAccount = this.getWalletAccountByAddress(accountSignerAddress);
            if (!signerAccount) {
                throw new Error(`No signer account ${accountSignerAddress} found in wallet`);
            }
            return WalletClient.walletSignMessage(data, signerAccount);
        });
    }
    /** get wallet addresses info */
    getWalletAddressesInfo(addresses) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_ADDRESSES;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [addresses]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [addresses]);
            }
        });
    }
    /** sign provided string with given address (address must be in the wallet) */
    static walletSignMessage(data, signer) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
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
            const bytesCompact = Buffer.from(data);
            // Hash byte compact
            const messageHashDigest = (0, Xbqcrypto_1.hashBlake3)(bytesCompact);
            // sign the digest
            const sig = yield ed.sign(messageHashDigest, secretKeyBase58Decoded);
            // check sig length
            if (sig.length != 64) {
                throw new Error(`Invalid signature length. Expected 64, got ${sig.length}`);
            }
            // verify signature
            if (signer.publicKey) {
                // get public key
                const publicKeyBase58Decoded = this.getBytesPublicKey(signer.publicKey);
                const isVerified = yield ed.verify(sig, messageHashDigest, publicKeyBase58Decoded);
                if (!isVerified) {
                    throw new Error(`Signature could not be verified with public key. Please inspect`);
                }
            }
            // convert sig
            const base58Encoded = (0, Xbqcrypto_1.base58Encode)(sig);
            return {
                base58Encoded
            };
        });
    }
    static getBytesPublicKey(publicKey) {
        if (!(publicKey[0] == PUBLIC_KEY_PREFIX)) {
            throw new Error(`Invalid public key prefix: ${publicKey[0]} should be ${PUBLIC_KEY_PREFIX}`);
        }
        const publicKeyVersionBase58Decoded = (0, Xbqcrypto_1.base58Decode)(publicKey.slice(1));
        // Version is little for now
        const _version = publicKeyVersionBase58Decoded.readUInt8(0);
        const publicKeyBase58Decoded = publicKeyVersionBase58Decoded.slice(1);
        return publicKeyBase58Decoded;
    }
    static getBytesSecretKey(secretKey) {
        if (!(secretKey[0] == SECRET_KEY_PREFIX)) {
            throw new Error(`Invalid secret key prefix: ${secretKey[0]} should be ${SECRET_KEY_PREFIX}`);
        }
        const secretKeyVersionBase58Decoded = (0, Xbqcrypto_1.base58Decode)(secretKey.slice(1));
        // Version is little for now
        const _version = secretKeyVersionBase58Decoded.readUInt8(0);
        const secretKeyBase58Decoded = secretKeyVersionBase58Decoded.slice(1);
        return secretKeyBase58Decoded;
    }
    /** Returns the account sequential balance - the consensus side balance  */
    getAccountSequentialBalance(address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const addresses = yield this.publicApiClient.getAddresses([address]);
            if (addresses.length === 0)
                return null;
            const addressInfo = addresses.at(0);
            return {
                candidate: addressInfo.ledger_info.candidate_ledger_info.balance,
                final: addressInfo.ledger_info.final_ledger_info.balance
            };
        });
    }
    /** send native MAS from a wallet address to another */
    sendTransaction(txData, executor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // check sender account
            const sender = executor || this.getBaseAccount();
            if (!sender) {
                throw new Error(`No tx sender available`);
            }
            // get next period info
            const nodeStatusInfo = yield this.publicApiClient.getNodeStatus();
            const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
            // bytes compaction
            const bytesCompact = this.compactBytesForOperation(txData, OperationTypes_1.OperationTypeId.Transaction, sender, expiryPeriod);
            // sign payload
            const signature = yield WalletClient.walletSignMessage(Buffer.concat([WalletClient.getBytesPublicKey(sender.publicKey), bytesCompact]), sender);
            // prepare tx data
            const data = {
                serialized_content: Array.prototype.slice.call(bytesCompact),
                creator_public_key: sender.publicKey,
                signature: signature.base58Encoded,
            };
            // returns operation ids
            const opIds = yield this.sendJsonRPCRequest(JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
            return opIds;
        });
    }
    /** buy rolls with wallet address */
    buyRolls(txData, executor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // check sender account
            const sender = executor || this.getBaseAccount();
            if (!sender) {
                throw new Error(`No tx sender available`);
            }
            // get next period info
            const nodeStatusInfo = yield this.publicApiClient.getNodeStatus();
            const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
            // bytes compaction
            const bytesCompact = this.compactBytesForOperation(txData, OperationTypes_1.OperationTypeId.RollBuy, sender, expiryPeriod);
            // sign payload
            const signature = yield WalletClient.walletSignMessage(Buffer.concat([WalletClient.getBytesPublicKey(sender.publicKey), bytesCompact]), sender);
            const data = {
                serialized_content: Array.prototype.slice.call(bytesCompact),
                creator_public_key: sender.publicKey,
                signature: signature.base58Encoded,
            };
            // returns operation ids
            const opIds = yield this.sendJsonRPCRequest(JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
            return opIds;
        });
    }
    /** sell rolls with wallet address */
    sellRolls(txData, executor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // check sender account
            const sender = executor || this.getBaseAccount();
            if (!sender) {
                throw new Error(`No tx sender available`);
            }
            // get next period info
            const nodeStatusInfo = yield this.publicApiClient.getNodeStatus();
            const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
            // bytes compaction
            const bytesCompact = this.compactBytesForOperation(txData, OperationTypes_1.OperationTypeId.RollSell, sender, expiryPeriod);
            // sign payload
            const signature = yield WalletClient.walletSignMessage(Buffer.concat([WalletClient.getBytesPublicKey(sender.publicKey), bytesCompact]), sender);
            const data = {
                serialized_content: Array.prototype.slice.call(bytesCompact),
                creator_public_key: sender.publicKey,
                signature: signature.base58Encoded,
            };
            // returns operation ids
            const opIds = yield this.sendJsonRPCRequest(JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
            return opIds;
        });
    }
}
exports.WalletClient = WalletClient;
//# sourceMappingURL=WalletClient.js.map