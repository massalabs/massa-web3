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

## Documentation


- Read the [`Massa-web3 documentation`](https://web3.docs.massa.net) to learn how to use Massa-web3.
- [`TypeDoc API`](https://web3.docs.massa.net) is available for all exported classes, interfaces and methods.
- [Massa Frontend tutorial](https://web3.docs.massa.net) is available to build your first Massa dApp.
## Usage
### Web3 Client initialization

There are two types of client initialization. The first one is connecting to Massa's public rpc node using a so-called default client. Please note that specifying a base account is only optional at this point. The code below illustrates how to do that:

```ts
// create a base account for signing transactions
const baseAccount = {
    address: "AU12PWTzCKkkE9P5Supt3Fkb4QVZ3cdfB281TGaup7Nv1DY12a6F1",
    secretKey: "S12tw4YShWtjWfy7YBQ9Erbcg6DYgWnMgb5hGjn9hAKGtgrLNa7L",
    publicKey: "P1hG8zRRJF2v3qkwyZ2fnHJeaVw9uT4huCkwcWJVvgypEz6D2aR",
} as IAccount;

// initialize a testnet client
const testnetClient: Client = await ClientFactory.createDefaultClient(
    DefaultProviderUrls.TESTNET,
    true,   // retry on failed requests
    baseAccount
);
```

Once there is an initialized client instance, it is straightforward to call methods on it.

```ts
const balanceResp: IBalance | null = await web3Client
          .wallet()
          .getAccountBalance(
            'some_address',
          );
```

To learn more about initializing a client, connecting to a local node, and more, please refer to the [Client Documentation](https://web3.docs.massa.net/classes/ClientFactory.html).

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
// get node status info
const nodeStatusResp: INodeStatus = await web3Client
    .publicApi()
    .getNodeStatus();
```

More information about the public API operations can be found in the [PublicApiClient documentation](https://web3.docs.massa.net/classes/PublicApiClient.html).

### Client private API

Client private API operations are accessible under the private sub-client, which is accessible via the `privateApi()` method on the client.

Example:

```ts
// get staking addresses of the wallet
const stakingAddresses: string[] = await web3Client
    .privateApi()
    .nodeGetStakingAddresses();
await web3Client.privateApi().nodeStop();
```

More information about the private API operations can be found in the [PrivateApiClient documentation](https://web3.docs.massa.net/classes/PrivateApiClient.html).

### Wallet operations

Wallet operations are accessible under the wallet sub-client which is accessible via the wallet() method on the client.

Example:

```ts
// add accounts to the wallet via secret keys
const addedAccounts: IAccount[] = await web3Client.wallet().addSecretKeysToWallet(["secret_key"]);

```

In addition to the class methods, there are also static methods for direct use, for example:

```ts
// generate new wallet
const newWalletAccount: IAccount = await WalletClient.walletGenerateNewAccount();
```

More information about the wallet operations can be found in the [WalletClient documentation](https://web3.docs.massa.net/classes/WalletClient.html).

#### Smart contract interaction
After building your smart contract, you will get a WASM file which is the compiled version of your smart contract.
- You can use the [`deploySmartContract`](https://web3.docs.massa.net/interfaces/ISmartContractsClient.html#deploySmartContract) method to deploy your smart contract to the network.

- To read smart contract data, [`readSmartContract`](https://web3.docs.massa.net/interfaces/ISmartContractsClient.html#readSmartContract) method can be used.
- In the same way, to write data to the smart contract, [`writeSmartContract`](https://web3.docs.massa.net/interfaces/ISmartContractsClient.html#writeSmartContract) method can be used.

More information about the smart contract operations can be found in the [SmartContractsClient documentation](https://web3.docs.massa.net/classes/SmartContractsClient.html).

#### Event fetching and polling

It is possible to fetch, filter and poll smart contract events with methods provided by the smart contracts sub-client. Available methods and their usage are described in the [Event Section](https://web3.docs.massa.net/classes/EventPoller.html) of the documentation.

#### Massa Units

All Massa values that are being used or returned by web3 (gas, fees, coins and rolls) are expressed via BigInt's. Massa-web3 has however a few convenience methods and converters that might come handy, like the `fromMAS` and `toMAS` methods. Check the [MassaUnits documentation](https://web3.docs.massa.net/functions/fromMAS.html) for more information.

```ts
## Contributing
We welcome contributions from the community!

If you would like to contribute to `massa-web3`, please read the [CONTRIBUTING file](CONTRIBUTING.md).

## License
`massa-web3` is released under the [MIT License](LICENSE).

## Powered By
`massa-web3` is developed with love by MassaLabs and powered by a variety of [open-source projects](powered-by.md).
