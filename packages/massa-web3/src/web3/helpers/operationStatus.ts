import { IOperationData } from '../..'

export function isUnexecutedOrExpired(operation: IOperationData): boolean {
  return (
    operation.is_operation_final === null && operation.op_exec_status === null
  )
}

export function isFinalSuccess(operation: IOperationData): boolean {
  return operation.is_operation_final && operation.op_exec_status === true
}

export function isFinalError(operation: IOperationData): boolean {
  return operation.is_operation_final && operation.op_exec_status === false
}

export function isSpeculativeSuccess(operation: IOperationData): boolean {
  return !operation.is_operation_final && operation.op_exec_status === true
}

export function isSpeculativeError(operation: IOperationData): boolean {
  return !operation.is_operation_final && operation.op_exec_status === false
}

export function isAwaitingInclusion(operation: IOperationData): boolean {
  return operation.in_pool
}

export function isIncludedPending(operation: IOperationData): boolean {
  return operation.in_blocks.length > 0
}
