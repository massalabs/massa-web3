import {
  GAS_ESTIMATION_TOLERANCE,
  NodeStatusInfo,
  PublicProvider,
  ReadSCData,
  ReadSCParams,
} from '..'
import {
  CHAIN_ID,
  DatastoreEntry,
  DEFAULT_GET_DATASTORE_KEYS_PAGE_SIZE,
  EventFilter,
  ExecuteSCReadOnlyParams,
  ExecuteSCReadOnlyResult,
  Mas,
  MAX_GAS_CALL,
  MAX_GAS_EXECUTE,
  minBigInt,
  Network,
  NetworkName,
  parseCallArgs,
  PublicAPI,
  PublicApiUrl,
} from '../..'
import { rpcTypes as t } from '../../generated'
import { OperationStatus } from '../../operation'
import { formatNodeStatusObject } from '../../client/formatObjects'
import { U64_t } from '../../basicElements/serializers/number/u64'

// Randomly chosen address that exists on buildnet & mainnet.
// this is used as a workaround for https://github.com/massalabs/massa/issues/4912
const PLACEHOLDER_CALLER =
  'AU12hCMYq5LoYktCeEYetJWow9Ttr2N4Pcbek7uS9e5u2Er5X4tAn'

export class JsonRpcPublicProvider implements PublicProvider {
  constructor(public client: PublicAPI) {}

  static fromRPCUrl(url: string): PublicProvider {
    return new JsonRpcPublicProvider(new PublicAPI(url))
  }

  static mainnet(): PublicProvider {
    return JsonRpcPublicProvider.fromRPCUrl(PublicApiUrl.Mainnet)
  }

  static buildnet(): PublicProvider {
    return JsonRpcPublicProvider.fromRPCUrl(PublicApiUrl.Buildnet)
  }

  async balanceOf(
    addresses: string[],
    final = true
  ): Promise<{ address: string; balance: bigint }[]> {
    const addressesInfo = await this.client.getMultipleAddressInfo(addresses)

    const balances = addressesInfo.map((addressInfo) => ({
      address: addressInfo.address,
      balance: final
        ? Mas.fromString(addressInfo.final_balance)
        : Mas.fromString(addressInfo.candidate_balance),
    }))

    return balances
  }

  async networkInfos(): Promise<Network> {
    const chainId = await this.client.getChainId()
    let name = 'Unknown'
    if (chainId === CHAIN_ID.Mainnet) {
      name = NetworkName.Mainnet
    } else if (chainId === CHAIN_ID.Buildnet) {
      name = NetworkName.Buildnet
    }

    return {
      name,
      chainId,
      url: this.client.url,
      minimalFee: await this.client.getMinimalFee(),
    }
  }

  public async getOperationStatus(opId: string): Promise<OperationStatus> {
    return this.client.getOperationStatus(opId)
  }

  public async getEvents(filter: EventFilter): Promise<t.OutputEvents> {
    return this.client.getEvents(filter)
  }

  public async getNodeStatus(): Promise<NodeStatusInfo> {
    const status = await this.client.status()
    return formatNodeStatusObject(status)
  }

  /**
   * Reads smart contract function.
   * @param params - readSCParams.
   * @returns A promise that resolves to a ReadSCData.
   *
   * @remarks Be a aware that if you don't provide a caller address, it will generate a random one.
   */
  async readSC(params: ReadSCParams): Promise<ReadSCData> {
    const parameter = parseCallArgs(params.parameter)

    const caller = params.caller ?? PLACEHOLDER_CALLER

    const readOnlyParams = {
      ...params,
      caller,
      parameter,
    }
    return this.client.executeReadOnlyCall(readOnlyParams)
  }

  public async getStorageKeys(
    address: string,
    filter: Uint8Array | string = new Uint8Array(),
    final = true
  ): Promise<Uint8Array[]> {
    return this.getAllDatastoreKeys(address, filter, final)
  }

  /**
   * Wrapper for getAddressesDatastoreKeys that handles pagination to fetch all datastore keys.
   * @param address - The address to get datastore keys for
   * @param filter - Optional prefix filter for keys
   * @param final - Whether to get final or candidate keys
   * @returns Promise resolving to all datastore keys for the address
   */
  private async getAllDatastoreKeys(
    address: string,
    filter: Uint8Array | string = new Uint8Array(),
    final = true
  ): Promise<Uint8Array[]> {
    const allKeys: Uint8Array[] = []
    let startKey: Uint8Array | undefined = undefined
    let hasMoreKeys = true

    while (hasMoreKeys) {
      const request = {
        address,
        final,
        prefix: filter.length > 0 ? filter : undefined,
        startKey,
        inclusiveStartKey: startKey ? false : true, // Exclude the start key if it's from previous batch
        maxCount: DEFAULT_GET_DATASTORE_KEYS_PAGE_SIZE,
      }

      const response = await this.client.getAddressesDatastoreKeys([request])
      const addressKeys = response[0]

      if (!addressKeys || addressKeys.keys.length === 0) {
        hasMoreKeys = false
        break
      }

      allKeys.push(...addressKeys.keys)

      // If we got less than the max count, we've reached the end
      if (addressKeys.keys.length < DEFAULT_GET_DATASTORE_KEYS_PAGE_SIZE) {
        hasMoreKeys = false
      } else {
        // Use the last key as start for next iteration
        startKey = addressKeys.keys[addressKeys.keys.length - 1]
      }
    }

    return allKeys
  }

  public async readStorage(
    address: string,
    keys: Uint8Array[] | string[],
    final = true
  ): Promise<(Uint8Array | null)[]> {
    const entries: DatastoreEntry[] = keys.map((key) => ({ address, key }))
    return this.client.getDatastoreEntries(entries, final)
  }

  /**
   * Returns the gas estimation for a given function.
   *
   * @remarks To avoid running out of gas, the gas estimation is increased by 20%.
   *
   * @param params - ReadSCParams. caller must be provided
   * @throws If the read operation returns an error.
   * @returns The gas estimation for the operation execution.
   */
  public async getGasEstimation(params: ReadSCParams): Promise<U64_t> {
    if (!params.caller) {
      throw new Error('Caller must be provided for gas estimation')
    }

    const result = await this.readSC(params)

    if (result.info.error) {
      throw new Error(result.info.error)
    }

    // TODO: add coins estimation by analysing the stateChanges

    const gasCost = BigInt(result.info.gasCost)
    return minBigInt(
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      gasCost + (gasCost * GAS_ESTIMATION_TOLERANCE) / 100n,
      MAX_GAS_CALL
    )
  }

  public async executeSCReadOnly(
    params: ExecuteSCReadOnlyParams
  ): Promise<ExecuteSCReadOnlyResult> {
    const caller = params.caller ?? PLACEHOLDER_CALLER
    const result = await this.client.executeReadOnlyBytecode({
      ...params,
      caller,
    })
    if (result.error) {
      throw new Error(result.error)
    }
    return result
  }

  public async executeSCGasEstimation(
    params: ExecuteSCReadOnlyParams
  ): Promise<U64_t> {
    const result = await this.client.executeReadOnlyBytecode({
      ...params,
      maxGas: MAX_GAS_EXECUTE,
    })
    if (result.error) {
      throw new Error(result.error)
    }

    // TODO: add coins estimation by analysing the stateChanges

    const gasCost = BigInt(result.gasCost)
    return minBigInt(
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      gasCost + (gasCost * GAS_ESTIMATION_TOLERANCE) / 100n,
      MAX_GAS_EXECUTE
    )
  }
}
