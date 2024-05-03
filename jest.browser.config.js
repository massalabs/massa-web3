module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ['**/test/experimental/unit/*.spec.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.base.json',
      },
    ],
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!(big-varint)/)'],
}
