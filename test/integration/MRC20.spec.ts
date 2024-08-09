import { MRC20 } from '../../src/contracts-wrappers'
import { provider } from './setup'

const USDC = 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL'

let usdcContract: MRC20

describe('Token wrapper tests', () => {
  beforeAll(async () => {
    usdcContract = new MRC20(provider, USDC)
  })

  test('version', async () => {
    const version = await usdcContract.version()
    expect(version).toBe('0.0.1')
  })

  test('name', async () => {
    const name = await usdcContract.name()
    expect(name).toBe('Sepolia USDC')
  })

  test('symbol', async () => {
    const symbol = await usdcContract.symbol()
    expect(symbol).toBe('USDC.s')
  })

  test('decimals', async () => {
    const decimals = await usdcContract.decimals()
    expect(decimals).toBe(6)
  })

  test('totalSupply', async () => {
    const totalSupply = await usdcContract.totalSupply()
    expect(totalSupply).toBeGreaterThan(0n)
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

  test('allowance', async () => {
    const previousAllowance = await usdcContract.allowance(
      provider.address,
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
    )

    const amount = 123_000_000n
    let operation = await usdcContract.increaseAllowance(
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
      amount
    )
    await operation.waitSpeculativeExecution()

    let newAllowance = await usdcContract.allowance(
      provider.address,
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
    )

    expect(newAllowance).toBe(previousAllowance + amount)

    operation = await usdcContract.decreaseAllowance(
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
      amount
    )
    await operation.waitSpeculativeExecution()

    newAllowance = await usdcContract.allowance(
      provider.address,
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
    )
    expect(newAllowance).toBe(previousAllowance)
  })
})
