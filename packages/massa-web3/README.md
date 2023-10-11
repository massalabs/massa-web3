# massa-web3 ![Node CI](https://github.com/massalabs/massa-web3/workflows/Node.js%20CI/badge.svg)

![check-code-coverage](https://img.shields.io/badge/coverage-95.25%25-green)

> **PREREQUISITES:**
> 
>    - NodeJS 14+
>    - npm / yarn (see package.json)


Massa-web3 is a TypeScript library that enables you to communicate with the Massa blockchain. It offers an interface to retrieve data directly from the blockchain, interact with smart contracts, acquire and monitor events, and perform additional actions.


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
