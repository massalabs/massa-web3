import * as varint from "varint";
import * as createhash from "create-hash";
const bs58check = require("base58check");

export function hashSha256(data) {
    return createhash("sha256").update(data).digest();
}

export function base58checkEncode(data: Buffer | Uint8Array): string {
    return bs58check.encode(data.slice(1), data[0].toString(16).padStart(2, '0'));
}

export function base58checkDecode(data: string): Buffer {
    let decoded = bs58check.decode(data);
    return Buffer.concat([decoded.prefix, decoded.data]);
}

export function varintEncode(data: number): [number] {
    return varint.encode(data);
}

export function varintDecode(data: [number]): number {
    return varint.decode(data);
}

export function typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
}
