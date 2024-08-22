import Decimal from 'decimal.js'
import { U64, fromNumber } from './serializers/number/u64'

export const NB_DECIMALS = 9
export const SIZE_U256_BIT = 256
const POWER_TEN = 10

export const ERROR_NOT_SAFE_INTEGER = 'value is not a safe integer.'
export const ERROR_VALUE_TOO_LARGE = 'value is too large.'

/**
 * Defines 'Mas' as a type for representing nano massa,
 * the smallest unit in Massa currency equivalent to 10^9.
 */
export type Mas = U64

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
export function fromMas(value: U64): Mas {
  return fromNumber(value * BigInt(POWER_TEN) ** BigInt(NB_DECIMALS))
}

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
export function fromMilliMas(value: U64): Mas {
  const milli = 3
  return fromNumber(value * BigInt(POWER_TEN) ** BigInt(NB_DECIMALS - milli))
}

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
export function fromMicroMas(value: U64): Mas {
  const micro = 6
  return fromNumber(value * BigInt(POWER_TEN) ** BigInt(NB_DECIMALS - micro))
}

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
export function fromNanoMas(value: U64): Mas {
  const nano = 9
  return fromNumber(value * BigInt(POWER_TEN) ** BigInt(NB_DECIMALS - nano))
}

/**
 * Converts a decimal value in Mas to the smallest unit of the Massa currency.
 *
 * @param value - The decimal value.
 * @returns The value in the smallest unit of the Massa currency.
 *
 * @throws An error if the format is not a decimal.
 * @throws An error if the value is too large to be represented by an U256 or has too many decimals.
 */
export function fromString(value: string): Mas {
  const parts = value.split('.')
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  if (parts.length > 2) {
    throw new Error('invalid format')
  }

  const integerPart = parts[0]
  const decimalPart = parts[1] || ''
  if (decimalPart.length > NB_DECIMALS) {
    throw new Error(ERROR_VALUE_TOO_LARGE)
  }

  const mas = BigInt(integerPart + decimalPart.padEnd(NB_DECIMALS, '0'))

  return fromNumber(mas)
}
/**
 * Converts a Mas value to a string with rounding approximation.
 *
 * @param value - The Mas value.
 * @param decimalPlaces - The number of decimal places to include in the string.
 * @returns The value as a string.
 *
 * @throws An error if the value is too large to be represented by a U256.
 */
export function toString(
  value: Mas,
  decimalPlaces: number | null = null
): string {
  if (BigInt(value) >= 1n << BigInt(SIZE_U256_BIT)) {
    throw new Error(ERROR_VALUE_TOO_LARGE)
  }

  const scaledValue = new Decimal(value.toString()).div(`1e+${NB_DECIMALS}`)

  return decimalPlaces !== null
    ? scaledValue.toFixed(decimalPlaces, Decimal.ROUND_HALF_UP)
    : scaledValue.toString()
}
