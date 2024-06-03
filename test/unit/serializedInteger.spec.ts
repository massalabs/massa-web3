import { U8, U16, U32, U64, U256, U128 } from '../../src/basicElements'

describe('Integer serialization', () => {
  test('U8', async () => {
    expect(U8.SIZE_BIT).toBe(8)
    expect(U8.MAX).toBe(255n)

    expect(U8.fromNumber(255)).toBe(255n)
    expect(U8.fromNumber(0)).toBe(0n)
    expect(() => U8.fromNumber(256)).toThrow(
      'value 256 is too large for an U8.'
    )
    expect(() => U8.fromNumber(-1)).toThrow(
      "negative value can't be serialized as unsigned integer."
    )
    expect(() => U8.fromNumber(1.1)).toThrow('value 1.1 is not a safe integer.')

    expect(U8.fromBytes(new Uint8Array([255]))).toBe(255n)
    expect(U8.fromBytes(new Uint8Array([0]))).toBe(0n)
    expect(() => U8.fromBytes(new Uint8Array())).toThrow(
      'not enough bytes to read the value.'
    )

    expect(U8.toBytes(255n)).toEqual(Uint8Array.from([255]))
    expect(U8.toBytes(0n)).toEqual(Uint8Array.from([0]))

    expect(U8.fromBuffer(new Uint8Array([255]), 0)).toEqual({
      value: 255n,
      offset: 1,
    })
    expect(U8.fromBuffer(new Uint8Array([0]), 0)).toEqual({
      value: 0n,
      offset: 1,
    })
    expect(U8.fromBuffer(new Uint8Array([255, 0]), 0)).toEqual({
      value: 255n,
      offset: 1,
    })
    expect(U8.fromBuffer(new Uint8Array([255, 0]), 1)).toEqual({
      value: 0n,
      offset: 2,
    })
    expect(() => U8.fromBuffer(new Uint8Array(), 0)).toThrow(
      'not enough bytes to read the value.'
    )
    expect(() => U8.fromBuffer(new Uint8Array([255, 0]), 2)).toThrow(
      'not enough bytes to read the value.'
    )
  })

  test('U16', async () => {
    expect(U16.SIZE_BIT).toBe(16)
    expect(U16.MAX).toBe(65_535n)

    expect(U16.fromNumber(65_535)).toBe(65_535n)
    expect(U16.fromNumber(0)).toBe(0n)
    expect(() => U16.fromNumber(65536)).toThrow(
      'value 65536 is too large for an U16.'
    )
    expect(() => U16.fromNumber(-1)).toThrow(
      "negative value can't be serialized as unsigned integer."
    )
    expect(() => U16.fromNumber(1.1)).toThrow(
      'value 1.1 is not a safe integer.'
    )

    expect(U16.fromBytes(new Uint8Array([255, 0]))).toBe(255n)
    expect(U16.fromBytes(new Uint8Array([0, 0]))).toBe(0n)
    expect(() => U16.fromBytes(new Uint8Array([255]))).toThrow(
      'not enough bytes to read the value.'
    )

    expect(U16.toBytes(65_535n)).toEqual(Uint8Array.from([255, 255]))
    expect(U16.toBytes(255n)).toEqual(Uint8Array.from([255, 0]))
    expect(U16.toBytes(0n)).toEqual(Uint8Array.from([0, 0]))

    expect(U16.fromBuffer(new Uint8Array([255, 255, 0]), 0)).toEqual({
      value: 65_535n,
      offset: 2,
    })
    expect(U16.fromBuffer(new Uint8Array([255, 255, 0]), 1)).toEqual({
      value: 255n,
      offset: 3,
    })
    expect(() => U16.fromBuffer(new Uint8Array([255]), 0)).toThrow(
      'not enough bytes to read the value.'
    )
    expect(() => U16.fromBuffer(new Uint8Array([255, 255, 0]), 2)).toThrow(
      'not enough bytes to read the value.'
    )
  })

  test('U32', async () => {
    expect(U32.SIZE_BIT).toBe(32)
    expect(U32.MAX).toBe(4_294_967_295n)

    expect(U32.fromNumber(4_294_967_295)).toBe(4_294_967_295n)
    expect(U32.fromNumber(0)).toBe(0n)
    expect(() => U32.fromNumber(4_294_967_296)).toThrow(
      'value 4294967296 is too large for an U32.'
    )
    expect(() => U32.fromNumber(-1)).toThrow(
      "negative value can't be serialized as unsigned integer."
    )
    expect(() => U32.fromNumber(1.1)).toThrow(
      'value 1.1 is not a safe integer.'
    )

    expect(U32.fromBytes(new Uint8Array([255, 255, 255, 255]))).toBe(
      4294967295n
    )
    expect(U32.fromBytes(new Uint8Array([0, 0, 0, 0]))).toBe(0n)
    expect(() => U32.fromBytes(new Uint8Array([255, 255, 255]))).toThrow(
      'not enough bytes to read the value.'
    )

    expect(U32.toBytes(4_294_967_295n)).toEqual(
      Uint8Array.from([255, 255, 255, 255])
    )
    expect(U32.toBytes(65_535n)).toEqual(Uint8Array.from([255, 255, 0, 0]))
    expect(U32.toBytes(255n)).toEqual(Uint8Array.from([255, 0, 0, 0]))
    expect(U32.toBytes(0n)).toEqual(Uint8Array.from([0, 0, 0, 0]))

    expect(U32.fromBuffer(new Uint8Array([255, 255, 255, 255, 0]), 0)).toEqual({
      value: 4_294_967_295n,
      offset: 4,
    })
    expect(U32.fromBuffer(new Uint8Array([255, 255, 255, 255, 0]), 1)).toEqual({
      value: 16_777_215n,
      offset: 5,
    })
    expect(() => U32.fromBuffer(new Uint8Array([255, 255, 255]), 0)).toThrow(
      'not enough bytes to read the value.'
    )
    expect(() =>
      U32.fromBuffer(new Uint8Array([255, 255, 255, 255, 0]), 4)
    ).toThrow('not enough bytes to read the value.')
  })

  test('U64', async () => {
    expect(U64.SIZE_BIT).toBe(64)
    expect(U64.MAX).toBe(18_446_744_073_709_551_615n)

    expect(U64.fromNumber(Number.MAX_SAFE_INTEGER)).toBe(9_007_199_254_740_991n)
    expect(U64.fromNumber(18_446_744_073_709_551_615n)).toBe(
      18_446_744_073_709_551_615n
    )
    expect(U64.fromNumber(0)).toBe(0n)
    expect(() => U64.fromNumber(Number.MAX_SAFE_INTEGER + 1)).toThrow(
      'value 9007199254740992 is not a safe integer.'
    )
    expect(() => U64.fromNumber(18_446_744_073_709_551_616n)).toThrow(
      'value 18446744073709551616 is too large for an U64.'
    )
    expect(() => U64.fromNumber(-1)).toThrow(
      "negative value can't be serialized as unsigned integer."
    )
    expect(() => U64.fromNumber(1.1)).toThrow(
      'value 1.1 is not a safe integer.'
    )

    expect(
      U64.fromBytes(new Uint8Array([255, 255, 255, 255, 255, 255, 255, 255]))
    ).toBe(18_446_744_073_709_551_615n)
    expect(U64.fromBytes(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]))).toBe(0n)
    expect(() =>
      U64.fromBytes(new Uint8Array([255, 255, 255, 255, 255, 255, 255]))
    ).toThrow('not enough bytes to read the value.')

    expect(U64.toBytes(18_446_744_073_709_551_615n)).toEqual(
      Uint8Array.from([255, 255, 255, 255, 255, 255, 255, 255])
    )
    expect(U64.toBytes(4_294_967_295n)).toEqual(
      Uint8Array.from([255, 255, 255, 255, 0, 0, 0, 0])
    )
    expect(U64.toBytes(65_535n)).toEqual(
      Uint8Array.from([255, 255, 0, 0, 0, 0, 0, 0])
    )
    expect(U64.toBytes(255n)).toEqual(
      Uint8Array.from([255, 0, 0, 0, 0, 0, 0, 0])
    )
    expect(U64.toBytes(0n)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]))
  })

  test('U128', async () => {
    expect(U128.SIZE_BIT).toBe(128)
    expect(U128.MAX).toBe(340282366920938463463374607431768211455n)

    expect(U128.fromNumber(Number.MAX_SAFE_INTEGER)).toBe(9007199254740991n)
    expect(U128.fromNumber(340282366920938463463374607431768211455n)).toBe(
      340282366920938463463374607431768211455n
    )
    expect(U128.fromNumber(0)).toBe(0n)
    expect(() => U128.fromNumber(Number.MAX_SAFE_INTEGER + 1)).toThrow(
      'value 9007199254740992 is not a safe integer.'
    )
    expect(() =>
      U128.fromNumber(340282366920938463463374607431768211456n)
    ).toThrow(
      'value 340282366920938463463374607431768211456 is too large for an U128.'
    )
    expect(() => U128.fromNumber(-1)).toThrow(
      "negative value can't be serialized as unsigned integer."
    )
    expect(() => U128.fromNumber(1.1)).toThrow(
      'value 1.1 is not a safe integer.'
    )

    expect(
      U128.fromBytes(
        new Uint8Array([
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255,
        ])
      )
    ).toBe(340282366920938463463374607431768211455n)
    expect(
      U128.fromBytes(
        new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
      )
    ).toBe(0n)
    expect(() =>
      U128.fromBytes(
        new Uint8Array([
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255,
        ])
      )
    ).toThrow('not enough bytes to read the value.')

    expect(U128.toBytes(340282366920938463463374607431768211455n)).toEqual(
      Uint8Array.from([
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
        255, 255,
      ])
    )
    expect(U128.toBytes(4294967295n)).toEqual(
      Uint8Array.from([255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    )
    expect(U128.toBytes(65535n)).toEqual(
      Uint8Array.from([255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    )
    expect(U128.toBytes(255n)).toEqual(
      Uint8Array.from([255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    )
    expect(U128.toBytes(0n)).toEqual(
      Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    )
  })

  test('U256', async () => {
    expect(U256.SIZE_BIT).toBe(256)
    expect(U256.MAX).toBe(
      115792089237316195423570985008687907853269984665640564039457584007913129639935n
    )

    expect(U256.fromNumber(Number.MAX_SAFE_INTEGER)).toBe(9007199254740991n)
    expect(
      U256.fromNumber(
        115792089237316195423570985008687907853269984665640564039457584007913129639935n
      )
    ).toBe(
      115792089237316195423570985008687907853269984665640564039457584007913129639935n
    )
    expect(U256.fromNumber(0)).toBe(0n)
    expect(() => U256.fromNumber(Number.MAX_SAFE_INTEGER + 1)).toThrow(
      'value 9007199254740992 is not a safe integer.'
    )
    expect(() =>
      U256.fromNumber(
        115792089237316195423570985008687907853269984665640564039457584007913129639936n
      )
    ).toThrow(
      'value 115792089237316195423570985008687907853269984665640564039457584007913129639936 is too large for an U256.'
    )
    expect(() => U256.fromNumber(-1)).toThrow(
      "negative value can't be serialized as unsigned integer."
    )
    expect(() => U256.fromNumber(1.1)).toThrow(
      'value 1.1 is not a safe integer.'
    )

    expect(
      U256.fromBytes(
        new Uint8Array([
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255,
        ])
      )
    ).toBe(
      115792089237316195423570985008687907853269984665640564039457584007913129639935n
    )
    expect(
      U256.fromBytes(
        new Uint8Array([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          0, 0, 0, 0, 0, 0, 0, 0, 0,
        ])
      )
    ).toBe(0n)
    expect(() =>
      U256.fromBytes(
        new Uint8Array([
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255,
        ])
      )
    ).toThrow('not enough bytes to read the value.')

    expect(
      U256.toBytes(
        115792089237316195423570985008687907853269984665640564039457584007913129639935n
      )
    ).toEqual(
      Uint8Array.from([
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
        255, 255, 255, 255,
      ])
    )
    expect(U256.toBytes(4294967295n)).toEqual(
      Uint8Array.from([
        255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ])
    )

    expect(U256.toBytes(65535n)).toEqual(
      Uint8Array.from([
        255, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
      ])
    )
    expect(U256.toBytes(255n)).toEqual(
      Uint8Array.from([
        255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
      ])
    )
    expect(U256.toBytes(0n)).toEqual(
      Uint8Array.from([
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ])
    )

    expect(
      U256.fromBuffer(
        new Uint8Array([
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255,
        ]),
        0
      )
    ).toEqual({
      value:
        115792089237316195423570985008687907853269984665640564039457584007913129639935n,
      offset: 32,
    })

    expect(
      U256.fromBuffer(
        new Uint8Array([
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 255, 255, 0,
        ]),
        1
      )
    ).toEqual({
      value:
        115792089237316195423570985008687907853269984665640564039457584007913129639935n >>
        8n,
      offset: 33,
    })

    expect(() => U256.fromBuffer(new Uint8Array([255, 255, 255]), 0)).toThrow(
      'not enough bytes to read the value.'
    )
    expect(() =>
      U256.fromBuffer(
        new Uint8Array([
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255, 0,
        ]),
        16
      )
    ).toThrow('not enough bytes to read the value.')
  })
})
