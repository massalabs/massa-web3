/* eslint-disable @typescript-eslint/naming-convention */

import { PublicProvider, SlotExecutionOutputFilter } from '..'
import { Account } from '../../account'
import { EventFilter } from '../../client'
import { Network, NetworkName } from '../../utils'
import { CHAIN_ID } from '../../utils'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { PublicServiceClient } from '../../generated/grpc/apis/massa/api/v1/public.client'
import { Mas, strToBytes } from '../../basicElements'
import { ReadOnlyExecutionOutput } from '../../generated/grpc/massa/model/v1/execution'
import { ReadSCParams } from '..'
import { OperationStatus } from '../../operation'
import { OutputEvents, SCOutputEvent } from '../../generated/client-types'
import {
  ABICallStack,
  ExecutionQueryExecutionStatus,
  ExecutionQueryRequestItem,
  GetDatastoreEntriesRequest,
  GetDatastoreEntryFilter,
  NewSlotExecutionOutputsFilter,
  NewSlotExecutionOutputsServerRequest,
  NewSlotExecutionOutputsServerResponse,
  QueryStateResponse,
  ScExecutionEventsFilter,
  SearchBlocksFilter,
  SearchEndorsementsFilter,
  SearchOperationsFilter,
  SelectorDrawsFilter,
  SlotABICallStacks,
  StakersFilter,
  TransferInfos,
} from '../../generated/grpc/apis/massa/api/v1/public'
import { ScExecutionEventStatus } from '../../generated/grpc/massa/model/v1/execution'
import { PublicStatus } from '../../generated/grpc/massa/model/v1/node'
import { Slot, SlotRange } from '../../generated/grpc/massa/model/v1/slot'
import {
  BlockInfo,
  BlockParent,
  BlockWrapper,
} from '../../generated/grpc/massa/model/v1/block'
import {
  OperationInfo,
  OperationWrapper,
} from '../../generated/grpc/massa/model/v1/operation'
import {
  EndorsementInfo,
  EndorsementWrapper,
} from '../../generated/grpc/massa/model/v1/endorsement'
import { SlotDraw } from '../../generated/grpc/massa/model/v1/draw'
import { Slot as tSlot } from '../../generated/client-types'
import { StakerEntry } from '../../generated/grpc/massa/model/v1/staker'

export class GrpcPublicProvider implements PublicProvider {
  constructor(
    public client: PublicServiceClient,
    public url: string
  ) {}

  static fromGrpcUrl(url: string): PublicProvider {
    const transport = new GrpcWebFetchTransport({
      baseUrl: url,
    })
    return new GrpcPublicProvider(new PublicServiceClient(transport), url)
  }

