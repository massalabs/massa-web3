import * as varint from "varint";
import { blake3 } from "@noble/hashes/blake3";
const base58check = require("base58check");

export function hashBlake3(data: Uint8Array | string): Uint8Array {
  return blake3(data);
}

export function base58Encode(data: Buffer | Uint8Array): string {
  const bufData = Buffer.from(data);
  return base58check.encode(bufData.slice(1), bufData[0].toString(16).padStart(2, "0"));
}

export function base58Decode(data: string): Buffer {
  const decoded = base58check.decode(data);
  return Buffer.concat([decoded.prefix, decoded.data]);
}

export function varintEncode(data: number): [number] {
  return varint.encode(data);
}

export function varintDecode(data: [number]): number {
  return varint.decode(data);
}