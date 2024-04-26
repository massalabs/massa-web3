import { BaseError } from './base'
import { ErrorCodes } from './utils/codes'

type MaxGasErrorParameters = {
  isHigher: boolean
  amount: bigint
  cause?: Error
}

export type MaxGasErrorType = MaxGasError & { name: 'MaxGasError' }

/**
 * Error class for handling gas limit errors related to operations, whether exceeding max or falling below min allowed limits.
 */
export class MaxGasError extends BaseError {
  /**
   * Override the name to clearly identify this as a MaxGasError.
   */
  override name = 'MaxGasError'

  /**
   * Constructs a MaxGasError with a message indicating whether the gas limit was exceeded or insufficient.
   * @param isHigher - Boolean indicating if the actual gas used was higher than allowed (true) or lower (false).
   * @param amount - The critical amount of gas that was either exceeded or not reached.
   * @param cause - Optional cause of the error for deeper error chaining.
   */
  constructor({ isHigher, amount, cause }: MaxGasErrorParameters) {
    super(
      `The gas limit for the operation was ${isHigher ? 'higher than the maximum' : 'below the minimum'} amount of ${amount}.`,
      {
        code: ErrorCodes.MaxGasLimit,
        cause,
      }
    )
  }
}
