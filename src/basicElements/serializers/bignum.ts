const ZERO = 0
const OFFSET = 8
const BYTE_1 = 1
const BYTES_64_BN = 64n
const BYTES_127 = 127

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
