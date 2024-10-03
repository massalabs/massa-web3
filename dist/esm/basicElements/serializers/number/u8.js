import { numberToInteger, integerFromByte, integerToByte } from './integers';
export const SIZE_BYTE = 1;
export const SIZE_BIT = 8;
export const MAX = (1n << BigInt(SIZE_BIT)) - 1n;
/**
 * Converts an U8 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is negative or too large for U8
 */
export function toBytes(value) {
    return integerToByte(SIZE_BIT, value);
}
/**
 * Converts bytes to an U8 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the U8 value.
 *
 * @param bytes - The bytes to convert
 * @returns The U8 representation of the bytes
 */
export function fromBytes(bytes) {
    return integerFromByte(SIZE_BIT, bytes);
}
/**
 * Converts an U8 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the U8 value (default: 0)
 * @returns The U8 representation of the bytes
 */
export function fromBuffer(buffer, offset) {
    const value = integerFromByte(SIZE_BIT, buffer, false, offset);
    offset += SIZE_BYTE;
    return { value, offset };
}
/**
 * Converts a number to an U8 value
 *
 * @param value - The number to convert
 * @returns The U8 representation of the number
 * @throws if the value is not a safe integer, negative or too large for U8
 */
export function fromNumber(value) {
    return numberToInteger(SIZE_BIT, value);
}
//# sourceMappingURL=u8.js.map