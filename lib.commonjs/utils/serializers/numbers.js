"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesToF64 = exports.f64ToBytes = exports.bytesToF32 = exports.f32ToBytes = exports.bytesToI64 = exports.i64ToBytes = exports.bytesToI32 = exports.i32ToBytes = exports.bytesToU64 = exports.u64ToBytes = exports.bytesToU32 = exports.u32ToBytes = exports.byteToU8 = exports.u8toByte = void 0;
const U8_MAX = 0xff;
const U32_MAX = 0xffffffff;
const U64_MAX = BigInt('0xffffffffffffffff');
const I32_MIN = -0x80000000;
const I32_MAX = 0x7fffffff;
const I64_MIN = BigInt('-9223372036854775808');
const I64_MAX = BigInt('0x7fffffffffffffff');
/**
 * Converts a u8 in a Uint8Array.
 *
 * @param val - the number to convert
 */
function u8toByte(val) {
    if (val < 0 || val > U8_MAX) {
        throw new Error(`Unable to serialize invalid Uint8 value ${val}`);
    }
    return new Uint8Array([val]);
}
exports.u8toByte = u8toByte;
/**
 * Converts a Uint8Array into a u8.
 *
 * @param arr - the array to convert
 */
function byteToU8(arr, offset = 0) {
    return arr[offset];
}
exports.byteToU8 = byteToU8;
/**
 * Converts a u32 in a Uint8Array.
 *
 * @param val - the number to convert
 */
function u32ToBytes(val) {
    if (val < 0 || val > U32_MAX) {
        throw new Error(`Unable to serialize invalid Uint32 value ${val}`);
    }
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, val, true);
    return new Uint8Array(view.buffer);
}
exports.u32ToBytes = u32ToBytes;
/**
 * Converts a Uint8Array into a u32.
 *
 * @param arr - the array to convert
 */
function bytesToU32(arr, offset = 0) {
    const view = new DataView(arr.buffer);
    return view.getUint32(offset, true);
}
exports.bytesToU32 = bytesToU32;
/**
 * Converts a u64 BigInt in a Uint8Array.
 *
 * @param val - the BigInt to convert
 */
function u64ToBytes(val) {
    if (val < 0 || val > U64_MAX) {
        throw new Error(`Unable to serialize invalid Uint64 value ${val}`);
    }
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigUint64(0, val, true);
    return new Uint8Array(view.buffer);
}
exports.u64ToBytes = u64ToBytes;
/**
 * Converts a Uint8Array into a u64 BigInt.
 *
 * @param arr - the array to convert
 */
function bytesToU64(arr, offset = 0) {
    const view = new DataView(arr.buffer);
    return view.getBigUint64(offset, true);
}
exports.bytesToU64 = bytesToU64;
/**
 * Converts a i32 in a Uint8Array.
 *
 * @param val - the number to convert
 */
function i32ToBytes(val) {
    if (val < I32_MIN || val > I32_MAX) {
        throw new Error(`Unable to serialize invalid int32 value ${val}`);
    }
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, val, true);
    return new Uint8Array(view.buffer);
}
exports.i32ToBytes = i32ToBytes;
/**
 * Converts a Uint8Array into a i32.
 *
 * @param arr - the array to convert
 */
function bytesToI32(arr, offset = 0) {
    const view = new DataView(arr.buffer);
    return view.getInt32(offset, true);
}
exports.bytesToI32 = bytesToI32;
/**
 * Converts a i64 BigInt in a Uint8Array.
 *
 * @param val - the BigInt to convert
 */
function i64ToBytes(val) {
    if (val < I64_MIN || val > I64_MAX) {
        throw new Error(`Unable to serialize invalid int64 value ${val.toString()}`);
    }
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigInt64(0, val, true);
    return new Uint8Array(view.buffer);
}
exports.i64ToBytes = i64ToBytes;
/**
 * Converts a Uint8Array into a i64 BigInt.
 *
 * @param arr - the array to convert
 */
function bytesToI64(arr, offset = 0) {
    const view = new DataView(arr.buffer);
    return view.getBigInt64(offset, true);
}
exports.bytesToI64 = bytesToI64;
/**
 * Converts a f32 in a Uint8Array.
 *
 * @param val - the number to convert
 */
function f32ToBytes(val) {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, val, true);
    return new Uint8Array(view.buffer);
}
exports.f32ToBytes = f32ToBytes;
/**
 * Converts a Uint8Array into a f32.
 *
 * @param arr - the array to convert
 */
function bytesToF32(arr, offset = 0) {
    const view = new DataView(arr.buffer);
    return view.getFloat32(offset, true);
}
exports.bytesToF32 = bytesToF32;
/**
 * Converts a f64 BigInt in a Uint8Array.
 *
 * @param val - the BigInt to convert
 */
function f64ToBytes(val) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, val, true);
    return new Uint8Array(view.buffer);
}
exports.f64ToBytes = f64ToBytes;
/**
 * Converts a Uint8Array into a f64 BigInt.
 *
 * @param arr - the array to convert
 */
function bytesToF64(arr, offset = 0) {
    const view = new DataView(arr.buffer);
    return view.getFloat64(offset, true);
}
exports.bytesToF64 = bytesToF64;
//# sourceMappingURL=numbers.js.map