import { WETHb } from '../../../src/contracts-wrappers'
import { mainnetProvider } from './../setup'

describe('WETH.b wrapper tests', () => {
  let contract: WETHb
  beforeAll(async () => {
    contract = new WETHb(mainnetProvider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('Bsc ETH')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('WETH.b')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(18)
  })
})
