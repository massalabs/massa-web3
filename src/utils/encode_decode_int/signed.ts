import * as unsigned from './unsigned.js';

export function encodingLength(v: bigint) {
  return unsigned.encodingLength(v >= 0 ? v * 2n : v * -2n - 1n);
}

export function encode(v: bigint, buffer?: ArrayBuffer, byteOffset?: number) {
  v = v >= 0 ? v * 2n : v * -2n - 1n;
  return unsigned.encode(v, buffer, byteOffset);
}

export function decode(data: Uint8Array, offset = 0) {
  const v = unsigned.decode(data, offset);
  return v & 1n ? (v + 1n) / -2n : v / 2n;
}
