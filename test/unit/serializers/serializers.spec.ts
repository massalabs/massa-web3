import { Args } from '../../../src/basicElements/args'
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
  boolToByte,
  byteToBool,
  bytesToF32,
  bytesToF64,
  bytesToStr,
  f32ToBytes,
  f64ToBytes,
  strToBytes,
} from '../../../src/basicElements/serializers'

describe('Serialization tests', () => {
  it('ser/deser with emojis', () => {
    const str = 'Hello world 🙂'
    expect(bytesToStr(strToBytes(str))).toEqual(str)
  })
  it('ser/deser Ascii', () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    expect(bytesToStr(strToBytes(str))).toEqual(str)
  })
  it('ser/deser utf16 char', () => {
    const str = String.fromCharCode(0xd83d, 0xde42)
    expect(bytesToStr(strToBytes(str))).toEqual('🙂')
  })
  it('ser/deser bool', () => {
    let val = false
    expect(byteToBool(boolToByte(val))).toEqual(val)
    val = true
    expect(byteToBool(boolToByte(val))).toEqual(val)
  })
  // Duplicate of serializedInteger.spec.ts?
  it('ser/deser u8', () => {
    const val = 123
    expect(U8.fromBytes(U8.toBytes(U8.fromNumber(val)))).toEqual(BigInt(val))
  })
  it('throws an error when trying to serialize a negative Uint8 value', () => {
    const negativeValue = -1n
    const args = new Args()

    expect(() => args.addU8(negativeValue)).toThrow(
      `negative value can't be serialized as unsigned integer.`
    )
  })
  it('throws an error when trying to serialize a Uint8 value greater than 255', () => {
    const largeValue = 256n
    const args = new Args()

    expect(() => args.addU8(largeValue)).toThrow(
      `value ${largeValue} is too large for an U8.`
    )
  })
  // Duplicate of serializedInteger.spec.ts?
  it('ser/deser u16', () => {
    const val = 123
    expect(U16.fromBytes(U16.toBytes(U16.fromNumber(val)))).toEqual(BigInt(val))
  })
  it('ser/deser i16', () => {
    const val = 123
    expect(I16.fromBytes(I16.toBytes(I16.fromNumber(val)))).toEqual(BigInt(val))
  })
  // Duplicate of serializedInteger.spec.ts?
  it('ser/deser u32', () => {
    const val = 666
    expect(U32.fromBytes(U32.toBytes(U32.fromNumber(val)))).toEqual(BigInt(val))
  })
  it('throws an error when trying to serialize a negative u32 value', () => {
    const negativeValue = -1n
    const args = new Args()

    expect(() => args.addU32(negativeValue)).toThrow(
      `negative value can't be serialized as unsigned integer.`
    )
  })
  it('throws an error when trying to serialize a Uint32 value greater than 4294967295', () => {
    const largeValue = 4294967296n
    const args = new Args()

    expect(() => args.addU32(largeValue)).toThrow(
      `value ${largeValue} is too large for an U32.`
    )
  })
  // Duplicate of serializedInteger.spec.ts?
  it('ser/deser u64', () => {
    const val = BigInt(666)
    expect(U64.fromBytes(U64.toBytes(U64.fromNumber(val)))).toEqual(val)
  })
  it('throws an error when trying to serialize a negative u64 value', () => {
    const negativeValue = BigInt(-1)
    const args = new Args()

    expect(() => args.addU64(negativeValue)).toThrow(
      `negative value can't be serialized as unsigned integer.`
    )
  })
  it('throws an error when trying to serialize a u64 value greater than 18446744073709551615', () => {
    const largeValue = BigInt('18446744073709551616')
    const args = new Args()

    expect(() => args.addU64(largeValue)).toThrow(
      `value ${largeValue} is too large for an U64.`
    )
  })

  it('ser/deser i128', () => {
    const val = -123456789123456789n
    expect(I128.fromBytes(I128.toBytes(I128.fromNumber(val)))).toEqual(val)
  })
  it('ser/deser i128', () => {
    const val = I128.MAX
    expect(I128.fromBytes(I128.toBytes(I128.fromNumber(val)))).toEqual(val)
  })
  it('ser/deser i128', () => {
    const val = I128.MIN
    expect(I128.fromBytes(I128.toBytes(I128.fromNumber(val)))).toEqual(val)
  })

  it('ser/deser u128', () => {
    const val = BigInt('123456789123456789123456789')
    expect(U128.fromBytes(U128.toBytes(U128.fromNumber(val)))).toEqual(val)
  })

  it('throws an error when trying to serialize a negative u128 value', () => {
    const negativeValue = BigInt(-1)
    const args = new Args()

    expect(() => args.addU128(negativeValue)).toThrow(
      `negative value can't be serialized as unsigned integer.`
    )
  })

  it('throws an error when trying to serialize a u128 value greater than U128_MAX', () => {
    const largeValue = U128.MAX + 1n
    const args = new Args()

    expect(() => args.addU128(largeValue)).toThrow(
      `value ${largeValue} is too large for an U128.`
    )
  })
  it('ser/deser u256', () => {
    const val = 123456789012345678901234567890n
    expect(U256.fromBytes(U256.toBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize a negative u256 value', () => {
    const negativeValue = BigInt(-1)
    const args = new Args()

    expect(() => args.addU256(negativeValue)).toThrow(
      `negative value can't be serialized as unsigned integer.`
    )
  })
  it('throws an error when trying to serialize a u256 value greater than U256_MAX', () => {
    const largeValue = U256.MAX + 1n
    const args = new Args()

    expect(() => args.addU256(largeValue)).toThrow(
      `value ${largeValue} is too large for an U256.`
    )
  })
  it('ser/deser i32', () => {
    const val = -666
    expect(I32.fromBytes(I32.toBytes(I32.fromNumber(val)))).toEqual(BigInt(val))
  })
  it('throws an error when trying to serialize an invalid int32 value', () => {
    const invalidValue = Math.pow(2, 31)
    const args = new Args()

    expect(() => args.addI32(I32.fromNumber(invalidValue))).toThrow(
      `value ${invalidValue} is out of range for an I32.`
    )
  })
  it('ser/deser i64', () => {
    const val = BigInt(-666)
    expect(I64.fromBytes(I64.toBytes(I64.fromNumber(val)))).toEqual(val)
  })
  it('throws an error when trying to serialize an invalid int64 value', () => {
    const invalidValue = BigInt('9223372036854775808')
    const args = new Args()

    expect(() => args.addI64(invalidValue)).toThrow(
      `value ${invalidValue} is out of range for an I64.`
    )
  })
  it('ser/deser f32', () => {
    const val = -666.666
    expect(bytesToF32(f32ToBytes(val))).toBeCloseTo(val, 0.001)
  })
  it('ser/deser f64', () => {
    const val = -666.666
    expect(bytesToF64(f64ToBytes(val))).toEqual(val)
  })
  it('ser/deser f64 max val', () => {
    const val = Number.MAX_VALUE
    expect(bytesToF64(f64ToBytes(val))).toEqual(val)
  })
  it('ser/deser empty string', () => {
    const str = ''
    expect(bytesToStr(strToBytes(str))).toEqual(str)
  })
  it('ser/deser empty Uint8Array', () => {
    const arr = new Uint8Array(0)
    expect(bytesToStr(arr)).toEqual('')
  })

  it('Args: deserialize Uint8Array with a byteOffset', () => {
    const str1 = 'Hello world'
    const str2 = 'Bonjour'
    const str3 = 'Namaste'
    const buf1 = new Args().addString(str1).serialize()
    const buf2 = new Args().addString(str2).addString(str3).serialize()
    const fullBuffer = new Uint8Array([...buf1, ...buf2])

    const offset = buf1.length
    const subArray = fullBuffer.subarray(offset)

    expect(subArray.byteOffset).toEqual(offset)

    const args = new Args(subArray)
    expect(args.nextString()).toEqual(str2)
    expect(args.nextString()).toEqual(str3)
  })
})
