import { WETHe } from '../../../src/contracts-wrappers'
import { mainnetProvider, provider as buildnetProvider } from './../setup'

describe('WETHe wrapper tests', () => {
  let mainnetContract: WETHe
  let buildnetContract: WETHe
  beforeAll(async () => {
    mainnetContract = await WETHe.fromProvider(mainnetProvider)
    buildnetContract = await WETHe.fromProvider(buildnetProvider)
  })

  // Mainnet tests
  test('version', async () => {
    const version = await mainnetContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await mainnetContract.name()
    expect(name).toBe('Wrapped Ether')
  })

  test('symbol', async () => {
    const symbol = await mainnetContract.symbol()
    expect(symbol).toBe('WETH.e')
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
    expect(name).toBe('sepolia WETH')
  })

  test('symbol', async () => {
    const symbol = await buildnetContract.symbol()
    expect(symbol).toBe('WETH.s')
  })

  test('decimals', async () => {
    const decimals = await buildnetContract.decimals()
    expect(decimals).toBe(18)
  })
})
