"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromNumber = exports.fromBuffer = exports.fromBytes = exports.toBytes = exports.MAX = exports.SIZE_BIT = exports.SIZE_BYTE = void 0;
const _1 = require(".");
const integers_1 = require("./integers");
exports.SIZE_BYTE = 2;
exports.SIZE_BIT = exports.SIZE_BYTE * _1.U8.SIZE_BIT;
exports.MAX = (1n << BigInt(exports.SIZE_BIT)) - 1n;
/**
 * Converts an U16 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is negative or too large for U16
 */
function toBytes(value) {
    return (0, integers_1.integerToByte)(exports.SIZE_BIT, value);
}
exports.toBytes = toBytes;
/**
 * Converts bytes to an U16 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the U8 value.
 *
 * @param bytes - The bytes to convert
 * @returns The U16 representation of the bytes
 */
function fromBytes(bytes) {
    return (0, integers_1.integerFromByte)(exports.SIZE_BIT, bytes);
}
exports.fromBytes = fromBytes;
/**
 * Converts an U16 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the U16 value (default: 0)
 * @returns The U16 representation of the bytes
 */
function fromBuffer(buffer, offset) {
    const value = (0, integers_1.integerFromByte)(exports.SIZE_BIT, buffer, false, offset);
    offset += exports.SIZE_BYTE;
    return { value, offset };
}
exports.fromBuffer = fromBuffer;
/**
 * Converts a number to an U16 value
 *
 * @param value - The number to convert
 * @returns The U16 representation of the number
 * @throws if the value is not a safe integer, negative or too large for U16
 */
function fromNumber(value) {
    return (0, integers_1.numberToInteger)(exports.SIZE_BIT, value);
}
exports.fromNumber = fromNumber;
//# sourceMappingURL=u16.js.map