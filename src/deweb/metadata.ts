import { DEFAULT_MAX_ARGUMENT_ARRAY_SIZE, Provider } from '../provider'
import { PublicAPI } from '../client/publicAPI'
import { DatastoreEntry } from '../client/types'
import { GLOBAL_METADATA_TAG } from './keys/deweb_site_keys'
import { batchListAndCall } from '../operation/batchOpArrayParam'
import {
  TITLE_METADATA_KEY,
  DESCRIPTION_METADATA_KEY,
  KEYWORD_METADATA_KEY_PREFIX,
  LAST_UPDATE_KEY,
} from './const'
import { Metadata } from './serializers'
import { bytesToStr } from '../basicElements/serializers'
import { getMultipleAddressesDatastoreKeys } from '../client/storage'

export type ParsedMetadata = {
  title?: string
  description?: string
  keywords?: string[]
  lastUpdate?: string
  custom?: Record<string, string>
}

/**
 * Extracts the metadata from a list of Metadata objects into a [[ParsedMetadata]] object
 * @param metadata - The list of Metadata objects of a deweb website
 * @returns The an [[ParsedMetadata]] object
 */
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

/**
 * Retrieves the global metadata for multiple addresses
 * @param addresses - The list of deweb smart contract addresses from which to retrieve global metadatas
 * @param provider - The provider to use
 * @param isFinal - Whether to get metadata from the final state or from the pending state. False by default.
 * @returns The global metadata for each address
 */
export async function getMultipleSitesGlobalMetadata(
  addresses: string[],
  provider: Provider,
  isFinal = false
): Promise<ParsedMetadata[]> {
  const publicAPI = await PublicAPI.fromProvider(provider)

  // get all global metadata keys for all addresses
  const addressesMetadataKeysList = await getMultipleAddressesDatastoreKeys(
    publicAPI,
    addresses.map((address) => ({
      address,
      prefix: GLOBAL_METADATA_TAG,
      final: isFinal,
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

  // Use the batchListAndCall function to process metadata keys in batches
  const allMetadataEntries = await batchListAndCall(
    metadataKeysList,
    async (metadataKeysBatch) => {
      return publicAPI.getDatastoreEntries(metadataKeysBatch, isFinal)
    },
    DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
  )

  const metadata = allMetadataEntries
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
