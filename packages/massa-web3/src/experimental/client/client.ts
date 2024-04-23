import { OperationStatus } from '../basicElements'
import { Slot } from '../generated/client'

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
  fetchChainId(): Promise<bigint>
  fetchPeriod(): Promise<number>
  getOperationStatus(operationId: string): Promise<OperationStatus>
  getBalance(address: string, speculative?: boolean): Promise<bigint>
  getEvents(filter: EventFilter): Promise<SCOutputEvent[]>
}
