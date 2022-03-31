import { OpType } from "./OperationTypes";
export interface IOperationData {
    id: string;
    in_blocks: [string];
    in_pool: boolean;
    is_final: boolean;
    operation: {
        content: {
            expire_period: number;
            fee: string;
            op: OpType;
            sender_public_key: string;
        };
        signature: string;
    };
}
