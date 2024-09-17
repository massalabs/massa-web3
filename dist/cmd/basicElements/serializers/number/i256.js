"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromNumber = exports.fromBuffer = exports.fromBytes = exports.toBytes = exports.MAX = exports.MIN = exports.SIZE_BIT = exports.SIZE_BYTE = void 0;
const integers_1 = require("./integers");
exports.SIZE_BYTE = 32;
exports.SIZE_BIT = 256;
exports.MIN = -(1n << (BigInt(exports.SIZE_BIT) - 1n));
exports.MAX = (1n << (BigInt(exports.SIZE_BIT) - 1n)) - 1n;
/**
 * Converts an I256 value to bytes
 *
 * @param value - The number to convert
 * @returns The bytes representation of the number
 * @throws if the value is out of range for I256
 */
function toBytes(value) {
    return (0, integers_1.integerToByte)(exports.SIZE_BIT, value, true);
}
exports.toBytes = toBytes;
/**
 * Converts bytes to an I256 value
 *
 * @remarks
 * Silently ignores bytes that are not needed to represent the I256 value.
 *
 * @param bytes - The bytes to convert
 * @returns The I256 representation of the bytes
 */
function fromBytes(bytes) {
    return (0, integers_1.integerFromByte)(exports.SIZE_BIT, bytes, true);
}
exports.fromBytes = fromBytes;
/**
 * Converts an I256 value to a number
 * @param buffer - The buffer to read from
 * @param offset - The optional offset in the buffer at which to start reading the I256 value (default: 0)
 * @returns The I256 representation of the bytes
 */
function fromBuffer(buffer, offset) {
    const value = (0, integers_1.integerFromByte)(exports.SIZE_BIT, buffer, true, offset);
    offset += exports.SIZE_BYTE;
    return { value, offset };
}
exports.fromBuffer = fromBuffer;
/**
 * Converts a number to an I256 value
 *
 * @param value - The number to convert
 * @returns The I256 representation of the number
 * @throws if the value is not a safe integer or out of range for I256
 */
function fromNumber(value) {
    return (0, integers_1.numberToInteger)(exports.SIZE_BIT, value, true);
}
exports.fromNumber = fromNumber;
//# sourceMappingURL=i256.js.map