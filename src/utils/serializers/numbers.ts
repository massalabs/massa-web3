/**
 * This module aim's to provide number variable types serialization and conversion helper functions.
 */

/**
 * The maximum value for an unsigned 8-bit integer (u8).
 */
const U8_MAX = 0xff;

/**
 * The maximum value for an unsigned 32-bit integer (u32).
 */
const U32_MAX = 0xffffffff;

/**
 * The maximum value for an unsigned 64-bit integer (u64) represented as a BigInt.
 */
const U64_MAX = BigInt('0xffffffffffffffff');

/**
 * The maximum value for an unsigned 128-bit integer (u128) represented as a BigInt.
 */
const U128_MAX = BigInt('0xffffffffffffffffffffffffffffffff');

/**
 * The maximum value for an unsigned 256-bit integer (u256) represented as a BigInt.
 */
const U256_MAX = BigInt(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
);

/**
 * The minimum value for a signed 32-bit integer (i32).
 */
const I32_MIN = -0x80000000;

/**
 * The maximum value for a signed 32-bit integer (i32).
 */
const I32_MAX = 0x7fffffff;

/**
 * The minimum value for a signed 64-bit integer (i64) represented as a BigInt.
 */
const I64_MIN = BigInt('-9223372036854775808');

/**
 * The maximum value for a signed 64-bit integer (i64) represented as a BigInt.
 */
const I64_MAX = BigInt('0x7fffffffffffffff');

/**
 * Converts an unsigned 8-bit integer (u8) into a Uint8Array.
 *
 * @param val - The number to convert
 *
 * @throws Will throw an error if the input value is not within the valid u8 range (0 to 255)
 *
 * @returns A Uint8Array containing the serialized u8 value
 *
 */
export function u8toByte(val: number): Uint8Array {
  if (val < 0 || val > U8_MAX) {
    throw new Error(`Unable to serialize invalid Uint8 value ${val}`);
  }
  return new Uint8Array([val]);
}

/**
 * Converts a Uint8Array into an unsigned 8-bit integer (u8).
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the u8 value (default: 0)
 *
 * @returns The deserialized u8 value
 *
 */
export function byteToU8(arr: Uint8Array, offset = 0): number {
  return arr[offset];
}

/**
 * Converts an unsigned 32-bit integer (u32) into a Uint8Array.
 *
 * @param val - The number to convert
 *
 * @throws Will throw an error if the input value is not within the valid u32 range (0 to 4,294,967,295)
 *
 * @returns A Uint8Array containing the serialized u32 value
 *
 */
export function u32ToBytes(val: number): Uint8Array {
  if (val < 0 || val > U32_MAX) {
    throw new Error(`Unable to serialize invalid Uint32 value ${val}`);
  }
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setUint32(0, val, true);
  return new Uint8Array(view.buffer);
}

/**
 * Converts a Uint8Array into an unsigned 32-bit integer (u32).
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the u32 value (default: 0)
 *
 * @returns The deserialized u32 value
 *
 */
export function bytesToU32(arr: Uint8Array, offset = 0): number {
  const view = new DataView(arr.buffer);
  return view.getUint32(offset, true);
}

/**
 * Converts an unsigned 64-bit integer (u64) BigInt into a Uint8Array.
 *
 * @param val - The BigInt to convert
 *
 * @throws Will throw an error if the input value is not within the valid u64 range (0 to 18,446,744,073,709,551,615)
 *
 * @returns A Uint8Array containing the serialized u64 BigInt value
 *
 */
export function u64ToBytes(val: bigint): Uint8Array {
  if (val < 0 || val > U64_MAX) {
    throw new Error(`Unable to serialize invalid Uint64 value ${val}`);
  }
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigUint64(0, val, true);
  return new Uint8Array(view.buffer);
}

/**
 * Converts a Uint8Array into an unsigned 64-bit integer (u64) BigInt.
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the u64 value (default: 0)
 *
 * @returns The deserialized u64 BigInt value
 *
 */
export function bytesToU64(arr: Uint8Array, offset = 0): bigint {
  const view = new DataView(arr.buffer);
  return view.getBigUint64(offset, true);
}

