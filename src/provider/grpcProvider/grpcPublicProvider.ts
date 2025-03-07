/* eslint-disable @typescript-eslint/naming-convention */

import { Account } from '../../account'
import { EventFilter } from '../../client'
import { Network, NetworkName } from '../../utils'
import { CHAIN_ID } from '../../utils'
import { Mas, strToBytes } from '../../basicElements'
import { PublicProvider, ReadSCParams, SlotExecutionOutputFilter } from '..'
import { OperationStatus } from '../../operation'
import { OutputEvents, SCOutputEvent } from '../../generated/client-types'
import { Slot as tSlot } from '../../generated/client-types'
import { FilterBuilder } from './filterBuilder'

// Import from model

// Import from api
import {
  ABICallStack,
  AddressBalanceCandidate,
  AddressBalanceFinal,
  AddressDatastoreKeysCandidate,
  AddressDatastoreKeysFinal,
  ExecuteReadOnlyCallRequest,
  ExecutionQueryExecutionStatus,
  ExecutionQueryRequestItem,
  GetBlocksRequest,
  GetDatastoreEntriesRequest,
  GetDatastoreEntryFilter,
  GetEndorsementsRequest,
  GetNextBlockBestParentsRequest,
  GetOperationABICallStacksRequest,
  GetOperationsRequest,
  GetScExecutionEventsRequest,
  GetSelectorDrawsRequest,
  GetSlotABICallStacksRequest,
  GetSlotTransfersRequest,
  GetStakersRequest,
  GetStatusRequest,
  GetTransactionsThroughputRequest,
  NewSlotExecutionOutputsServerRequest,
  NewSlotExecutionOutputsServerResponse,
  OpExecutionStatusCandidate,
  QueryStateRequest,
  QueryStateResponse,
  ScExecutionEventsFilter,
  SearchBlocksFilter,
  SearchBlocksRequest,
  SearchEndorsementsFilter,
  SearchEndorsementsRequest,
  SearchOperationsFilter,
  SearchOperationsRequest,
  SelectorDrawsFilter,
  SlotABICallStacks,
  StakersFilter,
  TransferInfos,
} from '../../generated/grpc/public_pb'
import {
  OperationIds,
  OperationInfo,
  OperationWrapper,
} from '../../generated/grpc/massa/model/v1/operation_pb'
import { Slot, SlotRange } from '../../generated/grpc/massa/model/v1/slot_pb'
import {
  EndorsementIds,
  EndorsementInfo,
  EndorsementWrapper,
} from '../../generated/grpc/massa/model/v1/endorsement_pb'
import { Addresses } from '../../generated/grpc/massa/model/v1/address_pb'
import {
  BlockIds,
  BlockInfo,
  BlockParent,
  BlockWrapper,
} from '../../generated/grpc/massa/model/v1/block_pb'
import { AddressKeyEntry } from '../../generated/grpc/massa/model/v1/datastore_pb'
import { SlotDraw } from '../../generated/grpc/massa/model/v1/draw_pb'
import {
  FunctionCall,
  ReadOnlyExecutionCall,
  ReadOnlyExecutionOutput,
  ScExecutionEventStatus,
} from '../../generated/grpc/massa/model/v1/execution_pb'
import { StakerEntry } from '../../generated/grpc/massa/model/v1/staker_pb'
import { PublicStatus } from '../../generated/grpc/massa/model/v1/node_pb'
import { NativeAmount } from '../../generated/grpc/massa/model/v1/amount_pb'
import { ClientReadableStream } from 'grpc-web'
import { PublicServiceClient } from '../../generated/grpc/PublicServiceClientPb'

export class GrpcPublicProvider implements PublicProvider {
  constructor(
    public client: PublicServiceClient,
    public url: string
  ) {}

  static fromGrpcUrl(url: string): PublicProvider {
    // const transport = new GrpcWebFetchTransport({
    //     baseUrl: url,
    // })
    return new GrpcPublicProvider(new PublicServiceClient(url), url)
  }

