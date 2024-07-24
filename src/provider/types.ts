import { Mas } from '../basicElements/mas'
import { U64 } from '../basicElements/serializers/number/u64'
import { EventExecutionContext } from '../generated/client'

export type SCOutputEvent = {
  data: string
  context: EventExecutionContext
}

type CallSCCommons = {
  parameter: Uint8Array
  coins?: Mas
  fee?: Mas
  maxGas?: U64
}

export type ReadSCParams = CallSCCommons & {
  func: string
  target: string
  caller: string
}

export type CallSCParams = ReadSCParams & {
  periodToLive?: number
}

export type DeploySCParams = CallSCCommons & {
  byteCode: Uint8Array
  periodToLive?: number
  waitFinalExecution?: boolean
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
