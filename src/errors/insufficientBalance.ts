import { formatMas } from '../utils'
import { ErrorBase } from './base'
import { ErrorCodes } from './utils/codes'

type InsufficientBalanceParameters = {
  userBalance: bigint
  neededBalance: bigint
  cause?: Error
}

/**
 * Error class for handling cases when a user's balance is insufficient for a specified operation.
 */
export class ErrorInsufficientBalance extends ErrorBase {
  /**
   * Explicitly sets the error name for easier identification in error handling processes.
   */
  override name = 'ErrorInsufficientBalance'

  /**
   * Constructs an ErrorInsufficientBalance with a detailed message about the shortage.
   * @param userBalance - The current balance .
   * @param neededBalance - The balance required to successfully perform the operation
   * @param cause - Optional error object that triggered this error, useful for chaining errors.
   */
  constructor({
    userBalance,
    neededBalance,
    cause,
  }: InsufficientBalanceParameters) {
    super(
      `Insufficient balance for the operation. User has ${formatMas(userBalance)} MAS, but ${formatMas(neededBalance)} MAS is needed.`,
      {
        code: ErrorCodes.InsufficientBalance,
        cause,
      }
    )
  }
}
