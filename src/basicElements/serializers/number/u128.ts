import { U8 } from '.'
import { numberToInteger, integerFromByte, integerToByte } from './integers'

export type U128 = bigint

export const SIZE_BYTE = 16
export const SIZE_BIT = SIZE_BYTE * U8.SIZE_BIT
export const MAX = (1n << BigInt(SIZE_BIT)) - 1n

/**
 * Converts an U128 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is negative or too large for U128
 */
export function toBytes(value: U128): Uint8Array {
  return integerToByte(SIZE_BIT, value)
}

/**
 * Converts bytes to an U128 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the U8 value.
 *
 * @param bytes - The bytes to convert
 * @returns The U128 representation of the bytes
 */
export function fromBytes(bytes: Uint8Array): U128 {
  return integerFromByte(SIZE_BIT, bytes)
}

/**
 * Converts an U128 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the U128 value (default: 0)
 * @returns The U128 representation of the bytes
 */
export function fromBuffer(
  buffer: Uint8Array,
  offset: number
): { value: U128; offset: number } {
  const value = integerFromByte(SIZE_BIT, buffer, false, offset)
  offset += SIZE_BYTE
  return { value, offset }
}

/**
 * Converts a number to an U128 value
 *
 * @param value - The number to convert
 * @returns The U128 representation of the number
 * @throws if the value is not a safe integer, negative or too large for U128
 */
export function fromNumber(value: number | bigint): U128 {
  return numberToInteger(SIZE_BIT, value)
}
