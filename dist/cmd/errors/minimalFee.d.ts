import { ErrorBase } from './base';
type ErrorMinimalFeeParameters = {
    minimalFee: bigint;
    cause?: Error;
};
/**
 * ErrorMinimalFee is a specific type of error that is thrown when the provided fee for an operation
 * is below the minimum required fee for that operation. It extends ErrorBase to provide additional context and metadata.
 */
export declare class ErrorMinimalFee extends ErrorBase {
    name: string;
    /**
     * Constructs a new ErrorMinimalFee with a message indicating the minimum required fee.
     * @param minimalFee - The minimum fee that was required for the operation.
     * @param cause - Optional. The underlying cause of the error for error chaining.
     */
    constructor({ minimalFee, cause }: ErrorMinimalFeeParameters);
}
export {};
