export interface JsonRpcResponseData<T> {
    isError: boolean;
    result: T | null;
    error: Error | null;
}
