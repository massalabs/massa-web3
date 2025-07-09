/* eslint-disable @typescript-eslint/naming-convention */
import { NodeStatus } from '../generated/client-types'
import { NodeStatusInfo } from '../provider'
import { rpcTypes as t } from '../generated'
import {
  ExecuteSCReadOnlyParams,
  ExecuteSCReadOnlyResult,
  ReadOnlyCallResult,
} from './types'
import varint from 'varint'
import { Mas } from '../basicElements'
import { MAX_GAS_EXECUTE } from '../smartContracts'

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
    currentMipVersion: status.current_mip_version,
  }
}

export function formatReadOnlyCallResponse(
  res: t.ExecuteReadOnlyResponse
): ReadOnlyCallResult {
  return {
    value: res.result.Ok ? new Uint8Array(res.result.Ok) : new Uint8Array(),
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
        executionTrailHashChange: res.state_changes.execution_trail_hash_change,
      },
    },
  }
}

export function formatReadOnlyExecuteSCParams(
  params: ExecuteSCReadOnlyParams
): t.ReadOnlyBytecodeExecution {
  const res = {
    max_gas: Number(params.maxGas ?? MAX_GAS_EXECUTE),
    bytecode: Array.from(params.byteCode),
    address: params.caller,
    // Datastore is serialized manually as a workaround of https://github.com/massalabs/massa/issues/4775
    operation_datastore: params.datastore
      ? serializeDatastore(params.datastore)
      : null,
    fee: params.fee ? Mas.toString(params.fee) : null,
  }

  return res
}

export function formatReadOnlyExecuteSCResponse(
  res: t.ExecuteReadOnlyResponse
): ExecuteSCReadOnlyResult {
  return {
    value: res.result.Ok ? new Uint8Array(res.result.Ok) : new Uint8Array(),
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
      executionTrailHashChange: res.state_changes.execution_trail_hash_change,
    },
    executedAt: res.executed_at,
  }
}

export function serializeDatastore(
  data: Map<Uint8Array, Uint8Array>
): number[] {
  // Serialize the entry count as a U64VarInt
  const entryCount = data.size
  const buffer = [...varint.encode(entryCount)]

  // Serialize each key-value pair
  for (const [key, value] of data.entries()) {
    buffer.push(...varint.encode(key.length))
    buffer.push(...key)

    buffer.push(...varint.encode(value.length))
    buffer.push(...value)
  }
  return buffer
}
