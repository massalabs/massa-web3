/**
 * This module provides encoding and decoding functions for various data types.
 * It includes functions for strings, numeric data (integers and floating-point numbers),
 * booleans, and arrays containing native types.
 */
import { Args } from '../args';
/**
 * This module exports encoding and decoding functions for strings.
 */
export * from './strings';
/**
 * This module exports functions needed to process numeric data, such as integers and
 * floating point numbers and their binary representations in Uint8Array.
 * The functions handle signed and unsigned native integers.
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
export function argsListToBytes(argsList) {
    return argsList.reduce((acc, curr) => Args.concatArrays(acc, new TextEncoder().encode(curr.value)), 
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    new Uint8Array(0));
}
export * from './number/index';
export * from './interface';
//# sourceMappingURL=index.js.map