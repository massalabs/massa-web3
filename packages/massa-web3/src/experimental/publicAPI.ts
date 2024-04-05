import {
  OperationInput,
  Pagination,
  EventFilter,
  DatastoreEntry,
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
} from './generated/client'

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
    return this.connector.get_addresses([address]).then((r) => r[0])
  }

  async getMultipleAddressInfo(addresses: string[]): Promise<AddressInfo[]> {
    return this.connector.get_addresses(addresses)
  }

  async getAddressesBytecode(address_filter: AddressFilter): Promise<string> {
    return this.connector
      .get_addresses_bytecode([address_filter])
      .then((r) => r[0])
  }

  async executeMultipleGetAddressesBytecode(
    address_filters: AddressFilter[]
  ): Promise<string[]> {
    return this.connector.get_addresses_bytecode(address_filters)
  }

  async getBlock(blockId: BlockId): Promise<BlockInfo> {
    return this.connector.get_blocks([blockId]).then((r) => r[0])
  }

  // todo should return an array of blockInfo, right?
  async getMultipleBlocks(blockIds: BlockId[]): Promise<BlockInfo> {
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
    DatastoreEntryInput: DatastoreEntryInput
  ): Promise<DatastoreEntryOutput> {
    return this.connector
      .get_datastore_entries([DatastoreEntryInput])
      .then((r) => r[0])
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
  ): Promise<DatastoreEntry> {
    return this.connector.get_datastore_entry(key, address)
  }

  async getSlotTransfers(slot: Slot): Promise<Transfer[]> {
    return this.connector.get_slots_transfers([slot]).then((r) => r[0])
  }

  async getMultipleSlotTransfers(slots: Slot[]): Promise<Transfer[][]> {
    return this.connector.get_slots_transfers(slots)
  }

  async getEndorsement(endorsementId: string): Promise<EndorsementInfo> {
    return this.connector.get_endorsements([endorsementId]).then((r) => r[0])
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

  async getGraphInterval(end?: number, start?: number): Promise<GraphInterval> {
    return this.connector.get_graph_interval(end, start)
  }

  async getOperations(operationId: string): Promise<OperationInfo> {
    return this.connector.get_operations([operationId]).then((r) => r[0])
  }

  async getMultipleOperations(
    operationIds: string[]
  ): Promise<OperationInfo[]> {
    return this.connector.get_operations(operationIds)
  }

  // todo rename PageRequest pagination
  async getStakers(pagination: Pagination): Promise<Staker[]> {
    return this.connector.get_stakers(pagination)
  }

  async getStatus(): Promise<NodeStatus> {
    return this.connector.get_status()
  }

  async sendOperation(data: OperationInput): Promise<OperationId> {
    return this.connector.send_operations([data]).then((r) => r[0])
  }

  async sendMultipleOperations(data: OperationInput[]): Promise<OperationId[]> {
    return this.connector.send_operations(data)
  }
  /// private

  /*

    async addStakingSecretKey(SecretKeys: string): Promise<void> {
        return this.connector.add_staking_secret_keys([SecretKeys]);
    }
    async executeMultipleAddStakingSecretKeys(SecretKeyss: string[]): Promise<void> {
        return this.connector.add_staking_secret_keys(SecretKeyss);
    }
    async getStakingAddresses(): Promise<Address(es)> {
        return this.connector.get_staking_addresses()[0];
    }
    async nodeAddToBootstrapBlacklist(ip: array): Promise<No return> {
        return this.connector.node_add_to_bootstrap_blacklist([ip])[0];
    }
    async nodeAddToBootstrapWhitelist(ip: array): Promise<No return> {
        return this.connector.node_add_to_bootstrap_whitelist([ip])[0];
    }
    async nodeAddToPeersWhitelist(ip: array): Promise<No return> {
        return this.connector.node_add_to_peers_whitelist([ip])[0];
    }
    async nodeBanById(id: array): Promise<No return> {
        return this.connector.node_ban_by_id([id])[0];
    }
    async nodeBanByIp(ip: array): Promise<No return> {
        return this.connector.node_ban_by_ip([ip])[0];
    }
    async nodeBootstrapBlacklist(): Promise<ip> {
        return this.connector.node_bootstrap_blacklist()[0];
    }
    async nodeBootstrapWhitelist(): Promise<ip> {
        return this.connector.node_bootstrap_whitelist()[0];
    }
    async nodeBootstrapWhitelistAllowAll(): Promise<No return> {
        return this.connector.node_bootstrap_whitelist_allow_all()[0];
    }
    async nodePeersWhitelist(): Promise<ip> {
        return this.connector.node_peers_whitelist()[0];
    }
    async nodeRemoveFromBootstrapBlacklist(ip: array): Promise<No return> {
        return this.connector.node_remove_from_bootstrap_blacklist([ip])[0];
    }
    async nodeRemoveFromBootstrapWhitelist(ip: array): Promise<No return> {
        return this.connector.node_remove_from_bootstrap_whitelist([ip])[0];
    }
    async nodeRemoveFromPeersWhitelist(ip: array): Promise<No return> {
        return this.connector.node_remove_from_peers_whitelist([ip])[0];
    }
    async nodeRemoveFromWhitelist(ip: array): Promise<No return> {
        return this.connector.node_remove_from_whitelist([ip])[0];
    }
    async removeStakingAddresses(addresses: Address): Promise<No return> {
        return this.connector.remove_staking_addresses([addresses])[0];
    }
    async executeMultipleRemoveStakingAddresses(addressess: Address[]): Promise<No return[]> {
        return this.connector.remove_staking_addresses(addressess);
    }
    async nodeSignMessage(message: array): Promise<PubkeySig> {
        return this.connector.node_sign_message([message])[0];
    }
    async stopNode(): Promise<No return> {
        return this.connector.stop_node()[0];
    }
    async nodeUnbanById(id: array): Promise<No return> {
        return this.connector.node_unban_by_id([id])[0];
    }
    async nodeUnbanByIp(ip: array): Promise<No return> {
        return this.connector.node_unban_by_ip([ip])[0];
    }
    async nodeWhitelist(ip: array): Promise<No return> {
        return this.connector.node_whitelist([ip])[0];
    }

    async executeMultipleSendOperations(OperationInputs: OperationInput[]): Promise<Operation[]> {
        return this.connector.send_operations(OperationInputs);
    }
    async getLargestStakers(ApiRequest: ApiRequest): Promise<PagedVecStaker> {
        return this.connector.get_largest_stakers([ApiRequest])[0];
    }
    async getNextBlockBestParents(): Promise<NextBlockBestParents> {
        return this.connector.get_next_block_best_parents()[0];
    }
    async getVersion(): Promise<Version> {
        return this.connector.get_version()[0];
    }
    async subscribeNewBlocks(): Promise<BlockInfo> {
        return this.connector.subscribe_new_blocks()[0];
    }
    async subscribeNewBlocksHeaders(): Promise<BlockHeader> {
        return this.connector.subscribe_new_blocks_headers()[0];
    }
    async subscribeNewFilledBlocks(): Promise<FilledBlockInfo> {
        return this.connector.subscribe_new_filled_blocks()[0];
    }
    async subscribeNewOperations(): Promise<Operation> {
        return this.connector.subscribe_new_operations()[0];
    }
    async unsubscribeNewBlocks(subscriptionId: integer): Promise<unsubscribe result> {
        return this.connector.unsubscribe_new_blocks([subscriptionId])[0];
    }
    async unsubscribeNewBlocksHeaders(subscriptionId: integer): Promise<unsubscribe result> {
        return this.connector.unsubscribe_new_blocks_headers([subscriptionId])[0];
    }
    async unsubscribeNewFilledBlocks(subscriptionId: integer): Promise<unsubscribe result> {
        return this.connector.unsubscribe_new_filled_blocks([subscriptionId])[0];
    }
    async unsubscribeNewOperations(subscriptionId: integer): Promise<unsubscribe result> {
        return this.connector.unsubscribe_new_operations([subscriptionId])[0];
    }
    */
}
