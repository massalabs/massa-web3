"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesToStr = exports.strToBytes = void 0;
const isNode_1 = require("../../utils/isNode");
/**
 * Converts utf-16 string to a Uint8Array.
 *
 * @param str - the string to convert
 *
 * @returns the converted string
 */
function strToBytes(str) {
    if (!str.length) {
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        return new Uint8Array(0);
    }
    return new Uint8Array(Buffer.from(str, 'utf-8'));
}
exports.strToBytes = strToBytes;
/**
 * Converts Uint8Array to a string.
 *
 * @param arr - the array to convert
 *
 * @returns A string representation of the array in utf-8 encoding
 */
function bytesToStr(arr) {
    if (!arr.length) {
        return '';
    }
    if ((0, isNode_1.isNode)()) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/naming-convention
        const { StringDecoder } = require('string_decoder');
        const decoder = new StringDecoder('utf-8');
        return decoder.write(Buffer.from(arr));
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    let { TextDecoder } = window;
    if (typeof TextDecoder === 'undefined') {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        TextDecoder = require('util').TextDecoder;
    }
    const textDecoder = new TextDecoder('utf-8');
    return textDecoder.decode(arr);
}
exports.bytesToStr = bytesToStr;
//# sourceMappingURL=strings.js.map