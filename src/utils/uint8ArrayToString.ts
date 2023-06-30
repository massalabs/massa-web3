/**
 * Converts any Uint8Array to string
 *
 * @param bytesArray - Uint8Array to convert
 *
 * @returns The string representation of the Uint8Array
 */
export function bytesArrayToString(bytesArray: Uint8Array): string {
  let str = '';
  // use a for-of loop
  for (const byte of bytesArray) {
    str += String.fromCharCode(byte);
  }
  return str;
}
