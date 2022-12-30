import { IWsClientConfig } from "../../src/interfaces/IWsClientConfig";
import { DefaultWsProviderUrls } from "../../src/web3/ClientFactory";
import { WebsocketEvent } from "../../src/interfaces/WebsocketEvent";
import { WsBlockHeadersSubClient } from "../../src/web3/WsBlockHeadersSubClient";

(async () => {

    // create a ws client
    const wsClient: WsBlockHeadersSubClient = new WsBlockHeadersSubClient({
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
    wsClient.onNewBlockHeader((newBlockHeader) => {
        console.log("NEW BLOCK HEADER ", newBlockHeader);
    });

    // connect to ws
    await wsClient.connect();

    // subscribe to new blocks headers
    wsClient.subscribeNewBlockHeaders();

    // unsubscribe after some seconds
    setTimeout(() => {
        console.log("Unsubscribing...");
        wsClient.unsubscribeNewBlockHeaders();
        console.log("Unsubscribed");
    }, 10000);

})();
