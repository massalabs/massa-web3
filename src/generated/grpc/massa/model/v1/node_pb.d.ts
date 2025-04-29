import * as jspb from 'google-protobuf'

import * as massa_model_v1_amount_pb from '../../../massa/model/v1/amount_pb'; // proto import: "massa/model/v1/amount.proto"
import * as massa_model_v1_slot_pb from '../../../massa/model/v1/slot_pb'; // proto import: "massa/model/v1/slot.proto"
import * as massa_model_v1_stats_pb from '../../../massa/model/v1/stats_pb'; // proto import: "massa/model/v1/stats.proto"
import * as massa_model_v1_time_pb from '../../../massa/model/v1/time_pb'; // proto import: "massa/model/v1/time.proto"


export class NodeStatus extends jspb.Message {
  getNodeId(): string;
  setNodeId(value: string): NodeStatus;

  getNodeIp(): string;
  setNodeIp(value: string): NodeStatus;

  getVersion(): string;
  setVersion(value: string): NodeStatus;

  getCurrentTime(): massa_model_v1_time_pb.NativeTime | undefined;
  setCurrentTime(value?: massa_model_v1_time_pb.NativeTime): NodeStatus;
  hasCurrentTime(): boolean;
  clearCurrentTime(): NodeStatus;

  getCurrentCycle(): number;
  setCurrentCycle(value: number): NodeStatus;

  getCurrentCycleTime(): massa_model_v1_time_pb.NativeTime | undefined;
  setCurrentCycleTime(value?: massa_model_v1_time_pb.NativeTime): NodeStatus;
  hasCurrentCycleTime(): boolean;
  clearCurrentCycleTime(): NodeStatus;

  getNextCycleTime(): massa_model_v1_time_pb.NativeTime | undefined;
  setNextCycleTime(value?: massa_model_v1_time_pb.NativeTime): NodeStatus;
  hasNextCycleTime(): boolean;
  clearNextCycleTime(): NodeStatus;

  getConnectedNodesList(): Array<ConnectedNode>;
  setConnectedNodesList(value: Array<ConnectedNode>): NodeStatus;
  clearConnectedNodesList(): NodeStatus;
  addConnectedNodes(value?: ConnectedNode, index?: number): ConnectedNode;

  getLastExecutedFinalSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setLastExecutedFinalSlot(value?: massa_model_v1_slot_pb.Slot): NodeStatus;
  hasLastExecutedFinalSlot(): boolean;
  clearLastExecutedFinalSlot(): NodeStatus;

  getLastExecutedSpeculativeSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setLastExecutedSpeculativeSlot(value?: massa_model_v1_slot_pb.Slot): NodeStatus;
  hasLastExecutedSpeculativeSlot(): boolean;
  clearLastExecutedSpeculativeSlot(): NodeStatus;

  getFinalStateFingerprint(): string;
  setFinalStateFingerprint(value: string): NodeStatus;

  getConsensusStats(): massa_model_v1_stats_pb.ConsensusStats | undefined;
  setConsensusStats(value?: massa_model_v1_stats_pb.ConsensusStats): NodeStatus;
  hasConsensusStats(): boolean;
  clearConsensusStats(): NodeStatus;

  getPoolStats(): massa_model_v1_stats_pb.PoolStats | undefined;
  setPoolStats(value?: massa_model_v1_stats_pb.PoolStats): NodeStatus;
  hasPoolStats(): boolean;
  clearPoolStats(): NodeStatus;

  getNetworkStats(): massa_model_v1_stats_pb.NetworkStats | undefined;
  setNetworkStats(value?: massa_model_v1_stats_pb.NetworkStats): NodeStatus;
  hasNetworkStats(): boolean;
  clearNetworkStats(): NodeStatus;

  getExecutionStats(): massa_model_v1_stats_pb.ExecutionStats | undefined;
  setExecutionStats(value?: massa_model_v1_stats_pb.ExecutionStats): NodeStatus;
  hasExecutionStats(): boolean;
  clearExecutionStats(): NodeStatus;

  getConfig(): CompactConfig | undefined;
  setConfig(value?: CompactConfig): NodeStatus;
  hasConfig(): boolean;
  clearConfig(): NodeStatus;

  getChainId(): number;
  setChainId(value: number): NodeStatus;

