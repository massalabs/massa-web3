import baseConfig from '../../jest.config'
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  ...baseConfig,
  rootDir: '../..',
  displayName: 'web3-utils',
  testMatch: ['<rootDir>/packages/web3-utils/test/**/*.(spec|test).ts?(x)'],
}

export default config
