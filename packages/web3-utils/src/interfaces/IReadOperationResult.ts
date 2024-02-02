/**
 * Represents the result of a read operation on the blockchain.
 *
 * @see Ok - Included in case of success. The result of the execution
 * @see Error - Included in case of error. The error message
 */
export interface IReadOperationResult {
  Ok?: Uint8Array
  Error?: string
}
