/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Block, FilledBlock, SignedBlock, SignedBlockHeader } from "./block";
import { SecureShare } from "./common";
import { Status } from "./google/rpc/status";
import { SignedOperation } from "./operation";
import { IndexedSlot, Slot } from "./slot";

export const protobufPackage = "massa.api.v1";

/** Operation type enum */
export enum OpType {
  /** OP_TYPE_UNSPECIFIED - Defaut enum value */
  OP_TYPE_UNSPECIFIED = 0,
  /** OP_TYPE_TRANSACTION - Transaction */
  OP_TYPE_TRANSACTION = 1,
  /** OP_TYPE_ROLL_BUY - Roll buy */
  OP_TYPE_ROLL_BUY = 2,
  /** OP_TYPE_ROLL_SELL - Roll sell */
  OP_TYPE_ROLL_SELL = 3,
  /** OP_TYPE_EXECUTE_SC - Execute smart contract */
  OP_TYPE_EXECUTE_SC = 4,
  /** OP_TYPE_CALL_SC - Call smart contract */
  OP_TYPE_CALL_SC = 5,
  UNRECOGNIZED = -1,
}

export function opTypeFromJSON(object: any): OpType {
  switch (object) {
    case 0:
    case "OP_TYPE_UNSPECIFIED":
      return OpType.OP_TYPE_UNSPECIFIED;
    case 1:
    case "OP_TYPE_TRANSACTION":
      return OpType.OP_TYPE_TRANSACTION;
    case 2:
    case "OP_TYPE_ROLL_BUY":
      return OpType.OP_TYPE_ROLL_BUY;
    case 3:
    case "OP_TYPE_ROLL_SELL":
      return OpType.OP_TYPE_ROLL_SELL;
    case 4:
    case "OP_TYPE_EXECUTE_SC":
      return OpType.OP_TYPE_EXECUTE_SC;
    case 5:
    case "OP_TYPE_CALL_SC":
      return OpType.OP_TYPE_CALL_SC;
    case -1:
    case "UNRECOGNIZED":
    default:
      return OpType.UNRECOGNIZED;
  }
}

