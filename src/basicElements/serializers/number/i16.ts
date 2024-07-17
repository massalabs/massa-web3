import { ONE } from '../../../utils'
import { numberToInteger, integerFromByte, integerToByte } from './integers'

export type I16 = bigint

export const SIZE_BYTE = 2
export const SIZE_BIT = 16
export const MIN = -(BigInt(ONE) << (BigInt(SIZE_BIT) - BigInt(ONE)))
export const MAX =
  (BigInt(ONE) << (BigInt(SIZE_BIT) - BigInt(ONE))) - BigInt(ONE)

/**
 * Converts an I16 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is out of range for I16
 */
export function toBytes(value: I16): Uint8Array {
  return integerToByte(SIZE_BIT, value, true)
}

/**
 * Converts bytes to an I16 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the I16 value.
 *
 * @param bytes - The bytes to convert
 * @returns The I16 representation of the bytes
 */
export function fromBytes(bytes: Uint8Array): I16 {
  return integerFromByte(SIZE_BIT, bytes, true)
}

/**
 * Converts an I16 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the I16 value (default: 0)
 * @returns The I16 representation of the bytes
 */
export function fromBuffer(
  buffer: Uint8Array,
  offset: number
): { value: I16; offset: number } {
  const value = integerFromByte(SIZE_BIT, buffer, true, offset)
  offset += SIZE_BYTE
  return { value, offset }
}

/**
 * Converts a number to an I16 value
 *
 * @param value - The number to convert
 * @returns The I16 representation of the number
 * @throws if the value is not a safe integer or out of range for I16
 */
export function fromNumber(value: number): I16 {
  return numberToInteger(SIZE_BIT, value, true)
}
