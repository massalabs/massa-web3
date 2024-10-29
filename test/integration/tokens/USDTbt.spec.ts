import { USDTbt } from '../../../src/contracts-wrappers'
import { provider } from './../setup'

describe('USDTbt wrapper tests', () => {
  let contract: USDTbt
  beforeAll(async () => {
    contract = new USDTbt(provider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('Binance-peg USD')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('USDT.bt')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(18)
  })
})
