import { WsSubscriptionClient } from "../../src/web3/WsSubscriptionClient";
import { IWsClientConfig } from "../../src/interfaces/IWsClientConfig";
import { DefaultWsProviderUrls } from "../../src/web3/ClientFactory";
import { WebsocketEvent } from "../../src/interfaces/WebsocketEvent";
import { ISubscribeNewBlocksMessage } from "../../src/interfaces/ISubscribeNewBlocksMessage";

(async () => {

    // create a ws client
    const wsClient: WsSubscriptionClient = new WsSubscriptionClient({
        connectionUrl: DefaultWsProviderUrls.LABNET,
        pingTimeoutMs: 10000
    } as IWsClientConfig);

    // bind various methods for handling common socket events
    wsClient.on(WebsocketEvent.ON_CLOSED, () => {
        console.log("WS CLOSED");
    });

    wsClient.on(WebsocketEvent.ON_CLOSING, () => {
        console.log("WS CLOSING");
    });

    wsClient.on(WebsocketEvent.ON_CONNECTING, () => {
        console.log("WS CONNECTING");
    });

    wsClient.on(WebsocketEvent.ON_OPEN, () => {
        console.log("WS OPEN");
    });

    wsClient.on(WebsocketEvent.ON_PING, () => {
        console.log("WS PING");
    });

    wsClient.on(WebsocketEvent.ON_ERROR, (errorMessage) => {
        console.error("WS Error", errorMessage);
    });

    // connect to ws
    await wsClient.connect();

    // subscribe to new blocks
    wsClient.subscribeNewBlocks((newBlock) => {
        console.log("NEW BLOCK ", newBlock as ISubscribeNewBlocksMessage);
    });

    // unsubscribe after some seconds
    setTimeout(() => {
        console.log("Unsubscribing...");
        wsClient.unsubscribeNewBlocks();
        console.log("Unsubscribed");
    },
    60000);
})();
