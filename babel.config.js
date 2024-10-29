module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // Ensures compatibility with the version of Node.js you are running
        },
        modules: 'commonjs', // Necessary for Node.js compatibility
      },
    ],
  ],
}
