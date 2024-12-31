import { NodeStatusInfo, PublicProvider, ReadSCData, ReadSCParams } from '..'
import {
  Account,
  CHAIN_ID,
  DatastoreEntry,
  EventFilter,
  Network,
  NetworkName,
  PublicAPI,
  PublicApiUrl,
  strToBytes,
} from '../..'
import { rpcTypes as t } from '../../generated'
import { OperationStatus } from '../../operation'
import { formatNodeStatusObject } from '../../client/formatObjects'

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
    const balances = await Promise.all(
      addresses.map(async (address) => ({
        address,
        balance: await this.client.getBalance(address, final),
      }))
    )
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
  ): Promise<Uint8Array[]> {
    const entries: DatastoreEntry[] = keys.map((key) => ({ address, key }))
    return this.client.getDatastoreEntries(entries, final)
  }
}
