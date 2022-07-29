"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicApiClient = void 0;
const tslib_1 = require("tslib");
const retryExecuteFunction_1 = require("../utils/retryExecuteFunction");
const JsonRpcMethods_1 = require("../interfaces/JsonRpcMethods");
const BaseClient_1 = require("./BaseClient");
/** Public Api Client for interacting with the massa network */
class PublicApiClient extends BaseClient_1.BaseClient {
    constructor(clientConfig) {
        super(clientConfig);
        // ========== bind api methods ========= //
        // public api methods
        this.getNodeStatus = this.getNodeStatus.bind(this);
        this.getAddresses = this.getAddresses.bind(this);
        this.getBlocks = this.getBlocks.bind(this);
        this.getEndorsements = this.getEndorsements.bind(this);
        this.getOperations = this.getOperations.bind(this);
        this.getCliques = this.getCliques.bind(this);
        this.getStakers = this.getStakers.bind(this);
    }
    /** Show the status of the node (reachable? number of peers connected, consensus, version, config parameter summary...) */
    getNodeStatus() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_STATUS;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, []]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, []);
            }
        });
    }
    /** Get info about a list of addresses (balances, block creation, ...) */
    getAddresses(addresses) {
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
    /** Show info about a block (content, finality ...) */
    getBlocks(blockIds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_BLOCKS;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, blockIds]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, blockIds);
            }
        });
    }
    /** Show info about a list of endorsements (content, finality ...) */
    getEndorsements(endorsementIds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [endorsementIds]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [endorsementIds]);
            }
        });
    }
    /** Show info about a list of operations = (content, finality ...) */
    getOperations(operationIds) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_OPERATIONS;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [operationIds]]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [operationIds]);
            }
        });
    }
    /** Get cliques */
    getCliques() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_CLIQUES;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, []]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, []);
            }
        });
    }
    /** Returns the active stakers and their roll counts for the current cycle */
    getStakers() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_STAKERS;
            if (this.clientConfig.retryStrategyOn) {
                return yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, []]);
            }
            else {
                return yield this.sendJsonRPCRequest(jsonRpcRequestMethod, []);
            }
        });
    }
    /** Returns the data entry both at the latest final and active executed slots. */
    getDatastoreEntries(addresses_keys) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const data = [];
            for (const input of addresses_keys) {
                data.push({
                    address: input.address,
                    key: Array.prototype.slice.call(Buffer.from(input.key))
                });
            }
            const jsonRpcRequestMethod = JsonRpcMethods_1.JSON_RPC_REQUEST_METHOD.GET_DATASTORE_ENTRIES;
            let datastoreEntries = [];
            if (this.clientConfig.retryStrategyOn) {
                datastoreEntries = yield (0, retryExecuteFunction_1.trySafeExecute)(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [data]]);
            }
            else {
                datastoreEntries = yield this.sendJsonRPCRequest(jsonRpcRequestMethod, [data]);
            }
            const candidateDatastoreEntries = datastoreEntries.map(elem => elem.candidate_value);
            const finalDatastoreEntries = datastoreEntries.map(elem => elem.final_value);
            return datastoreEntries.map((_, index) => {
                return {
                    candidate: (candidateDatastoreEntries[index]) ? candidateDatastoreEntries[index].map((s) => String.fromCharCode(s)).join("") : null,
                    final: (finalDatastoreEntries[index]) ? finalDatastoreEntries[index].map((s) => String.fromCharCode(s)).join("") : null
                };
            });
        });
    }
}
exports.PublicApiClient = PublicApiClient;
//# sourceMappingURL=PublicApiClient.js.map