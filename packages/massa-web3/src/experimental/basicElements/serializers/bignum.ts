// TODO: creating u64, u128, u256 types as wrapper of bigint, adding a from and to generic function that convert everything
import { U64_MAX } from './numbers'

const ZERO = 0
const OFFSET = 8
const BYTE_1 = 1
const BYTES_64_BN = 64n
const BYTES_127 = 127
const BYTES_128_BN = 128n
const BYTES_128 = 128
const BYTES_192_BN = 192n
const BYTES_256 = 256

/**
 * The maximum value for an unsigned 128-bit integer (u128) represented as a BigInt.
 */
export const U128_MAX = (BigInt(BYTE_1) << BigInt(BYTES_128)) - BigInt(BYTE_1)

/**
 * The maximum value for an unsigned 256-bit integer (u256) represented as a BigInt.
 */
export const U256_MAX = (BigInt(BYTE_1) << BigInt(BYTES_256)) - BigInt(BYTE_1)

/**
 * The maximum value for a signed 128-bit integer (i128) represented as a BigInt.
 */
export const I128_MAX = (BigInt(BYTE_1) << BigInt(BYTES_127)) - BigInt(BYTE_1)

/**
 * The minimum value for a signed 128-bit integer (i128) represented as a BigInt.
 */
export const I128_MIN = -(BigInt(BYTE_1) << BigInt(BYTES_127))

function generic128ToBytes(val: bigint): Uint8Array {
  const upper = val >> BYTES_64_BN
  const lower = (val << BYTES_64_BN) >> BYTES_64_BN

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const buffer = new ArrayBuffer(OFFSET * 2)
  const view = new DataView(buffer)

  view.setBigUint64(ZERO, lower, true)
  view.setBigUint64(OFFSET, upper, true)

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
  if (val < ZERO || val > U128_MAX) {
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
export function bytesToU128(arr: Uint8Array, offset = ZERO): bigint {
  const view = new DataView(arr.buffer, offset)

  const lower = view.getBigUint64(ZERO, true) // Lower 64 bits
  const upper = view.getBigUint64(OFFSET, true) // Upper 64 bits

  return (upper << BYTES_64_BN) | lower
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
export function bytesToI128(arr: Uint8Array, offset = ZERO): bigint {
  const view = new DataView(arr.buffer, offset)

  const lower = view.getBigUint64(ZERO, true) // Lower 64 bits
  const upper = view.getBigInt64(OFFSET, true) // Upper 64 bits

  return (upper << BYTES_64_BN) | lower
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
  if (val < ZERO || val > U256_MAX) {
    throw new Error(`Unable to serialize invalid Uint256 value ${val}`)
  }

  const p0 = val & U64_MAX
  const p1 = (val >> BYTES_64_BN) & U64_MAX
  const p2 = (val >> BYTES_128_BN) & U64_MAX
  const p3 = (val >> BYTES_192_BN) & U64_MAX

  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const buffer = new ArrayBuffer(OFFSET * 4)
  const view = new DataView(buffer)

  view.setBigUint64(ZERO, p0, true)
  view.setBigUint64(OFFSET, p1, true)
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  view.setBigUint64(OFFSET * 2, p2, true)
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  view.setBigUint64(OFFSET * 3, p3, true)

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
export function bytesToU256(arr: Uint8Array, offset = ZERO): bigint {
  const view = new DataView(arr.buffer, offset)

  const p0 = view.getBigUint64(ZERO, true)
  const p1 = view.getBigUint64(OFFSET, true)
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const p2 = view.getBigUint64(OFFSET * 2, true)
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const p3 = view.getBigUint64(OFFSET * 3, true)

  return (p3 << BYTES_192_BN) | (p2 << BYTES_128_BN) | (p1 << BYTES_64_BN) | p0
}
