import { IClientConfig } from "../interfaces/IClientConfig";
import { INodeStatus } from "../interfaces/INodeStatus";
import { IAddressInfo } from "../interfaces/IAddressInfo";
import { trySafeExecute } from "../utils/retryExecuteFunction";
import { JSON_RPC_REQUEST_METHOD } from "../interfaces/JsonRpcMethods";
import { IBlockInfo } from "../interfaces/IBlockInfo";
import { IEndorsement } from "../interfaces/IEndorsement";
import { IOperationData } from "../interfaces/IOperationData";
import { IClique } from "../interfaces/IClique";
import { IStakingAddresses } from "../interfaces/IStakingAddresses";
import { BaseClient } from "./BaseClient";

/** Public Api Client for interacting with the massa network */
export class PublicApiClient extends BaseClient {
	public constructor(clientConfig: IClientConfig) {
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
	public async getNodeStatus(): Promise<INodeStatus> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STATUS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<INodeStatus>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, []]);
		} else {
			return await this.sendJsonRPCRequest<INodeStatus>(jsonRpcRequestMethod, []);
		}
	}

	/** Get info about a list of addresses (balances, block creation, ...) */
	public async getAddresses(addresses: Array<string>): Promise<Array<IAddressInfo>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ADDRESSES;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IAddressInfo>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [addresses]]);
		} else {
			return await this.sendJsonRPCRequest<Array<IAddressInfo>>(jsonRpcRequestMethod, [addresses]);
		}
	} 
	
	/** Show info about a block (content, finality ...) */
	public async getBlocks(blockIds: Array<string>): Promise<Array<IBlockInfo>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_BLOCKS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IBlockInfo>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, blockIds]);
		} else {
			return await this.sendJsonRPCRequest<Array<IBlockInfo>>(jsonRpcRequestMethod, blockIds);
		}
	}

	/** Show info about a list of endorsements (content, finality ...) */
	public async getEndorsements(endorsementIds: Array<string>): Promise<Array<IEndorsement>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IEndorsement>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [endorsementIds]]);
		} else {
			return await this.sendJsonRPCRequest<Array<IEndorsement>>(jsonRpcRequestMethod, [endorsementIds]);
		}
	}

	/** Show info about a list of operations = (content, finality ...) */
	public async getOperations(operationIds: Array<string>): Promise<Array<IOperationData>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_OPERATIONS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IOperationData>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [operationIds]]);
		} else {
			return await this.sendJsonRPCRequest<Array<IOperationData>>(jsonRpcRequestMethod, [operationIds]);
		}
	}

	/** Get cliques */
	public async getCliques(): Promise<Array<IClique>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_CLIQEUS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IClique>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, []]);
		} else {
			return await this.sendJsonRPCRequest<Array<IClique>>(jsonRpcRequestMethod, []);
		}
	}

	/** Returns the active stakers and their roll counts for the current cycle */
	public async getStakers(): Promise<Array<IStakingAddresses>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STAKERS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IStakingAddresses>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, []]);
		} else {
			return await this.sendJsonRPCRequest<Array<IStakingAddresses>>(jsonRpcRequestMethod, []);
		}
	}	
}