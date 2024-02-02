import { ISlot } from '@massalabs/web3-utils'

/**
 * Represents the information for a block header.
 *
 * @remarks
 * This interface is used to track the block header information, including the
 * slot, parent blocks, operation merkle root, and endorsements.
 */
export interface IBlockHeaderInfo {
  slot: ISlot
  parents: Array<string>
  operation_merkle_root: string
  endorsements: Array<IEndorsementInfo>
}

/**
 * Represents the endorsement information.
 *
 * @remarks
 * This interface is used to track the endorsement information, including the
 * slot, index, endorsed block ID, signature, creator's public key, creator's
 * address, and endorsement ID.
 */
export interface IEndorsementInfo {
  content: {
    slot: ISlot
    index: number
    endorsed_block: string // Block ID
  }
  signature: string
  creator_public_key: string
  creator_address: string
  id: string
}

/**
 * Represents a block in a blockclique by slot.
 *
 * @remarks
 * This interface is used to track the block information in a blockclique,
 * including the block header, signature, creator's public key, creator's
 * address, block ID, and operations.
 */
export interface IBlockcliqueBlockBySlot {
  header: {
    content: IBlockHeaderInfo
    signature: string
    creator_public_key: string
    creator_address: string
    id: string // Block ID
  }
  operations: Array<string>
}
