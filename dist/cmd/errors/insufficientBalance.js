"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInsufficientBalance = void 0;
const base_1 = require("./base");
const codes_1 = require("./utils/codes");
/**
 * Error class for handling cases when a user's balance is insufficient for a specified operation.
 */
class ErrorInsufficientBalance extends base_1.ErrorBase {
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
            code: codes_1.ErrorCodes.InsufficientBalance,
            cause,
        });
    }
}
exports.ErrorInsufficientBalance = ErrorInsufficientBalance;
//# sourceMappingURL=insufficientBalance.js.map