import * as varint from "varint";
import { blake3 } from "@noble/hashes/blake3";
const base58check = require("base58check");

/**
 * Hashes a given data by using the blake3 algorithm
 *
 * @param {Uint8Array | string} data the data to apply the blake3 hashing on
 *
 * @returns {Uint8Array} the hashed data as a byte array
 */
export function hashBlake3(data: Uint8Array | string): Uint8Array {
  return blake3(data);
}

/**
 * Base58 encodes a given data
 *
 * @param {Buffer | Uint8Array} data the data to base58 encode
 *
 * @returns {string} the base58 encoded data
 */
export function base58Encode(data: Buffer | Uint8Array): string {
  const bufData = Buffer.from(data);
  return base58check.encode(bufData.slice(1), bufData[0].toString(16).padStart(2, "0"));
}

/**
 * Base58 decodes a given data
 *
 * @param {string} data the data to base58 decode
 * 
 * @returns {Buffer} the base58 decoded data as a byte array
 */
export function base58Decode(data: string): Buffer {
  const decoded = base58check.decode(data);
  return Buffer.concat([decoded.prefix, decoded.data]);
}

/**
 * Encodes a whole number to a protobuf-style varint bytes
 *
 * @param {number} data the whole integer data to encode
 * 
 * @returns {[number]} the encoded data as a protobuf-style varint bytes
 */
export function varintEncode(data: number): [number] {
  return varint.encode(data);
}

/**
 * Decodes a protobuf-style varint bytes to a whole number
 *
 * @param {[number]} data a protobuf-style varint bytes
 * 
 * @returns {number} the decoded data as a whole number
 */
export function varintDecode(data: [number]): number {
  return varint.decode(data);
}