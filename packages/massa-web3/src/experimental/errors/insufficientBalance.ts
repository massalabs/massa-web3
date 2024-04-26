import { BaseError } from './base'
import { ErrorCodes } from './utils/codes'

type InsufficientBalanceErrorParameters = {
  operationName: string
  userBalance: bigint
  neededBalance: bigint
  cause?: Error
}

export type InsufficientBalanceErrorType = InsufficientBalanceError & {
  name: 'InsufficientBalanceError'
}

/**
 * Error class for handling cases when a user's balance is insufficient for a specified operation.
 */
export class InsufficientBalanceError extends BaseError {
  /**
   * Explicitly sets the error name for easier identification in error handling processes.
   */
  override name = 'InsufficientBalanceError'

  /**
   * Constructs an InsufficientBalanceError with a detailed message about the shortage.
   * @param operationName - The name of the operation attempted which requires more funds.
   * @param userBalance - The current balance of the user in nanoMassa.
   * @param neededBalance - The balance required to successfully perform the operation in nanoMassa.
   * @param cause - Optional error object that triggered this error, useful for chaining errors.
   */
  constructor({
    operationName,
    userBalance,
    neededBalance,
    cause,
  }: InsufficientBalanceErrorParameters) {
    super(
      `Insufficient balance for the operation ${operationName}. User has ${userBalance} nanoMassa, but ${neededBalance} nanoMassa is needed.`,
      {
        code: ErrorCodes.InsufficientBalance,
        cause,
      }
    )
  }
}
