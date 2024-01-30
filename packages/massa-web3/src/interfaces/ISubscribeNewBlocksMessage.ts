import { IBlockHeaderInfo } from './IBlockcliqueBlockBySlot'

/**
 * Represents a subscribed new blocks message.
 *
 * @see header.content - block header info
 * @see header.signature - block header signature
 * @see header.creator_public_key - block header creator public key
 * @see header.creator_address - block header creator address
 * @see header.id - block header id
 * @see operations - array of operations present in the block
 */
export interface ISubscribeNewBlocksMessage {
  header: {
    content: IBlockHeaderInfo
    signature: string
    creator_public_key: string
    creator_address: string
    id: string
  }
  operations: Array<string>
}
