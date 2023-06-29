# massa-web3 ![Node CI](https://github.com/massalabs/massa-web3/workflows/Node.js%20CI/badge.svg)

![check-code-coverage](https://img.shields.io/badge/coverage-59.37%25-red)

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
<script
    type="text/javascript"
    src="https://cdn.jsdelivr.net/npm/@massalabs/massa-web3@x.x.x/bundle.js"
></script>
```

whereby the x.x.x is one of the available released versions under
[Massa-web3's releases page](https://github.com/massalabs/massa-web3/releases):

In your code, once the script is fully loaded, just use `window.massa` to access all `massa-web3` exports.

```ts
<script>console.log("Massa Web3 ", window.massa);</script>
```

### Documentation

Complete documentation of all available web3 entities can be found here:

-   [`massa-web3 documentation`](https://web3.docs.massa.net)

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
    IAccount,
} from "@massalabs/massa-web3";

// create a base account for signing transactions
const baseAccount = {
    address: "AU12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
    secretKey: "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
    publicKey: "P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR",
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
    ProviderType,
} from "@massalabs/massa-web3";

// create a base account for signing transactions
const baseAccount = {
    address: "AU12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
    secretKey: "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
    publicKey: "P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR",
} as IAccount;

// initialize a custom client using an own provider
const providers: Array<IProvider> = [
    {
        url: "http://127.0.0.1:33035",
        type: ProviderType.PUBLIC,
    } as IProvider,
    {
        url: "http://127.0.0.1:33034",
        type: ProviderType.PRIVATE,
    } as IProvider,
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
web3Client.publicApi()          -> sub-client for public api                    (interface: PublicApiClient)
web3Client.privateApi()         -> sub-client for private api                   (interface: PrivateApiClient)
web3Client.wallet()             -> sub-client for wallet-related operations     (interface: WalletClient)
web3Client.smartContracts()     -> sub-client for smart contracts interaction   (interface: SmartContractsClient)

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
        .getAddresses(["AU12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1"]);
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
    const scStorageValue: IDatastoreEntry[] = await web3Client.publicApi().getDatastoreEntries([
      {
        address: "AS12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
        key: strToBytes("key"),
      } as IDatastoreEntryInput,
    ]);

    // NOTE: returned values could be easily converted into string if needed using e.g.: bytesToStr(scStorageValue[0].final_value)
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
    .getGraphInterval([
        { start: Date.now() - 2000, end: Date.now() } as IGetGraphInterval,
    ]);
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
    await web3Client
        .privateApi()
        .nodeBanById("P1bZhWZQ2KW8DoaEqXyRXoy198wjhCsTFxSP53mLgdvx5C4WMDE");
    ```
-   `nodeBanByIpAddress`
    ```ts
    await web3Client.privateApi().nodeBanByIpAddress("90.110.239.231");
    ```
-   `nodeUnbanById`
    ```ts
    await web3Client
        .privateApi()
        .nodeUnbanById("P1bZhWZQ2KW8DoaEqXyRXoy198wjhCsTFxSP53mLgdvx5C4WMDE");
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
            "AU12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
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
            "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
        ]);
    ```
-   `removeAddressesFromWallet`
    ```ts
    web3Client
        .wallet()
        .removeAddressesFromWallet([
            "AU12rr1neHvp7uzGepfPRPguZX5JWC3EFW6H7ZQRazzNjBRMNvQB",
        ]);
    ```
-   `getWalletAccounts`
    ```ts
    const walletAccounts: Array<IAccount> = web3Client
        .wallet()
        .getWalletAccounts();
    ```
-   `getWalletAccountByAddress`
    ```ts
    const walletAccount: IAccount | undefined = web3Client
        .wallet()
        .getWalletAccountByAddress(
            "AU12rr1neHvp7uzGepfPRPguZX5JWC3EFW6H7ZQRazzNjBRMNvQB"
        );
    ```
-   `addAccountsToWallet`
    ```ts
    await web3Client.wallet().addAccountsToWallet([
        {
            address: "AU12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
            secretKey: "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
            publicKey: "P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR",
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
            fee: 0n,
            amount: fromMAS("1"),
            recipientAddress:
                "AU12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
        } as ITransactionData,
        baseAccount
    );
    ```
-   `buyRolls`
    ```ts
    const buyRollsIds: Array<string> = await web3Client.wallet().buyRolls(
        {
            fee: 0n,
            amount: 1n,
        } as IRollsData,
        baseAccount
    );
    ```
-   `sellRolls`
    ```ts
    const sellRollsIds: Array<string> = await web3Client.wallet().sellRolls(
        {
            fee: 0n,
            amount: 1n,
        } as IRollsData,
        baseAccount
    );
    ```
-   `getAccountBalance`
    ```ts
    const balance: IBalance = await web3Client
        .wallet()
        .getAccountBalance(
            "AU12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1"
        );
    ```

In addition to the class methods, there are also static methods for direct use:

-   `getAccountFromPrivateKey`
    ```ts
    const account: IAccount = await WalletClient.getAccountFromSecretKey(
        "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L"
    );
    ```
-   `walletGenerateNewAccount`
    ```ts
    const newWalletAccount: IAccount =
        await WalletClient.walletGenerateNewAccount();
    ```
-   `walletSignMessage`
    ```ts
    const sig: ISignature = await WalletClient.walletSignMessage(
        "hello",
        baseAccount
    );
    ```

### Smart contract deployment

Once the smart contract WASM is available, it becomes quite straightforward to deploy a smart contract operation (a state changing operation):

```ts
// deploy smart contract
const opId: string = await web3Client.smartContracts().deploySmartContract(
    {
        fee: 0n,
        maxGas: 2000000n,
        contractDataBinary: compiledScFromSource.binary,
        datastore: new Map<Uint8Array, Uint8Array>(),
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
        "AS12rr1neHvp7uzGepfPRPguZX5JWC3EFW6H7ZQRazzNjBRMNvQB",
    original_operation_id: null,
    emitter_address: null,
} as IEventFilter;

const filteredEvents: Array<IEvent> = await web3Client
    .smartContracts()
    .getFilteredScOutputEvents(eventFilterData);
```

Events could also be polled. The js sdk has two methods for doing this as shown below. In both, a filter, a web3 client and a poll interval which we can set in order to poll the events needs to be provided:

```ts
const onEventData = (events: Array<IEvent>) => {
    console.log("Event Data Received:", events);
};
const onEventDataError = (error: Error) => {
    console.log("Event Data Error:", error);
};

// poll smart contract events
const eventsFilter = {
    start: null,
    end: null,
    original_caller_address:
        "AS12rr1neHvp7uzGepfPRPguZX5JWC3EFW6H7ZQRazzNjBRMNvQB",
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
const onEventData = (events: Array<IEvent>) => {
    console.log("Event Data Received:", events);
};
const onEventDataError = (error: Error) => {
    console.log("Event Data Error:", error);
};

const eventPoller: EventPoller = EventPoller.startEventsPolling(
    eventsFilter,
    1000,
    web3Client,
    onEventData,
    onEventDataError
);

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
const status: EOperationStatus = await web3Client
    .smartContracts()
    .getOperationStatus(deploymentOperationId);
```

There are however cases when one would require to await a given status and that could be done via. It is important to note here that the algorithm will giv up after a certain amount of time or a limited error count. These values have proven to be sufficient for most standard cases.

```ts
const status: EOperationStatus = await web3Client
    .smartContracts()
    .awaitRequiredOperationStatus(
        deploymentOperationId,
        EOperationStatus.INCLUDED_PENDING
    );
```

### Smart contract balance

Smart contract balances could be easily obtained via using the `getContractBalance` method:

```ts
const balance: IBalance | null = await web3Client
    .smartContracts()
    .getContractBalance(contractAddress);
```

### Smart contract read and write calls

Smart contract data could be read via `readSmartContract` method:

```ts
const data: IContractReadOperationResponse = await web3Client
    .smartContracts()
    .readSmartContract({
        fee: 0n,
        maxGas: 200000n,
        targetAddress: scAddress,
        targetFunction: "getGameState",
        parameter: new Args().serialize(), // this is based on input arguments
    } as IReadData);
```

The returned data is contained in an object of type IContractReadOperationResponse under the key `returnedValue` which is of type Uint8Array. Depending on the smart contract function implementation, the user is to convert the latter into the expected data type.

Smart contract state-changing operations could be executed via `callSmartContract` method:

```ts
const data: string = await web3Client.smartContracts().callSmartContract(
    {
        fee: 0n,
        maxGas: 200000n,
        coins: fromMAS("0.1"),
        targetAddress: scAddress,
        functionName: "play",
        parameter: new Args().serialize(), // this is based on input arguments
    } as ICallData,
    baseAccount
);
```

The returned value is the operation id.

Smart contracts could also be constructed in order to read data from another contract. In that case one could use the code below to read the data via a proxy contract:

```ts
// read smart contract data
const data: IExecuteReadOnlyResponse = await web3Client
    .smartContracts()
    .executeReadOnlySmartContract(
        {
            fee: 0n,
            maxGas: 2000000n,
            coins: fromMAS("0.1"),
            contractDataBinary: compiledScFromSource.binary,
        } as IContractData,
        baseAccount
    );
```

The returned data is contained in an object of type IExecuteReadOnlyResponse under the key `returnedValue` which is of type Uint8Array. Depending on the smart contract function implementation, the user is to convert the latter into the expected data type.

### Massa Units

All Massa values that are being used or returned by web3 (gas, fees, coins and rolls) are expressed via BigInt's. Massa-web3 has however a few convenience methods and converters that might come handy. Below is a summary and some examples of the latter:

- **Rolls**: expressed in BigInt's. For Rolls there is no metric system as rolls are unit-less. 10 rolls is to be represented by a BigInt containing 10. Example:
```ts
const rolls = BigInt(10);
// or. ...
const rolls = 10n;
```
- **Gas/MaxGas**: expressed in BigInt's. For Gas/MaxGas there is no metric system as gas is unit-less. The gas represents the computational units required for a given operation to be executed by the network. Example:
```ts
const gas = BigInt(2000000);
// or. ...
const gas = 2000000n;
```
- **Coins/Fees**: expressed in BigInt's. Coins/fees do however have a metric system behind them. The smallest unit is 10**-9 `Massa`. All coins/fees are to be expressed as integers scaled by 10**9 and this way consumed by the network json-rpc protocol. Since gas/fees are to be used as BigInt's web3 adds in a few convenience utils allowing smaller units (e.g. 0.5 `Massa`) to be expressed.

The util function `fromMAS` and `toMAS` are used exactly for the latter purpose.
`fromMAS` receives any amount of type `number | string | BigNumber | bigint` and returns a scaled `bigint` for ready use.
`toMAS` on the contrary converts any amount from `nanoMassa` to `Massa` and returns a `BigNumber` representing the amount as a decimal.

Examples:
```ts
const coinsToTransfer = fromMAS("0.5"); // half a massa
// or. ...
const coinsToTransfer = 500n * MassaUnits.mMassa; // half a massa
```

```ts
const coinsToTransfer = fromMAS("1"); // one massa
// or. ...
const coinsToTransfer = 1n * MassaUnits.oneMassa; // one massa
```

Web3 exposes a collection `MassaUnits` which has three convenience `BigInt` constants that could be used for amount scaling:

- `MassaUnits.oneMassa` = 10**9
- `MassaUnits.mMassa` = 10**6
- `MassaUnits.uMassa` = 10**3

## Contributing and testing

1. Run `npm run install` to install all deps
2. Run `npm run build` to build distribution content
3. Run `npm run test` to run integration and unit tests
