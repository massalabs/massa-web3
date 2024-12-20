import { numberToInteger, integerFromByte, integerToByte } from './integers'

//eslint-disable-next-line @typescript-eslint/naming-convention
export type I128_t = bigint

export const SIZE_BYTE = 16
export const SIZE_BIT = 128
export const MIN = -(1n << (BigInt(SIZE_BIT) - 1n))
export const MAX = (1n << (BigInt(SIZE_BIT) - 1n)) - 1n

/**
 * Converts an I128 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is out of range for I128
 */
export function toBytes(value: I128_t): Uint8Array {
  return integerToByte(SIZE_BIT, value, true)
}

/**
 * Converts bytes to an I128 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the I128 value.
 *
 * @param bytes - The bytes to convert
 * @returns The I128 representation of the bytes
 */
export function fromBytes(bytes: Uint8Array): I128_t {
  return integerFromByte(SIZE_BIT, bytes, true)
}

/**
 * Converts an I128 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the I128 value (default: 0)
 * @returns The I128 representation of the bytes
 */
export function fromBuffer(
  buffer: Uint8Array,
  offset: number
): { value: I128_t; offset: number } {
  const value = integerFromByte(SIZE_BIT, buffer, true, offset)
  offset += SIZE_BYTE
  return { value, offset }
}

/**
 * Converts a number to an I128 value
 *
 * @param value - The number to convert
 * @returns The I128 representation of the number
 * @throws if the value is not a safe integer or out of range for I128
 */
export function fromNumber(value: number | bigint): I128_t {
  return numberToInteger(SIZE_BIT, value, true)
}
