const LIMIT = BigInt(0x7f)

const zeroBI = BigInt(0)
const sevenBI = BigInt(7)
/**
 * @module unsigned.ts
 *
 * This module provides functions to encode and decode unsigned integers,
 * using Varint which is a more compact binary representation of them.
 */

/**
 * Returns the number of bytes required to store the number in a varint.
 *
 * @param value - The number to encode.
 * @returns The number of bytes required to store the number.
 */
export function encodingLength(value: bigint): number {
  let i = 0

  for (; value >= BigInt(0x80); i++) {
    value >>= sevenBI
  }

  return i + 1
}

/**
 * Encodes a big number as a varint.
 *
 * @param i - The big number to encode.
 * @param buffer - The buffer to write the varint to (optional).
 * @param byteOffset - The offset in the buffer to start writing at (optional) (default: 0).
 * @returns The buffer that was written to.
 */
export function encode(
  i: bigint,
  buffer?: ArrayBuffer,
  byteOffset?: number
): Uint8Array {
  if (i < zeroBI) {
    throw new RangeError('value must be unsigned')
  }

  const byteLength = encodingLength(i)
  buffer = buffer || new ArrayBuffer(byteLength)
  byteOffset = byteOffset || 0
  if (buffer.byteLength < byteOffset + byteLength) {
    throw new RangeError(
      'the buffer is too small to encode the number at the offset'
    )
  }

  const array = new Uint8Array(buffer, byteOffset)

  let offset = 0
  while (LIMIT < i) {
    array[offset++] = Number(i & LIMIT) | 0x80
    i >>= sevenBI
  }

  array[offset] = Number(i)

  return array
}

/**
 * Decodes a varint as a big number.
 *
 * @param data - The data to decode.
 * @param offset - The offset in the data to start reading at (optional) (default: 0).
 * @returns The decoded big number.
 */
export function decode(data: Uint8Array, offset = 0): bigint {
  let i = zeroBI
  let n = 0
  let b: number
  do {
    b = data[offset + n]
    if (b === undefined) {
      throw new RangeError('offset out of range')
    }

    i += BigInt(b & 0x7f) << BigInt(n * 7)
    n++
  } while (0x80 <= b)
  return i
}
