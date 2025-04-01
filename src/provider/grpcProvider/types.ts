import { SlotRange } from '../../generated/grpc/massa/model/v1/slot_pb'
import {
  AsyncPoolChangeType,
  ExecutionOutputStatus,
} from '../../generated/grpc/massa/model/v1/execution_pb'

export type SlotExecutionOutputFilter = {
  status?: ExecutionOutputStatus
  slotRange?: SlotRange
  asyncPoolChangesFilter?: AsyncPoolChangesFilter
  emptyExecutedDenounciationFilter?: boolean
  eventFilter?: ExecutionEventFilter
  executedOpsChangesFilter?: ExecutedOpsChangesFilter
  ledgerChangesFilter?: LedgerChangesFilter
}

export type AsyncPoolChangesFilter = {
  type?: AsyncPoolChangeType
  handler?: string
  destinationAddress?: string
  emitterAddress?: string
  canBeExecuted?: boolean
  empty?: boolean
}

export type ExecutionEventFilter = {
  callerAddress?: string
  emitterAddress?: string
  originalOperationId?: string
  isFailure?: boolean
  empty?: boolean
}

export type ExecutedOpsChangesFilter = {
  empty?: boolean
  operationId?: string
}

export type LedgerChangesFilter = {
  empty?: boolean
  address?: string
}
