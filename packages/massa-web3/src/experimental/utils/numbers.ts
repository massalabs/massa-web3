export const MAS_DECIMALS = 9

/**
 * Convert Mas float amount to 9 decimals bigint
 *
 * @param amount MAS amount in floating point representation
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
