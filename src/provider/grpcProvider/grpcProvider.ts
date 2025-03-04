/* eslint-disable @typescript-eslint/naming-convention */

import { Mas, strToBytes } from '../../basicElements'
import { EventFilter } from '../../client'
import { OutputEvents, SCOutputEvent } from '../../generated/client-types'
import { OperationStatus, Operation } from '../../operation'
import { SmartContract } from '../../smartContracts'
import { CHAIN_ID, Network, NetworkName } from '../../utils'
import { Provider, ReadSCParams, SignedData } from '..'
import { Account } from '../../account'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { fromNanoMas } from '../../basicElements/mas'
import { PublicServiceClient } from '../../generated/grpc/apis/massa/api/v1/public.client'
import {
  ExecutionQueryExecutionStatus,
  ExecutionQueryRequestItem,
  GetDatastoreEntriesRequest,
  GetDatastoreEntryFilter,
  ScExecutionEventsFilter,
} from '../../generated/grpc/apis/massa/api/v1/public'
import {
  ReadOnlyExecutionOutput,
  ScExecutionEventStatus,
} from '../../generated/grpc/massa/model/v1/execution'
import { PublicStatus } from '../../generated/grpc/massa/model/v1/node'

export class GrpcProvider implements Provider {
  private readonly publicClient: PublicServiceClient
  private readonly url: string

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly _providerName: string = 'Massa GRPC provider'

  constructor(
    url: string,
    public account: Account
  ) {
    const transport = new GrpcWebFetchTransport({
      baseUrl: url,
    })
    this.publicClient = new PublicServiceClient(transport)
    this.url = url
  }

  async balanceOf(
    addresses: string[],
    final?: boolean
  ): Promise<{ address: string; balance: bigint }[]> {
    const queries: ExecutionQueryRequestItem[] = addresses.map((address) => {
      if (final) {
        return {
          requestItem: {
            oneofKind: 'addressBalanceFinal',
            addressBalanceFinal: { address },
          },
        }
      }
      return {
        requestItem: {
          oneofKind: 'addressBalanceCandidate',
          addressBalanceCandidate: { address },
        },
      }
    })

    const response = await this.publicClient.queryState({ queries })

    const balances = response.response.responses
      .map((item, index) => {
        const responseItem = item.response

        if (!responseItem) {
          console.warn(
            `Empty response received for address ${addresses[index]}`
          )
          return null
        }

        if (responseItem.oneofKind === 'error') {
          console.warn(
            `Error for address ${addresses[index]}: ${responseItem.error?.message}`
          )
          return null
        }

        if (
          responseItem.oneofKind !== 'result' ||
          responseItem.result?.responseItem?.oneofKind !== 'amount'
        ) {
          console.warn(
            `Unexpected response format for address ${addresses[index]}`
          )
          return null
        }

        const balance = fromNanoMas(
          responseItem.result.responseItem.amount.mantissa
        )
        return { address: addresses[index], balance }
      })
      .filter(
        (item): item is { address: string; balance: bigint } => item !== null
      )

    return balances
  }

  async networkInfos(): Promise<Network> {
    const status = await this.publicClient.getStatus({})
    const chainId = status.response?.status?.chainId
    let networkName
    if (chainId === CHAIN_ID.Mainnet) {
      networkName = NetworkName.Mainnet
    } else if (chainId === CHAIN_ID.Buildnet) {
      networkName = NetworkName.Buildnet
    }

    return {
      name: networkName,
      chainId: chainId ? chainId : 0n,
      url: this.url,
      minimalFee: status.response?.status?.minimalFees?.mantissa ?? 0n,
    }
  }
  async getOperationStatus(opId: string): Promise<OperationStatus> {
    const queries: ExecutionQueryRequestItem[] = [
      {
        requestItem: {
          oneofKind: 'opExecutionStatusCandidate',
          opExecutionStatusCandidate: { operationId: opId },
        },
      },
    ]

    const response = await this.publicClient.queryState({ queries })

    if (response.response.responses.length === 0) {
      throw new Error('Operation not found')
    }

    const operation = response.response.responses[0].response
    if (operation.oneofKind === 'error') {
      throw new Error('error in queryState')
    }

    if (operation.oneofKind === 'result') {
      if (operation.result.responseItem.oneofKind === 'executionStatus') {
        switch (operation.result.responseItem.executionStatus) {
          case ExecutionQueryExecutionStatus.ALREADY_EXECUTED_WITH_FAILURE:
            return OperationStatus.Error
          case ExecutionQueryExecutionStatus.ALREADY_EXECUTED_WITH_SUCCESS:
            return OperationStatus.Success
          case ExecutionQueryExecutionStatus.EXECUTABLE_OR_EXPIRED:
            return OperationStatus.NotFound
          case ExecutionQueryExecutionStatus.UNSPECIFIED:
            return OperationStatus.NotFound
        }
      }
    }

    return OperationStatus.NotFound
  }

