import { ONE } from '../../../utils'
import { numberToInteger, integerFromByte, integerToByte } from './integers'

export type I256 = bigint

export const SIZE_BYTE = 32
export const SIZE_BIT = 256
export const MIN = -(BigInt(ONE) << (BigInt(SIZE_BIT) - BigInt(ONE)))
export const MAX =
  (BigInt(ONE) << (BigInt(SIZE_BIT) - BigInt(ONE))) - BigInt(ONE)

/**
 * Converts an I256 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is out of range for I256
 */
export function toBytes(value: I256): Uint8Array {
  return integerToByte(SIZE_BIT, value, true)
}

/**
 * Converts bytes to an I256 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the I256 value.
 *
 * @param bytes - The bytes to convert
 * @returns The I256 representation of the bytes
 */
export function fromBytes(bytes: Uint8Array): I256 {
  return integerFromByte(SIZE_BIT, bytes, true)
}

/**
 * Converts an I256 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the I256 value (default: 0)
 * @returns The I256 representation of the bytes
 */
export function fromBuffer(
  buffer: Uint8Array,
  offset: number
): { value: I256; offset: number } {
  const value = integerFromByte(SIZE_BIT, buffer, true, offset)
  offset += SIZE_BYTE
  return { value, offset }
}

/**
 * Converts a number to an I256 value
 *
 * @param value - The number to convert
 * @returns The I256 representation of the number
 * @throws if the value is not a safe integer or out of range for I256
 */
export function fromNumber(value: number | bigint): I256 {
  return numberToInteger(SIZE_BIT, value, true)
}
