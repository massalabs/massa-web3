import { MassaAmount } from '../web3/MassaAmount';

export interface IReadData {
  /// storage fee for taking place in books
  fee: MassaAmount;
  /// The maximum amount of gas that the execution of the contract is allowed to cost.
  maxGas: MassaAmount;
  /// Target smart contract address
  targetAddress: string;
  /// Target function name. No function is called if empty.
  targetFunction: string;
  /// Parameter to pass to the target function
  parameter: Array<number>;
  /// Parameter to pass to the target function
  callerAddress?: string;
}
