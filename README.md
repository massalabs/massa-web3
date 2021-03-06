# massa-web3

Web3 libraries for Massa (web3.js SDK)

### Requirements

-   NodeJS 14+
-   npm / yarn (see package.json)

### Package commands

1. Run `yarn install` to install all deps
2. Run `yarn run build` to build distribution content
3. Run `yarn run test` to run integration and unit tests

### Web3 Client initialization

To instantiate a web3 client, one needs to create a base account for signing and paying for transactions as well as a list of providers as shown below:

```ts
import { Client, IAccount, IClientConfig, IProvider, ProviderType } from "@massalabs/massa-web3";

const baseAccount = {
  address: 'A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1',
  secretKey: 'S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L',
  publicKey: 'P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR'
} as IAccount;

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

const web3ClientConfig = {
    providers,
    retryStrategyOn: true,// activate the backoff retry strategy
    periodOffset: 3       // set an offset of a few periods (default = 5)
} as IClientConfig;

const web3Client: Client = new Client(web3ClientConfig, baseAccount);
```

Once there is an initialized client instance, it is straightforward to call methods on it:

```ts
import { IStatus, IAddressInfo } from "@massalabs/massa-web3";

const nodeStatusResp: IStatus = await web3Client.getStatus();
const addressesResp: Array<IAddressInfo> = await web3Client
    .publicApi()
    .getAddresses(["some_address"]);
```

There are also convenience factories for a straightforward initialization of the client:

```ts
import {
    ClientFactory,
    Client,
    DefaultProviderUrls,
} from "@massalabs/massa-web3";

// a testnet client
const testnetClient: Client = ClientFactory.createDefaultClient(
    DefaultProviderUrls.TESTNET,
    baseAccount
);

// a custom client (see above)
const customClient: Client = ClientFactory.createCustomClient(
    providers,
    baseAccount
);
```

### Client exposed APIs

The client exposes several APIs which could be used on its (also initialized as stand-alone) own if one needs to:

```ts
web3Client.publicApi()      -> sub-client for public api                    (interface: PublicApiClient)
web3Client.privateApi()     -> sub-client for private api                   (interface: PrivateApiClient)
web3Client.wallet()         -> sub-client for wallet-related operations     (interface: WalletClient)
web3Client.smartContracts() -> sub-client for smart contracts interaction   (interface: SmartContractsClient)
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

-   `getNodeStatus` (https://github.com/massalabs/massa/wiki/api#get_status)
    ```ts
    const nodeStatus: INodeStatus = await web3Client
        .publicApi()
        .getNodeStatus();
    ```
-   `getAddresses` (https://github.com/massalabs/massa/wiki/api#get_addresses)
    ```ts
    const addressesResp: Array<IAddressInfo> = await web3Client
        .publicApi()
        .getAddresses(["A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1"]);
    ```
-   `getBlocks` (https://github.com/massalabs/massa/wiki/api#get_block)
    ```ts
    const blocks: Array<IBlockInfo> = await web3Client
        .publicApi()
        .getBlocks(["nKifcnGbd9zu8nu1hb94XEmMGwgoWbjj3DutzrobeHDdUtEuM"]);
    ```
-   `getEndorsements` (https://github.com/massalabs/massa/wiki/api#get_endorsements)
    ```ts
    const endorsements: Array<IEndorsement> = await web3Client
        .publicApi()
        .getEndorsements(["q2XVw4HrRfwtX8FGXak2VwtTNkBvYtLVW67s8pTCVPdEEeG6J"]);
    ```
-   `getOperations` (https://github.com/massalabs/massa/wiki/api#get_operations)
    ```ts
    const operations: Array<IOperationData> = await web3Client
        .publicApi()
        .getOperations(["z1cNsWAdgvoASq5RnN6MRbqqo634RRJbgwV9n3jNx3rQrQKTt"]);
    ```
-   `getCliques` (https://github.com/massalabs/massa/wiki/api#get_cliques)
    ```ts
    const cliques: Array<IClique> = await web3Client.publicApi().getCliques();
    ```
-   `getStakers` (https://github.com/massalabs/massa/wiki/api#get_stakers)
    ```ts
    const stakers: Array<IStakingAddresses> = await web3Client
        .publicApi()
        .getStakers();
    ```
-   `getDatastoreEntries` (https://github.com/massalabs/massa/wiki/api#get_stakers)
    ```ts
    const datastoreEntries: Array<IContractStorageData> = await web3Client
        .publicApi()
        .getDatastoreEntries([{ address: smartContractAddress, key: "some_key" } as IDatastoreEntryInput]);
    ```

### Client private API

Client private API operations are accessible under the private sub-client, which is accessible via the `privateApi()` method on the client.

Example:

```ts
// stop the node
await web3Client.privateApi().nodeStop();
```

Available methods are:

-   `stopNode` (https://github.com/massalabs/massa/wiki/api#stop_node)
    ```ts
    await web3Client.privateApi().nodeStop();
    ```
-   `ban` (https://github.com/massalabs/massa/wiki/api#ban)
    ```ts
    await web3Client.privateApi().banIpAddress("192.168.1.1");
    ```
-   `unban` (https://github.com/massalabs/massa/wiki/api#unban)
    ```ts
    await web3Client.privateApi().unbanIpAddress("192.168.1.1");
    ```
-   `nodeGetStakingAddresses` (https://github.com/massalabs/massa/wiki/api#get_staking_addresses)
    ```ts
    const stakingAddresses = await web3Client
        .privateApi()
        .nodeGetStakingAddresses();
    ```
-   `nodeRemoveStakingAddresses` (https://github.com/massalabs/massa/wiki/api#remove_staking_addresses)
    ```ts
    await web3Client
        .privateApi()
        .nodeRemoveStakingAddresses([
            "A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
        ]);
    ```
-   `nodeAddStakingPrivateKeys` (https://github.com/massalabs/massa/wiki/api#add_staking_private_keys)
    ```ts
    await web3Client
        .privateApi()
        .nodeAddStakingSecretKeys([
            "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
        ]);
    ```
-   `nodeSignMessage` (https://github.com/massalabs/massa/wiki/api#node_sign_message)
    ```ts
    const message = "hello world";
    const msgBuf = new TextEncoder().encode(message);
    const signedMessage = await web3Client.privateApi().nodeSignMessage(msgBuf);
    ```

### Wallet operations

Wallet operations are accessible under the wallet sub-client which is accessible via the wallet() method on the client.

Example:

```ts
// generate new wallet
const newWalletAccount = await web3Client.wallet().walletGenerateNewAccount();
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
-   `getAccountSequentialBalance`
    ```ts
    const balance: IBalance = await web3Client.wallet().getAccountSequentialBalance("A12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1");
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
const opIds = await web3Client.smartContracts().deploySmartContract(
    {
        fee: 0,
        maxGas: 2000000,
        gasPrice: 0,
        coins: 0,
        contractDataBase64: compiledScFromSource.base64,
    } as IContractData,
    baseAccount
);
```
The compiledScFromSource is the base64 compiled smart contract code that could easily be obtained using massa's https://www.npmjs.com/package/massa-sc-utils

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
} as IEventFilter;

