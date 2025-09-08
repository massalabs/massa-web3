import { DEFAULT_MAX_ARGUMENT_ARRAY_SIZE, Provider } from '../provider'
import { PublicAPI } from '../client/publicAPI'
import { DatastoreEntry } from '../client/types'
import { GLOBAL_METADATA_TAG } from './keys/deweb_site_keys'
import { toBatch } from '../utils/array'
import {
  TITLE_METADATA_KEY,
  DESCRIPTION_METADATA_KEY,
  KEYWORD_METADATA_KEY_PREFIX,
  LAST_UPDATE_KEY,
} from './const'
import { Metadata } from './serializers'
import { bytesToStr } from '../basicElements/serializers'
import { getMultipleAddressesDatastoreKeys } from '../client/helper'

export type ParsedMetadata = {
  title?: string
  description?: string
  keywords?: string[]
  lastUpdate?: string
  custom?: Record<string, string>
}

export function extractWebsiteMetadata(metadata: Metadata[]): ParsedMetadata {
  return metadata.reduce((acc, m) => {
    if (m.key === LAST_UPDATE_KEY) {
      acc.lastUpdate = m.value
    } else if (m.key === TITLE_METADATA_KEY) {
      acc.title = m.value
    } else if (m.key === DESCRIPTION_METADATA_KEY) {
      acc.description = m.value
    } else if (m.key.startsWith(KEYWORD_METADATA_KEY_PREFIX)) {
      if (!acc.keywords) {
        acc.keywords = []
      }
      acc.keywords.push(m.value)
    } else {
      if (!acc.custom) {
        acc.custom = {}
      }
      acc.custom[m.key] = m.value
    }
    return acc
  }, {} as ParsedMetadata)
}

export async function getMultipleSitesGlobalMetadata(
  addresses: string[],
  provider: Provider
): Promise<ParsedMetadata[]> {
  const publicAPI = await PublicAPI.fromProvider(provider)

  // get all global metadata keys for all addresses
  const addressesMetadataKeysList = await getMultipleAddressesDatastoreKeys(
    publicAPI,
    addresses.map((address) => ({
      address,
      prefix: GLOBAL_METADATA_TAG,
      final: true,
    }))
  )

  // regroup all keys from all addresses into a single list
  const metadataKeysList = addressesMetadataKeysList.reduce((acc, curr) => {
    acc.push(
      ...curr.keys.map((key) => ({
        address: curr.address,
        key: key,
      }))
    )
    return acc
  }, [] as DatastoreEntry[])

  // divide the metadata keys list into batches
  const batchedMetadataKeysList = toBatch(
    metadataKeysList,
    DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
  )

  const metadataEntriesByBatch = await Promise.all(
    batchedMetadataKeysList.map(async (metadataKeysBatch) => {
      const result = await publicAPI.getDatastoreEntries(
        metadataKeysBatch,
        true
      )
      return result
    })
  )

  const metadata = metadataEntriesByBatch
    .flat() // regroup all metadata batch entries into a single list
    .map((metadataEntry, index) => {
      // map each metadata entry to a Metadata object
      const metadataKeyBytes = metadataKeysList[index].key.slice(
        GLOBAL_METADATA_TAG.length
      )
      const key = bytesToStr(metadataKeyBytes as Uint8Array)
      if (!metadataEntry) {
        return new Metadata(key)
      }
      const value = bytesToStr(metadataEntry)

      return new Metadata(key, value)
    })
    .reduce((acc, metadata, index) => {
      // group metadata by address
      if (index === 0) {
        acc.push([])
        acc[0].push(metadata)
        return acc
      }

      if (
        metadataKeysList[index].address === metadataKeysList[index - 1].address
      ) {
        acc[acc.length - 1].push(metadata)
      } else {
        acc.push([])
        acc[acc.length - 1].push(metadata)
      }

      return acc
    }, [] as Metadata[][])
    .map((metadata) => extractWebsiteMetadata(metadata)) //convert metadata to ParsedMetadata

  return metadata
}
