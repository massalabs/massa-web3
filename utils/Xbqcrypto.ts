import * as varint from "varint";
import * as createhash from "create-hash";
const base58check = require("base58check");

export function hashSha256(data) {
    return createhash("sha256").update(data).digest();
}

export function base58checkEncode(data: Buffer | Uint8Array): string {
    const bufData = Buffer.from(data);
    return base58check.encode(bufData.slice(1), bufData[0].toString(16).padStart(2, "0"));
}

export function base58checkDecode(data: string): Buffer {
    const decoded = base58check.decode(data);
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
