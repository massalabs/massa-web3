import { IContractReadOperationData } from './IContractReadOperationData';

/**
 * Represents the output of a smart contract non persistent execution.
 * (this operation did not modify the blockchain state)
 *
 * @see returnValue of type `Uint8Array` represents the return value of the read operation.
 * @see info of type `IContractReadOperationData` represents the inputs of the read operation.
 */
export interface IContractReadOperationResponse {
  returnValue: Uint8Array;
  info: IContractReadOperationData;
}
