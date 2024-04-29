import { U64_MAX } from './numbers'

/**
 * The maximum value for an unsigned 128-bit integer (u128) represented as a BigInt.
 */
export const U128_MAX = (BigInt(1) << BigInt(128)) - BigInt(1)

/**
 * The maximum value for an unsigned 256-bit integer (u256) represented as a BigInt.
 */
export const U256_MAX = (BigInt(1) << BigInt(256)) - BigInt(1)

/**
 * The maximum value for a signed 128-bit integer (i128) represented as a BigInt.
 */
export const I128_MAX = (BigInt(1) << BigInt(127)) - BigInt(1)

/**
 * The minimum value for a signed 128-bit integer (i128) represented as a BigInt.
 */
export const I128_MIN = -(BigInt(1) << BigInt(127))

function generic128ToBytes(val: bigint): Uint8Array {
  const upper = val >> 64n
  const lower = (val << 64n) >> 64n

  const buffer = new ArrayBuffer(16)
  const view = new DataView(buffer)

  view.setBigUint64(0, lower, true)
  view.setBigUint64(8, upper, true)

  return new Uint8Array(view.buffer)
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
    throw new Error(`Unable to serialize invalid Uint128 value ${val}`)
  }

  return generic128ToBytes(val)
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
  const view = new DataView(arr.buffer, offset)

  const lower = view.getBigUint64(0, true) // Lower 64 bits
  const upper = view.getBigUint64(8, true) // Upper 64 bits

  return (upper << 64n) | lower
}

/**
 * Converts a signed 128-bit integer (i128) BigInt into a Uint8Array.
 *
 * @param val - The BigInt to convert
 *
 * @throws Will throw an error if the input value is not within the valid u128 range (0 to 340282366920938463463374607431768211455)
 *
 * @returns A Uint8Array containing the serialized u128 BigInt value
 *
 */
export function i128ToBytes(val: bigint): Uint8Array {
  if (val < I128_MIN || val > I128_MAX) {
    throw new Error(`Unable to serialize invalid Int128 value ${val}`)
  }
  return generic128ToBytes(val)
}

/**
 * Converts a Uint8Array into a signed 128-bit integer (i128) BigInt.
 *
 * @param arr - The array to convert
 * @param offset - The optional offset in the Uint8Array at which to start reading the i128 value (default: 0)
 *
 * @returns The deserialized i128 BigInt value
 *
 */
export function bytesToI128(arr: Uint8Array, offset = 0): bigint {
  const view = new DataView(arr.buffer, offset)

  const lower = view.getBigUint64(0, true) // Lower 64 bits
  const upper = view.getBigInt64(8, true) // Upper 64 bits

  return (upper << 64n) | lower
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
    throw new Error(`Unable to serialize invalid Uint256 value ${val}`)
  }

  const p0 = val & U64_MAX
  const p1 = (val >> 64n) & U64_MAX
  const p2 = (val >> 128n) & U64_MAX
  const p3 = (val >> 192n) & U64_MAX

  const buffer = new ArrayBuffer(32)
  const view = new DataView(buffer)

  view.setBigUint64(0, p0, true)
  view.setBigUint64(8, p1, true)
  view.setBigUint64(16, p2, true)
  view.setBigUint64(24, p3, true)

  return new Uint8Array(view.buffer)
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
  const view = new DataView(arr.buffer, offset)

  const p0 = view.getBigUint64(0, true)
  const p1 = view.getBigUint64(8, true)
  const p2 = view.getBigUint64(16, true)
  const p3 = view.getBigUint64(24, true)

  return (p3 << 192n) | (p2 << 128n) | (p1 << 64n) | p0
}
