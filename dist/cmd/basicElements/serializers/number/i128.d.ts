export type I128 = bigint;
export declare const SIZE_BYTE = 16;
export declare const SIZE_BIT = 128;
export declare const MIN: bigint;
export declare const MAX: bigint;
/**
 * Converts an I128 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is out of range for I128
 */
export declare function toBytes(value: I128): Uint8Array;
/**
 * Converts bytes to an I128 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the I128 value.
 *
 * @param bytes - The bytes to convert
 * @returns The I128 representation of the bytes
 */
export declare function fromBytes(bytes: Uint8Array): I128;
/**
 * Converts an I128 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the I128 value (default: 0)
 * @returns The I128 representation of the bytes
 */
export declare function fromBuffer(buffer: Uint8Array, offset: number): {
    value: I128;
    offset: number;
};
/**
 * Converts a number to an I128 value
 *
 * @param value - The number to convert
 * @returns The I128 representation of the number
 * @throws if the value is not a safe integer or out of range for I128
 */
export declare function fromNumber(value: number | bigint): I128;
