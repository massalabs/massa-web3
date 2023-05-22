// Require the path module from Node.js
const path = require('path');

// Export the webpack configuration object
module.exports = [
  // UMD minified (browser only)
  {
    // The entry point of the package
    entry: './src/index.ts',

    // Configuration for the output file
    output: {
      // The filename of the output file
      filename: 'bundle.js',

      // The path to the output directory, __dirname is the directory of the current module
      path: path.resolve(__dirname, '.'),

      // The type of the exported library
      libraryTarget: 'window', // for UMD we use window

      // The name of the library as it should be exposed in the global scope
      library: 'massa',

      // The global object in which the library will be assigned to
      globalObject: 'this',
    },

    // Configuration for module resolution
    resolve: {
      // Configure fallbacks for Node.js built-in modules
      fallback: {
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
      minimize: true,
    },

    // Configuration for source maps
    devtool: 'source-map', // This option controls if and how source maps are generated.

    // The mode to use for the webpack build
    mode: 'development', // In development mode, the configuration enables NamedChunksPlugin and NamedModulesPlugin.
    // You may want to switch to 'production' for deployment.
  },

  // UMD - non-minified (browser only)
  {
    // Same as above but with optimization.minimize set to false,
    // The entry point of the package
    entry: './src/index.ts',

    // Configuration for the output file
    output: {
      // The filename of the output file
      filename: 'bundle.non-minified.js',

      // The path to the output directory, __dirname is the directory of the current module
      path: path.resolve(__dirname, '.'),

      // The type of the exported library
      libraryTarget: 'window', // for UMD we use window

      // The name of the library as it should be exposed in the global scope
      library: 'massa',

      // The global object in which the library will be assigned to
      globalObject: 'this',
    },

    // Configuration for module resolution
    resolve: {
      // Configure fallbacks for Node.js built-in modules
      fallback: {
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
      // Whether to minimize the output. Set to false for the non-minified bundle.
      minimize: false,
    },

    // Configuration for source maps
    devtool: 'source-map',

    // The mode to use for the webpack build. Set to 'development' for the non-minified bundle.
    mode: 'development',
  },
];