import { WETHe } from '../../../src/contracts-wrappers'
import { mainnetProvider } from './../setup'

describe('WETH.e wrapper tests', () => {
  let contract: WETHe
  beforeAll(async () => {
    contract = new WETHe(mainnetProvider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('Wrapped Ether')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('WETH.e')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(18)
  })
})
