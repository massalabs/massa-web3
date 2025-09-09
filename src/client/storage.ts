import { PublicAPI } from './publicAPI'
import { AddressDatastoreKeys } from './types'
import {
  DEFAULT_MAX_ARGUMENT_ARRAY_SIZE,
  DEFAULT_GET_DATASTORE_KEYS_PAGE_SIZE,
} from '../provider/constants'
import { toBatch } from '../operation/batchOpArrayParam'

export type AddressDatastoreKeysParam = {
  address: string
  prefix: string | Uint8Array
  final: boolean
}

/**
 * Retrieves all datastore keys for multiple addresses with pagination support.
 * Handles batching to respect DEFAULT_MAX_ARGUMENT_ARRAY_SIZE limits.
 *
 * @param client - The PublicAPI client instance
 * @param params - Array of AddressDatastoreKeysParam objects
 * @returns Promise resolving to a 2D array where each inner array contains all keys for the corresponding address
 */
export async function getMultipleAddressesDatastoreKeys(
  client: PublicAPI,
  params: AddressDatastoreKeysParam[]
): Promise<AddressDatastoreKeys[]> {
  // Initialize result array with empty arrays for each address
  const results: AddressDatastoreKeys[] = params.map((param) => ({
    address: param.address,
    isFinal: param.final,
    keys: [],
  }))

  // Track pagination state for each address
  const addressStates = params.map((param, index) => ({
    index,
    address: param.address,
    prefix: param.prefix,
    final: param.final,
    startKey: undefined as Uint8Array | undefined,
    hasMoreKeys: true,
  }))

  let toContinue = true

  while (toContinue) {
    // Get indices of addresses that still have more keys
    const activeIndices = addressStates
      .filter((state) => state.hasMoreKeys)
      .map((state) => state.index)

    // Batch the active indices to respect DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
    const batchedIndices = toBatch(
      activeIndices,
      DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
    )

    // Process each batch
    for (const batchIndices of batchedIndices) {
      const requests = batchIndices.map((index) => {
        const state = addressStates[index]
        return {
          address: state.address,
          final: state.final,
          prefix: state.prefix,
          startKey: state.startKey,
          inclusiveStartKey: state.startKey ? false : true, // Exclude start key if from previous batch
          maxCount: DEFAULT_GET_DATASTORE_KEYS_PAGE_SIZE,
        }
      })

      let responses: AddressDatastoreKeys[]
      try {
        responses = await client.getAddressesDatastoreKeys(requests)
      } catch (error) {
        throw new Error(`Error retrieving datastore keys: ${error}`)
      }

      // Process responses and update states using original indices
      for (let i = 0; i < batchIndices.length; i++) {
        const stateIndex = batchIndices[i]
        const response = responses[i]

        if (!response || response.keys.length === 0) {
          // No more keys for this address
          addressStates[stateIndex].hasMoreKeys = false
        } else {
          // Add keys to results
          results[stateIndex].keys.push(...response.keys)

          // Check if we've reached the end for this address
          if (response.keys.length < DEFAULT_GET_DATASTORE_KEYS_PAGE_SIZE) {
            addressStates[stateIndex].hasMoreKeys = false
          } else {
            // Set start key for next iteration
            addressStates[stateIndex].startKey =
              response.keys[response.keys.length - 1]
          }
        }
      }
    }
    toContinue = addressStates.some((state) => state.hasMoreKeys)
  }

  return results
}
