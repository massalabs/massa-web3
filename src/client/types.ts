import { Slot } from '../generated/client'

export type SendOperationInput = {
  data: Uint8Array
  publicKey: string
  signature: string
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
