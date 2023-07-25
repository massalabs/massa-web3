import { IClientConfig } from '../interfaces/IClientConfig';
import { INodeStatus } from '../interfaces/INodeStatus';
import { IAddressInfo } from '../interfaces/IAddressInfo';
import { trySafeExecute } from '../utils/retryExecuteFunction';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { IBlockInfo } from '../interfaces/IBlockInfo';
import { IEndorsement } from '../interfaces/IEndorsement';
import { IOperationData } from '../interfaces/IOperationData';
import { IClique } from '../interfaces/IClique';
import { IStakingAddresses } from '../interfaces/IStakingAddresses';
import { BaseClient } from './BaseClient';
import { IPublicApiClient } from '../interfaces/IPublicApiClient';
import { IDatastoreEntry } from '../interfaces/IDatastoreEntry';
import { IDatastoreEntryInput } from '../interfaces/IDatastoreEntryInput';
import { ISlot } from '../interfaces/ISlot';
import { IGetGraphInterval } from '../interfaces/IGetGraphInterval';
import { IGraphInterval } from '../interfaces/IGraphInterval';
import { IBlockcliqueBlockBySlot } from '../interfaces/IBlockcliqueBlockBySlot';

/**
 * Public API client for interacting with a Massa node.
 *
 * This class provides an interface for interacting with the public API of a Massa node.
 * It offers methods for querying various data structures used in the Massa blockchain,
 * such as blocks, endorsements, operations, and stakers.
 *
 * @module PublicApiClient
 */