  newSlotExecutionOutputsStream(
    filters: SlotExecutionOutputFilter
  ): AsyncIterable<NewSlotExecutionOutputsServerResponse> {
    const filtersRequest: NewSlotExecutionOutputsFilter[] = []

    // Status filter
    if (filters.status) {
      filtersRequest.push({
        filter: {
          oneofKind: 'status',
          status: filters.status,
        },
      })
    }

    // Slot range filter
    if (filters.slotRange) {
      filtersRequest.push({
        filter: {
          oneofKind: 'slotRange',
          slotRange: filters.slotRange,
        },
      })
    }

    // Async pool changes filters
    if (filters.asyncPoolChangesFilter) {
      if (filters.asyncPoolChangesFilter.empty) {
        filtersRequest.push({
          filter: {
            oneofKind: 'asyncPoolChangesFilter',
            asyncPoolChangesFilter: { filter: { oneofKind: 'none', none: {} } },
          },
        })
      }

      if (filters.asyncPoolChangesFilter.type) {
        filtersRequest.push({
          filter: {
            oneofKind: 'asyncPoolChangesFilter',
            asyncPoolChangesFilter: {
              filter: {
                oneofKind: 'type',
                type: filters.asyncPoolChangesFilter.type,
              },
            },
          },
        })
      }
      if (filters.asyncPoolChangesFilter.handler) {
        filtersRequest.push({
          filter: {
            oneofKind: 'asyncPoolChangesFilter',
            asyncPoolChangesFilter: {
              filter: {
                oneofKind: 'handler',
                handler: filters.asyncPoolChangesFilter.handler,
              },
            },
          },
        })
      }
      if (filters.asyncPoolChangesFilter.destinationAddress) {
        filtersRequest.push({
          filter: {
            oneofKind: 'asyncPoolChangesFilter',
            asyncPoolChangesFilter: {
              filter: {
                oneofKind: 'destinationAddress',
                destinationAddress:
                  filters.asyncPoolChangesFilter.destinationAddress,
              },
            },
          },
        })
      }
      if (filters.asyncPoolChangesFilter.emitterAddress) {
        filtersRequest.push({
          filter: {
            oneofKind: 'asyncPoolChangesFilter',
            asyncPoolChangesFilter: {
              filter: {
                oneofKind: 'emitterAddress',
                emitterAddress: filters.asyncPoolChangesFilter.emitterAddress,
              },
            },
          },
        })
      }
      if (filters.asyncPoolChangesFilter.canBeExecuted !== undefined) {
        filtersRequest.push({
          filter: {
            oneofKind: 'asyncPoolChangesFilter',
            asyncPoolChangesFilter: {
              filter: {
                oneofKind: 'canBeExecuted',
                canBeExecuted: filters.asyncPoolChangesFilter.canBeExecuted,
              },
            },
          },
        })
      }
    }

    // Empty executed denounciation filter
    if (filters.emptyExecutedDenounciationFilter) {
      filtersRequest.push({
        filter: {
          oneofKind: 'executedDenounciationFilter',
          executedDenounciationFilter: {
            filter: {
              oneofKind: 'none',
              none: {},
            },
          },
        },
      })
    }

    // Event filters
    if (filters.eventFilter) {
      if (filters.eventFilter.empty) {
        filtersRequest.push({
          filter: {
            oneofKind: 'eventFilter',
            eventFilter: { filter: { oneofKind: 'none', none: {} } },
          },
        })
      }
      if (filters.eventFilter.callerAddress) {
        filtersRequest.push({
          filter: {
            oneofKind: 'eventFilter',
            eventFilter: {
              filter: {
                oneofKind: 'callerAddress',
                callerAddress: filters.eventFilter.callerAddress,
              },
            },
          },
        })
      }
      if (filters.eventFilter.emitterAddress) {
        filtersRequest.push({
          filter: {
            oneofKind: 'eventFilter',
            eventFilter: {
              filter: {
                oneofKind: 'emitterAddress',
                emitterAddress: filters.eventFilter.emitterAddress,
              },
            },
          },
        })
      }
      if (filters.eventFilter.originalOperationId) {
        filtersRequest.push({
          filter: {
            oneofKind: 'eventFilter',
            eventFilter: {
              filter: {
                oneofKind: 'originalOperationId',
                originalOperationId: filters.eventFilter.originalOperationId,
              },
            },
          },
        })
      }
      if (filters.eventFilter.isFailure !== undefined) {
        filtersRequest.push({
          filter: {
            oneofKind: 'eventFilter',
            eventFilter: {
              filter: {
                oneofKind: 'isFailure',
                isFailure: filters.eventFilter.isFailure,
              },
            },
          },
        })
      }
    }

    // Executed ops changes filters
    if (filters.executedOpsChangesFilter) {
      if (filters.executedOpsChangesFilter.empty) {
        filtersRequest.push({
          filter: {
            oneofKind: 'executedOpsChangesFilter',
            executedOpsChangesFilter: {
              filter: { oneofKind: 'none', none: {} },
            },
          },
        })
      }
      if (filters.executedOpsChangesFilter.operationId) {
        filtersRequest.push({
          filter: {
            oneofKind: 'executedOpsChangesFilter',
            executedOpsChangesFilter: {
              filter: {
                oneofKind: 'operationId',
                operationId: filters.executedOpsChangesFilter.operationId,
              },
            },
          },
        })
      }
    }

    // Ledger changes filters
    if (filters.ledgerChangesFilter) {
      if (filters.ledgerChangesFilter.empty) {
        filtersRequest.push({
          filter: {
            oneofKind: 'ledgerChangesFilter',
            ledgerChangesFilter: { filter: { oneofKind: 'none', none: {} } },
          },
        })
      }

      if (filters.ledgerChangesFilter.address) {
        filtersRequest.push({
          filter: {
            oneofKind: 'ledgerChangesFilter',
            ledgerChangesFilter: {
              filter: {
                oneofKind: 'address',
                address: filters.ledgerChangesFilter.address,
              },
            },
          },
        })
      }
    }

    const request: NewSlotExecutionOutputsServerRequest = {
      filters: filtersRequest,
    }

    return this.client.newSlotExecutionOutputsServer(request).responses
  }

