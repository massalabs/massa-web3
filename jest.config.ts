import type { Config } from '@jest/types'
const dotenv = require('dotenv')
dotenv.config()

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
  testMatch: ['<rootDir>/test/**/*.(spec|test).ts?(x)'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/open_rpc/',
  ],
  transformIgnorePatterns: ['/node_modules/(?!big-varint).+\\.js$'],
}

export default config
