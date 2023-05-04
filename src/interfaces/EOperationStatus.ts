/**
 * This enum represents the status of an operation.
 *
 * @example
 *
 * const operationStatus = EOperationStatus.INCLUDED_PENDING;
 *
 */
export enum EOperationStatus {
  INCLUDED_PENDING = 0,
  AWAITING_INCLUSION = 1,
  FINAL = 2,
  INCONSISTENT = 3,
  NOT_FOUND = 4,
}
