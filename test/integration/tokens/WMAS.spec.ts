import { WMAS } from '../../../src/contracts-wrappers'
import { mainnetProvider, provider as buildnetProvider } from './../setup'

describe('WMAS wrapper tests', () => {
  let mainnetContract: WMAS
  let buildnetContract: WMAS
  beforeAll(async () => {
    mainnetContract = await WMAS.fromProvider(mainnetProvider)
    buildnetContract = await WMAS.fromProvider(buildnetProvider)
  })

  // Mainnet tests
  test('version', async () => {
    const version = await mainnetContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await mainnetContract.name()
    expect(name).toBe('Wrapped Massa')
  })

  test('symbol', async () => {
    const symbol = await mainnetContract.symbol()
    expect(symbol).toBe('WMAS')
  })

  test('decimals', async () => {
    const decimals = await mainnetContract.decimals()
    expect(decimals).toBe(9)
  })

  // Buildnet tests
  test('version', async () => {
    const version = await buildnetContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await buildnetContract.name()
    expect(name).toBe('Wrapped Massa')
  })

  test('symbol', async () => {
    const symbol = await buildnetContract.symbol()
    expect(symbol).toBe('WMAS')
  })

  test('decimals', async () => {
    const decimals = await buildnetContract.decimals()
    expect(decimals).toBe(9)
  })
})
