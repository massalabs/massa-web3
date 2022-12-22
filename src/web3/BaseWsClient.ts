import { IWsClientConfig } from "../interfaces/IWsClientConfig";
import { EventEmitter } from "events";
import { WebsocketStatus } from "../interfaces/WebsocketStatus";
const IsoWebSocket = require('isomorphic-ws');

export const bin2String = (array: Buffer | ArrayBuffer): string => {
    return String.fromCharCode.apply(String, array);
}

/** Base Ws Client for interacting with the massa network */
export class BaseWsClient extends EventEmitter {

	protected wss: typeof IsoWebSocket;
	protected isConnected: boolean = false;
	private pingTimeout: NodeJS.Timer;

	public constructor(protected wsClientConfig: IWsClientConfig) {
		super();
	}

	public async connect(): Promise<void> {

		this.wss = new IsoWebSocket(this.wsClientConfig.connectionUrl, {
			perMessageDeflate: false
		});

		this.wss.on(WebsocketStatus.ON_CLOSED, () => {
			this.isConnected = false;
			this.emit(WebsocketStatus.ON_CLOSED);
		});
	
		this.wss.on(WebsocketStatus.ON_CONNECTING, () => {
			this.emit(WebsocketStatus.ON_CONNECTING);
		});
	
		this.wss.on(WebsocketStatus.ON_CLOSING, () => {
			this.emit(WebsocketStatus.ON_CLOSING);
		});
	
		this.wss.on(WebsocketStatus.ON_PING, () => {
			this.emit(WebsocketStatus.ON_PING);
			this.checkNextHeartbeat();
		});

		return new Promise<void>((resolve, reject) => {
			this.wss.on(WebsocketStatus.ON_OPEN, () => {
				this.isConnected = true;
				this.emit(WebsocketStatus.ON_OPEN);
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
