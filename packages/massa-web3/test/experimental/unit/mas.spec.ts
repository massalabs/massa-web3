import { Mas } from '../../../src/experimental/basicElements'

describe('amount conversion', () => {
  it('converts from integer', () => {
    expect(Mas.fromMas(1n)).toStrictEqual(1_000_000_000n)
    expect(Mas.fromMas(1234n)).toStrictEqual(1_234_000_000_000n)
    expect(() => Mas.fromMas(BigInt(1) << BigInt(256))).toThrow()

    expect(Mas.fromMilliMas(1n)).toStrictEqual(1_000_000n)
    expect(Mas.fromMilliMas(1234n)).toStrictEqual(1_234_000_000n)

    expect(Mas.fromMicroMas(1n)).toStrictEqual(1_000n)
    expect(Mas.fromMicroMas(1234n)).toStrictEqual(1_234_000n)

    expect(Mas.fromNanoMas(1n)).toStrictEqual(1n)
    expect(Mas.fromNanoMas(1234n)).toStrictEqual(1_234n)
  })

  it('converts from string', () => {
    expect(Mas.fromString('1')).toStrictEqual(1_000_000_000n)
    expect(Mas.fromString('1.1')).toStrictEqual(1_100_000_000n)
    expect(Mas.fromString('01234.56789')).toStrictEqual(1_234_567_890_000n)
    expect(Mas.fromString('01234.567890000')).toStrictEqual(1_234_567_890_000n)
    expect(() => Mas.fromString('1.1.1')).toThrow()
    expect(() => Mas.fromString('0.1234567890')).toThrow()
    expect(() =>
      Mas.fromString((BigInt(1) << BigInt(256)).toString())
    ).toThrow()
  })

  it('converts to string', () => {
    expect(Mas.toString(1_000_000_000n)).toStrictEqual('1')
    expect(Mas.toString(1_100_000_000n)).toStrictEqual('1.1')
    expect(Mas.toString(1_234_567_890_000n)).toStrictEqual('1234.56789')
    expect(Mas.toString(100_000n)).toStrictEqual('0.0001')
  })
})
