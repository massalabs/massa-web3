"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesToStr = exports.strToBytes = void 0;
const string_decoder_1 = require("string_decoder");
/**
 * Converts utf-16 string to a Uint8Array.
 * @param str - the string to convert
 */
function strToBytes(str) {
    if (!str.length) {
        return new Uint8Array(0);
    }
    return new Uint8Array(Buffer.from(str, 'utf-8'));
}
exports.strToBytes = strToBytes;
/**
 * Converts Uint8Array to a string.
 * @param arr - the array to convert
 */
function bytesToStr(arr) {
    if (!arr.length) {
        return '';
    }
    return new string_decoder_1.StringDecoder('utf8').write(Buffer.from(arr));
}
exports.bytesToStr = bytesToStr;
//# sourceMappingURL=strings.js.map