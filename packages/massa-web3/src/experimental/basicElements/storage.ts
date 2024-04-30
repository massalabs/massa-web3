import { toNanoMas } from '../utils'

const BYTE_COST_MASSA = 0.0001

// TODO: replace with a U32 helper
const U32_SIZE_BYTES = 4

/**
 * Calculates the cost of a given number of bytes.
 *
 * @param numberOfBytes - The number of bytes.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export function bytes(numberOfBytes: number): bigint {
  return BigInt(numberOfBytes) * toNanoMas(BYTE_COST_MASSA)
}

/**
 * Calculates the cost of creating a new account.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export function account(): bigint {
  return toNanoMas(BYTE_COST_MASSA)
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
export function smartContract(numberOfBytes: number): bigint {
  return bytes(numberOfBytes) + account()
}

/**
 * Calculates the cost of creating a new entry in the datastore.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export function newEntry(): bigint {
  return bytes(U32_SIZE_BYTES)
}
