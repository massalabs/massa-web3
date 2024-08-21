/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-non-null-assertion */

import { Mas, strToBytes } from '../basicElements'
import {
  SendOperationInput,
  EventFilter as EvtFilter,
  ReadOnlyCallResult,
  TransportOptions,
  Transport,
  ClientOptions,
  DatastoreEntry,
} from '.'
import {
  OperationInput,
  Pagination,
  DatastoreEntryOutput,
  ExecuteReadOnlyResponse,
  MassaOpenRPCSpecification,
  ReadOnlyCall,
  ReadOnlyBytecodeExecution,
  AddressInfo,
  Block,
  BlockId,
  BlockInfo,
  Clique,
  Transfer,
  Slot,
  EndorsementInfo,
  GraphInterval,
  NodeStatus,
  OperationInfo,
  SCOutputEvent,
  Staker,
  OperationId,
  AddressFilter,
} from '../generated/client'
import { MAX_GAS_CALL } from '../smartContracts'
import { OperationStatus, ReadOnlyParams } from '../operation'
import { DEFAULT_RETRY_OPTS, withRetry } from './retry'
import isEqual from 'lodash.isequal'

export class PublicAPI {
  connector: MassaOpenRPCSpecification
  lastStatus: NodeStatus

  // eslint-disable-next-line max-params
  constructor(
    transport: Transport,
    host: string,
    port: number,
    opts: TransportOptions = {},
    public options: Partial<ClientOptions> = {}
  ) {
    this.connector = new MassaOpenRPCSpecification({
      transport: {
        type: transport,
        host,
        port,
        path: opts.path,
        protocol: opts.protocol,
      },
    })
    if (!this.options.retry) {
      this.options.retry = DEFAULT_RETRY_OPTS
    }
  }

  async executeReadOnlyBytecode(
    readOnlyBytecodeExecution: ReadOnlyBytecodeExecution
  ): Promise<ExecuteReadOnlyResponse> {
    return withRetry(
      () =>
        this.connector.execute_read_only_bytecode([readOnlyBytecodeExecution]),
      this.options.retry!
    ).then((r) => r[0])
  }

  async executeMultipleReadOnlyBytecode(
    readOnlyBytecodeExecutions: ReadOnlyBytecodeExecution[]
  ): Promise<ExecuteReadOnlyResponse[]> {
    return withRetry(
      () =>
        this.connector.execute_read_only_bytecode(readOnlyBytecodeExecutions),
      this.options.retry!
    )
  }

  async executeReadOnlyCall(
    params: ReadOnlyParams
  ): Promise<ReadOnlyCallResult> {
    const [res] = await withRetry(
      () =>
        this.connector.execute_read_only_call([
          {
            max_gas: Number(params.maxGas ?? MAX_GAS_CALL),
            target_address: params.target,
            target_function: params.func,
            parameter: Array.from(params.parameter),
            caller_address: params.caller,
            coins: params.coins ? Mas.toString(params.coins) : null,
            fee: params.fee ? Mas.toString(params.fee) : null,
          },
        ]),
      this.options.retry!
    )

    if (!res) {
      throw new Error('No result returned from execute_read_only_call')
    }

    return {
      // @ts-expect-error - wrong type returned by the API interface
      value: new Uint8Array(res.result.Ok),
      info: {
        gasCost: res.gas_cost,
        error: res.result.Error,
        events: res.output_events,
        stateChanges: {
          ledgerChanges: res.state_changes.ledger_changes,
          asyncPoolChanges: res.state_changes.async_pool_changes,
          posChanges: res.state_changes.pos_changes,
          executedOpsChanges: res.state_changes.executed_ops_changes,
          executedDenunciationsChanges:
            res.state_changes.executed_denunciations_changes,
          executionTrailHashChange:
            res.state_changes.execution_trail_hash_change,
        },
      },
    }
  }

