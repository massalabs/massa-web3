import { ISlot } from '@massalabs/web3-utils';

/**
 *
 */
export interface NodesMap {
  [name: string]: string;
}

/**
 * Represents the status of a node.
 *
 * @see config of type `object` represents the configuration of the node.
 * @see config.block_reward of type `string` represents the block reward of the node.
 * @see config.delta_f0 of type `number` represents the delta f0 of the node.
 * @see config.end_timestamp of type `number` represents the end timestamp of the node (can be null).
 * @see config.genesis_timestamp of type `number` represents the genesis timestamp of the node.
 * @see config.max_block_size of type `number` represents the maximum block size of the node.
 * @see config.operation_validity_periods of type `number` represents the operation validity periods of the node.
 * @see config.periods_per_cycle of type `number` represents the periods per cycle of the node.
 * @see config.pos_lock_cycles of type `number` represents the proof of stake lock cycles of the node.
 *
 * @see connected_nodes of type `NodesMap` represents its connected nodes.
 * @see consensus_stats of type `object` represents the consensus statistics of the node.
 * @see current_cycle of type `number` represents the current cycle of the node.
 * @see current_time of type `number` represents the current time of the node.
 * @see last_slot of type `ISlot` represents the last slot of the node.
 * @see network_stats of type `object` represents the network statistics of the node.
 * @see next_slot of type `ISlot` represents the next slot of the node.
 * @see node_id of type `string` represents the ID of the node.
 * @see pool_stats of type `object` represents the pool statistics of the node.
 */
export interface INodeStatus {
  config: {
    block_reward: string;
    delta_f0: number;
    end_timestamp: number | null;
    genesis_timestamp: number;
    max_block_size: number;
    operation_validity_periods: number;
    periods_per_cycle: number;
    pos_lock_cycles: number;
    pos_lookback_cycles: number;
    roll_price: string;
    t0: number;
    thread_count: number;
  };
  connected_nodes: NodesMap;
  consensus_stats: {
    clique_count: 1;
    end_timestamp: number;
    final_block_count: number;
    final_operation_count: number;
    staker_count: number;
    stale_block_count: number;
    start_timestamp: number;
  };
  current_cycle: number;
  current_time: number;
  last_slot: ISlot;
  network_stats: {
    active_node_count: number;
    banned_peer_count: number;
    in_connection_count: number;
    known_peer_count: number;
    out_connection_count: number;
  };
  next_slot: ISlot;
  node_id: string;
  node_ip: string | null;
  pool_stats: { endorsement_count: number; operation_count: number };
  version: string;
}
