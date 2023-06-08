/**
 * Converts utf-16 string to a Uint8Array.
 *
 * @param str - the string to convert
 *
 * @returns the converted string
 */
export function strToBytes(str: string): Uint8Array {
  if (!str.length) {
    return new Uint8Array(0);
  }
  return new Uint8Array(Buffer.from(str, 'utf-8'));
}

/**
 * Converts Uint8Array to a string.
 *
 * @param arr - the array to convert
 *
 * @returns the converted array
 */
export function bytesToStr(arr: Uint8Array): string {
  if (!arr.length) {
    return '';
  }

  if (typeof window === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const StringDecoder = require('string_decoder').StringDecoder;
    const decoder = new StringDecoder('utf-8');
    return decoder.write(Buffer.from(arr));
  }

  let TextDecoder = window.TextDecoder;
  if (typeof TextDecoder === 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    TextDecoder = require('util').TextDecoder;
  }
  const textDecoder = new TextDecoder('utf-8');
  return textDecoder.decode(arr);
}
