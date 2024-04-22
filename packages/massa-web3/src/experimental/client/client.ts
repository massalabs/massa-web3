import { OperationStatus } from '../basicElements'

export interface SendOperationInput {
  data: Uint8Array
  publicKey: string
  signature: string
}

export interface SCOutputEvent {
  data: string
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
}
