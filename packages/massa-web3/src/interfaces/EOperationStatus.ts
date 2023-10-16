/**
 * Represents the status of an operation on the Massa blockchain.
 */
export enum EOperationStatus {
  INCLUDED_PENDING = 0,
  AWAITING_INCLUSION = 1,
  FINAL_SUCCESS = 2,
  NOT_FOUND = 4,
  INCONSISTENT = 3,
  FINAL_ERROR = 5,
  SPECULATIVE_SUCCESS = 6,
  SPECULATIVE_ERROR = 7,
  UNEXECUTED_OR_EXPIRED = 8,
}
