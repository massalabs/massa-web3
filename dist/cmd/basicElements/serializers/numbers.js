"use strict";
/**
 * This module aim's to provide number variable types serialization and conversion helper functions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesToF64 = exports.f64ToBytes = exports.bytesToF32 = exports.f32ToBytes = void 0;
const _1 = require(".");
/**
 * Converts a 32-bit floating-point number (f32) into a Uint8Array.
 *
 * @param val - The number to convert
 *
 * @returns A Uint8Array containing the serialized f32 value
 *
 */
function f32ToBytes(val) {
    const buffer = new ArrayBuffer(_1.U32.SIZE_BYTE);
    const view = new DataView(buffer);
    view.setFloat32(0, val, true);
    return new Uint8Array(view.buffer);
}
exports.f32ToBytes = f32ToBytes;
/**
 * Converts a Uint8Array into a 32-bit floating-point number (f32).
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the f32 value (default: 0)
 *
 * @returns The deserialized f32 value
 *
 */
function bytesToF32(arr, offset = 0) {
    const view = new DataView(arr.buffer);
    return view.getFloat32(offset, true);
}
exports.bytesToF32 = bytesToF32;
/**
 * Converts a 64-bit floating-point number (f64) into a Uint8Array.
 *
 * @param val - The BigInt to convert
 *
 * @returns A Uint8Array containing the serialized f64 value
 *
 */
function f64ToBytes(val) {
    const buffer = new ArrayBuffer(_1.U64.SIZE_BYTE);
    const view = new DataView(buffer);
    view.setFloat64(0, val, true);
    return new Uint8Array(view.buffer);
}
exports.f64ToBytes = f64ToBytes;
/**
 * Converts a Uint8Array into a f64 BigInt.
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the f64 value (default: 0)
 *
 * @returns The deserialized f64 value
 *
 */
function bytesToF64(arr, offset = 0) {
    const view = new DataView(arr.buffer);
    return view.getFloat64(offset, true);
}
exports.bytesToF64 = bytesToF64;
//# sourceMappingURL=numbers.js.map