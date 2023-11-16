import { ISlot } from '@massalabs/web3-utils';
import { OpType } from './OperationTypes';

/**
 * Represents information about a block.
 *
 * @remarks
 * This interface is used to track the block information, including the block
 * ID, content, signature, operations, and status flags (final, stale, and in blockclique).
 */
export interface IBlockInfo {
  id: string; // BlockId
  content: null | {
    is_final: boolean;
    is_stale: boolean;
    block: {
      header: {
        content: {
          endorsed_block: string; // Block ID
          index: number;
          sender_public_key: string;
          slot: ISlot; // Endorsed block slot: different from block's slot
        };
        signature: string;
      };
      operation_merkle_root: string; // Hash of all operations
      parents: string[]; // Block IDs, as many as thread count
      slot: ISlot;
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
