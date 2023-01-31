export enum WS_RPC_REQUEST_METHOD_BASE {
	SUBSCRIBE = "subscribe",
	UNSUBSCRIBE = "unsubscribe"
}

export enum WS_RPC_REQUEST_METHOD_NAME {
	UNKNOWN = "unknown",
	NEW_BLOCKS = "new_blocks",
	NEW_BLOCKS_HEADERS = "new_blocks_headers",
	NEW_FILLED_BLOCKS = "new_filled_blocks",
}

export const matchMethodName = (methodName: string): WS_RPC_REQUEST_METHOD_NAME => {
	switch (methodName) {
		case WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS.toString(): { return WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS; }
		case WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS.toString(): { return WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS; }
		case WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS.toString(): { return WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS; }
		default: throw new Error(`Unknown method name ${methodName}`);
	}
};

export const generateFullRequestName = (methodBase: WS_RPC_REQUEST_METHOD_BASE, methodName: WS_RPC_REQUEST_METHOD_NAME): string => {
	return `${methodBase.toString()}_${methodName.toString()}`;
};
