import { expect, it, describe } from '@jest/globals';
import * as ser from '../../src/utils/serializers';
import { asTests } from './fixtures/as-serializer';
import { Args, ArrayType } from '../../src/utils/arguments';
import {
  arrayToBytes,
  bytesToArray,
  bytesToSerializableObjectArray,
} from '../../src/utils/serializers';
import {
  IDeserializedResult,
  ISerializable,
} from '../../src/interfaces/ISerializable';

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
  it('ser/deser u32', () => {
    const val = 666;
    expect(ser.bytesToU32(ser.u32ToBytes(val))).toEqual(val);
  });
  it('ser/deser u64', () => {
    const val = BigInt(666);
    expect(ser.bytesToU64(ser.u64ToBytes(val))).toEqual(val);
  });
  it('ser/deser u128', () => {
    const val = 123456789123456789n;
    expect(ser.bytesToU128(ser.u128ToBytes(val))).toEqual(val);
  });
  it('ser/deser u256', () => {
    const val = 123456789012345678901234567890n;
    expect(ser.bytesToU256(ser.u256ToBytes(val))).toEqual(val);
  });
  it('ser/deser i32', () => {
    const val = -666;
    expect(ser.bytesToI32(ser.i32ToBytes(val))).toEqual(val);
  });
  it('ser/deser i64', () => {
    const val = BigInt(-666);
    expect(ser.bytesToI64(ser.i64ToBytes(val))).toEqual(val);
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

describe('array.ts functions', () => {
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
      const byteArray = arrayToBytes(dataArray, ArrayType.BOOL);
      const arrayBack = bytesToArray(byteArray, ArrayType.BOOL);
      expect(arrayBack).toEqual(dataArray);
    });

    it('converts a string array to bytes and back correctly', () => {
      const dataArray = ['hello', 'world'];
      const byteArray = arrayToBytes(dataArray, ArrayType.STRING);
      const arrayBack = bytesToArray(byteArray, ArrayType.STRING);
      expect(arrayBack).toEqual(dataArray);
    });

    it('converts a U8 array to bytes and back correctly', () => {
      const dataArray = [1, 2, 3, 4, 5];
      const byteArray = arrayToBytes(dataArray, ArrayType.U8);
      const arrayBack = bytesToArray(byteArray, ArrayType.U8);
      expect(arrayBack).toEqual(dataArray);
    });

    it('converts a U32 array to bytes and back correctly', () => {
      const dataArray = [10, 20, 30, 40, 50];
      const byteArray = arrayToBytes(dataArray, ArrayType.U32);
      const arrayBack = bytesToArray(byteArray, ArrayType.U32);
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
      const byteArray = arrayToBytes(dataArray, ArrayType.U64);
      const arrayBack = bytesToArray(byteArray, ArrayType.U64);
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

      const byteArray = arrayToBytes(dataArray, ArrayType.U128);
      const arrayBack = bytesToArray(byteArray, ArrayType.U128);
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

      const byteArray = arrayToBytes(dataArray, ArrayType.U256);
      const arrayBack = bytesToArray(byteArray, ArrayType.U256);
      expect(arrayBack).toEqual(dataArray);
    });

    it('converts a I32 array to bytes and back correctly', () => {
      const dataArray = [-10, -20, -30, -40, -50];
      const byteArray = arrayToBytes(dataArray, ArrayType.I32);
      const arrayBack = bytesToArray(byteArray, ArrayType.I32);
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
      const byteArray = arrayToBytes(dataArray, ArrayType.I64);
      const arrayBack = bytesToArray(byteArray, ArrayType.I64);
      expect(arrayBack).toEqual(dataArray);
    });
    it('converts a F32 array to bytes and back correctly', () => {
      const dataArray = [1.1, 2.2, 3.3, 4.4, 5.5];
      const byteArray = arrayToBytes(dataArray, ArrayType.F32);
      const arrayBack = bytesToArray(byteArray, ArrayType.F32);

      arrayBack.forEach((value, index) => {
        expect(value).toBeCloseTo(dataArray[index], 5); // 5 is the precision (number of digits after the decimal point)
      });
    });
    it('converts a F64 array to bytes and back correctly', () => {
      const dataArray = [1.1, 2.2, 3.3, 4.4, 5.5];
      const byteArray = arrayToBytes(dataArray, ArrayType.F64);
      const arrayBack = bytesToArray(byteArray, ArrayType.F64);

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
