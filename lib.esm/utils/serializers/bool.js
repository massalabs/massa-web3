/**
 * Converts a Uint8Array to boolean.
 *
 * @param arr - the Uint8Array to convert
 */
export function byteToBool(arr) {
    return !!arr[0];
}
/**
 * Converts a boolean to Uint8Array.
 *
 * @param val - the number to convert
 */
export function boolToByte(val) {
    return new Uint8Array([val ? 1 : 0]);
}
//# sourceMappingURL=bool.js.map