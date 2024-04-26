import { BaseError } from './base'
import { ErrorCodes } from './utils/codes'

type MinimalFeeErrorParameters = {
  minimalFee: bigint
  cause?: Error
}

export type MinimalFeeErrorType = MinimalFeeError & { name: 'MinimalFeeError' }

/**
 * MinimalFeeError is a specific type of error that is thrown when the provided fee for an operation
 * is below the minimum required fee for that operation. It extends BaseError to provide additional context and metadata.
 */
export class MinimalFeeError extends BaseError {
  override name = 'MinimalFeeError' // Override the default error name with a more specific one.

  /**
   * Constructs a new MinimalFeeError with a message indicating the minimum required fee.
   * @param minimalFee - The minimum fee that was required for the operation.
   * @param cause - Optional. The underlying cause of the error for error chaining.
   */
  constructor({ minimalFee, cause }: MinimalFeeErrorParameters) {
    // Call the base class constructor with a detailed message and the relevant error code.
    super(
      `Minimal fees for the operation on this client are ${minimalFee}. Please adjust the fee.`,
      {
        code: ErrorCodes.MinimalFee,
        cause,
      }
    )
  }
}
