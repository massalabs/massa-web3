import { Args } from '@massalabs/web3-utils'

/**
 * Represents the information for a smart contract call.
 *
 * @remarks
 * This interface is used to track the calldata information, including the
 * transaction fee, maximum gas, transferred coins, target smart contract address,
 * target function name, and parameters for the function call.
 *
 * @see fee of type `bigint` represents the transaction fee.
 * @see maxGas of type `bigint` represents the maximum amount of gas that the execution of the contract is allowed to cost.
 * @see coins of type `bigint` represents the extra coins in `nanoMassa` that are spent from the caller's balance and transferred to the target.
 * @see targetAddress of type `string` represents the target smart contract address.
 * @see targetFunction of type `string` represents the target function name. No function is called if empty.
 * @see parameter of type `Array<number>` or an Args represents the parameters to pass to the target function.
 */
export interface ICallData {
  /** The fee amount in nanoMassa. */
  fee: bigint
  maxGas?: bigint
  /** The coin amount in nanoMassa. */
  coins?: bigint
  targetAddress: string
  targetFunction: string
  parameter: Array<number> | Args
}
