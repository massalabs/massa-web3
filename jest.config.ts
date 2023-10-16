import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.base.json',
      },
    ],
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleNameMapper: {
    '^@massa-web3/(.*)$': '<rootDir>/packages/massa-web3/src/$1',
    '^@web3-utils/(.*)$': '<rootDir>/packages/web3-utils/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/packages/*/dist/',
  ],
};

export default config;
