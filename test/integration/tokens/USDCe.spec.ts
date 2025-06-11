import { USDCe } from '../../../src/contracts-wrappers'
import { mainnetProvider, provider as buildnetProvider } from './../setup'

describe('USDCe wrapper tests', () => {
  let mainnetContract: USDCe
  let buildnetContract: USDCe
  beforeAll(async () => {
    mainnetContract = await USDCe.fromProvider(mainnetProvider)
    buildnetContract = await USDCe.fromProvider(buildnetProvider)
  })

  // Mainnet tests
  test('version', async () => {
    const version = await mainnetContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await mainnetContract.name()
    expect(name).toBe('USD Coin')
  })

  test('symbol', async () => {
    const symbol = await mainnetContract.symbol()
    expect(symbol).toBe('USDC.e')
  })

  test('decimals', async () => {
    const decimals = await mainnetContract.decimals()
    expect(decimals).toBe(6)
  })

  // Buildnet tests
  test('version', async () => {
    const version = await buildnetContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await buildnetContract.name()
    expect(name).toBe('Sepolia USDC')
  })

  test('symbol', async () => {
    const symbol = await buildnetContract.symbol()
    expect(symbol).toBe('USDC.s')
  })

  test('decimals', async () => {
    const decimals = await buildnetContract.decimals()
    expect(decimals).toBe(6)
  })
})
