// @generated by protobuf-ts 2.9.4 with parameter optimize_code_size
// @generated from protobuf file "massa/model/v1/node.proto" (package "massa.model.v1", syntax proto3)
// tslint:disable
//
// Copyright (c) 2023 MASSA LABS <info@massa.net>
//
import { MessageType } from "@protobuf-ts/runtime";
import { NativeAmount } from "./amount";
import { ExecutionStats } from "./stats";
import { NetworkStats } from "./stats";
import { PoolStats } from "./stats";
import { ConsensusStats } from "./stats";
import { Slot } from "./slot";
import { NativeTime } from "./time";
/**
 * Node status
 *
 * @generated from protobuf message massa.model.v1.NodeStatus
 */
export interface NodeStatus {
    /**
     * Our node id
     *
     * @generated from protobuf field: string node_id = 1;
     */
    nodeId: string;
    /**
     * Optional node ip
     *
     * @generated from protobuf field: string node_ip = 2;
     */
    nodeIp: string;
    /**
     * Node version
     *
     * @generated from protobuf field: string version = 3;
     */
    version: string;
    /**
     * Now
     *
     * @generated from protobuf field: massa.model.v1.NativeTime current_time = 4;
     */
    currentTime?: NativeTime;
    /**
     * Current cycle
     *
     * @generated from protobuf field: uint64 current_cycle = 5;
     */
    currentCycle: bigint;
    /**
     * Current cycle starting timestamp
     *
     * @generated from protobuf field: massa.model.v1.NativeTime current_cycle_time = 6;
     */
    currentCycleTime?: NativeTime;
    /**
     * Next cycle starting timestamp
     *
     * @generated from protobuf field: massa.model.v1.NativeTime next_cycle_time = 7;
     */
    nextCycleTime?: NativeTime;
    /**
     * Connected nodes
     *
     * @generated from protobuf field: repeated massa.model.v1.ConnectedNode connected_nodes = 8;
     */
    connectedNodes: ConnectedNode[];
    /**
     * Last executed final slot
     *
     * @generated from protobuf field: massa.model.v1.Slot last_executed_final_slot = 9;
     */
    lastExecutedFinalSlot?: Slot;
    /**
     * Last executed speculative slot
     *
     * @generated from protobuf field: massa.model.v1.Slot last_executed_speculative_slot = 10;
     */
    lastExecutedSpeculativeSlot?: Slot;
    /**
     * The hash of the XOF final state hash
     *
     * @generated from protobuf field: string final_state_fingerprint = 11;
     */
    finalStateFingerprint: string;
    /**
     * Consensus stats
     *
     * @generated from protobuf field: massa.model.v1.ConsensusStats consensus_stats = 12;
     */
    consensusStats?: ConsensusStats;
    /**
     * Pool stats (operation count and endorsement count)
     *
     * @generated from protobuf field: massa.model.v1.PoolStats pool_stats = 13;
     */
    poolStats?: PoolStats;
    /**
     * Network stats
     *
     * @generated from protobuf field: massa.model.v1.NetworkStats network_stats = 14;
     */
    networkStats?: NetworkStats;
    /**
     * Execution stats
     *
     * @generated from protobuf field: massa.model.v1.ExecutionStats execution_stats = 15;
     */
    executionStats?: ExecutionStats;
    /**
     * Compact configuration
     *
     * @generated from protobuf field: massa.model.v1.CompactConfig config = 16;
     */
    config?: CompactConfig;
    /**
     * Chain id
     *
     * @generated from protobuf field: uint64 chain_id = 17;
     */
    chainId: bigint;
    /**
     * Current mip version
     *
     * @generated from protobuf field: uint32 current_mip_version = 18;
     */
    currentMipVersion: number;
}
/**
 * Connected node
 *
 * @generated from protobuf message massa.model.v1.ConnectedNode
 */
export interface ConnectedNode {
    /**
     * Node id
     *
     * @generated from protobuf field: string node_id = 1;
     */
    nodeId: string;
    /**
     * Node ip
     *
     * @generated from protobuf field: string node_ip = 2;
     */
    nodeIp: string;
    /**
     * Connection type
     *
     * @generated from protobuf field: massa.model.v1.ConnectionType connection_type = 3;
     */
    connectionType: ConnectionType;
}
/**
 * Compact configuration
 *
 * @generated from protobuf message massa.model.v1.CompactConfig
 */
