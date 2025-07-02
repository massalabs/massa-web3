/* eslint-disable @typescript-eslint/naming-convention */

import { rpcTypes as t } from 'src/generated'
import { getHttpRpcClient, HttpRpcClient } from './http'
import { ClientOptions } from './types'

export class Connector {
  private client: HttpRpcClient = {} as HttpRpcClient

  constructor(url: string, opts: Partial<ClientOptions> = {}) {
    this.client = getHttpRpcClient(url, opts)
  }

  /**
   * Execute a smart contract in a read only context
   */

  public execute_read_only_bytecode: t.ExecuteReadOnlyBytecode = (params) => {
    return this.client.request('execute_read_only_bytecode', params)
  }

  /**
   * Call a function of a contract in a read only context
   */

  public execute_read_only_call: t.ExecuteReadOnlyCall = (params) => {
    return this.client.request('execute_read_only_call', params)
  }

  /**
   * To check when your address is selected to stake.
   */

  public get_addresses: t.GetAddresses = (params) => {
    return this.client.request('get_addresses', params)
  }

  /**
   * Returns the bytecode of the given addresses.
   */

  public get_addresses_bytecode: t.GetAddressesBytecode = (params) => {
    return this.client.request('get_addresses_bytecode', params)
  }

  /**
   * Get storage keys for the given addresses and filters.
   */

  public get_addresses_keys: t.GetAddressesDatastoreKeys = (params) => {
    return this.client.request('get_addresses_datastore_keys', params)
  }

  /**
   * Get blocks
   */

  public get_blocks: t.GetBlocks = (params) => {
    return this.client.request('get_blocks', params)
  }

  /**
   * Get a block in the blockclique
   */

  public get_blockclique_block_by_slot: t.GetBlockcliqueBlockBySlot = (
    params
  ) => {
    return this.client.request('get_blockclique_block_by_slot', params)
  }

  /**
   * Get cliques
   */

  public get_cliques: t.GetCliques = () => {
    return this.client.request('get_cliques', {})
  }

  /**
   * Get a data entry both at the latest final and active executed slots for the given addresses.
   */

  public get_datastore_entries: t.GetDatastoreEntries = (params) => {
    return this.client.request('get_datastore_entries', params)
  }

  /**
   * Get transfers for specified slots
   */

  public get_slots_transfers: t.GetSlotsTransfers = (params) => {
    return this.client.request('get_slots_transfers', params)
  }

  /**
   * Get endorsements
   */

  public get_endorsements: t.GetEndorsements = (params) => {
    return this.client.request('get_endorsements', params)
  }

  /**
   * Returns events optionally filtered
   */

  public get_filtered_sc_output_event: t.GetFilteredScOutputEvent = (
    params
  ) => {
    return this.client.request('get_filtered_sc_output_event', params)
  }

  /**
   * Get graph interval
   */

  public get_graph_interval: t.GetGraphInterval = (params) => {
    return this.client.request('get_graph_interval', params)
  }

  /**
   * Get operations
   */

  public get_operations: t.GetOperations = (params) => {
    return this.client.request('get_operations', params)
  }

  /**
   * Get stakers
   */

  public get_stakers: t.GetStakers = (params) => {
    return this.client.request('get_stakers', params)
  }

  /**
   * Summary of the current state
   */

  public get_status: t.GetStatus = () => {
    return this.client.request('get_status', {})
  }

  /**
   * Add a vec of new secret(private) keys for the node to use to stake
   */

  public add_staking_secret_keys: t.AddStakingSecretKeys = (params) => {
    return this.client.request('add_staking_secret_keys', params)
  }

  /**
   * Return hashset of staking addresses
   */

  public get_staking_addresses: t.GetStakingAddresses = () => {
    return this.client.request('get_staking_addresses', {})
  }

  /**
   * Returns if slot is available and the price to book the requested gas
   */
  public get_deferred_call_quote: t.GetDeferredCallQuote = (params) => {
    return this.client.request('get_deferred_call_quote', params)
  }

  /**
   * Returns information about deferred calls.
   */
  public get_deferred_call_info: t.GetDeferredCallInfo = (params) => {
    return this.client.request('get_deferred_call_info', params)
  }

  /**
   * Returns ids of deferred calls for provided slots.
   */
  public get_deferred_call_ids_by_slot: t.GetDeferredCallIdsBySlot = (
    params
  ) => {
    return this.client.request('get_deferred_call_ids_by_slot', params)
  }

  /**
   * Add to bootstrap blacklist given IP addresses
   */

  public node_add_to_bootstrap_blacklist: t.NodeAddToBootstrapBlacklist = (
    params
  ) => {
    return this.client.request('node_add_to_bootstrap_blacklist', params)
  }

  /**
   * Add to bootstrap whitelist given IP addresses
   */

  public node_add_to_bootstrap_whitelist: t.NodeAddToBootstrapWhitelist = (
    params
  ) => {
    return this.client.request('node_add_to_bootstrap_whitelist', params)
  }

  /**
   * Add to peers whitelist given IP addresses
   */

  public node_add_to_peers_whitelist: t.NodeAddToPeersWhitelist = (params) => {
    return this.client.request('node_add_to_peers_whitelist', params)
  }

  /**
   * Ban given ids
   */

  public node_ban_by_id: t.NodeBanById = (params) => {
    return this.client.request('node_ban_by_id', params)
  }

  /**
   * Ban given IP addresses
   */

