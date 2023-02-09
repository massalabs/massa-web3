# massa-web3 ![Node CI](https://github.com/massalabs/massa-web3/workflows/Node.js%20CI/badge.svg)

`Massa-web3` is a TypeScript library that allow you to interact with the `Massa` blockchain through a
local or remote Massa node. In particular the massa-web3 library will allow you to call the JSON-RPC API,
but also to fetch and poll events from smart contracts on the Massa blockchain, deploy smart contracts and much more.

## Usage

`Massa-web3` could be used as a library for frameworks or as a stand-alone bundled js file which can be easily loaded into the browser.

### Library (Node.js/React/Vue.js) usage

> npm install @massalabs/massa-web3

### Browser usage

Add the following script to your html file:

```ts
<script type='text/javascript' src="https://cdn.jsdelivr.net/npm/@massalabs/massa-web3@x.x.x/bundle.js"></script>
```

whereby the x.x.x is one of the available released versions under
[Massa-web3's releases page](https://github.com/massalabs/massa-web3/releases):

In your code, once the script is fully loaded, just use `window.massa` to access all `massa-web3` exports.

```ts
<script>
    console.log("Massa Web3 ", window.massa);
</script>
```

### Requirements

-   NodeJS 14+
-   npm / yarn (see package.json)
### Web3 Client initialization

There are two types of client initialization. The first one is connecting to Massa's public rpc node using a so-called default client. Please note that specifying a base account is only optional at this point. The code below illustrates how to do that:

```ts
import {
    ClientFactory,
    Client,
    DefaultProviderUrls,
    IAccount
} from "@massalabs/massa-web3";

// create a base account for signing transactions
const baseAccount = {
  address: 'A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1',
  secretKey: 'S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L',
  publicKey: 'P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR'
} as IAccount;

// initialize a testnet client
const testnetClient: Client = await ClientFactory.createDefaultClient(
    DefaultProviderUrls.TESTNET,
    true,
    baseAccount
);
```

The second way is to create a custom client connecting to a node whose ip and ports are to be specified by the user.

```ts
import {
    ClientFactory,
    Client,
    IAccount,
    IProvider,
    ProviderType 
} from "@massalabs/massa-web3";

// create a base account for signing transactions
const baseAccount = {
  address: 'A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1',
  secretKey: 'S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L',
  publicKey: 'P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR'
} as IAccount;

// initialize a custom client using an own provider
const providers: Array<IProvider> = [
    {
        url: "http://127.0.0.1:33035",
        type: ProviderType.PUBLIC
    } as IProvider,
    {
        url: "http://127.0.0.1:33034",
        type: ProviderType.PRIVATE
    } as IProvider
];

const customClient: Client = await ClientFactory.createCustomClient(
    providers,
    true,
    baseAccount
);
```

Please note that connecting to a locally running node could be easily done using the factory method:

```ts
const testnetClient: Client = await ClientFactory.createDefaultClient(
    DefaultProviderUrls.LOCALNET,
    true,
    baseAccount
);
```

Once there is an initialized client instance, it is straightforward to call methods on it:

```ts
import { IStatus, IAddressInfo } from "@massalabs/massa-web3";

const addressesResp: Array<IAddressInfo> = await web3Client
    .publicApi()
    .getAddresses(["some_address"]);
```

### Client exposed APIs

The client exposes several APIs which could be used on its own (also initialized as stand-alone) if one needs to:

```ts
web3Client.publicApi()      -> sub-client for public api                    (interface: PublicApiClient)
web3Client.privateApi()     -> sub-client for private api                   (interface: PrivateApiClient)
web3Client.wallet()         -> sub-client for wallet-related operations     (interface: WalletClient)
web3Client.smartContracts() -> sub-client for smart contracts interaction   (interface: SmartContractsClient)
web3Client.ws()             -> sub-client for websockets                    (interface: WsSubscriptionClient)
web3Client.vault()          -> sub-client for vault interaction [mainly used by massa-wallet] (interface: VaultClient)

```

### Client public API

Client public API operations are accessible under the public sub-client, which is accessible via the `publicApi()` method on the client.

Example:

```ts
// get block info
const blocks: Array<IBlockInfo> = await web3Client
    .publicApi()
    .getBlocks(["q2XVw4HrRfwtX8FGXak2VwtTNkBvYtLVW67s8pTCVPdEEeG6J"]);
```

Available methods are:

-   `getNodeStatus`
    ```ts
    const nodeStatus: INodeStatus = await web3Client
        .publicApi()
        .getNodeStatus();
    ```
-   `getAddresses`
    ```ts
    const addressesResp: Array<IAddressInfo> = await web3Client
        .publicApi()
        .getAddresses(["A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1"]);
    ```
-   `getBlocks`
    ```ts
    const blocks: Array<IBlockInfo> = await web3Client
        .publicApi()
        .getBlocks(["nKifcnGbd9zu8nu1hb94XEmMGwgoWbjj3DutzrobeHDdUtEuM"]);
    ```
-   `getEndorsements`
    ```ts
    const endorsements: Array<IEndorsement> = await web3Client
        .publicApi()
        .getEndorsements(["q2XVw4HrRfwtX8FGXak2VwtTNkBvYtLVW67s8pTCVPdEEeG6J"]);
    ```
-   `getOperations`
    ```ts
    const operations: Array<IOperationData> = await web3Client
        .publicApi()
        .getOperations(["z1cNsWAdgvoASq5RnN6MRbqqo634RRJbgwV9n3jNx3rQrQKTt"]);
    ```
-   `getCliques`
    ```ts
    const cliques: Array<IClique> = await web3Client.publicApi().getCliques();
    ```
-   `getStakers`
    ```ts
    const stakers: Array<IStakingAddresses> = await web3Client
        .publicApi()
        .getStakers();
    ```
-   `getDatastoreEntries`
    ```ts
    const datastoreEntries: Array<IContractStorageData> = await web3Client
        .publicApi()
        .getDatastoreEntries([{ address: smartContractAddress, key: "some_key" } as IDatastoreEntry]);
    ```
-   `getBlockcliqueBlockBySlot`
```ts
const blockcliqueBlockBySlot: IBlockcliqueBlockBySlot = await web3Client
    .publicApi()
    .getBlockcliqueBlockBySlot([{ period: 12345, thread: 20 } as ISlot]);
```
-   `getGraphInterval`
```ts
const graphInterval: IGraphInterval = await web3Client
    .publicApi()
    .getGraphInterval([{ start: Date.now() - 2000, end: Date.now() } as IGetGraphInterval]);
```

### Client private API

Client private API operations are accessible under the private sub-client, which is accessible via the `privateApi()` method on the client.

Example:

```ts
// stop the node
await web3Client.privateApi().nodeStop();
```

Available methods are:

-   `stopNode`
    ```ts
    await web3Client.privateApi().nodeStop();
    ```
-   `nodeBanById`
    ```ts
    await web3Client.privateApi().nodeBanById("P1bZhWZQ2KW8DoaEqXyRXoy198wjhCsTFxSP53mLgdvx5C4WMDE");
    ```
-   `nodeBanByIpAddress`
    ```ts
    await web3Client.privateApi().nodeBanByIpAddress("90.110.239.231");
    ```
-   `nodeUnbanById`
    ```ts
    await web3Client.privateApi().nodeUnbanById("P1bZhWZQ2KW8DoaEqXyRXoy198wjhCsTFxSP53mLgdvx5C4WMDE");
    ```
-   `nodeUnbanByIpAddress`
    ```ts
    await web3Client.privateApi().nodeUnbanByIpAddress("90.110.239.231");
    ```
-   `nodeGetStakingAddresses`
    ```ts
    const stakingAddresses = await web3Client
        .privateApi()
        .nodeGetStakingAddresses();
    ```
-   `nodeRemoveStakingAddresses`
    ```ts
    await web3Client
        .privateApi()
        .nodeRemoveStakingAddresses([
            "A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
        ]);
    ```
-   `nodeAddStakingPrivateKeys`
    ```ts
    await web3Client
        .privateApi()
        .nodeAddStakingSecretKeys([
            "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
        ]);
    ```
-   `nodeSignMessage`
    ```ts
    const message = "hello world";
    const msgBuf = new TextEncoder().encode(message);
    const signedMessage = await web3Client.privateApi().nodeSignMessage(msgBuf);
    ```
-   `nodeAddToPeersWhitelist`
    ```ts
    await web3Client.privateApi().nodeAddToPeersWhitelist("90.110.239.231");
    ```
-   `nodeRemoveFromWhitelist`
    ```ts
    await web3Client.privateApi().nodeRemoveFromWhitelist("90.110.239.231");
    ```

### Websockets API

Websocket subscriptions are accessible under the websockets client, which is accessible via the `ws()` method on the web3 client. The massa-web3 library provides a convenient wrapper around browser and NodeJS compatible websockets client implementation.

Example:

```ts
    import { WebsocketEvent } from "@massalabs/massa-web3";
    // get the websockets client
    const wsClient = web3Client.ws();

    // bind various methods for handling common socket events
    wsClient.on(WebsocketEvent.ON_CLOSED, () => {
        console.log("ws closed");
    });

    wsClient.on(WebsocketEvent.ON_CLOSING, () => {
        console.log("ws closing");
    });

    wsClient.on(WebsocketEvent.ON_CONNECTING, () => {
        console.log("ws connecting");
    });

    wsClient.on(WebsocketEvent.ON_OPEN, () => {
        console.log("ws open");
    });

    wsClient.on(WebsocketEvent.ON_PING, () => {
        console.log("ws ping");
    });

    wsClient.on(WebsocketEvent.ON_ERROR, (errorMessage) => {
        console.error("ws error", errorMessage);
    });

    // connect to ws
    await wsClient.connect();

    // subscribe to new blocks
    wsClient.subscribeNewBlocks((newBlock) => {
        console.log("New Block Received", newBlock);
    });
```

Available common methods are:

-   `connect`
    ```ts
    await wsClient.connect();
    ```
-   `getBinaryType`
    ```ts
    wsClient.getBinaryType();
-   `getBufferedAmount`
    ```ts
    wsClient.getBufferedAmount();
    ```
-   `getExtensions`
    ```ts
    wsClient.getExtensions();
    ```
-   `getProtocol`
    ```ts
    wsClient.getProtocol();
    ```
-   `getReadyState`
    ```ts
    wsClient.getReadyState();
    ```
-   `getUrl`
    ```ts
    wsClient.getUrl();
    ```
-   `closeConnection`
    ```ts
    wsClient.closeConnection();
    ```

The following events are available to listen to:

    ```ts
        wsSubClient.on(WebsocketEvent.ON_CLOSED, () => { ... });

        wsSubClient.on(WebsocketEvent.ON_CLOSING, () => { ... });

        wsSubClient.on(WebsocketEvent.ON_CONNECTING, () => { ... });

        wsSubClient.on(WebsocketEvent.ON_OPEN, () => { ... });

        wsSubClient.on(WebsocketEvent.ON_PING, () => { ... });

        wsSubClient.on(WebsocketEvent.ON_ERROR, (errorMessage) => { ... });
    ```

The following subscription methods are available:

```ts
    import { WebsocketEvent } from "@massalabs/massa-web3";
    // get the websockets client
    const wsClient = web3Client.ws();

    // subscribe to new blocks
    wsSubClient.subscribeNewBlocks((newBlock) => {
        console.log("New Block Received \n", newBlock as ISubscribeNewBlocksMessage);
    });

    // unsubscribe to new blocks
    wsSubClient.unsubscribeNewBlocks();

    // subscribe to new blocks headers
    wsSubClient.subscribeNewBlockHeaders((newBlockHeader) => {
        console.log("New Block Header Received \n", newBlockHeader as IBlockHeaderInfo);
    });

    // unsubscribe to new blocks headers
    wsSubClient.unsubscribeNewBlockHeaders();

    // subscribe to new blocks
    wsSubClient.subscribeFilledBlocks((newFilledBlock) => {
        console.log("New Filled Block Received \n", newFilledBlock as ISubscribeNewBlocksMessage);
    });

    // unsubscribe to filled blocks
    wsSubClient.unsubscribeFilledBlocks();
```

The underlying NodeJS websockets client API can be found here: [NodeJS Websockets API](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket) and for the web browser: [Browser Websockets API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket). The Massa Websockets Client is compatible with all currently available browsers.


### Wallet operations

Wallet operations are accessible under the wallet sub-client which is accessible via the wallet() method on the client.

Example:

```ts
// generate new wallet
const newWalletAccount = await WalletClient.walletGenerateNewAccount();
```

Available class methods are:

-   `addPrivateKeysToWallet`
    ```ts
    const addedAccounts: Array<IAccount> = await web3Client
        .wallet()
        .addSecretKeysToWallet([
            "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
        ]);
    ```
-   `removeAddressesFromWallet`
    ```ts
    web3Client
        .wallet()
        .removeAddressesFromWallet([
            "A12rr1neHvp7uzGepfPRPguZX5JWC3EFW6H7ZQRazzNjBRMNvQB",
        ]);
    ```
-   `getWalletAccounts`
    ```ts
    const walletAccounts: Array<IAccount> = web3Client.wallet().getWalletAccounts();
    ```
-   `getWalletAccountByAddress`
    ```ts
    const walletAccount: IAccount | undefined = web3Client
        .wallet()
        .getWalletAccountByAddress(
            "A12rr1neHvp7uzGepfPRPguZX5JWC3EFW6H7ZQRazzNjBRMNvQB"
        );
    ```
-   `addAccountsToWallet`
    ```ts
    await web3Client.wallet().addAccountsToWallet([
        {
            address: 'A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1',
            secretKey: 'S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L',
            publicKey: 'P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR'
        },
    ]);
    ```
-   `walletInfo`
    ```ts
    const walletInfo: Array<IFullAddressInfo> = await web3Client
        .wallet()
        .walletInfo();
    ```
-   `sendTransaction`
    ```ts
    const sendTxIds: Array<string> = await web3Client.wallet().sendTransaction(
        {
            fee: 0, // int
            amount: "1", //MAS
            recipientAddress:
                "A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
        } as ITransactionData,
        baseAccount
    );
    ```
-   `buyRolls`
    ```ts
    const buyRollsIds: Array<string> = await web3Client.wallet().buyRolls(
        {
            fee: 0, // int
            amount: 1, //ROLLS
        } as IRollsData,
        baseAccount
    );
    ```
-   `sellRolls`
    ```ts
    const sellRollsIds: Array<string> = await web3Client.wallet().sellRolls(
        {
            fee: 0, // int
            amount: 1, //ROLLS
        } as IRollsData,
        baseAccount
    );
    ```
-   `getAccountBalance`
    ```ts
    const balance: IBalance = await web3Client.wallet().getAccountBalance("A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1");
    ```

In addition to the class methods, there are also static methods for direct use:

-   `getAccountFromPrivateKey`
    ```ts
    const account: IAccount = await WalletClient.getAccountFromSecretKey("S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L");
    ```
-   `walletGenerateNewAccount`
    ```ts
    const newWalletAccount: IAccount = await WalletClient.walletGenerateNewAccount();
    ```
-   `walletSignMessage`
    ```ts
    const sig: ISignature = await WalletClient.walletSignMessage("hello", baseAccount);
    ```

### Smart contract deployment

Once the smart contract WASM is available, it becomes quite straightforward to deploy a smart contract operation (a state changing operation):

```ts
// deploy smart contract
const opId: string = await web3Client.smartContracts().deploySmartContract(
    {
        fee: 0,
        maxGas: 2000000,
        contractDataBinary: compiledScFromSource.binary,
        datastore: new Map<Uint8Array, Uint8Array>()
    } as IContractData,
    baseAccount
);
```
The compiledScFromSource is the compiled smart contract code in binary form. The returned value is the resulting operation id.

### Smart contract event fetching and polling

Emitted smart contract events could directly be fetched via:

```ts
const eventsFilter = {
    start: null,
    end: null,
    original_caller_address:
        "A12rr1neHvp7uzGepfPRPguZX5JWC3EFW6H7ZQRazzNjBRMNvQB",
    original_operation_id: null,
    emitter_address: null,
} as IEventFilter;

const filteredEvents: Array<IEvent> = await web3Client.smartContracts().getFilteredScOutputEvents(eventFilterData);
```

Events could also be polled. The js sdk has two methods for doing this as shown below. In both, a filter, a web3 client and a poll interval which we can set in order to poll the events needs to be provided:

```ts

const onEventData = (events: Array<IEvent>) => {console.log("Event Data Received:" , events);}
const onEventDataError = (error: Error) => {console.log("Event Data Error:" , error);}

// poll smart contract events
const eventsFilter = {
    start: null,
    end: null,
    original_caller_address: "A12rr1neHvp7uzGepfPRPguZX5JWC3EFW6H7ZQRazzNjBRMNvQB",
    original_operation_id: null,
    emitter_address: null,
    is_final: true,
} as IEventFilter;

const eventPoller = EventPoller.startEventsPolling(
    eventsFilter,
    1000,
    web3Client
);
eventPoller.on(ON_MASSA_EVENT_DATA, onEventData);
eventPoller.on(ON_MASSA_EVENT_ERROR, onEventDataError);

//...do some work...

// cleanup and finish
eventPoller.stopPolling();
```

Alternatively, one could make direct use of callback functions as function arguments which would fire on event data received or generated errors:

```ts
const onEventData = (events: Array<IEvent>) => {console.log("Event Data Received:" , events);}
const onEventDataError = (error: Error) => {console.log("Event Data Error:" , error);}

const eventPoller: EventPoller = EventPoller.startEventsPolling(
    eventsFilter,
    1000,
    web3Client,
    onEventData,
    onEventDataError);

//...do some work...

// cleanup and finish
eventPoller.stopPolling();

```

The latter could easily be employed in smart contracts where we need to e.g. get the contract address. For example, this contract would emit the address at creation:

```ts
import { call, print, create_sc, generate_event } from "massa-sc-std";

export function main(_args: string): i32 {
    ... deploy the smart contract ...
    generateEvent(`Address:${sc_address}`); //emit an event with the address
    ...
}
```
### Smart contract blockchain status

Smart contracts undergo various transaction statuses before they reach block finality on chain. The public enum describing these statuses is:

```ts
EOperationStatus {
	INCLUDED_PENDING,
	AWAITING_INCLUSION,
	FINAL,
	INCONSISTENT,
	NOT_FOUND
}
```

The current smart contract status could be easily obtained via:

```ts
const status: EOperationStatus = await web3Client.smartContracts().getOperationStatus(deploymentOperationId);
```

There are however cases when one would require to await a given status and that could be done via. It is important to note here that the algorithm will giv up after a certain amount of time or a limited error count. These values have proven to be sufficient for most standard cases.

```ts
const status: EOperationStatus = await web3Client.smartContracts().awaitRequiredOperationStatus(deploymentOperationId, EOperationStatus.INCLUDED_PENDING);
```

### Smart contract balance

Smart contract balances could be easily obtained via using the `getContractBalance` method:

```ts
const balance: IBalance|null = await web3Client.smartContracts().getContractBalance(contractAddress);
```

### Smart contract read and write calls

Smart contract data could be read via `readSmartContract` method:

```ts
const data: IContractReadOperationResponse = await web3Client.smartContracts().readSmartContract({
            fee: 0,
            maxGas: 200000,
            targetAddress: scAddress,
            targetFunction: "getGameState",
            parameter: (new Args()).serialize(), // this is based on input arguments
        } as IReadData);
```

The returned data is contained in an object of type IContractReadOperationResponse under the key `returnedValue` which is of type Uint8Array. Depending on the smart contract function implementation, the user is to convert the latter into the expected data type.

Smart contract state-changing operations could be executed via `callSmartContract` method:

```ts
const data: string = await web3Client.smartContracts().callSmartContract({
            fee: 0,
            maxGas: 200000,
            coins: new MassaCoin(0),
            targetAddress: scAddress,
            functionName: "play",
            parameter: (new Args()).serialize(), // this is based on input arguments
        } as ICallData, baseAccount);
```

The returned value is the operation id.

Smart contracts could also be constructed in order to read data from another contract. In that case one could use the code below to read the data via a proxy contract:

```ts
// read smart contract data
const data: IExecuteReadOnlyResponse = await web3Client.smartContracts().executeReadOnlySmartContract(
    {
        fee: 0,
        maxGas: 2000000,
        coins: new MassaCoin(0),
        contractDataBinary: compiledScFromSource.binary,
    } as IContractData,
    baseAccount
);
```

The returned data is contained in an object of type IExecuteReadOnlyResponse under the key `returnedValue` which is of type Uint8Array. Depending on the smart contract function implementation, the user is to convert the latter into the expected data type.

## Contributing and testing

1. Run `npm run install` to install all deps
2. Run `npm run build` to build distribution content
3. Run `npm run test` to run integration and unit tests
