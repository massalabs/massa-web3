# massa-web3 ![Node CI](https://github.com/massalabs/massa-web3/workflows/Node.js%20CI/badge.svg) ![check-code-coverage](https://img.shields.io/badge/coverage-95.25%25-green)

> **PREREQUISITES:**
> 
>    - NodeJS 18+
>    - npm / yarn (see package.json)

Massa-web3 is an exhaustive TypeScript library that enables you to communicate with the Massa blockchain. It offers an interface to retrieve data directly from the blockchain, interact with smart contracts, acquire and monitor events, and perform additional actions. The library can be used both in browser environments and Node.js runtime.

## Installation

`Massa-web3` can be used as a library for frameworks.

### Library (Node.js/React/Vue.js) usage

```shell
npm install @massalabs/massa-web3
````

## Browser usage

For maintenance reasons, a standalone version of the library is no longer provided. To use `massa-web3` in a vanilla JavaScript project, you will need to use a bundler like Vite.

### Using Vite with npx

1. **Create a Vite Project:**

   Use `npx` to create a new Vite project:

   ```shell
   npx create-vite@latest my-massa-project --template vanilla
   cd my-massa-project
   ```


2. **Install Massa-Web3:**

   Install the Massa-Web3 libraries:

   ```shell
   npm install @massalabs/massa-web3
   npm install @massalabs/wallet-provider
   ```

3. **Import Massa-Web3:**

   Import the libraries in your `index.html` file and make sure to have a wallet installed (here we use massa station as an example):

   ```html
   <script type="module">
     import * as massa from "@massalabs/massa-web3";
     import * as walletPro from "@massalabs/wallet-provider";

     async function main() {
       try {
         let providerList = await walletPro.providers();
         console.log("Providers:", providerList);

         const provider = providerList.find(
           (provider) => provider.name() === "MASSASTATION" // or BEARBY
         );

         let accounts = await provider.accounts();

         if (accounts.length === 0) {
           console.log("No accounts found");
           return;
         }

         console.log("Accounts:", accounts);

         const account = accounts[0];

         if (!account || !provider) {
           return;
         }

         const client = await massa.ClientFactory.fromWalletProvider(
           provider,
           account
         );

         console.log("Client:", client);
       } catch (e) {
         console.log(e);
       }
     }

     main();
   </script>
   ```

#### Running the Vite Project

Run the Vite project:

```shell
npm run dev
```

## Documentation

- Read the [`Massa-web3 documentation`](https://docs.massa.net) to learn how to use Massa-web3.
- [`TypeDoc API`](https://web3.docs.massa.net) is available for all exported classes, interfaces and methods.
- dApp examples with associated frontend can be found at [massa-sc-examples](https://github.com/massalabs/massa-sc-examples) repository.

## Contributing
We welcome contributions from the community!

If you would like to contribute to `massa-web3`, please read the [CONTRIBUTING file](CONTRIBUTING.md).

## License
`massa-web3` is released under the [MIT License](LICENSE).

## Powered By
`massa-web3` is developed with love by MassaLabs and powered by a variety of [open-source projects](powered-by.md).
