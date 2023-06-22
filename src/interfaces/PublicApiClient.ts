import { AddressInfo } from './AddressInfo';
import { BlockInfo } from './BlockInfo';
import { Clique } from './Clique';
import { Endorsement } from './Endorsement';
import { NodeStatus } from './NodeStatus';
import { OperationData } from './OperationData';
import { StakingAddresses } from './StakingAddresses';
import { DatastoreEntryInput } from './DatastoreEntryInput';
import { DatastoreEntry } from './DatastoreEntry';
import { Slot } from './Slot';
import { GetGraphInterval } from './GetGraphInterval';
import { BlockcliqueBlockBySlot } from './BlockcliqueBlockBySlot';
import { GraphInterval } from './GraphInterval';

/**
 * Represents a PublicApiClient object.
 *
 * @see getNodeStatus - Get the node status.
 * @see getAddresses - Get addresses.
 * @see getBlocks - Get blocks.
 * @see getEndorsements - Get endorsements.
 * @see getOperations - Get operations.
 * @see getCliques - Get cliques.
 * @see getStakers - Get stakers.
 * @see getDatastoreEntries - Get datastore entries.
 * @see getBlockcliqueBlockBySlot - Get blockclique block by slot.
 * @see getGraphInterval - Get graph interval.
 */
export interface PublicApiClient {
  /**
   * Get the node status.
   *
   * @returns The node status.
   */
  getNodeStatus(): Promise<NodeStatus>;

  /**
   * Get addresses.
   *
   * @param addresses - The addresses.
   *
   * @returns The addresses as AddressInfo.
   */
  getAddresses(addresses: Array<string>): Promise<Array<AddressInfo>>;

  /**
   * Get blocks.
   *
   * @param blockIds - The block ids.
   *
   * @returns The blocks as BlockInfo.
   */
  getBlocks(blockIds: Array<string>): Promise<Array<BlockInfo>>;

  /**
   * Get endorsements.
   *
   * @param endorsementIds - The endorsement ids.
   *
   * @returns The endorsements as Endorsement.
   */
  getEndorsements(endorsementIds: Array<string>): Promise<Array<Endorsement>>;

  /**
   * Get operations.
   *
   * @param operationIds - The operation ids.
   *
   * @returns The operations as OperationData.
   */
  getOperations(operationIds: Array<string>): Promise<Array<OperationData>>;

  /**
   * Get cliques.
   *
   * @returns The cliques as Clique.
   */
  getCliques(): Promise<Array<Clique>>;

  /**
   * Get stakers.
   *
   * @returns The stakers as StakingAddresses.
   */
  getStakers(): Promise<Array<StakingAddresses>>;

  /**
   * Get datastore entries.
   *
   * @param getDatastoreEntries - The datastore entries.
   *
   * @returns The datastore entries as DatastoreEntry. (null if not found)
   */
  getDatastoreEntries(
    getDatastoreEntries: Array<DatastoreEntryInput>,
  ): Promise<Array<DatastoreEntry | null>>;

  /**
   * Get blockclique block by slot.
   *
   * @param slot - The slot
   *
   * @returns The blockclique block by slot as BlockcliqueBlockBySlot.
   */
  getBlockcliqueBlockBySlot(slot: Slot): Promise<BlockcliqueBlockBySlot>;

  /**
   * Get graph interval.
   *
   * @param graphInterval - The graph interval.
   *
   * @returns The graph interval as GraphInterval.
   */
  getGraphInterval(
    graphInterval: GetGraphInterval,
  ): Promise<Array<GraphInterval>>;
}
