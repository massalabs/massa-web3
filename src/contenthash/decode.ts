/* eslint-disable @typescript-eslint/no-magic-numbers */

import varint from 'varint'
import { bytesToStr } from '../basicElements/serializers/strings'
import * as Codec from './codecs'
import { MassaContentHash } from './types'

/**
 * Read a uvarint from the buffer at the given offset.
 *
 * @returns The decoded value and the number of bytes consumed.
 */
function readVarint(
  data: Uint8Array,
  offset: number
): { value: number; bytesRead: number } {
  const value = varint.decode(data, offset)
  const bytesRead = varint.decode.bytes
  if (bytesRead === undefined) {
    throw new Error(
      `Invalid contenthash: failed to decode varint at offset ${offset}`
    )
  }
  return { value, bytesRead }
}

/**
 * Read a length-prefixed UTF-8 string from the buffer at the given offset.
 *
 * Format: `uvarint(len) || utf8(string)`
 *
 * @returns The decoded string and the total number of bytes consumed.
 */
function readLpUtf8(
  data: Uint8Array,
  offset: number
): { value: string; bytesRead: number } {
  const { value: length, bytesRead: lengthBytes } = readVarint(data, offset)
  const strBytes = data.slice(
    offset + lengthBytes,
    offset + lengthBytes + length
  )
  if (strBytes.length !== length) {
    throw new Error(
      `Invalid contenthash: expected ${length} bytes for string, got ${strBytes.length}`
    )
  }
  return {
    value: bytesToStr(strBytes),
    bytesRead: lengthBytes + length,
  }
}

/**
 * Expect a specific codec at the current offset.
 *
 * @throws If the codec read does not match the expected value.
 */
function expectCodec(
  data: Uint8Array,
  offset: number,
  expected: number,
  label: string
): number {
  const { value, bytesRead } = readVarint(data, offset)
  if (value !== expected) {
    throw new Error(
      `Invalid contenthash: expected ${label} codec (0x${expected.toString(16)}), got 0x${value.toString(16)}`
    )
  }
  return bytesRead
}

/**
 * Decode a binary contenthash into its {@link MassaContentHash} components.
 *
 * Validates the codec sequence, extracts all fields, and applies the same
 * semantic rules as {@link encodeContentHash}: DeWeb path must start with `/`,
 * SC targets must start with `AS`, and MNS targets must be non-empty.
 *
 * @param data - The binary contenthash
 * @returns The decoded contenthash components
 * @throws If the data is malformed, contains unexpected codecs, or fails semantic validation
 */
export function decodeContentHash(data: Uint8Array): MassaContentHash {
  let offset = 0

  // 1. Massa ecosystem codec
  offset += expectCodec(data, offset, Codec.MASSA, 'massa')

  // 2. ContentHashNetwork codec
  const { value: networkCodec, bytesRead: networkBytes } = readVarint(
    data,
    offset
  )
  const network = Codec.CODEC_TO_NETWORK[networkCodec]
  if (network === undefined) {
    throw new Error(
      `Invalid contenthash: unknown network codec 0x${networkCodec.toString(16)}`
    )
  }
  offset += networkBytes

  // 3. Feature codec
  const { value: featureCodec, bytesRead: featureBytes } = readVarint(
    data,
    offset
  )
  offset += featureBytes

  if (featureCodec === Codec.MASSA_DEWEB) {
    // 4. Target codec
    const { value: targetCodec, bytesRead: targetCodecBytes } = readVarint(
      data,
      offset
    )
    offset += targetCodecBytes

    const { value: targetValue, bytesRead: targetValueBytes } = readLpUtf8(
      data,
      offset
    )
    offset += targetValueBytes

    let target: { type: 'mns'; value: string } | { type: 'sc'; value: string }
    if (targetCodec === Codec.MASSA_MNS) {
      if (!targetValue.length) {
        throw new Error('Invalid contenthash: MNS name must not be empty')
      }
      target = { type: 'mns', value: targetValue }
    } else if (targetCodec === Codec.MASSA_SC) {
      if (!targetValue.startsWith('AS')) {
        throw new Error(
          'Invalid contenthash: Smart-contract address must start with "AS"'
        )
      }
      target = { type: 'sc', value: targetValue }
    } else {
      throw new Error(
        `Invalid contenthash: unexpected target codec 0x${targetCodec.toString(16)} for deweb`
      )
    }

    // 5. Path codec
    offset += expectCodec(data, offset, Codec.PATH, 'path')
    const { value: pathValue, bytesRead: pathBytes } = readLpUtf8(data, offset)
    offset += pathBytes
    if (!pathValue.startsWith('/')) {
      throw new Error('Invalid contenthash: Path must start with "/"')
    }
    if (offset !== data.length) {
      throw new Error('Invalid contenthash: unexpected trailing data')
    }
    return { network, feature: 'deweb', target, path: pathValue }
  }
  if (featureCodec === Codec.MASSA_GOSSIP) {
    // 4. Gossip ID target codec
    offset += expectCodec(
      data,
      offset,
      Codec.MASSA_GOSSIP_ID,
      'massa-gossip-id'
    )
    const { value: targetValue, bytesRead: targetValueBytes } = readLpUtf8(
      data,
      offset
    )
    offset += targetValueBytes
    if (offset !== data.length) {
      throw new Error('Invalid contenthash: unexpected trailing data')
    }
    return {
      network,
      feature: 'gossip',
      target: { type: 'gossip-id', value: targetValue },
    }
  }
  throw new Error(
    `Invalid contenthash: unknown feature codec 0x${featureCodec.toString(16)}`
  )
}
