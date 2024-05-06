import { FIRST, ONE } from '../utils'
import { U64, fromNumber } from './serializers/number/u64'

const NB_DECIMALS = 9
const POWER_TEN = 10

export const ERROR_NOT_SAFE_INTEGER = 'value is not a safe integer.'
export const ERROR_VALUE_TOO_LARGE = 'value is too large.'

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
 * Converts a decimal value to the smallest unit of the Massa currency.
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

  const integerPart = parts[FIRST]
  const decimalPart = parts[ONE] || ''
  if (decimalPart.length > NB_DECIMALS) {
    throw new Error(ERROR_VALUE_TOO_LARGE)
  }

  const mas = BigInt(integerPart + decimalPart.padEnd(NB_DECIMALS, '0'))

  return fromNumber(mas)
}

/**
 * Converts a value in the smallest unit of the Massa currency to a decimal value.
 *
 * @param value - The value in the smallest unit of the Massa currency.
 * @returns The decimal value.
 */
export function toString(value: Mas): string {
  const valueString = value.toString()
  const integerPart = valueString.slice(FIRST, -NB_DECIMALS) || '0'
  const decimalPart = valueString.slice(-NB_DECIMALS).replace(/0+$/, '')
  return `${integerPart}${decimalPart.length ? '.' + decimalPart : ''}`
}
