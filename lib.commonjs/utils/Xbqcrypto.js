"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varintDecode = exports.varintEncode = exports.base58Decode = exports.base58Encode = exports.hashBlake3 = void 0;
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-var-requires */
const varint = tslib_1.__importStar(require("varint"));
const blake3_1 = require("@noble/hashes/blake3");
const encode_decode_int_1 = require("./encode_decode_int");
const base58check = require('base58check');
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
    return varint.encode(data);
}
exports.varintEncode = varintEncode;
function varintDecode(data) {
    return varint.decode(data);
}
exports.varintDecode = varintDecode;
//# sourceMappingURL=Xbqcrypto.js.map