export interface CompactConfig {
    /**
     * Time in milliseconds when the blockclique started.
     *
     * @generated from protobuf field: massa.model.v1.NativeTime genesis_timestamp = 1;
     */
    genesisTimestamp?: NativeTime;
    /**
     * TESTNET: time when the blockclique is ended.
     *
     * @generated from protobuf field: massa.model.v1.NativeTime end_timestamp = 2;
     */
    endTimestamp?: NativeTime;
    /**
     * Number of threads
     *
     * @generated from protobuf field: uint32 thread_count = 3;
     */
    threadCount: number;
    /**
     * Time between the periods in the same thread.
     *
     * @generated from protobuf field: massa.model.v1.NativeTime t0 = 4;
     */
    t0?: NativeTime;
    /**
     * Threshold for fitness.
     *
     * @generated from protobuf field: uint64 delta_f0 = 5;
     */
    deltaF0: bigint;
    /**
     * Maximum operation validity period count
     *
     * @generated from protobuf field: uint64 operation_validity_periods = 6;
     */
    operationValidityPeriods: bigint;
    /**
     * cycle duration in periods
     *
     * @generated from protobuf field: uint64 periods_per_cycle = 7;
     */
    periodsPerCycle: bigint;
    /**
     * Reward amount for a block creation
     *
     * @generated from protobuf field: massa.model.v1.NativeAmount block_reward = 8;
     */
    blockReward?: NativeAmount;
    /**
     * Price of a roll on the network
     *
     * @generated from protobuf field: massa.model.v1.NativeAmount roll_price = 9;
     */
    rollPrice?: NativeAmount;
    /**
     * Max total size of a block
     *
     * @generated from protobuf field: uint32 max_block_size = 10;
     */
    maxBlockSize: number;
}
/**
 * Public status
 *
 * @generated from protobuf message massa.model.v1.PublicStatus
 */
export interface PublicStatus {
    /**
     * Our node id
     *
     * @generated from protobuf field: string node_id = 1;
     */
    nodeId: string;
    /**
     * Node version
     *
     * @generated from protobuf field: string version = 3;
     */
    version: string;
    /**
     * Now
     *
     * @generated from protobuf field: massa.model.v1.NativeTime current_time = 4;
     */
    currentTime?: NativeTime;
    /**
     * Current cycle
     *
     * @generated from protobuf field: uint64 current_cycle = 5;
     */
    currentCycle: bigint;
    /**
     * Current cycle starting timestamp
     *
     * @generated from protobuf field: massa.model.v1.NativeTime current_cycle_time = 6;
     */
    currentCycleTime?: NativeTime;
    /**
     * Next cycle starting timestamp
     *
     * @generated from protobuf field: massa.model.v1.NativeTime next_cycle_time = 7;
     */
    nextCycleTime?: NativeTime;
    /**
     * Last executed final slot
     *
     * @generated from protobuf field: massa.model.v1.Slot last_executed_final_slot = 8;
     */
    lastExecutedFinalSlot?: Slot;
    /**
     * Last executed speculative slot
     *
     * @generated from protobuf field: massa.model.v1.Slot last_executed_speculative_slot = 9;
     */
    lastExecutedSpeculativeSlot?: Slot;
    /**
     * The hash of the XOF final state hash
     *
     * @generated from protobuf field: string final_state_fingerprint = 10;
     */
    finalStateFingerprint: string;
    /**
     * Compact configuration
     *
     * @generated from protobuf field: massa.model.v1.CompactConfig config = 11;
     */
    config?: CompactConfig;
    /**
     * Chain id
     *
     * @generated from protobuf field: uint64 chain_id = 12;
     */
    chainId: bigint;
    /**
     * minimal fees
     *
     * @generated from protobuf field: massa.model.v1.NativeAmount minimal_fees = 13;
     */
    minimalFees?: NativeAmount;
    /**
     * current mip version
     *
     * @generated from protobuf field: uint32 current_mip_version = 14;
     */
    currentMipVersion: number;
}
/**
 * ConnectionType enum
 *
 * @generated from protobuf enum massa.model.v1.ConnectionType
 */
