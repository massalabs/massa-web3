export declare const DEFAULT_RETRY_OPTS: {
    retries: number;
    delay: number;
};
export declare function withRetry<T>(fn: () => Promise<T>, opt: {
    retries: number;
    delay: number;
}): Promise<T>;
