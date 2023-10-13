# Contributing to massa-web3

Thank you for considering contributing to massa-web3!

## Reporting Bugs

If you discover a bug, please create a [new issue](https://github.com/massalabs/massa-web3/issues/new?assignees=&labels=issue) on our GitHub repository.

In your issue, please include a clear and concise description of the bug, any relevant code snippets, error messages, and steps to reproduce the issue.

## Installation

To start developing with massa-web3, you must install all the necessary dev dependencies. You can do so by running the following command:

```sh
npm install
```

This will install all the required packages listed in the package.json file, allowing you to update, fix, or improve massa-web3 in any way you see fit.

## Contributing Code

We welcome contributions in the form of bug fixes, enhancements, and new features.

To contribute code, please follow these steps:

1. Fork the massa-web3 repository to your own account.
2. Create a new branch from the `main` branch for your changes.
3. Make your changes and commit them to your branch.
4. Push your branch to your fork.
5. Create a pull request from your branch to the develop branch of the massa-web3 repository.

>  **NOTE:** When creating a pull request, please include a clear and concise title and description of your changes, as well as any relevant context or background information.

## Contributing Namespaces

Namespaces are used in massa-web3 to group related functions and objects together, making it easier for developers to find and use them in their contracts. All namespaces are located in the `src` directory, and each namespace is in its own subdirectory.

### Using existing namespaces

When contributing to massa-web3, make sure you add new features to the correct namespace. Before adding a new feature, it's a good idea to check if there's an existing namespace that contains related functions or objects. By adding to an existing namespace, you can help ensure that your code is well-organized and easy to find.

### Creating new namespaces

If you have an idea for a new feature or a collection of related functions and objects that doesn't fit into an existing namespace, you can create a new namespace. When creating a new namespace, make sure to choose a descriptive name that accurately reflects the purpose of the namespace. Additionally, make sure to keep the namespace focused and to only include related functions and objects.

If an existing namespace is becoming too large or unwieldy, it may also be a good idea to create a new one. When doing so, make sure to document your namespace and its functions thoroughly to make it easy for other developers to understand and use.

## Code Style

Please ensure that your code follows the existing code style used in the project.

We use the [MassaLabs Prettier configuration](https://github.com/massalabs/prettier-config-as) and [MassaLabs ESLint configuration](https://github.com/massalabs/eslint-config) for formatting and linting.

You can run the following command to format your code before committing:

```sh
npm run fmt
```

## Tests

Please ensure that your changes include any necessary tests.

We use [jest library](https://jestjs.io/fr/) for unit testing.
  
You can run the following command to run the tests:

```sh
npm run build
```

and then

```sh
npm run test
```

## License

By contributing to massa-web3, you agree that your contributions will be licensed under the MIT License.

## Documentation

massa-web3 provides complete documentation of all available functions and objects.

To generate the documentation for a specific branch, run the following command:

```sh
npm run doc
```
The documentation will be generated inside each of the packages in the `./docs/documentation/html` directory.