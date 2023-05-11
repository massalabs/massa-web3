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
 * If the `value` is positive, it will be encoded as a positive value by multiplying it by 2.
 * If the `value` is negative, it will be encoded as a negative value by multiplying it by -2 and subtracting 1.
 *
 * @param value - The number to encode.
 *
 * @returns The number of bytes required to store the number.
 */
export function encodingLength(value: bigint): number {
  return unsigned.encodingLength(
    value >= 0 ? value * twoBI : value * -twoBI - oneBI,
  );
}

/**
 * Encodes the given value into the given buffer at the given byteOffset.
 *
 * @param value - The value to encode.
 * @param buffer - The buffer to encode into (optional).
 * @param byteOffset - The byte offset to start encoding at (optional).
 *
 * @returns A buffer with the encoded value.
 */
export function encode(
  value: bigint,
  buffer?: ArrayBuffer,
  byteOffset?: number,
): ArrayBuffer {
  value = value >= 0 ? value * twoBI : value * -twoBI - oneBI;
  return unsigned.encode(value, buffer, byteOffset);
}

/**
 * Decodes the given data at the given byteOffset.
 *
 * @param data - The data to decode.
 * @param offset - The byte offset to start decoding at (Default: 0).
 *
 * @returns The decoded value.
 */
export function decode(data: Uint8Array, offset: number = 0): bigint {
  const value = unsigned.decode(data, offset);
  return value & oneBI ? (value + oneBI) / -twoBI : value / twoBI;
}
