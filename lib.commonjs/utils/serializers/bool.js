"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolToByte = exports.byteToBool = void 0;
/**
 * Converts a Uint8Array to boolean.
 *
 * @param arr - the Uint8Array to convert
 */
function byteToBool(arr) {
    return !!arr[0];
}
exports.byteToBool = byteToBool;
/**
 * Converts a boolean to Uint8Array.
 *
 * @param val - the number to convert
 */
function boolToByte(val) {
    return new Uint8Array([val ? 1 : 0]);
}
exports.boolToByte = boolToByte;
//# sourceMappingURL=bool.js.map