  newSlotExecutionOutputsStream(
    filters: SlotExecutionOutputFilter
  ): ClientReadableStream<NewSlotExecutionOutputsServerResponse> {
    const builder = new FilterBuilder()

    // Status filter
    if (filters.status) {
      builder.addStatus(filters.status)
    }

    // Slot range filter
    if (filters.slotRange) {
      builder.addSlotRange(filters.slotRange)
    }

    // Async pool changes filters
    if (filters.asyncPoolChangesFilter) {
      builder.addAsyncPoolChangesFilter(filters.asyncPoolChangesFilter)
    }

    // Empty executed denounciation filter
    if (filters.emptyExecutedDenounciationFilter) {
      builder.addEmptyExecutedDenounciationFilter()
    }

    // Event filters
    if (filters.eventFilter) {
      builder.addEventFilter(filters.eventFilter)
    }

    // Executed ops changes filters
    if (filters.executedOpsChangesFilter) {
      builder.addExecutedOpsChangesFilter(filters.executedOpsChangesFilter)
    }

    // Ledger changes filters
    if (filters.ledgerChangesFilter) {
      builder.addLedgerChangesFilter(filters.ledgerChangesFilter)
    }

    const f = builder.build()
    const request = new NewSlotExecutionOutputsServerRequest()
    request.setFiltersList(f)

    // const controller = new RpcOutputStreamController<NewSlotExecutionOutputsServerResponse>()
    return this.client.newSlotExecutionOutputsServer(request)

    // // Handle the server stream
    // let listener = serverStream.responses.onNext((message, error, complete) => {
    //     if (error) {
    //         if (controller.closed) {
    //             return;
    //         }
    //         controller.notifyError(error)
    //     }
    //     if (complete) {
    //         listener();
    //         listenerComplete();
    //         listenerError();
    //     }
    //     if (message) {
    //         controller.notifyMessage(message)
    //     }
    // })

    // // Handle server stream closure
    // let listenerComplete = serverStream.responses.onComplete(() => {
    //     if (controller.closed) {
    //         return;
    //     }
    //     controller.notifyComplete()
    // })

    // // Handle server stream errors
    // let listenerError = serverStream.responses.onError((error) => {
    //     if (controller.closed) {
    //         return;
    //     }
    //     controller.notifyError(error)
    // })

    // let c_l = controller.onComplete(() => {
    //     listener();
    //     listenerComplete();
    //     listenerError();
    //     c_l();
    // });

    // return controller
  }

  /**
   * Executes a state query on the blockchain
   */
  async queryState(
    queries: ExecutionQueryRequestItem[]
  ): Promise<QueryStateResponse> {
    return await this.client.queryState(
      new QueryStateRequest().setQueriesList(queries)
    )
  }

