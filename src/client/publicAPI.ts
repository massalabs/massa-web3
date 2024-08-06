/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-non-null-assertion */

import { Mas } from '../basicElements'
import {
  SendOperationInput,
  EventFilter as EvtFilter,
  ReadOnlyCallResult,
  TransportOptions,
  Transport,
  ClientOptions,
} from '.'
import {
  OperationInput,
  Pagination,
  EventFilter,
  DatastoreEntryOutput,
  DatastoreEntryInput,
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
import { FIRST } from '../utils'
import { MAX_GAS_CALL } from '../smartContracts'
import { OperationStatus, ReadOnlyParams } from '../operation'
import { DEFAULT_RETRY_OPTS, withRetry } from './retry'

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
    ).then((r) => r[FIRST])
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
    return this.getMultipleAddressInfo([address]).then((r) => r[FIRST])
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
    ).then((r) => r[FIRST])
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
    ).then((r) => r[FIRST])
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

  // todo should be DatastoreEntries as multiple entries can be fetched at once
  // to check: why it's not an array?
  async getDatastoreEntries(
    inputs: DatastoreEntryInput[]
  ): Promise<DatastoreEntryOutput[]> {
    return withRetry(
      () => this.connector.get_datastore_entries(inputs),
      this.options.retry!
    )
  }

  // why it's not a 2d array?
  async getMultipleDatastoresEntries(
    datastoreEntryInput: DatastoreEntryInput[]
  ): Promise<DatastoreEntryOutput[]> {
    return withRetry(
      () => this.connector.get_datastore_entries(datastoreEntryInput),
      this.options.retry!
    )
  }

  async getDatastoreEntry(
    key: string,
    address: string
  ): Promise<DatastoreEntryOutput> {
    const result = Array.from(key, (char) => char.charCodeAt(FIRST))
    return withRetry(
      () => this.connector.get_datastore_entries([{ key: result, address }]),
      this.options.retry!
    ).then((r) => r[FIRST])
  }

  async getSlotTransfers(slot: Slot): Promise<Transfer[]> {
    return withRetry(
      () => this.connector.get_slots_transfers([slot]),
      this.options.retry!
    ).then((r) => r[FIRST])
  }

  async getMultipleSlotTransfers(slots: Slot[]): Promise<Transfer[][]> {
    return withRetry(
      () => this.connector.get_slots_transfers(slots),
      this.options.retry!
    )
  }

  async getEndorsement(endorsementId: string): Promise<EndorsementInfo> {
    return this.getMultipleEndorsements([endorsementId]).then((r) => r[FIRST])
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
    filter = {
      start: filter.start,
      end: filter.end,
      emitter_address: filter.smartContractAddress,
      original_caller_address: filter.callerAddress,
      original_operation_id: filter.operationId,
      is_final: filter.isFinal,
      is_error: filter.isError,
    } as EventFilter

    return withRetry(
      () => this.connector.get_filtered_sc_output_event(filter),
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
    return this.getOperations([operationId]).then((r) => r[FIRST])
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
    return this.sendOperations([data]).then((r) => r[FIRST])
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
