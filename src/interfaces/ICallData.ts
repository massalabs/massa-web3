/**
 * Represents the information for a smart contract call.
 * @remarks
 * This interface is used to track the call data information, including the
 * storage fee, maximum gas, transferred coins, target smart contract address,
 * target function name, and parameters for the function call.
 */
export interface ICallData {
  fee: bigint;
  maxGas: bigint;
  coins: bigint;
  targetAddress: string;
  functionName: string;
  parameter: Array<number>;
}
