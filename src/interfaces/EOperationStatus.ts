/**
 * This file exports an enumeration called `EOperationStatus`, which represents
 * the different states that an operation can be in during its lifecycle. These
 * states reflect how an operation transitions from one stage to another in a
 * system or process.
 *
 * @example
 *
 * const operationStatus = EOperationStatus.INCLUDED_PENDING;
 */
export enum EOperationStatus {
  INCLUDED_PENDING = 0,
  AWAITING_INCLUSION = 1,
  FINAL = 2,
  INCONSISTENT = 3,
  NOT_FOUND = 4,
}
