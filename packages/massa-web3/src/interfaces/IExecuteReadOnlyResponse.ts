import { IExecuteReadOnlyData } from './IExecuteReadOnlyData';

/**
 * Represents the response from a read-only operation on a deployed contract.
 *
 * @see returnValue of type `Uint8Array` represents the return value of the read operation.
 * @see info of type `IExecuteReadOnlyData` represents the inputs of the read operation.
 */
export interface IExecuteReadOnlyResponse {
  returnValue: Uint8Array;
  info: IExecuteReadOnlyData;
}
