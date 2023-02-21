import { MassaFee } from '../web3/MassaFee';
import { MassaGas } from '../web3/MassaGas';

export interface IReadData {
  /// storage fee for taking place in books
  fee: MassaFee;
  /// The maximum amount of gas that the execution of the contract is allowed to cost.
  maxGas: MassaGas;
  /// Target smart contract address
  targetAddress: string;
  /// Target function name. No function is called if empty.
  targetFunction: string;
  /// Parameter to pass to the target function
  parameter: Array<number>;
  /// Parameter to pass to the target function
  callerAddress?: string;
}
