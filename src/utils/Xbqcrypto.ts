import { Buffer } from 'buffer';
import { blake3 } from '@noble/hashes/blake3';
import { unsignedBigIntUtils } from './encode_decode_int';
import {bs58EncodeCheck, bs58DecodeCheck} from "./bs58";

var MSB = 0x80;
var REST = 0x7f;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);

const encode = (num: number, out?, offset?: number): Uint8Array => {
  if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
    throw new RangeError('Could not encode varint');
  }
  out = out || [];
  offset = offset || 0;

  while (num >= INT) {
    out[offset++] = (num & 0xff) | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = (num & 0xff) | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;

  return out;
};

export function hashBlake3(data: Uint8Array | string): Uint8Array {
  return blake3(data);
}

export function base58Encode(data: Buffer | Uint8Array): string {
  const bufData = Buffer.from(data);
  return bs58EncodeCheck(
    bufData.slice(1),
    bufData[0].toString(16).padStart(2, '0'),
  );
}

export function base58Decode(data: string): Buffer {
  const decoded: {prefix: Buffer, data: Buffer} = bs58DecodeCheck(data);
  return Buffer.concat([decoded.prefix, decoded.data]);
}

export function varintEncode(data: number | bigint): Uint8Array {
  if (typeof data === 'bigint') {
    return unsignedBigIntUtils.encode(data as bigint);
  }
  return encode(data);
}
