import { IAddressInfo } from './IAddressInfo'
import { IBlockInfo } from './IBlockInfo'
import { IClique } from './IClique'
import { IEndorsement } from './IEndorsement'
import { INodeStatus } from './INodeStatus'
import { IOperationData } from './IOperationData'
import { IStakingAddresses } from './IStakingAddresses'
import { IDatastoreEntryInput } from './IDatastoreEntryInput'
import { IDatastoreEntry } from './IDatastoreEntry'
import { IGetGraphInterval } from './IGetGraphInterval'
import { IBlockcliqueBlockBySlot } from './IBlockcliqueBlockBySlot'
import { IGraphInterval } from './IGraphInterval'
import { BaseClient } from '../web3/BaseClient'
import { ISlot } from '@massalabs/web3-utils'

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
export interface IPublicApiClient extends BaseClient {
  /**
   * Get the node status.
   *
   * @returns The node status.
   */
  getNodeStatus(): Promise<INodeStatus>

  /**
   * Get addresses.
   *
   * @param addresses - The addresses.
   *
   * @returns The addresses as IAddressInfo.
   */
  getAddresses(addresses: Array<string>): Promise<Array<IAddressInfo>>

  /**
   * Get blocks.
   *
   * @param blockIds - The block ids.
   *
   * @returns The blocks as IBlockInfo.
   */
  getBlocks(blockIds: Array<string>): Promise<Array<IBlockInfo>>

  /**
   * Get endorsements.
   *
   * @param endorsementIds - The endorsement ids.
   *
   * @returns The endorsements as IEndorsement.
   */
  getEndorsements(endorsementIds: Array<string>): Promise<Array<IEndorsement>>

  /**
   * Get operations.
   *
   * @param operationIds - The operation ids.
   *
   * @returns The operations as IOperationData.
   */
  getOperations(operationIds: Array<string>): Promise<Array<IOperationData>>

  /**
   * Get cliques.
   *
   * @returns The cliques as IClique.
   */
  getCliques(): Promise<Array<IClique>>

  /**
   * Get stakers.
   *
   * @returns The stakers as IStakingAddresses.
   */
  getStakers(): Promise<Array<IStakingAddresses>>

  /**
   * Get datastore entries.
   *
   * @param getDatastoreEntries - The datastore entries.
   *
   * @returns The datastore entries as IDatastoreEntry. (null if not found)
   */
  getDatastoreEntries(
    getDatastoreEntries: Array<IDatastoreEntryInput>
  ): Promise<Array<IDatastoreEntry | null>>

  /**
   * Get blockclique block by slot.
   *
   * @param slot - The slot
   *
   * @returns The blockclique block by slot as IBlockcliqueBlockBySlot.
   */
  getBlockcliqueBlockBySlot(slot: ISlot): Promise<IBlockcliqueBlockBySlot>

  /**
   * Get graph interval.
   *
   * @param graphInterval - The graph interval.
   *
   * @returns The graph interval as IGraphInterval.
   */
  getGraphInterval(
    graphInterval: IGetGraphInterval
  ): Promise<Array<IGraphInterval>>
}
