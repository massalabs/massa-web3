import { expect, it, describe } from '@jest/globals';
import * as ser from '../../src/utils/serializers';
import { asTests } from './fixtures/as-serializer';
import { Args, ArrayType } from '../../src/utils/arguments';
import {
  deserializeObj,
  getDatatypeSize,
  serializableObjectsArrayToBytes,
} from '../../src/utils/serializers';
import {
  IDeserializedResult,
  ISerializable,
} from '../../src/interfaces/ISerializable';

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
  describe('getDatatypeSize tests', () => {
    it('returns the correct size for BOOL', () => {
      expect(getDatatypeSize(ArrayType.BOOL)).toEqual(1);
    });

    it('returns the correct size for U8', () => {
      expect(getDatatypeSize(ArrayType.U8)).toEqual(1);
    });

    it('returns the correct size for F32', () => {
      expect(getDatatypeSize(ArrayType.F32)).toEqual(4);
    });

    it('returns the correct size for I32', () => {
      expect(getDatatypeSize(ArrayType.I32)).toEqual(4);
    });

    it('returns the correct size for U32', () => {
      expect(getDatatypeSize(ArrayType.U32)).toEqual(4);
    });

    it('returns the correct size for F64', () => {
      expect(getDatatypeSize(ArrayType.F64)).toEqual(8);
    });

    it('returns the correct size for I64', () => {
      expect(getDatatypeSize(ArrayType.I64)).toEqual(8);
    });

    it('returns the correct size for U64', () => {
      expect(getDatatypeSize(ArrayType.U64)).toEqual(8);
    });

    it('returns the correct size for U128', () => {
      expect(getDatatypeSize(ArrayType.U128)).toEqual(16);
    });

    it('returns the correct size for U256', () => {
      expect(getDatatypeSize(ArrayType.U256)).toEqual(32);
    });

    it('throws an error for unsupported types', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => getDatatypeSize((ArrayType as any).BadType)).toThrow(
        'Unsupported type',
      );
    });
  });

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
});
