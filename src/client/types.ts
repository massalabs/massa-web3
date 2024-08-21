import { EventExecutionContext } from '../generated/client'

export enum Transport {
  WebSocket = 'websocket',
  HTTP = 'http',
  HTTPS = 'https',
  PostMessageWindow = 'postmessagewindow',
  PostMessageIframe = 'postmessageiframe',
}

export type Slot = {
  period: number
  thread: number
}

export type TransportOptions = {
  path?: string
  protocol?: string
}

export type ClientOptions = {
  retry: { retries: number; delay: number }
}

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

export type DatastoreEntry = {
  address: string
  key: Uint8Array
}
