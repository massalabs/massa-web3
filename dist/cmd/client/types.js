"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
var Transport;
(function (Transport) {
    Transport["WebSocket"] = "websocket";
    Transport["HTTP"] = "http";
    Transport["HTTPS"] = "https";
    Transport["PostMessageWindow"] = "postmessagewindow";
    Transport["PostMessageIframe"] = "postmessageiframe";
})(Transport || (exports.Transport = Transport = {}));
//# sourceMappingURL=types.js.map