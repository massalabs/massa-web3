import { OpType } from "./OperationTypes";

export interface IOperationData {
	id: string; // Operation id
    in_blocks: string[]; // Block ids
    in_pool: boolean; //
    is_final: boolean;
    operation: {
        content: {
            expire_period: number,
            fee: string, // represent an Amount in coins
            op: OpType,
            sender_public_key: string
        },
        signature: string
    };
}
