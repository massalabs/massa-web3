/**
 * Enum for representing rpc websocket request method types
 */
export enum WS_RPC_REQUEST_METHOD_BASE {
	/**
   * Subcribe method
   */
	SUBSCRIBE = "subscribe",
	/**
   * Unsubcribe method
   */
	UNSUBSCRIBE = "unsubscribe"
}

/**
 * Enum for representing rpc websocket request method names
 */
export enum WS_RPC_REQUEST_METHOD_NAME {
	/**
   * Unknown method name
   */
	UNKNOWN = "unknown",
	/**
   * Method for receiving new blocks
   */
	NEW_BLOCKS = "new_blocks",
	/**
   * Method for receiving new blocks headers
   */
	NEW_BLOCKS_HEADERS = "new_blocks_headers",
	/**
   * Method for receiving filled with operations blocks
   */
	NEW_FILLED_BLOCKS = "new_filled_blocks",
}

/**
* Matches method name to rpc websocket method name enum
* @param {string} methodName The `WS_RPC_REQUEST_METHOD_NAME` enum variant
*/
export const matchMethodName = (methodName: string): WS_RPC_REQUEST_METHOD_NAME => {
  switch (methodName) {
    case WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS.toString():
    { return WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS; }
    case WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS.toString():
    { return WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS; }
    case WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS.toString():
    { return WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS; }
    default: throw new Error(`Unknown method name ${methodName}`);
  }
};

/**
* Generates a fully qualified request name
* @param {string} methodBase The `WS_RPC_REQUEST_METHOD_BASE` enum variant
* @param {string} methodName The `WS_RPC_REQUEST_METHOD_NAME` enum variant
*/
export const generateFullRequestName = (methodBase: WS_RPC_REQUEST_METHOD_BASE, methodName: WS_RPC_REQUEST_METHOD_NAME): string => {
  return `${methodBase.toString()}_${methodName.toString()}`;
};
