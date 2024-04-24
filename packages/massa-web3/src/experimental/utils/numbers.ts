export const MAS_DECIMALS = 9

/**
 * Convert Mas float amount to 9 decimals bigint
 *
 * @param amount - MAS amount in floating point representation
 * @returns amount in nanoMAS
 */
export const toNanoMas = (amount: string | number): bigint => {
  if (typeof amount === 'number') {
    amount = amount.toString()
  }
  let [integerPart, decimalPart] = amount.split('.')
  decimalPart = decimalPart ?? ''
  return BigInt(integerPart + decimalPart.padEnd(MAS_DECIMALS, '0'))
}

/**
 * Convert nanoMas bigint amount to floating point Mas string
 *
 * @param amount - nanoMAS amount in bigint representation
 * @returns amount in MAS
 */
export const toMas = (amount: bigint): string => {
  const amountString = amount.toString()
  const integerPart = amountString.slice(0, -MAS_DECIMALS) || '0'
  const decimalPart = amountString.slice(-MAS_DECIMALS).replace(/0+$/, '')
  return `${integerPart}${decimalPart.length ? '.' + decimalPart : ''}`
}
