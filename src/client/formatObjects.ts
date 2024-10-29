import { NodeStatus } from '../generated/client-types'
import { NodeStatusInfo } from '../provider'

export function formatNodeStatusObject(status: NodeStatus): NodeStatusInfo {
  return {
    config: {
      blockReward: status.config.block_reward,
      deltaF0: status.config.delta_f0,
      endTimestamp: status.config.end_timestamp,
      genesisTimestamp: status.config.genesis_timestamp,
      maxBlockSize: status.config.max_block_size,
      operationValidityPeriods: status.config.operation_validity_periods,
      periodsPerCycle: status.config.periods_per_cycle,
      rollPrice: status.config.roll_price,
      t0: status.config.t0,
      threadCount: status.config.thread_count,
    },
    connectedNodes: status.connected_nodes,
    consensusStats: {
      cliqueCount: status.consensus_stats.clique_count,
      endTimespan: status.consensus_stats.end_timespan,
      finalBlockCount: status.consensus_stats.final_block_count,
      staleBlockCount: status.consensus_stats.stale_block_count,
      startTimespan: status.consensus_stats.start_timespan,
    },
    currentCycle: status.current_cycle,
    currentTime: status.current_time,
    currentCycleTime: status.current_cycle_time,
    nextCycleTime: status.next_cycle_time,
    lastSlot: status.last_slot,
    nextSlot: status.next_slot,
    networkStats: {
      activeNodeCount: status.network_stats.active_node_count,
      bannedPeerCount: status.network_stats.banned_peer_count,
      inConnectionCount: status.network_stats.in_connection_count,
      knownPeerCount: status.network_stats.known_peer_count,
      outConnectionCount: status.network_stats.out_connection_count,
    },
    nodeId: status.node_id,
    nodeIp: status.node_ip,
    poolStats: status.pool_stats,
    version: status.version,
    executionStats: {
      timeWindowStart: status.execution_stats.time_window_start,
      timeWindowEnd: status.execution_stats.time_window_end,
      finalBlockCount: status.execution_stats.final_block_count,
      finalExecutedOperationsCount:
        status.execution_stats.final_executed_operations_count,
      activeCursor: status.execution_stats.active_cursor,
      finalCursor: status.execution_stats.final_cursor,
    },
    chainId: status.chain_id,
    minimalFees: status.minimal_fees,
  }
}
