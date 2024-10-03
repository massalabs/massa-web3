export type I64 = bigint;
export declare const SIZE_BYTE = 8;
export declare const SIZE_BIT = 64;
export declare const MIN: bigint;
export declare const MAX: bigint;
/**
 * Converts an I64 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is out of range for I64
 */
export declare function toBytes(value: I64): Uint8Array;
/**
 * Converts bytes to an I64 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the I64 value.
 *
 * @param bytes - The bytes to convert
 * @returns The I64 representation of the bytes
 */
export declare function fromBytes(bytes: Uint8Array): I64;
/**
 * Converts an I64 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the I64 value (default: 0)
 * @returns The I64 representation of the bytes
 */
export declare function fromBuffer(buffer: Uint8Array, offset: number): {
    value: I64;
    offset: number;
};
/**
 * Converts a number to an I64 value
 *
 * @param value - The number to convert
 * @returns The I64 representation of the number
 * @throws if the value is not a safe integer or out of range for I64
 */
export declare function fromNumber(value: number | bigint): I64;
