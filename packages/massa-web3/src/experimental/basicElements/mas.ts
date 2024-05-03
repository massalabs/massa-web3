import { FIRST, ONE } from '../utils'

const NB_DECIMALS = 9
const POWER_TEN = 10
const SIZE_U256_BIT = 256

export const ERROR_NOT_SAFE_INTEGER = 'value is not a safe integer.'
export const ERROR_VALUE_TOO_LARGE = 'value is too large.'

export type Mas = bigint

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
export function fromMas(value: number): Mas {
  if (!Number.isSafeInteger(value)) {
    throw new Error(ERROR_NOT_SAFE_INTEGER)
  }

  return BigInt(value * POWER_TEN ** NB_DECIMALS)
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
export function fromMilliMas(value: number): Mas {
  if (!Number.isSafeInteger(value)) {
    throw new Error(ERROR_NOT_SAFE_INTEGER)
  }
  const milli = 3
  return BigInt(value * POWER_TEN ** (NB_DECIMALS - milli))
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
export function fromMicroMas(value: number): Mas {
  if (!Number.isSafeInteger(value)) {
    throw new Error(ERROR_NOT_SAFE_INTEGER)
  }
  const micro = 6
  return BigInt(value * POWER_TEN ** (NB_DECIMALS - micro))
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
export function fromNanoMas(value: number): Mas {
  if (!Number.isSafeInteger(value)) {
    throw new Error(ERROR_NOT_SAFE_INTEGER)
  }

  const nano = 9
  return BigInt(value * POWER_TEN ** (NB_DECIMALS - nano))
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
  if (mas >= BigInt(ONE) << BigInt(SIZE_U256_BIT)) {
    throw new Error(ERROR_VALUE_TOO_LARGE)
  }

  return mas
}

/**
 * Converts a value in the smallest unit of the Massa currency to a decimal value.
 *
 * @param value - The value in the smallest unit of the Massa currency.
 * @returns The decimal value.
 *
 * @throws An error if the value is too large to be represented by an U256.
 */
export function toString(value: Mas): string {
  if (value >= BigInt(ONE) << BigInt(SIZE_U256_BIT)) {
    throw new Error(ERROR_VALUE_TOO_LARGE)
  }
  const valueString = value.toString()
  const integerPart = valueString.slice(FIRST, -NB_DECIMALS) || '0'
  const decimalPart = valueString.slice(-NB_DECIMALS).replace(/0+$/, '')
  return `${integerPart}${decimalPart.length ? '.' + decimalPart : ''}`
}
