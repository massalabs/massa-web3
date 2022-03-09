import * as varint from "varint";
import * as createhash from "create-hash";
import * as bs58check from "bs58check";

export function hashSha256(data) {
    return createhash('sha256').update(data).digest()
}

export function base58checkEncode(data) {
    return bs58check.encode(data);
}

export function base58checkDecode(data) {
    return bs58check.decode(data);
}

export function varintEncode(data) {
    return varint.encode(data)
}

export function varintDecode(data) {
    return varint.decode(data)
}