  /// only events with context are returned
  async getEvents(filter: EventFilter): Promise<OutputEvents> {
    const filters: ScExecutionEventsFilter[] = []

    if (filter.start !== undefined && filter.end !== undefined) {
      filters.push({
        filter: {
          oneofKind: 'slotRange',
          slotRange: {
            startSlot: {
              period: BigInt(filter.start.period),
              thread: filter.start.thread,
            },
            endSlot: {
              period: BigInt(filter.end.period),
              thread: filter.end.thread,
            },
          },
        },
      })
    } else if (filter.callerAddress !== undefined) {
      filters.push({
        filter: {
          oneofKind: 'callerAddress',
          callerAddress: filter.callerAddress,
        },
      })
    } else if (filter.smartContractAddress !== undefined) {
      filters.push({
        filter: {
          oneofKind: 'emitterAddress',
          emitterAddress: filter.smartContractAddress,
        },
      })
    } else if (filter.operationId !== undefined) {
      filters.push({
        filter: {
          oneofKind: 'originalOperationId',
          originalOperationId: filter.operationId,
        },
      })
    } else if (filter.isError !== undefined) {
      filters.push({
        filter: {
          oneofKind: 'isFailure',
          isFailure: filter.isError,
        },
      })
    } else if (filter.status !== undefined) {
      filters.push({
        filter: {
          oneofKind: 'status',
          status: filter.status,
        },
      })
    }

    const response = await this.publicClient.getScExecutionEvents({
      filters: filters,
    })
    const outputEvents: OutputEvents = response.response.events
      .filter((event) => event.context !== null)
      .map((event) => {
        const context = {
          slot: {
            period: Number(event.context?.originSlot?.period ?? 0),
            thread: Number(event.context?.originSlot?.thread ?? 0),
          },
          read_only:
            event.context?.status === ScExecutionEventStatus.READ_ONLY
              ? true
              : false,
          call_stack: event.context?.callStack ?? [],
          index_in_slot: Number(event.context?.indexInSlot ?? 0),
          is_final:
            event.context?.status === ScExecutionEventStatus.FINAL
              ? true
              : false,
        }
        const outputEvent: SCOutputEvent = {
          data: event.data.toString(),
          context,
        }
        return outputEvent
      })
    return outputEvents
  }

  async getNodeStatus(): Promise<PublicStatus> {
    const response = await this.publicClient.getStatus({})
    const status = response.response?.status
    if (!status) {
      throw new Error('Empty response received')
    }
    return status
  }

  async readSC(params: ReadSCParams): Promise<ReadOnlyExecutionOutput> {
    const args = params.parameter ?? new Uint8Array()
    const caller = params.caller ?? this.account.address.toString()
    const maxGas = params.maxGas ?? 0n
    const fee = params.fee ?? fromNanoMas(0n)

    const response = await this.publicClient.executeReadOnlyCall({
      call: {
        maxGas: maxGas,
        ...(params.fee && { fee: { mantissa: fee, scale: Mas.NB_DECIMALS } }),
        callerAddress: { value: caller },
        callStack: [],
        target: {
          oneofKind: 'functionCall',
          functionCall: {
            targetAddress: params.target,
            targetFunction: params.func,
            parameter: args instanceof Uint8Array ? args : args.serialize(),
          },
        },
      },
    })

    if (!response.response.output) {
      throw new Error('No output received')
    }

    return response.response.output
  }

