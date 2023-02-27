import { OpType } from './OperationTypes';

export interface IOperationData {
  id: string; // Operation id
  in_blocks: string[]; // Block ids
  in_pool: boolean; // indicates whether the operation is in the tx pool or not
  is_operation_final: boolean; // indicates whether the operation is final or not
  thread: number; // the thread in which the operation is in
  operation: {
    content: {
      expire_period: number;
      fee: string; // represent an Amount in coins
      op: OpType; // the type of operation
      sender_public_key: string; // the public key of the sender
    };
    signature: string;
    content_creator_pub_key: string;
    content_creator_address: string;
    id: string; // the operation id
  };
  op_exec_status: boolean | null;
}
