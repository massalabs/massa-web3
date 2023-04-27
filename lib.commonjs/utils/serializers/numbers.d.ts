/**
 * Converts a u8 in a Uint8Array.
 *
 * @param val - the number to convert
 */
export declare function u8toByte(val: number): Uint8Array;
/**
 * Converts a Uint8Array into a u8.
 *
 * @param arr - the array to convert
 */
export declare function byteToU8(arr: Uint8Array, offset?: number): number;
/**
 * Converts a u32 in a Uint8Array.
 *
 * @param val - the number to convert
 */
export declare function u32ToBytes(val: number): Uint8Array;
/**
 * Converts a Uint8Array into a u32.
 *
 * @param arr - the array to convert
 */
export declare function bytesToU32(arr: Uint8Array, offset?: number): number;
/**
 * Converts a u64 BigInt in a Uint8Array.
 *
 * @param val - the BigInt to convert
 */
export declare function u64ToBytes(val: bigint): Uint8Array;
/**
 * Converts a Uint8Array into a u64 BigInt.
 *
 * @param arr - the array to convert
 */
export declare function bytesToU64(arr: Uint8Array, offset?: number): bigint;
/**
 * Converts a i32 in a Uint8Array.
 *
 * @param val - the number to convert
 */
export declare function i32ToBytes(val: number): Uint8Array;
/**
 * Converts a Uint8Array into a i32.
 *
 * @param arr - the array to convert
 */
export declare function bytesToI32(arr: Uint8Array, offset?: number): number;
/**
 * Converts a i64 BigInt in a Uint8Array.
 *
 * @param val - the BigInt to convert
 */
export declare function i64ToBytes(val: bigint): Uint8Array;
/**
 * Converts a Uint8Array into a i64 BigInt.
 *
 * @param arr - the array to convert
 */
export declare function bytesToI64(arr: Uint8Array, offset?: number): bigint;
/**
 * Converts a f32 in a Uint8Array.
 *
 * @param val - the number to convert
 */
export declare function f32ToBytes(val: number): Uint8Array;
/**
 * Converts a Uint8Array into a f32.
 *
 * @param arr - the array to convert
 */
export declare function bytesToF32(arr: Uint8Array, offset?: number): number;
/**
 * Converts a f64 BigInt in a Uint8Array.
 *
 * @param val - the BigInt to convert
 */
export declare function f64ToBytes(val: number): Uint8Array;
/**
 * Converts a Uint8Array into a f64 BigInt.
 *
 * @param arr - the array to convert
 */
export declare function bytesToF64(arr: Uint8Array, offset?: number): number;
