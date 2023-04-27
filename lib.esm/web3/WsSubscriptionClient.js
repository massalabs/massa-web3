import { WebsocketEvent } from '../interfaces/WebsocketEvent';
import { generateFullRequestName, matchMethodName, WS_RPC_REQUEST_METHOD_BASE, WS_RPC_REQUEST_METHOD_NAME, } from '../interfaces/WsRpcMethods';
import { WsBaseClient, arrayBufferToBase64 } from './WsBaseClient';
/** Public Ws Client for interacting with the massa network */
export class WsSubscriptionClient extends WsBaseClient {
    // subscription ids
    subIds = new Map();
    subMethods = new Map();
    // methods
    onNewBlockHandler;
    onNewBlockHeaderHandler;
    onFilledBlockHandler;
    constructor(clientConfig) {
        super(clientConfig);
        // subscribe to new blocks methods
        this.subscribeNewBlocks = this.subscribeNewBlocks.bind(this);
        this.unsubscribeNewBlocks = this.unsubscribeNewBlocks.bind(this);
        // subscribe to new blocks headers methods
        this.subscribeNewBlockHeaders = this.subscribeNewBlockHeaders.bind(this);
        this.unsubscribeNewBlockHeaders =
            this.unsubscribeNewBlockHeaders.bind(this);
        // subscribe to filled blocks methods
        this.subscribeFilledBlocks = this.subscribeFilledBlocks.bind(this);
        this.unsubscribeFilledBlocks = this.unsubscribeFilledBlocks.bind(this);
        this.parseWsMessage = this.parseWsMessage.bind(this);
    }
    // =========================================================================== //
    subscribeNewBlockHeaders(onNewBlockHeaderHandler) {
        if (!(this.wss && this.isConnected)) {
            throw new Error('Websocket Client is not connected');
        }
        if (this.subMethods.has(WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS)) {
            throw new Error(`Cannot subscribe as there is an already existing subscription with id ${this.subMethods.get(WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS)}`);
        }
        if (onNewBlockHeaderHandler) {
            this.onNewBlockHeaderHandler = onNewBlockHeaderHandler;
        }
        this.wss.send(JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: generateFullRequestName(WS_RPC_REQUEST_METHOD_BASE.SUBSCRIBE, WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS),
            params: [],
        }));
    }
    unsubscribeNewBlockHeaders() {
        if (!(this.wss && this.isConnected)) {
            throw new Error('Websocket Client is not connected');
        }
        if (!this.subMethods.has(WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS)) {
            throw new Error('Cannot unsubscribe to new block headers as subscription id is missing. Subscribe client first!');
        }
        this.wss.send(JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: generateFullRequestName(WS_RPC_REQUEST_METHOD_BASE.UNSUBSCRIBE, WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS),
            params: [
                this.subMethods.get(WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS),
            ],
        }));
    }
    // =========================================================================== //
    subscribeNewBlocks(onNewBlockHandler) {
        if (!(this.wss && this.isConnected)) {
            throw new Error('Websocket Client is not connected');
        }
        if (this.subMethods.has(WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS)) {
            throw new Error(`Cannot subscribe as there is an already existing subscription with id ${this.subMethods.get(WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS)}`);
        }
        if (onNewBlockHandler) {
            this.onNewBlockHandler = onNewBlockHandler;
        }
        this.wss.send(JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: generateFullRequestName(WS_RPC_REQUEST_METHOD_BASE.SUBSCRIBE, WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS),
            params: [],
        }));
    }
    unsubscribeNewBlocks() {
        if (!(this.wss && this.isConnected)) {
            throw new Error('Websocket Client is not connected');
        }
        if (!this.subMethods.has(WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS)) {
            throw new Error('Cannot unsubscribe to new blocks as subscription id is missing. Subscribe client first!');
        }
        this.wss.send(JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: generateFullRequestName(WS_RPC_REQUEST_METHOD_BASE.UNSUBSCRIBE, WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS),
            params: [this.subMethods.get(WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS)],
        }));
    }
    // =========================================================================== //
    subscribeFilledBlocks(onFilledBlockHandler) {
        if (!(this.wss && this.isConnected)) {
            throw new Error('Websocket Client is not connected');
        }
        if (this.subMethods.has(WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS)) {
            throw new Error(`Cannot subscribe as there is an already existing subscription with id ${this.subMethods.get(WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS)}`);
        }
        if (onFilledBlockHandler) {
            this.onFilledBlockHandler = onFilledBlockHandler;
        }
        this.wss.send(JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: generateFullRequestName(WS_RPC_REQUEST_METHOD_BASE.SUBSCRIBE, WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS),
            params: [],
        }));
    }
    unsubscribeFilledBlocks() {
        if (!(this.wss && this.isConnected)) {
            throw new Error('Websocket Client is not connected');
        }
        if (!this.subMethods.has(WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS)) {
            throw new Error('Cannot unsubscribe to new blocks as subscription id is missing. Subscribe client first!');
        }
        this.wss.send(JSON.stringify({
            jsonrpc: '2.0',
            id: 1,
            method: generateFullRequestName(WS_RPC_REQUEST_METHOD_BASE.UNSUBSCRIBE, WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS),
            params: [
                this.subMethods.get(WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS),
            ],
        }));
    }
    // =========================================================================== //
    parseWsMessage(data) {
        // distinguish between browser ws and nodejs buffered ws mode
        let messageStr = '';
        if (this.isBrowserWs && typeof data === 'string') {
            // browser mode (string data)
            messageStr = data;
        }
        else {
            // nodejs mode (binary buffer)
            messageStr = arrayBufferToBase64(data);
        }
        // start parsing the data
        let parsedMsg = null;
        try {
            parsedMsg = JSON.parse(messageStr);
            // first time sub message
            if (parsedMsg['result']) {
                const subId = parseInt(parsedMsg['result'], 10);
                if (isNaN(subId)) {
                    // ignore any non-integer sub ids
                    return;
                }
                if (!this.subIds.has(subId)) {
                    this.subIds.set(subId, WS_RPC_REQUEST_METHOD_NAME.UNKNOWN);
                }
                // check if there is a method name associated with the subId before timeout
                setTimeout(() => {
                    if (this.subIds.get(subId) === WS_RPC_REQUEST_METHOD_NAME.UNKNOWN) {
                        this.emit(WebsocketEvent.ON_ERROR, `Websocket for subscription id ${subId} did not deliver a message withing ${this.clientConfig.pingTimeoutMs} seconds`);
                        this.subIds.delete(subId);
                    }
                }, this.clientConfig.pingTimeoutMs);
            }
            // successive messages
            if (parsedMsg['params'] &&
                parsedMsg['params']['result'] &&
                parsedMsg['params']['subscription']) {
                // get sub id
                const subId = parseInt(parsedMsg['params']['subscription']);
                // get sub method
                switch (matchMethodName(parsedMsg['method'])) {
                    case WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS: {
                        if (this.subIds.has(subId) &&
                            this.subIds.get(subId) !== WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS) {
                            this.subIds.set(subId, matchMethodName(parsedMsg['method']));
                            this.subMethods.set(WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS, subId);
                        }
                        this.onNewBlockHandler(parsedMsg['params']['result']);
                        break;
                    }
                    case WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS: {
                        if (this.subIds.has(subId) &&
                            this.subIds.get(subId) !==
                                WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS) {
                            this.subIds.set(subId, matchMethodName(parsedMsg['method']));
                            this.subMethods.set(WS_RPC_REQUEST_METHOD_NAME.NEW_BLOCKS_HEADERS, subId);
                        }
                        this.onNewBlockHeaderHandler(parsedMsg['params']['result']);
                        break;
                    }
                    case WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS: {
                        if (this.subIds.has(subId) &&
                            this.subIds.get(subId) !==
                                WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS) {
                            this.subIds.set(subId, matchMethodName(parsedMsg['method']));
                            this.subMethods.set(WS_RPC_REQUEST_METHOD_NAME.NEW_FILLED_BLOCKS, subId);
                        }
                        this.onFilledBlockHandler(parsedMsg['params']['result']);
                        break;
                    }
                    default: {
                        console.error(`Message received from unregistered method ${parsedMsg['method']}`);
                    }
                }
            }
        }
        catch (err) {
            console.error(`Error ${err} parsing misformed message ${messageStr}`);
        }
    }
}
//# sourceMappingURL=WsSubscriptionClient.js.map