  /**
   * Executes a state query on the blockchain
   */
  async queryState(
    queries: ExecutionQueryRequestItem[]
  ): Promise<QueryStateResponse> {
    return await this.client.queryState({ queries }).response
  }

  async balanceOf(
    addresses: string[],
    final = true
  ): Promise<{ address: string; balance: bigint }[]> {
    const queries: ExecutionQueryRequestItem[] = addresses.map((address) => ({
      requestItem: final
        ? {
            oneofKind: 'addressBalanceFinal' as const,
            addressBalanceFinal: { address },
          }
        : {
            oneofKind: 'addressBalanceCandidate' as const,
            addressBalanceCandidate: { address },
          },
    }))

    const response = await this.client.queryState({ queries })

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

        return {
          address: addresses[index],
          balance: responseItem.result.responseItem.amount.mantissa,
        }
      })
      .filter(
        (item): item is { address: string; balance: bigint } => item !== null
      )

    return balances
  }

  /**
   * Searches for operations based on IDs or addresses
   */
  async searchOperations(
    operationIds?: string[],
    addresses?: string[]
  ): Promise<OperationInfo[]> {
    const queries: SearchOperationsFilter[] = []
    if (operationIds) {
      queries.push({
        filter: {
          oneofKind: 'operationIds',
          operationIds: {
            operationIds: operationIds,
          },
        },
      })
    }
    if (addresses) {
      queries.push({
        filter: {
          oneofKind: 'addresses',
          addresses: {
            addresses: addresses,
          },
        },
      })
    }
    return (await this.client.searchOperations({ filters: queries }).response)
      .operationInfos
  }

  /**
   * Retrieves ABI call stacks for specified operations
   */
  async getOperationABICallStacks(
    operationIds: string[]
  ): Promise<ABICallStack[]> {
    return (
      await this.client.getOperationABICallStacks({ operationIds }).response
    ).callStacks
  }

  /**
   * Retrieves ABI call stacks for specified slots
   */
  async getSlotABICallStacks(slots: tSlot[]): Promise<SlotABICallStacks[]> {
    const grpcSlots: Slot[] = slots.map((slot) => ({
      period: BigInt(slot.period),
      thread: slot.thread,
    }))
    return (
      await this.client.getSlotABICallStacks({ slots: grpcSlots }).response
    ).slotCallStacks
  }

  /**
   * Retrieves transfer information for specified slots
   */
  async getSlotTransfers(slots: tSlot[]): Promise<TransferInfos[]> {
    const grpcSlots: Slot[] = slots.map((slot) => ({
      period: BigInt(slot.period),
      thread: slot.thread,
    }))
    return (await this.client.getSlotTransfers({ slots: grpcSlots }).response)
      .transferEachSlot
  }

  /**
   * Searches for endorsements based on various criteria
   */
  async searchEndorsements(
    endorsementIds?: string[],
    addresses?: string[],
    blockIds?: string[]
  ): Promise<EndorsementInfo[]> {
    const queries: SearchEndorsementsFilter[] = []
    if (endorsementIds) {
      queries.push({
        filter: {
          oneofKind: 'endorsementIds',
          endorsementIds: {
            endorsementIds: endorsementIds,
          },
        },
      })
    }
    if (addresses) {
      queries.push({
        filter: {
          oneofKind: 'addresses',
          addresses: {
            addresses: addresses,
          },
        },
      })
    }
    if (blockIds) {
      queries.push({
        filter: {
          oneofKind: 'blockIds',
          blockIds: {
            blockIds: blockIds,
          },
        },
      })
    }
    return (await this.client.searchEndorsements({ filters: queries }).response)
      .endorsementInfos
  }

  /**
   * Retrieves storage keys for a smart contract with optional filtering and pagination
   */
  // eslint-disable-next-line max-params
  async getStorageKeys(
    address: string,
    filter?: Uint8Array | string,
    final?: boolean,
    startKey?: Uint8Array,
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

      const startKeyValue = startKey ? { value: startKey } : undefined
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

      const response = await this.client.queryState({ queries })

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

  /**
   * Reads storage values for specified keys in a smart contract
   */
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

    const response = await this.client.getDatastoreEntries(request)
    return response.response.datastoreEntries.map((item) =>
      final === undefined || final ? item.finalValue : item.candidateValue
    )
  }

  /**
   * Retrieves the current transaction throughput of the network
   */
  async getTransactionsThroughput(): Promise<number> {
    return (await this.client.getTransactionsThroughput({}).response).throughput
  }

  /**
   * Retrieves selector draws for specified addresses and slot range
   */
  async getSelectorDraws(
    addresses?: string[],
    slotRange?: SlotRange
  ): Promise<SlotDraw[]> {
    const queries: SelectorDrawsFilter[] = []
    if (addresses) {
      queries.push({
        filter: {
          oneofKind: 'addresses',
          addresses: {
            addresses: addresses,
          },
        },
      })
    }

    if (slotRange) {
      queries.push({
        filter: {
          oneofKind: 'slotRange',
          slotRange: slotRange,
        },
      })
    }

    const response = await this.client.getSelectorDraws({
      filters: queries,
    })
    return response.response.draws
  }

  /**
   * Retrieves detailed information about specified operations
   */
  async getOperations(operationIds: string[]): Promise<OperationWrapper[]> {
    const response = await this.client.getOperations({
      operationIds: operationIds,
    })
    return response.response.wrappedOperations
  }

  /**
   * Retrieves the best parent blocks for the next block
   */
  async getNextBlockBestParent(): Promise<BlockParent[]> {
    const response = await this.client.getNextBlockBestParents({})
    return response.response.blockParents
  }

  /**
   * Retrieves detailed information about specified endorsements
   */
  async getEndorsements(
    endorsementIds: string[]
  ): Promise<EndorsementWrapper[]> {
    const response = await this.client.getEndorsements({
      endorsementIds: endorsementIds,
    })
    return response.response.wrappedEndorsements
  }

  /**
   * Retrieves detailed information about specified blocks
   */
  async getBlocks(blockIds: string[]): Promise<BlockWrapper[]> {
    const response = await this.client.getBlocks({
      blockIds: blockIds,
    })
    return response.response.wrappedBlocks
  }

  /**
   * Searches for blocks based on various criteria
   */
  async searchBlocks(
    blockIds?: string[],
    addresses?: string[],
    slotRange?: SlotRange
  ): Promise<BlockInfo[]> {
    const queries: SearchBlocksFilter[] = []
    if (blockIds) {
      queries.push({
        filter: {
          oneofKind: 'blockIds',
          blockIds: {
            blockIds: blockIds,
          },
        },
      })
    }

    if (addresses) {
      queries.push({
        filter: {
          oneofKind: 'addresses',
          addresses: {
            addresses: addresses,
          },
        },
      })
    }

    if (slotRange) {
      queries.push({
        filter: {
          oneofKind: 'slotRange',
          slotRange: slotRange,
        },
      })
    }
    return (await this.client.searchBlocks({ filters: queries }).response)
      .blockInfos
  }

  /**
   * Retrieves events based on specified filters
   */
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

    const response = await this.client.getScExecutionEvents({
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

  async networkInfos(): Promise<Network> {
    const status = await this.client.getStatus({})
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
          oneofKind: 'opExecutionStatusCandidate' as const,
          opExecutionStatusCandidate: { operationId: opId },
        },
      },
    ]

    const response = await this.client.queryState({ queries })

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

  /**
   * Retrieves a list of stakers with optional filtering by rolls
   */
  async getStakers(
    minRolls?: bigint,
    maxRolls?: bigint,
    limit?: bigint
  ): Promise<StakerEntry[]> {
    const queries: StakersFilter[] = []

    if (minRolls) {
      queries.push({
        filter: {
          oneofKind: 'minRolls',
          minRolls: minRolls,
        },
      })
    }

    if (maxRolls) {
      queries.push({
        filter: {
          oneofKind: 'maxRolls',
          maxRolls: maxRolls,
        },
      })
    }

    if (limit) {
      queries.push({
        filter: {
          oneofKind: 'limit',
          limit: limit,
        },
      })
    }

    const response = await this.client.getStakers({ filters: queries })
    return response.response.stakers
  }

  async getNodeStatus(): Promise<PublicStatus> {
    const response = await this.client.getStatus({})
    const status = response.response?.status
    if (!status) {
      throw new Error('Empty response received')
    }
    return status
  }

  async readSC(params: ReadSCParams): Promise<ReadOnlyExecutionOutput> {
    const args = params.parameter ?? new Uint8Array()
    const caller =
      params.caller ?? (await Account.generate()).address.toString()
    const maxGas = params.maxGas ?? 0n

    const response = await this.client.executeReadOnlyCall({
      call: {
        maxGas: maxGas,
        ...(params.fee && {
          fee: { mantissa: params.fee, scale: Mas.NB_DECIMALS },
        }),
        callerAddress: { value: caller },
        callStack: [],
        target: {
          oneofKind: 'functionCall' as const,
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
}