  async executeMultipleReadOnlyCall(
    readOnlyCalls: ReadOnlyCall[]
  ): Promise<ExecuteReadOnlyResponse[]> {
    return withRetry(
      () => this.connector.execute_read_only_call(readOnlyCalls),
      this.options.retry!
    )
  }

  async getAddressInfo(address: string): Promise<AddressInfo> {
    return this.getMultipleAddressInfo([address]).then((r) => r[0])
  }

  async getBalance(address: string, final = true): Promise<Mas.Mas> {
    return this.getAddressInfo(address).then((r) => {
      return Mas.fromString(final ? r.final_balance : r.candidate_balance)
    })
  }

  async getMultipleAddressInfo(addresses: string[]): Promise<AddressInfo[]> {
    return withRetry(
      () => this.connector.get_addresses(addresses),
      this.options.retry!
    )
  }

  async getAddressesBytecode(addressFilter: AddressFilter): Promise<string> {
    return withRetry(
      () => this.connector.get_addresses_bytecode([addressFilter]),
      this.options.retry!
    ).then((r) => r[0])
  }

  async executeMultipleGetAddressesBytecode(
    addressFilters: AddressFilter[]
  ): Promise<string[]> {
    return withRetry(
      () => this.connector.get_addresses_bytecode(addressFilters),
      this.options.retry!
    )
  }

  async getBlock(blockId: BlockId): Promise<BlockInfo> {
    return withRetry(
      () => this.connector.get_blocks([blockId]),
      this.options.retry!
    ).then((r) => r[0])
  }

  // todo should return an array of blockInfo, right?
  async getMultipleBlocks(blockIds: BlockId[]): Promise<BlockInfo[]> {
    return withRetry(
      () => this.connector.get_blocks(blockIds),
      this.options.retry!
    )
  }

  async getBlockcliqueBlock(slot: Slot): Promise<Block> {
    return withRetry(
      () => this.connector.get_blockclique_block_by_slot(slot),
      this.options.retry!
    )
  }

  async getCliques(): Promise<Clique[]> {
    return withRetry(() => this.connector.get_cliques(), this.options.retry!)
  }

  async getDataStoreKeys(
    contract: string,
    filter: Uint8Array = new Uint8Array(),
    final = true
  ): Promise<Uint8Array[]> {
    const addrInfo = await this.getAddressInfo(contract)
    const keys = final
      ? addrInfo.final_datastore_keys
      : addrInfo.candidate_datastore_keys
    return keys
      .filter(
        (key) =>
          !filter.length ||
          isEqual(Uint8Array.from(key.slice(0, filter.length)), filter)
      )
      .map((key) => Uint8Array.from(key))
  }

  async getDatastoreEntries(
    inputs: DatastoreEntry[],
    final = true
  ): Promise<Uint8Array[]> {
    const entriesQuery = inputs.map((entry) => ({
      key: Array.from(entry.key),
      address: entry.address,
    }))
    const res = await withRetry(
      () => this.connector.get_datastore_entries(entriesQuery),
      this.options.retry!
    )

    return res.map((r: DatastoreEntryOutput) =>
      Uint8Array.from(final ? r.final_value : r.candidate_value)
    )
  }

  async getDatastoreEntry(
    key: string | Uint8Array,
    address: string,
    final = true
  ): Promise<Uint8Array> {
    const byteKey: Uint8Array = typeof key === 'string' ? strToBytes(key) : key
    return this.getDatastoreEntries([{ key: byteKey, address }], final).then(
      (r) => r[0]
    )
  }

  async getSlotTransfers(slot: Slot): Promise<Transfer[]> {
    return withRetry(
      () => this.connector.get_slots_transfers([slot]),
      this.options.retry!
    ).then((r) => r[0])
  }

  async getMultipleSlotTransfers(slots: Slot[]): Promise<Transfer[][]> {
    return withRetry(
      () => this.connector.get_slots_transfers(slots),
      this.options.retry!
    )
  }

