/* eslint-disable @typescript-eslint/naming-convention */

import { Mas, strToBytes } from '../basicElements'
import {
  SendOperationInput,
  EventFilter as EvtFilter,
  ReadOnlyCallResult,
  ClientOptions,
  DatastoreEntry,
} from '.'
import * as t from '../generated/client-types'
import { MAX_GAS_CALL } from '../smartContracts'
import { OperationStatus, ReadOnlyParams } from '../operation'
import isEqual from 'lodash.isequal'
import { Connector } from './connector'

export class PublicAPI {
  connector: Connector
  lastStatus: t.NodeStatus

  // eslint-disable-next-line max-params
  constructor(
    public url: string,
    public options: Partial<ClientOptions> = {}
  ) {
    this.connector = new Connector(url, this.options)
  }

  async executeReadOnlyBytecode(
    readOnlyBytecodeExecution: t.ReadOnlyBytecodeExecution
  ): Promise<t.ExecuteReadOnlyResponse> {
    return this.connector
      .execute_read_only_bytecode([readOnlyBytecodeExecution])
      .then((r) => r[0])
  }

  async executeMultipleReadOnlyBytecode(
    readOnlyBytecodeExecutions: t.ReadOnlyBytecodeExecution[]
  ): Promise<t.ExecuteReadOnlyResponse[]> {
    return this.connector.execute_read_only_bytecode(readOnlyBytecodeExecutions)
  }

  async executeReadOnlyCall(
    params: ReadOnlyParams
  ): Promise<ReadOnlyCallResult> {
    const [res] = await this.connector.execute_read_only_call([
      {
        max_gas: Number(params.maxGas ?? MAX_GAS_CALL),
        target_address: params.target,
        target_function: params.func,
        parameter: Array.from(params.parameter),
        caller_address: params.caller,
        coins: params.coins ? Mas.toString(params.coins) : null,
        fee: params.fee ? Mas.toString(params.fee) : null,
      },
    ])

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
    readOnlyCalls: t.ReadOnlyCall[]
  ): Promise<t.ExecuteReadOnlyResponse[]> {
    return this.connector.execute_read_only_call(readOnlyCalls)
  }

  async getAddressInfo(address: string): Promise<t.AddressInfo> {
    return this.getMultipleAddressInfo([address]).then((r) => r[0])
  }

  async getBalance(address: string, final = true): Promise<Mas.Mas> {
    return this.getAddressInfo(address).then((r) => {
      return Mas.fromString(final ? r.final_balance : r.candidate_balance)
    })
  }

  async getMultipleAddressInfo(addresses: string[]): Promise<t.AddressInfo[]> {
    return this.connector.get_addresses(addresses)
  }

  async getAddressesBytecode(addressFilter: t.AddressFilter): Promise<string> {
    return this.connector
      .get_addresses_bytecode([addressFilter])
      .then((r) => r[0])
  }

  async executeMultipleGetAddressesBytecode(
    addressFilters: t.AddressFilter[]
  ): Promise<string[]> {
    return this.connector.get_addresses_bytecode(addressFilters)
  }

  async getBlock(blockId: t.BlockId): Promise<t.BlockInfo> {
    return this.connector.get_blocks([blockId]).then((r) => r[0])
  }

  // todo should return an array of blockInfo, right?
  async getMultipleBlocks(blockIds: t.BlockId[]): Promise<t.BlockInfo[]> {
    return this.connector.get_blocks(blockIds)
  }

  async getBlockcliqueBlock(slot: t.Slot): Promise<t.Block> {
    return this.connector.get_blockclique_block_by_slot(slot)
  }

  async getCliques(): Promise<t.Clique[]> {
    return this.connector.get_cliques()
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
    const entriesQuery = inputs.map((entry) => {
      const byteKey: Uint8Array =
        typeof entry.key === 'string' ? strToBytes(entry.key) : entry.key
      return {
        key: Array.from(byteKey),
        address: entry.address,
      }
    })
    const res = await this.connector.get_datastore_entries(entriesQuery)

    return res.map((r: t.DatastoreEntryOutput) =>
      Uint8Array.from(final ? r.final_value : r.candidate_value)
    )
  }

  async getDatastoreEntry(
    key: string | Uint8Array,
    address: string,
    final = true
  ): Promise<Uint8Array> {
    return this.getDatastoreEntries([{ key, address }], final).then((r) => r[0])
  }

  async getSlotTransfers(slot: t.Slot): Promise<t.Transfer[]> {
    return this.connector.get_slots_transfers([slot]).then((r) => r[0])
  }

  async getMultipleSlotTransfers(slots: t.Slot[]): Promise<t.Transfer[][]> {
    return this.connector.get_slots_transfers(slots)
  }

  async getEndorsement(endorsementId: string): Promise<t.EndorsementInfo> {
    return this.getMultipleEndorsements([endorsementId]).then((r) => r[0])
  }

  async getMultipleEndorsements(
    endorsementIds: string[]
  ): Promise<t.EndorsementInfo[]> {
    return this.connector.get_endorsements(endorsementIds)
  }

  async getEvents(filter: EvtFilter): Promise<t.SCOutputEvent[]> {
    const formattedFilter = {
      start: filter.start,
      end: filter.end,
      emitter_address: filter.smartContractAddress,
      original_caller_address: filter.callerAddress,
      original_operation_id: filter.operationId,
      is_final: filter.isFinal,
      is_error: filter.isError,
    }

    return this.connector.get_filtered_sc_output_event(formattedFilter)
  }

  async getGraphInterval(
    start?: number,
    end?: number
  ): Promise<t.GraphInterval[]> {
    return this.connector.get_graph_interval({ start, end })
  }

  async getOperations(operationIds: string[]): Promise<t.OperationInfo[]> {
    return this.connector.get_operations(operationIds)
  }

  async getOperation(operationId: string): Promise<t.OperationInfo> {
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
  async getStakers(pagination: t.Pagination): Promise<t.Staker[]> {
    return this.connector.get_stakers(pagination)
  }

  async status(): Promise<t.NodeStatus> {
    this.lastStatus = await this.connector.get_status()
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

  async getCurrentSlot(): Promise<t.Slot> {
    const { last_slot } = await this.status()
    return last_slot
  }

  private static convertOperationInput(
    data: SendOperationInput
  ): t.OperationInput {
    return {
      serialized_content: Array.from(data.data),
      creator_public_key: data.publicKey,
      signature: data.signature,
    }
  }

  async sendOperation(data: SendOperationInput): Promise<t.OperationId> {
    return this.sendOperations([data]).then((r) => r[0])
  }

  async sendOperations(data: SendOperationInput[]): Promise<t.OperationId[]> {
    return this.sendMultipleOperations(
      data.map((e) => PublicAPI.convertOperationInput(e))
    )
  }

  async sendMultipleOperations(
    data: t.OperationInput[]
  ): Promise<t.OperationId[]> {
    return this.connector.send_operations(data)
  }
}
