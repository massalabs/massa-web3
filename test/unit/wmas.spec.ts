import {
  CHAIN_ID,
  MRC20BalanceCreationCost,
  Provider,
  U256,
  WMAS,
} from '../../src'

const CALLER = 'AU12dG5xP1RDEB5ocdHkymNVvvSJmUL9BgHwCksDowqmGWxfpm93x'

function wmasWithBalanceEntry(balanceEntry: Uint8Array | null): {
  wmas: WMAS
  provider: Provider
  callSC: jest.Mock
} {
  const callSC = jest.fn().mockResolvedValue({})
  const provider = {
    address: CALLER,
    callSC,
    readStorage: jest.fn().mockResolvedValue([balanceEntry]),
    networkInfos: jest.fn().mockResolvedValue({ chainId: CHAIN_ID.Mainnet }),
  } as unknown as Provider
  return { wmas: new WMAS(provider), provider, callSC }
}

describe('WMAS.wrap', () => {
  const amount = 1_000_000_000n

  it('sends the balance entry storage cost when the caller has no balance yet', async () => {
    const { wmas, provider, callSC } = wmasWithBalanceEntry(null)

    await wmas.wrap(amount)

    const storageCost = await MRC20BalanceCreationCost(
      provider,
      wmas.address,
      CALLER
    )
    expect(storageCost).toBeGreaterThan(0n)
    expect(provider.readStorage).toHaveBeenCalledWith(
      wmas.address,
      [`BALANCE${CALLER}`],
      false
    )
    expect(callSC).toHaveBeenCalledWith(
      expect.objectContaining({
        func: 'deposit',
        coins: amount + storageCost,
      })
    )
  })

  it('sends only the amount when the caller already has a balance', async () => {
    const { wmas, callSC } = wmasWithBalanceEntry(U256.toBytes(1n))

    await wmas.wrap(amount)

    expect(callSC).toHaveBeenCalledWith(
      expect.objectContaining({ func: 'deposit', coins: amount })
    )
  })
})
