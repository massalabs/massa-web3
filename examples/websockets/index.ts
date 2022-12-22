import { WsBlockSubClient } from "../../src/web3/WsBlockSubClient";
import { IWsClientConfig } from "../../src/interfaces/IWsClientConfig";
import { ClientFactory, DefaultWsProviderUrls } from "../../src/web3/ClientFactory";
import { WebsocketStatus } from "../../src/interfaces/WebsocketStatus";

(async () => {

    const wss = await ClientFactory.createDefaultWsClient(DefaultWsProviderUrls.LOCALNET);

    /*
    const wss = new WsBlockSubClient({
        connectionUrl: "ws://localhost:33036",
        pingTimeoutMs :10000
    })
    */

    wss.on(WebsocketStatus.ON_CLOSED, () => {
        console.log("WS CLOSED");
    });

    wss.on(WebsocketStatus.ON_CLOSING, () => {
        console.log("WS CLOSING");
    });

    wss.on(WebsocketStatus.ON_CONNECTING, () => {
        console.log("WS CONNECTING");
    });

    wss.on(WebsocketStatus.ON_OPEN, () => {
        console.log("WS OPEN");
    });

    wss.on(WebsocketStatus.ON_PING, () => {
        console.log("WS PING");
    });

    await wss.connect();

    wss.subscribeNewBlocks((newBlock) => {
        console.log("NEW BLOCK ", newBlock);
    });

})();
