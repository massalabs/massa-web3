import { Account } from '../../../src'
import { WMAS } from '../../../src/contracts-wrappers'
import { OperationStatus } from '../../../src/operation'
import { Provider } from '../../../src/provider'
import { mainnetProvider, provider as buildnetProvider } from './../setup'

// TODO: remove once MIP-0002 is active on both mainnet and buildnet, and expect '0.1.0' everywhere.
// MIP-0002 replaces the WMAS bytecode with a patched MRC20 0.1.0 build, and activates on buildnet
// and mainnet at different dates, so the expected version depends on the network state.
async function expectedWmasVersion(provider: Provider): Promise<string> {
  const { currentMipVersion } = await provider.getNodeStatus()
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  return (currentMipVersion ?? 0) >= 2 ? '0.1.0' : '0.0.1'
}

describe('WMAS wrapper tests', () => {
  let mainnetContract: WMAS
  let buildnetContract: WMAS
  beforeAll(async () => {
    mainnetContract = await WMAS.fromProvider(mainnetProvider)
    buildnetContract = await WMAS.fromProvider(buildnetProvider)
  })

  // Mainnet tests
  test('version', async () => {
    const version = await mainnetContract.version()
    expect(version).toBe(await expectedWmasVersion(mainnetProvider))
  })

  test('name', async () => {
    const name = await mainnetContract.name()
    expect(name).toBe('Wrapped Massa')
  })

  test('symbol', async () => {
    const symbol = await mainnetContract.symbol()
    expect(symbol).toBe('WMAS')
  })

  test('decimals', async () => {
    const decimals = await mainnetContract.decimals()
    expect(decimals).toBe(9)
  })

  // Buildnet tests
  test('version', async () => {
    const version = await buildnetContract.version()
    expect(version).toBe(await expectedWmasVersion(buildnetProvider))
  })

  test('name', async () => {
    const name = await buildnetContract.name()
    expect(name).toBe('Wrapped Massa')
  })

  test('symbol', async () => {
    const symbol = await buildnetContract.symbol()
    expect(symbol).toBe('WMAS')
  })

  test('decimals', async () => {
    const decimals = await buildnetContract.decimals()
    expect(decimals).toBe(9)
  })

  test('increaseAllowance to a new spender', async () => {
    // Creates a new allowance entry: once MIP-0002 is active, the patched WMAS reverts unless the
    // caller pays for its storage, which increaseAllowance does by default.
    const spender = (await Account.generate()).address.toString()

    const operation = await buildnetContract.increaseAllowance(spender, 1n)

    expect(await operation.waitSpeculativeExecution()).toBe(
      OperationStatus.SpeculativeSuccess
    )
    expect(
      await buildnetContract.allowance(buildnetProvider.address, spender)
    ).toBe(1n)
  })
})
