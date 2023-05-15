/**
 * Represents the data of a read operation.
 *
 * @see fee - storage fee for taking place in books
 * @see maxGas - The maximum amount of gas that the execution of the contract is allowed to cost.
 * @see targetAddress - Target smart contract address
 * @see targetFunction - Target function name. No function is called if empty.
 * @see parameter - Parameter to pass to the target function
 * @see callerAddress - Caller address
 */
export interface IReadData {
  /// storage fee for taking place in books
  fee: bigint;
  /// The maximum amount of gas that the execution of the contract is allowed to cost.
  maxGas: bigint;
  /// Target smart contract address
  targetAddress: string;
  /// Target function name. No function is called if empty.
  targetFunction: string;
  /// Parameter to pass to the target function
  parameter: Array<number>;
  /// Caller address
  callerAddress?: string;
}
