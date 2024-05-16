import { Mas, OperationStatus } from '../basicElements'
import {
  SendOperationInput,
  EventFilter as EvtFilter,
  ReadOnlyCallParams,
  ReadOnlyCallResult,
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

export enum Transport {
  WebSocket = 'websocket',
  HTTP = 'http',
  HTTPS = 'https',
  PostMessageWindow = 'postmessagewindow',
  PostMessageIframe = 'postmessageiframe',
}

type JSONAPIOptions = {
  path?: string
  protocol?: string
}

export class PublicAPI {
  connector: MassaOpenRPCSpecification
  status: NodeStatus

  // eslint-disable-next-line max-params
  constructor(
    transport: Transport,
    host: string,
    port: number,
    opts: JSONAPIOptions = {}
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
  }

  /* eslint-disable @typescript-eslint/naming-convention */
  async executeReadOnlyBytecode(
    readOnlyBytecodeExecution: ReadOnlyBytecodeExecution
  ): Promise<ExecuteReadOnlyResponse> {
    return this.connector
      .execute_read_only_bytecode([readOnlyBytecodeExecution])
      .then((r) => r[FIRST])
  }

  async executeMultipleReadOnlyBytecode(
    readOnlyBytecodeExecutions: ReadOnlyBytecodeExecution[]
  ): Promise<ExecuteReadOnlyResponse[]> {
    return this.connector.execute_read_only_bytecode(readOnlyBytecodeExecutions)
  }

  async executeReadOnlyCall(
    params: ReadOnlyCallParams
  ): Promise<ReadOnlyCallResult> {
    const [res] = await this.connector.execute_read_only_call([
      {
        max_gas: Number(params.maxGas),
        target_address: params.target.toString(),
        target_function: params.func,
        parameter: params.parameter ? Array.from(params.parameter) : [],
        caller_address: params.caller.toString(),
        coins: params.coins ? Mas.toString(params.coins) : null,
        fee: params.fee ? Mas.toString(params.fee) : null,
      },
    ])

    if (!res) {
      throw new Error('No result returned from execute_read_only_call')
    }

    return {
      value: (res.result.Ok as unknown as Uint8Array) ?? null,
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
    return this.connector.execute_read_only_call(readOnlyCalls)
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
    return this.connector.get_addresses(addresses)
  }

  async getAddressesBytecode(addressFilter: AddressFilter): Promise<string> {
    return this.connector
      .get_addresses_bytecode([addressFilter])
      .then((r) => r[FIRST])
  }

  async executeMultipleGetAddressesBytecode(
    addressFilters: AddressFilter[]
  ): Promise<string[]> {
    return this.connector.get_addresses_bytecode(addressFilters)
  }

  async getBlock(blockId: BlockId): Promise<BlockInfo> {
    return this.connector.get_blocks([blockId]).then((r) => r[FIRST])
  }

  // todo should return an array of blockInfo, right?
  async getMultipleBlocks(blockIds: BlockId[]): Promise<BlockInfo[]> {
    return this.connector.get_blocks(blockIds)
  }

  async getBlockcliqueBlock(slot: Slot): Promise<Block> {
    return this.connector.get_blockclique_block_by_slot(slot)
  }

  async getCliques(): Promise<Clique[]> {
    return this.connector.get_cliques()
  }

  // todo should be DatastoreEntries as multiple entries can be fetched at once
  // to check: why it's not an array?
  async getDatastoreEntries(
    inputs: DatastoreEntryInput[]
  ): Promise<DatastoreEntryOutput[]> {
    return this.connector.get_datastore_entries(inputs)
  }

  // why it's not a 2d array?
  async getMultipleDatastoresEntries(
    datastoreEntryInput: DatastoreEntryInput[]
  ): Promise<DatastoreEntryOutput[]> {
    return this.connector.get_datastore_entries(datastoreEntryInput)
  }

  async getDatastoreEntry(
    key: string,
    address: string
  ): Promise<DatastoreEntryOutput> {
    const result = Array.from(key, (char) => char.charCodeAt(FIRST))
    return this.connector
      .get_datastore_entries([{ key: result, address: address }])
      .then((r) => r[FIRST])
  }

  async getSlotTransfers(slot: Slot): Promise<Transfer[]> {
    return this.connector.get_slots_transfers([slot]).then((r) => r[FIRST])
  }

  async getMultipleSlotTransfers(slots: Slot[]): Promise<Transfer[][]> {
    return this.connector.get_slots_transfers(slots)
  }

  async getEndorsement(endorsementId: string): Promise<EndorsementInfo> {
    return this.getMultipleEndorsements([endorsementId]).then((r) => r[FIRST])
  }

  async getMultipleEndorsements(
    endorsementIds: string[]
  ): Promise<EndorsementInfo[]> {
    return this.connector.get_endorsements(endorsementIds)
  }

  async getEvents(filter: EvtFilter): Promise<SCOutputEvent[]> {
    filter = {
      start: filter.start,
      end: filter.end,

      /* eslint-disable @typescript-eslint/naming-convention */
      // It is mandatory to follow the Massa api format.
      emitter_address: filter.smartContractAddress,
      original_caller_address: filter.callerAddress,
      original_operation_id: filter.operationId,
      is_final: filter.isFinal,
      is_error: filter.isError,
      /* eslint-enable @typescript-eslint/naming-convention */
    } as EventFilter

    const events = await this.connector.get_filtered_sc_output_event(filter)

    return events
  }

  async getGraphInterval(
    start?: number,
    end?: number
  ): Promise<GraphInterval[]> {
    return this.connector.get_graph_interval({ start, end })
  }

  async getOperations(operationIds: string[]): Promise<OperationInfo[]> {
    return this.connector.get_operations(operationIds)
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
    return this.connector.get_stakers(pagination)
  }

  async getStatus(): Promise<NodeStatus> {
    this.status = await this.connector.get_status()
    return this.status
  }

  async getMinimalFee(): Promise<bigint> {
    if (!this.status) {
      await this.getStatus()
    }
    if (!this.status.minimal_fees) {
      throw new Error('minimal fees: not available')
    }
    return Mas.fromString(this.status.minimal_fees)
  }

  async getChainId(): Promise<bigint> {
    if (!this.status) {
      await this.getStatus()
    }
    return BigInt(this.status.chain_id)
  }

  async fetchPeriod(): Promise<number> {
    const status = await this.getStatus()
    if (!status.last_slot) {
      throw new Error('last slot: not available')
    }
    return status.last_slot.period
  }

  private static convertOperationInput(
    data: SendOperationInput
  ): OperationInput {
    return {
      /* eslint-disable @typescript-eslint/naming-convention */
      serialized_content: Array.from(data.data),
      creator_public_key: data.publicKey,
      /* eslint-enable @typescript-eslint/naming-convention */
      signature: data.signature,
    }
  }

  async sendOperation(data: SendOperationInput): Promise<OperationId> {
    return this.sendOperations([data]).then((r) => r[FIRST])
  }

  async sendOperations(data: SendOperationInput[]): Promise<OperationId[]> {
    return this.connector.send_operations(
      data.map((e) => PublicAPI.convertOperationInput(e))
    )
  }

  async sendMultipleOperations(data: OperationInput[]): Promise<OperationId[]> {
    return this.connector.send_operations(data)
  }
  /* eslint-enable @typescript-eslint/naming-convention */
}
