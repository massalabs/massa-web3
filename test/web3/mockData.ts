/*
    This file contains mock data for testing purposes.
*/

import { IGetGraphInterval } from '../../src/interfaces/IGetGraphInterval';

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

export const mockGraphInterval: IGetGraphInterval = {
  start: 1624153200000,
  end: 1624156800000,
};

export const mockBlock = {
  header: {
    content: {
      slot: { period: 830, thread: 1 },
      parents: ['0x000'],
      operation_merkle_root: '0x000',
      endorsements: [],
    },
    signature: '0x000',
    creator_public_key: '0x000',
    creator_address: '0x000',
    id: '0x000',
  },
};

export const mockAddresses = [
  'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
  'tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6',
  'tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
];

export const mockAddressesInfo = [
  {
    address: 'tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb',
    candidate_balance: '0',
    thread: 0,
  },
  {
    address: 'tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6',
    candidate_balance: '0',
    thread: 0,
  },
  {
    address: 'tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx',
    candidate_balance: '0',
    thread: 0,
  },
];

export const mockBlockIds = ['0x000', '0x001'];

export const mockBlockData = [
  {
    id: '0x000',
    content: null,
    is_final: false,
    is_in_blockclique: false,
    is_stale: false,
  },
  {
    id: '0x001',
    content: null,
    is_final: true,
    is_in_blockclique: false,
    is_stale: false,
  },
];

export const mockEndorsementIds = ['0x000', '0x001'];

export const mockEndorsementData = [
  {
    id: '0x000',
    in_pool: false,
    in_blocks: ['0x000'],
    is_final: false,
    endorsement: {
      content: {
        sender_public_key: '0x000',
        slot: { period: 830, thread: 1 },
        index: 0,
        endorsed_block: '0x000',
      },
      signature: '0x000',
    },
  },
  {
    id: '0x001',
    in_pool: false,
    in_blocks: ['0x001'],
    is_final: true,
    endorsement: {
      content: {
        sender_public_key: '0x000',
        slot: { period: 830, thread: 1 },
        index: 0,
        endorsed_block: '0x000',
      },
      signature: '0x000',
    },
  },
];

export const mockOperationIds = ['0x000', '0x001'];

export const mockOperationData = [
  {
    id: '0x000',
    in_blocks: ['0x000'],
    in_pool: false,
    is_operation_final: false,
    thread: 0,
    operation: {},
  },
  {
    id: '0x001',
    in_blocks: ['0x001'],
    in_pool: false,
    is_operation_final: true,
    thread: 0,
    operation: {},
  },
];

export const mockStackersData = [
  {
    tz1VSUr8wwNhLAzempoch5d6hLRiTh8Cjcjb: 1,
    tz1aSkwEot3L2kmUvcoxzjMomb9mvBNuzFK6: 2,
    tz1KqTpEZ7Yob7QbPE4Hy4Wo8fHG8LhKxZSx: 3,
  },
];
