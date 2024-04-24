import { OperationStatus } from '../basicElements'
import { NodeStatus, Slot } from '../generated/client'

export interface SendOperationInput {
  data: Uint8Array
  publicKey: string
  signature: string
}

export interface SCOutputEvent {
  data: string
}

export interface EventFilter {
  start?: Slot
  end?: Slot
  smartContractAddress?: string
  callerAddress?: string
  operationId?: string
  isFinal?: boolean
  isError?: boolean
}

/*
 * Blockchain client functions needed by the Operation class to send operations to the blockchain.
 */
export interface BlockchainClient {
  sendOperation(data: SendOperationInput): Promise<string>
  fetchPeriod(): Promise<number>
  getOperationStatus(operationId: string): Promise<OperationStatus>
  getBalance(address: string, final?: boolean): Promise<bigint>
  getEvents(filter: EventFilter): Promise<SCOutputEvent[]>
  getChainId(): Promise<bigint>
  getMinimalFee(): Promise<bigint>
  status: NodeStatus
}
