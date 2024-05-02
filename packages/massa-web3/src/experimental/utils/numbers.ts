import { FIRST } from './noMagic'

export const MAS_DECIMALS = 9

/**
 * Convert Mas float amount to 9 decimals bigint
 *
 * @param amount - MAS amount in floating point representation
 * @returns amount in nanoMAS
 */
export function toNanoMas(amount: string | number): bigint {
  if (typeof amount === 'number') {
    amount = amount.toString()
  }
  const [integerPart, decimalPart = ''] = amount.split('.')
  return BigInt(integerPart + decimalPart.padEnd(MAS_DECIMALS, '0'))
}

/**
 * Convert nanoMas bigint amount to floating point Mas string
 *
 * @param amount - nanoMAS amount in bigint representation
 * @returns amount in MAS
 */
export function toMas(amount: bigint): string {
  const amountString = amount.toString()
  const integerPart = amountString.slice(FIRST, -MAS_DECIMALS) || '0'
  const decimalPart = amountString.slice(-MAS_DECIMALS).replace(/0+$/, '')
  return `${integerPart}${decimalPart.length ? '.' + decimalPart : ''}`
}
