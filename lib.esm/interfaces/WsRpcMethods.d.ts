export declare enum WS_RPC_REQUEST_METHOD_BASE {
    SUBSCRIBE = "subscribe",
    UNSUBSCRIBE = "unsubscribe"
}
export declare enum WS_RPC_REQUEST_METHOD_NAME {
    UNKNOWN = "unknown",
    NEW_BLOCKS = "new_blocks",
    NEW_BLOCKS_HEADERS = "new_blocks_headers",
    NEW_FILLED_BLOCKS = "new_filled_blocks"
}
export declare const matchMethodName: (methodName: string) => WS_RPC_REQUEST_METHOD_NAME;
export declare const generateFullRequestName: (methodBase: WS_RPC_REQUEST_METHOD_BASE, methodName: WS_RPC_REQUEST_METHOD_NAME) => string;
