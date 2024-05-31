import baseConfig from '../jest.config'
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  ...baseConfig,
  rootDir: '..',
  displayName: 'massa-web3',
  testMatch: ['<rootDir>/open_rpc/tests/*.(spec|test).ts?(x)'],
  testPathIgnorePatterns: [],
}

export default config
