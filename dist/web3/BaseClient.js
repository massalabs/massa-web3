"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = exports.PERIOD_OFFSET = void 0;
const tslib_1 = require("tslib");
const IProvider_1 = require("../interfaces/IProvider");
const buffer_1 = require("buffer");
const Xbqcrypto_1 = require("../utils/Xbqcrypto");
const bn_js_1 = require("bn.js");
const axios_1 = require("axios");
const JsonRpcMethods_1 = require("../interfaces/JsonRpcMethods");
const OperationTypes_1 = require("../interfaces/OperationTypes");
const requestHeaders = {
    "Accept": "application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    'Access-Control-Allow-Origin': '*'
};
exports.PERIOD_OFFSET = 5;
/**  Base Client which is to be extended by other clients as it provides core methods */
class BaseClient {
    constructor(clientConfig) {
        this.clientConfig = clientConfig;
        this.clientConfig.periodOffset = this.clientConfig.periodOffset | exports.PERIOD_OFFSET;
        if (this.getPrivateProviders().length === 0) {
            throw new Error("Cannot initialize web3 with no private providers. Need at least one");
        }
        if (this.getPublicProviders().length === 0) {
            throw new Error("Cannot initialize web3 with no public providers. Need at least one");
        }
        // bind class methods
        this.getPrivateProviders = this.getPrivateProviders.bind(this);
        this.getProviderForRpcMethod = this.getProviderForRpcMethod.bind(this);
        this.getPublicProviders = this.getPublicProviders.bind(this);
        this.sendJsonRPCRequest = this.sendJsonRPCRequest.bind(this);
        this.compactBytesForOperation = this.compactBytesForOperation.bind(this);
    }
    /** return all private providers */
    getPrivateProviders() {
        return this.clientConfig.providers.filter((provider) => provider.type === IProvider_1.ProviderType.PRIVATE);
    }
    /** return all public providers */
    getPublicProviders() {
        return this.clientConfig.providers.filter((provider) => provider.type === IProvider_1.ProviderType.PUBLIC);
    }
    /** find provider for a concrete rpc method */
    getProviderForRpcMethod(requestMethod) {
        switch (requestMethod) {
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_ADDRESSES:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_STATUS:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_OPERATIONS:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_BLOCKS:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_CLIQUES:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_STAKERS:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_FILTERED_SC_OUTPUT_EVENT:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_BYTECODE:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_CALL: {
                return this.getPublicProviders()[0]; //TODO: choose the first available public provider ?
            }
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.STOP_NODE:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.BAN:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.UNBAN:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.NODE_SIGN_MESSAGE: {
                return this.getPrivateProviders()[0]; //TODO: choose the first available private provider ?
            }
            default: throw new Error("Unknown Json rpc method");
        }
    }
    /** send a post JSON rpc request to the node */
    sendJsonRPCRequest(resource, params) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const promise = new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                let resp = null;
                const body = {
                    "jsonrpc": "2.0",
                    "method": resource,
                    "params": params,
                    "id": 0
                };
                try {
                    resp = yield axios_1.default.post(this.getProviderForRpcMethod(resource).url, body, requestHeaders);
                }
                catch (ex) {
                    return resolve({
                        isError: true,
                        result: null,
                        error: new Error('JSON.parse error: ' + String(ex))
                    });
                }
                const responseData = resp.data;
                if (responseData.error) {
                    return resolve({
                        isError: true,
                        result: null,
                        error: new Error(responseData.error.message)
                    });
                }
                return resolve({
                    isError: false,
                    result: responseData.result,
                    error: null
                });
            }));
            let resp = null;
            try {
                resp = yield promise;
            }
            catch (ex) {
                throw ex;
            }
            // in case of rpc error, rethrow the error
            if (resp.error && resp.error) {
                throw resp.error;
            }
            return resp.result;
        });
    }
    /** scale an amount to blockchain precision */
    scaleAmount(inputAmount) {
        const amount = new bn_js_1.BN(inputAmount);
        const scaleFactor = (new bn_js_1.BN(10)).pow(new bn_js_1.BN(9));
        const amountScaled = amount.mul(scaleFactor);
        return amountScaled.toNumber();
    }
    /** compact bytes payload per operation */
    compactBytesForOperation(data, opTypeId, account, expirePeriod) {
        const feeEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(this.scaleAmount(data.fee)));
        const expirePeriodEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(expirePeriod));
        const publicKeyEncoded = (0, Xbqcrypto_1.base58checkDecode)(account.publicKey);
        const typeIdEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(opTypeId.valueOf()));
        switch (opTypeId) {
            case OperationTypes_1.OperationTypeId.ExecuteSC: {
                // revert base64 sc data to binary
                const decodedScBinaryCode = new Uint8Array(buffer_1.Buffer.from(data.contractDataBase64, 'base64'));
                // max gas
                const maxGasEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.maxGas));
                // coins to send
                const coinsEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.coins));
                // gas price
                const gasPriceEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.gasPrice));
                // contract data
                const contractDataEncoded = buffer_1.Buffer.from(decodedScBinaryCode);
                const dataLengthEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(contractDataEncoded.length));
                return buffer_1.Buffer.concat([feeEncoded, expirePeriodEncoded, publicKeyEncoded, typeIdEncoded, maxGasEncoded, coinsEncoded, gasPriceEncoded, dataLengthEncoded, contractDataEncoded]);
            }
            case OperationTypes_1.OperationTypeId.CallSC: {
                // max gas
                const maxGasEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.maxGas));
                // parallel coins to send
                const parallelCoinsEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.parallelCoins));
                // sequential coins to send
                const sequentialCoinsEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.sequentialCoins));
                // gas price
                const gasPriceEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.gasPrice));
                // target address
                const targetAddressEncoded = (0, Xbqcrypto_1.base58checkDecode)(data.targetAddress);
                // target function name and name length
                const functionNameEncoded = new Uint8Array(buffer_1.Buffer.from(data.functionName, 'utf8'));
                const functionNameLengthEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(functionNameEncoded.length));
                // parameter
                const parametersEncoded = new Uint8Array(buffer_1.Buffer.from(data.parameter, 'utf8'));
                const parametersLengthEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(parametersEncoded.length));
                return buffer_1.Buffer.concat([feeEncoded, expirePeriodEncoded, publicKeyEncoded, typeIdEncoded, maxGasEncoded, parallelCoinsEncoded, sequentialCoinsEncoded, gasPriceEncoded, targetAddressEncoded, functionNameLengthEncoded, functionNameEncoded, parametersLengthEncoded, parametersEncoded]);
            }
            case OperationTypes_1.OperationTypeId.Transaction: {
                // transfer amount
                const transferAmountEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(this.scaleAmount(data.amount)));
                // recipient
                const recipientAddressEncoded = (0, Xbqcrypto_1.base58checkDecode)(data.recipientAddress);
                return buffer_1.Buffer.concat([feeEncoded, expirePeriodEncoded, publicKeyEncoded, typeIdEncoded, recipientAddressEncoded, transferAmountEncoded]);
            }
            case OperationTypes_1.OperationTypeId.RollBuy:
            case OperationTypes_1.OperationTypeId.RollSell: {
                // rolls amount
                const amount = new bn_js_1.BN(data.amount);
                const rollsAmountEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(amount.toNumber()));
                return buffer_1.Buffer.concat([feeEncoded, expirePeriodEncoded, publicKeyEncoded, typeIdEncoded, rollsAmountEncoded]);
            }
        }
    }
}
exports.BaseClient = BaseClient;
//# sourceMappingURL=BaseClient.js.map