"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varintEncode = exports.base58Decode = exports.base58Encode = exports.hashBlake3 = void 0;
const buffer_1 = require("buffer");
const blake3_1 = require("@noble/hashes/blake3");
const encode_decode_int_1 = require("./encode_decode_int");
const bs58_1 = require("./bs58");
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
    const bufData = buffer_1.Buffer.from(data);
    return (0, bs58_1.bs58EncodeCheck)(bufData.slice(1), bufData[0].toString(16).padStart(2, '0'));
}
exports.base58Encode = base58Encode;
function base58Decode(data) {
    const decoded = (0, bs58_1.bs58DecodeCheck)(data);
    return buffer_1.Buffer.concat([decoded.prefix, decoded.data]);
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