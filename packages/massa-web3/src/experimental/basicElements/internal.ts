import Serializer from '../crypto/interfaces/serializer'
import { Versioner, Version } from '../crypto/interfaces/versioner'
import { FIRST, ONE } from '../utils'

/**
 * Deserialize a string data into non versioned bytes and checks that expected version match.
 *
 * @returns the extracted data.
 */
export function extractData(
  serializer: Serializer,
  versioner: Versioner,
  data: string,
  expectedVersion: Version
): Uint8Array {
  const raw = serializer.deserialize(data)
  const { data: extractedData, version } = versioner.extract(raw)
  if (version !== expectedVersion) {
    throw new Error(
      `invalid version: ${version}. ${expectedVersion} was expected.`
    )
  }
  return extractedData
}

/**
 * Get the prefix of a string and validate it against the expected ones.
 *
 * @remarks
 * If several prefixes are expected, their length must be the same.
 *
 * @returns the extracted prefix.
 */
export function mustExtractPrefix(str: string, ...expected: string[]): string {
  const prefix = str.slice(FIRST, expected[FIRST].length)
  if (!expected.includes(prefix)) {
    throw new Error(
      `invalid prefix: ${prefix}. ${expected.length > ONE ? 'one of ' : ''}${expected.join(' or ')} was expected.`
    )
  }
  return prefix
}
