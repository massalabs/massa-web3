/* eslint-disable @typescript-eslint/no-var-requires */
import * as varint from 'varint';
import { blake3 } from '@noble/hashes/blake3';
import { unsignedBigIntUtils } from './encode_decode_int';
const base58check = require('base58check');
export function hashBlake3(data) {
    return blake3(data);
}
export function base58Encode(data) {
    const bufData = Buffer.from(data);
    return base58check.encode(bufData.slice(1), bufData[0].toString(16).padStart(2, '0'));
}
export function base58Decode(data) {
    const decoded = base58check.decode(data);
    return Buffer.concat([decoded.prefix, decoded.data]);
}
export function varintEncode(data) {
    if (typeof data === 'bigint') {
        return unsignedBigIntUtils.encode(data);
    }
    return varint.encode(data);
}
export function varintDecode(data) {
    return varint.decode(data);
}
//# sourceMappingURL=Xbqcrypto.js.map