  getCurrentMipVersion(): number;
  setCurrentMipVersion(value: number): NodeStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NodeStatus.AsObject;
  static toObject(includeInstance: boolean, msg: NodeStatus): NodeStatus.AsObject;
  static serializeBinaryToWriter(message: NodeStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NodeStatus;
  static deserializeBinaryFromReader(message: NodeStatus, reader: jspb.BinaryReader): NodeStatus;
}

export namespace NodeStatus {
  export type AsObject = {
    nodeId: string,
    nodeIp: string,
    version: string,
    currentTime?: massa_model_v1_time_pb.NativeTime.AsObject,
    currentCycle: number,
    currentCycleTime?: massa_model_v1_time_pb.NativeTime.AsObject,
    nextCycleTime?: massa_model_v1_time_pb.NativeTime.AsObject,
    connectedNodesList: Array<ConnectedNode.AsObject>,
    lastExecutedFinalSlot?: massa_model_v1_slot_pb.Slot.AsObject,
    lastExecutedSpeculativeSlot?: massa_model_v1_slot_pb.Slot.AsObject,
    finalStateFingerprint: string,
    consensusStats?: massa_model_v1_stats_pb.ConsensusStats.AsObject,
    poolStats?: massa_model_v1_stats_pb.PoolStats.AsObject,
    networkStats?: massa_model_v1_stats_pb.NetworkStats.AsObject,
    executionStats?: massa_model_v1_stats_pb.ExecutionStats.AsObject,
    config?: CompactConfig.AsObject,
    chainId: number,
    currentMipVersion: number,
  }
}

export class ConnectedNode extends jspb.Message {
  getNodeId(): string;
  setNodeId(value: string): ConnectedNode;

  getNodeIp(): string;
  setNodeIp(value: string): ConnectedNode;

  getConnectionType(): ConnectionType;
  setConnectionType(value: ConnectionType): ConnectedNode;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConnectedNode.AsObject;
  static toObject(includeInstance: boolean, msg: ConnectedNode): ConnectedNode.AsObject;
  static serializeBinaryToWriter(message: ConnectedNode, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConnectedNode;
  static deserializeBinaryFromReader(message: ConnectedNode, reader: jspb.BinaryReader): ConnectedNode;
}

export namespace ConnectedNode {
  export type AsObject = {
    nodeId: string,
    nodeIp: string,
    connectionType: ConnectionType,
  }
}

export class CompactConfig extends jspb.Message {
  getGenesisTimestamp(): massa_model_v1_time_pb.NativeTime | undefined;
  setGenesisTimestamp(value?: massa_model_v1_time_pb.NativeTime): CompactConfig;
  hasGenesisTimestamp(): boolean;
  clearGenesisTimestamp(): CompactConfig;

  getEndTimestamp(): massa_model_v1_time_pb.NativeTime | undefined;
  setEndTimestamp(value?: massa_model_v1_time_pb.NativeTime): CompactConfig;
  hasEndTimestamp(): boolean;
  clearEndTimestamp(): CompactConfig;

  getThreadCount(): number;
  setThreadCount(value: number): CompactConfig;

  getT0(): massa_model_v1_time_pb.NativeTime | undefined;
  setT0(value?: massa_model_v1_time_pb.NativeTime): CompactConfig;
  hasT0(): boolean;
  clearT0(): CompactConfig;

  getDeltaF0(): number;
  setDeltaF0(value: number): CompactConfig;

  getOperationValidityPeriods(): number;
  setOperationValidityPeriods(value: number): CompactConfig;

  getPeriodsPerCycle(): number;
  setPeriodsPerCycle(value: number): CompactConfig;

