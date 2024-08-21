import { U8 } from '.'
import { numberToInteger, integerFromByte, integerToByte } from './integers'

export type U256 = bigint

export const SIZE_BYTE = 32
export const SIZE_BIT = SIZE_BYTE * U8.SIZE_BIT
export const MAX = (1n << BigInt(SIZE_BIT)) - 1n

/**
 * Converts a U256 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is negative or too large for U256
 */
export function toBytes(value: U256): Uint8Array {
  return integerToByte(SIZE_BIT, value)
}

/**
 * Converts bytes to a U256 value
 *
 * @param bytes - The bytes to convert
 * @returns The U256 representation of the bytes
 */
export function fromBytes(bytes: Uint8Array): U256 {
  return integerFromByte(SIZE_BIT, bytes)
}

/**
 * Converts a U256 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the U256 value (default: 0)
 * @returns The U256 representation of the bytes
 */
export function fromBuffer(
  buffer: Uint8Array,
  offset: number
): { value: U256; offset: number } {
  const value = integerFromByte(SIZE_BIT, buffer, false, offset)
  offset += SIZE_BYTE
  return { value, offset }
}

/**
 * Converts a number to a U256 value
 *
 * @param value - The number to convert
 * @returns The U256 representation of the number
 * @throws if the value is not a safe integer, negative or too large for U256
 */
export function fromNumber(value: number | bigint): U256 {
  return numberToInteger(SIZE_BIT, value)
}
