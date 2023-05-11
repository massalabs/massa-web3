const path = require('path');

module.exports = {
  entry: './dist/index.js',
  output: {
    filename: 'massa-web3.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'MassaWeb3',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify/'),
      stream: require.resolve('stream-browserify/'),
      buffer: require.resolve('buffer/'),
    },
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  optimization: {
    minimize: true,
  },
};