  async balanceOf(
    addresses: string[],
    final = true
  ): Promise<{ address: string; balance: bigint }[]> {
    const queries: ExecutionQueryRequestItem[] = addresses.map((address) => {
      const ret = new ExecutionQueryRequestItem()
      if (final) {
        ret.setAddressBalanceFinal(
          new AddressBalanceFinal().setAddress(address)
        )
      } else {
        ret.setAddressBalanceCandidate(
          new AddressBalanceCandidate().setAddress(address)
        )
      }
      return ret
    })

    const response = await this.client.queryState(
      new QueryStateRequest().setQueriesList(queries)
    )

    const balances = response
      .getResponsesList()
      .map((item, index) => {
        const responseItem = item

        if (!responseItem) {
          console.warn(
            `Empty response received for address ${addresses[index]}`
          )
          return null
        }

        if (responseItem.hasError()) {
          console.warn(
            `Error for address ${addresses[index]}: ${responseItem.getError()?.getMessage()}`
          )
          return null
        }

        if (
          !responseItem.hasResult() ||
          !responseItem.getResult()?.hasAmount()
        ) {
          console.warn(
            `Unexpected response format for address ${addresses[index]}`
          )
          return null
        }

        return {
          address: addresses[index],
          balance: BigInt(
            responseItem.getResult()?.getAmount()?.getMantissa() ?? 0
          ),
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
      const o = new SearchOperationsFilter()
      o.setOperationIds(new OperationIds().setOperationIdsList(operationIds))
      queries.push(o)
    }
    if (addresses) {
      const a = new SearchOperationsFilter()
      a.setAddresses(new Addresses().setAddressesList(addresses))
      queries.push(a)
    }
    return (
      await this.client.searchOperations(
        new SearchOperationsRequest().setFiltersList(queries)
      )
    ).getOperationInfosList()
  }

  /**
   * Retrieves ABI call stacks for specified operations
   */
  async getOperationABICallStacks(
    operationIds: string[]
  ): Promise<ABICallStack[]> {
    return (
      await this.client.getOperationABICallStacks(
        new GetOperationABICallStacksRequest().setOperationIdsList(operationIds)
      )
    ).getCallStacksList()
  }

  /**
   * Retrieves ABI call stacks for specified slots
   */
  async getSlotABICallStacks(slots: tSlot[]): Promise<SlotABICallStacks[]> {
    const grpcSlots: Slot[] = slots.map((slot) =>
      new Slot().setPeriod(slot.period).setThread(slot.thread)
    )
    return (
      await this.client.getSlotABICallStacks(
        new GetSlotABICallStacksRequest().setSlotsList(grpcSlots)
      )
    ).getSlotCallStacksList()
  }

  /**
   * Retrieves transfer information for specified slots
   */
  async getSlotTransfers(slots: tSlot[]): Promise<TransferInfos[]> {
    const grpcSlots: Slot[] = slots.map((slot) =>
      new Slot().setPeriod(slot.period).setThread(slot.thread)
    )
    return (
      await this.client.getSlotTransfers(
        new GetSlotTransfersRequest().setSlotsList(grpcSlots)
      )
    ).getTransferEachSlotList()
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
      const e = new SearchEndorsementsFilter()
      e.setEndorsementIds(
        new EndorsementIds().setEndorsementIdsList(endorsementIds)
      )
      queries.push(e)
    }
    if (addresses) {
      const a = new SearchEndorsementsFilter()
      a.setAddresses(new Addresses().setAddressesList(addresses))
      queries.push(a)
    }
    if (blockIds) {
      const b = new SearchEndorsementsFilter()
      b.setBlockIds(new BlockIds().setBlockIdsList(blockIds))
      queries.push(b)
    }
    return (
      await this.client.searchEndorsements(
        new SearchEndorsementsRequest().setFiltersList(queries)
      )
    ).getEndorsementInfosList()
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

      const ret = new ExecutionQueryRequestItem()
      if (final) {
        ret.setAddressDatastoreKeysFinal(
          new AddressDatastoreKeysFinal()
            .setAddress(address)
            .setPrefix(prefix)
            .setStartKey(startKeyValue)
            .setInclusiveStartKey(inclusiveStartKeyValue)
            .setEndKey(endKeyValue)
            .setInclusiveEndKey(inclusiveEndKeyValue)
            .setLimit(limitValue)
        )
      } else {
        ret.setAddressDatastoreKeysCandidate(
          new AddressDatastoreKeysCandidate()
            .setAddress(address)
            .setPrefix(prefix)
            .setStartKey(startKeyValue)
            .setInclusiveStartKey(inclusiveStartKeyValue)
            .setEndKey(endKeyValue)
            .setInclusiveEndKey(inclusiveEndKeyValue)
            .setLimit(limitValue)
        )
      }

      queries.push(ret)

      // queries.push({
      //     requestItem: final
      //         ? {
      //             oneofKind: 'addressDatastoreKeysFinal' as const,
      //             addressDatastoreKeysFinal: {
      //                 address,
      //                 prefix,
      //                 ...(startKeyValue && { startKey: startKeyValue }),
      //                 ...(inclusiveStartKeyValue && {
      //                     inclusiveStartKey: inclusiveStartKeyValue,
      //                 }),
      //                 ...(endKeyValue && { endKey: endKeyValue }),
      //                 ...(inclusiveEndKeyValue && {
      //                     inclusiveEndKey: inclusiveEndKeyValue,
      //                 }),
      //                 ...(limitValue && { limit: limitValue }),
      //             },
      //         }
      //         : {
      //             oneofKind: 'addressDatastoreKeysCandidate' as const,
      //             addressDatastoreKeysCandidate: {
      //                 address,
      //                 prefix,
      //                 ...(startKeyValue && { startKey: startKeyValue }),
      //                 ...(inclusiveStartKeyValue && {
      //                     inclusiveStartKey: inclusiveStartKeyValue,
      //                 }),
      //                 ...(endKeyValue && { endKey: endKeyValue }),
      //                 ...(inclusiveEndKeyValue && {
      //                     inclusiveEndKey: inclusiveEndKeyValue,
      //                 }),
      //                 ...(limitValue && { limit: limitValue }),
      //             },
      //         },
      // })

      const response = await this.client.queryState(
        new QueryStateRequest().setQueriesList(queries)
      )

      if (response?.getResponsesList().length === 0) {
        throw new Error(`No response received for address ${address}`)
      }

      const addressInfo = response.getResponsesList()[0]

      if (addressInfo.hasError()) {
        throw new Error(
          `Query state error: ${addressInfo.getError()?.getMessage() || 'Unknown error'}`
        )
      }

      if (addressInfo.hasResult() && addressInfo.getResult()?.hasVecBytes()) {
        return (
          addressInfo
            .getResult()
            ?.getVecBytes()
            ?.getItemsList()
            .map((item) =>
              typeof item === 'string' ? strToBytes(item) : item
            ) ?? []
        )
      }

      throw new Error(
        `Unexpected response type: ${addressInfo.getResponseCase()}, ` +
          `expected 'result' with 'vecBytes' but got '${addressInfo.hasResult() ? addressInfo.getResult() : 'N/A'}'`
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
      const ret = new GetDatastoreEntryFilter()
      ret.setAddressKey(new AddressKeyEntry().setAddress(address).setKey(key))
      return ret
    })

    const response = await this.client.getDatastoreEntries(
      new GetDatastoreEntriesRequest().setFiltersList(filters)
    )

    const datastoreEntries = response.getDatastoreEntriesList()

    return datastoreEntries.map((item) => {
      let value
      if (final === undefined || final) {
        value = item.getFinalValue()
      } else {
        value = item.getCandidateValue()
      }
      if (typeof value === 'string') {
        return strToBytes(value)
      }
      return value
    })
  }

