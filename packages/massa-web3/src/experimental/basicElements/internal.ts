import Serializer from '../crypto/interfaces/serializer'
import { Versioner, Version } from '../crypto/interfaces/versioner'

export function extractData(
  serializer: Serializer,
  versioner: Versioner,
  data: string,
  expectedVersion: Version
): Uint8Array {
  const raw: Uint8Array = serializer.deserialize(data)
  const { data: extractedData, version } = versioner.extract(raw)
  if (version !== expectedVersion) {
    throw new Error(
      `invalid version: ${version}. ${expectedVersion} was expected.`
    )
  }
  return extractedData
}

export function mustExtractPrefix(str: string, ...expected: string[]): string {
  const prefix = str.slice(0, expected[0].length)
  if (!expected.includes(prefix)) {
    throw new Error(
      `invalid prefix: ${prefix}. ${expected.length > 1 ? 'one of ' : ''}${expected.join(' or ')} was expected.`
    )
  }
  return prefix
}
