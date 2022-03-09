# massa-web3
Web3 libraries for Massa (web3.js sdk)

### Requirements
* NodeJS 14+
* npm /yarn (see package.json)

### Package update
1. Clone repo
2. Run `npm run build` in the root folder
3. Run `npm run test` for integration tests
4. Release the package to the npm registry

### Package usage

In order to instantiate a client, one needs to create a base account and set a list of providers as shown below:

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
Once we have a client instance, it is straightforward to call methods:

```ts

    import { IStatus, IAddressInfo } from "massa_web3/interfaces";

    const nodeStatusResp: IStatus = await web3Client.getStatus();
    const addressesResp: Array<IAddressInfo> = await web3Client.getAddresses(["some_address"]);
```

There are also convenience factories for a straightforward initialization of the client:

```ts

    import { ClientFactory, Client, DefaultProviderUrls } from "massa_web3/web3/Client";

    // a testnet client
    const client: Client = ClientFactory.createDefaultClient(DefaultProviderUrls.TESTNET, baseAccount);

    // a default client (see above)
    const client: Client = ClientFactory.createDefaultClient(providers, baseAccount);
```