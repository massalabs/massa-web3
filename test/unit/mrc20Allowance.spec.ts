import { MRC20, Provider, StorageCost, U256 } from '../../src'

const TOKEN = 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL'
const OWNER = 'AU12dG5xP1RDEB5ocdHkymNVvvSJmUL9BgHwCksDowqmGWxfpm93x'
const SPENDER = 'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
const ALLOWANCE_KEY = `ALLOWANCE${OWNER}${SPENDER}`

function tokenWithAllowanceEntry(allowanceEntry: Uint8Array | null): {
  token: MRC20
  provider: Provider
  callSC: jest.Mock
} {
  const callSC = jest.fn().mockResolvedValue({})
  const provider = {
    address: OWNER,
    callSC,
    readStorage: jest.fn().mockResolvedValue([allowanceEntry]),
  } as unknown as Provider
  return { token: new MRC20(provider, TOKEN), provider, callSC }
}

describe('MRC20.increaseAllowance', () => {
  const amount = 1_000n

  it('sends the allowance entry storage cost when the entry does not exist', async () => {
    const { token, provider, callSC } = tokenWithAllowanceEntry(null)

    await token.increaseAllowance(SPENDER, amount)

    expect(provider.readStorage).toHaveBeenCalledWith(
      TOKEN,
      [ALLOWANCE_KEY],
      false
    )
    expect(callSC).toHaveBeenCalledWith(
      expect.objectContaining({
        func: 'increaseAllowance',
        coins: StorageCost.datastoreEntry(ALLOWANCE_KEY, new Uint8Array(32)),
      })
    )
  })

  it('sends no coins when the allowance entry already exists', async () => {
    const { token, callSC } = tokenWithAllowanceEntry(U256.toBytes(1n))

    await token.increaseAllowance(SPENDER, amount)

    expect(callSC).toHaveBeenCalledWith(
      expect.objectContaining({ func: 'increaseAllowance', coins: 0n })
    )
  })

  it('keeps the coins provided by the caller', async () => {
    const { token, provider, callSC } = tokenWithAllowanceEntry(null)

    await token.increaseAllowance(SPENDER, amount, { coins: 42n })

    expect(provider.readStorage).not.toHaveBeenCalled()
    expect(callSC).toHaveBeenCalledWith(
      expect.objectContaining({ func: 'increaseAllowance', coins: 42n })
    )
  })
})
