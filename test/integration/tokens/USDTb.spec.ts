import { USDTb } from '../../../src/contracts-wrappers'
import { mainnetProvider, provider as buildnetProvider } from './../setup'

describe('USDTb wrapper tests', () => {
  let mainnetContract: USDTb
  let buildnetContract: USDTb
  beforeAll(async () => {
    mainnetContract = await USDTb.fromProvider(mainnetProvider)
    buildnetContract = await USDTb.fromProvider(buildnetProvider)
  })

  // Mainnet tests
  test('version', async () => {
    const version = await mainnetContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await mainnetContract.name()
    expect(name).toBe('Bsc USDT')
  })

  test('symbol', async () => {
    const symbol = await mainnetContract.symbol()
    expect(symbol).toBe('USDT.b')
  })

  test('decimals', async () => {
    const decimals = await mainnetContract.decimals()
    expect(decimals).toBe(18)
  })

  // Buildnet tests
  test('version', async () => {
    const version = await buildnetContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await buildnetContract.name()
    expect(name).toBe('Binance-peg USD')
  })

  test('symbol', async () => {
    const symbol = await buildnetContract.symbol()
    expect(symbol).toBe('USDT.bt')
  })

  test('decimals', async () => {
    const decimals = await buildnetContract.decimals()
    expect(decimals).toBe(18)
  })
})
