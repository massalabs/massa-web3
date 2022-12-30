import { IBlockHeaderInfo } from "../interfaces/IBlockcliqueBlockBySlot";
import { IWsClientConfig } from "../interfaces/IWsClientConfig";
import { WS_RPC_REQUEST_METHOD } from "../interfaces/WsRpcMethods";
import { BaseWsClient, bin2String } from "./BaseWsClient";

/** Public Ws Client for interacting with the massa network */
export class WsBlockHeadersSubClient extends BaseWsClient {

	private subId: number;
	private onNewBlockHeaderHandler?: (data: IBlockHeaderInfo) => void;

	public constructor(wsClientConfig: IWsClientConfig, ) {
		super(wsClientConfig);
		this.subscribeNewBlockHeaders = this.subscribeNewBlockHeaders.bind(this);
		this.unsubscribeNewBlockHeaders = this.unsubscribeNewBlockHeaders.bind(this);
		this.onNewBlockHeader = this.onNewBlockHeader.bind(this);
		this.parseWsMessage = this.parseWsMessage.bind(this);
	}

	public onNewBlockHeader(onNewBlockHeaderHandler?: (data: IBlockHeaderInfo) => void) {
		if (onNewBlockHeaderHandler) {
			this.onNewBlockHeaderHandler = onNewBlockHeaderHandler;
		}
	}

	public subscribeNewBlockHeaders(): void {
		if (!((this.wss && this.isConnected))) {
			throw new Error("Websocket Client is not connected");
		}
		this.wss.send(JSON.stringify({
			"jsonrpc": "2.0",
			"id": 1,
			"method": WS_RPC_REQUEST_METHOD.SUBSCRIBE_NEW_BLOCKS_HEADERS,
			"params": []
		}));
	}

	public unsubscribeNewBlockHeaders(): void {
		if (!((this.wss && this.isConnected))) {
			throw new Error("Websocket Client is not connected");
		}
		if (!this.subId) {
			throw new Error("Cannot unsubscribe to block headers as subscription id is missing. Subscribe client first!");
		}
		this.wss.send(JSON.stringify({
			"jsonrpc": "2.0",
			"id": 1,
			"method": WS_RPC_REQUEST_METHOD.UNSUBSCRIBE_NEW_BLOCKS_HEADERS,
			"params": [this.subId]
		}));
	}

	protected parseWsMessage(data: any): void {
		const messageStr = bin2String(data);
		let parsedMsg: Object = null;
		try {
			parsedMsg = JSON.parse(messageStr);
			if (parsedMsg["result"]) {
				this.subId = parseInt(parsedMsg["result"]);
			}
			if (parsedMsg["params"] && parsedMsg["params"]["result"] && parsedMsg["params"]["subscription"] === this.subId) {
				if (this.onNewBlockHeaderHandler) {
					this.onNewBlockHeaderHandler(parsedMsg["params"]["result"] as IBlockHeaderInfo);
				}
			}
		} catch (err) {
			console.error(`Error parsing misformed message ${err.message}`);
		}
	}
}
