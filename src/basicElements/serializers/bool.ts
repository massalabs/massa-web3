const FIRST = 0
const SECOND = 1
/**
 * Converts a Uint8Array to a boolean value.
 *
 * @param arr - The Uint8Array to convert.
 *
 * @returns The converted boolean value.
 */
export function byteToBool(arr: Uint8Array): boolean {
  return !!arr[FIRST]
}

/**
 * Converts a boolean value to a Uint8Array.
 *
 * @param val - The boolean value to convert.
 *
 * @returns The converted Uint8Array.
 */
export function boolToByte(val: boolean): Uint8Array {
  return new Uint8Array([val ? SECOND : FIRST])
}
