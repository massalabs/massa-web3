import { account, Account } from '../../src'
import { MRC20 } from '../../src/contracts-wrappers'
import { provider } from './setup'

describe('Generic token wrapper tests', () => {
  let usdcContract: MRC20
  const USDC = 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL'

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

  test('balancesOf', async () => {
    const amounts = [1_000n, 2_000n]
    const recipientAddresses = [
      await (await Account.generate()).address.toString(),
      await (await Account.generate()).address.toString(),
    ]

    const b = await usdcContract.balancesOf(recipientAddresses)
    for (const { address, balance } of b) {
      expect(balance).toBe(0n)
    }

    const operation = await usdcContract.transfer(
      recipientAddresses[0],
      amounts[0]
    )

    const operation2 = await usdcContract.transfer(
      recipientAddresses[1],
      amounts[1]
    )
    await operation2.waitFinalExecution()

    const recipientBalance = await usdcContract.balancesOf(recipientAddresses)

    expect(recipientBalance[0].balance).toBe(amounts[0])
    expect(recipientBalance[0].address).toBe(recipientAddresses[0])
    expect(recipientBalance[1].balance).toBe(amounts[1])
    expect(recipientBalance[1].address).toBe(recipientAddresses[1])
  })
})
