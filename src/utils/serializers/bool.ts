/**
 * Converts a Uint8Array to boolean.
 *
 * @param arr - the Uint8Array to convert
 */
export function byteToBool(arr: Uint8Array): boolean {
  return !!arr[0];
}

/**
 * Converts a boolean to Uint8Array.
 *
 * @param val - the number to convert
 */
export function boolToByte(val: boolean): Uint8Array {
  return new Uint8Array([val ? 1 : 0]);
}
