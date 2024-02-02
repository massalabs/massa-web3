/**
 * Interface for JSON RPC response data.
 *
 * @see isError - true if the response is an error, false otherwise
 * @see result - the result of the response (can be null)
 * @see error - the error of the response (can be null)
 */
export interface JsonRpcResponseData<T> {
  isError: boolean
  result: T | null
  error: Error | null
}
