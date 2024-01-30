import { ISlot } from '@massalabs/web3-utils'

/**
 * Represents an endorsement.
 *
 * @see id of type `string` represents the ID of the endorsement.
 * @see in_pool of type `boolean` represents whether the endorsement is in the mempool.
 * @see in_blocks of type `Array<string>` represents the IDs of the blocks that contain the endorsement.
 * @see is_final of type `boolean` represents whether the endorsement is final.
 * @see endorsement of type `object` represents the endorsement:
 * @see endorsement.content of type `object` represents the content of the endorsement
 * @see endorsement.content.sender_public_key of type `string` represents the public key of the sender of the endorsement.
 * @see endorsement.content.slot of type `ISlot` represents the time slot when the endorsement was created.
 * @see endorsement.content.index of type `number` represents the index of the endorsement inside the slot.
 * @see endorsement.content.endorsed_block of type `string` represents the ID of the block that was endorsed.
 * @see endorsement.signature of type `string` represents the signature of the endorsement by its sender public key.
 */
export interface IEndorsement {
  id: string // EndorsementId,
  in_pool: boolean
  in_blocks: string[] // BlockId,
  is_final: boolean
  endorsement: {
    content: {
      sender_public_key: string
      slot: ISlot
      index: number
      endorsed_block: string // BlockId,
    }
    signature: string
  }
}
