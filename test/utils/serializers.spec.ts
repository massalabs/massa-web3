import { expect, it, describe } from '@jest/globals';
import * as ser from '../../src/utils/serializers';
import { asTests } from './fixtures/as-serializer';
import { Args, ArrayType } from '../../src/utils/arguments';

describe('Serialization tests', () => {
  it('ser/deser with emojis', () => {
    const str = 'Hello world 🙂';
    expect(ser.bytesToStr(ser.strToBytes(str))).toEqual(str);
  });
  it('ser/deser Ascii', () => {
    const str =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    expect(ser.bytesToStr(ser.strToBytes(str))).toEqual(str);
  });
  it('ser/deser utf16 char', () => {
    const str = String.fromCharCode(0xd83d, 0xde42);
    expect(ser.bytesToStr(ser.strToBytes(str))).toEqual('🙂');
  });
  it('ser/deser bool', () => {
    let val = false;
    expect(ser.byteToBool(ser.boolToByte(val))).toEqual(val);
    val = true;
    expect(ser.byteToBool(ser.boolToByte(val))).toEqual(val);
  });
  it('ser/deser u8', () => {
    const val = 123;
    expect(ser.byteToU8(ser.u8toByte(val))).toEqual(val);
  });
  it('throws an error when trying to serialize a negative Uint8 value', () => {
    const negativeValue = -1;
    const args = new Args();

    expect(() => args.addU8(negativeValue)).toThrow(
      `Unable to serialize invalid Uint8 value ${negativeValue}`,
    );
  });
  it('throws an error when trying to serialize a Uint8 value greater than 255', () => {
    const largeValue = 256;
    const args = new Args();

    expect(() => args.addU8(largeValue)).toThrow(
      `Unable to serialize invalid Uint8 value ${largeValue}`,
    );
  });
  it('ser/deser u32', () => {
    const val = 666;
    expect(ser.bytesToU32(ser.u32ToBytes(val))).toEqual(val);
  });
  it('throws an error when trying to serialize a negative u32 value', () => {
    const negativeValue = -1;
    const args = new Args();

    expect(() => args.addU32(negativeValue)).toThrow(
      `Unable to serialize invalid u32 value ${negativeValue}`,
    );
  });
  it('throws an error when trying to serialize a u32 value greater than 4294967295', () => {
    const largeValue = 4294967296;
    const args = new Args();

    expect(() => args.addU32(largeValue)).toThrow(
      `Unable to serialize invalid u32 value ${largeValue}`,
    );
  });
  it('ser/deser u64', () => {
    const val = BigInt(666);
    expect(ser.bytesToU64(ser.u64ToBytes(val))).toEqual(val);
  });
  it('throws an error when trying to serialize a negative u64 value', () => {
    const negativeValue = BigInt(-1);
    const args = new Args();

    expect(() => args.addU64(negativeValue)).toThrow(
      `Unable to serialize invalid u64 value ${negativeValue}`,
    );
  });
  it('throws an error when trying to serialize a u64 value greater than 18446744073709551615', () => {
    const largeValue = BigInt('18446744073709551616');
    const args = new Args();

    expect(() => args.addU64(largeValue)).toThrow(
      `Unable to serialize invalid u64 value ${largeValue}`,
    );
  });
  it('ser/deser u128', () => {
    const val = 123456789123456789n;
    expect(ser.bytesToU128(ser.u128ToBytes(val))).toEqual(val);
  });
  it('throws an error when trying to serialize a negative u128 value', () => {
    const negativeValue = BigInt(-1);
    const args = new Args();

    expect(() => args.addU128(negativeValue)).toThrow(
      `Unable to serialize invalid u128 value ${negativeValue}`,
    );
  });
  it('throws an error when trying to serialize a u128 value greater than 340282366920938463463374607431768211455', () => {
    const largeValue = BigInt('340282366920938463463374607431768211456');
    const args = new Args();

    expect(() => args.addU128(largeValue)).toThrow(
      `Unable to serialize invalid u128 value ${largeValue}`,
    );
  });
  it('ser/deser u256', () => {
    const val = 123456789012345678901234567890n;
    expect(ser.bytesToU256(ser.u256ToBytes(val))).toEqual(val);
  });
  it('throws an error when trying to serialize a negative u256 value', () => {
    const negativeValue = BigInt(-1);
    const args = new Args();

    expect(() => args.addU256(negativeValue)).toThrow(
      `Unable to serialize invalid u256 value ${negativeValue}`,
    );
  });
  it('throws an error when trying to serialize a u256 value greater than 115792089237316195423570985008687907853269984665640564039457584007913129639935', () => {
    const largeValue = BigInt(
      '115792089237316195423570985008687907853269984665640564039457584007913129639936',
    );
    const args = new Args();

    expect(() => args.addU256(largeValue)).toThrow(
      `Unable to serialize invalid u256 value ${largeValue}`,
    );
  });
  it('ser/deser i32', () => {
    const val = -666;
    expect(ser.bytesToI32(ser.i32ToBytes(val))).toEqual(val);
  });
  it('throws an error when trying to serialize an invalid int32 value', () => {
    const invalidValue = Math.pow(2, 31);
    const args = new Args();

    expect(() => args.addI32(invalidValue)).toThrow(
      `Unable to serialize invalid int32 value ${invalidValue}`,
    );
  });
  it('ser/deser i64', () => {
    const val = BigInt(-666);
    expect(ser.bytesToI64(ser.i64ToBytes(val))).toEqual(val);
  });
  it('throws an error when trying to serialize an invalid int64 value', () => {
    const invalidValue = BigInt('9223372036854775808');
    const args = new Args();

    expect(() => args.addI64(invalidValue)).toThrow(
      `Unable to serialize invalid int64 value ${invalidValue.toString()}`,
    );
  });
  it('ser/deser f32', () => {
    const val = -666.666;
    expect(ser.bytesToF32(ser.f32ToBytes(val))).toBeCloseTo(val, 0.001);
  });
  it('ser/deser f64', () => {
    const val = -666.666;
    expect(ser.bytesToF64(ser.f64ToBytes(val))).toEqual(val);
  });
  it('ser/deser f64 max val', () => {
    const val = Number.MAX_VALUE;
    expect(ser.bytesToF64(ser.f64ToBytes(val))).toEqual(val);
  });
});

describe('Test against assemblyscript serializer', () => {
  for (const test of asTests) {
    it(`AS tests ${test.name}: serialize`, () => {
      expect(ser[test.ser](test.val)).toEqual(new Uint8Array(test.serialized));
    });

    it(`AS tests ${test.name}: deserialize`, () => {
      if (test.deser === 'bytesToF32') {
        // Special case for 32bits floats
        expect(ser[test.deser](new Uint8Array(test.serialized))).toBeCloseTo(
          test.val as number,
          0.001,
        );
      } else {
        expect(ser[test.deser](new Uint8Array(test.serialized))).toEqual(
          test.val,
        );
      }
    });
  }

  it(`AS tests Array<string>`, () => {
    const input = ['Hello', 'World', '🙂'];
    const serialized = [
      26, 0, 0, 0, 5, 0, 0, 0, 72, 101, 108, 108, 111, 5, 0, 0, 0, 87, 111, 114,
      108, 100, 4, 0, 0, 0, 240, 159, 153, 130,
    ];
    expect(new Args().addArray(input, ArrayType.STRING).serialize()).toEqual(
      serialized,
    );
    expect(new Args(serialized).nextArray(ArrayType.STRING)).toEqual(input);
  });
});
