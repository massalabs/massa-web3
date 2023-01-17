import { ISlot } from "./ISlot";
import { OpType } from "./OperationTypes";

export interface IBlockInfo {
    /**
     * The block id
     * */
    id: string;
    /**
     * The block content
     * */
    content: null | {
      /**
       * Indicates if the block is finalized
       * */
        is_final: boolean,
        /**
         * Indicates if the block is stale
         * */
        is_stale: boolean,
        /**
         * Indicates if the block is in a blockclique
         * */
        is_in_blockclique: boolean,
        /**
         * Block data
         * */
        block: {
          /**
           * Block metadata header
           * */
            header: {
                /**
                 * Block metadata header content
                 * */
                content: {
                /**
                 * The endorsed block id
                 * */
                  endorsed_block: string,
                /**
                 * The block index
                 * */
                  index: number,
                /**
                 * The block sender public key
                 * */
                  sender_public_key: string,
                /**
                 * The block slot
                 * */
                  slot: ISlot
                },
                /**
                 * The block signature
                 * */
                signature: string
            },
            operation_merkle_root: string, // Hash of all operations
            parents: [string], // Block ids, as many as thread count
            slot: ISlot
        },
        signature: string,
        operations: [
          {
            content: {
              expire_period: number,
              fee: string, // represent an Amount in coins
              op: OpType,
              sender_public_key: string
            },
            signature: string
          }
        ]
      };
      is_final: boolean;
      is_in_blockclique: boolean;
      is_stale: boolean;
  }
