export type U256 = bigint;
export declare const SIZE_BYTE = 32;
export declare const SIZE_BIT: number;
export declare const MAX: bigint;
/**
 * Converts a U256 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is negative or too large for U256
 */
export declare function toBytes(value: U256): Uint8Array;
/**
 * Converts bytes to a U256 value
 *
 * @param bytes - The bytes to convert
 * @returns The U256 representation of the bytes
 */
export declare function fromBytes(bytes: Uint8Array): U256;
/**
 * Converts a U256 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the U256 value (default: 0)
 * @returns The U256 representation of the bytes
 */
export declare function fromBuffer(buffer: Uint8Array, offset: number): {
    value: U256;
    offset: number;
};
/**
 * Converts a number to a U256 value
 *
 * @param value - The number to convert
 * @returns The U256 representation of the number
 * @throws if the value is not a safe integer, negative or too large for U256
 */
export declare function fromNumber(value: number | bigint): U256;
