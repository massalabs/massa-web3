// Require the path module from Node.js
const path = require('path');

// Export the webpack configuration object
module.exports = [
  // UMD
  {
    // The entry point of your application
    entry: './dist/index.js',

    // Configuration for the output file
    output: {
      // The filename of the output file
      filename: 'massa-web3.js',

      // The path to the output directory, __dirname is the directory of the current module
      path: path.resolve(__dirname, 'dist'),

      // The name of the exported library
      library: 'massa',

      // The type of the exported library
      libraryTarget: 'umd',

      // The global object in which the library will be assigned to
      globalObject: 'this',
    },

    // Configuration for module resolution
    resolve: {
      // Configure fallbacks for Node.js built-in modules
      fallback: {
        // Fallback for the crypto module, using crypto-browserify
        crypto: require.resolve('crypto-browserify/'),

        // Fallback for the stream module, using stream-browserify
        stream: require.resolve('stream-browserify/'),

        // Fallback for the buffer module, using the buffer module
        buffer: require.resolve('buffer/'),
      },

      // Extensions that are used to resolve modules
      extensions: ['.ts', '.js'],
    },

    // Configuration for modules
    module: {
      // Array of rules that are used to find and load modules
      rules: [
        {
          // Regular expression that matches the file extensions that this rule applies to
          test: /\.ts$/,
          // The loader that should be used for the files that match the test regular expression
          loader: 'ts-loader',
          // A condition that must not be met to use this rule
          exclude: /node_modules/,
          options: {
            configFile: 'tsconfig.commonjs.json',
          },
        },
      ],
    },

    // Configuration for optimization
    optimization: {
      // Whether to minimize the output
      minimize: false,
    },

    // Configuration for source maps
    devtool: 'source-map', // This option controls if and how source maps are generated.

    // The mode to use for the webpack build
    mode: 'development', // In development mode, the configuration enables NamedChunksPlugin and NamedModulesPlugin.
    // You may want to switch to 'production' for deployment.
  },

  // // ESM
  // {
  //   // The entry point of your application
  //   entry: './dist/index.js',

  //   experiments: {
  //     outputModule: true, // This line is required for ESM output
  //   },

  //   // Configuration for the output file
  //   output: {
  //     // The filename of the output file
  //     filename: 'massa-web3.esm.js',

  //     // The path to the output directory, __dirname is the directory of the current module
  //     path: path.resolve(__dirname, 'dist'),
  //   },
  //   // Configuration for module resolution
  //   resolve: {
  //     // Configure fallbacks for Node.js built-in modules
  //     fallback: {
  //       // Fallback for the crypto module, using crypto-browserify
  //       crypto: require.resolve('crypto-browserify/'),

  //       // Fallback for the stream module, using stream-browserify
  //       stream: require.resolve('stream-browserify/'),

  //       // Fallback for the buffer module, using the buffer module
  //       buffer: require.resolve('buffer/'),
  //     },

  //     // Extensions that are used to resolve modules
  //     extensions: ['.ts', '.js'],
  //   },
  //   // Configuration for modules
  //   module: {
  //     // Array of rules that are used to find and load modules
  //     rules: [
  //       {
  //         // Regular expression that matches the file extensions that this rule applies to
  //         test: /\.ts$/,
  //         // The loader that should be used for the files that match the test regular expression
  //         loader: 'ts-loader',
  //         // A condition that must not be met to use this rule
  //         exclude: /node_modules/,
  //         options: {
  //           configFile: 'tsconfig.esm.json',
  //         },
  //       },
  //     ],
  //   },
  //   // Configuration for optimization
  //   optimization: {
  //     // Whether to minimize the output
  //     minimize: false,
  //   },

  //   // Configuration for source maps
  //   devtool: 'source-map', // This option controls if and how source maps are generated.

  //   // The mode to use for the webpack build
  //   mode: 'development', // In development mode, the configuration enables NamedChunksPlugin and NamedModulesPlugin.
  //   // You may want to switch to 'production' for deployment.
  // },
];
