import { ErrorBase } from './base';
type ErrorMaxGasParameters = {
    isHigher: boolean;
    amount: bigint;
    cause?: Error;
};
/**
 * Error class for handling gas limit errors related to operations, whether exceeding max or falling below min allowed limits.
 */
export declare class ErrorMaxGas extends ErrorBase {
    /**
     * Override the name to clearly identify this as a ErrorMaxGas.
     */
    name: string;
    /**
     * Constructs a ErrorMaxGas with a message indicating whether the gas limit was exceeded or insufficient.
     * @param isHigher - Boolean indicating if the actual gas used was higher than allowed (true) or lower (false).
     * @param amount - The critical amount of gas that was either exceeded or not reached.
     * @param cause - Optional cause of the error for deeper error chaining.
     */
    constructor({ isHigher, amount, cause }: ErrorMaxGasParameters);
}
export {};
