import * as Mas from '../../../src/experimental/basicElements/mas'

describe('amount conversion', () => {
  it('converts from integer', () => {
    expect(Mas.fromMas(1)).toStrictEqual(1_000_000_000n)
    expect(Mas.fromMas(1234)).toStrictEqual(1_234_000_000_000n)
    expect(() => Mas.fromMas(1.1)).toThrow('value is not a safe integer.')

    expect(Mas.fromMilliMas(1)).toStrictEqual(1_000_000n)
    expect(Mas.fromMilliMas(1234)).toStrictEqual(1_234_000_000n)
    expect(() => Mas.fromMilliMas(1.1)).toThrow('value is not a safe integer.')

    expect(Mas.fromMicroMas(1)).toStrictEqual(1_000n)
    expect(Mas.fromMicroMas(1234)).toStrictEqual(1_234_000n)
    expect(() => Mas.fromMicroMas(1.1)).toThrow('value is not a safe integer.')

    expect(Mas.fromNanoMas(1)).toStrictEqual(1n)
    expect(Mas.fromNanoMas(1234)).toStrictEqual(1_234n)
    expect(() => Mas.fromNanoMas(1.1)).toThrow('value is not a safe integer.')
  })

  it('converts from string', () => {
    expect(Mas.fromString('1')).toStrictEqual(1_000_000_000n)
    expect(Mas.fromString('1.1')).toStrictEqual(1_100_000_000n)
    expect(Mas.fromString('01234.56789')).toStrictEqual(1_234_567_890_000n)
    expect(Mas.fromString('01234.567890000')).toStrictEqual(1_234_567_890_000n)
  })

  it('converts to string', () => {
    expect(Mas.toString(1_000_000_000n)).toStrictEqual('1')
    expect(Mas.toString(1_100_000_000n)).toStrictEqual('1.1')
    expect(Mas.toString(1_234_567_890_000n)).toStrictEqual('1234.56789')
  })
})
