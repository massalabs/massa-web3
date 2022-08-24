"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.varintDecode = exports.varintEncode = exports.base58Decode = exports.base58Encode = exports.hashBlake3 = void 0;
const varint = require("varint");
const blake3_1 = require("@noble/hashes/blake3");
const base58check = require("base58check");
function hashBlake3(data) {
    return (0, blake3_1.blake3)(data);
}
exports.hashBlake3 = hashBlake3;
function base58Encode(data) {
    const bufData = Buffer.from(data);
    return base58check.encode(bufData.slice(1), bufData[0].toString(16).padStart(2, "0"));
}
exports.base58Encode = base58Encode;
function base58Decode(data) {
    const decoded = base58check.decode(data);
    return Buffer.concat([decoded.prefix, decoded.data]);
}
exports.base58Decode = base58Decode;
function varintEncode(data) {
    return varint.encode(data);
}
exports.varintEncode = varintEncode;
function varintDecode(data) {
    return varint.decode(data);
}
exports.varintDecode = varintDecode;
//# sourceMappingURL=Xbqcrypto.js.map