import { MassaCoin } from '../web3/MassaCoin';
import { MassaFee } from '../web3/MassaFee';
import { MassaGas } from '../web3/MassaGas';

export interface ICallData {
  /// storage fee for taking place in books
  fee: MassaFee;
  /// The maximum amount of gas that the execution of the contract is allowed to cost.
  maxGas: MassaGas;
  /// Extra coins that are spent from the caller's balance and transferred to the target
  coins: MassaCoin;
  /// Target smart contract address
  targetAddress: string;
  /// Target function name. No function is called if empty.
  functionName: string;
  /// Parameter to pass to the target function
  parameter: Array<number>;
}
