import { OpType } from './OperationTypes';

export interface IOperationData {
  id: string; // Operation id
  in_blocks: string[]; // Block ids
  in_pool: boolean; //
  is_operation_final: boolean;
  thread: number;
  operation: {
    content: {
      expire_period: number;
      fee: string; // represent an Amount in coins
      op: OpType;
      sender_public_key: string;
    };
    signature: string;
    content_creator_pub_key: string;
    content_creator_address: string;
    id: string; //
  };
  op_exec_status: boolean | null;
}
