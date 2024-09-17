export type U128 = bigint;
export declare const SIZE_BYTE = 16;
export declare const SIZE_BIT: number;
export declare const MAX: bigint;
/**
 * Converts an U128 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is negative or too large for U128
 */
export declare function toBytes(value: U128): Uint8Array;
/**
 * Converts bytes to an U128 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the U8 value.
 *
 * @param bytes - The bytes to convert
 * @returns The U128 representation of the bytes
 */
export declare function fromBytes(bytes: Uint8Array): U128;
/**
 * Converts an U128 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the U128 value (default: 0)
 * @returns The U128 representation of the bytes
 */
export declare function fromBuffer(buffer: Uint8Array, offset: number): {
    value: U128;
    offset: number;
};
/**
 * Converts a number to an U128 value
 *
 * @param value - The number to convert
 * @returns The U128 representation of the number
 * @throws if the value is not a safe integer, negative or too large for U128
 */
export declare function fromNumber(value: number | bigint): U128;
