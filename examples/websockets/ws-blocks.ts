/* eslint-disable @typescript-eslint/no-var-requires */
import { WsSubscriptionClient } from '../../src/web3/WsSubscriptionClient';
import { ClientFactory } from '../../src/web3/ClientFactory';
import { WebsocketEvent } from '../../src/interfaces/WebsocketEvent';
import { ISubscribeNewBlocksMessage } from '../../src/interfaces/ISubscribeNewBlocksMessage';
import { WalletClient } from '../../src/web3/WalletClient';
import { IAccount } from '../../src/interfaces/IAccount';
import * as dotenv from 'dotenv';
import { Client } from '../../src/web3/Client';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

const publicApi = process.env.JSON_RPC_URL_PUBLIC;
if (!publicApi) {
  throw new Error('Missing JSON_RPC_URL_PUBLIC in .env file');
}
const privateApi = process.env.JSON_RPC_URL_PRIVATE;
if (!privateApi) {
  throw new Error('Missing JSON_RPC_URL_PRIVATE in .env file');
}
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
if (!deployerPrivateKey) {
  throw new Error('Missing DEPLOYER_PRIVATE_KEY in .env file');
}

(async () => {
  // create a web3 client
  const deployerAccount: IAccount = await WalletClient.getAccountFromSecretKey(
    deployerPrivateKey,
  );
  const web3Client: Client = await ClientFactory.createCustomClient(
    [
      { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
      { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
    ],
    true,
    deployerAccount,
  );
  const wsSubClient: WsSubscriptionClient | null = web3Client.ws();

  // bind various methods for handling common socket events
  if (wsSubClient) {
    wsSubClient.on(WebsocketEvent.ON_CLOSED, () => {
      console.log('>>>>>>>>>>> Ws Closed');
    });

    wsSubClient.on(WebsocketEvent.ON_CLOSING, () => {
      console.log('>>>>>>>>>>> Ws Closing');
    });

    wsSubClient.on(WebsocketEvent.ON_CONNECTING, () => {
      console.log('>>>>>>>>>>> Ws Connecting');
    });

    wsSubClient.on(WebsocketEvent.ON_OPEN, () => {
      console.log('>>>>>>>>>>> Ws Open');
    });

    wsSubClient.on(WebsocketEvent.ON_PING, () => {
      console.log('>>>>>>>>>>> Ws Ping');
    });

    wsSubClient.on(WebsocketEvent.ON_ERROR, (errorMessage) => {
      console.error('>>>>>>>>>>> Ws Error', errorMessage);
    });

    // connect to ws
    await wsSubClient.connect();

    // subscribe to new blocks
    wsSubClient.subscribeNewBlocks((newBlock) => {
      console.log(
        '>>>>>>>>>>> New Block Received \n',
        newBlock as ISubscribeNewBlocksMessage,
      );
    });

    // unsubscribe after some seconds
    setTimeout(() => {
      console.log('Unsubscribing...');
      wsSubClient.unsubscribeNewBlocks();
      console.log('Unsubscribed');
    }, 60000);
  }
})();
