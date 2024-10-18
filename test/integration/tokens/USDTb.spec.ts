import { USDTb } from '../../../src/contracts-wrappers'
import { mainnetProvider } from './../setup'

describe('USDTb wrapper tests', () => {
  let contract: USDTb
  beforeAll(async () => {
    contract = new USDTb(mainnetProvider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('Bsc USDT')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('USDT.b')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(18)
  })
})
