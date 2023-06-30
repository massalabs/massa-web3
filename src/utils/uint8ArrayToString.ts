/**
 * Converts any Uint8Array to string
 *
 * @param bytesArray - Uint8Array to convert
 *
 * @returns The string representation of the Uint8Array
 */
export function bytesArrayToString(bytesArray: Uint8Array): string {
  let str = '';
  for (let i = 0; i < bytesArray.length; i++) {
    str += String.fromCharCode(bytesArray[i]);
  }
  return str;
}
