import { Args } from '../../../../src/experimental/basicElements/args'
import * as ser from '../../../../src/experimental/basicElements/serializers'

describe('Serialization tests', () => {
  it('ser/deser with emojis', () => {
    const str = 'Hello world 🙂'
    expect(ser.bytesToStr(ser.strToBytes(str))).toEqual(str)
  })
  it('ser/deser Ascii', () => {
    const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    expect(ser.bytesToStr(ser.strToBytes(str))).toEqual(str)
  })
  it('ser/deser utf16 char', () => {
    const str = String.fromCharCode(0xd83d, 0xde42)
    expect(ser.bytesToStr(ser.strToBytes(str))).toEqual('🙂')
  })
  it('ser/deser bool', () => {
    let val = false
    expect(ser.byteToBool(ser.boolToByte(val))).toEqual(val)
    val = true
    expect(ser.byteToBool(ser.boolToByte(val))).toEqual(val)
  })
  it('ser/deser u8', () => {
    const val = 123
    expect(ser.byteToU8(ser.u8toByte(val))).toEqual(val)
  })
  it('throws an error when trying to serialize a negative Uint8 value', () => {
    const negativeValue = -1
    const args = new Args()

    expect(() => args.addU8(negativeValue)).toThrow(
      `Unable to serialize invalid Uint8 value ${negativeValue}`
    )
  })
  it('throws an error when trying to serialize a Uint8 value greater than 255', () => {
    const largeValue = 256
    const args = new Args()

    expect(() => args.addU8(largeValue)).toThrow(
      `Unable to serialize invalid Uint8 value ${largeValue}`
    )
  })
  it('ser/deser u16', () => {
    const val = 123
    expect(ser.byteToU16(ser.u16toByte(val))).toEqual(val)
  })
  it('ser/deser i16', () => {
    const val = 123
    expect(ser.bytesToI16(ser.i16ToBytes(val))).toEqual(val)
  })
  it('ser/deser u32', () => {
    const val = 666
    expect(ser.bytesToU32(ser.u32ToBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize a negative u32 value', () => {
    const negativeValue = -1
    const args = new Args()

    expect(() => args.addU32(negativeValue)).toThrow(
      `Unable to serialize invalid Uint32 value ${negativeValue}`
    )
  })
  it('throws an error when trying to serialize a Uint32 value greater than 4294967295', () => {
    const largeValue = 4294967296
    const args = new Args()

    expect(() => args.addU32(largeValue)).toThrow(
      `Unable to serialize invalid Uint32 value ${largeValue}`
    )
  })
  it('ser/deser u64', () => {
    const val = BigInt(666)
    expect(ser.bytesToU64(ser.u64ToBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize a negative u64 value', () => {
    const negativeValue = BigInt(-1)
    const args = new Args()

    expect(() => args.addU64(negativeValue)).toThrow(
      `Unable to serialize invalid Uint64 value ${negativeValue}`
    )
  })
  it('throws an error when trying to serialize a u64 value greater than 18446744073709551615', () => {
    const largeValue = BigInt('18446744073709551616')
    const args = new Args()

    expect(() => args.addU64(largeValue)).toThrow(
      `Unable to serialize invalid Uint64 value ${largeValue}`
    )
  })
  it('ser/deser i128', () => {
    const val = -123456789123456789n
    expect(ser.bytesToI128(ser.i128ToBytes(val))).toEqual(val)
  })
  it('ser/deser i128', () => {
    const val = ser.I128_MAX
    expect(ser.bytesToI128(ser.i128ToBytes(val))).toEqual(val)
  })
  it('ser/deser i128', () => {
    const val = ser.I128_MIN
    expect(ser.bytesToI128(ser.i128ToBytes(val))).toEqual(val)
  })
  it('ser/deser u128', () => {
    const val = 123456789123456789n
    expect(ser.bytesToU128(ser.u128ToBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize a negative u128 value', () => {
    const negativeValue = BigInt(-1)
    const args = new Args()

    expect(() => args.addU128(negativeValue)).toThrow(
      `Unable to serialize invalid Uint128 value ${negativeValue}`
    )
  })
  it('throws an error when trying to serialize a u128 value greater than U128_MAX', () => {
    const largeValue = ser.U128_MAX + 1n
    const args = new Args()

    expect(() => args.addU128(largeValue)).toThrow(
      `Unable to serialize invalid Uint128 value ${largeValue}`
    )
  })
  it('ser/deser u256', () => {
    const val = 123456789012345678901234567890n
    expect(ser.bytesToU256(ser.u256ToBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize a negative u256 value', () => {
    const negativeValue = BigInt(-1)
    const args = new Args()

    expect(() => args.addU256(negativeValue)).toThrow(
      `Unable to serialize invalid Uint256 value ${negativeValue}`
    )
  })
  it('throws an error when trying to serialize a u256 value greater than U256_MAX', () => {
    const largeValue = ser.U256_MAX + 1n
    const args = new Args()

    expect(() => args.addU256(largeValue)).toThrow(
      `Unable to serialize invalid Uint256 value ${largeValue}`
    )
  })
  it('ser/deser i32', () => {
    const val = -666
    expect(ser.bytesToI32(ser.i32ToBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize an invalid int32 value', () => {
    const invalidValue = Math.pow(2, 31)
    const args = new Args()

    expect(() => args.addI32(invalidValue)).toThrow(
      `Unable to serialize invalid int32 value ${invalidValue}`
    )
  })
  it('ser/deser i64', () => {
    const val = BigInt(-666)
    expect(ser.bytesToI64(ser.i64ToBytes(val))).toEqual(val)
  })
  it('throws an error when trying to serialize an invalid int64 value', () => {
    const invalidValue = BigInt('9223372036854775808')
    const args = new Args()

    expect(() => args.addI64(invalidValue)).toThrow(
      `Unable to serialize invalid int64 value ${invalidValue.toString()}`
    )
  })
  it('ser/deser f32', () => {
    const val = -666.666
    expect(ser.bytesToF32(ser.f32ToBytes(val))).toBeCloseTo(val, 0.001)
  })
  it('ser/deser f64', () => {
    const val = -666.666
    expect(ser.bytesToF64(ser.f64ToBytes(val))).toEqual(val)
  })
  it('ser/deser f64 max val', () => {
    const val = Number.MAX_VALUE
    expect(ser.bytesToF64(ser.f64ToBytes(val))).toEqual(val)
  })
  it('ser/deser empty string', () => {
    const str = ''
    expect(ser.bytesToStr(ser.strToBytes(str))).toEqual(str)
  })
  it('ser/deser empty Uint8Array', () => {
    const arr = new Uint8Array(0)
    expect(ser.bytesToStr(arr)).toEqual('')
  })
})
