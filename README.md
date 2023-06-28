# massa-web3 ![Node CI](https://github.com/massalabs/massa-web3/workflows/Node.js%20CI/badge.svg)

![check-code-coverage](https://img.shields.io/badge/coverage-96.66%25-green)

> **PREREQUISITES:**
> 
>    - NodeJS 14+
>    - npm / yarn (see package.json)


This repository is a monorepo for blockchain development in TypeScript for the Massa blockchain. It provides an interface to interact with the Massa blockchain, including deploying smart contracts, interacting with smart contracts, querying blockchain status and more.

Massa-web3 is a TypeScript library that allows you to interact with the Massa blockchain. It enables the use of the JSON-RPC API, fetch and poll events from smart contracts on the Massa blockchain, deploy smart contracts, and more.


## Installation

`Massa-web3` could be used as a library for frameworks or as a stand-alone bundled js file which can be easily loaded into the browser.

### Library (Node.js/React/Vue.js) usage

> npm install @massalabs/massa-web3

### Browser usage

If you want to use `massa-web3` in the browser directly, you can add the following script to your html file:

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

 ## Usage

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


Example:

```ts
// get block info
const blocks: Array<IBlockInfo> = await web3Client
    .publicApi()
    .getBlocks(["q2XVw4HrRfwtX8FGXak2VwtTNkBvYtLVW67s8pTCVPdEEeG6J"]);
```

To see all available methods, please refer to the [documentation](https://web3.docs.massa.net).

### Smart contract blockchain status

Smart contracts undergo various transaction statuses before they reach block finality on chain.
The current smart contract status could be easily obtained via:

```ts
const status: EOperationStatus = await web3Client
    .smartContracts()
    .getOperationStatus(deploymentOperationId);
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

## Contributing
We welcome contributions from the community!

If you would like to contribute to `massa-web3`, please read the [CONTRIBUTING file](CONTRIBUTING.md).

## License
`massa-web3` is released under the [MIT License](LICENSE).

## Powered By
`massa-web3` is developed with love by MassaLabs and powered by a variety of [open-source projects](powered-by.md).
