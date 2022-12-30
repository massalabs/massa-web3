import { IWsClientConfig } from "../../src/interfaces/IWsClientConfig";
import { DefaultWsProviderUrls } from "../../src/web3/ClientFactory";
import { WebsocketEvent } from "../../src/interfaces/WebsocketEvent";
import { WsFilledBlocksSubClient } from "../../src/web3/WsFilledBlocksSubClient";

(async () => {

    // create a ws client
    const wsClient: WsFilledBlocksSubClient = new WsFilledBlocksSubClient({
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

    // provide a callback function
    wsClient.onFilledBlock((filledBlock) => {
        console.log("FILLED BLOCK ", filledBlock);
    });

    // connect to ws
    await wsClient.connect();

    // subscribe to new blocks headers
    wsClient.subscribeFilledBlocks();

    // unsubscribe after some seconds
    setTimeout(() => {
        console.log("Unsubscribing...");
        wsClient.unsubscribeFilledBlocks();
        console.log("Unsubscribed");
    }, 10000);

})();
