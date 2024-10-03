/**
 * This module aim's to provide number variable types serialization and conversion helper functions.
 */
import { U32, U64 } from '.';
/**
 * Converts a 32-bit floating-point number (f32) into a Uint8Array.
 *
 * @param val - The number to convert
 *
 * @returns A Uint8Array containing the serialized f32 value
 *
 */
export function f32ToBytes(val) {
    const buffer = new ArrayBuffer(U32.SIZE_BYTE);
    const view = new DataView(buffer);
    view.setFloat32(0, val, true);
    return new Uint8Array(view.buffer);
}
/**
 * Converts a Uint8Array into a 32-bit floating-point number (f32).
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the f32 value (default: 0)
 *
 * @returns The deserialized f32 value
 *
 */
export function bytesToF32(arr, offset = 0) {
    const view = new DataView(arr.buffer);
    return view.getFloat32(offset, true);
}
/**
 * Converts a 64-bit floating-point number (f64) into a Uint8Array.
 *
 * @param val - The BigInt to convert
 *
 * @returns A Uint8Array containing the serialized f64 value
 *
 */
export function f64ToBytes(val) {
    const buffer = new ArrayBuffer(U64.SIZE_BYTE);
    const view = new DataView(buffer);
    view.setFloat64(0, val, true);
    return new Uint8Array(view.buffer);
}
/**
 * Converts a Uint8Array into a f64 BigInt.
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the f64 value (default: 0)
 *
 * @returns The deserialized f64 value
 *
 */
export function bytesToF64(arr, offset = 0) {
    const view = new DataView(arr.buffer);
    return view.getFloat64(offset, true);
}
//# sourceMappingURL=numbers.js.map