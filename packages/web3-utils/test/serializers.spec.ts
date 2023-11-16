import { expect, it, describe } from '@jest/globals';
import * as ser from '../src';
import { asTests } from './utils/fixtures/as-serializer';
import { Args, ArrayTypes } from '../src/arguments';
import {
  deserializeObj,
  getDatatypeSize,
  serializableObjectsArrayToBytes,
  arrayToBytes,
  bytesToArray,
  bytesToSerializableObjectArray,
} from '../src/serializers/arrays';
import { IDeserializedResult, ISerializable } from '../src/interfaces';

// Implement a simple serializable class for testing.
class TestSerializable implements ISerializable<TestSerializable> {
  value: number;

  constructor(value = 0) {
    this.value = value;
  }

  serialize(): Uint8Array {
    return new Uint8Array([this.value]);
  }

  deserialize(
    data: Uint8Array,
    offset: number,
  ): IDeserializedResult<TestSerializable> {
    this.value = data[offset];
    return { instance: this, offset: offset + 1 };
  }
}

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
      `Unable to serialize invalid Uint32 value ${negativeValue}`,
    );
  });
  it('throws an error when trying to serialize a Uint32 value greater than 4294967295', () => {
    const largeValue = 4294967296;
    const args = new Args();

    expect(() => args.addU32(largeValue)).toThrow(
      `Unable to serialize invalid Uint32 value ${largeValue}`,
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
      `Unable to serialize invalid Uint64 value ${negativeValue}`,
    );
  });
  it('throws an error when trying to serialize a u64 value greater than 18446744073709551615', () => {
    const largeValue = BigInt('18446744073709551616');
    const args = new Args();

    expect(() => args.addU64(largeValue)).toThrow(
      `Unable to serialize invalid Uint64 value ${largeValue}`,
    );
  });
  it('ser/deser i128', () => {
    const val = -123456789123456789n;
    expect(ser.bytesToI128(ser.i128ToBytes(val))).toEqual(val);
  });
  it('ser/deser i128', () => {
    const val = ser.I128_MAX;
    expect(ser.bytesToI128(ser.i128ToBytes(val))).toEqual(val);
  });
  it('ser/deser i128', () => {
    const val = ser.I128_MIN;
    expect(ser.bytesToI128(ser.i128ToBytes(val))).toEqual(val);
  });
  it('ser/deser u128', () => {
    const val = 123456789123456789n;
    expect(ser.bytesToU128(ser.u128ToBytes(val))).toEqual(val);
  });
  it('throws an error when trying to serialize a negative u128 value', () => {
    const negativeValue = BigInt(-1);
    const args = new Args();

    expect(() => args.addU128(negativeValue)).toThrow(
      `Unable to serialize invalid Uint128 value ${negativeValue}`,
    );
  });
  it('throws an error when trying to serialize a u128 value greater than U128_MAX', () => {
    const largeValue = ser.U128_MAX + 1n;
    const args = new Args();

    expect(() => args.addU128(largeValue)).toThrow(
      `Unable to serialize invalid Uint128 value ${largeValue}`,
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
      `Unable to serialize invalid Uint256 value ${negativeValue}`,
    );
  });
  it('throws an error when trying to serialize a u256 value greater than U256_MAX', () => {
    const largeValue = ser.U256_MAX + 1n;
    const args = new Args();

    expect(() => args.addU256(largeValue)).toThrow(
      `Unable to serialize invalid Uint256 value ${largeValue}`,
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
  it('ser/deser empty string', () => {
    const str = '';
    expect(ser.bytesToStr(ser.strToBytes(str))).toEqual(str);
  });
  it('ser/deser empty Uint8Array', () => {
    const arr = new Uint8Array(0);
    expect(ser.bytesToStr(arr)).toEqual('');
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
    expect(new Args().addArray(input, ArrayTypes.STRING).serialize()).toEqual(
      serialized,
    );
    expect(new Args(serialized).nextArray(ArrayTypes.STRING)).toEqual(input);
  });
});

describe('array.ts functions', () => {
  describe('getDatatypeSize tests', () => {
    it('returns the correct size for BOOL', () => {
      expect(getDatatypeSize(ArrayTypes.BOOL)).toEqual(1);
    });

    it('returns the correct size for U8', () => {
      expect(getDatatypeSize(ArrayTypes.U8)).toEqual(1);
    });

    it('returns the correct size for F32', () => {
      expect(getDatatypeSize(ArrayTypes.F32)).toEqual(4);
    });

    it('returns the correct size for I32', () => {
      expect(getDatatypeSize(ArrayTypes.I32)).toEqual(4);
    });

    it('returns the correct size for U32', () => {
      expect(getDatatypeSize(ArrayTypes.U32)).toEqual(4);
    });

    it('returns the correct size for F64', () => {
      expect(getDatatypeSize(ArrayTypes.F64)).toEqual(8);
    });

    it('returns the correct size for I64', () => {
      expect(getDatatypeSize(ArrayTypes.I64)).toEqual(8);
    });

    it('returns the correct size for U64', () => {
      expect(getDatatypeSize(ArrayTypes.U64)).toEqual(8);
    });

    it('returns the correct size for U128', () => {
      expect(getDatatypeSize(ArrayTypes.U128)).toEqual(16);
    });

    it('returns the correct size for I128', () => {
      expect(getDatatypeSize(ArrayTypes.I128)).toEqual(16);
    });

    it('returns the correct size for U256', () => {
      expect(getDatatypeSize(ArrayTypes.U256)).toEqual(32);
    });

    it('throws an error for unsupported types', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => getDatatypeSize((ArrayTypes as any).BadType)).toThrow(
        'Unsupported type',
      );
    });
  });

  describe('serializableObjectsArrayToBytes tests', () => {
    it('serializes an array of serializable objects to bytes', () => {
      const obj1 = new TestSerializable(1);
      const obj2 = new TestSerializable(2);
      const obj3 = new TestSerializable(3);

      const serialized = serializableObjectsArrayToBytes([obj1, obj2, obj3]);

      expect(serialized).toEqual(new Uint8Array([1, 2, 3]));
    });
  });

  describe('deserializeObj tests', () => {
    it('deserializes a bytes array into an instance of the given class', () => {
      const data = new Uint8Array([1, 2, 3]);
      const result = deserializeObj(data, 0, TestSerializable);

      expect(result.instance).toBeInstanceOf(TestSerializable);
      expect(result.instance.value).toEqual(1);
      expect(result.offset).toEqual(1);
    });
  });

  describe('bytesToSerializableObjectArray', () => {
    it('deserializes a bytes array into an array of instances of the given class', () => {
      const data = new Uint8Array([1, 2, 3, 4, 5]);
      const result = bytesToSerializableObjectArray(data, TestSerializable);

      expect(result.length).toEqual(5);
      // Check that each element in the array is an instance of the TestSerializable class
      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toBeInstanceOf(TestSerializable);
        // Check that the value of each TestSerializable instance is correct
        expect(result[i].value).toEqual(i + 1);
      }
    });
  });

  describe('arrayToBytes and bytesToArray tests', () => {
    it('converts a bool array to bytes and back correctly', () => {
      const dataArray = [true, false, true, true, false];
      const byteArray = arrayToBytes(dataArray, ArrayTypes.BOOL);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.BOOL);
      expect(arrayBack).toEqual(dataArray);
    });

    it('converts a string array to bytes and back correctly', () => {
      const dataArray = ['hello', 'world'];
      const byteArray = arrayToBytes(dataArray, ArrayTypes.STRING);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.STRING);
      expect(arrayBack).toEqual(dataArray);
    });

    it('converts a U8 array to bytes and back correctly', () => {
      const dataArray = [1, 2, 3, 4, 5];
      const byteArray = arrayToBytes(dataArray, ArrayTypes.U8);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.U8);
      expect(arrayBack).toEqual(dataArray);
    });

    it('converts a U32 array to bytes and back correctly', () => {
      const dataArray = [10, 20, 30, 40, 50];
      const byteArray = arrayToBytes(dataArray, ArrayTypes.U32);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.U32);
      expect(arrayBack).toEqual(dataArray);
    });

    it('converts a U64 array to bytes and back correctly', () => {
      const dataArray = [
        BigInt(10),
        BigInt(20),
        BigInt(30),
        BigInt(40),
        BigInt(50),
      ];
      const byteArray = arrayToBytes(dataArray, ArrayTypes.U64);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.U64);
      expect(arrayBack).toEqual(dataArray);
    });
    it('converts a U128 array to bytes and back correctly', () => {
      const dataArray = [
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
      ];

      const byteArray = arrayToBytes(dataArray, ArrayTypes.U128);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.U128);
      expect(arrayBack).toEqual(dataArray);
    });
    it('converts a I128 array to bytes and back correctly', () => {
      const dataArray = [
        123456789123456789n,
        -123456789123456789n,
        0n,
        ser.I128_MAX,
        ser.I128_MIN,
        -123456789123456789n,
      ];

      const byteArray = arrayToBytes(dataArray, ArrayTypes.I128);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.I128);
      expect(arrayBack).toEqual(dataArray);
    });
    it('converts a U256 array to bytes and back correctly', () => {
      const dataArray = [
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
      ];

      const byteArray = arrayToBytes(dataArray, ArrayTypes.U256);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.U256);
      expect(arrayBack).toEqual(dataArray);
    });

    it('converts a I32 array to bytes and back correctly', () => {
      const dataArray = [-10, -20, -30, -40, -50];
      const byteArray = arrayToBytes(dataArray, ArrayTypes.I32);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.I32);
      expect(arrayBack).toEqual(dataArray);
    });

    it('converts a I64 array to bytes and back correctly', () => {
      const dataArray = [
        BigInt(-10),
        BigInt(-20),
        BigInt(-30),
        BigInt(-40),
        BigInt(-50),
      ];
      const byteArray = arrayToBytes(dataArray, ArrayTypes.I64);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.I64);
      expect(arrayBack).toEqual(dataArray);
    });

    it('test I64 array serialization against AS serialization', () => {
      const input = [
        BigInt(-3),
        BigInt(-2),
        BigInt(-1),
        BigInt(0),
        BigInt(1),
        BigInt(2),
        BigInt(3),
      ];
      const serialized = new Uint8Array([
        253, 255, 255, 255, 255, 255, 255, 255, 254, 255, 255, 255, 255, 255,
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
        0,
      ]);
      expect(arrayToBytes(input, ArrayTypes.I64)).toEqual(serialized);
      expect(bytesToArray<bigint>(serialized, ArrayTypes.I64)).toEqual(input);
    });

    it('converts a F32 array to bytes and back correctly', () => {
      const dataArray = [1.1, 2.2, 3.3, 4.4, 5.5];
      const byteArray = arrayToBytes(dataArray, ArrayTypes.F32);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.F32);

      arrayBack.forEach((value, index) => {
        expect(value).toBeCloseTo(dataArray[index], 5); // 5 is the precision (number of digits after the decimal point)
      });
    });
    it('converts a F64 array to bytes and back correctly', () => {
      const dataArray = [1.1, 2.2, 3.3, 4.4, 5.5];
      const byteArray = arrayToBytes(dataArray, ArrayTypes.F64);
      const arrayBack = bytesToArray(byteArray, ArrayTypes.F64);

      arrayBack.forEach((value, index) => {
        expect(value).toBeCloseTo(dataArray[index], 5); // 5 is the precision (number of digits after the decimal point)
      });
    });
    it('throws an error when an unsupported type is used', () => {
      const dataArray = [1, 2, 3, 4, 5];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const unsupportedType = 'someUnsupportedType' as any;

      expect(() => arrayToBytes(dataArray, unsupportedType)).toThrow(
        `Unsupported type: ${unsupportedType}`,
      );
    });
  });
});
