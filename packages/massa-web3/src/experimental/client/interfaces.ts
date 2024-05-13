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
  // TODO: change for a getter instead
  status: NodeStatus
}