export class PublicApiClient extends BaseClient implements IPublicApiClient {
  /**
   * Constructor for the {@link PublicApiClient} object.
   *
   * @param clientConfig - The configuration settings for this client.
   */
  public constructor(clientConfig: IClientConfig) {
    super(clientConfig);

    // Bind all public API methods to the current context.
    // This ensures that the methods can be called correctly even when their context is lost.
    // For example, when passed as a callback function.

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

  /**
   * Get graph interval.
   *
   * @param graphInterval - The graph interval values in ms as an IGetGraphInterval.
   *
   * @returns A promise which resolves in the graph interval.
   */
  public async getGraphInterval(
    graphInterval: IGetGraphInterval,
  ): Promise<Array<IGraphInterval>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_GRAPH_INTERVAL;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<IGraphInterval>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [graphInterval]],
      );
    } else {
      return await this.sendJsonRPCRequest<Array<IGraphInterval>>(
        jsonRpcRequestMethod,
        [graphInterval],
      );
    }
  }

  /**
   * Get blockclique details by period and thread.
   *
   * @param slot - The slot as an ISlot.
   *
   * @returns A promise which resolves in the blockclique details.
   */
  public async getBlockcliqueBlockBySlot(
    slot: ISlot,
  ): Promise<IBlockcliqueBlockBySlot> {
    const jsonRpcRequestMethod =
      JSON_RPC_REQUEST_METHOD.GET_BLOCKCLIQUE_BLOCK_BY_SLOT;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<IBlockcliqueBlockBySlot>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [slot]],
      );
    } else {
      return await this.sendJsonRPCRequest<IBlockcliqueBlockBySlot>(
        jsonRpcRequestMethod,
        [slot],
      );
    }
  }

  /**
   * Retrieves the node's status.
   *
   * @remarks
   * The returned information includes:
   * - Whether the node is reachable
   * - The number of connected peers
   * - The node's version
   * - The node's configuration parameters
   *
   * @returns A promise that resolves to the node's status information.
   */
  public async getNodeStatus(): Promise<INodeStatus> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STATUS;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<INodeStatus>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [],
      ]);
    } else {
      return await this.sendJsonRPCRequest<INodeStatus>(
        jsonRpcRequestMethod,
        [],
      );
    }
  }

  /**
   * Retrieves data about a list of addresses, such as their balances and block creation details.
   *
   * @param addresses - An array of addresses to query.
   *
   * @returns A promise that resolves to an array of address information.
   */
  public async getAddresses(
    addresses: Array<string>,
  ): Promise<Array<IAddressInfo>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ADDRESSES;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<IAddressInfo>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [addresses]],
      );
    } else {
      return await this.sendJsonRPCRequest<Array<IAddressInfo>>(
        jsonRpcRequestMethod,
        [addresses],
      );
    }
  }

  /**
   * Show data about a block (content, finality ...).
   *
   * @remarks
   * The blocks are stored in the node cache. After a certain time (depending of the network activity),
   * the blocks are removed from the cache and the node will not be able to return the block data.
   * The corresponding api parameter is 'max_discarded_blocks'.
   * More information can be found here: https://docs.massa.net/en/latest/testnet/all-config.html
   *
   * @param blockIds - The block ids as an array of strings.
   *
   * @returns A promise which resolves in the block data.
   */
  public async getBlocks(blockIds: Array<string>): Promise<Array<IBlockInfo>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_BLOCKS;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<IBlockInfo>>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [blockIds],
      ]);
    } else {
      return await this.sendJsonRPCRequest<Array<IBlockInfo>>(
        jsonRpcRequestMethod,
        [blockIds],
      );
    }
  }

  /**
   * Show info about a list of endorsements.
   *
   * @param endorsementIds - The endorsement ids as an array of strings.
   *
   * @returns A promise which resolves in the endorsement data.
   */
  public async getEndorsements(
    endorsementIds: Array<string>,
  ): Promise<Array<IEndorsement>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<IEndorsement>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [endorsementIds]],
      );
    } else {
      return await this.sendJsonRPCRequest<Array<IEndorsement>>(
        jsonRpcRequestMethod,
        [endorsementIds],
      );
    }
  }

  /**
   * Retrieves data about a list of operations.
   *
   * @param operationIds - An array of operation IDs to query.
   *
   * @returns A promise that resolves to an array of operation data.
   */
  public async getOperations(
    operationIds: Array<string>,
  ): Promise<Array<IOperationData>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_OPERATIONS;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<IOperationData>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [operationIds]],
      );
    } else {
      return await this.sendJsonRPCRequest<Array<IOperationData>>(
        jsonRpcRequestMethod,
        [operationIds],
      );
    }
  }

  /**
   * Get cliques.
   *
   * @returns A promise which resolves to the cliques.
   */
  public async getCliques(): Promise<Array<IClique>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_CLIQUES;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<IClique>>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [],
      ]);
    } else {
      return await this.sendJsonRPCRequest<Array<IClique>>(
        jsonRpcRequestMethod,
        [],
      );
    }
  }

  /**
   * Retrieves a list of active stakers and their roll counts for the current cycle.
   *
   * @returns A promise that resolves to an array of staking addresses and their roll counts.
   */
  public async getStakers(): Promise<Array<IStakingAddresses>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STAKERS;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<IStakingAddresses>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, []],
      );
    } else {
      return await this.sendJsonRPCRequest<Array<IStakingAddresses>>(
        jsonRpcRequestMethod,
        [],
      );
    }
  }

  /**
   * Retrieves the data entries at both the latest final and active executed slots.
   *
   * @param addressesKeys - An array of objects containing address and key data.
   *
   * @returns A promise that resolves to an array of datastore entries.
   *
   * @remarks returned values could be easily converted into string if needed using e.g.: bytesToStr(scStorageValue[0].final_value)
   */
  public async getDatastoreEntries(
    addressesKeys: Array<IDatastoreEntryInput>,
  ): Promise<Array<IDatastoreEntry>> {
    const data = [];
    for (const input of addressesKeys) {
      data.push({
        address: input.address,
        key: Array.prototype.slice.call(Buffer.from(input.key)),
      });
    }
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_DATASTORE_ENTRIES;
    let datastoreEntries: Array<IDatastoreEntry> = [];
    if (this.clientConfig.retryStrategyOn) {
      datastoreEntries = await trySafeExecute<Array<IDatastoreEntry>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [data]],
      );
    } else {
      datastoreEntries = await this.sendJsonRPCRequest<Array<IDatastoreEntry>>(
        jsonRpcRequestMethod,
        [data],
      );
    }
    return datastoreEntries.map((e) => {
      return {
        final_value: new Uint8Array(e.final_value),
        candidate_value: new Uint8Array(e.candidate_value),
      };
    });
  }
}
