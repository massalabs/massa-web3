import { toNanoMas } from '../../../src/experimental/utils'

describe('amount format conversion tests', () => {
  it('MAS(string) => nMAS', () => {
    let amount = '0'
    expect(toNanoMas(amount)).toStrictEqual(BigInt(0))

    amount = '1.5234'
    expect(toNanoMas(amount)).toStrictEqual(BigInt('1523400000'))

    amount = '0.123456789'
    expect(toNanoMas(amount)).toStrictEqual(BigInt('123456789'))

    amount = '123456789'
    expect(toNanoMas(amount)).toStrictEqual(BigInt('123456789000000000'))

    amount = '123456789.123456789'
    expect(toNanoMas(amount)).toStrictEqual(BigInt('123456789123456789'))
  })

  it('MAS(number) => nMAS', () => {
    let amount = 0
    expect(toNanoMas(amount)).toStrictEqual(BigInt(0))

    amount = 1.5234
    expect(toNanoMas(amount)).toStrictEqual(BigInt('1523400000'))

    amount = 0.123456789
    expect(toNanoMas(amount)).toStrictEqual(BigInt('123456789'))

    amount = 123456789
    expect(toNanoMas(amount)).toStrictEqual(BigInt('123456789000000000'))

    // max safe floating point number
    // see https://stackoverflow.com/questions/45929493/node-js-maximum-safe-floating-point-number
    amount = 8388607.123456789
    expect(toNanoMas(amount)).toStrictEqual(BigInt('8388607123456789'))
  })
})
