import { numberToInteger, integerFromByte, integerToByte } from './integers'

//eslint-disable-next-line @typescript-eslint/naming-convention
export type I32_t = bigint

export const SIZE_BYTE = 4
export const SIZE_BIT = 32
export const MIN = -(1n << (BigInt(SIZE_BIT) - 1n))
export const MAX = (1n << (BigInt(SIZE_BIT) - 1n)) - 1n

/**
 * Converts an I32 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is out of range for I32
 */
export function toBytes(value: I32_t): Uint8Array {
  return integerToByte(SIZE_BIT, value, true)
}

/**
 * Converts bytes to an I32 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the I32 value.
 *
 * @param bytes - The bytes to convert
 * @returns The I32 representation of the bytes
 */
export function fromBytes(bytes: Uint8Array): I32_t {
  return integerFromByte(SIZE_BIT, bytes, true)
}

/**
 * Converts an I32 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the I32 value (default: 0)
 * @returns The I32 representation of the bytes
 */
export function fromBuffer(
  buffer: Uint8Array,
  offset: number
): { value: I32_t; offset: number } {
  const value = integerFromByte(SIZE_BIT, buffer, true, offset)
  offset += SIZE_BYTE
  return { value, offset }
}

/**
 * Converts a number to an I32 value
 *
 * @param value - The number to convert
 * @returns The I32 representation of the number
 * @throws if the value is not a safe integer or out of range for I32
 */
export function fromNumber(value: number): I32_t {
  return numberToInteger(SIZE_BIT, value, true)
}
