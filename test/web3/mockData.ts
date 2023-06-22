/*
    This file contains mock data for testing purposes.
*/

import { IClientConfig } from '../../src/interfaces/IClientConfig';
import { ProviderType, IProvider } from '../../src/interfaces/IProvider';
import { PERIOD_OFFSET } from '../../src/web3/BaseClient';
import { IAccount } from '../../src/interfaces/IAccount';
import { IContractData } from '../../src/interfaces/IContractData';
import { ICallData } from '../../src/interfaces/ICallData';

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

export const mockClientConfig: IClientConfig = {
  providers: [
    {
      url: 'https://mock-public-api.com',
      type: ProviderType.PUBLIC,
    } as IProvider,
    {
      url: 'https://mock-private-api.com',
      type: ProviderType.PRIVATE,
    } as IProvider,
  ],
  periodOffset: PERIOD_OFFSET,
};

export const mockDeployerAccount: IAccount = {
  address: 'AU1QRRX6o2igWogY8qbBtqLYsNzYNHwvnpMC48Y6CLCv4cXe9gmK',
  publicKey: 'P129tbNd4oVMRsnFvQcgSq4PUAZYYDA1pvqtef2ER6W7JqgY1Bfg',
  secretKey: 'S12XuWmm5jULpJGXBnkeBsuiNmsGi2F4rMiTvriCzENxBR4Ev7vd',
  createdInThread: 0,
};

export const mockContractData: IContractData = {
  fee: 100000000000000000n,
  maxGas: 100000000000000000n,
  maxCoins: 100000000000000000n,
  contractDataText: 'Hello World!',
  contractDataBinary: new Uint8Array([0x00, 0x01, 0x02, 0x03]),
  datastore: new Map<Uint8Array, Uint8Array>([
    [
      new Uint8Array([0x00, 0x01, 0x02, 0x03]),
      new Uint8Array([0x00, 0x01, 0x02, 0x03]),
    ],
    [
      new Uint8Array([0x04, 0x05, 0x06, 0x07]),
      new Uint8Array([0x04, 0x05, 0x06, 0x07]),
    ],
    [
      new Uint8Array([0x08, 0x09, 0x0a, 0x0b]),
      new Uint8Array([0x08, 0x09, 0x0a, 0x0b]),
    ],
    [
      new Uint8Array([0x0c, 0x0d, 0x0e, 0x0f]),
      new Uint8Array([0x0c, 0x0d, 0x0e, 0x0f]),
    ],
  ]),
};

export const mockOpIds: Array<string> = [
  'O1z2xVtwFsKP3po3vkPmpELZiJvwEdkvyhpK7iT8P3rk9zCEs9f',
  'O1z2xVtwFsKP3po3vkPmpELZiJvwEdkvyhpK7iT8P3rk9zCEs9g',
  'O1z2xVtwFsKP3po3vkPmpELZiJvwEdkvyhpK7iT8P3rk9zCEs9h',
];

export const mockCallData: ICallData = {
  fee: 100000000000000000n,
  maxGas: 100000000000000000n,
  coins: 100000000000000000n,
  targetAddress: 'AS12sRd6E6zKdBx3PGeZpCUUM8sE5oSA5mTa3VV4AoDCoqpoxwkmu',
  functionName: 'test',
  parameter: [1, 2, 3, 4],
};
