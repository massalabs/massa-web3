/**
 *  Decodes the raw event data from base64 to Uint8Array
 *
 * @param eventData - The raw event data in base64 format
 *
 * @returns The decoded raw event data
 */
export function rawEventDecode(eventData: string): Uint8Array {
  return Uint8Array.from(Buffer.from(eventData, 'base64'))
}
