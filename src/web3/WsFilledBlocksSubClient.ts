import { IBlockHeaderInfo } from "../interfaces/IBlockcliqueBlockBySlot";
import { ISubscribeNewBlocksMessage } from "../interfaces/ISubscribeNewBlocksMessage";
import { IWsClientConfig } from "../interfaces/IWsClientConfig";
import { WS_RPC_REQUEST_METHOD } from "../interfaces/WsRpcMethods";
import { BaseWsClient, bin2String } from "./BaseWsClient";

/** Public Ws Client for interacting with the massa network */
export class WsFilledBlocksSubClient extends BaseWsClient {

	private subId: number;
	private onFilledBlockHandler?: (data: ISubscribeNewBlocksMessage) => void;

	public constructor(wsClientConfig: IWsClientConfig, ) {
		super(wsClientConfig);
		this.subscribeFilledBlocks = this.subscribeFilledBlocks.bind(this);
		this.unsubscribeFilledBlocks = this.unsubscribeFilledBlocks.bind(this);
		this.onFilledBlock = this.onFilledBlock.bind(this);
		this.parseWsMessage = this.parseWsMessage.bind(this);
	}

	public onFilledBlock(onFilledBlockHandler?: (data: ISubscribeNewBlocksMessage) => void) {
		if (onFilledBlockHandler) {
			this.onFilledBlockHandler = onFilledBlockHandler;
		}
	}

	public subscribeFilledBlocks(): void {
		if (!((this.wss && this.isConnected))) {
			throw new Error("Websocket Client is not connected");
		}
		this.wss.send(JSON.stringify({
			"jsonrpc": "2.0",
			"id": 1,
			"method": WS_RPC_REQUEST_METHOD.SUBSCRIBE_NEW_FILLED_BLOCKS,
			"params": []
		}));
	}

	public unsubscribeFilledBlocks(): void {
		if (!((this.wss && this.isConnected))) {
			throw new Error("Websocket Client is not connected");
		}
		if (!this.subId) {
			throw new Error("Cannot unsubscribe to filled block as subscription id is missing. Subscribe client first!");
		}
		this.wss.send(JSON.stringify({
			"jsonrpc": "2.0",
			"id": 1,
			"method": WS_RPC_REQUEST_METHOD.UNSUBSCRIBE_NEW_FILLED_BLOCKS,
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
				if (this.onFilledBlockHandler) {
					this.onFilledBlockHandler(parsedMsg["params"]["result"] as ISubscribeNewBlocksMessage);
				}
			}
		} catch (err) {
			console.error(`Error parsing misformed message ${err.message}`);
		}
	}
}
