"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateApiClient = void 0;
const tslib_1 = require("tslib");
const retryExecuteFunction_1 = require("../utils/retryExecuteFunction");
const JsonRpcMethods_1 = require("../interfaces/JsonRpcMethods");
const BaseClient_1 = require("./BaseClient");
/** Private Api Client for interacting with a massa node */
class PrivateApiClient extends BaseClient_1.BaseClient {
    constructor(clientConfig) {
        super(clientConfig);
        // ========== bind api methods ========= //
        // private api methods
        this.nodeStop = this.nodeStop.bind(this);
        this.banIpAddress = this.banIpAddress.bind(this);
        this.unbanIpAddress = this.unbanIpAddress.bind(this);
        this.nodeAddStakingSecretKeys = this.nodeAddStakingSecretKeys.bind(this);
        this.nodeGetStakingAddresses = this.nodeGetStakingAddresses.bind(this);
        this.nodeRemoveStakingAddresses = this.nodeRemoveStakingAddresses.bind(this);
        this.nodeSignMessage = this.nodeSignMessage.bind(this);
    }
    /** Unban a given IP addresses */
    unbanIpAddress(ipAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.UNBAN;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[ipAddress]]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [[ipAddress]]);
            }
        });
    }
    /** Ban a given IP addresses */
    banIpAddress(ipAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.BAN;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[ipAddress]]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [[ipAddress]]);
            }
        });
    }
    /** Stops the node */
    nodeStop() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.STOP_NODE;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, []]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, []);
            }
        });
    }
    /** Node signs a message */
    nodeSignMessage(message) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.NODE_SIGN_MESSAGE;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, []]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, []);
            }
        });
    }
    /** Show staking addresses */
    nodeGetStakingAddresses() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, []]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, []);
            }
        });
    }
    /** Remove staking addresses */
    nodeRemoveStakingAddresses(addresses) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [addresses]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [addresses]);
            }
        });
    }
    /** Add staking private keys */
    nodeAddStakingSecretKeys(secretKeys) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [secretKeys]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [secretKeys]);
            }
        });
    }
}
exports.PrivateApiClient = PrivateApiClient;
//# sourceMappingURL=PrivateApiClient.js.map