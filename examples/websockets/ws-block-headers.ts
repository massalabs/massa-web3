import { IWsClientConfig } from "../../src/interfaces/IWsClientConfig";
import { DefaultWsProviderUrls } from "../../src/web3/ClientFactory";
import { WebsocketEvent } from "../../src/interfaces/WebsocketEvent";
import { WsSubscriptionClient } from "../../src/web3/WsSubscriptionClient";
import { IBlockHeaderInfo } from "../../src/interfaces/IBlockcliqueBlockBySlot";

(async () => {

    // create a ws client
    const wsClient: WsSubscriptionClient = new WsSubscriptionClient({
        connectionUrl: DefaultWsProviderUrls.LABNET,
        pingTimeoutMs: 10000
    } as IWsClientConfig);

    // bind various methods for handling common socket events
    wsClient.on(WebsocketEvent.ON_CLOSED, () => {
        console.log(">>>>>>>>>>> Ws Closed");
    });

    wsClient.on(WebsocketEvent.ON_CLOSING, () => {
        console.log(">>>>>>>>>>> Ws Closing");
    });

    wsClient.on(WebsocketEvent.ON_CONNECTING, () => {
        console.log(">>>>>>>>>>> Ws Connecting");
    });

    wsClient.on(WebsocketEvent.ON_OPEN, () => {
        console.log(">>>>>>>>>>> Ws Open");
    });

    wsClient.on(WebsocketEvent.ON_PING, () => {
        console.log(">>>>>>>>>>> Ws Ping");
    });

    wsClient.on(WebsocketEvent.ON_ERROR, (errorMessage) => {
        console.error(">>>>>>>>>>> Ws Error", errorMessage);
    });

    // connect to ws
    await wsClient.connect();

    // subscribe to new blocks headers
    wsClient.subscribeNewBlockHeaders((newBlockHeader) => {
        console.log(">>>>>>>>>>> New Block Header Received \n", newBlockHeader as IBlockHeaderInfo);
    });

    // unsubscribe after some seconds
    setTimeout(() => {
        console.log("Unsubscribing...");
        wsClient.unsubscribeNewBlockHeaders();
        console.log("Unsubscribed");
    }, 60000);
})();
