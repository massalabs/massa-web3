import { ExecuteReadOnlyData } from './ExecuteReadOnlyData';

/**
 * Represents the response from a read-only operation on a deployed contract.
 *
 * @see returnValue of type `Uint8Array` represents the return value of the read operation.
 * @see info of type `ExecuteReadOnlyData` represents the inputs of the read operation.
 */
export interface ExecuteReadOnlyResponse {
  returnValue: Uint8Array;
  info: ExecuteReadOnlyData;
}
