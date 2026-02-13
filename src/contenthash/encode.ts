import varint from 'varint'
import { strToBytes } from '../basicElements/serializers/strings'
import * as Codec from './codecs'
import { MassaContentHash } from './types'

/**
 * Encode a multicodec value as a uvarint.
 */
function encodeCodec(codec: number): Uint8Array {
  return new Uint8Array(varint.encode(codec))
}

/**
 * Encode a string as a length-prefixed UTF-8 byte sequence.
 *
 * Format: `uvarint(len(utf8(s))) || utf8(s)`
 */
function encodeLpUtf8(str: string): Uint8Array {
  const bytes = strToBytes(str)
  const lengthPrefix = new Uint8Array(varint.encode(bytes.length))
  const result = new Uint8Array(lengthPrefix.length + bytes.length)
  result.set(lengthPrefix)
  result.set(bytes, lengthPrefix.length)
  return result
}

/**
 * Concatenate multiple Uint8Arrays into a single Uint8Array.
 */
function concat(parts: Uint8Array[]): Uint8Array {
  const totalLength = parts.reduce((sum, p) => sum + p.length, 0)
  const result = new Uint8Array(totalLength)
  let offset = 0
  for (const part of parts) {
    result.set(part, offset)
    offset += part.length
  }
  return result
}

/**
 * Encode a {@link MassaContentHash} into its ENSIP-7 compatible binary representation.
 *
 * Binary layout:
 * ```
 * codec(massa) empty
 * codec(network) empty
 * codec(feature) empty
 * codec(target) lp-utf8(target-value)
 * [codec(path) lp-utf8(file-path)]   // deweb only
 * ```
 *
 * @param params - The contenthash components to encode
 * @returns The binary contenthash
 * @throws If the target or path values are invalid
 */
export function encodeContentHash(params: MassaContentHash): Uint8Array {
  const parts: Uint8Array[] = []

  // 1. Massa ecosystem codec (empty value)
  parts.push(encodeCodec(Codec.MASSA))

  // 2. Network codec (empty value)
  const networkCodec = Codec.NETWORK_CODECS[params.network]
  if (networkCodec === undefined) {
    throw new Error(`Unknown network: ${params.network}`)
  }
  parts.push(encodeCodec(networkCodec))

  // 3. Feature + target + optional path
  const feature = params.feature
  if (feature === 'deweb') {
    parts.push(encodeCodec(Codec.MASSA_DEWEB))

    const targetType = params.target.type
    if (targetType === 'mns') {
      if (!params.target.value.length) {
        throw new Error('MNS name must not be empty')
      }
      parts.push(encodeCodec(Codec.MASSA_MNS))
    } else if (targetType === 'sc') {
      if (!params.target.value.startsWith('AS')) {
        throw new Error('Smart-contract address must start with "AS"')
      }
      parts.push(encodeCodec(Codec.MASSA_SC))
    } else {
      throw new Error(
        `Unsupported target type for deweb feature: ${targetType}`
      )
    }
    parts.push(encodeLpUtf8(params.target.value))

    if (!params.path.startsWith('/')) {
      throw new Error('Path must start with "/"')
    }
    parts.push(encodeCodec(Codec.PATH))
    parts.push(encodeLpUtf8(params.path))
  } else if (feature === 'gossip') {
    parts.push(encodeCodec(Codec.MASSA_GOSSIP))
    parts.push(encodeCodec(Codec.MASSA_GOSSIP_ID))
    parts.push(encodeLpUtf8(params.target.value))
  } else {
    throw new Error(`Unknown feature: ${feature}`)
  }

  return concat(parts)
}
