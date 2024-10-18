import { USDCe } from '../../../src/contracts-wrappers'
import { mainnetProvider } from './../setup'

describe('USDCe wrapper tests', () => {
  let contract: USDCe
  beforeAll(async () => {
    contract = new USDCe(mainnetProvider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('USD Coin')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('USDC.e')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(6)
  })
})