const eventPoller = EventPoller.startEventPoller(
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

Alternatively, one could make direct use of an async promise for doing the latter by providing callback functions which would fire on event data received or generated errors:

```ts
const onEventData = (events: Array<IEvent>) => {console.log("Event Data Received:" , events);}
const onEventDataError = (error: Error) => {console.log("Event Data Error:" , error);}

const eventPoller: EventPoller = await EventPoller.startEventsPollingAsync(
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
    const sc_address = createContract();
    call(sc_address, "initialize", "", 0);
    print("Initialized, address:" + sc_address);
    generate_event(`Address:${sc_address}`); //emit an event with the address
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

Smart contract balances could be easily obtained via usign the `getParallelBalance` method:

```ts
const balance: IBalance|null = await web3Client.smartContracts().getParallelBalance(contractAddress);
```

### Smart contract read and write calls

Smart contract data could be read via `readSmartContract` method:

```ts
const data: Array<IContractReadOperationData> = await web3Client.smartContracts().readSmartContract({
            fee: 0,
            maxGas: 200000,
            simulatedGasPrice: 0,
            targetAddress: scAddress,
            targetFunction: "getGameState",
            parameter: "some_stringified_data",
            callerAddress: baseAccount.address
        } as IReadData);
```

Please note that this method would currently only return data which is emitted as an event e.g. `generateEvent(...)`. The returned event data is contained in an object of type IContractReadOperationData under the data key!


Smart contract state-changing operations could be excuted via `callSmartContract` method:

```ts
const data: Array<string> = await web3Client.smartContracts().callSmartContract({
            fee: 0,
            gasPrice: 0,
            maxGas: 200000,
            parallelCoins: 0,
            sequentialCoins: 0,
            targetAddress: scAddress,
            functionName: "play",
            parameter: JSON.stringify({index : 1}),
        } as ICallData, baseAccount);
```

Smart contracts could also be constructed in order to read data from another contract. In that case one could use the code below to read the data via a proxy contract:

```ts
// read smart contract data
const data: Array<IExecuteReadOnlyResponse> = await web3Client.smartContracts().executeReadOnlySmartContract(
    {
        fee: 0,
        maxGas: 2000000,
        gasPrice: 0,
        coins: 0,
        contractDataBase64: compiledScFromSource.base64,
    } as IContractData,
    baseAccount
);
```