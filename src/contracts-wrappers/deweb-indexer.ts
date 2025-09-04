import { NetworkName, CHAIN_ID, toBatch } from '../utils'
import {
  DEFAULT_MAX_ARGUMENT_ARRAY_SIZE,
  Provider,
  PublicProvider,
} from '../provider'
import { SmartContract } from '../smartContracts'
import { checkNetwork } from './utils'
import { bytesToStr } from '../basicElements'
import { indexByOwnerBaseKey } from '../deweb/keys/indexer_keys'
import { FILE_LOCATION_TAG } from '../deweb/keys/deweb_site_keys'
import { PublicAPI } from '../client/publicAPI'
import { AddressDatastoreKeys } from '../client/types'

export const DEWEB_INDEXER_CONTRACTS = {
  [NetworkName.Mainnet]:
    'AS12UpEfdonZxyFnsmrJfZbXLM3Gq6LaL3hPk7wTXqU4UZfnypKzF',
  [NetworkName.Buildnet]:
    'AS1TmA4GNpSYBseNNMXpbAp2trUwZxZy3T1sZ9Qd3Qdn9L8wGbMS',
}

export class DewebIndexer extends SmartContract {
  constructor(provider: Provider | PublicProvider, chainId: bigint) {
    const address =
      chainId === CHAIN_ID.Mainnet
        ? DEWEB_INDEXER_CONTRACTS[NetworkName.Mainnet]
        : DEWEB_INDEXER_CONTRACTS[NetworkName.Buildnet]
    super(provider, address)
  }

  static async init(
    provider: Provider | PublicProvider
  ): Promise<DewebIndexer> {
    const { chainId } = await provider.networkInfos()
    return new DewebIndexer(provider, chainId)
  }

  static mainnet(provider: Provider | PublicProvider): DewebIndexer {
    checkNetwork(provider, true)
    return new DewebIndexer(provider, CHAIN_ID.Mainnet)
  }

  static buildnet(provider: Provider | PublicProvider): DewebIndexer {
    checkNetwork(provider, false)
    return new DewebIndexer(provider, CHAIN_ID.Buildnet)
  }

  /**
   * Retrieves the list of websites addresses belonging to the owner from the indexer contract
   * @param ownerAddress - The address of the owner
   * @param provider - The provider to use
   * @returns The list of websites addresses belonging to the owner
   */
  async getIndexerWebsiteList(
    ownerAddress: string,
    provider: Provider
  ): Promise<string[]> {
    const prefix = indexByOwnerBaseKey(ownerAddress)
    // retreives from indexer contract the list of websites addresses belonging to the owner
    let keys: Uint8Array[] = []
    try {
      keys = await provider.getStorageKeys(this.address, prefix) // retreives addresses of websites
    } catch (error) {
      throw new Error(
        'error retrieving indexer website list belonging to ' + ownerAddress,
        error
      )
    }

    // if the user doesn't have any websites registered on the indexer contract
    if (keys.length === 0) {
      return []
    }

    /* check that returned addresses have files */
    const publicAPI = await PublicAPI.fromProvider(provider)

    // retrieve the addresses of the websites from corresponding keys retrieved from the indexer contract
    const websitesAddresses = keys.map((key) => key.slice(prefix.length))

    // batch the websites addresses in DEFAULT_MAX_ARGUMENT_ARRAY_SIZE sub array to prevent exceeding max argument limit
    const batchedWebsitesAddresses = toBatch(
      websitesAddresses,
      DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
    )

    let websitesFileLocationKeys: AddressDatastoreKeys[] = []
    try {
      websitesFileLocationKeys = (
        await Promise.all(
          batchedWebsitesAddresses.map(async (websitesAddressesBatch) => {
            // retrieve files location keys for all websites addresses in the batch in a single request
            return await publicAPI.getAddressesDatastoreKeys(
              websitesAddressesBatch.map((address) => ({
                address: bytesToStr(address),
                prefix: FILE_LOCATION_TAG,
                final: true,
                maxCount: 1,
              }))
            )
          })
        )
      ).flat() // regroup all batch result into a single list
    } catch (error) {
      throw new Error(
        "error while filtering websites that don't have files",
        error
      )
    }

    return websitesFileLocationKeys
      .filter((key) => key.keys.length > 0) // filter out websites that don't have files
      .map((key) => key.address) // get the addresses of the websites that have files
  }
}