  getBlockReward(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setBlockReward(value?: massa_model_v1_amount_pb.NativeAmount): CompactConfig;
  hasBlockReward(): boolean;
  clearBlockReward(): CompactConfig;

  getRollPrice(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setRollPrice(value?: massa_model_v1_amount_pb.NativeAmount): CompactConfig;
  hasRollPrice(): boolean;
  clearRollPrice(): CompactConfig;

  getMaxBlockSize(): number;
  setMaxBlockSize(value: number): CompactConfig;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CompactConfig.AsObject;
  static toObject(includeInstance: boolean, msg: CompactConfig): CompactConfig.AsObject;
  static serializeBinaryToWriter(message: CompactConfig, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CompactConfig;
  static deserializeBinaryFromReader(message: CompactConfig, reader: jspb.BinaryReader): CompactConfig;
}

export namespace CompactConfig {
  export type AsObject = {
    genesisTimestamp?: massa_model_v1_time_pb.NativeTime.AsObject,
    endTimestamp?: massa_model_v1_time_pb.NativeTime.AsObject,
    threadCount: number,
    t0?: massa_model_v1_time_pb.NativeTime.AsObject,
    deltaF0: number,
    operationValidityPeriods: number,
    periodsPerCycle: number,
    blockReward?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    rollPrice?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    maxBlockSize: number,
  }
}

export class PublicStatus extends jspb.Message {
  getNodeId(): string;
  setNodeId(value: string): PublicStatus;

  getVersion(): string;
  setVersion(value: string): PublicStatus;

  getCurrentTime(): massa_model_v1_time_pb.NativeTime | undefined;
  setCurrentTime(value?: massa_model_v1_time_pb.NativeTime): PublicStatus;
  hasCurrentTime(): boolean;
  clearCurrentTime(): PublicStatus;

  getCurrentCycle(): number;
  setCurrentCycle(value: number): PublicStatus;

  getCurrentCycleTime(): massa_model_v1_time_pb.NativeTime | undefined;
  setCurrentCycleTime(value?: massa_model_v1_time_pb.NativeTime): PublicStatus;
  hasCurrentCycleTime(): boolean;
  clearCurrentCycleTime(): PublicStatus;

  getNextCycleTime(): massa_model_v1_time_pb.NativeTime | undefined;
  setNextCycleTime(value?: massa_model_v1_time_pb.NativeTime): PublicStatus;
  hasNextCycleTime(): boolean;
  clearNextCycleTime(): PublicStatus;

  getLastExecutedFinalSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setLastExecutedFinalSlot(value?: massa_model_v1_slot_pb.Slot): PublicStatus;
  hasLastExecutedFinalSlot(): boolean;
  clearLastExecutedFinalSlot(): PublicStatus;

  getLastExecutedSpeculativeSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setLastExecutedSpeculativeSlot(value?: massa_model_v1_slot_pb.Slot): PublicStatus;
  hasLastExecutedSpeculativeSlot(): boolean;
  clearLastExecutedSpeculativeSlot(): PublicStatus;

  getFinalStateFingerprint(): string;
  setFinalStateFingerprint(value: string): PublicStatus;

  getConfig(): CompactConfig | undefined;
  setConfig(value?: CompactConfig): PublicStatus;
  hasConfig(): boolean;
  clearConfig(): PublicStatus;

  getChainId(): number;
  setChainId(value: number): PublicStatus;

  getMinimalFees(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setMinimalFees(value?: massa_model_v1_amount_pb.NativeAmount): PublicStatus;
  hasMinimalFees(): boolean;
  clearMinimalFees(): PublicStatus;

  getCurrentMipVersion(): number;
  setCurrentMipVersion(value: number): PublicStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PublicStatus.AsObject;
  static toObject(includeInstance: boolean, msg: PublicStatus): PublicStatus.AsObject;
  static serializeBinaryToWriter(message: PublicStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PublicStatus;
  static deserializeBinaryFromReader(message: PublicStatus, reader: jspb.BinaryReader): PublicStatus;
}

export namespace PublicStatus {
  export type AsObject = {
    nodeId: string,
    version: string,
    currentTime?: massa_model_v1_time_pb.NativeTime.AsObject,
    currentCycle: number,
    currentCycleTime?: massa_model_v1_time_pb.NativeTime.AsObject,
    nextCycleTime?: massa_model_v1_time_pb.NativeTime.AsObject,
    lastExecutedFinalSlot?: massa_model_v1_slot_pb.Slot.AsObject,
    lastExecutedSpeculativeSlot?: massa_model_v1_slot_pb.Slot.AsObject,
    finalStateFingerprint: string,
    config?: CompactConfig.AsObject,
    chainId: number,
    minimalFees?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    currentMipVersion: number,
  }
}

export enum ConnectionType { 
  CONNECTION_TYPE_UNSPECIFIED = 0,
  CONNECTION_TYPE_INCOMING = 1,
  CONNECTION_TYPE_OUTGOING = 2,
}
