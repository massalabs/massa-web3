import { EventExecutionContext, Slot } from '../generated/client'

export type SCEvent = {
  data: string
  context: EventExecutionContext
}

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

export type ReadOnlyCallResult = {
  value: Uint8Array
  info: {
    gasCost: number
    error?: string
    events: SCEvent[]
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