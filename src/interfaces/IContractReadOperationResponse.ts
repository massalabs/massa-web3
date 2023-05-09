import { IContractReadOperationData } from './IContractReadOperationData';

/**
 * Represents the response of a read-only operation on a deployed contract.
 *
 * @see returnValue of type `Uint8Array` represents the return value of the read operation.
 * @see info of type `IContractReadOperationData` represents the inputs of the read operation.
 */
export interface IContractReadOperationResponse {
  returnValue: Uint8Array;
  info: IContractReadOperationData;
}
