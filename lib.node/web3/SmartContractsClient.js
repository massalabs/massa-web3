"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContractsClient = void 0;
const EOperationStatus_1 = require("../interfaces/EOperationStatus");
const JsonRpcMethods_1 = require("../interfaces/JsonRpcMethods");
const OperationTypes_1 = require("../interfaces/OperationTypes");
const converters_1 = require("../utils/converters");
const retryExecuteFunction_1 = require("../utils/retryExecuteFunction");
const time_1 = require("../utils/time");
const BaseClient_1 = require("./BaseClient");
const WalletClient_1 = require("./WalletClient");
const MAX_READ_BLOCK_GAS = BigInt(4294967295);
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
        this.executeReadOnlySmartContract =
            this.executeReadOnlySmartContract.bind(this);
        this.awaitRequiredOperationStatus =
            this.awaitRequiredOperationStatus.bind(this);
        this.getOperationStatus = this.getOperationStatus.bind(this);
        this.callSmartContract = this.callSmartContract.bind(this);
        this.readSmartContract = this.readSmartContract.bind(this);
        this.getContractBalance = this.getContractBalance.bind(this);
    }
    /** create and send an operation containing byte code */
    async deploySmartContract(contractData, executor) {
        // get next period info
        const nodeStatusInfo = await this.publicApiClient.getNodeStatus();
        const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
        // get the block size
        if (contractData.contractDataBinary.length >
            nodeStatusInfo.config.max_block_size / 2) {
            console.warn('bytecode size exceeded half of the maximum size of a block, operation will certainly be rejected');
        }
        // check sender account
        const sender = executor || this.walletClient.getBaseAccount();
        if (!sender) {
            throw new Error(`No tx sender available`);
        }
        // bytes compaction
        const bytesCompact = this.compactBytesForOperation(contractData, OperationTypes_1.OperationTypeId.ExecuteSC, sender, expiryPeriod);
        // sign payload
        const signature = await WalletClient_1.WalletClient.walletSignMessage(Buffer.concat([
            WalletClient_1.WalletClient.getBytesPublicKey(sender.publicKey),
            bytesCompact,
        ]), sender);
        // Check if SC data exists
        if (!contractData.contractDataBinary) {
            throw new Error(`Contract data required. Got null`);
        }
        const data = {
            serialized_content: Array.prototype.slice.call(bytesCompact),
            creator_public_key: sender.publicKey,
            signature: signature.base58Encoded,
        };
        // returns operation ids
        const opIds = await this.sendJsonRPCRequest(JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
        if (opIds.length <= 0) {
            throw new Error(`Deploy smart contract operation bad response. No results array in json rpc response. Inspect smart contract`);
        }
        return opIds[0];
    }
    /** call smart contract method */
    async callSmartContract(callData, executor) {
        // get next period info
        const nodeStatusInfo = await this.publicApiClient.getNodeStatus();
        const expiryPeriod = nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;
        // check sender account
        const sender = executor || this.walletClient.getBaseAccount();
        if (!sender) {
            throw new Error(`No tx sender available`);
        }
        // bytes compaction
        const bytesCompact = this.compactBytesForOperation(callData, OperationTypes_1.OperationTypeId.CallSC, sender, expiryPeriod);
        // sign payload
        const signature = await WalletClient_1.WalletClient.walletSignMessage(Buffer.concat([
            WalletClient_1.WalletClient.getBytesPublicKey(sender.publicKey),
            bytesCompact,
        ]), sender);
        // request data
        const data = {
            serialized_content: Array.prototype.slice.call(bytesCompact),
            creator_public_key: sender.publicKey,
            signature: signature.base58Encoded,
        };
        // returns operation ids
        let opIds = [];
        const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS;
        if (this.clientConfig.retryStrategyOn) {
            opIds = await (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [[data]],
            ]);
        }
        else {
            opIds = await this.sendJsonRPCRequest(jsonRpcRequestMethod, [[data]]);
        }
        if (opIds.length <= 0) {
            throw new Error(`Call smart contract operation bad response. No results array in json rpc response. Inspect smart contract`);
        }
        return opIds[0];
    }
    /** read smart contract method */
    async readSmartContract(readData) {
        // check the max. allowed gas
        if (readData.maxGas > MAX_READ_BLOCK_GAS) {
            throw new Error(`The gas submitted ${readData.maxGas.toString()} exceeds the max. allowed block gas of ${MAX_READ_BLOCK_GAS.toString()}`);
        }
        // request data
        let baseAccountSignerAddress = null;
        if (this.walletClient.getBaseAccount()) {
            baseAccountSignerAddress = this.walletClient.getBaseAccount().address;
        }
        const data = {
            max_gas: Number(readData.maxGas),
            target_address: readData.targetAddress,
            target_function: readData.targetFunction,
            parameter: readData.parameter,
            caller_address: readData.callerAddress || baseAccountSignerAddress,
        };
        // returns operation ids
        const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_CALL;
        let jsonRpcCallResult = [];
        if (this.clientConfig.retryStrategyOn) {
            jsonRpcCallResult = await (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[data]]]);
        }
        else {
            jsonRpcCallResult = await this.sendJsonRPCRequest(jsonRpcRequestMethod, [
                [data],
            ]);
        }
        if (jsonRpcCallResult.length <= 0) {
            throw new Error(`Read operation bad response. No results array in json rpc response. Inspect smart contract`);
        }
        if (jsonRpcCallResult[0].result.Error) {
            throw new Error(jsonRpcCallResult[0].result.Error);
        }
        return {
            returnValue: jsonRpcCallResult[0].result.Ok,
            info: jsonRpcCallResult[0],
        };
    }
    /** Returns the balance of the smart contract  */
    async getContractBalance(address) {
        const addresses = await this.publicApiClient.getAddresses([address]);
        if (addresses.length === 0)
            return null;
        const addressInfo = addresses.at(0);
        return {
            candidate: (0, converters_1.fromMAS)(addressInfo.candidate_balance),
            final: (0, converters_1.fromMAS)(addressInfo.final_balance),
        };
    }
    /** get filtered smart contract events */
    async getFilteredScOutputEvents(eventFilterData) {
        const data = {
            start: eventFilterData.start,
            end: eventFilterData.end,
            emitter_address: eventFilterData.emitter_address,
            original_caller_address: eventFilterData.original_caller_address,
            original_operation_id: eventFilterData.original_operation_id,
            is_final: eventFilterData.is_final,
        };
        const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_FILTERED_SC_OUTPUT_EVENT;
        // returns filtered events
        if (this.clientConfig.retryStrategyOn) {
            return await (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [data],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [data]);
        }
    }
    /** Read-only smart contracts */
    async executeReadOnlySmartContract(contractData) {
        if (!contractData.contractDataBinary) {
            throw new Error(`Contract binary data required. Got null`);
        }
        if (!contractData.address) {
            throw new Error(`Contract address required. Got null`);
        }
        const data = {
            max_gas: Number(contractData.maxGas),
            bytecode: Array.from(contractData.contractDataBinary),
            address: contractData.address,
        };
        let jsonRpcCallResult = [];
        const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_BYTECODE;
        if (this.clientConfig.retryStrategyOn) {
            jsonRpcCallResult = await (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[data]]]);
        }
        else {
            jsonRpcCallResult = await this.sendJsonRPCRequest(jsonRpcRequestMethod, [[data]]);
        }
        if (jsonRpcCallResult.length <= 0) {
            throw new Error(`Read operation bad response. No results array in json rpc response. Inspect smart contract`);
        }
        if (jsonRpcCallResult[0].result.Error) {
            throw new Error(`Execute read-only smart contract error ${jsonRpcCallResult[0].result.Error}`);
        }
        return {
            returnValue: jsonRpcCallResult[0].result.Ok,
            info: jsonRpcCallResult[0],
        };
    }
    async getOperationStatus(opId) {
        const operationData = await this.publicApiClient.getOperations([opId]);
        if (!operationData || operationData.length === 0)
            return EOperationStatus_1.EOperationStatus.NOT_FOUND;
        const opData = operationData[0];
        if (opData.is_operation_final) {
            return EOperationStatus_1.EOperationStatus.FINAL;
        }
        if (opData.in_blocks.length > 0) {
            return EOperationStatus_1.EOperationStatus.INCLUDED_PENDING;
        }
        if (opData.in_pool) {
            return EOperationStatus_1.EOperationStatus.AWAITING_INCLUSION;
        }
        return EOperationStatus_1.EOperationStatus.INCONSISTENT;
    }
    async awaitRequiredOperationStatus(opId, requiredStatus) {
        let errCounter = 0;
        let pendingCounter = 0;
        while (true) {
            let status = EOperationStatus_1.EOperationStatus.NOT_FOUND;
            try {
                status = await this.getOperationStatus(opId);
            }
            catch (ex) {
                if (++errCounter > 100) {
                    const msg = `Failed to retrieve the tx status after 10 failed attempts for operation id: ${opId}.`;
                    console.error(msg, ex);
                    throw ex;
                }
                await (0, time_1.wait)(TX_POLL_INTERVAL_MS);
            }
            if (status == requiredStatus) {
                return status;
            }
            if (++pendingCounter > 1000) {
                const msg = `Getting the tx status for operation Id ${opId} took too long to conclude. We gave up after ${TX_POLL_INTERVAL_MS * TX_STATUS_CHECK_RETRY_COUNT}ms.`;
                console.warn(msg);
                throw new Error(msg);
            }
            await (0, time_1.wait)(TX_POLL_INTERVAL_MS);
        }
    }
}
exports.SmartContractsClient = SmartContractsClient;
//# sourceMappingURL=SmartContractsClient.js.map