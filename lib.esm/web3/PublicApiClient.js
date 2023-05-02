import { trySafeExecute } from '../utils/retryExecuteFunction';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { BaseClient } from './BaseClient';
/** Public Api Client for interacting with the massa network */
export class PublicApiClient extends BaseClient {
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
        this.getBlockcliqueBlockBySlot = this.getBlockcliqueBlockBySlot.bind(this);
        this.getGraphInterval = this.getGraphInterval.bind(this);
    }
    /** Get graph interval */
    async getGraphInterval(graphInterval) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_GRAPH_INTERVAL;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [graphInterval]]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [graphInterval]);
        }
    }
    /** Get blockclique details by period and thread */
    async getBlockcliqueBlockBySlot(slot) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_BLOCKCLIQUE_BLOCK_BY_SLOT;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [slot]]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [slot]);
        }
    }
    /** Show the status of the node (reachable? number of peers connected, consensus, version, config parameter summary...) */
    async getNodeStatus() {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STATUS;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, []);
        }
    }
    /** Get info about a list of addresses (balances, block creation, ...) */
    async getAddresses(addresses) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ADDRESSES;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [addresses]]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [addresses]);
        }
    }
    /** Show info about a block (content, finality ...) */
    async getBlocks(blockIds) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_BLOCKS;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [blockIds],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [blockIds]);
        }
    }
    /** Show info about a list of endorsements (content, finality ...) */
    async getEndorsements(endorsementIds) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [endorsementIds]]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [endorsementIds]);
        }
    }
    /** Show info about a list of operations = (content, finality ...) */
    async getOperations(operationIds) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_OPERATIONS;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [operationIds]]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [operationIds]);
        }
    }
    /** Get cliques */
    async getCliques() {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_CLIQUES;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, []);
        }
    }
    /** Returns the active stakers and their roll counts for the current cycle */
    async getStakers() {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STAKERS;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [jsonRpcRequestMethod, []]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, []);
        }
    }
    /** Returns the data entry both at the latest final and active executed slots. */
    async getDatastoreEntries(addressesKeys) {
        const data = [];
        for (const input of addressesKeys) {
            data.push({
                address: input.address,
                key: Array.prototype.slice.call(Buffer.from(input.key)),
            });
        }
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_DATASTORE_ENTRIES;
        let datastoreEntries = [];
        if (this.clientConfig.retryStrategyOn) {
            datastoreEntries = await trySafeExecute(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [data]]);
        }
        else {
            datastoreEntries = await this.sendJsonRPCRequest(jsonRpcRequestMethod, [data]);
        }
        return datastoreEntries;
    }
}
//# sourceMappingURL=PublicApiClient.js.map