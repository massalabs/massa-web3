import { ErrorBase } from './base';
type InsufficientBalanceParameters = {
    userBalance: bigint;
    neededBalance: bigint;
    cause?: Error;
};
/**
 * Error class for handling cases when a user's balance is insufficient for a specified operation.
 */
export declare class ErrorInsufficientBalance extends ErrorBase {
    /**
     * Explicitly sets the error name for easier identification in error handling processes.
     */
    name: string;
    /**
     * Constructs an ErrorInsufficientBalance with a detailed message about the shortage.
     * @param userBalance - The current balance of the user in nanoMassa.
     * @param neededBalance - The balance required to successfully perform the operation in nanoMassa.
     * @param cause - Optional error object that triggered this error, useful for chaining errors.
     */
    constructor({ userBalance, neededBalance, cause, }: InsufficientBalanceParameters);
}
export {};
