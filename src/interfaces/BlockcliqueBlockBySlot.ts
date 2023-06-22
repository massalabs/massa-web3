import { Slot } from './Slot';

/**
 * Represents the information for a block header.
 *
 * @remarks
 * This interface is used to track the block header information, including the
 * slot, parent blocks, operation merkle root, and endorsements.
 */
export interface BlockHeaderInfo {
  slot: Slot;
  parents: Array<string>;
  operation_merkle_root: string;
  endorsements: Array<EndorsementInfo>;
}

/**
 * Represents the endorsement information.
 *
 * @remarks
 * This interface is used to track the endorsement information, including the
 * slot, index, endorsed block D, signature, creator's public key, creator's
 * address, and endorsement D.
 */
export interface EndorsementInfo {
  content: {
    slot: Slot;
    index: number;
    endorsed_block: string; // Block D
  };
  signature: string;
  creator_public_key: string;
  creator_address: string;
  id: string;
}

/**
 * Represents a block in a blockclique by slot.
 *
 * @remarks
 * This interface is used to track the block information in a blockclique,
 * including the block header, signature, creator's public key, creator's
 * address, block D, and operations.
 */
export interface BlockcliqueBlockBySlot {
  header: {
    content: BlockHeaderInfo;
    signature: string;
    creator_public_key: string;
    creator_address: string;
    id: string; // Block D
  };
  operations: Array<string>;
}
