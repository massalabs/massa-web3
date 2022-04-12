"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractsClient = void 0;
const tslib_1 = require("tslib");
const EOperationStatus_1 = require("../interfaces/EOperationStatus");
const JsonRpcMethods_1 = require("../interfaces/JsonRpcMethods");
const OperationTypes_1 = require("../interfaces/OperationTypes");
const retryExecuteFunction_1 = require("../utils/retryExecuteFunction");
const Wait_1 = require("../utils/Wait");
const Xbqcrypto_1 = require("../utils/Xbqcrypto");
const BaseClient_1 = require("./BaseClient");
const WalletClient_1 = require("./WalletClient");
const TX_POLL_INTERVAL_MS = 10000;
const TX_STATUS_CHECK_RETRY_COUNT = 100;
/** Smart Contracts Client which enables compilation, deployment and streaming of events */
class SmartContractsClient extends BaseClient_1.BaseClient {
    constructor(clientConfig, publicApiClient, walletClient) {
        super(clientConfig);
        this.publicApiClient = publicApiClient;
        this.walletClient = walletClient;
        // bind class methods
        this.deploySmartContract = this.deploySmartContract.bind(this);
        this.getFilteredScOutputEvents = this.getFilteredScOutputEvents.bind(this);
        this.executeReadOnlySmartContract = this.executeReadOnlySmartContract.bind(this);
        this.awaitRequiredOperationStatus = this.awaitRequiredOperationStatus.bind(this);
        this.getOperationStatus = this.getOperationStatus.bind(this);
        this.callSmartContract = this.callSmartContract.bind(this);
        this.readSmartContract = this.readSmartContract.bind(this);
        this.getParallelBalance = this.getParallelBalance.bind(this);
    }
    /** create and send an operation containing byte code */
    deploySmartContract(contractData, executor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // get next period info
            const nodeStatusInfo = yield this.publicApiClient.getNodeStatus();
            const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
            // get the block size
            if (contractData.contractDataBase64.length > nodeStatusInfo.config.max_block_size / 2) {
                console.warn("bytecode size exceeded half of the maximum size of a block, operation will certainly be rejected");
            }
            // bytes compaction
            const bytesCompact = this.compactBytesForOperation(contractData, OperationTypes_1.OperationTypeId.ExecuteSC, executor, expiryPeriod);
            // sign payload
            const signature = yield WalletClient_1.WalletClient.walletSignMessage(bytesCompact, executor);
            // revert base64 sc data to binary
            if (!contractData.contractDataBase64) {
                throw new Error(`Contract base64 encoded data required. Got null`);
            }
            const decodedScBinaryCode = new Uint8Array(Buffer.from(contractData.contractDataBase64, "base64"));
            const data = {
                content: {
                    expire_period: expiryPeriod,
                    fee: contractData.fee.toString(),
                    op: {
                        ExecuteSC: {
                            data: Array.from(decodedScBinaryCode),
                            max_gas: contractData.maxGas,
                            coins: contractData.coins.toString(),
                            gas_price: contractData.gasPrice.toString()
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
    /** call smart contract method */
    callSmartContract(callData, executor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // get next period info
            const nodeStatusInfo = yield this.publicApiClient.getNodeStatus();
            const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
            // check if the param payload is already stringified
            let stringifiedParamPayload = callData.parameter;
            try {
                // if this call succeeds it means the payload is already a stringified json
                JSON.parse(callData.parameter);
            }
            catch (e) {
                // payload is not a stringified json, also stringify
                stringifiedParamPayload = JSON.stringify(callData.parameter);
            }
            callData.parameter = stringifiedParamPayload;
            // bytes compaction
            const bytesCompact = this.compactBytesForOperation(callData, OperationTypes_1.OperationTypeId.CallSC, executor, expiryPeriod);
            // sign payload
            const signature = yield WalletClient_1.WalletClient.walletSignMessage(bytesCompact, executor);
            // request data
            const data = {
                content: {
                    expire_period: expiryPeriod,
                    fee: callData.fee.toString(),
                    op: {
                        CallSC: {
                            max_gas: callData.maxGas,
                            gas_price: callData.gasPrice.toString(),
                            parallel_coins: callData.parallelCoins.toString(),
                            sequential_coins: callData.sequentialCoins.toString(),
                            target_addr: callData.targetAddress,
                            target_func: callData.functionName,
                            param: callData.parameter,
                        }
                    },
                    sender_public_key: executor.publicKey
                },
                signature: signature.base58Encoded,
            };
            // returns operation ids
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[data]]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [[data]]);
            }
        });
    }
    /** read smart contract method */
    readSmartContract(readData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // check if the param payload is already stringified
            let stringifiedParamPayload = readData.parameter;
            try {
                // if this call succeeds it means the payload is already a stringified json
                JSON.parse(readData.parameter);
            }
            catch (e) {
                // payload is not a stringified json, also stringify
                stringifiedParamPayload = JSON.stringify(readData.parameter);
            }
            readData.parameter = stringifiedParamPayload;
            // request data
            const data = {
                max_gas: readData.maxGas,
                simulated_gas_price: readData.simulatedGasPrice.toString(),
                target_address: readData.targetAddress,
                target_function: readData.targetFunction,
                parameter: "undefined",
                caller_address: readData.callerAddress
            };
            // returns operation ids
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_CALL;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[data]]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [[data]]);
            }
        });
    }
    /** Returns the parallel balance which is the smart contract side balance  */
    getParallelBalance(address) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const addresses = yield this.publicApiClient.getAddresses([address]);
            if (addresses.length === 0)
                return null;
            const addressInfo = addresses.at(0);
            return {
                candidate: addressInfo.candidate_sce_ledger_info.balance,
                final: addressInfo.final_sce_ledger_info.balance
            };
        });
    }
    /** get filtered smart contract events */
    getFilteredScOutputEvents(eventFilterData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = {
                start: eventFilterData.start,
                end: eventFilterData.end,
                emitter_address: eventFilterData.emitter_address,
                original_caller_address: eventFilterData.original_caller_address,
                original_operation_id: eventFilterData.original_operation_id,
            };
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_FILTERED_SC_OUTPUT_EVENT;
            // returns filtered events
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [data]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [data]);
            }
        });
    }
    /** Returns the smart contract data storage */
    getDatastoreEntry(address, key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const addresses = yield this.publicApiClient.getAddresses([address]);
            if (addresses.length === 0)
                return null;
            const addressInfo = addresses.at(0);
            const base58EncodedKey = (0, Xbqcrypto_1.base58checkEncode)(Buffer.from((0, Xbqcrypto_1.hashSha256)(key)));
            const data = addressInfo.candidate_sce_ledger_info.datastore[base58EncodedKey];
            let res = "";
            for (let i = 0; i < data.toString().length; ++i) {
                res.concat(String.fromCharCode(parseInt(data[i])));
            }
            return res;
        });
    }
    /** Read-only smart contracts */
    executeReadOnlySmartContract(contractData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (!contractData.contractDataBinary) {
                throw new Error(`Contract binary data required. Got null`);
            }
            if (!contractData.address) {
                throw new Error(`Contract address required. Got null`);
            }
            const data = {
                max_gas: contractData.maxGas,
                simulated_gas_price: contractData.gasPrice.toString(),
                bytecode: Array.from(contractData.contractDataBinary),
                address: contractData.address,
            };
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_BYTECODE;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[data]]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [[data]]);
            }
        });
    }
    getOperationStatus(opId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const operationData = yield this.publicApiClient.getOperations([opId]);
            console.log(operationData);
            if (!operationData || operationData.length === 0)
                return EOperationStatus_1.EOperationStatus.NOT_FOUND;
            const opData = operationData[0];
            if (opData.is_final) {
                return EOperationStatus_1.EOperationStatus.FINAL;
            }
            if (opData.in_blocks.length > 0) {
                return EOperationStatus_1.EOperationStatus.INCLUDED_PENDING;
            }
            if (opData.in_pool) {
                return EOperationStatus_1.EOperationStatus.AWAITING_INCLUSION;
            }
            return EOperationStatus_1.EOperationStatus.INCONSISTENT;
        });
    }
    awaitRequiredOperationStatus(opId, requiredStatus) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let errCounter = 0;
            let pendingCounter = 0;
            while (true) {
                let status = EOperationStatus_1.EOperationStatus.NOT_FOUND;
                try {
                    status = yield this.getOperationStatus(opId);
                }
                catch (ex) {
                    if (++errCounter > 100) {
                        const msg = `Failed to retrieve the tx status after 10 failed attempts for operation id: ${opId}.`;
                        console.error(msg, ex);
                        throw ex;
                    }
                    yield (0, Wait_1.wait)(TX_POLL_INTERVAL_MS);
                }
                if (status == requiredStatus) {
                    return status;
                }
                if (++pendingCounter > 1000) {
                    const msg = `Getting the tx status for operation Id ${opId} took too long to conclude. We gave up after ${TX_POLL_INTERVAL_MS * TX_STATUS_CHECK_RETRY_COUNT}ms.`;
                    console.warn(msg);
                    throw new Error(msg);
                }
                yield (0, Wait_1.wait)(TX_POLL_INTERVAL_MS);
            }
        });
    }
}
exports.SmartContractsClient = SmartContractsClient;
//# sourceMappingURL=SmartContractsClient.js.map