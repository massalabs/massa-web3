import { Args } from '@massalabs/web3-utils';

/**
 * Represents the data of a read operation.
 *
 * @see maxGas - The maximum amount of gas that the execution of the contract is allowed to cost.
 * @see targetAddress - Target smart contract address
 * @see targetFunction - Target function name. No function is called if empty.
 * @see parameter - Parameter to pass to the target function
 * @see callerAddress - Caller address
 */
export interface IReadData {
  maxGas: bigint;
  targetAddress: string;
  targetFunction: string;
  parameter: Array<number> | Args;
  callerAddress?: string;
}
