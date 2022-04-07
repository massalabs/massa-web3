import { IClientConfig } from "../interfaces/IClientConfig";
import { trySafeExecute } from "../utils/retryExecuteFunction";
import { JSON_RPC_REQUEST_METHOD } from "../interfaces/JsonRpcMethods";
import { ISignedMessage } from "../interfaces/ISignedMessage";
import { BaseClient } from "./BaseClient";

/** Private Api Client for interacting with a massa node */
export class PrivateApiClient extends BaseClient {
	public constructor(clientConfig: IClientConfig) {
		super(clientConfig);

		// ========== bind api methods ========= //

		// private api methods
		this.nodeStop = this.nodeStop.bind(this);
		this.banIpAddress = this.banIpAddress.bind(this);
		this.unbanIpAddress = this.unbanIpAddress.bind(this);
		this.nodeAddStakingPrivateKeys = this.nodeAddStakingPrivateKeys.bind(this);
		this.nodeGetStakingAddresses = this.nodeGetStakingAddresses.bind(this);
		this.nodeRemoveStakingAddresses = this.nodeRemoveStakingAddresses.bind(this);
		this.nodeSignMessage = this.nodeSignMessage.bind(this);
	}

	/** Unban a given IP addresses */
	public async unbanIpAddress(ipAddress: string): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.UNBAN;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[ipAddress]]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [[ipAddress]]);
		}
	}

	/** Ban a given IP addresses */
	public async banIpAddress(ipAddress: string): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.BAN;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[ipAddress]]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [[ipAddress]]);
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
	public async nodeAddStakingPrivateKeys(privateKeys: Array<string>): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [privateKeys]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [privateKeys]);
		}
	}
}
