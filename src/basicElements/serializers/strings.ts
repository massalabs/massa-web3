/**
 * Converts utf-16 string to a Uint8Array.
 *
 * @param str - the string to convert
 *
 * @returns the converted string
 */
export function strToBytes(str: string): Uint8Array {
  if (!str.length) {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    return new Uint8Array(0)
  }
  return new TextEncoder().encode(str)
}

/**
 * Converts Uint8Array to a string.
 *
 * @param arr - the array to convert
 *
 * @returns A string representation of the array in utf-8 encoding
 */
export function bytesToStr(arr: Uint8Array): string {
  if (!arr.length) {
    return ''
  }
  return new TextDecoder().decode(arr)
}
