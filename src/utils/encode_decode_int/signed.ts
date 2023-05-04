import * as unsigned from './unsigned.js';

/**
 * @module Signed
 *
 * This module provides functions to encode and decode signed
 * integers using Varint, which is a compact binary representation of integers.
 */
const oneBI = BigInt(1);
const twoBI = BigInt(2);

/**
 * Returns the number of bytes required to store the number.
 *
 * @privateRemarks
 * If the v value is positive, it will be encoded as a positive value by multiplying it by 2.
 * If the v value is negative, it will be encoded as a negative value by multiplying it by -2 and subtracting 1.
 *
 * @param value - The number to encode
 * @returns The number of bytes required to store the number
 */
export function encodingLength(v: bigint) {
  return unsigned.encodingLength(v >= 0 ? v * twoBI : v * -twoBI - oneBI);
}

/**
 * Encodes the given value into the given buffer at the given byteOffset
 *
 * @param v - The value to encode
 * @param buffer - The buffer to encode into (optional)
 * @param byteOffset - The byte offset to start encoding at (optional)
 * @returns A buffer with the encoded value
 */
export function encode(v: bigint, buffer?: ArrayBuffer, byteOffset?: number) {
  v = v >= 0 ? v * twoBI : v * -twoBI - oneBI;
  return unsigned.encode(v, buffer, byteOffset);
}

/**
 * Decodes the given data at the given byteOffset
 *
 * @param data - The data to decode
 * @param offset - The byte offset to start decoding at (Default: 0)
 * @returns The decoded value
 */
export function decode(data: Uint8Array, offset = 0) {
  const v = unsigned.decode(data, offset);
  return v & oneBI ? (v + oneBI) / -twoBI : v / twoBI;
}
