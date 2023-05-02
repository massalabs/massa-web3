"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.encodingLength = void 0;
const tslib_1 = require("tslib");
const unsigned = tslib_1.__importStar(require("./unsigned.js"));
const oneBI = BigInt(1);
const twoBI = BigInt(2);
function encodingLength(v) {
    return unsigned.encodingLength(v >= 0 ? v * twoBI : v * -twoBI - oneBI);
}
exports.encodingLength = encodingLength;
function encode(v, buffer, byteOffset) {
    v = v >= 0 ? v * twoBI : v * -twoBI - oneBI;
    return unsigned.encode(v, buffer, byteOffset);
}
exports.encode = encode;
function decode(data, offset = 0) {
    const v = unsigned.decode(data, offset);
    return v & oneBI ? (v + oneBI) / -twoBI : v / twoBI;
}
exports.decode = decode;
//# sourceMappingURL=signed.js.map