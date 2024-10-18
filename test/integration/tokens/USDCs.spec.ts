import { USDCs } from '../../../src/contracts-wrappers'
import { provider } from './../setup'

describe('USDCs wrapper tests', () => {
  let contract: USDCs
  beforeAll(async () => {
    contract = new USDCs(provider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('Sepolia USDC')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('USDC.s')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(6)
  })
})
