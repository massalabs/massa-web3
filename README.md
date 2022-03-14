# massa-web3
Web3 libraries for Massa (web3.js sdk)

### Requirements

* NodeJS 14+
* npm / yarn (see package.json)

### Package commands

1. Run `yarn install` to install all deps
2. Run `yarn run build` to build distribution content
3. Run `yarn run test` to run integration and unit tests

### Web3 Client initialization

In order to instantiate a web3 client, one needs to create a base account for signing and paying for transactions as well as a list of providers as shown below:

```ts

    import { IAccount, IClientConfig, IProvider, ProviderType } from "massa_web3/interfaces";
    import { Client } from "massa_web3/web3/Client";

    const baseAccount = {
        publicKey: "2SPTTLK6Vgk5zmZEkokqC3wgpKgKpyV5Pu3uncEGawoGyd4yzC",
        privateKey: "5Jwx18K2JXacFoZcPmTWKFgdG1mSdkpBAUnwiyEqsVP9LKyNxR"
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
        retryStrategyOn: true // activate the backoff retry strategy
    } as IClientConfig;

    const web3Client: Client = new Client(web3ClientConfig, baseAccount);
```
Once there is an initialized client instance, it is straightforward to call methods on it:

```ts

    import { IStatus, IAddressInfo } from "massa_web3/interfaces";

    const nodeStatusResp: IStatus = await web3Client.getStatus();
    const addressesResp: Array<IAddressInfo> = await web3Client.publicApi().getAddresses(["some_address"]);
```

There are also convenience factories for a straightforward initialization of the client:

```ts

    import { ClientFactory, Client, DefaultProviderUrls } from "massa_web3/web3/Client";

    // a testnet client
    const client: Client = ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, baseAccount);

    // a default client (see above)
    const client: Client = ClientFactory.createDefaultClient(providers, baseAccount);
```

### Client public api

Client public api operations are accessible under the public subclient which is accessible via the `publicApi()` method on the client.

Example:

```ts
    // get block info
    const blocks: Array<IBlockInfo> = await web3Client.publicApi().getBlocks(["q2XVw4HrRfwtX8FGXak2VwtTNkBvYtLVW67s8pTCVPdEEeG6J"]);
```

Available methods are:

- "getNodeStatus" (https://github.com/massalabs/massa/wiki/api#get_status)
- "getAddresses (https://github.com/massalabs/massa/wiki/api#get_addresses)
- "send_operations" (https://github.com/massalabs/massa/wiki/api#send_operations)
- "getBlock" (https://github.com/massalabs/massa/wiki/api#get_block)
- "getEndorsements" (https://github.com/massalabs/massa/wiki/api#get_endorsements)
- "getOperations" (https://github.com/massalabs/massa/wiki/api#get_operations)
- "getCliques" (https://github.com/massalabs/massa/wiki/api#get_cliques)
- "getStakers" (https://github.com/massalabs/massa/wiki/api#get_stakers)

### Client private api

Client private api operations are accessible under the private subclient which is accessible via the `privateApi()` method on the client.

Example:

```ts
    // stop the node
    await web3Client.privateApi().nodeStop();
```

Available methods are:

- "stopNode" (https://github.com/massalabs/massa/wiki/api#stop_node)
- "ban (https://github.com/massalabs/massa/wiki/api#ban)
- "unban" (https://github.com/massalabs/massa/wiki/api#unban)
- "nodeGetStakingAddresses" (https://github.com/massalabs/massa/wiki/api#get_staking_addresses)
- "nodeRemoveStakingAddresses" (https://github.com/massalabs/massa/wiki/api#remove_staking_addresses)
- "nodeAddStakingPrivateKeys" (https://github.com/massalabs/massa/wiki/api#add_staking_private_keys)
- "nodeSignMessage" (https://github.com/massalabs/massa/wiki/api#node_sign_message)

### Wallet operations

Wallet operations are accessible under the wallet subclient which is accessible via the wallet() method on the client.

```ts

    // generate new wallet
    const newWalletAccount = web3Client.wallet().walletGenerateNewAccount();
```

Available methods are:

- walletGenerateNewAccount

//TODO

### Blockchain native operations

Available methods are:

- "sendTransaction"
- "buyRolls"
- "sellRolls"

```ts
    // send native currency from one wallet to another
    const operationId: Array<string> = await web3Client.sendTransaction({
        fee: "fee..."
        expirePeriod: "0";
        amount: "amount...",
        recipient_address: "address...";
    } as ITransactionData);
```

### Smart contract operations

```ts
    // generate new wallet
    const operationId: Array<string> = await web3Client.executeSC({
        fee: "fee..."
        expirePeriod: "0";
        maxGas: "maxGas...",
        gasPrice: "gasprice...",
        coins: "coints..."
    } as IContractData);
```
