"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varintEncode = exports.base58Decode = exports.base58Encode = exports.hashBlake3 = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const blake3_1 = require("@noble/hashes/blake3");
const encode_decode_int_1 = require("./encode_decode_int");
const base58check = require('base58check');
var MSB = 0x80;
var REST = 0x7f;
var MSBALL = ~REST;
var INT = Math.pow(2, 31);
const encode = (num, out, offset) => {
    if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
        throw new RangeError('Could not encode varint');
    }
    out = out || [];
    offset = offset || 0;
    let oldOffset = offset;
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
function hashBlake3(data) {
    return (0, blake3_1.blake3)(data);
}
exports.hashBlake3 = hashBlake3;
function base58Encode(data) {
    const bufData = Buffer.from(data);
    return base58check.encode(bufData.slice(1), bufData[0].toString(16).padStart(2, '0'));
}
exports.base58Encode = base58Encode;
function base58Decode(data) {
    const decoded = base58check.decode(data);
    return Buffer.concat([decoded.prefix, decoded.data]);
}
exports.base58Decode = base58Decode;
function varintEncode(data) {
    if (typeof data === 'bigint') {
        return encode_decode_int_1.unsignedBigIntUtils.encode(data);
    }
    return encode(data);
}
exports.varintEncode = varintEncode;
//# sourceMappingURL=Xbqcrypto.js.map