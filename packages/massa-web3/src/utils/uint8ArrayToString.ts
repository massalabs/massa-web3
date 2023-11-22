/**
 * Converts a Uint8Array to a string representation.
 *
 * @param bytesArray - The Uint8Array to convert to a string.
 * @returns The string representation of the Uint8Array.
 */
export function bytesArrayToString(bytesArray: Uint8Array): string {
  return String.fromCharCode(...bytesArray);
}
