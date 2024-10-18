import { DAIs } from '../../../src/contracts-wrappers'
import { provider } from './../setup'

describe('DAIs wrapper tests', () => {
  let contract: DAIs
  beforeAll(async () => {
    contract = new DAIs(provider)
  })

  test('version', async () => {
    const version = await contract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await contract.name()
    expect(name).toBe('Sepolia tDAI')
  })

  test('symbol', async () => {
    const symbol = await contract.symbol()
    expect(symbol).toBe('tDAI.s')
  })

  test('decimals', async () => {
    const decimals = await contract.decimals()
    expect(decimals).toBe(18)
  })
})
