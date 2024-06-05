import {
  OperationInput,
  Pagination,
  EventFilter,
  DatastoreEntryOutput,
  DatastoreEntryInput,
  ExecuteReadOnlyResponse,
  MassaOpenRPCSpecification,
  Options,
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

export enum Transport {
  webSocket = 'websocket',
  http = 'http',
  https = 'https',
  postMessageWindow = 'postmessagewindow',
  postMessageIframe = 'postmessageiframe',
}

export class PublicAPI {
  connector: MassaOpenRPCSpecification

  constructor(
    transport: Transport,
    host: string,
    port: number,
    path?: string,
    protocol?: string
  ) {
    this.connector = new MassaOpenRPCSpecification({
      transport: {
        type: transport,
        host: host,
        port: port,
        path: path,
        protocol: protocol,
      },
    } as Options)
  }

  async executeReadOnlyBytecode(
    ReadOnlyBytecodeExecution: ReadOnlyBytecodeExecution
  ): Promise<ExecuteReadOnlyResponse> {
    return this.connector
      .execute_read_only_bytecode([ReadOnlyBytecodeExecution])
      .then((r) => r[0])
  }

  async executeMultipleReadOnlyBytecode(
    ReadOnlyBytecodeExecutions: ReadOnlyBytecodeExecution[]
  ): Promise<ExecuteReadOnlyResponse[]> {
    return this.connector.execute_read_only_bytecode(ReadOnlyBytecodeExecutions)
  }

  async executeReadOnlyCall(
    ReadOnlyCall: ReadOnlyCall
  ): Promise<ExecuteReadOnlyResponse> {
    return this.connector
      .execute_read_only_call([ReadOnlyCall])
      .then((r) => r[0])
  }

  async executeMultipleReadOnlyCall(
    ReadOnlyCalls: ReadOnlyCall[]
  ): Promise<ExecuteReadOnlyResponse[]> {
    return this.connector.execute_read_only_call(ReadOnlyCalls)
  }

  async getAddressInfo(address: string): Promise<AddressInfo> {
    return this.getMultipleAddressInfo([address]).then((r) => r[0])
  }

  async getMultipleAddressInfo(addresses: string[]): Promise<AddressInfo[]> {
    return this.connector.get_addresses(addresses)
  }

  async getAddressesBytecode(address_filter: AddressFilter): Promise<number[]> {
    return this.connector
      .get_addresses_bytecode([address_filter])
      .then((r) => r[0])
  }

  async executeMultipleGetAddressesBytecode(
    address_filters: AddressFilter[]
  ): Promise<number[][]> {
    return this.connector.get_addresses_bytecode(address_filters)
  }

  async getBlock(blockId: BlockId): Promise<BlockInfo> {
    return this.connector.get_blocks([blockId]).then((r) => r[0])
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
    DatastoreEntryInput: DatastoreEntryInput[]
  ): Promise<DatastoreEntryOutput[]> {
    return this.connector.get_datastore_entries(DatastoreEntryInput)
  }

  async getDatastoreEntry(
    key: string,
    address: string
  ): Promise<DatastoreEntryOutput> {
    let result = Array.from(key, (char) => char.charCodeAt(0))
    return this.connector
      .get_datastore_entries([{ key: result, address: address }])
      .then((r) => r[0])
  }

  async getSlotTransfers(slot: Slot): Promise<Transfer[]> {
    return this.connector.get_slots_transfers([slot]).then((r) => r[0])
  }

  async getMultipleSlotTransfers(slots: Slot[]): Promise<Transfer[][]> {
    return this.connector.get_slots_transfers(slots)
  }

  async getEndorsement(endorsementId: string): Promise<EndorsementInfo> {
    return this.getMultipleEndorsements([endorsementId]).then((r) => r[0])
  }

  async getMultipleEndorsements(
    endorsementIds: string[]
  ): Promise<EndorsementInfo[]> {
    return this.connector.get_endorsements(endorsementIds)
  }

  async getFilteredScOutputEvent(
    filter: EventFilter
  ): Promise<SCOutputEvent[]> {
    return this.connector.get_filtered_sc_output_event(filter)
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
    return this.getOperations([operationId]).then((r) => r[0])
  }

  // todo rename PageRequest pagination
  async getStakers(pagination: Pagination): Promise<Staker[]> {
    return this.connector.get_stakers(pagination)
  }

  async getStatus(): Promise<NodeStatus> {
    return this.connector.get_status()
  }

  async sendOperation(data: OperationInput): Promise<OperationId> {
    return this.sendOperations([data]).then((r) => r[0])
  }

  async sendOperations(data: OperationInput[]): Promise<OperationId[]> {
    return this.connector.send_operations(data)
  }

  async sendMultipleOperations(data: OperationInput[]): Promise<OperationId[]> {
    return this.connector.send_operations(data)
  }
}
