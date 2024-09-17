import { U64 } from './serializers/number/u64';
export declare const NB_DECIMALS = 9;
export declare const SIZE_U256_BIT = 256;
export declare const ERROR_NOT_SAFE_INTEGER = "value is not a safe integer.";
export declare const ERROR_VALUE_TOO_LARGE = "value is too large.";
/**
 * Defines 'Mas' as a type for representing nano massa,
 * the smallest unit in Massa currency equivalent to 10^9.
 */
export type Mas = U64;
/**
 * Converts an integer value to the smallest unit of the Massa currency.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger#description
 *
 * @param value - The integer value.
 * @returns The value in the smallest unit of the Massa currency.
 *
 * @throws An error if the value is not a safe integer.
 */
export declare function fromMas(value: U64): Mas;
/**
 * Converts an integer value in milli Massa to the smallest unit of the Massa currency.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger#description
 *
 * @param value - The value in milli Massa.
 * @returns The value in the smallest unit of the Massa currency.
 *
 * @throws An error if the value is not a safe integer.
 */
export declare function fromMilliMas(value: U64): Mas;
/**
 * Converts an integer value in micro Massa to the smallest unit of the Massa currency.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger#description
 *
 * @param value - The value in micro Massa.
 * @returns The value in the smallest unit of the Massa currency.
 *
 * @throws An error if the value is not a safe integer.
 */
export declare function fromMicroMas(value: U64): Mas;
/**
 * Converts an integer value in nano Massa to the smallest unit of the Massa currency.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger#description
 *
 * @param value - The value in nano Massa.
 * @returns The value in the smallest unit of the Massa currency.
 *
 * @throws An error if the value is not a safe integer.
 */
export declare function fromNanoMas(value: U64): Mas;
/**
 * Converts a decimal value in Mas to the smallest unit of the Massa currency.
 *
 * @param value - The decimal value.
 * @returns The value in the smallest unit of the Massa currency.
 *
 * @throws An error if the format is not a decimal.
 * @throws An error if the value is too large to be represented by an U256 or has too many decimals.
 */
export declare function fromString(value: string): Mas;
/**
 * Converts a Mas value to a string with rounding approximation.
 *
 * @param value - The Mas value.
 * @param decimalPlaces - The number of decimal places to include in the string.
 * @returns The value as a string.
 *
 * @throws An error if the value is too large to be represented by a U256.
 */
export declare function toString(value: Mas, decimalPlaces?: number | null): string;
