import { U8 } from '.'
import { ONE } from '../../../utils'
import { numberToInteger, integerFromByte, integerToByte } from './integers'

export type U16 = bigint

export const SIZE_BYTE = 2
export const SIZE_BIT = SIZE_BYTE * U8.SIZE_BIT
export const MAX = (BigInt(ONE) << BigInt(SIZE_BIT)) - BigInt(ONE)

/**
 * Converts an U16 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is negative or too large for U16
 */
export function toBytes(value: U16): Uint8Array {
  return integerToByte(SIZE_BIT, value)
}

/**
 * Converts bytes to an U16 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the U8 value.
 *
 * @param bytes - The bytes to convert
 * @returns The U16 representation of the bytes
 */
export function fromBytes(bytes: Uint8Array): U16 {
  return integerFromByte(SIZE_BIT, bytes)
}

/**
 * Converts an U16 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the U16 value (default: 0)
 * @returns The U16 representation of the bytes
 */
export function fromBuffer(
  buffer: Uint8Array,
  offset: number
): { value: U16; offset: number } {
  const value = integerFromByte(SIZE_BIT, buffer, false, offset)
  offset += SIZE_BYTE
  return { value, offset }
}

/**
 * Converts a number to an U16 value
 *
 * @param value - The number to convert
 * @returns The U16 representation of the number
 * @throws if the value is not a safe integer, negative or too large for U16
 */
export function fromNumber(value: number): U16 {
  return numberToInteger(SIZE_BIT, value)
}
