import { ISlot } from './ISlot';
import { OpType } from './OperationTypes';
export interface IBlockInfo {
    id: string;
    content: null | {
        is_final: boolean;
        is_stale: boolean;
        is_in_blockclique: boolean;
        block: {
            header: {
                content: {
                    endorsed_block: string;
                    index: number;
                    sender_public_key: string;
                    slot: ISlot;
                };
                signature: string;
            };
            operation_merkle_root: string;
            parents: string[];
            slot: ISlot;
        };
        signature: string;
        operations: [
            {
                content: {
                    expire_period: number;
                    fee: string;
                    op: OpType;
                    sender_public_key: string;
                };
                signature: string;
            }
        ];
    };
    is_final: boolean;
    is_in_blockclique: boolean;
    is_stale: boolean;
}
