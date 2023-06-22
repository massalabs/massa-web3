import { Slot } from './Slot';
import { OpType } from './OperationTypes';

/**
 * Represents information about a block.
 *
 * @remarks
 * This interface is used to track the block information, including the block
 * D, content, signature, operations, and status flags (final, stale, and in blockclique).
 */
export interface BlockInfo {
  id: string; // BlockId
  content: null | {
    is_final: boolean;
    is_stale: boolean;
    block: {
      header: {
        content: {
          endorsed_block: string; // Block D
          index: number;
          sender_public_key: string;
          slot: Slot; // Endorsed block slot: different from block's slot
        };
        signature: string;
      };
      operation_merkle_root: string; // Hash of all operations
      parents: string[]; // Block Ds, as many as thread count
      slot: Slot;
    };
    signature: string;
    operations: [
      {
        content: {
          expire_period: number;
          fee: string; // Represents an Amount in coins
          op: OpType;
          sender_public_key: string;
        };
        signature: string;
      },
    ];
  };
  is_final: boolean;
  is_in_blockclique: boolean;
  is_stale: boolean;
}
