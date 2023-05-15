import { IBlockHeaderInfo } from './IBlockcliqueBlockBySlot';

/**
 * Represents a filled block info.
 *
 * @see content.fee - fee paid
 * @see content.expire_period - expire period of the block
 * @see content.op - operation object
 * @see signature - block signature from the creator
 * @see creator_public_key - block creator public key
 * @see creator_address - block creator address
 * @see id - block id
 */
export interface IFilledBlockInfo {
  content: { fee: string; expire_period: number; op: object };
  signature: string;
  creator_public_key: string;
  creator_address: string;
  id: string;
}

/**
 * Represents a subscribed full blocks message.
 *
 * @see header.content - block header info
 * @see header.signature - block header signature
 * @see header.creator_public_key - block header creator public key
 * @see header.creator_address - block header creator address
 * @see header.id - block header id
 * @see operations - array of operations present in the block
 */
export interface ISubscribedFullBlocksMessage {
  header: {
    content: IBlockHeaderInfo;
    signature: string;
    creator_public_key: string;
    creator_address: string;
    id: string;
  };
  operations: Array<[string, [IFilledBlockInfo]]>;
}
