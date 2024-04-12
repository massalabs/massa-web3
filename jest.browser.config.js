module.exports = {
  preset: 'jest-puppeteer',
  testMatch: ['**/test/experimental/*.spec.ts'],
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.base.json',
      },
    ],
    '^.+\\.jsx?$': 'babel-jest',
  },
}
