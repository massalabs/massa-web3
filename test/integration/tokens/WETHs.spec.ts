import { WETHs } from '../../../src/contracts-wrappers'
import { provider } from './../setup'

describe('WETHs wrapper tests', () => {
  let contract: WETHs
  beforeAll(async () => {
    contract = new WETHs(provider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('sepolia WETH')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('WETH.s')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(18)
  })
})
