import { ISubscribeNewBlocksMessage } from "../interfaces/ISubscribeNewBlocksMessage";
import { IWsClientConfig } from "../interfaces/IWsClientConfig";
import { WebsocketStatus } from "../interfaces/WebsocketStatus";
import { WS_RPC_REQUEST_METHOD } from "../interfaces/WsRpcMethods";
import { BaseWsClient, bin2String } from "./BaseWsClient";

/** Public Ws Client for interacting with the massa network */
export class WsBlockSubClient extends BaseWsClient {

	private subId: number;

	public constructor(wsClientConfig: IWsClientConfig) {
		super(wsClientConfig);
	}

	public subscribeNewBlocks(onNewBlockHandler?: (data: ISubscribeNewBlocksMessage) => void): void {
		if (!((this.wss && this.isConnected))) {
			throw new Error("Websocket Client is not connected");
		}
		this.wss.on(WebsocketStatus.ON_MESSAGE, (data) => {
			const messageStr = bin2String(data);
			let parsedMsg: Object = null;
			try {
				parsedMsg = JSON.parse(messageStr);
				if (parsedMsg["result"]) {
					this.subId = parseInt(parsedMsg["result"]);
				}
				if (parsedMsg["params"] && parsedMsg["params"]["result"] && parsedMsg["params"]["subscription"] === this.subId) {
					this.emit(WebsocketStatus.ON_MESSAGE, parsedMsg["params"]["result"] as ISubscribeNewBlocksMessage);
					if (onNewBlockHandler) {
						onNewBlockHandler(parsedMsg["params"]["result"] as ISubscribeNewBlocksMessage);
					}
				}
			} catch (err) {
				console.error(`Error parsing misformed message ${err.message}`);
			}
		});
		this.wss.send(JSON.stringify({
			"jsonrpc": "2.0",
			"id": 1,
			"method": WS_RPC_REQUEST_METHOD.SUBSCRIBE_NEW_BLOCKS,
			"params": []
		}))
	}

	public unsubscribeNewBlocks(): void {
		if (!((this.wss && this.isConnected))) {
			throw new Error("Websocket Client is not connected");
		}
		if (!this.subId) {
			throw new Error("Cannot unsubscribe as subscription id is missing");
		}
		this.wss.send(JSON.stringify({
			"jsonrpc": "2.0",
			"id": 1,
			"method": WS_RPC_REQUEST_METHOD.UNSUBSCRIBE_NEW_BLOCKS,
			"params": [this.subId]
		}))
	}
}
