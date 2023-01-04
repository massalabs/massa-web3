import { WsSubscriptionClient } from "../../src/web3/WsSubscriptionClient";
import { ClientFactory, DefaultProviderUrls } from "../../src/web3/ClientFactory";
import { WebsocketEvent } from "../../src/interfaces/WebsocketEvent";
import { WalletClient } from "../../src/web3/WalletClient";
import { IAccount } from "../../src/interfaces/IAccount";
import { ISubscribeNewBlocksMessage } from "../../src/interfaces/ISubscribeNewBlocksMessage";

const DEPLOYER_SECRET_KEY = "S1PNNeC922hHaveiosug8GzLidmbfHeu57GnUZsXcbtQm5Gfdfy";

(async () => {

    // create a web3 client
    const deployerAccount: IAccount = await WalletClient.getAccountFromSecretKey(DEPLOYER_SECRET_KEY);
    const web3Client = await ClientFactory.createDefaultClient(DefaultProviderUrls.LABNET, true, deployerAccount);
    const wsSubClient: WsSubscriptionClient|null = web3Client.ws();

    // bind various methods for handling common socket events
    if (wsSubClient) {
        wsSubClient.on(WebsocketEvent.ON_CLOSED, () => {
            console.log(">>>>>>>>>>> Ws Closed");
        });

        wsSubClient.on(WebsocketEvent.ON_CLOSING, () => {
            console.log(">>>>>>>>>>> Ws Closing");
        });

        wsSubClient.on(WebsocketEvent.ON_CONNECTING, () => {
            console.log(">>>>>>>>>>> Ws Connecting");
        });

        wsSubClient.on(WebsocketEvent.ON_OPEN, () => {
            console.log(">>>>>>>>>>> Ws Open");
        });

        wsSubClient.on(WebsocketEvent.ON_PING, () => {
            console.log(">>>>>>>>>>> Ws Ping");
        });

        wsSubClient.on(WebsocketEvent.ON_ERROR, (errorMessage) => {
            console.error(">>>>>>>>>>> Ws Error", errorMessage);
        });

        // connect to ws
        await wsSubClient.connect();

        // subscribe to new blocks
        wsSubClient.subscribeFilledBlocks((newFilledBlock) => {
            console.log(">>>>>>>>>>> New Block Header Received \n", newFilledBlock as ISubscribeNewBlocksMessage);
        });

        // unsubscribe after some seconds
        setTimeout(() => {
            console.log("Unsubscribing...");
            wsSubClient.unsubscribeFilledBlocks();
            console.log("Unsubscribed");
        }, 10000);
    }
})();
