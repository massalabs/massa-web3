"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typedArrayToBuffer = exports.varintDecode = exports.varintEncode = exports.base58checkDecode = exports.base58checkEncode = exports.hashSha256 = void 0;
const varint = require("varint");
const createhash = require("create-hash");
const bs58check = require("base58check");
function hashSha256(data) {
    return createhash("sha256").update(data).digest();
}
exports.hashSha256 = hashSha256;
function base58checkEncode(data) {
    return bs58check.encode(data.slice(1), data[0].toString(16).padStart(2, '0'));
}
exports.base58checkEncode = base58checkEncode;
function base58checkDecode(data) {
    let decoded = bs58check.decode(data);
    return Buffer.concat([decoded.prefix, decoded.data]);
}
exports.base58checkDecode = base58checkDecode;
function varintEncode(data) {
    return varint.encode(data);
}
exports.varintEncode = varintEncode;
function varintDecode(data) {
    return varint.decode(data);
}
exports.varintDecode = varintDecode;
function typedArrayToBuffer(array) {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
}
exports.typedArrayToBuffer = typedArrayToBuffer;
//# sourceMappingURL=Xbqcrypto.js.map