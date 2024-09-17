import { numberToInteger, integerFromByte, integerToByte } from './integers';
export const SIZE_BYTE = 8;
export const SIZE_BIT = 64;
export const MIN = -(1n << (BigInt(SIZE_BIT) - 1n));
export const MAX = (1n << (BigInt(SIZE_BIT) - 1n)) - 1n;
/**
 * Converts an I64 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is out of range for I64
 */
export function toBytes(value) {
    return integerToByte(SIZE_BIT, value, true);
}
/**
 * Converts bytes to an I64 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the I64 value.
 *
 * @param bytes - The bytes to convert
 * @returns The I64 representation of the bytes
 */
export function fromBytes(bytes) {
    return integerFromByte(SIZE_BIT, bytes, true);
}
/**
 * Converts an I64 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the I64 value (default: 0)
 * @returns The I64 representation of the bytes
 */
export function fromBuffer(buffer, offset) {
    const value = integerFromByte(SIZE_BIT, buffer, true, offset);
    offset += SIZE_BYTE;
    return { value, offset };
}
/**
 * Converts a number to an I64 value
 *
 * @param value - The number to convert
 * @returns The I64 representation of the number
 * @throws if the value is not a safe integer or out of range for I64
 */
export function fromNumber(value) {
    return numberToInteger(SIZE_BIT, value, true);
}
//# sourceMappingURL=i64.js.map