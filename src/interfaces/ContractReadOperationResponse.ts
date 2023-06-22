import { ContractReadOperationData } from './ContractReadOperationData';

/**
 * Represents the output of a smart contract non persistent execution.
 * (this operation did not modify the blockchain state)
 *
 * @see returnValue of type `Uint8Array` represents the return value of the read operation.
 * @see info of type `ContractReadOperationData` represents the inputs of the read operation.
 */
export interface ContractReadOperationResponse {
  returnValue: Uint8Array;
  info: ContractReadOperationData;
}
