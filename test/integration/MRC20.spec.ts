import { MRC20 } from '../../src/contracts-wrappers'
import { provider } from './setup'

const USDC = 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL'

let usdcContract: MRC20

describe('Token wrapper tests', () => {
  beforeAll(async () => {
    usdcContract = new MRC20(provider, USDC)
  })

  test('balanceOf', async () => {
    const balance = await usdcContract.balanceOf(provider.address)
    expect(balance).toBeGreaterThan(0n)
  })
})
