/**
 * This module provides encoding and decoding functions for various data types.
 * It includes functions for strings, numeric data (integers and floating-point numbers),
 * booleans, and arrays containing native types.
 *
 * @module
 */

import { IParam } from '../arguments';

/**
 * This module exports encoding and decoding functions for strings.
 */
export * from './strings';

/**
 * This module exports functions needed to process numeric data, such as integers and
 * floating point numbers and their binary representations in Uint8Array.
 * The functions handle signed and unsigned integers, as well as BigInt for 64-bit integers.
 */
export * from './numbers';

/**
 * This module exports encoding and decoding functions for booleans.
 */
export * from './bool';

/**
 * This module exports serialization and deserialization functions for arrays containing native types.
 */
export * from './arrays';

export function argsListToBytes(argsList: IParam[]): Uint8Array {
  let result = new Uint8Array(0);
  for (let i = 0; i < argsList.length; i++) {
    result = concatBytes(result, new TextEncoder().encode(argsList[i].value));
  }
  return result;
}

/**
 * Concatenates two Uint8Array
 * @param result
 * @param arg1
 */
function concatBytes(part1: Uint8Array, part2: Uint8Array): Uint8Array {
  const result = new Uint8Array(part1.length + part2.length);
  result.set(part1);
  result.set(part2, part1.length);
  return result;
}
