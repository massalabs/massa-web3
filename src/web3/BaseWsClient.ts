import { IWsClientConfig } from "../interfaces/IWsClientConfig";
import { EventEmitter } from "events";
import { WebsocketEvent } from "../interfaces/WebsocketEvent";
const IsoWebSocket = require("isomorphic-ws");

export const bin2String = (array: Buffer | ArrayBuffer): string => {
    return String.fromCharCode.apply(String, array);
};

/** Base Ws Client for interacting with the massa network */
export abstract class BaseWsClient extends EventEmitter {

	protected wss: typeof IsoWebSocket;
	protected isConnected: boolean = false;
	private pingTimeout: NodeJS.Timer;

	public constructor(protected wsClientConfig: IWsClientConfig) {
		super();
	}

	protected abstract parseWsMessage(message: any): void;

	public async connect(): Promise<void> {

		this.wss = new IsoWebSocket(this.wsClientConfig.connectionUrl, {
			perMessageDeflate: false
		});

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
