import { WBTC } from '../../../src/contracts-wrappers'
import { mainnetProvider, provider } from './../setup'

describe('USDTb wrapper tests', () => {
  let mainnetContract: WBTC
  let buildnetContract: WBTC
  beforeAll(async () => {
    mainnetContract = await WBTC.fromProvider(mainnetProvider)
    buildnetContract = await WBTC.fromProvider(provider)
  })

  // Mainnet tests
  test('version', async () => {
    const version = await mainnetContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await mainnetContract.name()
    expect(name).toBe('WBTC')
  })

  test('symbol', async () => {
    const symbol = await mainnetContract.symbol()
    expect(symbol).toBe('WBTC.e')
  })

  test('decimals', async () => {
    const decimals = await mainnetContract.decimals()
    expect(decimals).toBe(8)
  })

  // Buildnet tests
  test('version', async () => {
    const version = await buildnetContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await buildnetContract.name()
    expect(name).toBe('Sepolia WBTC')
  })

  test('symbol', async () => {
    const symbol = await buildnetContract.symbol()
    expect(symbol).toBe('WBTC.s')
  })

  test('decimals', async () => {
    const decimals = await buildnetContract.decimals()
    expect(decimals).toBe(8)
  })
})
