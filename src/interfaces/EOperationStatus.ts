/**
 * Represents the status of an operation on the Massa blockchain.
 */
export enum EOperationStatus {
  INCLUDED_PENDING = 0,
  AWAITING_INCLUSION = 1,
  FINAL = 2,
  INCONSISTENT = 3,
  NOT_FOUND = 4,
  FINAL_SUCCESS = 5,
  FINAL_ERROR = 6,
  SPECULATIVE_SUCCESS = 7,
  SPECULATIVE_ERROR = 8,
  UNEXECUTED_OR_EXPIRED = 9,
}
