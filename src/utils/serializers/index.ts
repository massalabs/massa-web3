/**
 * This module provides encoding and decoding functions for various data types.
 * It includes functions for strings, numeric data (integers and floating-point numbers),
 * booleans, and arrays containing native types.
 *
 * @module
 */

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