export function opTypeToJSON(object: OpType): string {
  switch (object) {
    case OpType.OP_TYPE_UNSPECIFIED:
      return "OP_TYPE_UNSPECIFIED";
    case OpType.OP_TYPE_TRANSACTION:
      return "OP_TYPE_TRANSACTION";
    case OpType.OP_TYPE_ROLL_BUY:
      return "OP_TYPE_ROLL_BUY";
    case OpType.OP_TYPE_ROLL_SELL:
      return "OP_TYPE_ROLL_SELL";
    case OpType.OP_TYPE_EXECUTE_SC:
      return "OP_TYPE_EXECUTE_SC";
    case OpType.OP_TYPE_CALL_SC:
      return "OP_TYPE_CALL_SC";
    case OpType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** GetBlocksBySlotsRequest holds request for GetBlocksBySlots */
export interface GetBlocksBySlotsRequest {
  /** Request id */
  id: string;
  /** Slots */
  slots: Slot[];
}

/** GetBlocksBySlotsResponse holds response from GetBlocksBySlots */
export interface GetBlocksBySlotsResponse {
  /** Request id */
  id: string;
  /** Blocks */
  blocks: Block[];
}

/** GetDatastoreEntriesRequest holds request from GetDatastoreEntries */
export interface GetDatastoreEntriesRequest {
  /** Request id */
  id: string;
  /** Queries */
  queries: DatastoreEntriesQuery[];
}

/** DatastoreEntries Query */
export interface DatastoreEntriesQuery {
  /** Filter */
  filter: DatastoreEntryFilter | undefined;
}

export interface DatastoreEntryFilter {
  /** / Associated address of the entry */
  address: string;
  /** Datastore key */
  key: Uint8Array;
}

/** GetDatastoreEntriesResponse holds response from GetDatastoreEntries */
export interface GetDatastoreEntriesResponse {
  /** Request id */
  id: string;
  /** Datastore entries */
  entries: DatastoreEntry[];
}

/** DatastoreEntry */
export interface DatastoreEntry {
  /** final datastore entry value */
  finalValue: Uint8Array;
  /** candidate_value datastore entry value */
  candidateValue: Uint8Array;
}

/** GetNextBlockBestParentsRequest holds request for GetNextBlockBestParents */
export interface GetNextBlockBestParentsRequest {
  /** Request id */
  id: string;
}

/** GetNextBlockBestParentsResponse holds response from GetNextBlockBestParents */
export interface GetNextBlockBestParentsResponse {
  /** Request id */
  id: string;
  /** Best parents */
  parents: BlockParent[];
}

/** Block parent tuple */
export interface BlockParent {
  /** Block id */
  blockId: string;
  /** Period */
  period: number;
}

/** GetSelectorDrawsRequest holds request from GetSelectorDraws */
export interface GetSelectorDrawsRequest {
  /** Request id */
  id: string;
  /** Queries */
  queries: SelectorDrawsQuery[];
}

/** SelectorDraws Query */
export interface SelectorDrawsQuery {
  /** Filter */
  filter: SelectorDrawsFilter | undefined;
}

/** SelectorDraws Filter */
export interface SelectorDrawsFilter {
  /** Address */
  address: string;
}

/** GetSelectorDrawsResponse holds response from GetSelectorDraws */
export interface GetSelectorDrawsResponse {
  /** Request id */
  id: string;
  /** Selector draws */
  selectorDraws: SelectorDraws[];
}

/** Selector draws */
export interface SelectorDraws {
  /** Address */
  address: string;
  /** Next block draws */
  nextBlockDraws: Slot[];
  /** Next endorsements draws */
  nextEndorsementDraws: IndexedSlot[];
}

/** GetTransactionsThroughputRequest holds request for GetTransactionsThroughput */
export interface GetTransactionsThroughputRequest {
  /** Request id */
  id: string;
}

/** GetTransactionsThroughputResponse holds response from GetTransactionsThroughput */
export interface GetTransactionsThroughputResponse {
  /** Request id */
  id: string;
  /** Transactions throughput */
  throughput: number;
}

/** GetVersionRequest holds request from GetVersion */
export interface GetVersionRequest {
  /** Request id */
  id: string;
}

/** GetVersionResponse holds response from GetVersion */
export interface GetVersionResponse {
  /** Request id */
  id: string;
  /** Version */
  version: string;
}

/** NewBlocksRequest holds request for NewBlocks */
export interface NewBlocksRequest {
  /** Request id */
  id: string;
}

/** NewBlocksResponse holds response from NewBlocks */
export interface NewBlocksResponse {
  /** Request id */
  id: string;
  /** Signed block */
  block: SignedBlock | undefined;
}

/** NewBlocksHeadersRequest holds request for NewBlocksHeaders */
export interface NewBlocksHeadersRequest {
  /** Request id */
  id: string;
}

/** NewBlocksHeadersResponse holds response from NewBlocksHeaders */
export interface NewBlocksHeadersResponse {
  /** Request id */
  id: string;
  /** Signed block header */
  blockHeader: SignedBlockHeader | undefined;
}

/** NewFilledBlocksRequest holds request for NewFilledBlocks */
export interface NewFilledBlocksRequest {
  /** Request id */
  id: string;
}

/** NewFilledBlocksResponse holds response from NewFilledBlocks */
export interface NewFilledBlocksResponse {
  /** Request id */
  id: string;
  /** Block with operations content */
  filledBlock: FilledBlock | undefined;
}

/** NewOperationsRequest holds request for NewOperations */
export interface NewOperationsRequest {
  /** Request id */
  id: string;
  /** Query */
  query: NewOperationsQuery | undefined;
}

/** NewOperations Query */
export interface NewOperationsQuery {
  /** Filter */
  filter: NewOperationsFilter | undefined;
}

/** NewOperations Filter */
export interface NewOperationsFilter {
  /** Operation type enum */
  types: OpType[];
}

/** NewOperationsResponse holds response from NewOperations */
export interface NewOperationsResponse {
  /** Request id */
  id: string;
  /** Signed operation */
  operation: SignedOperation | undefined;
}

/** SendBlocksRequest holds parameters to SendBlocks */
export interface SendBlocksRequest {
  /** Request id */
  id: string;
  /** Secure shared block */
  block: SecureShare | undefined;
}

/** SendBlocksResponse holds response from SendBlocks */
export interface SendBlocksResponse {
  /** Request id */
  id: string;
  /** Block result */
  result?:
    | BlockResult
    | undefined;
  /** gRPC error(status) */
  error?: Status | undefined;
}

/** Holds Block response */
export interface BlockResult {
  /** Block id */
  blockId: string;
}

/** SendEndorsementsRequest holds parameters to SendEndorsements */
export interface SendEndorsementsRequest {
  /** Request id */
  id: string;
  /** Secure shared endorsements */
  endorsements: SecureShare[];
}

/** SendEndorsementsResponse holds response from SendEndorsements */
export interface SendEndorsementsResponse {
  /** Request id */
  id: string;
  /** Endorsement result */
  result?:
    | EndorsementResult
    | undefined;
  /** gRPC error(status) */
  error?: Status | undefined;
}

/** Holds Endorsement response */
export interface EndorsementResult {
  /** Endorsements ids */
  endorsementsIds: string[];
}

/** SendOperationsRequest holds parameters to SendOperations */
export interface SendOperationsRequest {
  /** Request id */
  id: string;
  /** Secured shared operations */
  operations: SecureShare[];
}

/** SendOperationsResponse holds response from SendOperations */
export interface SendOperationsResponse {
  /** Request id */
  id: string;
  /** Operation result */
  result?:
    | OperationResult
    | undefined;
  /** gRPC error(status) */
  error?: Status | undefined;
}

/** Holds Operation response */
export interface OperationResult {
  /** Operation(s) id(s) */
  operationsIds: string[];
}

/** TransactionsThroughputRequest holds request for TransactionsThroughput */
export interface TransactionsThroughputRequest {
  /** Request id */
  id: string;
  /** Optional timer interval in sec. Defaults to 10s */
  interval?: number | undefined;
}

/** TransactionsThroughputResponse holds response from TransactionsThroughput */
export interface TransactionsThroughputResponse {
  /** Request id */
  id: string;
  /** Transactions throughput */
  throughput: number;
}

function createBaseGetBlocksBySlotsRequest(): GetBlocksBySlotsRequest {
  return { id: "", slots: [] };
}

export const GetBlocksBySlotsRequest = {
  encode(message: GetBlocksBySlotsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.slots) {
      Slot.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBlocksBySlotsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlocksBySlotsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.slots.push(Slot.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBlocksBySlotsRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      slots: Array.isArray(object?.slots) ? object.slots.map((e: any) => Slot.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetBlocksBySlotsRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.slots) {
      obj.slots = message.slots.map((e) => e ? Slot.toJSON(e) : undefined);
    } else {
      obj.slots = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBlocksBySlotsRequest>, I>>(base?: I): GetBlocksBySlotsRequest {
    return GetBlocksBySlotsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetBlocksBySlotsRequest>, I>>(object: I): GetBlocksBySlotsRequest {
    const message = createBaseGetBlocksBySlotsRequest();
    message.id = object.id ?? "";
    message.slots = object.slots?.map((e) => Slot.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetBlocksBySlotsResponse(): GetBlocksBySlotsResponse {
  return { id: "", blocks: [] };
}

export const GetBlocksBySlotsResponse = {
  encode(message: GetBlocksBySlotsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.blocks) {
      Block.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetBlocksBySlotsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetBlocksBySlotsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.blocks.push(Block.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetBlocksBySlotsResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      blocks: Array.isArray(object?.blocks) ? object.blocks.map((e: any) => Block.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetBlocksBySlotsResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.blocks) {
      obj.blocks = message.blocks.map((e) => e ? Block.toJSON(e) : undefined);
    } else {
      obj.blocks = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetBlocksBySlotsResponse>, I>>(base?: I): GetBlocksBySlotsResponse {
    return GetBlocksBySlotsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetBlocksBySlotsResponse>, I>>(object: I): GetBlocksBySlotsResponse {
    const message = createBaseGetBlocksBySlotsResponse();
    message.id = object.id ?? "";
    message.blocks = object.blocks?.map((e) => Block.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetDatastoreEntriesRequest(): GetDatastoreEntriesRequest {
  return { id: "", queries: [] };
}

export const GetDatastoreEntriesRequest = {
  encode(message: GetDatastoreEntriesRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.queries) {
      DatastoreEntriesQuery.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDatastoreEntriesRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDatastoreEntriesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.queries.push(DatastoreEntriesQuery.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDatastoreEntriesRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      queries: Array.isArray(object?.queries) ? object.queries.map((e: any) => DatastoreEntriesQuery.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetDatastoreEntriesRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.queries) {
      obj.queries = message.queries.map((e) => e ? DatastoreEntriesQuery.toJSON(e) : undefined);
    } else {
      obj.queries = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDatastoreEntriesRequest>, I>>(base?: I): GetDatastoreEntriesRequest {
    return GetDatastoreEntriesRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetDatastoreEntriesRequest>, I>>(object: I): GetDatastoreEntriesRequest {
    const message = createBaseGetDatastoreEntriesRequest();
    message.id = object.id ?? "";
    message.queries = object.queries?.map((e) => DatastoreEntriesQuery.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDatastoreEntriesQuery(): DatastoreEntriesQuery {
  return { filter: undefined };
}

export const DatastoreEntriesQuery = {
  encode(message: DatastoreEntriesQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      DatastoreEntryFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatastoreEntriesQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatastoreEntriesQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.filter = DatastoreEntryFilter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatastoreEntriesQuery {
    return { filter: isSet(object.filter) ? DatastoreEntryFilter.fromJSON(object.filter) : undefined };
  },

  toJSON(message: DatastoreEntriesQuery): unknown {
    const obj: any = {};
    message.filter !== undefined &&
      (obj.filter = message.filter ? DatastoreEntryFilter.toJSON(message.filter) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<DatastoreEntriesQuery>, I>>(base?: I): DatastoreEntriesQuery {
    return DatastoreEntriesQuery.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DatastoreEntriesQuery>, I>>(object: I): DatastoreEntriesQuery {
    const message = createBaseDatastoreEntriesQuery();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? DatastoreEntryFilter.fromPartial(object.filter)
      : undefined;
    return message;
  },
};

function createBaseDatastoreEntryFilter(): DatastoreEntryFilter {
  return { address: "", key: new Uint8Array() };
}

export const DatastoreEntryFilter = {
  encode(message: DatastoreEntryFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.key.length !== 0) {
      writer.uint32(18).bytes(message.key);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatastoreEntryFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatastoreEntryFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.key = reader.bytes();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatastoreEntryFilter {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
    };
  },

  toJSON(message: DatastoreEntryFilter): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    message.key !== undefined &&
      (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<DatastoreEntryFilter>, I>>(base?: I): DatastoreEntryFilter {
    return DatastoreEntryFilter.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DatastoreEntryFilter>, I>>(object: I): DatastoreEntryFilter {
    const message = createBaseDatastoreEntryFilter();
    message.address = object.address ?? "";
    message.key = object.key ?? new Uint8Array();
    return message;
  },
};

function createBaseGetDatastoreEntriesResponse(): GetDatastoreEntriesResponse {
  return { id: "", entries: [] };
}

export const GetDatastoreEntriesResponse = {
  encode(message: GetDatastoreEntriesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.entries) {
      DatastoreEntry.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetDatastoreEntriesResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetDatastoreEntriesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.entries.push(DatastoreEntry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetDatastoreEntriesResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      entries: Array.isArray(object?.entries) ? object.entries.map((e: any) => DatastoreEntry.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetDatastoreEntriesResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.entries) {
      obj.entries = message.entries.map((e) => e ? DatastoreEntry.toJSON(e) : undefined);
    } else {
      obj.entries = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetDatastoreEntriesResponse>, I>>(base?: I): GetDatastoreEntriesResponse {
    return GetDatastoreEntriesResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetDatastoreEntriesResponse>, I>>(object: I): GetDatastoreEntriesResponse {
    const message = createBaseGetDatastoreEntriesResponse();
    message.id = object.id ?? "";
    message.entries = object.entries?.map((e) => DatastoreEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDatastoreEntry(): DatastoreEntry {
  return { finalValue: new Uint8Array(), candidateValue: new Uint8Array() };
}

export const DatastoreEntry = {
  encode(message: DatastoreEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.finalValue.length !== 0) {
      writer.uint32(10).bytes(message.finalValue);
    }
    if (message.candidateValue.length !== 0) {
      writer.uint32(18).bytes(message.candidateValue);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DatastoreEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDatastoreEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.finalValue = reader.bytes();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.candidateValue = reader.bytes();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DatastoreEntry {
    return {
      finalValue: isSet(object.finalValue) ? bytesFromBase64(object.finalValue) : new Uint8Array(),
      candidateValue: isSet(object.candidateValue) ? bytesFromBase64(object.candidateValue) : new Uint8Array(),
    };
  },

  toJSON(message: DatastoreEntry): unknown {
    const obj: any = {};
    message.finalValue !== undefined &&
      (obj.finalValue = base64FromBytes(message.finalValue !== undefined ? message.finalValue : new Uint8Array()));
    message.candidateValue !== undefined &&
      (obj.candidateValue = base64FromBytes(
        message.candidateValue !== undefined ? message.candidateValue : new Uint8Array(),
      ));
    return obj;
  },

  create<I extends Exact<DeepPartial<DatastoreEntry>, I>>(base?: I): DatastoreEntry {
    return DatastoreEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<DatastoreEntry>, I>>(object: I): DatastoreEntry {
    const message = createBaseDatastoreEntry();
    message.finalValue = object.finalValue ?? new Uint8Array();
    message.candidateValue = object.candidateValue ?? new Uint8Array();
    return message;
  },
};

function createBaseGetNextBlockBestParentsRequest(): GetNextBlockBestParentsRequest {
  return { id: "" };
}

export const GetNextBlockBestParentsRequest = {
  encode(message: GetNextBlockBestParentsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNextBlockBestParentsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNextBlockBestParentsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetNextBlockBestParentsRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: GetNextBlockBestParentsRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetNextBlockBestParentsRequest>, I>>(base?: I): GetNextBlockBestParentsRequest {
    return GetNextBlockBestParentsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetNextBlockBestParentsRequest>, I>>(
    object: I,
  ): GetNextBlockBestParentsRequest {
    const message = createBaseGetNextBlockBestParentsRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetNextBlockBestParentsResponse(): GetNextBlockBestParentsResponse {
  return { id: "", parents: [] };
}

export const GetNextBlockBestParentsResponse = {
  encode(message: GetNextBlockBestParentsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.parents) {
      BlockParent.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetNextBlockBestParentsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetNextBlockBestParentsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.parents.push(BlockParent.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetNextBlockBestParentsResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      parents: Array.isArray(object?.parents) ? object.parents.map((e: any) => BlockParent.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetNextBlockBestParentsResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.parents) {
      obj.parents = message.parents.map((e) => e ? BlockParent.toJSON(e) : undefined);
    } else {
      obj.parents = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetNextBlockBestParentsResponse>, I>>(base?: I): GetNextBlockBestParentsResponse {
    return GetNextBlockBestParentsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetNextBlockBestParentsResponse>, I>>(
    object: I,
  ): GetNextBlockBestParentsResponse {
    const message = createBaseGetNextBlockBestParentsResponse();
    message.id = object.id ?? "";
    message.parents = object.parents?.map((e) => BlockParent.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlockParent(): BlockParent {
  return { blockId: "", period: 0 };
}

export const BlockParent = {
  encode(message: BlockParent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.blockId !== "") {
      writer.uint32(10).string(message.blockId);
    }
    if (message.period !== 0) {
      writer.uint32(17).fixed64(message.period);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockParent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockParent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.blockId = reader.string();
          continue;
        case 2:
          if (tag != 17) {
            break;
          }

          message.period = longToNumber(reader.fixed64() as Long);
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockParent {
    return {
      blockId: isSet(object.blockId) ? String(object.blockId) : "",
      period: isSet(object.period) ? Number(object.period) : 0,
    };
  },

  toJSON(message: BlockParent): unknown {
    const obj: any = {};
    message.blockId !== undefined && (obj.blockId = message.blockId);
    message.period !== undefined && (obj.period = Math.round(message.period));
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockParent>, I>>(base?: I): BlockParent {
    return BlockParent.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BlockParent>, I>>(object: I): BlockParent {
    const message = createBaseBlockParent();
    message.blockId = object.blockId ?? "";
    message.period = object.period ?? 0;
    return message;
  },
};

function createBaseGetSelectorDrawsRequest(): GetSelectorDrawsRequest {
  return { id: "", queries: [] };
}

export const GetSelectorDrawsRequest = {
  encode(message: GetSelectorDrawsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.queries) {
      SelectorDrawsQuery.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSelectorDrawsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSelectorDrawsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.queries.push(SelectorDrawsQuery.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSelectorDrawsRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      queries: Array.isArray(object?.queries) ? object.queries.map((e: any) => SelectorDrawsQuery.fromJSON(e)) : [],
    };
  },

  toJSON(message: GetSelectorDrawsRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.queries) {
      obj.queries = message.queries.map((e) => e ? SelectorDrawsQuery.toJSON(e) : undefined);
    } else {
      obj.queries = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSelectorDrawsRequest>, I>>(base?: I): GetSelectorDrawsRequest {
    return GetSelectorDrawsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetSelectorDrawsRequest>, I>>(object: I): GetSelectorDrawsRequest {
    const message = createBaseGetSelectorDrawsRequest();
    message.id = object.id ?? "";
    message.queries = object.queries?.map((e) => SelectorDrawsQuery.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSelectorDrawsQuery(): SelectorDrawsQuery {
  return { filter: undefined };
}

export const SelectorDrawsQuery = {
  encode(message: SelectorDrawsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      SelectorDrawsFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelectorDrawsQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelectorDrawsQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.filter = SelectorDrawsFilter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SelectorDrawsQuery {
    return { filter: isSet(object.filter) ? SelectorDrawsFilter.fromJSON(object.filter) : undefined };
  },

  toJSON(message: SelectorDrawsQuery): unknown {
    const obj: any = {};
    message.filter !== undefined &&
      (obj.filter = message.filter ? SelectorDrawsFilter.toJSON(message.filter) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<SelectorDrawsQuery>, I>>(base?: I): SelectorDrawsQuery {
    return SelectorDrawsQuery.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SelectorDrawsQuery>, I>>(object: I): SelectorDrawsQuery {
    const message = createBaseSelectorDrawsQuery();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? SelectorDrawsFilter.fromPartial(object.filter)
      : undefined;
    return message;
  },
};

function createBaseSelectorDrawsFilter(): SelectorDrawsFilter {
  return { address: "" };
}

export const SelectorDrawsFilter = {
  encode(message: SelectorDrawsFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelectorDrawsFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelectorDrawsFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.address = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SelectorDrawsFilter {
    return { address: isSet(object.address) ? String(object.address) : "" };
  },

  toJSON(message: SelectorDrawsFilter): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    return obj;
  },

  create<I extends Exact<DeepPartial<SelectorDrawsFilter>, I>>(base?: I): SelectorDrawsFilter {
    return SelectorDrawsFilter.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SelectorDrawsFilter>, I>>(object: I): SelectorDrawsFilter {
    const message = createBaseSelectorDrawsFilter();
    message.address = object.address ?? "";
    return message;
  },
};

function createBaseGetSelectorDrawsResponse(): GetSelectorDrawsResponse {
  return { id: "", selectorDraws: [] };
}

export const GetSelectorDrawsResponse = {
  encode(message: GetSelectorDrawsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.selectorDraws) {
      SelectorDraws.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetSelectorDrawsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetSelectorDrawsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.selectorDraws.push(SelectorDraws.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetSelectorDrawsResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      selectorDraws: Array.isArray(object?.selectorDraws)
        ? object.selectorDraws.map((e: any) => SelectorDraws.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetSelectorDrawsResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.selectorDraws) {
      obj.selectorDraws = message.selectorDraws.map((e) => e ? SelectorDraws.toJSON(e) : undefined);
    } else {
      obj.selectorDraws = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetSelectorDrawsResponse>, I>>(base?: I): GetSelectorDrawsResponse {
    return GetSelectorDrawsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetSelectorDrawsResponse>, I>>(object: I): GetSelectorDrawsResponse {
    const message = createBaseGetSelectorDrawsResponse();
    message.id = object.id ?? "";
    message.selectorDraws = object.selectorDraws?.map((e) => SelectorDraws.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSelectorDraws(): SelectorDraws {
  return { address: "", nextBlockDraws: [], nextEndorsementDraws: [] };
}

export const SelectorDraws = {
  encode(message: SelectorDraws, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.nextBlockDraws) {
      Slot.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.nextEndorsementDraws) {
      IndexedSlot.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SelectorDraws {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSelectorDraws();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.address = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.nextBlockDraws.push(Slot.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.nextEndorsementDraws.push(IndexedSlot.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SelectorDraws {
    return {
      address: isSet(object.address) ? String(object.address) : "",
      nextBlockDraws: Array.isArray(object?.nextBlockDraws)
        ? object.nextBlockDraws.map((e: any) => Slot.fromJSON(e))
        : [],
      nextEndorsementDraws: Array.isArray(object?.nextEndorsementDraws)
        ? object.nextEndorsementDraws.map((e: any) => IndexedSlot.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SelectorDraws): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.nextBlockDraws) {
      obj.nextBlockDraws = message.nextBlockDraws.map((e) => e ? Slot.toJSON(e) : undefined);
    } else {
      obj.nextBlockDraws = [];
    }
    if (message.nextEndorsementDraws) {
      obj.nextEndorsementDraws = message.nextEndorsementDraws.map((e) => e ? IndexedSlot.toJSON(e) : undefined);
    } else {
      obj.nextEndorsementDraws = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SelectorDraws>, I>>(base?: I): SelectorDraws {
    return SelectorDraws.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SelectorDraws>, I>>(object: I): SelectorDraws {
    const message = createBaseSelectorDraws();
    message.address = object.address ?? "";
    message.nextBlockDraws = object.nextBlockDraws?.map((e) => Slot.fromPartial(e)) || [];
    message.nextEndorsementDraws = object.nextEndorsementDraws?.map((e) => IndexedSlot.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetTransactionsThroughputRequest(): GetTransactionsThroughputRequest {
  return { id: "" };
}

export const GetTransactionsThroughputRequest = {
  encode(message: GetTransactionsThroughputRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTransactionsThroughputRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTransactionsThroughputRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetTransactionsThroughputRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: GetTransactionsThroughputRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetTransactionsThroughputRequest>, I>>(
    base?: I,
  ): GetTransactionsThroughputRequest {
    return GetTransactionsThroughputRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetTransactionsThroughputRequest>, I>>(
    object: I,
  ): GetTransactionsThroughputRequest {
    const message = createBaseGetTransactionsThroughputRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetTransactionsThroughputResponse(): GetTransactionsThroughputResponse {
  return { id: "", throughput: 0 };
}

export const GetTransactionsThroughputResponse = {
  encode(message: GetTransactionsThroughputResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.throughput !== 0) {
      writer.uint32(21).fixed32(message.throughput);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetTransactionsThroughputResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTransactionsThroughputResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 21) {
            break;
          }

          message.throughput = reader.fixed32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetTransactionsThroughputResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      throughput: isSet(object.throughput) ? Number(object.throughput) : 0,
    };
  },

  toJSON(message: GetTransactionsThroughputResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.throughput !== undefined && (obj.throughput = Math.round(message.throughput));
    return obj;
  },

  create<I extends Exact<DeepPartial<GetTransactionsThroughputResponse>, I>>(
    base?: I,
  ): GetTransactionsThroughputResponse {
    return GetTransactionsThroughputResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetTransactionsThroughputResponse>, I>>(
    object: I,
  ): GetTransactionsThroughputResponse {
    const message = createBaseGetTransactionsThroughputResponse();
    message.id = object.id ?? "";
    message.throughput = object.throughput ?? 0;
    return message;
  },
};

function createBaseGetVersionRequest(): GetVersionRequest {
  return { id: "" };
}

export const GetVersionRequest = {
  encode(message: GetVersionRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVersionRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVersionRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetVersionRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: GetVersionRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetVersionRequest>, I>>(base?: I): GetVersionRequest {
    return GetVersionRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetVersionRequest>, I>>(object: I): GetVersionRequest {
    const message = createBaseGetVersionRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetVersionResponse(): GetVersionResponse {
  return { id: "", version: "" };
}

export const GetVersionResponse = {
  encode(message: GetVersionResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetVersionResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetVersionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.version = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetVersionResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      version: isSet(object.version) ? String(object.version) : "",
    };
  },

  toJSON(message: GetVersionResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.version !== undefined && (obj.version = message.version);
    return obj;
  },

  create<I extends Exact<DeepPartial<GetVersionResponse>, I>>(base?: I): GetVersionResponse {
    return GetVersionResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<GetVersionResponse>, I>>(object: I): GetVersionResponse {
    const message = createBaseGetVersionResponse();
    message.id = object.id ?? "";
    message.version = object.version ?? "";
    return message;
  },
};

function createBaseNewBlocksRequest(): NewBlocksRequest {
  return { id: "" };
}

export const NewBlocksRequest = {
  encode(message: NewBlocksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewBlocksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewBlocksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewBlocksRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: NewBlocksRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<NewBlocksRequest>, I>>(base?: I): NewBlocksRequest {
    return NewBlocksRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NewBlocksRequest>, I>>(object: I): NewBlocksRequest {
    const message = createBaseNewBlocksRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseNewBlocksResponse(): NewBlocksResponse {
  return { id: "", block: undefined };
}

export const NewBlocksResponse = {
  encode(message: NewBlocksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.block !== undefined) {
      SignedBlock.encode(message.block, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewBlocksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewBlocksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.block = SignedBlock.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewBlocksResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      block: isSet(object.block) ? SignedBlock.fromJSON(object.block) : undefined,
    };
  },

  toJSON(message: NewBlocksResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.block !== undefined && (obj.block = message.block ? SignedBlock.toJSON(message.block) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NewBlocksResponse>, I>>(base?: I): NewBlocksResponse {
    return NewBlocksResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NewBlocksResponse>, I>>(object: I): NewBlocksResponse {
    const message = createBaseNewBlocksResponse();
    message.id = object.id ?? "";
    message.block = (object.block !== undefined && object.block !== null)
      ? SignedBlock.fromPartial(object.block)
      : undefined;
    return message;
  },
};

function createBaseNewBlocksHeadersRequest(): NewBlocksHeadersRequest {
  return { id: "" };
}

export const NewBlocksHeadersRequest = {
  encode(message: NewBlocksHeadersRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewBlocksHeadersRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewBlocksHeadersRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewBlocksHeadersRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: NewBlocksHeadersRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<NewBlocksHeadersRequest>, I>>(base?: I): NewBlocksHeadersRequest {
    return NewBlocksHeadersRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NewBlocksHeadersRequest>, I>>(object: I): NewBlocksHeadersRequest {
    const message = createBaseNewBlocksHeadersRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseNewBlocksHeadersResponse(): NewBlocksHeadersResponse {
  return { id: "", blockHeader: undefined };
}

export const NewBlocksHeadersResponse = {
  encode(message: NewBlocksHeadersResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.blockHeader !== undefined) {
      SignedBlockHeader.encode(message.blockHeader, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewBlocksHeadersResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewBlocksHeadersResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.blockHeader = SignedBlockHeader.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewBlocksHeadersResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      blockHeader: isSet(object.blockHeader) ? SignedBlockHeader.fromJSON(object.blockHeader) : undefined,
    };
  },

  toJSON(message: NewBlocksHeadersResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.blockHeader !== undefined &&
      (obj.blockHeader = message.blockHeader ? SignedBlockHeader.toJSON(message.blockHeader) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NewBlocksHeadersResponse>, I>>(base?: I): NewBlocksHeadersResponse {
    return NewBlocksHeadersResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NewBlocksHeadersResponse>, I>>(object: I): NewBlocksHeadersResponse {
    const message = createBaseNewBlocksHeadersResponse();
    message.id = object.id ?? "";
    message.blockHeader = (object.blockHeader !== undefined && object.blockHeader !== null)
      ? SignedBlockHeader.fromPartial(object.blockHeader)
      : undefined;
    return message;
  },
};

function createBaseNewFilledBlocksRequest(): NewFilledBlocksRequest {
  return { id: "" };
}

export const NewFilledBlocksRequest = {
  encode(message: NewFilledBlocksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewFilledBlocksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewFilledBlocksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewFilledBlocksRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: NewFilledBlocksRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<NewFilledBlocksRequest>, I>>(base?: I): NewFilledBlocksRequest {
    return NewFilledBlocksRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NewFilledBlocksRequest>, I>>(object: I): NewFilledBlocksRequest {
    const message = createBaseNewFilledBlocksRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseNewFilledBlocksResponse(): NewFilledBlocksResponse {
  return { id: "", filledBlock: undefined };
}

export const NewFilledBlocksResponse = {
  encode(message: NewFilledBlocksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.filledBlock !== undefined) {
      FilledBlock.encode(message.filledBlock, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewFilledBlocksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewFilledBlocksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.filledBlock = FilledBlock.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewFilledBlocksResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      filledBlock: isSet(object.filledBlock) ? FilledBlock.fromJSON(object.filledBlock) : undefined,
    };
  },

  toJSON(message: NewFilledBlocksResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.filledBlock !== undefined &&
      (obj.filledBlock = message.filledBlock ? FilledBlock.toJSON(message.filledBlock) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NewFilledBlocksResponse>, I>>(base?: I): NewFilledBlocksResponse {
    return NewFilledBlocksResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NewFilledBlocksResponse>, I>>(object: I): NewFilledBlocksResponse {
    const message = createBaseNewFilledBlocksResponse();
    message.id = object.id ?? "";
    message.filledBlock = (object.filledBlock !== undefined && object.filledBlock !== null)
      ? FilledBlock.fromPartial(object.filledBlock)
      : undefined;
    return message;
  },
};

function createBaseNewOperationsRequest(): NewOperationsRequest {
  return { id: "", query: undefined };
}

export const NewOperationsRequest = {
  encode(message: NewOperationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.query !== undefined) {
      NewOperationsQuery.encode(message.query, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewOperationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewOperationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.query = NewOperationsQuery.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewOperationsRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      query: isSet(object.query) ? NewOperationsQuery.fromJSON(object.query) : undefined,
    };
  },

  toJSON(message: NewOperationsRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.query !== undefined && (obj.query = message.query ? NewOperationsQuery.toJSON(message.query) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NewOperationsRequest>, I>>(base?: I): NewOperationsRequest {
    return NewOperationsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NewOperationsRequest>, I>>(object: I): NewOperationsRequest {
    const message = createBaseNewOperationsRequest();
    message.id = object.id ?? "";
    message.query = (object.query !== undefined && object.query !== null)
      ? NewOperationsQuery.fromPartial(object.query)
      : undefined;
    return message;
  },
};

function createBaseNewOperationsQuery(): NewOperationsQuery {
  return { filter: undefined };
}

export const NewOperationsQuery = {
  encode(message: NewOperationsQuery, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.filter !== undefined) {
      NewOperationsFilter.encode(message.filter, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewOperationsQuery {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewOperationsQuery();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.filter = NewOperationsFilter.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewOperationsQuery {
    return { filter: isSet(object.filter) ? NewOperationsFilter.fromJSON(object.filter) : undefined };
  },

  toJSON(message: NewOperationsQuery): unknown {
    const obj: any = {};
    message.filter !== undefined &&
      (obj.filter = message.filter ? NewOperationsFilter.toJSON(message.filter) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NewOperationsQuery>, I>>(base?: I): NewOperationsQuery {
    return NewOperationsQuery.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NewOperationsQuery>, I>>(object: I): NewOperationsQuery {
    const message = createBaseNewOperationsQuery();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? NewOperationsFilter.fromPartial(object.filter)
      : undefined;
    return message;
  },
};

function createBaseNewOperationsFilter(): NewOperationsFilter {
  return { types: [] };
}

export const NewOperationsFilter = {
  encode(message: NewOperationsFilter, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.types) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewOperationsFilter {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewOperationsFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag == 8) {
            message.types.push(reader.int32() as any);
            continue;
          }

          if (tag == 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.types.push(reader.int32() as any);
            }

            continue;
          }

          break;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewOperationsFilter {
    return { types: Array.isArray(object?.types) ? object.types.map((e: any) => opTypeFromJSON(e)) : [] };
  },

  toJSON(message: NewOperationsFilter): unknown {
    const obj: any = {};
    if (message.types) {
      obj.types = message.types.map((e) => opTypeToJSON(e));
    } else {
      obj.types = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NewOperationsFilter>, I>>(base?: I): NewOperationsFilter {
    return NewOperationsFilter.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NewOperationsFilter>, I>>(object: I): NewOperationsFilter {
    const message = createBaseNewOperationsFilter();
    message.types = object.types?.map((e) => e) || [];
    return message;
  },
};

function createBaseNewOperationsResponse(): NewOperationsResponse {
  return { id: "", operation: undefined };
}

export const NewOperationsResponse = {
  encode(message: NewOperationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.operation !== undefined) {
      SignedOperation.encode(message.operation, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NewOperationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNewOperationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.operation = SignedOperation.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NewOperationsResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      operation: isSet(object.operation) ? SignedOperation.fromJSON(object.operation) : undefined,
    };
  },

  toJSON(message: NewOperationsResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.operation !== undefined &&
      (obj.operation = message.operation ? SignedOperation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<NewOperationsResponse>, I>>(base?: I): NewOperationsResponse {
    return NewOperationsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<NewOperationsResponse>, I>>(object: I): NewOperationsResponse {
    const message = createBaseNewOperationsResponse();
    message.id = object.id ?? "";
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? SignedOperation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseSendBlocksRequest(): SendBlocksRequest {
  return { id: "", block: undefined };
}

export const SendBlocksRequest = {
  encode(message: SendBlocksRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.block !== undefined) {
      SecureShare.encode(message.block, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendBlocksRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendBlocksRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.block = SecureShare.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendBlocksRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      block: isSet(object.block) ? SecureShare.fromJSON(object.block) : undefined,
    };
  },

  toJSON(message: SendBlocksRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.block !== undefined && (obj.block = message.block ? SecureShare.toJSON(message.block) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<SendBlocksRequest>, I>>(base?: I): SendBlocksRequest {
    return SendBlocksRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SendBlocksRequest>, I>>(object: I): SendBlocksRequest {
    const message = createBaseSendBlocksRequest();
    message.id = object.id ?? "";
    message.block = (object.block !== undefined && object.block !== null)
      ? SecureShare.fromPartial(object.block)
      : undefined;
    return message;
  },
};

function createBaseSendBlocksResponse(): SendBlocksResponse {
  return { id: "", result: undefined, error: undefined };
}

export const SendBlocksResponse = {
  encode(message: SendBlocksResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.result !== undefined) {
      BlockResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Status.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendBlocksResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendBlocksResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.result = BlockResult.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.error = Status.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendBlocksResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      result: isSet(object.result) ? BlockResult.fromJSON(object.result) : undefined,
      error: isSet(object.error) ? Status.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SendBlocksResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.result !== undefined && (obj.result = message.result ? BlockResult.toJSON(message.result) : undefined);
    message.error !== undefined && (obj.error = message.error ? Status.toJSON(message.error) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<SendBlocksResponse>, I>>(base?: I): SendBlocksResponse {
    return SendBlocksResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SendBlocksResponse>, I>>(object: I): SendBlocksResponse {
    const message = createBaseSendBlocksResponse();
    message.id = object.id ?? "";
    message.result = (object.result !== undefined && object.result !== null)
      ? BlockResult.fromPartial(object.result)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? Status.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBaseBlockResult(): BlockResult {
  return { blockId: "" };
}

export const BlockResult = {
  encode(message: BlockResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.blockId !== "") {
      writer.uint32(10).string(message.blockId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.blockId = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockResult {
    return { blockId: isSet(object.blockId) ? String(object.blockId) : "" };
  },

  toJSON(message: BlockResult): unknown {
    const obj: any = {};
    message.blockId !== undefined && (obj.blockId = message.blockId);
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockResult>, I>>(base?: I): BlockResult {
    return BlockResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BlockResult>, I>>(object: I): BlockResult {
    const message = createBaseBlockResult();
    message.blockId = object.blockId ?? "";
    return message;
  },
};

function createBaseSendEndorsementsRequest(): SendEndorsementsRequest {
  return { id: "", endorsements: [] };
}

export const SendEndorsementsRequest = {
  encode(message: SendEndorsementsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.endorsements) {
      SecureShare.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEndorsementsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEndorsementsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.endorsements.push(SecureShare.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendEndorsementsRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      endorsements: Array.isArray(object?.endorsements)
        ? object.endorsements.map((e: any) => SecureShare.fromJSON(e))
        : [],
    };
  },

  toJSON(message: SendEndorsementsRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.endorsements) {
      obj.endorsements = message.endorsements.map((e) => e ? SecureShare.toJSON(e) : undefined);
    } else {
      obj.endorsements = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEndorsementsRequest>, I>>(base?: I): SendEndorsementsRequest {
    return SendEndorsementsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SendEndorsementsRequest>, I>>(object: I): SendEndorsementsRequest {
    const message = createBaseSendEndorsementsRequest();
    message.id = object.id ?? "";
    message.endorsements = object.endorsements?.map((e) => SecureShare.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSendEndorsementsResponse(): SendEndorsementsResponse {
  return { id: "", result: undefined, error: undefined };
}

export const SendEndorsementsResponse = {
  encode(message: SendEndorsementsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.result !== undefined) {
      EndorsementResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Status.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendEndorsementsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendEndorsementsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.result = EndorsementResult.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.error = Status.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendEndorsementsResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      result: isSet(object.result) ? EndorsementResult.fromJSON(object.result) : undefined,
      error: isSet(object.error) ? Status.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SendEndorsementsResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.result !== undefined &&
      (obj.result = message.result ? EndorsementResult.toJSON(message.result) : undefined);
    message.error !== undefined && (obj.error = message.error ? Status.toJSON(message.error) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<SendEndorsementsResponse>, I>>(base?: I): SendEndorsementsResponse {
    return SendEndorsementsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SendEndorsementsResponse>, I>>(object: I): SendEndorsementsResponse {
    const message = createBaseSendEndorsementsResponse();
    message.id = object.id ?? "";
    message.result = (object.result !== undefined && object.result !== null)
      ? EndorsementResult.fromPartial(object.result)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? Status.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBaseEndorsementResult(): EndorsementResult {
  return { endorsementsIds: [] };
}

export const EndorsementResult = {
  encode(message: EndorsementResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.endorsementsIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EndorsementResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEndorsementResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.endorsementsIds.push(reader.string());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EndorsementResult {
    return {
      endorsementsIds: Array.isArray(object?.endorsementsIds) ? object.endorsementsIds.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: EndorsementResult): unknown {
    const obj: any = {};
    if (message.endorsementsIds) {
      obj.endorsementsIds = message.endorsementsIds.map((e) => e);
    } else {
      obj.endorsementsIds = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EndorsementResult>, I>>(base?: I): EndorsementResult {
    return EndorsementResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<EndorsementResult>, I>>(object: I): EndorsementResult {
    const message = createBaseEndorsementResult();
    message.endorsementsIds = object.endorsementsIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseSendOperationsRequest(): SendOperationsRequest {
  return { id: "", operations: [] };
}

export const SendOperationsRequest = {
  encode(message: SendOperationsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    for (const v of message.operations) {
      SecureShare.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendOperationsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendOperationsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.operations.push(SecureShare.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendOperationsRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      operations: Array.isArray(object?.operations) ? object.operations.map((e: any) => SecureShare.fromJSON(e)) : [],
    };
  },

  toJSON(message: SendOperationsRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    if (message.operations) {
      obj.operations = message.operations.map((e) => e ? SecureShare.toJSON(e) : undefined);
    } else {
      obj.operations = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SendOperationsRequest>, I>>(base?: I): SendOperationsRequest {
    return SendOperationsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SendOperationsRequest>, I>>(object: I): SendOperationsRequest {
    const message = createBaseSendOperationsRequest();
    message.id = object.id ?? "";
    message.operations = object.operations?.map((e) => SecureShare.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSendOperationsResponse(): SendOperationsResponse {
  return { id: "", result: undefined, error: undefined };
}

export const SendOperationsResponse = {
  encode(message: SendOperationsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.result !== undefined) {
      OperationResult.encode(message.result, writer.uint32(18).fork()).ldelim();
    }
    if (message.error !== undefined) {
      Status.encode(message.error, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SendOperationsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSendOperationsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.result = OperationResult.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.error = Status.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SendOperationsResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      result: isSet(object.result) ? OperationResult.fromJSON(object.result) : undefined,
      error: isSet(object.error) ? Status.fromJSON(object.error) : undefined,
    };
  },

  toJSON(message: SendOperationsResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.result !== undefined && (obj.result = message.result ? OperationResult.toJSON(message.result) : undefined);
    message.error !== undefined && (obj.error = message.error ? Status.toJSON(message.error) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<SendOperationsResponse>, I>>(base?: I): SendOperationsResponse {
    return SendOperationsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SendOperationsResponse>, I>>(object: I): SendOperationsResponse {
    const message = createBaseSendOperationsResponse();
    message.id = object.id ?? "";
    message.result = (object.result !== undefined && object.result !== null)
      ? OperationResult.fromPartial(object.result)
      : undefined;
    message.error = (object.error !== undefined && object.error !== null)
      ? Status.fromPartial(object.error)
      : undefined;
    return message;
  },
};

function createBaseOperationResult(): OperationResult {
  return { operationsIds: [] };
}

export const OperationResult = {
  encode(message: OperationResult, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.operationsIds) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OperationResult {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperationResult();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.operationsIds.push(reader.string());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OperationResult {
    return {
      operationsIds: Array.isArray(object?.operationsIds) ? object.operationsIds.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: OperationResult): unknown {
    const obj: any = {};
    if (message.operationsIds) {
      obj.operationsIds = message.operationsIds.map((e) => e);
    } else {
      obj.operationsIds = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OperationResult>, I>>(base?: I): OperationResult {
    return OperationResult.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OperationResult>, I>>(object: I): OperationResult {
    const message = createBaseOperationResult();
    message.operationsIds = object.operationsIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseTransactionsThroughputRequest(): TransactionsThroughputRequest {
  return { id: "", interval: undefined };
}

export const TransactionsThroughputRequest = {
  encode(message: TransactionsThroughputRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.interval !== undefined) {
      writer.uint32(17).fixed64(message.interval);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionsThroughputRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionsThroughputRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 17) {
            break;
          }

          message.interval = longToNumber(reader.fixed64() as Long);
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TransactionsThroughputRequest {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      interval: isSet(object.interval) ? Number(object.interval) : undefined,
    };
  },

  toJSON(message: TransactionsThroughputRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.interval !== undefined && (obj.interval = Math.round(message.interval));
    return obj;
  },

  create<I extends Exact<DeepPartial<TransactionsThroughputRequest>, I>>(base?: I): TransactionsThroughputRequest {
    return TransactionsThroughputRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TransactionsThroughputRequest>, I>>(
    object: I,
  ): TransactionsThroughputRequest {
    const message = createBaseTransactionsThroughputRequest();
    message.id = object.id ?? "";
    message.interval = object.interval ?? undefined;
    return message;
  },
};

function createBaseTransactionsThroughputResponse(): TransactionsThroughputResponse {
  return { id: "", throughput: 0 };
}

export const TransactionsThroughputResponse = {
  encode(message: TransactionsThroughputResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.throughput !== 0) {
      writer.uint32(21).fixed32(message.throughput);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionsThroughputResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionsThroughputResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag != 21) {
            break;
          }

          message.throughput = reader.fixed32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TransactionsThroughputResponse {
    return {
      id: isSet(object.id) ? String(object.id) : "",
      throughput: isSet(object.throughput) ? Number(object.throughput) : 0,
    };
  },

  toJSON(message: TransactionsThroughputResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.throughput !== undefined && (obj.throughput = Math.round(message.throughput));
    return obj;
  },

  create<I extends Exact<DeepPartial<TransactionsThroughputResponse>, I>>(base?: I): TransactionsThroughputResponse {
    return TransactionsThroughputResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TransactionsThroughputResponse>, I>>(
    object: I,
  ): TransactionsThroughputResponse {
    const message = createBaseTransactionsThroughputResponse();
    message.id = object.id ?? "";
    message.throughput = object.throughput ?? 0;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