export enum ConnectionType {
    /**
     * Default enum value
     *
     * @generated from protobuf enum value: CONNECTION_TYPE_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Incoming connection
     *
     * @generated from protobuf enum value: CONNECTION_TYPE_INCOMING = 1;
     */
    INCOMING = 1,
    /**
     * Outgoing connection
     *
     * @generated from protobuf enum value: CONNECTION_TYPE_OUTGOING = 2;
     */
    OUTGOING = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class NodeStatus$Type extends MessageType<NodeStatus> {
    constructor() {
        super("massa.model.v1.NodeStatus", [
            { no: 1, name: "node_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "node_ip", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "version", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "current_time", kind: "message", T: () => NativeTime },
            { no: 5, name: "current_cycle", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 6, name: "current_cycle_time", kind: "message", T: () => NativeTime },
            { no: 7, name: "next_cycle_time", kind: "message", T: () => NativeTime },
            { no: 8, name: "connected_nodes", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => ConnectedNode },
            { no: 9, name: "last_executed_final_slot", kind: "message", T: () => Slot },
            { no: 10, name: "last_executed_speculative_slot", kind: "message", T: () => Slot },
            { no: 11, name: "final_state_fingerprint", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 12, name: "consensus_stats", kind: "message", T: () => ConsensusStats },
            { no: 13, name: "pool_stats", kind: "message", T: () => PoolStats },
            { no: 14, name: "network_stats", kind: "message", T: () => NetworkStats },
            { no: 15, name: "execution_stats", kind: "message", T: () => ExecutionStats },
            { no: 16, name: "config", kind: "message", T: () => CompactConfig },
            { no: 17, name: "chain_id", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 18, name: "current_mip_version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message massa.model.v1.NodeStatus
 */
export const NodeStatus = new NodeStatus$Type();
// @generated message type with reflection information, may provide speed optimized methods
class ConnectedNode$Type extends MessageType<ConnectedNode> {
    constructor() {
        super("massa.model.v1.ConnectedNode", [
            { no: 1, name: "node_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "node_ip", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "connection_type", kind: "enum", T: () => ["massa.model.v1.ConnectionType", ConnectionType, "CONNECTION_TYPE_"] }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message massa.model.v1.ConnectedNode
 */
export const ConnectedNode = new ConnectedNode$Type();
// @generated message type with reflection information, may provide speed optimized methods
class CompactConfig$Type extends MessageType<CompactConfig> {
    constructor() {
        super("massa.model.v1.CompactConfig", [
            { no: 1, name: "genesis_timestamp", kind: "message", T: () => NativeTime },
            { no: 2, name: "end_timestamp", kind: "message", T: () => NativeTime },
            { no: 3, name: "thread_count", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 4, name: "t0", kind: "message", T: () => NativeTime },
            { no: 5, name: "delta_f0", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 6, name: "operation_validity_periods", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 7, name: "periods_per_cycle", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 8, name: "block_reward", kind: "message", T: () => NativeAmount },
            { no: 9, name: "roll_price", kind: "message", T: () => NativeAmount },
            { no: 10, name: "max_block_size", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message massa.model.v1.CompactConfig
 */
export const CompactConfig = new CompactConfig$Type();
// @generated message type with reflection information, may provide speed optimized methods
class PublicStatus$Type extends MessageType<PublicStatus> {
    constructor() {
        super("massa.model.v1.PublicStatus", [
            { no: 1, name: "node_id", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "version", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 4, name: "current_time", kind: "message", T: () => NativeTime },
            { no: 5, name: "current_cycle", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 6, name: "current_cycle_time", kind: "message", T: () => NativeTime },
            { no: 7, name: "next_cycle_time", kind: "message", T: () => NativeTime },
            { no: 8, name: "last_executed_final_slot", kind: "message", T: () => Slot },
            { no: 9, name: "last_executed_speculative_slot", kind: "message", T: () => Slot },
            { no: 10, name: "final_state_fingerprint", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 11, name: "config", kind: "message", T: () => CompactConfig },
            { no: 12, name: "chain_id", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 13, name: "minimal_fees", kind: "message", T: () => NativeAmount },
            { no: 14, name: "current_mip_version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
}
/**
 * @generated MessageType for protobuf message massa.model.v1.PublicStatus
 */
export const PublicStatus = new PublicStatus$Type();
