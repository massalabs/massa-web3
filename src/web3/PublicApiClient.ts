import { ClientConfig } from '../interfaces/ClientConfig';
import { NodeStatus } from '../interfaces/NodeStatus';
import { AddressInfo } from '../interfaces/AddressInfo';
import { trySafeExecute } from '../utils/retryExecuteFunction';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { BlockInfo } from '../interfaces/BlockInfo';
import { Endorsement } from '../interfaces/Endorsement';
import { OperationData } from '../interfaces/OperationData';
import { Clique } from '../interfaces/Clique';
import { StakingAddresses } from '../interfaces/StakingAddresses';
import { BaseClient } from './BaseClient';
import { PublicApiClient as IPublicApiClient } from '../interfaces/PublicApiClient';
import { DatastoreEntry } from '../interfaces/DatastoreEntry';
import { DatastoreEntryInput } from '../interfaces/DatastoreEntryInput';
import { Slot } from '../interfaces/Slot';
import { GetGraphInterval } from '../interfaces/GetGraphInterval';
import { GraphInterval } from '../interfaces/GraphInterval';
import { BlockcliqueBlockBySlot } from '../interfaces/BlockcliqueBlockBySlot';

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
  public constructor(clientConfig: ClientConfig) {
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
   * @param graphInterval - The graph interval values in ms as an GetGraphInterval.
   *
   * @returns A promise which resolves in the graph interval.
   */
  public async getGraphInterval(
    graphInterval: GetGraphInterval,
  ): Promise<Array<GraphInterval>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_GRAPH_INTERVAL;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<GraphInterval>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [graphInterval]],
      );
    } else {
      return await this.sendJsonRPCRequest<Array<GraphInterval>>(
        jsonRpcRequestMethod,
        [graphInterval],
      );
    }
  }

  /**
   * Get blockclique details by period and thread.
   *
   * @param slot - The slot as an Slot.
   *
   * @returns A promise which resolves in the blockclique details.
   */
  public async getBlockcliqueBlockBySlot(
    slot: Slot,
  ): Promise<BlockcliqueBlockBySlot> {
    const jsonRpcRequestMethod =
      JSON_RPC_REQUEST_METHOD.GET_BLOCKCLIQUE_BLOCK_BY_SLOT;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<BlockcliqueBlockBySlot>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [slot]],
      );
    } else {
      return await this.sendJsonRPCRequest<BlockcliqueBlockBySlot>(
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
  public async getNodeStatus(): Promise<NodeStatus> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STATUS;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<NodeStatus>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [],
      ]);
    } else {
      return await this.sendJsonRPCRequest<NodeStatus>(
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
  ): Promise<Array<AddressInfo>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ADDRESSES;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<AddressInfo>>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [addresses],
      ]);
    } else {
      return await this.sendJsonRPCRequest<Array<AddressInfo>>(
        jsonRpcRequestMethod,
        [addresses],
      );
    }
  }

  /**
   * Show data about a block (content, finality ...).
   *
   * @param blockIds - The block ids as an array of strings.
   *
   * @returns A promise which resolves in the block data.
   */
  public async getBlocks(blockIds: Array<string>): Promise<Array<BlockInfo>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_BLOCKS;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<BlockInfo>>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [blockIds],
      ]);
    } else {
      return await this.sendJsonRPCRequest<Array<BlockInfo>>(
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
  ): Promise<Array<Endorsement>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<Endorsement>>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [endorsementIds],
      ]);
    } else {
      return await this.sendJsonRPCRequest<Array<Endorsement>>(
        jsonRpcRequestMethod,
        [endorsementIds],
      );
    }
  }

  /**
   * Retrieves data about a list of operations.
   *
   * @param operationIds - An array of operation Ds to query.
   *
   * @returns A promise that resolves to an array of operation data.
   */
  public async getOperations(
    operationIds: Array<string>,
  ): Promise<Array<OperationData>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_OPERATIONS;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<OperationData>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [operationIds]],
      );
    } else {
      return await this.sendJsonRPCRequest<Array<OperationData>>(
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
  public async getCliques(): Promise<Array<Clique>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_CLIQUES;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<Clique>>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [],
      ]);
    } else {
      return await this.sendJsonRPCRequest<Array<Clique>>(
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
  public async getStakers(): Promise<Array<StakingAddresses>> {
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STAKERS;
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<StakingAddresses>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, []],
      );
    } else {
      return await this.sendJsonRPCRequest<Array<StakingAddresses>>(
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
   */
  public async getDatastoreEntries(
    addressesKeys: Array<DatastoreEntryInput>,
  ): Promise<Array<DatastoreEntry>> {
    const data = [];
    for (const input of addressesKeys) {
      data.push({
        address: input.address,
        key: Array.prototype.slice.call(Buffer.from(input.key)),
      });
    }
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_DATASTORE_ENTRIES;
    let datastoreEntries: Array<DatastoreEntry> = [];
    if (this.clientConfig.retryStrategyOn) {
      datastoreEntries = await trySafeExecute<Array<DatastoreEntry>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [data]],
      );
    } else {
      datastoreEntries = await this.sendJsonRPCRequest<Array<DatastoreEntry>>(
        jsonRpcRequestMethod,
        [data],
      );
    }
    return datastoreEntries;
  }
}
