import * as jspb from 'google-protobuf'

import * as massa_model_v1_time_pb from '../../../massa/model/v1/time_pb'; // proto import: "massa/model/v1/time.proto"


export class ConsensusStats extends jspb.Message {
  getStartTimespan(): massa_model_v1_time_pb.NativeTime | undefined;
  setStartTimespan(value?: massa_model_v1_time_pb.NativeTime): ConsensusStats;
  hasStartTimespan(): boolean;
  clearStartTimespan(): ConsensusStats;

  getEndTimespan(): massa_model_v1_time_pb.NativeTime | undefined;
  setEndTimespan(value?: massa_model_v1_time_pb.NativeTime): ConsensusStats;
  hasEndTimespan(): boolean;
  clearEndTimespan(): ConsensusStats;

  getFinalBlockCount(): number;
  setFinalBlockCount(value: number): ConsensusStats;

  getStaleBlockCount(): number;
  setStaleBlockCount(value: number): ConsensusStats;

  getCliqueCount(): number;
  setCliqueCount(value: number): ConsensusStats;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ConsensusStats.AsObject;
  static toObject(includeInstance: boolean, msg: ConsensusStats): ConsensusStats.AsObject;
  static serializeBinaryToWriter(message: ConsensusStats, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ConsensusStats;
  static deserializeBinaryFromReader(message: ConsensusStats, reader: jspb.BinaryReader): ConsensusStats;
}

export namespace ConsensusStats {
  export type AsObject = {
    startTimespan?: massa_model_v1_time_pb.NativeTime.AsObject,
    endTimespan?: massa_model_v1_time_pb.NativeTime.AsObject,
    finalBlockCount: number,
    staleBlockCount: number,
    cliqueCount: number,
  }
}

export class PoolStats extends jspb.Message {
  getEndorsementsCount(): number;
  setEndorsementsCount(value: number): PoolStats;

  getOperationsCount(): number;
  setOperationsCount(value: number): PoolStats;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PoolStats.AsObject;
  static toObject(includeInstance: boolean, msg: PoolStats): PoolStats.AsObject;
  static serializeBinaryToWriter(message: PoolStats, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PoolStats;
  static deserializeBinaryFromReader(message: PoolStats, reader: jspb.BinaryReader): PoolStats;
}

export namespace PoolStats {
  export type AsObject = {
    endorsementsCount: number,
    operationsCount: number,
  }
}

export class NetworkStats extends jspb.Message {
  getInConnectionCount(): number;
  setInConnectionCount(value: number): NetworkStats;

  getOutConnectionCount(): number;
  setOutConnectionCount(value: number): NetworkStats;

  getKnownPeerCount(): number;
  setKnownPeerCount(value: number): NetworkStats;

  getBannedPeerCount(): number;
  setBannedPeerCount(value: number): NetworkStats;

  getActiveNodeCount(): number;
  setActiveNodeCount(value: number): NetworkStats;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NetworkStats.AsObject;
  static toObject(includeInstance: boolean, msg: NetworkStats): NetworkStats.AsObject;
  static serializeBinaryToWriter(message: NetworkStats, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NetworkStats;
  static deserializeBinaryFromReader(message: NetworkStats, reader: jspb.BinaryReader): NetworkStats;
}

export namespace NetworkStats {
  export type AsObject = {
    inConnectionCount: number,
    outConnectionCount: number,
    knownPeerCount: number,
    bannedPeerCount: number,
    activeNodeCount: number,
  }
}

export class ExecutionStats extends jspb.Message {
  getTimeWindowStart(): massa_model_v1_time_pb.NativeTime | undefined;
  setTimeWindowStart(value?: massa_model_v1_time_pb.NativeTime): ExecutionStats;
  hasTimeWindowStart(): boolean;
  clearTimeWindowStart(): ExecutionStats;

  getTimeWindowEnd(): massa_model_v1_time_pb.NativeTime | undefined;
  setTimeWindowEnd(value?: massa_model_v1_time_pb.NativeTime): ExecutionStats;
  hasTimeWindowEnd(): boolean;
  clearTimeWindowEnd(): ExecutionStats;

  getFinalBlockCount(): number;
  setFinalBlockCount(value: number): ExecutionStats;

  getFinalExecutedOperationsCount(): number;
  setFinalExecutedOperationsCount(value: number): ExecutionStats;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionStats.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionStats): ExecutionStats.AsObject;
  static serializeBinaryToWriter(message: ExecutionStats, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionStats;
  static deserializeBinaryFromReader(message: ExecutionStats, reader: jspb.BinaryReader): ExecutionStats;
}

export namespace ExecutionStats {
  export type AsObject = {
    timeWindowStart?: massa_model_v1_time_pb.NativeTime.AsObject,
    timeWindowEnd?: massa_model_v1_time_pb.NativeTime.AsObject,
    finalBlockCount: number,
    finalExecutedOperationsCount: number,
  }
}

