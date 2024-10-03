import { ErrorCodes } from './utils/codes';
export type BaseParameters = {
    code?: ErrorCodes;
    docsPath?: string;
    metaMessages?: string[];
} & ({
    cause?: never;
    details?: string;
} | {
    cause: ErrorBase | Error;
    details?: never;
});
/**
 * ErrorBase extends the native Error class to provide additional metadata handling for richer error information.
 * This class can serve as a base for more specific error types in a wallet or similar system.
 */
export declare class ErrorBase extends Error {
    metaMessages: string[];
    docsPath?: string;
    code: ErrorCodes;
    cause?: Error;
    name: string;
    constructor(shortMessage: string, args?: BaseParameters);
}