  /**
   * Retrieves the current transaction throughput of the network
   */
  async getTransactionsThroughput(): Promise<number> {
    const request = new GetTransactionsThroughputRequest()
    const response = await this.client.getTransactionsThroughput(request)
    return response.getThroughput()
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
      const a = new SelectorDrawsFilter()
      a.setAddresses(new Addresses().setAddressesList(addresses))
      queries.push(a)
    }

    if (slotRange) {
      const s = new SelectorDrawsFilter()
      s.setSlotRange(slotRange)
      queries.push(s)
    }

    const response = await this.client.getSelectorDraws(
      new GetSelectorDrawsRequest().setFiltersList(queries)
    )
    return response.getDrawsList()
  }

  /**
   * Retrieves detailed information about specified operations
   */
  async getOperations(operationIds: string[]): Promise<OperationWrapper[]> {
    const response = await this.client.getOperations(
      new GetOperationsRequest().setOperationIdsList(operationIds)
    )
    return response.getWrappedOperationsList()
  }

  /**
   * Retrieves the best parent blocks for the next block
   */
  async getNextBlockBestParent(): Promise<BlockParent[]> {
    const response = await this.client.getNextBlockBestParents(
      new GetNextBlockBestParentsRequest()
    )
    return response.getBlockParentsList()
  }

  /**
   * Retrieves detailed information about specified endorsements
   */
  async getEndorsements(
    endorsementIds: string[]
  ): Promise<EndorsementWrapper[]> {
    const response = await this.client.getEndorsements(
      new GetEndorsementsRequest().setEndorsementIdsList(endorsementIds)
    )
    return response.getWrappedEndorsementsList()
  }

  /**
   * Retrieves detailed information about specified blocks
   */
  async getBlocks(blockIds: string[]): Promise<BlockWrapper[]> {
    const response = await this.client.getBlocks(
      new GetBlocksRequest().setBlockIdsList(blockIds)
    )
    return response.getWrappedBlocksList()
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
      const b = new SearchBlocksFilter()
      b.setBlockIds(new BlockIds().setBlockIdsList(blockIds))
      queries.push(b)
    }

    if (addresses) {
      const a = new SearchBlocksFilter()
      a.setAddresses(new Addresses().setAddressesList(addresses))
      queries.push(a)
    }

    if (slotRange) {
      const s = new SearchBlocksFilter()
      s.setSlotRange(slotRange)
      queries.push(s)
    }
    return (
      await this.client.searchBlocks(
        new SearchBlocksRequest().setFiltersList(queries)
      )
    ).getBlockInfosList()
  }

  /**
   * Retrieves events based on specified filters
   */
  async getEvents(filter: EventFilter): Promise<OutputEvents> {
    const filters: ScExecutionEventsFilter[] = []

    if (filter.start !== undefined && filter.end !== undefined) {
      const ret = new ScExecutionEventsFilter()
      ret.setSlotRange(
        new SlotRange()
          .setStartSlot(
            new Slot()
              .setPeriod(filter.start.period)
              .setThread(filter.start.thread)
          )
          .setEndSlot(
            new Slot()
              .setPeriod(Number(filter.end.period))
              .setThread(filter.end.thread)
          )
      )
      filters.push(ret)
    } else if (filter.callerAddress !== undefined) {
      const ret = new ScExecutionEventsFilter()
      ret.setCallerAddress(filter.callerAddress)
      filters.push(ret)
    } else if (filter.smartContractAddress !== undefined) {
      const ret = new ScExecutionEventsFilter()
      ret.setEmitterAddress(filter.smartContractAddress)
      filters.push(ret)
    } else if (filter.operationId !== undefined) {
      const ret = new ScExecutionEventsFilter()
      ret.setOriginalOperationId(filter.operationId)
      filters.push(ret)
    } else if (filter.isError !== undefined) {
      const ret = new ScExecutionEventsFilter()
      ret.setIsFailure(filter.isError)
      filters.push(ret)
    } else if (filter.status !== undefined) {
      const ret = new ScExecutionEventsFilter()
      ret.setStatus(filter.status)
      filters.push(ret)
    }

    const response = await this.client.getScExecutionEvents(
      new GetScExecutionEventsRequest().setFiltersList(filters)
    )
    const outputEvents: OutputEvents = response
      .getEventsList()
      .filter((event) => event.getContext() !== null)
      .map((event) => {
        const context = {
          slot: {
            period: Number(
              event.getContext()?.getOriginSlot()?.getPeriod() ?? 0
            ),
            thread: Number(
              event.getContext()?.getOriginSlot()?.getThread() ?? 0
            ),
          },
          read_only:
            event.getContext()?.getStatus() ===
            ScExecutionEventStatus.SC_EXECUTION_EVENT_STATUS_READ_ONLY
              ? true
              : false,
          call_stack: event.getContext()?.getCallStackList() ?? [],
          index_in_slot: Number(event.getContext()?.getIndexInSlot() ?? 0),
          is_final:
            event.getContext()?.getStatus() ===
            ScExecutionEventStatus.SC_EXECUTION_EVENT_STATUS_FINAL
              ? true
              : false,
        }
        const outputEvent: SCOutputEvent = {
          data: event.getData().toString(),
          context,
        }
        return outputEvent
      })
    return outputEvents
  }

  async networkInfos(): Promise<Network> {
    const status = await this.client.getStatus(new GetStatusRequest())
    const chainId = BigInt(status.getStatus()?.getChainId() ?? 0)
    let networkName
    if (chainId === CHAIN_ID.Mainnet) {
      networkName = NetworkName.Mainnet
    } else if (chainId === CHAIN_ID.Buildnet) {
      networkName = NetworkName.Buildnet
    } else {
      throw new Error(`Unknown chain id: ${chainId}`)
    }

    return {
      name: networkName,
      chainId,
      url: this.url,
      minimalFee: BigInt(
        status.getStatus()?.getMinimalFees()?.getMantissa() ?? 0
      ),
    }
  }

  async getOperationStatus(opId: string): Promise<OperationStatus> {
    const queries: ExecutionQueryRequestItem[] = [
      new ExecutionQueryRequestItem().setOpExecutionStatusCandidate(
        new OpExecutionStatusCandidate().setOperationId(opId)
      ),
    ]

    const response = await this.client.queryState(
      new QueryStateRequest().setQueriesList(queries)
    )
    const list = response.getResponsesList()

    if (list.length === 0) {
      throw new Error('Operation not found')
    }

    const operation = list[0]
    if (operation.hasError()) {
      throw new Error('error in queryState')
    }

    if (operation.hasResult()) {
      switch (operation.getResult()?.getExecutionStatus()) {
        case ExecutionQueryExecutionStatus.EXECUTION_QUERY_EXECUTION_STATUS_ALREADY_EXECUTED_WITH_FAILURE:
          return OperationStatus.Error
        case ExecutionQueryExecutionStatus.EXECUTION_QUERY_EXECUTION_STATUS_ALREADY_EXECUTED_WITH_SUCCESS:
          return OperationStatus.Success
        case ExecutionQueryExecutionStatus.EXECUTION_QUERY_EXECUTION_STATUS_EXECUTABLE_OR_EXPIRED:
          return OperationStatus.NotFound
        case ExecutionQueryExecutionStatus.EXECUTION_QUERY_EXECUTION_STATUS_UNSPECIFIED:
          return OperationStatus.NotFound
      }
    }

    return OperationStatus.NotFound
  }

  /**
   * Retrieves a list of stakers with optional filtering by rolls
   */
  async getStakers(
    minRolls?: number,
    maxRolls?: number,
    limit?: number
  ): Promise<StakerEntry[]> {
    const queries: StakersFilter[] = []

    if (minRolls) {
      const ret = new StakersFilter()
      ret.setMinRolls(minRolls)
      queries.push(ret)
    }

    if (maxRolls) {
      const ret = new StakersFilter()
      ret.setMaxRolls(maxRolls)
      queries.push(ret)
    }

    if (limit) {
      const ret = new StakersFilter()
      ret.setLimit(limit)
      queries.push(ret)
    }

    const response = await this.client.getStakers(
      new GetStakersRequest().setFiltersList(queries)
    )
    return response.getStakersList()
  }

  async getNodeStatus(): Promise<PublicStatus> {
    const response = await this.client.getStatus(new GetStatusRequest())
    const status = response.getStatus()
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

    const request = new ExecuteReadOnlyCallRequest()
    const call = new ReadOnlyExecutionCall()
    call.setMaxGas(Number(maxGas))
    call.setCallerAddress(caller)
    call.setCallStackList([])
    call.setFunctionCall(
      new FunctionCall()
        .setTargetAddress(params.target)
        .setTargetFunction(params.func)
        .setParameter(args instanceof Uint8Array ? args : args.serialize())
    )

    // fee
    if (params.fee) {
      call.setFee(
        new NativeAmount()
          .setMantissa(Number(params.fee))
          .setScale(Mas.NB_DECIMALS)
      )
    }
    request.setCall(call)
    const response = await this.client.executeReadOnlyCall(request)

    const output = response.getOutput()
    if (!output) {
      throw new Error('No output received')
    }

    return output
  }
}
