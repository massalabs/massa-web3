import { ErrorBase } from './base';
import { ErrorCodes } from './utils/codes';
/**
 * ErrorMinimalFee is a specific type of error that is thrown when the provided fee for an operation
 * is below the minimum required fee for that operation. It extends ErrorBase to provide additional context and metadata.
 */
export class ErrorMinimalFee extends ErrorBase {
    name = 'ErrorMinimalFee'; // Override the default error name with a more specific one.
    /**
     * Constructs a new ErrorMinimalFee with a message indicating the minimum required fee.
     * @param minimalFee - The minimum fee that was required for the operation.
     * @param cause - Optional. The underlying cause of the error for error chaining.
     */
    constructor({ minimalFee, cause }) {
        // Call the base class constructor with a detailed message and the relevant error code.
        super(`Minimal fees for the operation on this client are ${minimalFee}. Please adjust the fee.`, {
            code: ErrorCodes.MinimalFee,
            cause,
        });
    }
}
//# sourceMappingURL=minimalFee.js.map