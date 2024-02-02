import { expect, it, describe } from '@jest/globals'
import {
  signedBigIntUtils,
  unsignedBigIntUtils,
} from '../../src/utils/encode_decode_int/index'

describe('BigInt Serializers Tests', () => {
  beforeAll(() => {
    const consoleSpy = jest.spyOn(console, 'error')
    consoleSpy.mockImplementation(() => null)
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  describe('Unsigned BigInt Serializer Tests', () => {
    it('should encode and decode positive unsigned BigInt', () => {
      const values = [1n, 1111111n, 1111111111111111n]

      for (let value of values) {
        const buffer = unsignedBigIntUtils.encode(value)
        const decodedValue = unsignedBigIntUtils.decode(buffer)
        expect(decodedValue).toEqual(value)
      }
    })

    it('should calculate encoding length for unsigned BigInt', () => {
      expect(unsignedBigIntUtils.encodingLength(1111111n)).toEqual(3)
    })

    it('should throw error when encoding negative unsigned BigInt', () => {
      expect(() => unsignedBigIntUtils.encode(-1n)).toThrow(
        'value must be unsigned'
      )
    })

    it('should throw error when buffer is too small', () => {
      const smallBuffer = new ArrayBuffer(1)
      expect(() => unsignedBigIntUtils.encode(1111111n, smallBuffer)).toThrow(
        'the buffer is too small'
      )
    })

    it('should throw error when decoding with offset out of range', () => {
      const encodedValue = unsignedBigIntUtils.encode(1111111n)
      expect(() => unsignedBigIntUtils.decode(encodedValue, 100)).toThrow(
        'offset out of range'
      )
    })
  })

  describe('Signed BigInt Serializer Tests', () => {
    it('should encode and decode positive signed BigInt', () => {
      const values = [1n, 1111111n, BigInt(1) ** BigInt(11)]

      for (let value of values) {
        const buffer = signedBigIntUtils.encode(value)
        const uint8Array = new Uint8Array(buffer)
        const decodedValue = signedBigIntUtils.decode(uint8Array)
        expect(decodedValue).toEqual(value)
      }
    })

    it('should encode and decode negative signed BigInt', () => {
      const values = [-1n, -1111111n, -(BigInt(1) ** BigInt(11))]

      for (let value of values) {
        const buffer = signedBigIntUtils.encode(value)
        const uint8Array = new Uint8Array(buffer)
        const decodedValue = signedBigIntUtils.decode(uint8Array)
        expect(decodedValue).toEqual(value)
      }
    })

    it('should calculate encoding length for positive signed BigInt', () => {
      expect(signedBigIntUtils.encodingLength(1111111n)).toEqual(4)
    })

    it('should calculate encoding length for negative signed BigInt', () => {
      expect(signedBigIntUtils.encodingLength(-1111111n)).toEqual(4)
    })
  })
})
