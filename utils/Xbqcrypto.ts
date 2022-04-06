import * as varint from "varint";
import * as createhash from "create-hash";
import * as bs58check from "bs58check";

export function hashSha256(data) {
    return createhash("sha256").update(data).digest();
}

export function base58checkEncode(data: Buffer | Uint8Array): string {
    return bs58check.encode(data);
}

export function base58checkDecode(data: string): Buffer {
    return bs58check.decode(data);
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
