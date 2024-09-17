"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = exports.fromString = exports.fromNanoMas = exports.fromMicroMas = exports.fromMilliMas = exports.fromMas = exports.ERROR_VALUE_TOO_LARGE = exports.ERROR_NOT_SAFE_INTEGER = exports.SIZE_U256_BIT = exports.NB_DECIMALS = void 0;
const tslib_1 = require("tslib");
const decimal_js_1 = tslib_1.__importDefault(require("decimal.js"));
const u64_1 = require("./serializers/number/u64");
exports.NB_DECIMALS = 9;
exports.SIZE_U256_BIT = 256;
const POWER_TEN = 10;
exports.ERROR_NOT_SAFE_INTEGER = 'value is not a safe integer.';
exports.ERROR_VALUE_TOO_LARGE = 'value is too large.';
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
function fromMas(value) {
    return (0, u64_1.fromNumber)(value * BigInt(POWER_TEN) ** BigInt(exports.NB_DECIMALS));
}
exports.fromMas = fromMas;
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
function fromMilliMas(value) {
    const milli = 3;
    return (0, u64_1.fromNumber)(value * BigInt(POWER_TEN) ** BigInt(exports.NB_DECIMALS - milli));
}
exports.fromMilliMas = fromMilliMas;
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
function fromMicroMas(value) {
    const micro = 6;
    return (0, u64_1.fromNumber)(value * BigInt(POWER_TEN) ** BigInt(exports.NB_DECIMALS - micro));
}
exports.fromMicroMas = fromMicroMas;
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
function fromNanoMas(value) {
    const nano = 9;
    return (0, u64_1.fromNumber)(value * BigInt(POWER_TEN) ** BigInt(exports.NB_DECIMALS - nano));
}
exports.fromNanoMas = fromNanoMas;
/**
 * Converts a decimal value in Mas to the smallest unit of the Massa currency.
 *
 * @param value - The decimal value.
 * @returns The value in the smallest unit of the Massa currency.
 *
 * @throws An error if the format is not a decimal.
 * @throws An error if the value is too large to be represented by an U256 or has too many decimals.
 */
function fromString(value) {
    const parts = value.split('.');
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (parts.length > 2) {
        throw new Error('invalid format');
    }
    const integerPart = parts[0];
    const decimalPart = parts[1] || '';
    if (decimalPart.length > exports.NB_DECIMALS) {
        throw new Error(exports.ERROR_VALUE_TOO_LARGE);
    }
    const mas = BigInt(integerPart + decimalPart.padEnd(exports.NB_DECIMALS, '0'));
    return (0, u64_1.fromNumber)(mas);
}
exports.fromString = fromString;
/**
 * Converts a Mas value to a string with rounding approximation.
 *
 * @param value - The Mas value.
 * @param decimalPlaces - The number of decimal places to include in the string.
 * @returns The value as a string.
 *
 * @throws An error if the value is too large to be represented by a U256.
 */
function toString(value, decimalPlaces = null) {
    if (BigInt(value) >= 1n << BigInt(exports.SIZE_U256_BIT)) {
        throw new Error(exports.ERROR_VALUE_TOO_LARGE);
    }
    const scaledValue = new decimal_js_1.default(value.toString()).div(`1e+${exports.NB_DECIMALS}`);
    return decimalPlaces !== null
        ? scaledValue.toFixed(decimalPlaces, decimal_js_1.default.ROUND_HALF_UP)
        : scaledValue.toString();
}
exports.toString = toString;
//# sourceMappingURL=mas.js.map