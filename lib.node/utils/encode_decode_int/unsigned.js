"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = exports.encode = exports.encodingLength = void 0;
const LIMIT = BigInt(0x7f);
const zeroBI = BigInt(0);
const sevenBI = BigInt(7);
function encodingLength(value) {
    let i = 0;
    for (; value >= BigInt(0x80); i++) {
        value >>= sevenBI;
    }
    return i + 1;
}
exports.encodingLength = encodingLength;
function encode(i, buffer, byteOffset) {
    if (i < zeroBI) {
        throw new RangeError('value must be unsigned');
    }
    const byteLength = encodingLength(i);
    buffer = buffer || new ArrayBuffer(byteLength);
    byteOffset = byteOffset || 0;
    if (buffer.byteLength < byteOffset + byteLength) {
        throw new RangeError('the buffer is too small to encode the number at the offset');
    }
    const array = new Uint8Array(buffer, byteOffset);
    let offset = 0;
    while (LIMIT < i) {
        array[offset++] = Number(i & LIMIT) | 0x80;
        i >>= sevenBI;
    }
    array[offset] = Number(i);
    return array;
}
exports.encode = encode;
function decode(data, offset = 0) {
    let i = zeroBI;
    let n = 0;
    let b;
    do {
        b = data[offset + n];
        if (b === undefined) {
            throw new RangeError('offset out of range');
        }
        i += BigInt(b & 0x7f) << BigInt(n * 7);
        n++;
    } while (0x80 <= b);
    return i;
}
exports.decode = decode;
//# sourceMappingURL=unsigned.js.map