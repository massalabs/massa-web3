import {
  extractData,
  mustExtractPrefix,
} from '../../src/basicElements/internal'
import Base58 from '../../src/crypto/base58'
import VarintVersioner from '../../src/crypto/varintVersioner'
import { Version } from '../../src/crypto/interfaces/versioner'

describe('Internal functions tests', () => {
  const serializer = new Base58()
  const versioner = new VarintVersioner()

  test('extractData throws error for invalid version', () => {
    const data = serializer.serialize(Uint8Array.from([0, 1, 2, 3, 4]))
    expect(() => extractData(serializer, versioner, data, Version.V1)).toThrow(
      'invalid version: 0. 1 was expected.'
    )
  })

  test('extractData returns correct data for valid version', () => {
    const data = serializer.serialize(Uint8Array.from([0, 1, 2, 3, 4]))
    const extractedData = extractData(serializer, versioner, data, Version.V0)
    expect(extractedData).toEqual(Uint8Array.from([1, 2, 3, 4]))
  })

  test('mustExtractPrefix throws error for invalid prefix', () => {
    expect(() => mustExtractPrefix('IP_invalid_prefix', 'AS')).toThrow(
      'invalid prefix: IP. AS was expected.'
    )

    expect(() => mustExtractPrefix('IP_invalid_prefix', 'AS', 'AU')).toThrow(
      'invalid prefix: IP. one of AS or AU was expected.'
    )
  })
})