  /* eslint-disable-next-line max-params */
  async getStorageKeys(
    address: string,
    filter?: Uint8Array | string,
    final?: boolean,
    start_key?: Uint8Array,
    inclusiveStartKey?: boolean,
    endKey?: Uint8Array,
    inclusiveEndKey?: boolean,
    limit?: number
  ): Promise<Uint8Array[]> {
    if (!address) {
      throw new Error('Address is required')
    }

    try {
      const queries: ExecutionQueryRequestItem[] = []
      const prefix = filter
        ? typeof filter === 'string'
          ? strToBytes(filter)
          : filter
        : new Uint8Array()

      const startKeyValue = start_key ? { value: start_key } : undefined
      const inclusiveStartKeyValue =
        inclusiveStartKey !== undefined
          ? { value: inclusiveStartKey }
          : undefined
      const endKeyValue = endKey ? { value: endKey } : undefined
      const inclusiveEndKeyValue =
        inclusiveEndKey !== undefined ? { value: inclusiveEndKey } : undefined
      const limitValue = limit ? { value: limit } : undefined

      queries.push({
        requestItem: final
          ? {
              oneofKind: 'addressDatastoreKeysFinal' as const,
              addressDatastoreKeysFinal: {
                address,
                prefix,
                ...(startKeyValue && { startKey: startKeyValue }),
                ...(inclusiveStartKeyValue && {
                  inclusiveStartKey: inclusiveStartKeyValue,
                }),
                ...(endKeyValue && { endKey: endKeyValue }),
                ...(inclusiveEndKeyValue && {
                  inclusiveEndKey: inclusiveEndKeyValue,
                }),
                ...(limitValue && { limit: limitValue }),
              },
            }
          : {
              oneofKind: 'addressDatastoreKeysCandidate' as const,
              addressDatastoreKeysCandidate: {
                address,
                prefix,
                ...(startKeyValue && { startKey: startKeyValue }),
                ...(inclusiveStartKeyValue && {
                  inclusiveStartKey: inclusiveStartKeyValue,
                }),
                ...(endKeyValue && { endKey: endKeyValue }),
                ...(inclusiveEndKeyValue && {
                  inclusiveEndKey: inclusiveEndKeyValue,
                }),
                ...(limitValue && { limit: limitValue }),
              },
            },
      })

      const response = await this.publicClient.queryState({ queries })

      if (!response?.response?.responses?.[0]) {
        throw new Error(`No response received for address ${address}`)
      }

      const addressInfo = response.response.responses[0].response

      if (addressInfo.oneofKind === 'error') {
        throw new Error(
          `Query state error: ${addressInfo.error?.message || 'Unknown error'}`
        )
      }

      if (
        addressInfo.oneofKind === 'result' &&
        addressInfo.result.responseItem.oneofKind === 'vecBytes'
      ) {
        return addressInfo.result.responseItem.vecBytes.items
      }

      throw new Error(
        `Unexpected response type: ${addressInfo.oneofKind}, ` +
          `expected 'result' with 'vecBytes' but got '${addressInfo.oneofKind === 'result' ? addressInfo.result.responseItem.oneofKind : 'N/A'}'`
      )
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get storage keys: ${error.message}`)
      }
      throw new Error('Failed to get storage keys: Unknown error')
    }
  }

  async readStorage(
    address: string,
    keys: Uint8Array[] | string[],
    final?: boolean
  ): Promise<(Uint8Array | null)[]> {
    const filters: GetDatastoreEntryFilter[] = keys.map((item) => {
      const key: Uint8Array = typeof item === 'string' ? strToBytes(item) : item
      const ret: GetDatastoreEntryFilter = {
        filter: {
          oneofKind: 'addressKey',
          addressKey: {
            address: address,
            key: key,
          },
        },
      }
      return ret
    })

    const request: GetDatastoreEntriesRequest = {
      filters: filters,
    }

    const response = await this.publicClient.getDatastoreEntries(request)
    return response.response.datastoreEntries.map((item) =>
      final === undefined || final ? item.finalValue : item.candidateValue
    )
  }
  get address(): string {
    return this.account.address.toString()
  }
  get accountName(): string {
    return this.account.address.toString()
  }
  get providerName(): string {
    return this._providerName
  }
  async balance(final = true): Promise<bigint> {
    try {
      const queries: ExecutionQueryRequestItem[] = [
        {
          requestItem: final
            ? {
                oneofKind: 'addressBalanceFinal',
                addressBalanceFinal: {
                  address: this.account.address.toString(),
                },
              }
            : {
                oneofKind: 'addressBalanceCandidate',
                addressBalanceCandidate: {
                  address: this.account.address.toString(),
                },
              },
        },
      ]

      const response = await this.publicClient.queryState({ queries })

      if (!response?.response?.responses?.[0]) {
        throw new Error('No response received for balance query')
      }

      const result = response.response.responses[0].response

      if (result.oneofKind === 'error') {
        throw new Error(
          `Query state error: ${result.error?.message || 'Unknown error'}`
        )
      }

      if (
        result.oneofKind === 'result' &&
        result.result.responseItem.oneofKind === 'amount'
      ) {
        return result.result.responseItem.amount.mantissa
      }

      throw new Error(
        `Unexpected response type: ${result.oneofKind}, ` +
          `expected 'result' with 'amount' but got '${result.oneofKind === 'result' ? result.result.responseItem.oneofKind : 'N/A'}'`
      )
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get balance: ${error.message}`)
      }
      throw new Error('Failed to get balance: Unknown error')
    }
  }

  /**
   * @obsolete This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for signing data.
   */
  /* eslint-disable-next-line class-methods-use-this */
  sign(): Promise<SignedData> {
    throw new Error('Method not implemented.')
  }

  /**
   * @obsolete This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for buying rolls.
   */
  /* eslint-disable-next-line class-methods-use-this */
  buyRolls(): Promise<Operation> {
    throw new Error('Method not implemented.')
  }

  /**
   * @obsolete This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for selling rolls.
   */
  /* eslint-disable-next-line class-methods-use-this */
  sellRolls(): Promise<Operation> {
    throw new Error('Method not implemented.')
  }

  /**
   * @obsolete This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for transferring assets.
   */
  /* eslint-disable-next-line class-methods-use-this */
  transfer(): Promise<Operation> {
    throw new Error('Method not implemented.')
  }

  /**
   * @obsolete This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for calling smart contracts.
   */
  /* eslint-disable-next-line class-methods-use-this */
  callSC(): Promise<Operation> {
    throw new Error('Method not implemented.')
  }

  /**
   * @obsolete This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for executing smart contracts.
   */
  /* eslint-disable-next-line class-methods-use-this */
  executeSC(): Promise<Operation> {
    throw new Error('Method not implemented.')
  }

  /**
   * @obsolete This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for deploying smart contracts.
   */
  /* eslint-disable-next-line class-methods-use-this */
  deploySC(): Promise<SmartContract> {
    throw new Error('Method not implemented.')
  }
}
