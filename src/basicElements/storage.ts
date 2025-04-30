import { strToBytes } from '.'
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
