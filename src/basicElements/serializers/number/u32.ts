import { U8 } from '.'
import { numberToInteger, integerFromByte, integerToByte } from './integers'

//eslint-disable-next-line @typescript-eslint/naming-convention
export type U32_t = bigint

export const SIZE_BYTE = 4
export const SIZE_BIT = SIZE_BYTE * U8.SIZE_BIT
export const MAX = (1n << BigInt(SIZE_BIT)) - 1n

/**
 * Converts an U32 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is negative or too large for U32
 */
export function toBytes(value: U32_t): Uint8Array {
  return integerToByte(SIZE_BIT, value)
}

/**
 * Converts bytes to an U32 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the U8 value.
 *
 * @param bytes - The bytes to convert
 * @returns The U32 representation of the bytes
 */
export function fromBytes(bytes: Uint8Array): U32_t {
  return integerFromByte(SIZE_BIT, bytes)
}

/**
 * Converts an U32 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the U32 value (default: 0)
 * @returns The U32 representation of the bytes
 */
export function fromBuffer(
  buffer: Uint8Array,
  offset: number
): { value: U32_t; offset: number } {
  const value = integerFromByte(SIZE_BIT, buffer, false, offset)
  offset += SIZE_BYTE
  return { value, offset }
}

/**
 * Converts a number to an U32 value
 *
 * @param value - The number to convert
 * @returns The U32 representation of the number
 * @throws if the value is not a safe integer, negative or too large for U32
 */
export function fromNumber(value: number): U32_t {
  return numberToInteger(SIZE_BIT, value)
}
