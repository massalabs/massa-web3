import { trySafeExecute } from '../utils/retryExecuteFunction';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { BaseClient } from './BaseClient';
/** Private Api Client for interacting with a massa node */
export class PrivateApiClient extends BaseClient {
    constructor(clientConfig) {
        super(clientConfig);
        // ========== bind api methods ========= //
        // private api methods
        this.nodeStop = this.nodeStop.bind(this);
        this.nodeBanById = this.nodeBanById.bind(this);
        this.nodeBanByIpAddress = this.nodeBanByIpAddress.bind(this);
        this.nodeUnbanById = this.nodeUnbanById.bind(this);
        this.nodeUnbanByIpAddress = this.nodeUnbanByIpAddress.bind(this);
        this.nodeAddStakingSecretKeys = this.nodeAddStakingSecretKeys.bind(this);
        this.nodeGetStakingAddresses = this.nodeGetStakingAddresses.bind(this);
        this.nodeRemoveStakingAddresses =
            this.nodeRemoveStakingAddresses.bind(this);
        this.nodeSignMessage = this.nodeSignMessage.bind(this);
        this.nodeRemoveFromWhitelist = this.nodeRemoveFromWhitelist.bind(this);
        this.nodeAddToPeersWhitelist = this.nodeAddToPeersWhitelist.bind(this);
    }
    /** Remove a given Node IP address from the whitelist */
    async nodeAddToPeersWhitelist(ipAddress) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_ADD_TO_PEERS_WHITELIST;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [[ipAddress]],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [
                [ipAddress],
            ]);
        }
    }
    /** Remove a given Node IP address from the whitelist */
    async nodeRemoveFromWhitelist(ipAddress) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_REMOVE_FROM_WHITELIST;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [[ipAddress]],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [
                [ipAddress],
            ]);
        }
    }
    /** Unban a given IP address */
    async nodeUnbanByIpAddress(ipAddress) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_IP;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [[ipAddress]],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [
                [ipAddress],
            ]);
        }
    }
    /** Unban a given node id */
    async nodeUnbanById(nodeId) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_ID;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [[nodeId]],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [
                [nodeId],
            ]);
        }
    }
    /** Ban a given node IP address */
    async nodeBanByIpAddress(ipAddress) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_IP;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [[ipAddress]],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [
                [ipAddress],
            ]);
        }
    }
    /** Ban a given node Id */
    async nodeBanById(id) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_ID;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [[id]],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [[id]]);
        }
    }
    /** Stops the node */
    async nodeStop() {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.STOP_NODE;
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
    /** Node signs a message */
    async nodeSignMessage(message) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_SIGN_MESSAGE;
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
    /** Show staking addresses */
    async nodeGetStakingAddresses() {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES;
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
    /** Remove staking addresses */
    async nodeRemoveStakingAddresses(addresses) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [addresses],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [
                addresses,
            ]);
        }
    }
    /** Add staking private keys */
    async nodeAddStakingSecretKeys(secretKeys) {
        const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS;
        if (this.clientConfig.retryStrategyOn) {
            return await trySafeExecute(this.sendJsonRPCRequest, [
                jsonRpcRequestMethod,
                [secretKeys],
            ]);
        }
        else {
            return await this.sendJsonRPCRequest(jsonRpcRequestMethod, [
                secretKeys,
            ]);
        }
    }
}
//# sourceMappingURL=PrivateApiClient.js.map