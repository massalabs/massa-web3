"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsBaseClient = exports.checkForBrowserWs = exports.arrayBufferToBase64 = exports.WS_PING_TIMEOUT_MS = void 0;
const events_1 = require("events");
const WebsocketEvent_1 = require("../interfaces/WebsocketEvent");
const NodeWebSocket = require('ws');
const IProvider_1 = require("../interfaces/IProvider");
let IINodeWebSocket;
exports.WS_PING_TIMEOUT_MS = 30000;
const arrayBufferToBase64 = (array) => {
    return array.toString('utf-8');
};
exports.arrayBufferToBase64 = arrayBufferToBase64;
const checkForBrowserWs = () => {
    let Ws = null;
    if (typeof WebSocket !== 'undefined') {
        Ws = WebSocket;
    }
    else if (typeof MozWebSocket !== 'undefined') {
        Ws = MozWebSocket;
    }
    else if (typeof global !== 'undefined') {
        Ws = global.WebSocket || global.MozWebSocket;
    }
    else if (typeof window !== 'undefined') {
        Ws = window.WebSocket || window.MozWebSocket;
    }
    else if (typeof self !== 'undefined') {
        Ws = self.WebSocket || self.MozWebSocket;
    }
    return {
        isBrowser: Ws !== null && Ws !== undefined,
        Ws,
    };
};
exports.checkForBrowserWs = checkForBrowserWs;
/** Base Ws Client for interacting with the massa network */
class WsBaseClient extends events_1.EventEmitter {
    constructor(clientConfig) {
        super();
        this.wss = null;
        this.isConnected = false;
        this.isBrowserWs = false;
        this.clientConfig = clientConfig;
        if (!clientConfig.providers.find((provider) => provider.type === IProvider_1.ProviderType.WS)) {
            throw new Error('No ws provider provided');
        }
        this.clientConfig.pingTimeoutMs =
            this.clientConfig.pingTimeoutMs | exports.WS_PING_TIMEOUT_MS;
        this.connect = this.connect.bind(this);
        this.closeConnection = this.closeConnection.bind(this);
        this.connectNodeWs = this.connectNodeWs.bind(this);
        this.connectBrowserWs = this.connectBrowserWs.bind(this);
        this.checkNextHeartbeat = this.checkNextHeartbeat.bind(this);
        this.getReadyState = this.getReadyState.bind(this);
        this.getBinaryType = this.getBinaryType.bind(this);
        this.getUrl = this.getUrl.bind(this);
        this.getProtocol = this.getProtocol.bind(this);
        this.getExtensions = this.getExtensions.bind(this);
        this.getBufferedAmount = this.getBufferedAmount.bind(this);
        this.setProviders = this.setProviders.bind(this);
        this.getWsProviders = this.getWsProviders.bind(this);
    }
    /** set new providers */
    setProviders(providers) {
        this.clientConfig.providers = providers;
    }
    /** return all ws providers */
    getWsProviders() {
        return this.clientConfig.providers.filter((provider) => provider.type === IProvider_1.ProviderType.WS);
    }
    async connect() {
        if (this.wss || this.isConnected) {
            return;
        }
        const browserWs = (0, exports.checkForBrowserWs)();
        const provider = this.clientConfig.providers.find((provider) => provider.type === IProvider_1.ProviderType.WS);
        this.wss = browserWs.isBrowser
            ? new browserWs.Ws(provider.url)
            : new NodeWebSocket(provider.url, {
                perMessageDeflate: false,
            });
        this.isBrowserWs = browserWs.isBrowser;
        return browserWs.isBrowser ? this.connectBrowserWs() : this.connectNodeWs();
    }
    getReadyState() {
        if (this.wss && this.isConnected) {
            return this.wss.readyState;
        }
        return null;
    }
    getBinaryType() {
        if (this.wss && this.isConnected) {
            return this.wss.binaryType;
        }
        return null;
    }
    getUrl() {
        if (this.wss && this.isConnected) {
            return this.wss.url;
        }
        return null;
    }
    getProtocol() {
        if (this.wss && this.isConnected) {
            return this.wss.protocol;
        }
        return null;
    }
    getExtensions() {
        if (this.wss && this.isConnected) {
            return this.wss.extensions;
        }
        return null;
    }
    getBufferedAmount() {
        if (this.wss && this.isConnected) {
            return this.wss.bufferedAmount;
        }
        return null;
    }
    closeConnection() {
        // check for undrained connection
        if (this.wss && this.isConnected && this.wss.bufferedAmount === 0) {
            this.wss.close();
            return true;
        }
        return false;
    }
    connectNodeWs() {
        this.wss.on(WebsocketEvent_1.WebsocketEvent.ON_CLOSED, () => {
            this.isConnected = false;
            this.emit(WebsocketEvent_1.WebsocketEvent.ON_CLOSED);
        });
        this.wss.on(WebsocketEvent_1.WebsocketEvent.ON_CONNECTING, () => {
            this.emit(WebsocketEvent_1.WebsocketEvent.ON_CONNECTING);
        });
        this.wss.on(WebsocketEvent_1.WebsocketEvent.ON_CLOSING, () => {
            this.emit(WebsocketEvent_1.WebsocketEvent.ON_CLOSING);
        });
        this.wss.on(WebsocketEvent_1.WebsocketEvent.ON_PING, () => {
            this.emit(WebsocketEvent_1.WebsocketEvent.ON_PING);
            this.checkNextHeartbeat();
        });
        this.wss.on(WebsocketEvent_1.WebsocketEvent.ON_MESSAGE, (data) => {
            this.parseWsMessage(data);
        });
        return new Promise((resolve, reject) => {
            this.wss.on(WebsocketEvent_1.WebsocketEvent.ON_OPEN, () => {
                this.isConnected = true;
                this.emit(WebsocketEvent_1.WebsocketEvent.ON_OPEN);
                return resolve();
            });
        });
    }
    connectBrowserWs() {
        const wss = this.wss;
        wss.onclose = () => {
            this.isConnected = false;
            this.emit(WebsocketEvent_1.WebsocketEvent.ON_CLOSED);
        };
        wss.onerror = (errorMessage) => {
            this.isConnected = false;
            this.emit(WebsocketEvent_1.WebsocketEvent.ON_ERROR, errorMessage.toString());
        };
        wss.onmessage = (data) => {
            this.parseWsMessage(data.data);
        };
        return new Promise((resolve, reject) => {
            wss.onopen = () => {
                this.isConnected = true;
                this.emit(WebsocketEvent_1.WebsocketEvent.ON_OPEN);
                return resolve();
            };
        });
    }
    checkNextHeartbeat() {
        clearTimeout(this.pingTimeout);
        // We Use `WebSocket#terminate()`, which immediately destroys the connection,
        // Delay should be equal to the interval at which your server
        // sends out pings plus a conservative assumption of the latency.
        // Here we don't need to check for bufferedAmounts the connection is obviously stale
        this.pingTimeout = setTimeout(() => {
            this.wss.terminate();
        }, 30000 + this.clientConfig.pingTimeoutMs);
    }
}
exports.WsBaseClient = WsBaseClient;
//# sourceMappingURL=WsBaseClient.js.map