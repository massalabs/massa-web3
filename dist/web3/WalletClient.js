"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletClient = void 0;
const tslib_1 = require("tslib");
const secp = require("@noble/secp256k1");
const BaseClient_1 = require("./BaseClient");
const Xbqcrypto_1 = require("../utils/Xbqcrypto");
const JsonRpcMethods_1 = require("../interfaces/JsonRpcMethods");
const retryExecuteFunction_1 = require("../utils/retryExecuteFunction");
const OperationTypes_1 = require("../interfaces/OperationTypes");
const hmac_1 = require("@noble/hashes/hmac");
const sha256_1 = require("@noble/hashes/sha256");
const secp256k1_1 = require("@noble/secp256k1");
const createhash = require("create-hash");
const VERSION_NUMBER = 0;
const ADDRESS_PRAEFIX = "A";
const MAX_WALLET_ACCOUNTS = 256;
// add hmacSync for sync signing
secp.utils.hmacSha256Sync = (key, ...msgs) => {
    const h = hmac_1.hmac.create(sha256_1.sha256, key);
    msgs.forEach(msg => h.update(msg));
    return h.digest();
};
secp.utils.sha256Sync = (...msgs) => {
    const h = createhash("sha256");
    msgs.forEach(msg => h.update(msg));
    return h.digest();
};
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
        this.addPrivateKeysToWallet = this.addPrivateKeysToWallet.bind(this);
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
        // see if base account is already added, if not, add it
        let baseAccountAdded = null;
        if (!this.getWalletAccountByAddress(baseAccount.address)) {
            baseAccountAdded = this.addAccountsToWallet([baseAccount]);
            this.baseAccount = baseAccountAdded[0];
        }
        else {
            this.baseAccount = baseAccount;
        }
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
    addPrivateKeysToWallet(privateKeys) {
        if (privateKeys.length > MAX_WALLET_ACCOUNTS) {
            throw new Error(`Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted private keys: ${privateKeys.length}`);
        }
        const accountsToCreate = new Array();
        for (const privateKey of privateKeys) {
            const privateKeyBase58Decoded = (0, Xbqcrypto_1.base58Decode)(privateKey);
            const publicKey = secp.schnorr.getPublicKey(privateKeyBase58Decoded);
            const publicKeyBase58Encoded = (0, Xbqcrypto_1.base58Encode)(publicKey);
            const version = Buffer.from((0, Xbqcrypto_1.varintEncode)(VERSION_NUMBER));
            const addressBase58Encoded = ADDRESS_PRAEFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, (0, Xbqcrypto_1.hashBlake3)(publicKey)]));
            if (!this.getWalletAccountByAddress(addressBase58Encoded)) {
                accountsToCreate.push({
                    privateKey: privateKey,
                    publicKey: publicKeyBase58Encoded,
                    address: addressBase58Encoded,
                    randomEntropy: null
                });
            }
        }
        this.wallet.push(...accountsToCreate);
        return accountsToCreate;
    }
    /** add accounts to wallet. Prerequisite: each account must have a base58 encoded random entropy or private key */
    addAccountsToWallet(accounts) {
        if (accounts.length > MAX_WALLET_ACCOUNTS) {
            throw new Error(`Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted accounts: ${accounts.length}`);
        }
        const accountsAdded = [];
        for (const account of accounts) {
            if (!account.randomEntropy && !account.privateKey) {
                throw new Error("Missing account entropy / private key");
            }
            let privateKeyBase58Encoded = null;
            // account is specified via entropy
            if (account.randomEntropy) {
                const base58DecodedRandomEntropy = (0, Xbqcrypto_1.base58Decode)(account.randomEntropy);
                const privateKey = secp.utils.hashToPrivateKey(base58DecodedRandomEntropy);
                privateKeyBase58Encoded = (0, Xbqcrypto_1.base58Encode)(privateKey);
            }
            // if not entropy defined, use the base58 encoded value defined as param
            privateKeyBase58Encoded = privateKeyBase58Encoded || account.privateKey;
            // get public key
            const publicKey = secp.schnorr.getPublicKey((0, Xbqcrypto_1.base58Decode)(privateKeyBase58Encoded));
            const publicKeyBase58Encoded = (0, Xbqcrypto_1.base58Encode)(publicKey);
            if (account.publicKey && account.publicKey !== publicKeyBase58Encoded) {
                throw new Error("Public key does not correspond the the private key submitted");
            }
            // get wallet account address
            const version = Buffer.from((0, Xbqcrypto_1.varintEncode)(VERSION_NUMBER));
            const addressBase58Encoded = ADDRESS_PRAEFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, (0, Xbqcrypto_1.hashBlake3)(publicKey)]));
            if (account.address && account.address !== addressBase58Encoded) {
                throw new Error("Account address not correspond the the address submitted");
            }
            if (!this.getWalletAccountByAddress(addressBase58Encoded)) {
                accountsAdded.push({
                    address: addressBase58Encoded,
                    privateKey: privateKeyBase58Encoded,
                    publicKey: publicKeyBase58Encoded,
                    randomEntropy: account.randomEntropy
                });
            }
        }
        this.wallet.push(...accountsAdded);
        return accountsAdded;
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
                return Object.assign({ publicKey: this.wallet[index].publicKey, privateKey: this.wallet[index].privateKey, randomEntropy: this.wallet[index].randomEntropy }, info);
            });
        });
    }
    /** generate a new account */
    static walletGenerateNewAccount() {
        // generate private key
        const randomBytes = secp.utils.randomBytes(32);
        const privateKey = secp.utils.hashToPrivateKey(randomBytes);
        const privateKeyBase58Encoded = (0, Xbqcrypto_1.base58Encode)(privateKey);
        // get public key
        const publicKey = secp.schnorr.getPublicKey(privateKey);
        const publicKeyBase58Encoded = (0, Xbqcrypto_1.base58Encode)(publicKey);
        // get wallet account address
        const version = Buffer.from((0, Xbqcrypto_1.varintEncode)(VERSION_NUMBER));
        const addressBase58Encoded = ADDRESS_PRAEFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, (0, Xbqcrypto_1.hashBlake3)(publicKey)]));
        return {
            address: addressBase58Encoded,
            privateKey: privateKeyBase58Encoded,
            publicKey: publicKeyBase58Encoded,
            randomEntropy: (0, Xbqcrypto_1.base58Encode)(randomBytes)
        };
    }
    /** returns an account from private key */
    static getAccountFromPrivateKey(privateKeyBase58) {
        // get private key
        const privateKeyBase58Decoded = (0, Xbqcrypto_1.base58Decode)(privateKeyBase58);
        // get public key
        const publicKey = secp.schnorr.getPublicKey(privateKeyBase58Decoded);
        const publicKeyBase58Encoded = (0, Xbqcrypto_1.base58Encode)(publicKey);
        // get wallet account address
        const version = Buffer.from((0, Xbqcrypto_1.varintEncode)(VERSION_NUMBER));
        const addressBase58Encoded = ADDRESS_PRAEFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, (0, Xbqcrypto_1.hashBlake3)(publicKey)]));
        return {
            address: addressBase58Encoded,
            privateKey: privateKeyBase58,
            publicKey: publicKeyBase58Encoded,
            randomEntropy: null
        };
    }
    /** returns an account from entropy */
    static getAccountFromEntropy(entropyBase58) {
        // decode entropy
        const entropyBase58Decoded = (0, Xbqcrypto_1.base58Decode)(entropyBase58);
        // get private key
        const privateKey = secp.utils.hashToPrivateKey(entropyBase58Decoded);
        const privateKeyBase58Encoded = (0, Xbqcrypto_1.base58Encode)(privateKey);
        // get public key
        const publicKey = secp.schnorr.getPublicKey(privateKey);
        const publicKeyBase58Encoded = (0, Xbqcrypto_1.base58Encode)(publicKey);
        // get wallet account address
        const version = Buffer.from((0, Xbqcrypto_1.varintEncode)(VERSION_NUMBER));
        const addressBase58Encoded = ADDRESS_PRAEFIX + (0, Xbqcrypto_1.base58Encode)(Buffer.concat([version, (0, Xbqcrypto_1.hashBlake3)(publicKey)]));
        return {
            address: addressBase58Encoded,
            privateKey: privateKeyBase58Encoded,
            publicKey: publicKeyBase58Encoded,
            randomEntropy: entropyBase58
        };
    }
    /** sign random message data with an already added wallet account */
    signMessage(data, accountSignerAddress) {
        const signerAccount = this.getWalletAccountByAddress(accountSignerAddress);
        if (!signerAccount) {
            throw new Error(`No signer account ${accountSignerAddress} found in wallet`);
        }
        return WalletClient.walletSignMessage(data, signerAccount);
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
        // check private keys to sign the message with
        if (!signer.privateKey) {
            throw new Error("No private key to sign the message with");
        }
        // check public key to verify the message with
        if (!signer.publicKey) {
            throw new Error("No public key to verify the signed message with");
        }
        // cast private key
        const privateKeyBase58Decoded = (0, Xbqcrypto_1.base58Decode)(signer.privateKey);
        // bytes compaction
        const bytesCompact = Buffer.from(data);
        // Hash byte compact
        const messageHashDigest = (0, Xbqcrypto_1.hashBlake3)(bytesCompact);
        // sign the digest
        const sig = secp256k1_1.schnorr.signSync(messageHashDigest, privateKeyBase58Decoded);
        // check sig length
        if (sig.length != 64) {
            throw new Error(`Invalid signature length. Expected 64, got ${sig.length}`);
        }
        // verify signature
        if (signer.publicKey) {
            const publicKeyBase58Decoded = (0, Xbqcrypto_1.base58Decode)(signer.publicKey);
            const isVerified = secp256k1_1.schnorr.verifySync(sig, messageHashDigest, publicKeyBase58Decoded);
            if (!isVerified) {
                throw new Error(`Signature could not be verified with public key. Please inspect`);
            }
        }
        // convert sig
        const hex = secp.utils.bytesToHex(sig);
        const base58Encoded = (0, Xbqcrypto_1.base58Encode)(sig);
        return {
            hex,
            base58Encoded
        };
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
            const signature = WalletClient.walletSignMessage(bytesCompact, sender);
            // prepare tx data
            const data = {
                content: {
                    expire_period: expiryPeriod,
                    fee: txData.fee.toString(),
                    op: {
                        Transaction: {
                            amount: txData.amount.toString(),
                            recipient_address: txData.recipientAddress
                        }
                    },
                    creator_public_key: sender.publicKey
                },
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
            const signature = WalletClient.walletSignMessage(bytesCompact, sender);
            const data = {
                content: {
                    expire_period: expiryPeriod,
                    fee: txData.fee.toString(),
                    op: {
                        RollBuy: {
                            roll_count: txData.amount,
                        }
                    },
                    creator_public_key: sender.publicKey
                },
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
            const signature = WalletClient.walletSignMessage(bytesCompact, sender);
            const data = {
                content: {
                    expire_period: expiryPeriod,
                    fee: txData.fee.toString(),
                    op: {
                        RollSell: {
                            roll_count: txData.amount,
                        }
                    },
                    creator_public_key: sender.publicKey
                },
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