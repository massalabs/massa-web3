import { IWsClientConfig } from "../interfaces/IWsClientConfig";
import { EventEmitter } from "events";
import { WebsocketEvent } from "../interfaces/WebsocketEvent";
const NodeWebSocket = require("ws");

export const bin2String = (array: Buffer | ArrayBuffer): string => {
    return String.fromCharCode.apply(String, array);
};

declare global {
	interface Window {
		WebSocket: any;
		MozWebSocket: any;
   }
}

declare var MozWebSocket: {
    prototype: WebSocket;
    new (url: string): WebSocket;
    new (url: string, prototcol: string): WebSocket;
    new (url: string, prototcol: string[]): WebSocket;
    OPEN: number;
    CLOSING: number;
    CONNECTING: number;
    CLOSED: number;
}


export const checkForBrowserWs = (): {isBrowser: boolean, ws: any}  => {
	let ws: Object | null | undefined = null;
	if (typeof WebSocket !== 'undefined') {
		ws = WebSocket
	} else if (typeof MozWebSocket !== 'undefined') {
		ws = MozWebSocket
	} else if (typeof global !== 'undefined') {
		ws = global.WebSocket || global.MozWebSocket
	} else if (typeof window !== 'undefined') {
		ws = window.WebSocket || window.MozWebSocket
	} else if (typeof self !== 'undefined') {
		ws = self.WebSocket || self.MozWebSocket
	}
	return {
		isBrowser: ws !== null && ws !== undefined,
		ws
	};
}

/** Base Ws Client for interacting with the massa network */
export abstract class BaseWsClient extends EventEmitter {

	protected wss: any;
	protected isConnected: boolean = false;
	protected isBrowserWs: boolean = false;
	private pingTimeout: NodeJS.Timer;

	public constructor(protected wsClientConfig: IWsClientConfig) {
		super();
		this.connect = this.connect.bind(this);
		this.connectNodeWs = this.connectNodeWs.bind(this);
		this.connectBrowserWs = this.connectBrowserWs.bind(this);
		this.checkNextHeartbeat = this.checkNextHeartbeat.bind(this);
	}

	protected abstract parseWsMessage(message: any): void;

	public async connect(): Promise<void> {
		const browserWs = checkForBrowserWs();
		this.wss = browserWs.isBrowser ? new browserWs.ws(this.wsClientConfig.connectionUrl) : 
		new NodeWebSocket(this.wsClientConfig.connectionUrl, {
			perMessageDeflate: false
		});
		this.isBrowserWs = browserWs.isBrowser;
		return browserWs.isBrowser ? this.connectBrowserWs() : this.connectNodeWs();
	}

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

	private connectBrowserWs(): Promise<void> {
		this.wss.onclose = () => {
			this.isConnected = false;
			this.emit(WebsocketEvent.ON_CLOSED);
		};

		this.wss.onerror = (errorMessage) => {
			this.isConnected = false;
			this.emit(WebsocketEvent.ON_ERROR, errorMessage.toString());
		};

		this.wss.onmessage = (data) => {
			this.parseWsMessage(data);
		};

		return new Promise<void>((resolve, reject) => {
			this.wss.onopen = () => {
				this.isConnected = true;
				this.emit(WebsocketEvent.ON_OPEN);
				return resolve();
			};
		});
	}

	private checkNextHeartbeat() {
		clearTimeout(this.pingTimeout);

		// We Use `WebSocket#terminate()`, which immediately destroys the connection,
		// Delay should be equal to the interval at which your server
		// sends out pings plus a conservative assumption of the latency.
		this.pingTimeout = setTimeout(() => {
		  this.wss.terminate();
		}, 30000 + this.wsClientConfig.pingTimeoutMs);
	  }
}
