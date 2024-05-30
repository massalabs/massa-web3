/**
 * This module aim's to provide number variable types serialization and conversion helper functions.
 */

/**
 * The minimum value for a signed 16-bit integer (i16).
 */
const I16_MIN = -32768

/**
 * The maximum value for a signed 16-bit integer (i16).
 */
const I16_MAX = 32767

/**
 * The minimum value for a signed 32-bit integer (i32).
 */
const I32_MIN = -0x80000000

/**
 * The maximum value for a signed 32-bit integer (i32).
 */
const I32_MAX = 0x7fffffff

/**
 * The minimum value for a signed 64-bit integer (i64) represented as a BigInt.
 */
const I64_MIN = BigInt('-9223372036854775808')

const ZERO = 0
const BYTES_16_BUFFER_SIZE = 2
const BYTES_32_BUFFER_SIZE = 4
const BYTES_64_BUFFER_SIZE = 8

/**
 * The maximum value for a signed 64-bit integer (i64) represented as a BigInt.
 */
export const I64_MAX = BigInt('0x7fffffffffffffff')

/**
 * Converts a signed 16-bit integer (i16) into a Uint8Array.
 *
 * @param val - The number to convert
 *
 * @throws Will throw an error if the input value is not within the valid i16 range
 *
 * @returns A Uint8Array containing the serialized i16 value
 *
 */
export function i16ToBytes(val: number): Uint8Array {
  if (val < I16_MIN || val > I16_MAX) {
    throw new Error(`Unable to serialize invalid int16 value ${val}`)
  }
  const buffer = new ArrayBuffer(BYTES_16_BUFFER_SIZE)
  const view = new DataView(buffer)
  view.setInt16(ZERO, val, true)
  return new Uint8Array(view.buffer)
}

/**
 * Converts a Uint8Array into a signed 16-bit integer (i16).
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the i16 value (default: 0)
 *
 * @returns The deserialized i16 value
 *
 */
export function bytesToI16(arr: Uint8Array, offset = ZERO): number {
  const view = new DataView(arr.buffer)
  return view.getInt16(offset, true)
}

/**
 * Converts a signed 32-bit integer (i32) into a Uint8Array.
 *
 * @param val - The number to convert
 *
 * @throws Will throw an error if the input value is not within the valid i32 range (-2,147,483,648 to 2,147,483,647)
 *
 * @returns A Uint8Array containing the serialized i32 value
 *
 */
export function i32ToBytes(val: number): Uint8Array {
  if (val < I32_MIN || val > I32_MAX) {
    throw new Error(`Unable to serialize invalid int32 value ${val}`)
  }
  const buffer = new ArrayBuffer(BYTES_32_BUFFER_SIZE)
  const view = new DataView(buffer)
  view.setInt32(ZERO, val, true)
  return new Uint8Array(view.buffer)
}

/**
 * Converts a Uint8Array into a signed 32-bit integer (i32).
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the i32 value (default: 0)
 *
 * @returns The deserialized i32 value
 *
 */
export function bytesToI32(arr: Uint8Array, offset = ZERO): number {
  const view = new DataView(arr.buffer)
  return view.getInt32(offset, true)
}

/**
 * Converts a i64 BigInt in a Uint8Array.
 *
 * @param val - The BigInt to convert
 *
 * @throws Will throw an error if the input value is not within the valid i64 range (-9,223,372,036,854,775,808 to 9,223,372,036,854,775,807)
 *
 * @returns A Uint8Array containing the serialized i64 BigInt value
 *
 */
export function i64ToBytes(val: bigint): Uint8Array {
  if (val < I64_MIN || val > I64_MAX) {
    throw new Error(`Unable to serialize invalid int64 value ${val.toString()}`)
  }
  const buffer = new ArrayBuffer(BYTES_64_BUFFER_SIZE)
  const view = new DataView(buffer)
  view.setBigInt64(ZERO, val, true)
  return new Uint8Array(view.buffer)
}

/**
 * Converts a Uint8Array into a i64 BigInt.
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the i64 value (default: 0)
 *
 * @returns The deserialized i64 BigInt value
 *
 */
export function bytesToI64(arr: Uint8Array, offset = ZERO): bigint {
  const view = new DataView(arr.buffer)
  return view.getBigInt64(offset, true)
}

/**
 * Converts a 32-bit floating-point number (f32) into a Uint8Array.
 *
 * @param val - The number to convert
 *
 * @returns A Uint8Array containing the serialized f32 value
 *
 */
export function f32ToBytes(val: number): Uint8Array {
  const buffer = new ArrayBuffer(BYTES_32_BUFFER_SIZE)
  const view = new DataView(buffer)
  view.setFloat32(ZERO, val, true)
  return new Uint8Array(view.buffer)
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
export function bytesToF32(arr: Uint8Array, offset = ZERO): number {
  const view = new DataView(arr.buffer)
  return view.getFloat32(offset, true)
}

/**
 * Converts a 64-bit floating-point number (f64) into a Uint8Array.
 *
 * @param val - The BigInt to convert
 *
 * @returns A Uint8Array containing the serialized f64 value
 *
 */
export function f64ToBytes(val: number): Uint8Array {
  const buffer = new ArrayBuffer(BYTES_64_BUFFER_SIZE)
  const view = new DataView(buffer)
  view.setFloat64(ZERO, val, true)
  return new Uint8Array(view.buffer)
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
export function bytesToF64(arr: Uint8Array, offset = ZERO): number {
  const view = new DataView(arr.buffer)
  return view.getFloat64(offset, true)
}
