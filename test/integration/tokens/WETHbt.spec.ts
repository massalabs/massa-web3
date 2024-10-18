import { WETHbt } from '../../../src/contracts-wrappers'
import { provider } from './../setup'

describe('WETHbt wrapper tests', () => {
  let contract: WETHbt
  beforeAll(async () => {
    contract = new WETHbt(provider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('bsc testnet WETH')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('WETH.bt')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(18)
  })
})
