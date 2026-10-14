import { ErrorBase } from './base'
import { ErrorCodes } from './utils/codes'

type ErrorOperationSizeParameters = {
  size: number
  maxSize: number
  cause?: Error
}

/**
 * ErrorOperationSize is thrown when a serialized operation is bigger than the maximum size accepted by
 * the node: such an operation can never be propagated nor included in a block.
 */
export class ErrorOperationSize extends ErrorBase {
  override name = 'ErrorOperationSize'

  /**
   * Constructs a new ErrorOperationSize.
   * @param size - The serialized size of the operation, in bytes.
   * @param maxSize - The maximum serialized size of an operation, in bytes.
   * @param cause - Optional. The underlying cause of the error for error chaining.
   */
  constructor({ size, maxSize, cause }: ErrorOperationSizeParameters) {
    super(
      `The serialized operation size (${size} bytes) exceeds the maximum of ${maxSize} bytes. It will never be included in a block.`,
      {
        code: ErrorCodes.OperationSize,
        cause,
      }
    )
  }
}
