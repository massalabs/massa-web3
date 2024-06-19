import { ISlot } from '@massalabs/web3-utils'

type Denunciation = {
  public_key: string
  slot: number
  hash_1: string
  hash_2: string
  signature_1: string
  signature_2: string
}

export type BlockHeaderDenunciation = Denunciation
export type EndorsementDenunciation = Denunciation & { index: number }

export type Endorsement = {
  content: {
    slot: ISlot
    index: number
    endorsed_block: string
  }
  signature: string
  content_creator_pub_key: string
  content_creator_address: string
  id: string
}

export type BlockHeaderContent = {
  current_version: number
  announced_version: number | null
  operation_merkle_root: string
  parents: string[]
  slot: ISlot
  endorsements: Endorsement[]
  denunciations: BlockHeaderDenunciation | EndorsementDenunciation
}

export type BlockHeader = {
  content: BlockHeaderContent
  signature: string
  content_creator_pub_key: string
  content_creator_address: string
  id: string
}

export type BlockInfoContent = {
  is_final: boolean
  is_in_blockclique: boolean
  is_candidate: boolean
  is_discarded: boolean
  block: {
    header: BlockHeader
    operations: string[]
  }
}

/**
 * Represents information about a block.
 *
 * @remarks
 * This interface is used to track the block information, including the block
 * ID, content, signature, operations, and status flags (final, stale, and in blockclique).
 */
export interface IBlockInfo {
  id: string // BlockId
  content: BlockInfoContent
}
