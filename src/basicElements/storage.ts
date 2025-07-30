/* eslint-disable @typescript-eslint/no-magic-numbers */
import { strToBytes } from '.'
import { PublicProvider } from '../provider'
import { Mas, fromString } from './mas'

const ACCOUNT_SIZE_BYTES = 10

const STORAGE_BYTE_COST = fromString('0.0001')
const NEW_STORAGE_ENTRY_COST = 4n

/**
 * Calculates the cost of a given number of bytes.
 *
 * @param numberOfBytes - The number of bytes.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export function bytes(numberOfBytes: number): Mas {
  return BigInt(numberOfBytes) * STORAGE_BYTE_COST
}

/**
 * Calculates the cost of creating a new account.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export function account(): Mas {
  return bytes(ACCOUNT_SIZE_BYTES)
}

/**
 * Calculates the cost of deploying a smart contract.
 *
 * @remarks
 * The cost of deploying a smart contract includes the cost of creating a new account.
 *
 * @param numberOfBytes - The number of bytes of the smart contract.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export function smartContractDeploy(numberOfBytes: number): Mas {
  return bytes(numberOfBytes) + account()
}

/**
 * Compute the storage cost for a given key and value size based on the documentation at:
 * https://docs.massa.net/docs/learn/storage-costs
 * @param key- The key to store
 * @param value - The value to store
 * @returns the storage cost for the given key and value size
 */
export function datastoreEntry(
  key: Uint8Array | string,
  value: Uint8Array | string
): bigint {
  if (typeof key === 'string') {
    key = strToBytes(key)
  }
  if (typeof value === 'string') {
    value = strToBytes(value)
  }
  return (
    (BigInt(key.length) + BigInt(value.length) + NEW_STORAGE_ENTRY_COST) *
    STORAGE_BYTE_COST
  )
}

/**
 * Calculates the cost of creating a new MRC20 balance.
 *
 * @param provider - The provider to use.
 * @param recipient - The recipient of the balance.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export async function MRC20BalanceCreationCost(
  provider: PublicProvider,
  tokenAddress: string,
  recipient: string
): Promise<bigint> {
  let cost = 0n
  const balanceKeyPrefix = 'BALANCE'
  const balanceKey = balanceKeyPrefix + recipient
  const [actualRecipientBalance] = await provider.readStorage(
    tokenAddress,
    [balanceKey],
    false
  )

  if (!actualRecipientBalance) {
    // baseCost = NEW_LEDGER_ENTRY_COST = STORAGE_BYTE_COST * 4 = STORAGE_BYTE_COST * 4 = 400_000
    cost = 400_000n
    // keyCost =
    // LEDGER_COST_PER_BYTE * stringToBytes(BALANCE_KEY_PREFIX + receiver).length = STORAGE_BYTE_COST * (7 + receiver.length)
    cost += STORAGE_BYTE_COST * BigInt(7 + recipient.length)
    // valCost = LEDGER_COST_PER_BYTE * u256ToBytes(u256.Zero).length = STORAGE_BYTE_COST * 32 = 3_200_000
    cost += 3_200_000n
  }

  return cost
}