  async getEndorsement(endorsementId: string): Promise<EndorsementInfo> {
    return this.getMultipleEndorsements([endorsementId]).then((r) => r[0])
  }

  async getMultipleEndorsements(
    endorsementIds: string[]
  ): Promise<EndorsementInfo[]> {
    return withRetry(
      () => this.connector.get_endorsements(endorsementIds),
      this.options.retry!
    )
  }

  async getEvents(filter: EvtFilter): Promise<SCOutputEvent[]> {
    const formattedFilter = {
      start: filter.start,
      end: filter.end,
      emitter_address: filter.smartContractAddress,
      original_caller_address: filter.callerAddress,
      original_operation_id: filter.operationId,
      is_final: filter.isFinal,
      is_error: filter.isError,
    }

    return withRetry(
      () => this.connector.get_filtered_sc_output_event(formattedFilter),
      this.options.retry!
    )
  }

  async getGraphInterval(
    start?: number,
    end?: number
  ): Promise<GraphInterval[]> {
    return withRetry(
      () => this.connector.get_graph_interval({ start, end }),
      this.options.retry!
    )
  }

  async getOperations(operationIds: string[]): Promise<OperationInfo[]> {
    return withRetry(
      () => this.connector.get_operations(operationIds),
      this.options.retry!
    )
  }

  async getOperation(operationId: string): Promise<OperationInfo> {
    return this.getOperations([operationId]).then((r) => r[0])
  }

  async getOperationStatus(operationId: string): Promise<OperationStatus> {
    const op = await this.getOperation(operationId)

    if (op.op_exec_status === null) {
      if (op.is_operation_final === null) {
        return OperationStatus.NotFound
      }

      throw new Error('unexpected status')
    }

    if (op.in_pool) {
      return OperationStatus.PendingInclusion
    }

    if (!op.is_operation_final) {
      return op.op_exec_status
        ? OperationStatus.SpeculativeSuccess
        : OperationStatus.SpeculativeError
    }

    return op.op_exec_status ? OperationStatus.Success : OperationStatus.Error
  }

  // todo rename PageRequest pagination
  async getStakers(pagination: Pagination): Promise<Staker[]> {
    return withRetry(
      () => this.connector.get_stakers(pagination),
      this.options.retry!
    )
  }

  async status(): Promise<NodeStatus> {
    this.lastStatus = await withRetry(
      () => this.connector.get_status(),
      this.options.retry!
    )
    return this.lastStatus
  }

  async getMinimalFee(): Promise<bigint> {
    if (!this.lastStatus) {
      await this.status()
    }
    if (!this.lastStatus.minimal_fees) {
      throw new Error('minimal fees: not available')
    }
    return Mas.fromString(this.lastStatus.minimal_fees)
  }

  async getChainId(): Promise<bigint> {
    if (!this.lastStatus) {
      await this.status()
    }
    return BigInt(this.lastStatus.chain_id)
  }

  async fetchPeriod(): Promise<number> {
    const status = await this.status()
    if (!status.last_slot) {
      throw new Error('last slot: not available')
    }
    return status.last_slot.period
  }

  async getCurrentSlot(): Promise<Slot> {
    const { last_slot } = await this.status()
    return last_slot
  }

  private static convertOperationInput(
    data: SendOperationInput
  ): OperationInput {
    return {
      serialized_content: Array.from(data.data),
      creator_public_key: data.publicKey,
      signature: data.signature,
    }
  }

  async sendOperation(data: SendOperationInput): Promise<OperationId> {
    return this.sendOperations([data]).then((r) => r[0])
  }

  async sendOperations(data: SendOperationInput[]): Promise<OperationId[]> {
    return this.sendMultipleOperations(
      data.map((e) => PublicAPI.convertOperationInput(e))
    )
  }

  async sendMultipleOperations(data: OperationInput[]): Promise<OperationId[]> {
    return withRetry(
      () => this.connector.send_operations(data),
      this.options.retry!
    )
  }
}
