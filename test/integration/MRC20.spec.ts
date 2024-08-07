import { MRC20 } from '../../src/contracts-wrappers'
import { provider } from './setup'

const USDC = 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL'

let usdcContract: MRC20

describe('Token wrapper tests', () => {
  beforeAll(async () => {
    usdcContract = new MRC20(provider, USDC)
  })

  test('transfer', async () => {
    const amount = 1_000n
    const balance = await usdcContract.balanceOf(provider.address)

    const operation = await usdcContract.transfer(
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
      amount
    )
    await operation.waitSpeculativeExecution()

    const newBalance = await usdcContract.balanceOf(provider.address)
    expect(newBalance).toBe(balance - amount)
  })
})
