/* eslint-disable @typescript-eslint/no-magic-numbers */
import {
  arrayToBytes,
  bytesToArray,
  bytesToSerializableObjectArray,
  deserializeObj,
  getDatatypeSize,
  serializableObjectsArrayToBytes,
  U8,
  U32,
  U64,
  I128,
  I32,
  Args,
  ArrayTypes,
  DeserializedResult,
  Serializable,
} from '../../../src/basicElements'

class TestSerializable implements Serializable<TestSerializable> {
  value: number

  constructor(value = 0) {
    this.value = value
  }

  serialize(): Uint8Array {
    return new Uint8Array([this.value])
  }

  deserialize(
    data: Uint8Array,
    offset: number
  ): DeserializedResult<TestSerializable> {
    this.value = data[offset]
    return { instance: this, offset: offset + 1 }
  }
}

describe('array.ts functions', () => {
  describe('getDatatypeSize tests', () => {
    it('returns the correct size for BOOL', () => {
      expect(getDatatypeSize(ArrayTypes.BOOL)).toEqual(1)
    })

    it('returns the correct size for U8', () => {
      expect(getDatatypeSize(ArrayTypes.U8)).toEqual(1)
    })

    it('returns the correct size for F32', () => {
      expect(getDatatypeSize(ArrayTypes.F32)).toEqual(4)
    })

    it('returns the correct size for I32', () => {
      expect(getDatatypeSize(ArrayTypes.I32)).toEqual(4)
    })

    it('returns the correct size for U32', () => {
      expect(getDatatypeSize(ArrayTypes.U32)).toEqual(4)
    })

    it('returns the correct size for F64', () => {
      expect(getDatatypeSize(ArrayTypes.F64)).toEqual(8)
    })

    it('returns the correct size for I64', () => {
      expect(getDatatypeSize(ArrayTypes.I64)).toEqual(8)
    })

    it('returns the correct size for U64', () => {
      expect(getDatatypeSize(ArrayTypes.U64)).toEqual(8)
    })

    it('returns the correct size for U128', () => {
      expect(getDatatypeSize(ArrayTypes.U128)).toEqual(16)
    })

    it('returns the correct size for I128', () => {
      expect(getDatatypeSize(ArrayTypes.I128)).toEqual(16)
    })

    it('returns the correct size for U256', () => {
      expect(getDatatypeSize(ArrayTypes.U256)).toEqual(32)
    })

    it('throws an error for unsupported types', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => getDatatypeSize((ArrayTypes as any).BadType)).toThrow(
        'Unsupported type'
      )
    })
  })

  describe('serializableObjectsArrayToBytes tests', () => {
    it('serializes an array of serializable objects to bytes', () => {
      const obj1 = new TestSerializable(1)
      const obj2 = new TestSerializable(2)
      const obj3 = new TestSerializable(3)

      const serialized = serializableObjectsArrayToBytes([obj1, obj2, obj3])

      expect(serialized).toEqual(new Uint8Array([1, 2, 3]))
    })
  })

  describe('deserializeObj tests', () => {
    it('deserializes a bytes array into an instance of the given class', () => {
      const data = new Uint8Array([1, 2, 3])
      const result = deserializeObj(data, 0, TestSerializable)

      expect(result.instance).toBeInstanceOf(TestSerializable)
      expect(result.instance.value).toEqual(1)
      expect(result.offset).toEqual(1)
    })
  })

  describe('bytesToSerializableObjectArray', () => {
    it('deserializes a bytes array into an array of instances of the given class', () => {
      const data = new Uint8Array([1, 2, 3, 4, 5])
      const result = bytesToSerializableObjectArray(data, TestSerializable)

      expect(result.length).toEqual(5)
      // Check that each element in the array is an instance of the TestSerializable class
      for (let i = 0; i < result.length; i++) {
        expect(result[i]).toBeInstanceOf(TestSerializable)
        // Check that the value of each TestSerializable instance is correct
        expect(result[i].value).toEqual(i + 1)
      }
    })
  })

  describe('arrayToBytes and bytesToArray tests', () => {
    it('converts a bool array to bytes and back correctly', () => {
      const dataArray = [true, false, true, true, false]
      const byteArray = arrayToBytes(dataArray, ArrayTypes.BOOL)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.BOOL)
      expect(arrayBack).toEqual(dataArray)
    })

    it('converts a string array to bytes and back correctly', () => {
      const dataArray = ['hello', 'world']
      const byteArray = arrayToBytes(dataArray, ArrayTypes.STRING)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.STRING)
      expect(arrayBack).toEqual(dataArray)
    })

    it('converts a U8 array to bytes and back correctly', () => {
      const dataArray = [
        U8.fromNumber(1),
        U8.fromNumber(2),
        U8.fromNumber(3),
        U8.fromNumber(4),
        U8.fromNumber(5),
      ]
      const byteArray = arrayToBytes(dataArray, ArrayTypes.U8)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.U8)
      expect(arrayBack).toEqual(dataArray)
    })

    it('converts a U32 array to bytes and back correctly', () => {
      const dataArray = [
        U32.fromNumber(10),
        U32.fromNumber(20),
        U32.fromNumber(30),
        U32.fromNumber(40),
        U32.fromNumber(50),
      ]
      const byteArray = arrayToBytes(dataArray, ArrayTypes.U32)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.U32)
      expect(arrayBack).toEqual(dataArray)
    })

    it('converts a U64 array to bytes and back correctly', () => {
      const dataArray = [
        U64.fromNumber(10),
        U64.fromNumber(20),
        U64.fromNumber(30),
        U64.fromNumber(40),
        U64.fromNumber(50),
      ]
      const byteArray = arrayToBytes(dataArray, ArrayTypes.U64)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.U64)
      expect(arrayBack).toEqual(dataArray)
    })
    it('converts a U128 array to bytes and back correctly', () => {
      const dataArray = [
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
      ]

      const byteArray = arrayToBytes(dataArray, ArrayTypes.U128)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.U128)
      expect(arrayBack).toEqual(dataArray)
    })
    it('converts a I128 array to bytes and back correctly', () => {
      const dataArray = [
        123456789123456789n,
        -123456789123456789n,
        0n,
        I128.MAX,
        I128.MIN,
        -123456789123456789n,
      ]

      const byteArray = arrayToBytes(dataArray, ArrayTypes.I128)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.I128)
      expect(arrayBack).toEqual(dataArray)
    })
    it('converts a U256 array to bytes and back correctly', () => {
      const dataArray = [
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
        123456789123456789n,
      ]

      const byteArray = arrayToBytes(dataArray, ArrayTypes.U256)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.U256)
      expect(arrayBack).toEqual(dataArray)
    })

    it('converts a I32 array to bytes and back correctly', () => {
      const dataArray = [-10, -20, -30, -40, -50].map(I32.fromNumber)
      const byteArray = arrayToBytes(dataArray, ArrayTypes.I32)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.I32)
      expect(arrayBack).toEqual(dataArray)
    })

    it('converts a I64 array to bytes and back correctly', () => {
      const dataArray = [
        BigInt(-10),
        BigInt(-20),
        BigInt(-30),
        BigInt(-40),
        BigInt(-50),
      ]
      const byteArray = arrayToBytes(dataArray, ArrayTypes.I64)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.I64)
      expect(arrayBack).toEqual(dataArray)
    })

    it('test I64 array serialization against AS serialization', () => {
      const input = [
        BigInt(-3),
        BigInt(-2),
        BigInt(-1),
        BigInt(0),
        BigInt(1),
        BigInt(2),
        BigInt(3),
      ]
      const serialized = new Uint8Array([
        253, 255, 255, 255, 255, 255, 255, 255, 254, 255, 255, 255, 255, 255,
        255, 255, 255, 255, 255, 255, 255, 255, 255, 255, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0,
        0,
      ])
      expect(arrayToBytes(input, ArrayTypes.I64)).toEqual(serialized)
      expect(bytesToArray<bigint>(serialized, ArrayTypes.I64)).toEqual(input)
    })

    it('converts a F32 array to bytes and back correctly', () => {
      const dataArray = [1.1, 2.2, 3.3, 4.4, 5.5]
      const byteArray = arrayToBytes(dataArray, ArrayTypes.F32)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.F32)

      arrayBack.forEach((value, index) => {
        expect(value).toBeCloseTo(dataArray[index], 5)
      })
    })
    it('converts a F64 array to bytes and back correctly', () => {
      const dataArray = [1.1, 2.2, 3.3, 4.4, 5.5]
      const byteArray = arrayToBytes(dataArray, ArrayTypes.F64)
      const arrayBack = bytesToArray(byteArray, ArrayTypes.F64)

      arrayBack.forEach((value, index) => {
        expect(value).toBeCloseTo(dataArray[index], 5)
      })
    })
    it('throws an error when an unsupported type is used', () => {
      const dataArray = [1, 2, 3, 4, 5]
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const unsupportedType = 'someUnsupportedType' as any

      expect(() => arrayToBytes(dataArray, unsupportedType)).toThrow(
        `Unsupported type: ${unsupportedType}`
      )
    })

    it('string array', () => {
      const dataArray = ['bonjour', 'hello', 'hola', 'hallo', 'ciao']
      const byteArray = new Args()
        .addArray(dataArray, ArrayTypes.STRING)
        .serialize()
      const arrayBack = new Args(byteArray).nextArray(ArrayTypes.STRING)

      expect(arrayBack).toEqual(dataArray)
    })
  })
})
