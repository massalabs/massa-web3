import { rpcTypes as t } from '../generated'

export type ClientOptions = {
  retry: { retries: number; delay: number }
}

export type SendOperationInput = {
  data: Uint8Array
  publicKey: string
  signature: string
}

export type EventFilter = {
  start?: t.Slot
  end?: t.Slot
  smartContractAddress?: string
  callerAddress?: string
  operationId?: string
  isFinal?: boolean
  isError?: boolean
}

export type ReadOnlyCallResult = {
  value: Uint8Array
  info: {
    gasCost: number
    error?: string
    events: t.OutputEvents
    stateChanges: {
      ledgerChanges: Record<string, unknown>
      asyncPoolChanges: Record<string, unknown>[]
      posChanges: Record<string, unknown>
      executedOpsChanges: Record<string, unknown>
      executedDenunciationsChanges: Record<string, unknown>
      executionTrailHashChange: t.ExecutionTrailHashChange
    }
  }
}

export type DatastoreEntry = {
  address: string
  key: Uint8Array | string
}
export type DatastoreKeysRequest = {
  address: string
  final?: boolean
  prefix?: Uint8Array | string
  startKey?: Uint8Array | string
  // default true
  inclusiveStartKey?: boolean
  endKey?: Uint8Array | string
  // default true
  inclusiveEndKey?: boolean
  // default config is 500
  maxCount?: number
}

export type AddressDatastoreKeys = {
  address: string
  isFinal: boolean
  keys: Uint8Array[]
}
