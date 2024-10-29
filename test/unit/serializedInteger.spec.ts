import {
  U8,
  U16,
  U32,
  U64,
  U128,
  U256,
  I8,
  I16,
  I32,
  I64,
  I128,
  I256,
} from '../../src/basicElements'

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
    ).toBe(U128.MAX)
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

    expect(
      U128.fromBuffer(
        new Uint8Array([
          255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
          255, 255,
        ]),
        0
      )
    ).toEqual({ offset: 16, value: U128.MAX })

    expect(U128.toBytes(U128.MAX)).toEqual(
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

  test('I8', async () => {
    expect(I8.SIZE_BIT).toBe(8)
    expect(I8.MAX).toBe(127n)
    expect(I8.MIN).toBe(-128n)

    expect(I8.fromNumber(127)).toBe(127n)
    expect(I8.fromNumber(-128)).toBe(-128n)
    expect(I8.fromNumber(0)).toBe(0n)
    expect(() => I8.fromNumber(128)).toThrow(
      'value 128 is out of range for an I8.'
    )
    expect(() => I8.fromNumber(-129)).toThrow(
      'value -129 is out of range for an I8.'
    )
    expect(() => I8.fromNumber(1.1)).toThrow('value 1.1 is not a safe integer.')

    expect(I8.fromBytes(new Uint8Array([127]))).toBe(127n)
    expect(I8.fromBytes(new Uint8Array([0]))).toBe(0n)
    expect(I8.fromBytes(new Uint8Array([128]))).toBe(-128n)
    expect(() => I8.fromBytes(new Uint8Array())).toThrow(
      'not enough bytes to read the value.'
    )

    expect(I8.toBytes(127n)).toEqual(Uint8Array.from([127]))
    expect(I8.toBytes(0n)).toEqual(Uint8Array.from([0]))
    expect(I8.toBytes(-128n)).toEqual(Uint8Array.from([128]))

    expect(I8.fromBuffer(new Uint8Array([127]), 0)).toEqual({
      value: 127n,
      offset: 1,
    })
    expect(I8.fromBuffer(new Uint8Array([0]), 0)).toEqual({
      value: 0n,
      offset: 1,
    })
    expect(I8.fromBuffer(new Uint8Array([128]), 0)).toEqual({
      value: -128n,
      offset: 1,
    })
    expect(() => I8.fromBuffer(new Uint8Array(), 0)).toThrow(
      'not enough bytes to read the value.'
    )
  })

  test('I16', async () => {
    expect(I16.SIZE_BIT).toBe(16)
    expect(I16.MAX).toBe(32767n)
    expect(I16.MIN).toBe(-32768n)

    expect(I16.fromNumber(32767)).toBe(32767n)
    expect(I16.fromNumber(-32768)).toBe(-32768n)
    expect(I16.fromNumber(0)).toBe(0n)
    expect(() => I16.fromNumber(32768)).toThrow(
      'value 32768 is out of range for an I16.'
    )
    expect(() => I16.fromNumber(-32769)).toThrow(
      'value -32769 is out of range for an I16.'
    )
    expect(() => I16.fromNumber(1.1)).toThrow(
      'value 1.1 is not a safe integer.'
    )

    expect(I16.fromBytes(new Uint8Array([255, 127]))).toBe(32767n)
    expect(I16.fromBytes(new Uint8Array([0, 0]))).toBe(0n)
    expect(I16.fromBytes(new Uint8Array([0, 128]))).toBe(-32768n)
    expect(() => I16.fromBytes(new Uint8Array([255]))).toThrow(
      'not enough bytes to read the value.'
    )

    expect(I16.toBytes(32767n)).toEqual(Uint8Array.from([255, 127]))
    expect(I16.toBytes(0n)).toEqual(Uint8Array.from([0, 0]))
    expect(I16.toBytes(-32768n)).toEqual(Uint8Array.from([0, 128]))

    expect(I16.fromBuffer(new Uint8Array([255, 127]), 0)).toEqual({
      value: 32767n,
      offset: 2,
    })
    expect(I16.fromBuffer(new Uint8Array([0, 0]), 0)).toEqual({
      value: 0n,
      offset: 2,
    })
    expect(I16.fromBuffer(new Uint8Array([0, 128]), 0)).toEqual({
      value: -32768n,
      offset: 2,
    })
    expect(() => I16.fromBuffer(new Uint8Array([255]), 0)).toThrow(
      'not enough bytes to read the value.'
    )
  })

  test('I32', async () => {
    expect(I32.SIZE_BIT).toBe(32)
    expect(I32.MAX).toBe(2147483647n)
    expect(I32.MIN).toBe(-2147483648n)

    expect(I32.fromNumber(2147483647)).toBe(2147483647n)
    expect(I32.fromNumber(-2147483648)).toBe(-2147483648n)
    expect(I32.fromNumber(0)).toBe(0n)
    expect(() => I32.fromNumber(2147483648)).toThrow(
      'value 2147483648 is out of range for an I32.'
    )
    expect(() => I32.fromNumber(-2147483649)).toThrow(
      'value -2147483649 is out of range for an I32.'
    )
    expect(() => I32.fromNumber(1.1)).toThrow(
      'value 1.1 is not a safe integer.'
    )

    expect(I32.fromBytes(new Uint8Array([255, 255, 255, 127]))).toBe(
      2147483647n
    )
    expect(I32.fromBytes(new Uint8Array([0, 0, 0, 0]))).toBe(0n)
    expect(I32.fromBytes(new Uint8Array([0, 0, 0, 128]))).toBe(-2147483648n)
    expect(() => I32.fromBytes(new Uint8Array([255, 255, 255]))).toThrow(
      'not enough bytes to read the value.'
    )

    expect(I32.toBytes(2147483647n)).toEqual(
      Uint8Array.from([255, 255, 255, 127])
    )
    expect(I32.toBytes(0n)).toEqual(Uint8Array.from([0, 0, 0, 0]))
    expect(I32.toBytes(-2147483648n)).toEqual(Uint8Array.from([0, 0, 0, 128]))

    expect(I32.fromBuffer(new Uint8Array([255, 255, 255, 127]), 0)).toEqual({
      value: 2147483647n,
      offset: 4,
    })
    expect(I32.fromBuffer(new Uint8Array([0, 0, 0, 0]), 0)).toEqual({
      value: 0n,
      offset: 4,
    })
    expect(I32.fromBuffer(new Uint8Array([0, 0, 0, 128]), 0)).toEqual({
      value: -2147483648n,
      offset: 4,
    })
    expect(() => I32.fromBuffer(new Uint8Array([255, 255, 255]), 0)).toThrow(
      'not enough bytes to read the value.'
    )
  })

  test('I64', async () => {
    expect(I64.SIZE_BIT).toBe(64)
    expect(I64.MAX).toBe(9223372036854775807n)
    expect(I64.MIN).toBe(-9223372036854775808n)

    expect(I64.fromNumber(Number.MAX_SAFE_INTEGER)).toBe(9_007_199_254_740_991n)
    expect(I64.fromNumber(-Number.MAX_SAFE_INTEGER)).toBe(
      -9_007_199_254_740_991n
    )
    expect(I64.fromNumber(0)).toBe(0n)
    expect(() => I64.fromNumber(9223372036854775808n)).toThrow(
      'value 9223372036854775808 is out of range for an I64.'
    )
    expect(() => I64.fromNumber(-9223372036854775809n)).toThrow(
      'value -9223372036854775809 is out of range for an I64.'
    )
    expect(() => I64.fromNumber(1.1)).toThrow(
      'value 1.1 is not a safe integer.'
    )

    expect(
      I64.fromBytes(new Uint8Array([255, 255, 255, 255, 255, 255, 255, 127]))
    ).toBe(9223372036854775807n)
    expect(I64.fromBytes(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]))).toBe(0n)
    expect(I64.fromBytes(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 128]))).toBe(
      -9223372036854775808n
    )
    expect(() =>
      I64.fromBytes(new Uint8Array([255, 255, 255, 255, 255, 255, 255]))
    ).toThrow('not enough bytes to read the value.')

    expect(I64.toBytes(9223372036854775807n)).toEqual(
      Uint8Array.from([255, 255, 255, 255, 255, 255, 255, 127])
    )
    expect(I64.toBytes(0n)).toEqual(Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 0]))
    expect(I64.toBytes(-9223372036854775808n)).toEqual(
      Uint8Array.from([0, 0, 0, 0, 0, 0, 0, 128])
    )

    expect(
      I64.fromBuffer(
        new Uint8Array([255, 255, 255, 255, 255, 255, 255, 127]),
        0
      )
    ).toEqual({
      value: 9223372036854775807n,
      offset: 8,
    })
    expect(I64.fromBuffer(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), 0)).toEqual(
      {
        value: 0n,
        offset: 8,
      }
    )
    expect(
      I64.fromBuffer(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 128]), 0)
    ).toEqual({
      value: -9223372036854775808n,
      offset: 8,
    })
    expect(() =>
      I64.fromBuffer(new Uint8Array([255, 255, 255, 255, 255, 255, 255]), 0)
    ).toThrow('not enough bytes to read the value.')
  })

  test('I128', async () => {
    expect(I128.SIZE_BIT).toBe(128)
    expect(I128.MAX).toBe(170141183460469231731687303715884105727n)
    expect(I128.MIN).toBe(-170141183460469231731687303715884105728n)

    expect(I128.fromNumber(170141183460469231731687303715884105727n)).toBe(
      170141183460469231731687303715884105727n
    )
    expect(I128.fromNumber(-170141183460469231731687303715884105728n)).toBe(
      -170141183460469231731687303715884105728n
    )
    expect(I128.fromNumber(0)).toBe(0n)
    expect(() =>
      I128.fromNumber(170141183460469231731687303715884105728n)
    ).toThrow(
      'value 170141183460469231731687303715884105728 is out of range for an I128.'
    )
    expect(() =>
      I128.fromNumber(-170141183460469231731687303715884105729n)
    ).toThrow(
      'value -170141183460469231731687303715884105729 is out of range for an I128.'
    )
    expect(() => I128.fromNumber(1.1)).toThrow(
      'value 1.1 is not a safe integer.'
    )

    const maxBytes = new Uint8Array([
      255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 255,
      127,
    ])
    const minBytes = new Uint8Array([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 128,
    ])
    expect(I128.fromBytes(maxBytes)).toBe(
      170141183460469231731687303715884105727n
    )
    expect(I128.fromBytes(new Uint8Array(16))).toBe(0n)
    expect(I128.fromBytes(minBytes)).toBe(
      -170141183460469231731687303715884105728n
    )
    expect(() => I128.fromBytes(new Uint8Array(15))).toThrow(
      'not enough bytes to read the value.'
    )

    expect(I128.toBytes(170141183460469231731687303715884105727n)).toEqual(
      maxBytes
    )
    expect(I128.toBytes(0n)).toEqual(new Uint8Array(16))
    expect(I128.toBytes(-170141183460469231731687303715884105728n)).toEqual(
      minBytes
    )

    expect(I128.fromBuffer(maxBytes, 0)).toEqual({
      value: 170141183460469231731687303715884105727n,
      offset: 16,
    })
    expect(I128.fromBuffer(new Uint8Array(16), 0)).toEqual({
      value: 0n,
      offset: 16,
    })
    expect(I128.fromBuffer(minBytes, 0)).toEqual({
      value: -170141183460469231731687303715884105728n,
      offset: 16,
    })
    expect(() => I128.fromBuffer(new Uint8Array(15), 0)).toThrow(
      'not enough bytes to read the value.'
    )
  })

  test('I256', async () => {
    expect(I256.SIZE_BIT).toBe(256)
    expect(I256.MAX).toBe(
      57896044618658097711785492504343953926634992332820282019728792003956564819967n
    )
    expect(I256.MIN).toBe(
      -57896044618658097711785492504343953926634992332820282019728792003956564819968n
    )

    expect(
      I256.fromNumber(
        5789604461865809771178549250434395392663499233282028201972879200395656481n
      )
    ).toBe(
      5789604461865809771178549250434395392663499233282028201972879200395656481n
    )
    expect(
      I256.fromNumber(
        -57896044618658097711785492504343953926634992332820282019728792003956564n
      )
    ).toBe(
      -57896044618658097711785492504343953926634992332820282019728792003956564n
    )
    expect(I256.fromNumber(0)).toBe(0n)
    expect(() =>
      I256.fromNumber(
        115792089237316195423570985008687907853269984665640564039457584007913129639936n
      )
    ).toThrow(
      'value 115792089237316195423570985008687907853269984665640564039457584007913129639936 is out of range for an I256.'
    )
    expect(() =>
      I256.fromNumber(
        -115792089237316195423570985008687907853269984665640564039457584007913129639937n
      )
    ).toThrow(
      'value -115792089237316195423570985008687907853269984665640564039457584007913129639937 is out of range for an I256.'
    )
    expect(() => I256.fromNumber(1.1)).toThrow(
      'value 1.1 is not a safe integer.'
    )

    const maxBytes = new Uint8Array(32).fill(255)
    maxBytes[31] = 127
    const minBytes = new Uint8Array(32).fill(0)
    minBytes[31] = 128
    expect(I256.fromBytes(maxBytes)).toBe(
      57896044618658097711785492504343953926634992332820282019728792003956564819967n
    )
    expect(I256.fromBytes(new Uint8Array(32))).toBe(0n)
    expect(I256.fromBytes(minBytes)).toBe(
      -57896044618658097711785492504343953926634992332820282019728792003956564819968n
    )
    expect(() => I256.fromBytes(new Uint8Array(31))).toThrow(
      'not enough bytes to read the value.'
    )

    expect(
      I256.toBytes(
        57896044618658097711785492504343953926634992332820282019728792003956564819967n
      )
    ).toEqual(maxBytes)
    expect(I256.toBytes(0n)).toEqual(new Uint8Array(32))
    expect(
      I256.toBytes(
        -57896044618658097711785492504343953926634992332820282019728792003956564819968n
      )
    ).toEqual(minBytes)

    expect(I256.fromBuffer(maxBytes, 0)).toEqual({
      value:
        57896044618658097711785492504343953926634992332820282019728792003956564819967n,
      offset: 32,
    })
    expect(I256.fromBuffer(new Uint8Array(32), 0)).toEqual({
      value: 0n,
      offset: 32,
    })
    expect(I256.fromBuffer(minBytes, 0)).toEqual({
      value:
        -57896044618658097711785492504343953926634992332820282019728792003956564819968n,
      offset: 32,
    })
    expect(() => I256.fromBuffer(new Uint8Array(31), 0)).toThrow(
      'not enough bytes to read the value.'
    )
  })
})