/**
 * Converts an unsigned 128-bit integer (u128) BigInt into a Uint8Array.
 *
 * @param val - The BigInt to convert
 *
 * @throws Will throw an error if the input value is not within the valid u128 range (0 to 340282366920938463463374607431768211455)
 *
 * @returns A Uint8Array containing the serialized u128 BigInt value
 *
 */
export function u128ToBytes(val: bigint): Uint8Array {
  if (val < 0 || val > U128_MAX) {
    throw new Error(`Unable to serialize invalid Uint128 value ${val}`);
  }

  const upper = val >> 64n;
  const lower = (val << 64n) >> 64n;

  const buffer = new ArrayBuffer(16);
  const view = new DataView(buffer);

  view.setBigUint64(0, lower, true);
  view.setBigUint64(8, upper, true);

  return new Uint8Array(view.buffer);
}

/**
 * Converts a Uint8Array into an unsigned 128-bit integer (u128) BigInt.
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the u128 value (default: 0)
 *
 * @returns The deserialized u128BigInt value
 *
 */
export function bytesToU128(arr: Uint8Array, offset = 0): bigint {
  const view = new DataView(arr.buffer, offset);

  const lower = view.getBigUint64(0, true); // Lower 64 bits
  const upper = view.getBigUint64(8, true); // Upper 64 bits

  return (upper << 64n) | lower;
}

/**
 * Converts an unsigned 256-bit integer (u256) BigInt into a Uint8Array.
 *
 * @param val - The BigInt to convert
 *
 * @throws Will throw an error if the input value is not within the valid u256 range (0 to 340282366920938463463374607431768211455)
 *
 * @returns A Uint8Array containing the serialized u256 BigInt value
 *
 */
export function u256ToBytes(val: bigint): Uint8Array {
  if (val < 0 || val > U256_MAX) {
    throw new Error(`Unable to serialize invalid Uint256 value ${val}`);
  }

  const p0 = val & U64_MAX;
  const p1 = (val >> 64n) & U64_MAX;
  const p2 = (val >> 128n) & U64_MAX;
  const p3 = (val >> 192n) & U64_MAX;

  const buffer = new ArrayBuffer(32);
  const view = new DataView(buffer);

  view.setBigUint64(0, p0, true);
  view.setBigUint64(8, p1, true);
  view.setBigUint64(16, p2, true);
  view.setBigUint64(24, p3, true);

  return new Uint8Array(view.buffer);
}

/**
 * Converts a Uint8Array into an unsigned 256-bit integer (u256) BigInt.
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the u256 value (default: 0)
 *
 * @returns The deserialized u256BigInt value
 *
 */
export function bytesToU256(arr: Uint8Array, offset = 0): bigint {
  const view = new DataView(arr.buffer, offset);

  const p0 = view.getBigUint64(0, true);
  const p1 = view.getBigUint64(8, true);
  const p2 = view.getBigUint64(16, true);
  const p3 = view.getBigUint64(24, true);

  return (p3 << 192n) | (p2 << 128n) | (p1 << 64n) | p0;
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
    throw new Error(`Unable to serialize invalid int32 value ${val}`);
  }
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setInt32(0, val, true);
  return new Uint8Array(view.buffer);
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
export function bytesToI32(arr: Uint8Array, offset = 0): number {
  const view = new DataView(arr.buffer);
  return view.getInt32(offset, true);
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
    throw new Error(
      `Unable to serialize invalid int64 value ${val.toString()}`,
    );
  }
  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setBigInt64(0, val, true);
  return new Uint8Array(view.buffer);
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
export function bytesToI64(arr: Uint8Array, offset = 0): bigint {
  const view = new DataView(arr.buffer);
  return view.getBigInt64(offset, true);
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
  const buffer = new ArrayBuffer(4);
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
export function bytesToF32(arr: Uint8Array, offset = 0): number {
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
export function f64ToBytes(val: number): Uint8Array {
  const buffer = new ArrayBuffer(8);
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
export function bytesToF64(arr: Uint8Array, offset = 0): number {
  const view = new DataView(arr.buffer);
  return view.getFloat64(offset, true);
}
