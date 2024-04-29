import { ErrorBase } from './base'
import { ErrorCodes } from './utils/codes'

type ErrorMaxGasParameters = {
  isHigher: boolean
  amount: bigint
  cause?: Error
}

export type ErrorTypeMaxGas = ErrorMaxGas & { name: 'ErrorMaxGas' }

/**
 * Error class for handling gas limit errors related to operations, whether exceeding max or falling below min allowed limits.
 */
export class ErrorMaxGas extends ErrorBase {
  /**
   * Override the name to clearly identify this as a ErrorMaxGas.
   */
  override name = 'ErrorMaxGas'

  /**
   * Constructs a ErrorMaxGas with a message indicating whether the gas limit was exceeded or insufficient.
   * @param isHigher - Boolean indicating if the actual gas used was higher than allowed (true) or lower (false).
   * @param amount - The critical amount of gas that was either exceeded or not reached.
   * @param cause - Optional cause of the error for deeper error chaining.
   */
  constructor({ isHigher, amount, cause }: ErrorMaxGasParameters) {
    super(
      `The gas limit for the operation was ${isHigher ? 'higher than the maximum' : 'below the minimum'} amount of ${amount}.`,
      {
        code: ErrorCodes.MaxGasLimit,
        cause,
      }
    )
  }
}
