import { Account } from '../../src'
import { MRC20BalanceCreationCost } from '../../src/basicElements/storage'
import { MRC20 } from '../../src/contracts-wrappers'
import { provider, publicProvider } from './setup'

describe('MRC20BalanceCreationCost Integration Tests', () => {
  // Test token addresses from the tokens configuration
  const TEST_TOKENS = {
    USDC: 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL', // USDCs on buildnet
    WMAS: 'AS12FW5Rs5YN2zdpEnqwj4iHUUPt9R4Eqjq2qtpJFNKW3mn33RuLU', // WMAS on buildnet
    DAI: 'AS12LpYyAjYRJfYhyu7fkrS224gMdvFHVEeVWoeHZzMdhis7UZ3Eb', // DAIs on buildnet
  }

  let testAccount: Account
  let testAccountAddress: string

  beforeAll(async () => {
    // Generate a test account for testing balance creation
    testAccount = await Account.generate()
    testAccountAddress = testAccount.address.toString()
  })

  describe('New balance creation cost calculation', () => {
    test('should calculate cost for new USDC balance', async () => {
      const cost = await MRC20BalanceCreationCost(
        provider,
        TEST_TOKENS.USDC,
        testAccountAddress
      )

      const expectedKeyCost = BigInt(7 + testAccountAddress.length) * 100_000n // STORAGE_BYTE_COST = 0.0001 = 100_000
      const expectedCost = 400_000n + expectedKeyCost + 3_200_000n

      expect(cost).toBe(expectedCost)
      expect(cost).toBeGreaterThan(0n)
    })

    test('should calculate cost for new WMAS balance', async () => {
      const cost = await MRC20BalanceCreationCost(
        provider,
        TEST_TOKENS.WMAS,
        testAccountAddress
      )

      const expectedKeyCost = BigInt(7 + testAccountAddress.length) * 100_000n
      const expectedCost = 400_000n + expectedKeyCost + 3_200_000n

      expect(cost).toBe(expectedCost)
      expect(cost).toBeGreaterThan(0n)
    })

    test('should calculate cost for new DAI balance', async () => {
      const cost = await MRC20BalanceCreationCost(
        provider,
        TEST_TOKENS.DAI,
        testAccountAddress
      )

      const expectedKeyCost = BigInt(7 + testAccountAddress.length) * 100_000n
      const expectedCost = 400_000n + expectedKeyCost + 3_200_000n

      expect(cost).toBe(expectedCost)
      expect(cost).toBeGreaterThan(0n)
    })
  })
  describe('Existing balance cost calculation', () => {
    test('should return zero cost for existing balance', async () => {
      // First, create a balance by transferring some tokens
      const usdcContract = new MRC20(provider, TEST_TOKENS.USDC)
      const transferAmount = 1n

      // Transfer tokens to create a balance entry
      const operation = await usdcContract.transfer(
        testAccountAddress,
        transferAmount
      )
      await operation.waitSpeculativeExecution()

      // Now check the cost - should be 0 since balance already exists
      const cost = await MRC20BalanceCreationCost(
        provider,
        TEST_TOKENS.USDC,
        testAccountAddress
      )

      expect(cost).toBe(0n)
    })
  })
})
