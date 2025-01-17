import { Address } from '../basicElements'
import { Mas } from '../basicElements/mas'
import { U64_t } from '../basicElements/serializers/number/u64'

/**
 * Operation status.
 *
 * @remarks
 * This enumeration captures the lifecycle stages of a blockchain operation, from initiation to finalization.
 *
 * @privateRemarks
 * Keeps the order of the stages in the lifecycle as it is used by the wait method.
 */
export enum OperationStatus {
  /**
   * The operation has not been found within the blockchain, either because it is not yet processed or does not exist.
   */
  NotFound,

  /**
   * The operation has been recognized and is awaiting inclusion in the blockchain ledger.
   */
  PendingInclusion,

  /**
   * The operation has executed successfully; however, the block containing it has not yet been confirmed as final.
   */
  SpeculativeSuccess,

  /**
   * The operation has failed; however, the block containing the failure has not yet been confirmed as final.
   */
  SpeculativeError,

  /**
   * The operation has executed successfully and the block containing it has been confirmed as final.
   */
  Success,

  /**
   * The operation has failed and the block containing the failure has been confirmed as final.
   */
  Error,
}

/**
 * Operation types.
 *
 * @remarks
 * The corresponding values are fixed by the node.
 */
export enum OperationType {
  Transaction,
  RollBuy,
  RollSell,
  ExecuteSmartContractBytecode,
  CallSmartContractFunction,
}

/**
 * Operation options.
 *
 * @remarks
 * Period to live is the number of periods the operation is valid for.
 * This value must be positive and if it's too big, the node will (silently?) reject the operation.
 *
 * If no fee is provided, minimal fee of connected node is used.
 * If no periodToLive is provided, the DefaultPeriodToLive is used.
 */
export type OperationOptions = {
  fee?: U64_t
  periodToLive?: number
}

export type BaseOperation = {
  fee: U64_t
  expirePeriod: number
  type: OperationType
}

export type RollOperation = BaseOperation & {
  type: OperationType.RollBuy | OperationType.RollSell
  amount: U64_t
}

export type TransferOperation = BaseOperation & {
  type: OperationType.Transaction
  amount: U64_t
  recipientAddress: Address
}

export type BaseSmartContractOperation = BaseOperation & {
  maxGas: U64_t
  coins: U64_t
}

export type CallOperation = BaseSmartContractOperation & {
  type: OperationType.CallSmartContractFunction
  address: string
  func: string
  parameter: Uint8Array
}

export type ReadOnlyParams = {
  parameter: Uint8Array
  coins?: Mas
  fee?: Mas
  maxGas?: U64_t
  func: string
  target: string
  caller: string
}

// @see https://docs.massa.net/docs/learn/operation-format-execution#executesc-operation-payload
export type ExecuteOperation = BaseOperation & {
  maxGas: U64_t
  maxCoins: U64_t
  type: OperationType.ExecuteSmartContractBytecode
  contractDataBinary: Uint8Array
  datastore?: Map<Uint8Array, Uint8Array>
}

export type OperationDetails =
  | RollOperation
  | TransferOperation
  | CallOperation
  | ExecuteOperation
