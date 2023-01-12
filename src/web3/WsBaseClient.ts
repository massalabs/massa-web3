import { IClientConfig } from "../interfaces/IClientConfig";
import { EventEmitter } from "events";
import { WebsocketEvent } from "../interfaces/WebsocketEvent";
import { WebSocket as INodeWebSocket } from "ws";
import { IProvider, ProviderType } from "../interfaces/IProvider";
const NodeWebSocket = require("ws");
let IINodeWebSocket: typeof INodeWebSocket;

const WS_PING_TIMEOUT_MS = 30000;

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

/**
 * Established the type of websocket (browser or nodeJS type)
 * 
 * @returns {@link boolean | typeof WebSocket | typeof MozWebSocket}
 */
export const checkForBrowserWs = (): {isBrowser: boolean, ws: typeof WebSocket | typeof MozWebSocket} => {
  let ws: typeof WebSocket | typeof MozWebSocket | null | undefined = null;
  if (typeof WebSocket !== "undefined") {
    ws = WebSocket;
  } else if (typeof MozWebSocket !== "undefined") {
    ws = MozWebSocket;
  } else if (typeof global !== "undefined") {
    ws = global.WebSocket || global.MozWebSocket;
  } else if (typeof window !== "undefined") {
    ws = window.WebSocket || window.MozWebSocket;
  } else if (typeof self !== "undefined") {
    ws = self.WebSocket || self.MozWebSocket;
  }
  return {
    isBrowser: ws !== null && ws !== undefined,
    ws
  };
};

/** 
 * Base Websocket Client for interacting with the Massa network 
* @virtual
*/
export abstract class WsBaseClient extends EventEmitter {

	/** @protected */
	protected clientConfig: IClientConfig;
	/** @protected */
	protected wss: typeof WebSocket | typeof MozWebSocket | typeof NodeWebSocket | typeof IINodeWebSocket | null | undefined = null;
	/** @protected */
	protected isConnected = false;
	/** @protected */
	protected isBrowserWs = false;
	/** @private */
	private pingTimeout: NodeJS.Timer;

	/**
   * Constructs a new WsBaseClient with a config
   *
   * @param clientConfig - Client Configuration Object.
   * @returns `WsBaseClient` Instance
   */
	public constructor(clientConfig: IClientConfig) {
	  super();
	  this.clientConfig = clientConfig;
	  if (!clientConfig.providers.find((provider) => provider.type === ProviderType.WS)) {
	    throw new Error("No ws provider provided");
	  }
	  this.clientConfig.pingTimeoutMs = this.clientConfig.pingTimeoutMs | WS_PING_TIMEOUT_MS;

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

	/**
   * Sets new providers
   * 
   * @param providers - An array of provider configurations
   */
	public setProviders(providers: Array<IProvider>): void {
	  this.clientConfig.providers = providers;
	}

	/** 
	 * Returns all ws providers
	 * @readonly
	 * @returns Array of websocket providers
	 * */
	protected getWsProviders(): Array<IProvider> {
	  return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.WS);
	}

	/** 
	 * Parses a message received over a websocket
     * @param message - the received websocket message
	 * @virtual
	 * */
	protected abstract parseWsMessage(message: string|Buffer|ArrayBuffer|Buffer[]): void;

	/** 
	 * Asynchronously connects to the websocket server
	 * @public
	 * @returns A promise
	 *  */
	public async connect(): Promise<void> {
	  if (this.wss || this.isConnected) {
	    return;
	  }
	  const browserWs = checkForBrowserWs();
	  const provider: IProvider = this.clientConfig.providers.find((provider) => provider.type === ProviderType.WS);
	  this.wss = browserWs.isBrowser ? new browserWs.ws(provider.url) :
		new NodeWebSocket(provider.url, {
			perMessageDeflate: false,
		});
	  this.isBrowserWs = browserWs.isBrowser;
	  return browserWs.isBrowser ? this.connectBrowserWs() : this.connectNodeWs();
	}

	/** 
	 * Returns the ws ready state
	 * @readonly 
	 * @returns state id as `number` or `null` if no ws initialized
	 * */
	public getReadyState(): number | null {
	  if (this.wss && this.isConnected) {
	    return this.wss.readyState;
	  }
	  return null;
	}

