import {
  GAS_ESTIMATION_TOLERANCE,
  NodeStatusInfo,
  PublicProvider,
  ReadSCData,
  ReadSCParams,
} from '..'
import {
  Account,
  CHAIN_ID,
  DatastoreEntry,
  EventFilter,
  Mas,
  MAX_GAS_CALL,
  minBigInt,
  Network,
  NetworkName,
  PublicAPI,
  PublicApiUrl,
  strToBytes,
} from '../..'
import { rpcTypes as t } from '../../generated'
import { OperationStatus } from '../../operation'
import { formatNodeStatusObject } from '../../client/formatObjects'
import { U64_t } from '../../basicElements/serializers/number/u64'

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
    const args = params.parameter ?? new Uint8Array()
    const caller =
      params.caller ?? (await Account.generate()).address.toString()
    const readOnlyParams = {
      ...params,
      caller,
      parameter: args instanceof Uint8Array ? args : args.serialize(),
    }
    return this.client.executeReadOnlyCall(readOnlyParams)
  }

  public async getStorageKeys(
    address: string,
    filter: Uint8Array | string = new Uint8Array(),
    final = true
  ): Promise<Uint8Array[]> {
    const filterBytes: Uint8Array =
      typeof filter === 'string' ? strToBytes(filter) : filter
    return this.client.getDataStoreKeys(address, filterBytes, final)
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

    const gasCost = BigInt(result.info.gasCost)
    return minBigInt(
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      gasCost + (gasCost * GAS_ESTIMATION_TOLERANCE) / 100n,
      MAX_GAS_CALL
    )
  }
}
