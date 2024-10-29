import { DAIe } from '../../../src/contracts-wrappers'
import { mainnetProvider } from './../setup'

describe('DAIe wrapper tests', () => {
  let contract: DAIe
  beforeAll(async () => {
    contract = new DAIe(mainnetProvider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('Dai Stablecoin')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('DAI.e')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(18)
  })
})
