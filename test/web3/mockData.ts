/*
    This file contains mock data for testing purposes.
*/

export const mockNodeStatusInfo = {
  node_id: 'N129tbNd4oVMRsnFvQcgSq4PUAZYYDA1pvqtef2ER6W7JqgY1Bfg',
  node_ip: null,
  version: 'SAND.23.0',
  current_time: 1687275917301,
  current_cycle: 6,
  current_cycle_time: 1687274924363,
  next_cycle_time: 1687276972363,
  connected_nodes: {},
  last_slot: { period: 830, thread: 1 },
  next_slot: { period: 830, thread: 2 },
  consensus_stats: {
    start_timespan: 1687275857301,
    end_timespan: 1687275917301,
    final_block_count: 120,
    stale_block_count: 0,
    clique_count: 1,
  },
  pool_stats: [0, 1296],
  network_stats: {
    in_connection_count: 0,
    out_connection_count: 0,
    known_peer_count: 0,
    banned_peer_count: 0,
    active_node_count: 0,
  },
  execution_stats: {
    time_window_start: 1687275857301,
    time_window_end: 1687275917301,
    final_block_count: 120,
    final_executed_operations_count: 0,
    active_cursor: { period: 829, thread: 29 },
  },
  config: {
    genesis_timestamp: 1687262636363,
    end_timestamp: null,
    thread_count: 32,
    t0: 16000,
    delta_f0: 1088,
    operation_validity_periods: 10,
    periods_per_cycle: 128,
    block_reward: '0.30',
    roll_price: '100',
    max_block_size: 1000000,
  },
};

export const mockOpIds = ['op4', 'op5', 'op6'];
