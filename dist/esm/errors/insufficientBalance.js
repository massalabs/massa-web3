import { ErrorBase } from './base';
import { ErrorCodes } from './utils/codes';
/**
 * Error class for handling cases when a user's balance is insufficient for a specified operation.
 */
export class ErrorInsufficientBalance extends ErrorBase {
    /**
     * Explicitly sets the error name for easier identification in error handling processes.
     */
    name = 'ErrorInsufficientBalance';
    /**
     * Constructs an ErrorInsufficientBalance with a detailed message about the shortage.
     * @param userBalance - The current balance of the user in nanoMassa.
     * @param neededBalance - The balance required to successfully perform the operation in nanoMassa.
     * @param cause - Optional error object that triggered this error, useful for chaining errors.
     */
    constructor({ userBalance, neededBalance, cause, }) {
        super(`Insufficient balance for the operation. User has ${userBalance} nanoMassa, but ${neededBalance} nanoMassa is needed.`, {
            code: ErrorCodes.InsufficientBalance,
            cause,
        });
    }
}
//# sourceMappingURL=insufficientBalance.js.map