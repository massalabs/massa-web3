"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletClient = void 0;
const tslib_1 = require("tslib");
const secp = require("@noble/secp256k1");
const BaseClient_1 = require("./BaseClient");
const Xbqcrypto_1 = require("../utils/Xbqcrypto");
const bn_js_1 = require("bn.js");
const JsonRpcMethods_1 = require("../interfaces/JsonRpcMethods");
const retryExecuteFunction_1 = require("../utils/retryExecuteFunction");
const OperationTypes_1 = require("../interfaces/OperationTypes");
const crypto = require("crypto");
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
            this.addAccountsToWallet([baseAccount]);
        }
    }
    /** set the default (base) account */
    setBaseAccount(baseAccount) {
        let randomEntropy = null;
        if (!randomEntropy) {
            randomEntropy = crypto.randomBytes(32);
        }
        this.baseAccount = Object.assign(Object.assign({}, baseAccount), { randomEntropy });
        // see if base account is already added, if not, add it
        if (!this.getWalletAccountByAddress(baseAccount.address)) {
            this.addAccountsToWallet([baseAccount]);
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
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (privateKeys.length > MAX_WALLET_ACCOUNTS) {
                throw new Error(`Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}. Submitted private keys: ${privateKeys.length}`);
            }
            for (const privateKey of privateKeys) {
                const privateKeyBase58Decoded = (0, Xbqcrypto_1.base58checkDecode)(privateKey);
                const publicKey = secp.getPublicKey(privateKeyBase58Decoded, true); // key is compressed!
                const publicKeyBase58Encoded = (0, Xbqcrypto_1.base58checkEncode)(publicKey);
                const address = yield secp.utils.sha256(publicKey);
                const addressBase58Encoded = (0, Xbqcrypto_1.base58checkEncode)(address);
                if (!this.getWalletAccountByAddress(addressBase58Encoded)) {
                    this.wallet.push({
                        privateKey: privateKey,
                        publicKey: publicKeyBase58Encoded,
                        address: addressBase58Encoded,
                        randomEntropy: crypto.randomBytes(32)
                    });
                }
            }
        });
    }
    /** add accounts to wallet. Prerequisite: each account must have a full set of data (private, public keys and an address) */
    addAccountsToWallet(accounts) {
        if (accounts.length > MAX_WALLET_ACCOUNTS) {
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
            let randomEntropy = null;
            if (!account.randomEntropy) {
                randomEntropy = crypto.randomBytes(32);
            }
            if (!this.getWalletAccountByAddress(account.address)) {
                this.wallet.push(Object.assign(Object.assign({}, account), { randomEntropy }));
            }
        }
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
                return Object.assign({ publicKey: this.wallet[index].publicKey, privateKey: this.wallet[index].privateKey }, info);
            });
        });
    }
    /** generate a private and public key account and add it into the wallet */
    static walletGenerateNewAccount() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // generate private key
            const privateKey = secp.utils.randomPrivateKey();
            const privateKeyBase58Encoded = (0, Xbqcrypto_1.base58checkEncode)(privateKey);
            // get public key
            const publicKey = secp.getPublicKey(privateKey, true);
            const publicKeyBase58Encoded = (0, Xbqcrypto_1.base58checkEncode)(publicKey);
            // get wallet account address
            const address = yield secp.utils.sha256(publicKey);
            const addressBase58Encoded = (0, Xbqcrypto_1.base58checkEncode)(address);
            return {
                address: addressBase58Encoded,
                privateKey: privateKeyBase58Encoded,
                publicKey: publicKeyBase58Encoded,
                randomEntropy: crypto.randomBytes(32)
            };
        });
    }
    /** generate an account from private key */
    static getAccountFromPrivateKey(privateKeyBase58) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // get private key
            const privateKeyBase58Decoded = (0, Xbqcrypto_1.base58checkDecode)(privateKeyBase58);
            // get public key
            const publicKey = secp.getPublicKey(privateKeyBase58Decoded, true); // key is compressed!
            const publicKeyBase58Encoded = (0, Xbqcrypto_1.base58checkEncode)(publicKey);
            // get wallet account address
            const address = yield secp.utils.sha256(publicKey);
            const addressBase58Encoded = (0, Xbqcrypto_1.base58checkEncode)(address);
            return {
                address: addressBase58Encoded,
                privateKey: privateKeyBase58,
                publicKey: publicKeyBase58Encoded,
                randomEntropy: crypto.randomBytes(32)
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
            return yield WalletClient.walletSignMessage(data, signerAccount);
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
            if (!signer.privateKey) {
                throw new Error("No private key to sign the message with");
            }
            // check public key to verify the message with
            if (!signer.publicKey) {
                throw new Error("No public key to verify the signed message with");
            }
            // cast private key
            const privateKeyBase58Decoded = (0, Xbqcrypto_1.base58checkDecode)(signer.privateKey);
            // bytes compaction
            const bytesCompact = Buffer.from(data);
            // Hash byte compact
            const messageHashDigest = yield secp.utils.sha256(bytesCompact);
            // sign the digest
            const sig = yield secp.sign(messageHashDigest, privateKeyBase58Decoded, {
                der: false,
                recovered: true
            });
            // check sig length
            if (sig[0].length != 64) {
                throw new Error(`Invalid signature length. Expected 64, got ${sig[0].length}`);
            }
            // verify signature
            if (signer.publicKey) {
                const publicKeyBase58Decoded = (0, Xbqcrypto_1.base58checkDecode)(signer.publicKey);
                const base58PublicKey = new bn_js_1.BN(publicKeyBase58Decoded, 16);
                const isVerified = secp.verify(sig[0], messageHashDigest, base58PublicKey.toArrayLike(Buffer, "be", 33));
                if (!isVerified) {
                    throw new Error(`Signature could not be verified with public key. Please inspect`);
                }
            }
            // extract sig vector
            const r = sig[0].slice(0, 32);
            const s = sig[0].slice(32);
            const v = sig[1];
            const hex = secp.utils.bytesToHex(sig[0]);
            const base58Encoded = (0, Xbqcrypto_1.base58checkEncode)(Buffer.concat([r, s]));
            return {
                r,
                s,
                v,
                hex,
                base58Encoded
            };
        });
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
            // get next period info
            const nodeStatusInfo = yield this.publicApiClient.getNodeStatus();
            const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
            // bytes compaction
            const bytesCompact = this.compactBytesForOperation(txData, OperationTypes_1.OperationTypeId.Transaction, executor, expiryPeriod);
            // sign payload
            const signature = yield WalletClient.walletSignMessage(bytesCompact, executor);
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
                    sender_public_key: executor.publicKey
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
            // get next period info
            const nodeStatusInfo = yield this.publicApiClient.getNodeStatus();
            const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
            // bytes compaction
            const bytesCompact = this.compactBytesForOperation(txData, OperationTypes_1.OperationTypeId.RollBuy, executor, expiryPeriod);
            // sign payload
            const signature = yield WalletClient.walletSignMessage(bytesCompact, executor);
            const data = {
                content: {
                    expire_period: expiryPeriod,
                    fee: txData.fee.toString(),
                    op: {
                        RollBuy: {
                            roll_count: txData.amount,
                        }
                    },
                    sender_public_key: executor.publicKey
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
            // get next period info
            const nodeStatusInfo = yield this.publicApiClient.getNodeStatus();
            const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
            // bytes compaction
            const bytesCompact = this.compactBytesForOperation(txData, OperationTypes_1.OperationTypeId.RollSell, executor, expiryPeriod);
            // sign payload
            const signature = yield WalletClient.walletSignMessage(bytesCompact, executor);
            const data = {
                content: {
                    expire_period: expiryPeriod,
                    fee: txData.fee.toString(),
                    op: {
                        RollSell: {
                            roll_count: txData.amount,
                        }
                    },
                    sender_public_key: executor.publicKey
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