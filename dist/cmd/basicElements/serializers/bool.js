"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolToByte = exports.byteToBool = void 0;
const FIRST = 0;
const SECOND = 1;
/**
 * Converts a Uint8Array to a boolean value.
 *
 * @param arr - The Uint8Array to convert.
 *
 * @returns The converted boolean value.
 */
function byteToBool(arr) {
    return !!arr[FIRST];
}
exports.byteToBool = byteToBool;
/**
 * Converts a boolean value to a Uint8Array.
 *
 * @param val - The boolean value to convert.
 *
 * @returns The converted Uint8Array.
 */
function boolToByte(val) {
    return new Uint8Array([val ? SECOND : FIRST]);
}
exports.boolToByte = boolToByte;
//# sourceMappingURL=bool.js.map