	/** 
	 * Returns the ws data binary type
	 * @readonly 
	 * @returns `string` or `null` if no ws initialized
	 * */
	public getBinaryType(): string | null {
	  if (this.wss && this.isConnected) {
	    return this.wss.binaryType;
	  }
	  return null;
	}

	/** 
	 * Returns the url the websocket is connected to
	 * @readonly 
	 * @returns `string` or `null` if no ws initialized
	 * */
	public getUrl(): string | null {
	  if (this.wss && this.isConnected) {
	    return this.wss.url;
	  }
	  return null;
	}

	/** 
	 * Returns the protocol the websocket is connected over
	 * @readonly 
	 * @returns protocol name (`string`) or `null` if no ws initialized
	 * */
	public getProtocol(): string | null {
	  if (this.wss && this.isConnected) {
	    return this.wss.protocol;
	  }
	  return null;
	}

	/** 
	 * Returns the extensions the websocket connection uses
	 * @readonly 
	 * @returns `Object` with extension key-values or `null` if no ws initialized
	 * */
	public getExtensions(): Object | null {
	  if (this.wss && this.isConnected) {
	    return this.wss.extensions;
	  }
	  return null;
	}

	/** 
	 * Returns the url the websocket is connected to
	 * @readonly 
	 * @returns `number` being the buffered amount in bytes or `null` if no ws initialized
	 * */
	public getBufferedAmount(): number | null {
	  if (this.wss && this.isConnected) {
	    return this.wss.bufferedAmount;
	  }
	  return null;
	}

	/** 
	 * Attempts to close the socket connection.
	 * Works only for fully drained connections.
	 * 
	 * @returns true on success, false on failure
	 * */
	public closeConnection(): boolean {
	  // check for undrained connection
	  if (this.wss && this.isConnected && this.wss.bufferedAmount === 0) {
	    this.wss.close();
	    return true;
	  }
	  return false;
	}

	/** 
	 * Asynchronously connects to the websocket server
	 * This implementation is to be used in NodeJS env
	 * 
	 * @returns A promise
	 *  */
	private connectNodeWs(): Promise<void> {
	  this.wss.on(WebsocketEvent.ON_CLOSED, () => {
	    this.isConnected = false;
	    this.emit(WebsocketEvent.ON_CLOSED);
	  });

	  this.wss.on(WebsocketEvent.ON_CONNECTING, () => {
	    this.emit(WebsocketEvent.ON_CONNECTING);
	  });

	  this.wss.on(WebsocketEvent.ON_CLOSING, () => {
	    this.emit(WebsocketEvent.ON_CLOSING);
	  });

	  this.wss.on(WebsocketEvent.ON_PING, () => {
	    this.emit(WebsocketEvent.ON_PING);
	    this.checkNextHeartbeat();
	  });

	  this.wss.on(WebsocketEvent.ON_MESSAGE, (data) => {
	    this.parseWsMessage(data);
	  });

	  return new Promise<void>((resolve, reject) => {
	    this.wss.on(WebsocketEvent.ON_OPEN, () => {
	      this.isConnected = true;
	      this.emit(WebsocketEvent.ON_OPEN);
	      return resolve();
	    });
	  });
	}

	/** 
	 * Asynchronously connects to the websocket server
	 * This implementation is to be used by browsers
	 * 
	 * @returns A promise
	 *  */
	private connectBrowserWs(): Promise<void> {
	  const wss = this.wss as (WebSocket | typeof MozWebSocket);
	  wss.onclose = () => {
	    this.isConnected = false;
	    this.emit(WebsocketEvent.ON_CLOSED);
	  };

	  wss.onerror = (errorMessage) => {
	    this.isConnected = false;
	    this.emit(WebsocketEvent.ON_ERROR, errorMessage.toString());
	  };

	  wss.onmessage = (data) => {
	    this.parseWsMessage(data.data);
	  };

	  return new Promise<void>((resolve, reject) => {
	    wss.onopen = () => {
	      this.isConnected = true;
	      this.emit(WebsocketEvent.ON_OPEN);
	      return resolve();
	    };
	  });
	}

	/** 
	 * Checks for a heartbeat with a timeout.
	 * Terminates the connection if no heartbeat is returned within the timeout
	 *  */
	private checkNextHeartbeat(): void {
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
