import { OperationStatus } from '../basicElements'
import { Mas } from '../basicElements/mas'
import { U64 } from '../basicElements/serializers/number/u64'
import { NodeStatus, Slot } from '../generated/client'

export type SendOperationInput = {
  data: Uint8Array
  publicKey: string
  signature: string
}

export type SCOutputEvent = {
  data: string
}

export type EventFilter = {
  start?: Slot
  end?: Slot
  smartContractAddress?: string
  callerAddress?: string
  operationId?: string
  isFinal?: boolean
  isError?: boolean
}

export type ReadOnlyCallParams = {
  func: string
  targetAddress: string
  callerAddress: string
  parameter?: Uint8Array
  coins?: Mas
  fee?: Mas
  maxGas?: bigint
}

export type ReadOnlyCallResult = {
  value: Uint8Array
  info: {
    gasCost: number
    error?: string
    events: SCOutputEvent[]
    stateChanges: {
      ledgerChanges: Record<string, unknown>
      asyncPoolChanges: Record<string, unknown>[]
      posChanges: Record<string, unknown>
      executedOpsChanges: Record<string, unknown>
      executedDenunciationsChanges: Record<string, unknown>
      executionTrailHashChange: string
    }
  }
}

/*
 * Blockchain client functions needed by the Operation class to send operations to the blockchain.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface BlockchainClient {
  sendOperation(data: SendOperationInput): Promise<string>
  fetchPeriod(): Promise<number>
  getOperationStatus(operationId: string): Promise<OperationStatus>
  getBalance(address: string, final?: boolean): Promise<Mas>
  getEvents(filter: EventFilter): Promise<SCOutputEvent[]>
  getChainId(): Promise<U64>
  getMinimalFee(): Promise<Mas>
  executeReadOnlyCall(opt: ReadOnlyCallParams): Promise<ReadOnlyCallResult>
  // TODO: change for a getter instead
  status: NodeStatus
}
