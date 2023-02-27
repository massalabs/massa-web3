import { MassaAmount } from '../web3/MassaAmount';

export interface ICallData {
  /// storage fee for taking place in books
  fee: MassaAmount;
  /// The maximum amount of gas that the execution of the contract is allowed to cost.
  maxGas: MassaAmount;
  /// Extra coins that are spent from the caller's balance and transferred to the target
  coins: MassaAmount;
  /// Target smart contract address
  targetAddress: string;
  /// Target function name. No function is called if empty.
  functionName: string;
  /// Parameter to pass to the target function
  parameter: Array<number>;
}
