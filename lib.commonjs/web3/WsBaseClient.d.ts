/// <reference types="node" />
/// <reference types="node" />
import { IClientConfig } from '../interfaces/IClientConfig';
import { EventEmitter } from 'events';
declare const NodeWebSocket: any;
import { WebSocket as INodeWebSocket } from 'ws';
import { IProvider } from '../interfaces/IProvider';
declare let IINodeWebSocket: typeof INodeWebSocket;
export declare const WS_PING_TIMEOUT_MS = 30000;
export declare const arrayBufferToBase64: (array: Buffer | ArrayBuffer | Buffer[]) => string;
declare global {
    interface Window {
        WebSocket: typeof WebSocket;
        MozWebSocket: typeof MozWebSocket;
    }
}
declare var MozWebSocket: {
    prototype: WebSocket;
    new (url: string): WebSocket;
    new (url: string, prototcol: string): WebSocket;
    new (url: string, prototcol: string[]): WebSocket;
    /**
     * Returns a string that indicates how binary data from the WebSocket object is exposed to scripts:
     *
     * Can be set, to change how binary data is returned. The default is "blob".
     */
    binaryType: BinaryType;
    /**
     * Returns the number of bytes of application data (UTF-8 text and binary data) that have been queued using send() but not yet been transmitted to the network.
     *
     * If the WebSocket connection is closed, this attribute's value will only increase with each call to the send() method. (The number does not reset to zero once the connection closes.)
     */
    readonly bufferedAmount: number;
    /** Returns the extensions selected by the server, if any. */
    readonly extensions: string;
    onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
    onerror: ((this: WebSocket, ev: Event) => any) | null;
    onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
    onopen: ((this: WebSocket, ev: Event) => any) | null;
    /** Returns the subprotocol selected by the server, if any. It can be used in conjunction with the array form of the constructor's second argument to perform subprotocol negotiation. */
    readonly protocol: string;
    /** Returns the state of the WebSocket object's connection. It can have the values described below. */
    readonly readyState: number;
    /** Returns the URL that was used to establish the WebSocket connection. */
    readonly url: string;
    /** Closes the WebSocket connection, optionally using code as the the WebSocket connection close code and reason as the the WebSocket connection close reason. */
    close(code?: number, reason?: string): void;
    /** Transmits data using the WebSocket connection. data can be a string, a Blob, an ArrayBuffer, or an ArrayBufferView. */
    send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
    readonly OPEN: number;
    readonly CLOSING: number;
    readonly CONNECTING: number;
    readonly CLOSED: number;
    addEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
    addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
    removeEventListener<K extends keyof WebSocketEventMap>(type: K, listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
    removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
};
export declare const checkForBrowserWs: () => {
    isBrowser: boolean;
    Ws: typeof WebSocket | typeof MozWebSocket;
};
/** Base Ws Client for interacting with the massa network */
export declare abstract class WsBaseClient extends EventEmitter {
    protected clientConfig: IClientConfig;
    protected wss: typeof WebSocket | typeof MozWebSocket | typeof NodeWebSocket | typeof IINodeWebSocket | null | undefined;
    protected isConnected: boolean;
    protected isBrowserWs: boolean;
    private pingTimeout;
    constructor(clientConfig: IClientConfig);
    /** set new providers */
    setProviders(providers: Array<IProvider>): void;
    /** return all ws providers */
    protected getWsProviders(): Array<IProvider>;
    protected abstract parseWsMessage(message: string | Buffer | ArrayBuffer | Buffer[]): void;
    connect(): Promise<void>;
    getReadyState(): number | null;
    getBinaryType(): string | null;
    getUrl(): string | null;
    getProtocol(): string | null;
    getExtensions(): object | null;
    getBufferedAmount(): number | null;
    closeConnection(): boolean;
    private connectNodeWs;
    private connectBrowserWs;
    private checkNextHeartbeat;
}
export {};
