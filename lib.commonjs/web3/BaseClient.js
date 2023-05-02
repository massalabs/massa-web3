"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = exports.PERIOD_OFFSET = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const IProvider_1 = require("../interfaces/IProvider");
const buffer_1 = require("buffer");
const Xbqcrypto_1 = require("../utils/Xbqcrypto");
const JsonRpcMethods_1 = require("../interfaces/JsonRpcMethods");
const OperationTypes_1 = require("../interfaces/OperationTypes");
const superagent = require('superagent');
const encodeAddressToBytes = (address, isSmartContract = false) => {
    let targetAddressEncoded = (0, Xbqcrypto_1.base58Decode)(address.slice(2)).slice(1);
    targetAddressEncoded = buffer_1.Buffer.concat([
        isSmartContract ? buffer_1.Buffer.from([1]) : buffer_1.Buffer.from([0]),
        targetAddressEncoded,
    ]);
    return targetAddressEncoded;
};
const requestHeaders = {
    Accept: 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};
exports.PERIOD_OFFSET = 5;
/**  Base Client which is to be extended by other clients as it provides core methods */
class BaseClient {
    clientConfig;
    constructor(clientConfig) {
        this.clientConfig = clientConfig;
        this.clientConfig.periodOffset =
            this.clientConfig.periodOffset | exports.PERIOD_OFFSET;
        if (this.getPrivateProviders().length === 0) {
            throw new Error('Cannot initialize web3 with no private providers. Need at least one');
        }
        if (this.getPublicProviders().length === 0) {
            throw new Error('Cannot initialize web3 with no public providers. Need at least one');
        }
        // bind class methods
        this.getPrivateProviders = this.getPrivateProviders.bind(this);
        this.getProviderForRpcMethod = this.getProviderForRpcMethod.bind(this);
        this.getPublicProviders = this.getPublicProviders.bind(this);
        this.sendJsonRPCRequest = this.sendJsonRPCRequest.bind(this);
        this.compactBytesForOperation = this.compactBytesForOperation.bind(this);
        this.setProviders = this.setProviders.bind(this);
        this.promisifyJsonRpcCall = this.promisifyJsonRpcCall.bind(this);
    }
    /** set new providers */
    setProviders(providers) {
        this.clientConfig.providers = providers;
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
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_CALL:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_DATASTORE_ENTRIES:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_BLOCKCLIQUE_BLOCK_BY_SLOT:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_GRAPH_INTERVAL: {
                return this.getPublicProviders()[0]; // TODO: choose the first available public provider ?
            }
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.STOP_NODE:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_ID:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_IP:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_ID:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_IP:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.NODE_SIGN_MESSAGE:
            case JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.NODE_REMOVE_FROM_WHITELIST: {
                return this.getPrivateProviders()[0]; // TODO: choose the first available private provider ?
            }
            default:
                throw new Error(`Unknown Json rpc method: ${requestMethod}`);
        }
    }
    async promisifyJsonRpcCall(resource, params) {
        let resp = null;
        const body = {
            jsonrpc: '2.0',
            method: resource,
            params: params,
            id: 0,
        };
        let client = superagent.post(this.getProviderForRpcMethod(resource).url);
        try {
            for (const key of Object.keys(requestHeaders)) {
                client.set(key, requestHeaders[key]);
            }
            resp = await client.send(body);
        }
        catch (ex) {
            return {
                isError: true,
                result: null,
                error: new Error('JSON.parse error: ' + String(ex)),
            };
        }
        const responseData = resp.body;
        if (responseData.error) {
            return {
                isError: true,
                result: null,
                error: new Error(responseData.error.message),
            };
        }
        return {
            isError: false,
            result: responseData.json,
            error: null,
        };
    }
    /** send a post JSON rpc request to the node */
    async sendJsonRPCRequest(resource, params) {
        let resp = null;
        resp = await this.promisifyJsonRpcCall(resource, params);
        // in case of rpc error, rethrow the error
        if (resp.error && resp.error) {
            throw resp.error;
        }
        return resp.result;
    }
    /** compact bytes payload per operation */
    compactBytesForOperation(data, opTypeId, account, expirePeriod) {
        const feeEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.fee));
        const expirePeriodEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(expirePeriod));
        const typeIdEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(opTypeId.valueOf()));
        switch (opTypeId) {
            case OperationTypes_1.OperationTypeId.ExecuteSC: {
                // get sc data binary
                const scBinaryCode = data.contractDataBinary;
                // max gas
                const maxGasEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.maxGas));
                // contract data
                const contractDataEncoded = buffer_1.Buffer.from(scBinaryCode);
                const dataLengthEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(contractDataEncoded.length));
                // smart contract operation datastore
                const datastoreKeyMap = data.datastore
                    ? data.datastore
                    : new Map();
                let datastoreSerializedBuffer = buffer_1.Buffer.from(new Uint8Array());
                for (const [key, value] of datastoreKeyMap) {
                    const encodedKeyBytes = buffer_1.Buffer.from(key);
                    const encodedKeyLen = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(encodedKeyBytes.length));
                    const encodedValueBytes = buffer_1.Buffer.from(value);
                    const encodedValueLen = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(encodedValueBytes.length));
                    datastoreSerializedBuffer = buffer_1.Buffer.concat([
                        datastoreSerializedBuffer,
                        encodedKeyLen,
                        encodedKeyBytes,
                        encodedValueLen,
                        encodedValueBytes,
                    ]);
                }
                const datastoreSerializedBufferLen = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(datastoreKeyMap.size));
                if (datastoreSerializedBuffer.length === 0) {
                    return buffer_1.Buffer.concat([
                        feeEncoded,
                        expirePeriodEncoded,
                        typeIdEncoded,
                        maxGasEncoded,
                        dataLengthEncoded,
                        contractDataEncoded,
                        datastoreSerializedBufferLen,
                    ]);
                }
                return buffer_1.Buffer.concat([
                    feeEncoded,
                    expirePeriodEncoded,
                    typeIdEncoded,
                    maxGasEncoded,
                    dataLengthEncoded,
                    contractDataEncoded,
                    datastoreSerializedBufferLen,
                    datastoreSerializedBuffer,
                ]);
            }
            case OperationTypes_1.OperationTypeId.CallSC: {
                // max gas
                const maxGasEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.maxGas));
                // coins to send
                const coinsEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.coins));
                // target address
                const targetAddressEncoded = encodeAddressToBytes(data.targetAddress, true);
                // target function name and name length
                const functionNameEncoded = new Uint8Array(buffer_1.Buffer.from(data.functionName, 'utf8'));
                const functionNameLengthEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(functionNameEncoded.length));
                // parameter
                const parametersEncoded = new Uint8Array(data.parameter);
                const parametersLengthEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(parametersEncoded.length));
                return buffer_1.Buffer.concat([
                    feeEncoded,
                    expirePeriodEncoded,
                    typeIdEncoded,
                    maxGasEncoded,
                    coinsEncoded,
                    targetAddressEncoded,
                    functionNameLengthEncoded,
                    functionNameEncoded,
                    parametersLengthEncoded,
                    parametersEncoded,
                ]);
            }
            case OperationTypes_1.OperationTypeId.Transaction: {
                // transfer amount
                const amount = data.amount;
                const transferAmountEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(amount));
                // recipient
                const recipientAddressEncoded = encodeAddressToBytes(data.recipientAddress, false);
                return buffer_1.Buffer.concat([
                    feeEncoded,
                    expirePeriodEncoded,
                    typeIdEncoded,
                    recipientAddressEncoded,
                    transferAmountEncoded,
                ]);
            }
            case OperationTypes_1.OperationTypeId.RollBuy:
            case OperationTypes_1.OperationTypeId.RollSell: {
                // rolls amount
                const rollsAmountEncoded = buffer_1.Buffer.from((0, Xbqcrypto_1.varintEncode)(data.amount));
                return buffer_1.Buffer.concat([
                    feeEncoded,
                    expirePeriodEncoded,
                    typeIdEncoded,
                    rollsAmountEncoded,
                ]);
            }
        }
    }
}
exports.BaseClient = BaseClient;
//# sourceMappingURL=BaseClient.js.map