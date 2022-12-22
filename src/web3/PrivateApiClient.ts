import { IClientConfig } from "../interfaces/IClientConfig";
import { trySafeExecute } from "../utils/retryExecuteFunction";
import { JSON_RPC_REQUEST_METHOD } from "../interfaces/JsonRpcMethods";
import { ISignedMessage } from "../interfaces/ISignedMessage";
import { BaseJsonRpcClient } from "./BaseJsonRpcClient";
import { IPrivateApiClient } from "../interfaces/IPrivateApiClient";

/** Private Api Client for interacting with a massa node */
export class PrivateApiClient extends BaseJsonRpcClient implements IPrivateApiClient {
	public constructor(clientConfig: IClientConfig) {
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
		this.nodeRemoveStakingAddresses = this.nodeRemoveStakingAddresses.bind(this);
		this.nodeSignMessage = this.nodeSignMessage.bind(this);
		this.nodeRemoveFromWhitelist = this.nodeRemoveFromWhitelist.bind(this);
		this.nodeWhitelist = this.nodeWhitelist.bind(this);
	}

	/** Remove a given Node IP address from the whitelist */
	public async nodeWhitelist(ipAddress: string): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_WHITELIST;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[ipAddress]]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [[ipAddress]]);
		}
	}

	/** Remove a given Node IP address from the whitelist */
	public async nodeRemoveFromWhitelist(ipAddress: string): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_REMOVE_FROM_WHITELIST;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[ipAddress]]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [[ipAddress]]);
		}
	}

	/** Unban a given IP address */
	public async nodeUnbanByIpAddress(ipAddress: string): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_IP;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[ipAddress]]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [[ipAddress]]);
		}
	}

	/** Unban a given node id */
	public async nodeUnbanById(nodeId: string): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_ID;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[nodeId]]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [[nodeId]]);
		}
	}

	/** Ban a given node IP address */
	public async nodeBanByIpAddress(ipAddress: string): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_IP;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[ipAddress]]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [[ipAddress]]);
		}
	}

	/** Ban a given node Id */
	public async nodeBanById(id: string): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_ID;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[id]]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [[id]]);
		}
	}

	/** Stops the node */
	public async nodeStop(): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.STOP_NODE;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, []]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, []);
		}
	}

	/** Node signs a message */
	public async nodeSignMessage(message: Uint8Array): Promise<ISignedMessage> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.NODE_SIGN_MESSAGE;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<ISignedMessage>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, []]);
		} else {
			return await this.sendJsonRPCRequest<ISignedMessage>(jsonRpcRequestMethod, []);
		}
	}

	/** Show staking addresses */
	public async nodeGetStakingAddresses(): Promise<Array<string>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<string>>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, []]);
		} else {
			return await this.sendJsonRPCRequest<Array<string>>(jsonRpcRequestMethod, []);
		}
	}

	/** Remove staking addresses */
	public async nodeRemoveStakingAddresses(addresses: Array<string>): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [addresses]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [addresses]);
		}
	}

	/** Add staking private keys */
	public async nodeAddStakingSecretKeys(secretKeys: Array<string>): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [secretKeys]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [secretKeys]);
		}
	}
}
