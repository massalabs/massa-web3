import { PUR } from '../../../src/contracts-wrappers'
import { mainnetProvider } from './../setup'

describe('PUR wrapper tests', () => {
  let contract: PUR
  beforeAll(async () => {
    contract = new PUR(mainnetProvider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('Purrfect Universe')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('PUR')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(18)
  })
})
