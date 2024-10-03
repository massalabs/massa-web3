"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorMaxGas = void 0;
const base_1 = require("./base");
const codes_1 = require("./utils/codes");
/**
 * Error class for handling gas limit errors related to operations, whether exceeding max or falling below min allowed limits.
 */
class ErrorMaxGas extends base_1.ErrorBase {
    /**
     * Override the name to clearly identify this as a ErrorMaxGas.
     */
    name = 'ErrorMaxGas';
    /**
     * Constructs a ErrorMaxGas with a message indicating whether the gas limit was exceeded or insufficient.
     * @param isHigher - Boolean indicating if the actual gas used was higher than allowed (true) or lower (false).
     * @param amount - The critical amount of gas that was either exceeded or not reached.
     * @param cause - Optional cause of the error for deeper error chaining.
     */
    constructor({ isHigher, amount, cause }) {
        super(`The gas limit for the operation was ${isHigher ? 'higher than the maximum' : 'below the minimum'} amount of ${amount}.`, {
            code: codes_1.ErrorCodes.MaxGasLimit,
            cause,
        });
    }
}
exports.ErrorMaxGas = ErrorMaxGas;
//# sourceMappingURL=maxGas.js.map