/**
 * This module aim's to provide number variable types serialization and conversion helper functions.
 */
/**
 * Converts a 32-bit floating-point number (f32) into a Uint8Array.
 *
 * @param val - The number to convert
 *
 * @returns A Uint8Array containing the serialized f32 value
 *
 */
export declare function f32ToBytes(val: number): Uint8Array;
/**
 * Converts a Uint8Array into a 32-bit floating-point number (f32).
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the f32 value (default: 0)
 *
 * @returns The deserialized f32 value
 *
 */
export declare function bytesToF32(arr: Uint8Array, offset?: number): number;
/**
 * Converts a 64-bit floating-point number (f64) into a Uint8Array.
 *
 * @param val - The BigInt to convert
 *
 * @returns A Uint8Array containing the serialized f64 value
 *
 */
export declare function f64ToBytes(val: number): Uint8Array;
/**
 * Converts a Uint8Array into a f64 BigInt.
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the f64 value (default: 0)
 *
 * @returns The deserialized f64 value
 *
 */
export declare function bytesToF64(arr: Uint8Array, offset?: number): number;
