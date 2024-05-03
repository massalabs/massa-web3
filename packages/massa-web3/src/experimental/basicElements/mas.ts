const NB_DECIMALS = 9

export type Mas = bigint

export function fromMas(value: number): Mas {
  if (!Number.isSafeInteger(value)) {
    throw new Error('value is not a safe integer.')
  }

  return BigInt(value * 10 ** NB_DECIMALS)
}

export function fromMilliMas(value: number): Mas {
  if (!Number.isSafeInteger(value)) {
    throw new Error('value is not a safe integer.')
  }

  return BigInt(value * 10 ** (NB_DECIMALS - 3))
}

export function fromMicroMas(value: number): Mas {
  if (!Number.isSafeInteger(value)) {
    throw new Error('value is not a safe integer.')
  }

  return BigInt(value * 10 ** (NB_DECIMALS - 6))
}

export function fromNanoMas(value: number): Mas {
  if (!Number.isSafeInteger(value)) {
    throw new Error('value is not a safe integer.')
  }

  return BigInt(value * 10 ** (NB_DECIMALS - 9))
}

export function fromString(value: string): Mas {
  const [integerPart, decimalPart = ''] = value.split('.')
  return BigInt(integerPart + decimalPart.padEnd(NB_DECIMALS, '0'))
}

export function toString(value: Mas): string {
  const valueString = value.toString()
  const integerPart = valueString.slice(0, -NB_DECIMALS) || '0'
  const decimalPart = valueString.slice(-NB_DECIMALS).replace(/0+$/, '')
  return `${integerPart}${decimalPart.length ? '.' + decimalPart : ''}`
}