  public node_ban_by_ip: t.NodeBanByIp = (params) => {
    return this.client.request('node_ban_by_ip', params)
  }

  /**
   * Returns bootstrap blacklist IP addresses
   */

  public node_bootstrap_blacklist: t.NodeBootstrapBlacklist = () => {
    return this.client.request('node_bootstrap_blacklist', {})
  }

  /**
   * Returns bootstrap whitelist IP addresses
   */

  public node_bootstrap_whitelist: t.NodeBootstrapWhitelist = () => {
    return this.client.request('node_bootstrap_whitelist', {})
  }

  /**
   * Allow everyone to bootstrap from the node
   */

  public node_bootstrap_whitelist_allow_all: t.NodeBootstrapWhitelistAllowAll =
    () => {
      return this.client.request('node_bootstrap_whitelist_allow_all', {})
    }

  /**
   * Returns peers whitelist IP addresses
   */

  public node_peers_whitelist: t.NodePeersWhitelist = () => {
    return this.client.request('node_peers_whitelist', {})
  }

  /**
   * Remove from bootstrap blacklist given IP addresses
   */

  public node_remove_from_bootstrap_blacklist: t.NodeRemoveFromBootstrapBlacklist =
    (params) => {
      return this.client.request('node_remove_from_bootstrap_blacklist', params)
    }

  /**
   * Remove from bootstrap whitelist given IP addresses
   */

  public node_remove_from_bootstrap_whitelist: t.NodeRemoveFromBootstrapWhitelist =
    (params) => {
      return this.client.request('node_remove_from_bootstrap_whitelist', params)
    }

  /**
   * Remove from peers whitelist given IP addresses
   */

  public node_remove_from_peers_whitelist: t.NodeRemoveFromPeersWhitelist = (
    params
  ) => {
    return this.client.request('node_remove_from_peers_whitelist', params)
  }

  /**
   * Remove from whitelist given IP addresses
   */

  public node_remove_from_whitelist: t.NodeRemoveFromWhitelist = (params) => {
    return this.client.request('node_remove_from_whitelist', params)
  }

  /**
   * Remove a vec of addresses used to stake
   */

  public remove_staking_addresses: t.RemoveStakingAddresses = (params) => {
    return this.client.request('remove_staking_addresses', params)
  }

  /**
   * Sign message with node’s key
   */

  public node_sign_message: t.NodeSignMessage = (params) => {
    return this.client.request('node_sign_message', params)
  }

  /**
   * Gracefully stop the node
   */

  public stop_node: t.StopNode = () => {
    return this.client.request('stop_node', {})
  }

  /**
   * Unban given ids
   */

  public node_unban_by_id: t.NodeUnbanById = (params) => {
    return this.client.request('node_unban_by_id', params)
  }

  /**
   * Unban given IP addresses
   */

  public node_unban_by_ip: t.NodeUnbanByIp = (params) => {
    return this.client.request('node_unban_by_ip', params)
  }

  /**
   * Whitelist given IP addresses
   */

  public node_whitelist: t.NodeWhitelist = (params) => {
    return this.client.request('node_whitelist', params)
  }

  /**
   * Adds operations to pool
   */

  public send_operations: t.SendOperations = (params) => {
    return this.client.request('send_operations', params)
  }

  /**
   * Get largest stakers
   */

  public get_largest_stakers: t.GetLargestStakers = (params) => {
    return this.client.request('get_largest_stakers', params)
  }

  /**
   * Get next block best parents
   */

  public get_next_block_best_parents: t.GetNextBlockBestParents = () => {
    return this.client.request('get_next_block_best_parents', {})
  }

  /**
   * Get Massa node version
   */

  public get_version: t.GetVersion = () => {
    return this.client.request('get_version', {})
  }

  /**
   * New produced blocks
   */

  public subscribe_new_blocks: t.SubscribeNewBlocks = () => {
    return this.client.request('subscribe_new_blocks', {})
  }

  /**
   * New produced blocks headers
   */

  public subscribe_new_blocks_headers: t.SubscribeNewBlocksHeaders = () => {
    return this.client.request('subscribe_new_blocks_headers', {})
  }

  /**
   * New produced blocks with operations content
   */

  public subscribe_new_filled_blocks: t.SubscribeNewFilledBlocks = () => {
    return this.client.request('subscribe_new_filled_blocks', {})
  }

  /**
   * Subscribe to new operations
   */

  public subscribe_new_operations: t.SubscribeNewOperations = () => {
    return this.client.request('subscribe_new_operations', {})
  }

  /**
   * Unsubscribe from new produced blocks
   */

  public unsubscribe_new_blocks: t.UnsubscribeNewBlocks = (params) => {
    return this.client.request('unsubscribe_new_blocks', params)
  }

  /**
   * Unsubscribe from new produced blocks headers
   */

  public unsubscribe_new_blocks_headers: t.UnsubscribeNewBlocksHeaders = (
    params
  ) => {
    return this.client.request('unsubscribe_new_blocks_headers', params)
  }

  /**
   * Unsubscribe from new produced filled blocks
   */

  public unsubscribe_new_filled_blocks: t.UnsubscribeNewFilledBlocks = (
    params
  ) => {
    return this.client.request('unsubscribe_new_filled_blocks', params)
  }

  /**
   * Unsubscribe from new received operations
   */

  public unsubscribe_new_operations: t.UnsubscribeNewOperations = (params) => {
    return this.client.request('unsubscribe_new_operations', params)
  }
}
