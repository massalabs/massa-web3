"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFullRequestName = exports.matchMethodName = exports.WS_RPC_REQUEST_METHOD_NAME = exports.WS_RPC_REQUEST_METHOD_BASE = void 0;
var WS_RPC_REQUEST_METHOD_BASE;
(function (WS_RPC_REQUEST_METHOD_BASE) {
    WS_RPC_REQUEST_METHOD_BASE["SUBSCRIBE"] = "subscribe";
    WS_RPC_REQUEST_METHOD_BASE["UNSUBSCRIBE"] = "unsubscribe";
})(WS_RPC_REQUEST_METHOD_BASE = exports.WS_RPC_REQUEST_METHOD_BASE || (exports.WS_RPC_REQUEST_METHOD_BASE = {}));
var WS_RPC_REQUEST_METHOD_NAME;
(function (WS_RPC_REQUEST_METHOD_NAME) {
    WS_RPC_REQUEST_METHOD_NAME["UNKNOWN"] = "unknown";
    WS_RPC_REQUEST_METHOD_NAME["NEW_BLOCKS"] = "new_blocks";
    WS_RPC_REQUEST_METHOD_NAME["NEW_BLOCKS_HEADERS"] = "new_blocks_headers";
    WS_RPC_REQUEST_METHOD_NAME["NEW_FILLED_BLOCKS"] = "new_filled_blocks";
})(WS_RPC_REQUEST_METHOD_NAME = exports.WS_RPC_REQUEST_METHOD_NAME || (exports.WS_RPC_REQUEST_METHOD_NAME = {}));
const matchMethodName = (methodName) => {
    switch (methodName) {
        case WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS.toString(): {
            return WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS;
        }
        case WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS.toString(): {
            return WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS;
        }
        case WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS.toString(): {
            return WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS;
        }
        default:
            throw new Error(`Unknown method name ${methodName}`);
    }
};
exports.matchMethodName = matchMethodName;
const generateFullRequestName = (methodBase, methodName) => {
    return `${methodBase.toString()}_${methodName.toString()}`;
};
exports.generateFullRequestName = generateFullRequestName;
//# sourceMappingURL=WsRpcMethods.js.map