import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  displayName: 'massa-web3',
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  testMatch: ['<rootDir>/test/**/*.(spec|test).ts?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/test/',
    '<rootDir>/src/generated/',
  ],
}

export default config
