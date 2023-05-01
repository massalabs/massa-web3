/* eslint-disable @typescript-eslint/no-var-requires */
import { ProviderType } from '../interfaces/IProvider';
import { Buffer } from 'buffer';
import { base58Decode, varintEncode } from '../utils/Xbqcrypto';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { OperationTypeId } from '../interfaces/OperationTypes';
const superagent = require('superagent');
const encodeAddressToBytes = (address, isSmartContract = false) => {
    let targetAddressEncoded = base58Decode(address.slice(2)).slice(1);
    targetAddressEncoded = Buffer.concat([
        isSmartContract ? Buffer.from([1]) : Buffer.from([0]),
        targetAddressEncoded,
    ]);
    return targetAddressEncoded;
};
const requestHeaders = {
    'Accept': 'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
};
export const PERIOD_OFFSET = 5;
/**  Base Client which is to be extended by other clients as it provides core methods */
export class BaseClient {
    clientConfig;
    constructor(clientConfig) {
        this.clientConfig = clientConfig;
        this.clientConfig.periodOffset =
            this.clientConfig.periodOffset | PERIOD_OFFSET;
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
        return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PRIVATE);
    }
    /** return all public providers */
    getPublicProviders() {
        return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PUBLIC);
    }
    /** find provider for a concrete rpc method */
    getProviderForRpcMethod(requestMethod) {
        switch (requestMethod) {
            case JSON_RPC_REQUEST_METHOD.GET_ADDRESSES:
            case JSON_RPC_REQUEST_METHOD.GET_STATUS:
            case JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS:
            case JSON_RPC_REQUEST_METHOD.GET_OPERATIONS:
            case JSON_RPC_REQUEST_METHOD.GET_BLOCKS:
            case JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS:
            case JSON_RPC_REQUEST_METHOD.GET_CLIQUES:
            case JSON_RPC_REQUEST_METHOD.GET_STAKERS:
            case JSON_RPC_REQUEST_METHOD.GET_FILTERED_SC_OUTPUT_EVENT:
            case JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_BYTECODE:
            case JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_CALL:
            case JSON_RPC_REQUEST_METHOD.GET_DATASTORE_ENTRIES:
            case JSON_RPC_REQUEST_METHOD.GET_BLOCKCLIQUE_BLOCK_BY_SLOT:
            case JSON_RPC_REQUEST_METHOD.GET_GRAPH_INTERVAL: {
                return this.getPublicProviders()[0]; // TODO: choose the first available public provider ?
            }
            case JSON_RPC_REQUEST_METHOD.STOP_NODE:
            case JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_ID:
            case JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_IP:
            case JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_ID:
            case JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_IP:
            case JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES:
            case JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES:
            case JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS:
            case JSON_RPC_REQUEST_METHOD.NODE_SIGN_MESSAGE:
            case JSON_RPC_REQUEST_METHOD.NODE_REMOVE_FROM_WHITELIST: {
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
        const feeEncoded = Buffer.from(varintEncode(data.fee));
        const expirePeriodEncoded = Buffer.from(varintEncode(expirePeriod));
        const typeIdEncoded = Buffer.from(varintEncode(opTypeId.valueOf()));
        switch (opTypeId) {
            case OperationTypeId.ExecuteSC: {
                // get sc data binary
                const scBinaryCode = data.contractDataBinary;
                // max gas
                const maxGasEncoded = Buffer.from(varintEncode(data.maxGas));
                // contract data
                const contractDataEncoded = Buffer.from(scBinaryCode);
                const dataLengthEncoded = Buffer.from(varintEncode(contractDataEncoded.length));
                // smart contract operation datastore
                const datastoreKeyMap = data.datastore
                    ? data.datastore
                    : new Map();
                let datastoreSerializedBuffer = Buffer.from(new Uint8Array());
                for (const [key, value] of datastoreKeyMap) {
                    const encodedKeyBytes = Buffer.from(key);
                    const encodedKeyLen = Buffer.from(varintEncode(encodedKeyBytes.length));
                    const encodedValueBytes = Buffer.from(value);
                    const encodedValueLen = Buffer.from(varintEncode(encodedValueBytes.length));
                    datastoreSerializedBuffer = Buffer.concat([
                        datastoreSerializedBuffer,
                        encodedKeyLen,
                        encodedKeyBytes,
                        encodedValueLen,
                        encodedValueBytes,
                    ]);
                }
                const datastoreSerializedBufferLen = Buffer.from(varintEncode(datastoreKeyMap.size));
                if (datastoreSerializedBuffer.length === 0) {
                    return Buffer.concat([
                        feeEncoded,
                        expirePeriodEncoded,
                        typeIdEncoded,
                        maxGasEncoded,
                        dataLengthEncoded,
                        contractDataEncoded,
                        datastoreSerializedBufferLen,
                    ]);
                }
                return Buffer.concat([
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
            case OperationTypeId.CallSC: {
                // max gas
                const maxGasEncoded = Buffer.from(varintEncode(data.maxGas));
                // coins to send
                const coinsEncoded = Buffer.from(varintEncode(data.coins));
                // target address
                const targetAddressEncoded = encodeAddressToBytes(data.targetAddress, true);
                // target function name and name length
                const functionNameEncoded = new Uint8Array(Buffer.from(data.functionName, 'utf8'));
                const functionNameLengthEncoded = Buffer.from(varintEncode(functionNameEncoded.length));
                // parameter
                const parametersEncoded = new Uint8Array(data.parameter);
                const parametersLengthEncoded = Buffer.from(varintEncode(parametersEncoded.length));
                return Buffer.concat([
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
            case OperationTypeId.Transaction: {
                // transfer amount
                const amount = data.amount;
                const transferAmountEncoded = Buffer.from(varintEncode(amount));
                // recipient
                const recipientAddressEncoded = encodeAddressToBytes(data.recipientAddress, false);
                return Buffer.concat([
                    feeEncoded,
                    expirePeriodEncoded,
                    typeIdEncoded,
                    recipientAddressEncoded,
                    transferAmountEncoded,
                ]);
            }
            case OperationTypeId.RollBuy:
            case OperationTypeId.RollSell: {
                // rolls amount
                const rollsAmountEncoded = Buffer.from(varintEncode(data.amount));
                return Buffer.concat([
                    feeEncoded,
                    expirePeriodEncoded,
                    typeIdEncoded,
                    rollsAmountEncoded,
                ]);
            }
        }
    }
}
//# sourceMappingURL=BaseClient.js.map