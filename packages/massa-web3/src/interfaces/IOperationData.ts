import { OpType } from './OperationTypes';

/**
 * Represents the information for an operation.
 *
 * @remarks
 * This interface is used to track the details of an operation, including its ID, associated block IDs,
 * presence in the transaction pool, finality status, thread, operation content, and execution status.
 *
 * @see id - A string representing the ID of the operation.
 * @see in_blocks - An array of strings representing the associated block IDs.
 * @see in_pool - A boolean indicating whether the operation is in the transaction pool or not.
 * @see is_operation_final - A boolean indicating whether the operation is final or not.
 * @see thread - A number indicating the thread in which the operation is located.
 * @see operation - An object containing the content and signature of the operation.
 * @see op_exec_status - A boolean or null representing the execution status of the operation.
 */
export interface IOperationData {
  id: string;
  in_blocks: string[];
  in_pool: boolean;
  is_operation_final: boolean;
  thread: number;
  operation: {
    content: {
      expire_period: number;
      fee: string;
      op: OpType;
      sender_public_key: string;
    };
    signature: string;
    content_creator_pub_key: string;
    content_creator_address: string;
    id: string;
  };
  op_exec_status: boolean | null;
}
