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
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@massalabs/massa-web3/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['<rootDir>/test/**/*.(spec|test).ts?(x)'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/'],
  transformIgnorePatterns: ['/node_modules/(?!big-varint).+\\.js$'],
}

export default config
