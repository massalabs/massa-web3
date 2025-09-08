import { strToBytes, U32 } from '../../basicElements'

export const FILE_TAG: Uint8Array = strToBytes('\x01FILE')
export const FILE_LOCATION_TAG: Uint8Array = strToBytes('\x02LOCATION')
export const CHUNK_TAG: Uint8Array = strToBytes('\x03CHUNK')
export const CHUNK_NB_TAG: Uint8Array = strToBytes('\x04CHUNK_NB')
export const FILE_METADATA_TAG: Uint8Array = strToBytes('\x05FM')
export const GLOBAL_METADATA_TAG: Uint8Array = strToBytes('\x06GM')
export const DEWEB_VERSION_TAG: Uint8Array = strToBytes('\xFFDEWEB_VERSION')

export function globalMetadataKey(metadataKey: Uint8Array): Uint8Array {
  return new Uint8Array([...GLOBAL_METADATA_TAG, ...metadataKey])
}

export function fileLocationKey(hashLocation: Uint8Array): Uint8Array {
  return new Uint8Array([...FILE_LOCATION_TAG, ...hashLocation])
}

export function fileKey(hashLocation: Uint8Array): Uint8Array {
  return new Uint8Array([...FILE_TAG, ...hashLocation])
}

export function fileMetadataKey(
  hashLocation: Uint8Array,
  metadataKey: Uint8Array = new Uint8Array()
): Uint8Array {
  return new Uint8Array([
    ...fileKey(hashLocation),
    ...FILE_METADATA_TAG,
    ...metadataKey,
  ])
}

export function fileChunkCountKey(hashLocation: Uint8Array): Uint8Array {
  return new Uint8Array([...fileKey(hashLocation), ...CHUNK_NB_TAG])
}

export function fileChunkKey(
  hashLocation: Uint8Array,
  index: bigint
): Uint8Array {
  return new Uint8Array([
    ...fileKey(hashLocation),
    ...CHUNK_TAG,
    ...U32.toBytes(index),
  ])
}
