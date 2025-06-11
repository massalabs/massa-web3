import { DAIe } from '../../../src/contracts-wrappers'
import { mainnetProvider, provider as buildnetProvider } from './../setup'

describe('DAIe wrapper tests', () => {
  let mainnetContract: DAIe
  let buildnetContract: DAIe
  beforeAll(async () => {
    mainnetContract = await DAIe.fromProvider(mainnetProvider)
    buildnetContract = await DAIe.fromProvider(buildnetProvider)
  })

  // Mainnet tests
  test('version', async () => {
    const version = await mainnetContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await mainnetContract.name()
    expect(name).toBe('Dai Stablecoin')
  })

  test('symbol', async () => {
    const symbol = await mainnetContract.symbol()
    expect(symbol).toBe('DAI.e')
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
    expect(name).toBe('Sepolia tDAI')
  })

  test('symbol', async () => {
    const symbol = await buildnetContract.symbol()
    expect(symbol).toBe('tDAI.s')
  })

  test('decimals', async () => {
    const decimals = await buildnetContract.decimals()
    expect(decimals).toBe(18)
  })
})
