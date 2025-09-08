import * as jspb from 'google-protobuf'

import * as google_api_annotations_pb from './google/api/annotations_pb'; // proto import: "google/api/annotations.proto"
import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb'; // proto import: "google/protobuf/wrappers.proto"
import * as massa_model_v1_address_pb from './massa/model/v1/address_pb'; // proto import: "massa/model/v1/address.proto"
import * as massa_model_v1_amount_pb from './massa/model/v1/amount_pb'; // proto import: "massa/model/v1/amount.proto"
import * as massa_model_v1_block_pb from './massa/model/v1/block_pb'; // proto import: "massa/model/v1/block.proto"
import * as massa_model_v1_commons_pb from './massa/model/v1/commons_pb'; // proto import: "massa/model/v1/commons.proto"
import * as massa_model_v1_datastore_pb from './massa/model/v1/datastore_pb'; // proto import: "massa/model/v1/datastore.proto"
import * as massa_model_v1_denunciation_pb from './massa/model/v1/denunciation_pb'; // proto import: "massa/model/v1/denunciation.proto"
import * as massa_model_v1_draw_pb from './massa/model/v1/draw_pb'; // proto import: "massa/model/v1/draw.proto"
import * as massa_model_v1_endorsement_pb from './massa/model/v1/endorsement_pb'; // proto import: "massa/model/v1/endorsement.proto"
import * as massa_model_v1_execution_pb from './massa/model/v1/execution_pb'; // proto import: "massa/model/v1/execution.proto"
import * as massa_model_v1_node_pb from './massa/model/v1/node_pb'; // proto import: "massa/model/v1/node.proto"
import * as massa_model_v1_operation_pb from './massa/model/v1/operation_pb'; // proto import: "massa/model/v1/operation.proto"
import * as massa_model_v1_slot_pb from './massa/model/v1/slot_pb'; // proto import: "massa/model/v1/slot.proto"
import * as massa_model_v1_staker_pb from './massa/model/v1/staker_pb'; // proto import: "massa/model/v1/staker.proto"


export class ExecuteReadOnlyCallRequest extends jspb.Message {
  getCall(): massa_model_v1_execution_pb.ReadOnlyExecutionCall | undefined;
  setCall(value?: massa_model_v1_execution_pb.ReadOnlyExecutionCall): ExecuteReadOnlyCallRequest;
  hasCall(): boolean;
  clearCall(): ExecuteReadOnlyCallRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteReadOnlyCallRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteReadOnlyCallRequest): ExecuteReadOnlyCallRequest.AsObject;
  static serializeBinaryToWriter(message: ExecuteReadOnlyCallRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteReadOnlyCallRequest;
  static deserializeBinaryFromReader(message: ExecuteReadOnlyCallRequest, reader: jspb.BinaryReader): ExecuteReadOnlyCallRequest;
}

export namespace ExecuteReadOnlyCallRequest {
  export type AsObject = {
    call?: massa_model_v1_execution_pb.ReadOnlyExecutionCall.AsObject,
  }
}

export class ExecuteReadOnlyCallResponse extends jspb.Message {
  getOutput(): massa_model_v1_execution_pb.ReadOnlyExecutionOutput | undefined;
  setOutput(value?: massa_model_v1_execution_pb.ReadOnlyExecutionOutput): ExecuteReadOnlyCallResponse;
  hasOutput(): boolean;
  clearOutput(): ExecuteReadOnlyCallResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteReadOnlyCallResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteReadOnlyCallResponse): ExecuteReadOnlyCallResponse.AsObject;
  static serializeBinaryToWriter(message: ExecuteReadOnlyCallResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteReadOnlyCallResponse;
  static deserializeBinaryFromReader(message: ExecuteReadOnlyCallResponse, reader: jspb.BinaryReader): ExecuteReadOnlyCallResponse;
}

export namespace ExecuteReadOnlyCallResponse {
  export type AsObject = {
    output?: massa_model_v1_execution_pb.ReadOnlyExecutionOutput.AsObject,
  }
}

export class GetBlocksRequest extends jspb.Message {
  getBlockIdsList(): Array<string>;
  setBlockIdsList(value: Array<string>): GetBlocksRequest;
  clearBlockIdsList(): GetBlocksRequest;
  addBlockIds(value: string, index?: number): GetBlocksRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlocksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlocksRequest): GetBlocksRequest.AsObject;
  static serializeBinaryToWriter(message: GetBlocksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlocksRequest;
  static deserializeBinaryFromReader(message: GetBlocksRequest, reader: jspb.BinaryReader): GetBlocksRequest;
}

export namespace GetBlocksRequest {
  export type AsObject = {
    blockIdsList: Array<string>,
  }
}

export class GetBlocksResponse extends jspb.Message {
  getWrappedBlocksList(): Array<massa_model_v1_block_pb.BlockWrapper>;
  setWrappedBlocksList(value: Array<massa_model_v1_block_pb.BlockWrapper>): GetBlocksResponse;
  clearWrappedBlocksList(): GetBlocksResponse;
  addWrappedBlocks(value?: massa_model_v1_block_pb.BlockWrapper, index?: number): massa_model_v1_block_pb.BlockWrapper;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetBlocksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetBlocksResponse): GetBlocksResponse.AsObject;
  static serializeBinaryToWriter(message: GetBlocksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetBlocksResponse;
  static deserializeBinaryFromReader(message: GetBlocksResponse, reader: jspb.BinaryReader): GetBlocksResponse;
}

export namespace GetBlocksResponse {
  export type AsObject = {
    wrappedBlocksList: Array<massa_model_v1_block_pb.BlockWrapper.AsObject>,
  }
}

export class GetDatastoreEntriesRequest extends jspb.Message {
  getFiltersList(): Array<GetDatastoreEntryFilter>;
  setFiltersList(value: Array<GetDatastoreEntryFilter>): GetDatastoreEntriesRequest;
  clearFiltersList(): GetDatastoreEntriesRequest;
  addFilters(value?: GetDatastoreEntryFilter, index?: number): GetDatastoreEntryFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDatastoreEntriesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetDatastoreEntriesRequest): GetDatastoreEntriesRequest.AsObject;
  static serializeBinaryToWriter(message: GetDatastoreEntriesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDatastoreEntriesRequest;
  static deserializeBinaryFromReader(message: GetDatastoreEntriesRequest, reader: jspb.BinaryReader): GetDatastoreEntriesRequest;
}

export namespace GetDatastoreEntriesRequest {
  export type AsObject = {
    filtersList: Array<GetDatastoreEntryFilter.AsObject>,
  }
}

export class GetDatastoreEntryFilter extends jspb.Message {
  getAddressKey(): massa_model_v1_datastore_pb.AddressKeyEntry | undefined;
  setAddressKey(value?: massa_model_v1_datastore_pb.AddressKeyEntry): GetDatastoreEntryFilter;
  hasAddressKey(): boolean;
  clearAddressKey(): GetDatastoreEntryFilter;

  getFilterCase(): GetDatastoreEntryFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDatastoreEntryFilter.AsObject;
  static toObject(includeInstance: boolean, msg: GetDatastoreEntryFilter): GetDatastoreEntryFilter.AsObject;
  static serializeBinaryToWriter(message: GetDatastoreEntryFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDatastoreEntryFilter;
  static deserializeBinaryFromReader(message: GetDatastoreEntryFilter, reader: jspb.BinaryReader): GetDatastoreEntryFilter;
}

export namespace GetDatastoreEntryFilter {
  export type AsObject = {
    addressKey?: massa_model_v1_datastore_pb.AddressKeyEntry.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    ADDRESS_KEY = 1,
  }
}

export class GetDatastoreEntriesResponse extends jspb.Message {
  getDatastoreEntriesList(): Array<massa_model_v1_datastore_pb.DatastoreEntry>;
  setDatastoreEntriesList(value: Array<massa_model_v1_datastore_pb.DatastoreEntry>): GetDatastoreEntriesResponse;
  clearDatastoreEntriesList(): GetDatastoreEntriesResponse;
  addDatastoreEntries(value?: massa_model_v1_datastore_pb.DatastoreEntry, index?: number): massa_model_v1_datastore_pb.DatastoreEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetDatastoreEntriesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetDatastoreEntriesResponse): GetDatastoreEntriesResponse.AsObject;
  static serializeBinaryToWriter(message: GetDatastoreEntriesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetDatastoreEntriesResponse;
  static deserializeBinaryFromReader(message: GetDatastoreEntriesResponse, reader: jspb.BinaryReader): GetDatastoreEntriesResponse;
}

export namespace GetDatastoreEntriesResponse {
  export type AsObject = {
    datastoreEntriesList: Array<massa_model_v1_datastore_pb.DatastoreEntry.AsObject>,
  }
}

export class GetEndorsementsRequest extends jspb.Message {
  getEndorsementIdsList(): Array<string>;
  setEndorsementIdsList(value: Array<string>): GetEndorsementsRequest;
  clearEndorsementIdsList(): GetEndorsementsRequest;
  addEndorsementIds(value: string, index?: number): GetEndorsementsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetEndorsementsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetEndorsementsRequest): GetEndorsementsRequest.AsObject;
  static serializeBinaryToWriter(message: GetEndorsementsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetEndorsementsRequest;
  static deserializeBinaryFromReader(message: GetEndorsementsRequest, reader: jspb.BinaryReader): GetEndorsementsRequest;
}

export namespace GetEndorsementsRequest {
  export type AsObject = {
    endorsementIdsList: Array<string>,
  }
}

export class GetEndorsementsResponse extends jspb.Message {
  getWrappedEndorsementsList(): Array<massa_model_v1_endorsement_pb.EndorsementWrapper>;
  setWrappedEndorsementsList(value: Array<massa_model_v1_endorsement_pb.EndorsementWrapper>): GetEndorsementsResponse;
  clearWrappedEndorsementsList(): GetEndorsementsResponse;
  addWrappedEndorsements(value?: massa_model_v1_endorsement_pb.EndorsementWrapper, index?: number): massa_model_v1_endorsement_pb.EndorsementWrapper;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetEndorsementsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetEndorsementsResponse): GetEndorsementsResponse.AsObject;
  static serializeBinaryToWriter(message: GetEndorsementsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetEndorsementsResponse;
  static deserializeBinaryFromReader(message: GetEndorsementsResponse, reader: jspb.BinaryReader): GetEndorsementsResponse;
}

export namespace GetEndorsementsResponse {
  export type AsObject = {
    wrappedEndorsementsList: Array<massa_model_v1_endorsement_pb.EndorsementWrapper.AsObject>,
  }
}

export class GetNextBlockBestParentsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNextBlockBestParentsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetNextBlockBestParentsRequest): GetNextBlockBestParentsRequest.AsObject;
  static serializeBinaryToWriter(message: GetNextBlockBestParentsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNextBlockBestParentsRequest;
  static deserializeBinaryFromReader(message: GetNextBlockBestParentsRequest, reader: jspb.BinaryReader): GetNextBlockBestParentsRequest;
}

export namespace GetNextBlockBestParentsRequest {
  export type AsObject = {
  }
}

export class GetNextBlockBestParentsResponse extends jspb.Message {
  getBlockParentsList(): Array<massa_model_v1_block_pb.BlockParent>;
  setBlockParentsList(value: Array<massa_model_v1_block_pb.BlockParent>): GetNextBlockBestParentsResponse;
  clearBlockParentsList(): GetNextBlockBestParentsResponse;
  addBlockParents(value?: massa_model_v1_block_pb.BlockParent, index?: number): massa_model_v1_block_pb.BlockParent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetNextBlockBestParentsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetNextBlockBestParentsResponse): GetNextBlockBestParentsResponse.AsObject;
  static serializeBinaryToWriter(message: GetNextBlockBestParentsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetNextBlockBestParentsResponse;
  static deserializeBinaryFromReader(message: GetNextBlockBestParentsResponse, reader: jspb.BinaryReader): GetNextBlockBestParentsResponse;
}

export namespace GetNextBlockBestParentsResponse {
  export type AsObject = {
    blockParentsList: Array<massa_model_v1_block_pb.BlockParent.AsObject>,
  }
}

export class GetOperationsRequest extends jspb.Message {
  getOperationIdsList(): Array<string>;
  setOperationIdsList(value: Array<string>): GetOperationsRequest;
  clearOperationIdsList(): GetOperationsRequest;
  addOperationIds(value: string, index?: number): GetOperationsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOperationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetOperationsRequest): GetOperationsRequest.AsObject;
  static serializeBinaryToWriter(message: GetOperationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOperationsRequest;
  static deserializeBinaryFromReader(message: GetOperationsRequest, reader: jspb.BinaryReader): GetOperationsRequest;
}

export namespace GetOperationsRequest {
  export type AsObject = {
    operationIdsList: Array<string>,
  }
}

export class GetOperationsResponse extends jspb.Message {
  getWrappedOperationsList(): Array<massa_model_v1_operation_pb.OperationWrapper>;
  setWrappedOperationsList(value: Array<massa_model_v1_operation_pb.OperationWrapper>): GetOperationsResponse;
  clearWrappedOperationsList(): GetOperationsResponse;
  addWrappedOperations(value?: massa_model_v1_operation_pb.OperationWrapper, index?: number): massa_model_v1_operation_pb.OperationWrapper;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOperationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOperationsResponse): GetOperationsResponse.AsObject;
  static serializeBinaryToWriter(message: GetOperationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOperationsResponse;
  static deserializeBinaryFromReader(message: GetOperationsResponse, reader: jspb.BinaryReader): GetOperationsResponse;
}

export namespace GetOperationsResponse {
  export type AsObject = {
    wrappedOperationsList: Array<massa_model_v1_operation_pb.OperationWrapper.AsObject>,
  }
}

export class GetScExecutionEventsRequest extends jspb.Message {
  getFiltersList(): Array<ScExecutionEventsFilter>;
  setFiltersList(value: Array<ScExecutionEventsFilter>): GetScExecutionEventsRequest;
  clearFiltersList(): GetScExecutionEventsRequest;
  addFilters(value?: ScExecutionEventsFilter, index?: number): ScExecutionEventsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetScExecutionEventsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetScExecutionEventsRequest): GetScExecutionEventsRequest.AsObject;
  static serializeBinaryToWriter(message: GetScExecutionEventsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetScExecutionEventsRequest;
  static deserializeBinaryFromReader(message: GetScExecutionEventsRequest, reader: jspb.BinaryReader): GetScExecutionEventsRequest;
}

export namespace GetScExecutionEventsRequest {
  export type AsObject = {
    filtersList: Array<ScExecutionEventsFilter.AsObject>,
  }
}

export class ScExecutionEventsFilter extends jspb.Message {
  getSlotRange(): massa_model_v1_slot_pb.SlotRange | undefined;
  setSlotRange(value?: massa_model_v1_slot_pb.SlotRange): ScExecutionEventsFilter;
  hasSlotRange(): boolean;
  clearSlotRange(): ScExecutionEventsFilter;

  getCallerAddress(): string;
  setCallerAddress(value: string): ScExecutionEventsFilter;
  hasCallerAddress(): boolean;
  clearCallerAddress(): ScExecutionEventsFilter;

  getEmitterAddress(): string;
  setEmitterAddress(value: string): ScExecutionEventsFilter;
  hasEmitterAddress(): boolean;
  clearEmitterAddress(): ScExecutionEventsFilter;

  getOriginalOperationId(): string;
  setOriginalOperationId(value: string): ScExecutionEventsFilter;
  hasOriginalOperationId(): boolean;
  clearOriginalOperationId(): ScExecutionEventsFilter;

  getIsFailure(): boolean;
  setIsFailure(value: boolean): ScExecutionEventsFilter;
  hasIsFailure(): boolean;
  clearIsFailure(): ScExecutionEventsFilter;

  getStatus(): massa_model_v1_execution_pb.ScExecutionEventStatus;
  setStatus(value: massa_model_v1_execution_pb.ScExecutionEventStatus): ScExecutionEventsFilter;
  hasStatus(): boolean;
  clearStatus(): ScExecutionEventsFilter;

  getFilterCase(): ScExecutionEventsFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScExecutionEventsFilter.AsObject;
  static toObject(includeInstance: boolean, msg: ScExecutionEventsFilter): ScExecutionEventsFilter.AsObject;
  static serializeBinaryToWriter(message: ScExecutionEventsFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScExecutionEventsFilter;
  static deserializeBinaryFromReader(message: ScExecutionEventsFilter, reader: jspb.BinaryReader): ScExecutionEventsFilter;
}

export namespace ScExecutionEventsFilter {
  export type AsObject = {
    slotRange?: massa_model_v1_slot_pb.SlotRange.AsObject,
    callerAddress?: string,
    emitterAddress?: string,
    originalOperationId?: string,
    isFailure?: boolean,
    status?: massa_model_v1_execution_pb.ScExecutionEventStatus,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    SLOT_RANGE = 1,
    CALLER_ADDRESS = 2,
    EMITTER_ADDRESS = 3,
    ORIGINAL_OPERATION_ID = 4,
    IS_FAILURE = 5,
    STATUS = 6,
  }
}

export class GetScExecutionEventsResponse extends jspb.Message {
  getEventsList(): Array<massa_model_v1_execution_pb.ScExecutionEvent>;
  setEventsList(value: Array<massa_model_v1_execution_pb.ScExecutionEvent>): GetScExecutionEventsResponse;
  clearEventsList(): GetScExecutionEventsResponse;
  addEvents(value?: massa_model_v1_execution_pb.ScExecutionEvent, index?: number): massa_model_v1_execution_pb.ScExecutionEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetScExecutionEventsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetScExecutionEventsResponse): GetScExecutionEventsResponse.AsObject;
  static serializeBinaryToWriter(message: GetScExecutionEventsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetScExecutionEventsResponse;
  static deserializeBinaryFromReader(message: GetScExecutionEventsResponse, reader: jspb.BinaryReader): GetScExecutionEventsResponse;
}

export namespace GetScExecutionEventsResponse {
  export type AsObject = {
    eventsList: Array<massa_model_v1_execution_pb.ScExecutionEvent.AsObject>,
  }
}

export class GetStatusRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetStatusRequest): GetStatusRequest.AsObject;
  static serializeBinaryToWriter(message: GetStatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStatusRequest;
  static deserializeBinaryFromReader(message: GetStatusRequest, reader: jspb.BinaryReader): GetStatusRequest;
}

export namespace GetStatusRequest {
  export type AsObject = {
  }
}

export class GetStatusResponse extends jspb.Message {
  getStatus(): massa_model_v1_node_pb.PublicStatus | undefined;
  setStatus(value?: massa_model_v1_node_pb.PublicStatus): GetStatusResponse;
  hasStatus(): boolean;
  clearStatus(): GetStatusResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetStatusResponse): GetStatusResponse.AsObject;
  static serializeBinaryToWriter(message: GetStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStatusResponse;
  static deserializeBinaryFromReader(message: GetStatusResponse, reader: jspb.BinaryReader): GetStatusResponse;
}

export namespace GetStatusResponse {
  export type AsObject = {
    status?: massa_model_v1_node_pb.PublicStatus.AsObject,
  }
}

export class GetSelectorDrawsRequest extends jspb.Message {
  getFiltersList(): Array<SelectorDrawsFilter>;
  setFiltersList(value: Array<SelectorDrawsFilter>): GetSelectorDrawsRequest;
  clearFiltersList(): GetSelectorDrawsRequest;
  addFilters(value?: SelectorDrawsFilter, index?: number): SelectorDrawsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSelectorDrawsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSelectorDrawsRequest): GetSelectorDrawsRequest.AsObject;
  static serializeBinaryToWriter(message: GetSelectorDrawsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSelectorDrawsRequest;
  static deserializeBinaryFromReader(message: GetSelectorDrawsRequest, reader: jspb.BinaryReader): GetSelectorDrawsRequest;
}

export namespace GetSelectorDrawsRequest {
  export type AsObject = {
    filtersList: Array<SelectorDrawsFilter.AsObject>,
  }
}

export class SelectorDrawsFilter extends jspb.Message {
  getAddresses(): massa_model_v1_address_pb.Addresses | undefined;
  setAddresses(value?: massa_model_v1_address_pb.Addresses): SelectorDrawsFilter;
  hasAddresses(): boolean;
  clearAddresses(): SelectorDrawsFilter;

  getSlotRange(): massa_model_v1_slot_pb.SlotRange | undefined;
  setSlotRange(value?: massa_model_v1_slot_pb.SlotRange): SelectorDrawsFilter;
  hasSlotRange(): boolean;
  clearSlotRange(): SelectorDrawsFilter;

  getFilterCase(): SelectorDrawsFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SelectorDrawsFilter.AsObject;
  static toObject(includeInstance: boolean, msg: SelectorDrawsFilter): SelectorDrawsFilter.AsObject;
  static serializeBinaryToWriter(message: SelectorDrawsFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SelectorDrawsFilter;
  static deserializeBinaryFromReader(message: SelectorDrawsFilter, reader: jspb.BinaryReader): SelectorDrawsFilter;
}

export namespace SelectorDrawsFilter {
  export type AsObject = {
    addresses?: massa_model_v1_address_pb.Addresses.AsObject,
    slotRange?: massa_model_v1_slot_pb.SlotRange.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    ADDRESSES = 1,
    SLOT_RANGE = 2,
  }
}

export class GetSelectorDrawsResponse extends jspb.Message {
  getDrawsList(): Array<massa_model_v1_draw_pb.SlotDraw>;
  setDrawsList(value: Array<massa_model_v1_draw_pb.SlotDraw>): GetSelectorDrawsResponse;
  clearDrawsList(): GetSelectorDrawsResponse;
  addDraws(value?: massa_model_v1_draw_pb.SlotDraw, index?: number): massa_model_v1_draw_pb.SlotDraw;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSelectorDrawsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSelectorDrawsResponse): GetSelectorDrawsResponse.AsObject;
  static serializeBinaryToWriter(message: GetSelectorDrawsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSelectorDrawsResponse;
  static deserializeBinaryFromReader(message: GetSelectorDrawsResponse, reader: jspb.BinaryReader): GetSelectorDrawsResponse;
}

export namespace GetSelectorDrawsResponse {
  export type AsObject = {
    drawsList: Array<massa_model_v1_draw_pb.SlotDraw.AsObject>,
  }
}

export class GetStakersRequest extends jspb.Message {
  getFiltersList(): Array<StakersFilter>;
  setFiltersList(value: Array<StakersFilter>): GetStakersRequest;
  clearFiltersList(): GetStakersRequest;
  addFilters(value?: StakersFilter, index?: number): StakersFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStakersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetStakersRequest): GetStakersRequest.AsObject;
  static serializeBinaryToWriter(message: GetStakersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStakersRequest;
  static deserializeBinaryFromReader(message: GetStakersRequest, reader: jspb.BinaryReader): GetStakersRequest;
}

export namespace GetStakersRequest {
  export type AsObject = {
    filtersList: Array<StakersFilter.AsObject>,
  }
}

export class StakersFilter extends jspb.Message {
  getMinRolls(): number;
  setMinRolls(value: number): StakersFilter;
  hasMinRolls(): boolean;
  clearMinRolls(): StakersFilter;

  getMaxRolls(): number;
  setMaxRolls(value: number): StakersFilter;
  hasMaxRolls(): boolean;
  clearMaxRolls(): StakersFilter;

  getLimit(): number;
  setLimit(value: number): StakersFilter;
  hasLimit(): boolean;
  clearLimit(): StakersFilter;

  getFilterCase(): StakersFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StakersFilter.AsObject;
  static toObject(includeInstance: boolean, msg: StakersFilter): StakersFilter.AsObject;
  static serializeBinaryToWriter(message: StakersFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StakersFilter;
  static deserializeBinaryFromReader(message: StakersFilter, reader: jspb.BinaryReader): StakersFilter;
}

export namespace StakersFilter {
  export type AsObject = {
    minRolls?: number,
    maxRolls?: number,
    limit?: number,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    MIN_ROLLS = 1,
    MAX_ROLLS = 2,
    LIMIT = 3,
  }
}

export class GetStakersResponse extends jspb.Message {
  getStakersList(): Array<massa_model_v1_staker_pb.StakerEntry>;
  setStakersList(value: Array<massa_model_v1_staker_pb.StakerEntry>): GetStakersResponse;
  clearStakersList(): GetStakersResponse;
  addStakers(value?: massa_model_v1_staker_pb.StakerEntry, index?: number): massa_model_v1_staker_pb.StakerEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStakersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetStakersResponse): GetStakersResponse.AsObject;
  static serializeBinaryToWriter(message: GetStakersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetStakersResponse;
  static deserializeBinaryFromReader(message: GetStakersResponse, reader: jspb.BinaryReader): GetStakersResponse;
}

export namespace GetStakersResponse {
  export type AsObject = {
    stakersList: Array<massa_model_v1_staker_pb.StakerEntry.AsObject>,
  }
}

export class GetTransactionsThroughputRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionsThroughputRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionsThroughputRequest): GetTransactionsThroughputRequest.AsObject;
  static serializeBinaryToWriter(message: GetTransactionsThroughputRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionsThroughputRequest;
  static deserializeBinaryFromReader(message: GetTransactionsThroughputRequest, reader: jspb.BinaryReader): GetTransactionsThroughputRequest;
}

export namespace GetTransactionsThroughputRequest {
  export type AsObject = {
  }
}

export class GetTransactionsThroughputResponse extends jspb.Message {
  getThroughput(): number;
  setThroughput(value: number): GetTransactionsThroughputResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTransactionsThroughputResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTransactionsThroughputResponse): GetTransactionsThroughputResponse.AsObject;
  static serializeBinaryToWriter(message: GetTransactionsThroughputResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTransactionsThroughputResponse;
  static deserializeBinaryFromReader(message: GetTransactionsThroughputResponse, reader: jspb.BinaryReader): GetTransactionsThroughputResponse;
}

export namespace GetTransactionsThroughputResponse {
  export type AsObject = {
    throughput: number,
  }
}

export class QueryStateRequest extends jspb.Message {
  getQueriesList(): Array<ExecutionQueryRequestItem>;
  setQueriesList(value: Array<ExecutionQueryRequestItem>): QueryStateRequest;
  clearQueriesList(): QueryStateRequest;
  addQueries(value?: ExecutionQueryRequestItem, index?: number): ExecutionQueryRequestItem;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryStateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: QueryStateRequest): QueryStateRequest.AsObject;
  static serializeBinaryToWriter(message: QueryStateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryStateRequest;
  static deserializeBinaryFromReader(message: QueryStateRequest, reader: jspb.BinaryReader): QueryStateRequest;
}

export namespace QueryStateRequest {
  export type AsObject = {
    queriesList: Array<ExecutionQueryRequestItem.AsObject>,
  }
}

export class ExecutionQueryRequestItem extends jspb.Message {
  getAddressExistsCandidate(): AddressExistsCandidate | undefined;
  setAddressExistsCandidate(value?: AddressExistsCandidate): ExecutionQueryRequestItem;
  hasAddressExistsCandidate(): boolean;
  clearAddressExistsCandidate(): ExecutionQueryRequestItem;

  getAddressExistsFinal(): AddressExistsFinal | undefined;
  setAddressExistsFinal(value?: AddressExistsFinal): ExecutionQueryRequestItem;
  hasAddressExistsFinal(): boolean;
  clearAddressExistsFinal(): ExecutionQueryRequestItem;

  getAddressBalanceCandidate(): AddressBalanceCandidate | undefined;
  setAddressBalanceCandidate(value?: AddressBalanceCandidate): ExecutionQueryRequestItem;
  hasAddressBalanceCandidate(): boolean;
  clearAddressBalanceCandidate(): ExecutionQueryRequestItem;

  getAddressBalanceFinal(): AddressBalanceFinal | undefined;
  setAddressBalanceFinal(value?: AddressBalanceFinal): ExecutionQueryRequestItem;
  hasAddressBalanceFinal(): boolean;
  clearAddressBalanceFinal(): ExecutionQueryRequestItem;

  getAddressBytecodeCandidate(): AddressBytecodeCandidate | undefined;
  setAddressBytecodeCandidate(value?: AddressBytecodeCandidate): ExecutionQueryRequestItem;
  hasAddressBytecodeCandidate(): boolean;
  clearAddressBytecodeCandidate(): ExecutionQueryRequestItem;

  getAddressBytecodeFinal(): AddressBytecodeFinal | undefined;
  setAddressBytecodeFinal(value?: AddressBytecodeFinal): ExecutionQueryRequestItem;
  hasAddressBytecodeFinal(): boolean;
  clearAddressBytecodeFinal(): ExecutionQueryRequestItem;

  getAddressDatastoreKeysCandidate(): AddressDatastoreKeysCandidate | undefined;
  setAddressDatastoreKeysCandidate(value?: AddressDatastoreKeysCandidate): ExecutionQueryRequestItem;
  hasAddressDatastoreKeysCandidate(): boolean;
  clearAddressDatastoreKeysCandidate(): ExecutionQueryRequestItem;

  getAddressDatastoreKeysFinal(): AddressDatastoreKeysFinal | undefined;
  setAddressDatastoreKeysFinal(value?: AddressDatastoreKeysFinal): ExecutionQueryRequestItem;
  hasAddressDatastoreKeysFinal(): boolean;
  clearAddressDatastoreKeysFinal(): ExecutionQueryRequestItem;

  getAddressDatastoreValueCandidate(): AddressDatastoreValueCandidate | undefined;
  setAddressDatastoreValueCandidate(value?: AddressDatastoreValueCandidate): ExecutionQueryRequestItem;
  hasAddressDatastoreValueCandidate(): boolean;
  clearAddressDatastoreValueCandidate(): ExecutionQueryRequestItem;

  getAddressDatastoreValueFinal(): AddressDatastoreValueFinal | undefined;
  setAddressDatastoreValueFinal(value?: AddressDatastoreValueFinal): ExecutionQueryRequestItem;
  hasAddressDatastoreValueFinal(): boolean;
  clearAddressDatastoreValueFinal(): ExecutionQueryRequestItem;

  getOpExecutionStatusCandidate(): OpExecutionStatusCandidate | undefined;
  setOpExecutionStatusCandidate(value?: OpExecutionStatusCandidate): ExecutionQueryRequestItem;
  hasOpExecutionStatusCandidate(): boolean;
  clearOpExecutionStatusCandidate(): ExecutionQueryRequestItem;

  getOpExecutionStatusFinal(): OpExecutionStatusFinal | undefined;
  setOpExecutionStatusFinal(value?: OpExecutionStatusFinal): ExecutionQueryRequestItem;
  hasOpExecutionStatusFinal(): boolean;
  clearOpExecutionStatusFinal(): ExecutionQueryRequestItem;

  getDenunciationExecutionStatusCandidate(): DenunciationExecutionStatusCandidate | undefined;
  setDenunciationExecutionStatusCandidate(value?: DenunciationExecutionStatusCandidate): ExecutionQueryRequestItem;
  hasDenunciationExecutionStatusCandidate(): boolean;
  clearDenunciationExecutionStatusCandidate(): ExecutionQueryRequestItem;

  getDenunciationExecutionStatusFinal(): DenunciationExecutionStatusFinal | undefined;
  setDenunciationExecutionStatusFinal(value?: DenunciationExecutionStatusFinal): ExecutionQueryRequestItem;
  hasDenunciationExecutionStatusFinal(): boolean;
  clearDenunciationExecutionStatusFinal(): ExecutionQueryRequestItem;

  getAddressRollsCandidate(): AddressRollsCandidate | undefined;
  setAddressRollsCandidate(value?: AddressRollsCandidate): ExecutionQueryRequestItem;
  hasAddressRollsCandidate(): boolean;
  clearAddressRollsCandidate(): ExecutionQueryRequestItem;

  getAddressRollsFinal(): AddressRollsFinal | undefined;
  setAddressRollsFinal(value?: AddressRollsFinal): ExecutionQueryRequestItem;
  hasAddressRollsFinal(): boolean;
  clearAddressRollsFinal(): ExecutionQueryRequestItem;

  getAddressDeferredCreditsCandidate(): AddressDeferredCreditsCandidate | undefined;
  setAddressDeferredCreditsCandidate(value?: AddressDeferredCreditsCandidate): ExecutionQueryRequestItem;
  hasAddressDeferredCreditsCandidate(): boolean;
  clearAddressDeferredCreditsCandidate(): ExecutionQueryRequestItem;

  getAddressDeferredCreditsFinal(): AddressDeferredCreditsFinal | undefined;
  setAddressDeferredCreditsFinal(value?: AddressDeferredCreditsFinal): ExecutionQueryRequestItem;
  hasAddressDeferredCreditsFinal(): boolean;
  clearAddressDeferredCreditsFinal(): ExecutionQueryRequestItem;

  getCycleInfos(): CycleInfos | undefined;
  setCycleInfos(value?: CycleInfos): ExecutionQueryRequestItem;
  hasCycleInfos(): boolean;
  clearCycleInfos(): ExecutionQueryRequestItem;

  getEvents(): Events | undefined;
  setEvents(value?: Events): ExecutionQueryRequestItem;
  hasEvents(): boolean;
  clearEvents(): ExecutionQueryRequestItem;

  getDeferredCallQuote(): DeferredCallQuote | undefined;
  setDeferredCallQuote(value?: DeferredCallQuote): ExecutionQueryRequestItem;
  hasDeferredCallQuote(): boolean;
  clearDeferredCallQuote(): ExecutionQueryRequestItem;

  getDeferredCallInfo(): DeferredCallInfo | undefined;
  setDeferredCallInfo(value?: DeferredCallInfo): ExecutionQueryRequestItem;
  hasDeferredCallInfo(): boolean;
  clearDeferredCallInfo(): ExecutionQueryRequestItem;

  getDeferredCallsBySlot(): DeferredCallsBySlot | undefined;
  setDeferredCallsBySlot(value?: DeferredCallsBySlot): ExecutionQueryRequestItem;
  hasDeferredCallsBySlot(): boolean;
  clearDeferredCallsBySlot(): ExecutionQueryRequestItem;

  getRequestItemCase(): ExecutionQueryRequestItem.RequestItemCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionQueryRequestItem.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionQueryRequestItem): ExecutionQueryRequestItem.AsObject;
  static serializeBinaryToWriter(message: ExecutionQueryRequestItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionQueryRequestItem;
  static deserializeBinaryFromReader(message: ExecutionQueryRequestItem, reader: jspb.BinaryReader): ExecutionQueryRequestItem;
}

export namespace ExecutionQueryRequestItem {
  export type AsObject = {
    addressExistsCandidate?: AddressExistsCandidate.AsObject,
    addressExistsFinal?: AddressExistsFinal.AsObject,
    addressBalanceCandidate?: AddressBalanceCandidate.AsObject,
    addressBalanceFinal?: AddressBalanceFinal.AsObject,
    addressBytecodeCandidate?: AddressBytecodeCandidate.AsObject,
    addressBytecodeFinal?: AddressBytecodeFinal.AsObject,
    addressDatastoreKeysCandidate?: AddressDatastoreKeysCandidate.AsObject,
    addressDatastoreKeysFinal?: AddressDatastoreKeysFinal.AsObject,
    addressDatastoreValueCandidate?: AddressDatastoreValueCandidate.AsObject,
    addressDatastoreValueFinal?: AddressDatastoreValueFinal.AsObject,
    opExecutionStatusCandidate?: OpExecutionStatusCandidate.AsObject,
    opExecutionStatusFinal?: OpExecutionStatusFinal.AsObject,
    denunciationExecutionStatusCandidate?: DenunciationExecutionStatusCandidate.AsObject,
    denunciationExecutionStatusFinal?: DenunciationExecutionStatusFinal.AsObject,
    addressRollsCandidate?: AddressRollsCandidate.AsObject,
    addressRollsFinal?: AddressRollsFinal.AsObject,
    addressDeferredCreditsCandidate?: AddressDeferredCreditsCandidate.AsObject,
    addressDeferredCreditsFinal?: AddressDeferredCreditsFinal.AsObject,
    cycleInfos?: CycleInfos.AsObject,
    events?: Events.AsObject,
    deferredCallQuote?: DeferredCallQuote.AsObject,
    deferredCallInfo?: DeferredCallInfo.AsObject,
    deferredCallsBySlot?: DeferredCallsBySlot.AsObject,
  }

  export enum RequestItemCase { 
    REQUEST_ITEM_NOT_SET = 0,
    ADDRESS_EXISTS_CANDIDATE = 1,
    ADDRESS_EXISTS_FINAL = 2,
    ADDRESS_BALANCE_CANDIDATE = 3,
    ADDRESS_BALANCE_FINAL = 4,
    ADDRESS_BYTECODE_CANDIDATE = 5,
    ADDRESS_BYTECODE_FINAL = 6,
    ADDRESS_DATASTORE_KEYS_CANDIDATE = 7,
    ADDRESS_DATASTORE_KEYS_FINAL = 8,
    ADDRESS_DATASTORE_VALUE_CANDIDATE = 9,
    ADDRESS_DATASTORE_VALUE_FINAL = 10,
    OP_EXECUTION_STATUS_CANDIDATE = 11,
    OP_EXECUTION_STATUS_FINAL = 12,
    DENUNCIATION_EXECUTION_STATUS_CANDIDATE = 13,
    DENUNCIATION_EXECUTION_STATUS_FINAL = 14,
    ADDRESS_ROLLS_CANDIDATE = 15,
    ADDRESS_ROLLS_FINAL = 16,
    ADDRESS_DEFERRED_CREDITS_CANDIDATE = 17,
    ADDRESS_DEFERRED_CREDITS_FINAL = 18,
    CYCLE_INFOS = 19,
    EVENTS = 20,
    DEFERRED_CALL_QUOTE = 21,
    DEFERRED_CALL_INFO = 22,
    DEFERRED_CALLS_BY_SLOT = 23,
  }
}

export class AddressExistsCandidate extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressExistsCandidate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressExistsCandidate.AsObject;
  static toObject(includeInstance: boolean, msg: AddressExistsCandidate): AddressExistsCandidate.AsObject;
  static serializeBinaryToWriter(message: AddressExistsCandidate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressExistsCandidate;
  static deserializeBinaryFromReader(message: AddressExistsCandidate, reader: jspb.BinaryReader): AddressExistsCandidate;
}

export namespace AddressExistsCandidate {
  export type AsObject = {
    address: string,
  }
}

export class AddressExistsFinal extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressExistsFinal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressExistsFinal.AsObject;
  static toObject(includeInstance: boolean, msg: AddressExistsFinal): AddressExistsFinal.AsObject;
  static serializeBinaryToWriter(message: AddressExistsFinal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressExistsFinal;
  static deserializeBinaryFromReader(message: AddressExistsFinal, reader: jspb.BinaryReader): AddressExistsFinal;
}

export namespace AddressExistsFinal {
  export type AsObject = {
    address: string,
  }
}

export class AddressBalanceCandidate extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressBalanceCandidate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressBalanceCandidate.AsObject;
  static toObject(includeInstance: boolean, msg: AddressBalanceCandidate): AddressBalanceCandidate.AsObject;
  static serializeBinaryToWriter(message: AddressBalanceCandidate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressBalanceCandidate;
  static deserializeBinaryFromReader(message: AddressBalanceCandidate, reader: jspb.BinaryReader): AddressBalanceCandidate;
}

export namespace AddressBalanceCandidate {
  export type AsObject = {
    address: string,
  }
}

export class AddressBalanceFinal extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressBalanceFinal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressBalanceFinal.AsObject;
  static toObject(includeInstance: boolean, msg: AddressBalanceFinal): AddressBalanceFinal.AsObject;
  static serializeBinaryToWriter(message: AddressBalanceFinal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressBalanceFinal;
  static deserializeBinaryFromReader(message: AddressBalanceFinal, reader: jspb.BinaryReader): AddressBalanceFinal;
}

export namespace AddressBalanceFinal {
  export type AsObject = {
    address: string,
  }
}

export class AddressBytecodeCandidate extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressBytecodeCandidate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressBytecodeCandidate.AsObject;
  static toObject(includeInstance: boolean, msg: AddressBytecodeCandidate): AddressBytecodeCandidate.AsObject;
  static serializeBinaryToWriter(message: AddressBytecodeCandidate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressBytecodeCandidate;
  static deserializeBinaryFromReader(message: AddressBytecodeCandidate, reader: jspb.BinaryReader): AddressBytecodeCandidate;
}

export namespace AddressBytecodeCandidate {
  export type AsObject = {
    address: string,
  }
}

export class AddressBytecodeFinal extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressBytecodeFinal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressBytecodeFinal.AsObject;
  static toObject(includeInstance: boolean, msg: AddressBytecodeFinal): AddressBytecodeFinal.AsObject;
  static serializeBinaryToWriter(message: AddressBytecodeFinal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressBytecodeFinal;
  static deserializeBinaryFromReader(message: AddressBytecodeFinal, reader: jspb.BinaryReader): AddressBytecodeFinal;
}

export namespace AddressBytecodeFinal {
  export type AsObject = {
    address: string,
  }
}

export class AddressDatastoreKeysCandidate extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressDatastoreKeysCandidate;

  getPrefix(): Uint8Array | string;
  getPrefix_asU8(): Uint8Array;
  getPrefix_asB64(): string;
  setPrefix(value: Uint8Array | string): AddressDatastoreKeysCandidate;

  getStartKey(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setStartKey(value?: google_protobuf_wrappers_pb.BytesValue): AddressDatastoreKeysCandidate;
  hasStartKey(): boolean;
  clearStartKey(): AddressDatastoreKeysCandidate;

  getInclusiveStartKey(): google_protobuf_wrappers_pb.BoolValue | undefined;
  setInclusiveStartKey(value?: google_protobuf_wrappers_pb.BoolValue): AddressDatastoreKeysCandidate;
  hasInclusiveStartKey(): boolean;
  clearInclusiveStartKey(): AddressDatastoreKeysCandidate;

  getEndKey(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setEndKey(value?: google_protobuf_wrappers_pb.BytesValue): AddressDatastoreKeysCandidate;
  hasEndKey(): boolean;
  clearEndKey(): AddressDatastoreKeysCandidate;

  getInclusiveEndKey(): google_protobuf_wrappers_pb.BoolValue | undefined;
  setInclusiveEndKey(value?: google_protobuf_wrappers_pb.BoolValue): AddressDatastoreKeysCandidate;
  hasInclusiveEndKey(): boolean;
  clearInclusiveEndKey(): AddressDatastoreKeysCandidate;

  getLimit(): google_protobuf_wrappers_pb.UInt32Value | undefined;
  setLimit(value?: google_protobuf_wrappers_pb.UInt32Value): AddressDatastoreKeysCandidate;
  hasLimit(): boolean;
  clearLimit(): AddressDatastoreKeysCandidate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressDatastoreKeysCandidate.AsObject;
  static toObject(includeInstance: boolean, msg: AddressDatastoreKeysCandidate): AddressDatastoreKeysCandidate.AsObject;
  static serializeBinaryToWriter(message: AddressDatastoreKeysCandidate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressDatastoreKeysCandidate;
  static deserializeBinaryFromReader(message: AddressDatastoreKeysCandidate, reader: jspb.BinaryReader): AddressDatastoreKeysCandidate;
}

export namespace AddressDatastoreKeysCandidate {
  export type AsObject = {
    address: string,
    prefix: Uint8Array | string,
    startKey?: google_protobuf_wrappers_pb.BytesValue.AsObject,
    inclusiveStartKey?: google_protobuf_wrappers_pb.BoolValue.AsObject,
    endKey?: google_protobuf_wrappers_pb.BytesValue.AsObject,
    inclusiveEndKey?: google_protobuf_wrappers_pb.BoolValue.AsObject,
    limit?: google_protobuf_wrappers_pb.UInt32Value.AsObject,
  }
}

export class AddressDatastoreKeysFinal extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressDatastoreKeysFinal;

  getPrefix(): Uint8Array | string;
  getPrefix_asU8(): Uint8Array;
  getPrefix_asB64(): string;
  setPrefix(value: Uint8Array | string): AddressDatastoreKeysFinal;

  getStartKey(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setStartKey(value?: google_protobuf_wrappers_pb.BytesValue): AddressDatastoreKeysFinal;
  hasStartKey(): boolean;
  clearStartKey(): AddressDatastoreKeysFinal;

  getInclusiveStartKey(): google_protobuf_wrappers_pb.BoolValue | undefined;
  setInclusiveStartKey(value?: google_protobuf_wrappers_pb.BoolValue): AddressDatastoreKeysFinal;
  hasInclusiveStartKey(): boolean;
  clearInclusiveStartKey(): AddressDatastoreKeysFinal;

  getEndKey(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setEndKey(value?: google_protobuf_wrappers_pb.BytesValue): AddressDatastoreKeysFinal;
  hasEndKey(): boolean;
  clearEndKey(): AddressDatastoreKeysFinal;

  getInclusiveEndKey(): google_protobuf_wrappers_pb.BoolValue | undefined;
  setInclusiveEndKey(value?: google_protobuf_wrappers_pb.BoolValue): AddressDatastoreKeysFinal;
  hasInclusiveEndKey(): boolean;
  clearInclusiveEndKey(): AddressDatastoreKeysFinal;

  getLimit(): google_protobuf_wrappers_pb.UInt32Value | undefined;
  setLimit(value?: google_protobuf_wrappers_pb.UInt32Value): AddressDatastoreKeysFinal;
  hasLimit(): boolean;
  clearLimit(): AddressDatastoreKeysFinal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressDatastoreKeysFinal.AsObject;
  static toObject(includeInstance: boolean, msg: AddressDatastoreKeysFinal): AddressDatastoreKeysFinal.AsObject;
  static serializeBinaryToWriter(message: AddressDatastoreKeysFinal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressDatastoreKeysFinal;
  static deserializeBinaryFromReader(message: AddressDatastoreKeysFinal, reader: jspb.BinaryReader): AddressDatastoreKeysFinal;
}

export namespace AddressDatastoreKeysFinal {
  export type AsObject = {
    address: string,
    prefix: Uint8Array | string,
    startKey?: google_protobuf_wrappers_pb.BytesValue.AsObject,
    inclusiveStartKey?: google_protobuf_wrappers_pb.BoolValue.AsObject,
    endKey?: google_protobuf_wrappers_pb.BytesValue.AsObject,
    inclusiveEndKey?: google_protobuf_wrappers_pb.BoolValue.AsObject,
    limit?: google_protobuf_wrappers_pb.UInt32Value.AsObject,
  }
}

export class AddressDatastoreValueCandidate extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressDatastoreValueCandidate;

  getKey(): Uint8Array | string;
  getKey_asU8(): Uint8Array;
  getKey_asB64(): string;
  setKey(value: Uint8Array | string): AddressDatastoreValueCandidate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressDatastoreValueCandidate.AsObject;
  static toObject(includeInstance: boolean, msg: AddressDatastoreValueCandidate): AddressDatastoreValueCandidate.AsObject;
  static serializeBinaryToWriter(message: AddressDatastoreValueCandidate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressDatastoreValueCandidate;
  static deserializeBinaryFromReader(message: AddressDatastoreValueCandidate, reader: jspb.BinaryReader): AddressDatastoreValueCandidate;
}

export namespace AddressDatastoreValueCandidate {
  export type AsObject = {
    address: string,
    key: Uint8Array | string,
  }
}

export class AddressDatastoreValueFinal extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressDatastoreValueFinal;

  getKey(): Uint8Array | string;
  getKey_asU8(): Uint8Array;
  getKey_asB64(): string;
  setKey(value: Uint8Array | string): AddressDatastoreValueFinal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressDatastoreValueFinal.AsObject;
  static toObject(includeInstance: boolean, msg: AddressDatastoreValueFinal): AddressDatastoreValueFinal.AsObject;
  static serializeBinaryToWriter(message: AddressDatastoreValueFinal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressDatastoreValueFinal;
  static deserializeBinaryFromReader(message: AddressDatastoreValueFinal, reader: jspb.BinaryReader): AddressDatastoreValueFinal;
}

export namespace AddressDatastoreValueFinal {
  export type AsObject = {
    address: string,
    key: Uint8Array | string,
  }
}

export class OpExecutionStatusCandidate extends jspb.Message {
  getOperationId(): string;
  setOperationId(value: string): OpExecutionStatusCandidate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OpExecutionStatusCandidate.AsObject;
  static toObject(includeInstance: boolean, msg: OpExecutionStatusCandidate): OpExecutionStatusCandidate.AsObject;
  static serializeBinaryToWriter(message: OpExecutionStatusCandidate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OpExecutionStatusCandidate;
  static deserializeBinaryFromReader(message: OpExecutionStatusCandidate, reader: jspb.BinaryReader): OpExecutionStatusCandidate;
}

export namespace OpExecutionStatusCandidate {
  export type AsObject = {
    operationId: string,
  }
}

export class OpExecutionStatusFinal extends jspb.Message {
  getOperationId(): string;
  setOperationId(value: string): OpExecutionStatusFinal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OpExecutionStatusFinal.AsObject;
  static toObject(includeInstance: boolean, msg: OpExecutionStatusFinal): OpExecutionStatusFinal.AsObject;
  static serializeBinaryToWriter(message: OpExecutionStatusFinal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OpExecutionStatusFinal;
  static deserializeBinaryFromReader(message: OpExecutionStatusFinal, reader: jspb.BinaryReader): OpExecutionStatusFinal;
}

export namespace OpExecutionStatusFinal {
  export type AsObject = {
    operationId: string,
  }
}

export class DenunciationExecutionStatusCandidate extends jspb.Message {
  getDenunciationIndex(): massa_model_v1_denunciation_pb.DenunciationIndex | undefined;
  setDenunciationIndex(value?: massa_model_v1_denunciation_pb.DenunciationIndex): DenunciationExecutionStatusCandidate;
  hasDenunciationIndex(): boolean;
  clearDenunciationIndex(): DenunciationExecutionStatusCandidate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DenunciationExecutionStatusCandidate.AsObject;
  static toObject(includeInstance: boolean, msg: DenunciationExecutionStatusCandidate): DenunciationExecutionStatusCandidate.AsObject;
  static serializeBinaryToWriter(message: DenunciationExecutionStatusCandidate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DenunciationExecutionStatusCandidate;
  static deserializeBinaryFromReader(message: DenunciationExecutionStatusCandidate, reader: jspb.BinaryReader): DenunciationExecutionStatusCandidate;
}

export namespace DenunciationExecutionStatusCandidate {
  export type AsObject = {
    denunciationIndex?: massa_model_v1_denunciation_pb.DenunciationIndex.AsObject,
  }
}

export class DenunciationExecutionStatusFinal extends jspb.Message {
  getDenunciationIndex(): massa_model_v1_denunciation_pb.DenunciationIndex | undefined;
  setDenunciationIndex(value?: massa_model_v1_denunciation_pb.DenunciationIndex): DenunciationExecutionStatusFinal;
  hasDenunciationIndex(): boolean;
  clearDenunciationIndex(): DenunciationExecutionStatusFinal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DenunciationExecutionStatusFinal.AsObject;
  static toObject(includeInstance: boolean, msg: DenunciationExecutionStatusFinal): DenunciationExecutionStatusFinal.AsObject;
  static serializeBinaryToWriter(message: DenunciationExecutionStatusFinal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DenunciationExecutionStatusFinal;
  static deserializeBinaryFromReader(message: DenunciationExecutionStatusFinal, reader: jspb.BinaryReader): DenunciationExecutionStatusFinal;
}

export namespace DenunciationExecutionStatusFinal {
  export type AsObject = {
    denunciationIndex?: massa_model_v1_denunciation_pb.DenunciationIndex.AsObject,
  }
}

export class AddressRollsCandidate extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressRollsCandidate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressRollsCandidate.AsObject;
  static toObject(includeInstance: boolean, msg: AddressRollsCandidate): AddressRollsCandidate.AsObject;
  static serializeBinaryToWriter(message: AddressRollsCandidate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressRollsCandidate;
  static deserializeBinaryFromReader(message: AddressRollsCandidate, reader: jspb.BinaryReader): AddressRollsCandidate;
}

export namespace AddressRollsCandidate {
  export type AsObject = {
    address: string,
  }
}

export class AddressRollsFinal extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressRollsFinal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressRollsFinal.AsObject;
  static toObject(includeInstance: boolean, msg: AddressRollsFinal): AddressRollsFinal.AsObject;
  static serializeBinaryToWriter(message: AddressRollsFinal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressRollsFinal;
  static deserializeBinaryFromReader(message: AddressRollsFinal, reader: jspb.BinaryReader): AddressRollsFinal;
}

export namespace AddressRollsFinal {
  export type AsObject = {
    address: string,
  }
}

export class AddressDeferredCreditsCandidate extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressDeferredCreditsCandidate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressDeferredCreditsCandidate.AsObject;
  static toObject(includeInstance: boolean, msg: AddressDeferredCreditsCandidate): AddressDeferredCreditsCandidate.AsObject;
  static serializeBinaryToWriter(message: AddressDeferredCreditsCandidate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressDeferredCreditsCandidate;
  static deserializeBinaryFromReader(message: AddressDeferredCreditsCandidate, reader: jspb.BinaryReader): AddressDeferredCreditsCandidate;
}

export namespace AddressDeferredCreditsCandidate {
  export type AsObject = {
    address: string,
  }
}

export class AddressDeferredCreditsFinal extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressDeferredCreditsFinal;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressDeferredCreditsFinal.AsObject;
  static toObject(includeInstance: boolean, msg: AddressDeferredCreditsFinal): AddressDeferredCreditsFinal.AsObject;
  static serializeBinaryToWriter(message: AddressDeferredCreditsFinal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressDeferredCreditsFinal;
  static deserializeBinaryFromReader(message: AddressDeferredCreditsFinal, reader: jspb.BinaryReader): AddressDeferredCreditsFinal;
}

export namespace AddressDeferredCreditsFinal {
  export type AsObject = {
    address: string,
  }
}

export class CycleInfos extends jspb.Message {
  getCycle(): number;
  setCycle(value: number): CycleInfos;

  getRestrictToAddressesList(): Array<string>;
  setRestrictToAddressesList(value: Array<string>): CycleInfos;
  clearRestrictToAddressesList(): CycleInfos;
  addRestrictToAddresses(value: string, index?: number): CycleInfos;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CycleInfos.AsObject;
  static toObject(includeInstance: boolean, msg: CycleInfos): CycleInfos.AsObject;
  static serializeBinaryToWriter(message: CycleInfos, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CycleInfos;
  static deserializeBinaryFromReader(message: CycleInfos, reader: jspb.BinaryReader): CycleInfos;
}

export namespace CycleInfos {
  export type AsObject = {
    cycle: number,
    restrictToAddressesList: Array<string>,
  }
}

export class Events extends jspb.Message {
  getFiltersList(): Array<ScExecutionEventsFilter>;
  setFiltersList(value: Array<ScExecutionEventsFilter>): Events;
  clearFiltersList(): Events;
  addFilters(value?: ScExecutionEventsFilter, index?: number): ScExecutionEventsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Events.AsObject;
  static toObject(includeInstance: boolean, msg: Events): Events.AsObject;
  static serializeBinaryToWriter(message: Events, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Events;
  static deserializeBinaryFromReader(message: Events, reader: jspb.BinaryReader): Events;
}

export namespace Events {
  export type AsObject = {
    filtersList: Array<ScExecutionEventsFilter.AsObject>,
  }
}

export class DeferredCallQuote extends jspb.Message {
  getTargetSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setTargetSlot(value?: massa_model_v1_slot_pb.Slot): DeferredCallQuote;
  hasTargetSlot(): boolean;
  clearTargetSlot(): DeferredCallQuote;

  getMaxGas(): number;
  setMaxGas(value: number): DeferredCallQuote;

  getParamsSize(): number;
  setParamsSize(value: number): DeferredCallQuote;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeferredCallQuote.AsObject;
  static toObject(includeInstance: boolean, msg: DeferredCallQuote): DeferredCallQuote.AsObject;
  static serializeBinaryToWriter(message: DeferredCallQuote, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeferredCallQuote;
  static deserializeBinaryFromReader(message: DeferredCallQuote, reader: jspb.BinaryReader): DeferredCallQuote;
}

export namespace DeferredCallQuote {
  export type AsObject = {
    targetSlot?: massa_model_v1_slot_pb.Slot.AsObject,
    maxGas: number,
    paramsSize: number,
  }
}

export class DeferredCallInfo extends jspb.Message {
  getCallId(): string;
  setCallId(value: string): DeferredCallInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeferredCallInfo.AsObject;
  static toObject(includeInstance: boolean, msg: DeferredCallInfo): DeferredCallInfo.AsObject;
  static serializeBinaryToWriter(message: DeferredCallInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeferredCallInfo;
  static deserializeBinaryFromReader(message: DeferredCallInfo, reader: jspb.BinaryReader): DeferredCallInfo;
}

export namespace DeferredCallInfo {
  export type AsObject = {
    callId: string,
  }
}

export class DeferredCallInfoResponse extends jspb.Message {
  getCallId(): string;
  setCallId(value: string): DeferredCallInfoResponse;

  getCall(): DeferredCallInfoEntry | undefined;
  setCall(value?: DeferredCallInfoEntry): DeferredCallInfoResponse;
  hasCall(): boolean;
  clearCall(): DeferredCallInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeferredCallInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeferredCallInfoResponse): DeferredCallInfoResponse.AsObject;
  static serializeBinaryToWriter(message: DeferredCallInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeferredCallInfoResponse;
  static deserializeBinaryFromReader(message: DeferredCallInfoResponse, reader: jspb.BinaryReader): DeferredCallInfoResponse;
}

export namespace DeferredCallInfoResponse {
  export type AsObject = {
    callId: string,
    call?: DeferredCallInfoEntry.AsObject,
  }
}

export class DeferredCallsBySlot extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): DeferredCallsBySlot;
  hasSlot(): boolean;
  clearSlot(): DeferredCallsBySlot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeferredCallsBySlot.AsObject;
  static toObject(includeInstance: boolean, msg: DeferredCallsBySlot): DeferredCallsBySlot.AsObject;
  static serializeBinaryToWriter(message: DeferredCallsBySlot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeferredCallsBySlot;
  static deserializeBinaryFromReader(message: DeferredCallsBySlot, reader: jspb.BinaryReader): DeferredCallsBySlot;
}

export namespace DeferredCallsBySlot {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
  }
}

export class DeferredCallsBySlotResponse extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): DeferredCallsBySlotResponse;
  hasSlot(): boolean;
  clearSlot(): DeferredCallsBySlotResponse;

  getCallIdsList(): Array<string>;
  setCallIdsList(value: Array<string>): DeferredCallsBySlotResponse;
  clearCallIdsList(): DeferredCallsBySlotResponse;
  addCallIds(value: string, index?: number): DeferredCallsBySlotResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeferredCallsBySlotResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeferredCallsBySlotResponse): DeferredCallsBySlotResponse.AsObject;
  static serializeBinaryToWriter(message: DeferredCallsBySlotResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeferredCallsBySlotResponse;
  static deserializeBinaryFromReader(message: DeferredCallsBySlotResponse, reader: jspb.BinaryReader): DeferredCallsBySlotResponse;
}

export namespace DeferredCallsBySlotResponse {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    callIdsList: Array<string>,
  }
}

export class DeferredCallInfoEntry extends jspb.Message {
  getSenderAddress(): string;
  setSenderAddress(value: string): DeferredCallInfoEntry;

  getTargetSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setTargetSlot(value?: massa_model_v1_slot_pb.Slot): DeferredCallInfoEntry;
  hasTargetSlot(): boolean;
  clearTargetSlot(): DeferredCallInfoEntry;

  getTargetAddress(): string;
  setTargetAddress(value: string): DeferredCallInfoEntry;

  getTargetFunction(): string;
  setTargetFunction(value: string): DeferredCallInfoEntry;

  getParameters(): Uint8Array | string;
  getParameters_asU8(): Uint8Array;
  getParameters_asB64(): string;
  setParameters(value: Uint8Array | string): DeferredCallInfoEntry;

  getCoins(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setCoins(value?: massa_model_v1_amount_pb.NativeAmount): DeferredCallInfoEntry;
  hasCoins(): boolean;
  clearCoins(): DeferredCallInfoEntry;

  getMaxGas(): number;
  setMaxGas(value: number): DeferredCallInfoEntry;

  getFee(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setFee(value?: massa_model_v1_amount_pb.NativeAmount): DeferredCallInfoEntry;
  hasFee(): boolean;
  clearFee(): DeferredCallInfoEntry;

  getCancelled(): boolean;
  setCancelled(value: boolean): DeferredCallInfoEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeferredCallInfoEntry.AsObject;
  static toObject(includeInstance: boolean, msg: DeferredCallInfoEntry): DeferredCallInfoEntry.AsObject;
  static serializeBinaryToWriter(message: DeferredCallInfoEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeferredCallInfoEntry;
  static deserializeBinaryFromReader(message: DeferredCallInfoEntry, reader: jspb.BinaryReader): DeferredCallInfoEntry;
}

export namespace DeferredCallInfoEntry {
  export type AsObject = {
    senderAddress: string,
    targetSlot?: massa_model_v1_slot_pb.Slot.AsObject,
    targetAddress: string,
    targetFunction: string,
    parameters: Uint8Array | string,
    coins?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    maxGas: number,
    fee?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    cancelled: boolean,
  }
}

export class DeferredCallQuoteResponse extends jspb.Message {
  getTargetSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setTargetSlot(value?: massa_model_v1_slot_pb.Slot): DeferredCallQuoteResponse;
  hasTargetSlot(): boolean;
  clearTargetSlot(): DeferredCallQuoteResponse;

  getMaxGasRequest(): number;
  setMaxGasRequest(value: number): DeferredCallQuoteResponse;

  getAvailable(): boolean;
  setAvailable(value: boolean): DeferredCallQuoteResponse;

  getPrice(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setPrice(value?: massa_model_v1_amount_pb.NativeAmount): DeferredCallQuoteResponse;
  hasPrice(): boolean;
  clearPrice(): DeferredCallQuoteResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeferredCallQuoteResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DeferredCallQuoteResponse): DeferredCallQuoteResponse.AsObject;
  static serializeBinaryToWriter(message: DeferredCallQuoteResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeferredCallQuoteResponse;
  static deserializeBinaryFromReader(message: DeferredCallQuoteResponse, reader: jspb.BinaryReader): DeferredCallQuoteResponse;
}

export namespace DeferredCallQuoteResponse {
  export type AsObject = {
    targetSlot?: massa_model_v1_slot_pb.Slot.AsObject,
    maxGasRequest: number,
    available: boolean,
    price?: massa_model_v1_amount_pb.NativeAmount.AsObject,
  }
}

export class QueryStateResponse extends jspb.Message {
  getFinalCursor(): massa_model_v1_slot_pb.Slot | undefined;
  setFinalCursor(value?: massa_model_v1_slot_pb.Slot): QueryStateResponse;
  hasFinalCursor(): boolean;
  clearFinalCursor(): QueryStateResponse;

  getCandidateCursor(): massa_model_v1_slot_pb.Slot | undefined;
  setCandidateCursor(value?: massa_model_v1_slot_pb.Slot): QueryStateResponse;
  hasCandidateCursor(): boolean;
  clearCandidateCursor(): QueryStateResponse;

  getFinalStateFingerprint(): string;
  setFinalStateFingerprint(value: string): QueryStateResponse;

  getResponsesList(): Array<ExecutionQueryResponse>;
  setResponsesList(value: Array<ExecutionQueryResponse>): QueryStateResponse;
  clearResponsesList(): QueryStateResponse;
  addResponses(value?: ExecutionQueryResponse, index?: number): ExecutionQueryResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryStateResponse.AsObject;
  static toObject(includeInstance: boolean, msg: QueryStateResponse): QueryStateResponse.AsObject;
  static serializeBinaryToWriter(message: QueryStateResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryStateResponse;
  static deserializeBinaryFromReader(message: QueryStateResponse, reader: jspb.BinaryReader): QueryStateResponse;
}

export namespace QueryStateResponse {
  export type AsObject = {
    finalCursor?: massa_model_v1_slot_pb.Slot.AsObject,
    candidateCursor?: massa_model_v1_slot_pb.Slot.AsObject,
    finalStateFingerprint: string,
    responsesList: Array<ExecutionQueryResponse.AsObject>,
  }
}

export class ExecutionQueryResponse extends jspb.Message {
  getResult(): ExecutionQueryResponseItem | undefined;
  setResult(value?: ExecutionQueryResponseItem): ExecutionQueryResponse;
  hasResult(): boolean;
  clearResult(): ExecutionQueryResponse;

  getError(): massa_model_v1_commons_pb.Error | undefined;
  setError(value?: massa_model_v1_commons_pb.Error): ExecutionQueryResponse;
  hasError(): boolean;
  clearError(): ExecutionQueryResponse;

  getResponseCase(): ExecutionQueryResponse.ResponseCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionQueryResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionQueryResponse): ExecutionQueryResponse.AsObject;
  static serializeBinaryToWriter(message: ExecutionQueryResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionQueryResponse;
  static deserializeBinaryFromReader(message: ExecutionQueryResponse, reader: jspb.BinaryReader): ExecutionQueryResponse;
}

export namespace ExecutionQueryResponse {
  export type AsObject = {
    result?: ExecutionQueryResponseItem.AsObject,
    error?: massa_model_v1_commons_pb.Error.AsObject,
  }

  export enum ResponseCase { 
    RESPONSE_NOT_SET = 0,
    RESULT = 1,
    ERROR = 2,
  }
}

export class ExecutionQueryResponseItem extends jspb.Message {
  getBoolean(): boolean;
  setBoolean(value: boolean): ExecutionQueryResponseItem;
  hasBoolean(): boolean;
  clearBoolean(): ExecutionQueryResponseItem;

  getRollCount(): number;
  setRollCount(value: number): ExecutionQueryResponseItem;
  hasRollCount(): boolean;
  clearRollCount(): ExecutionQueryResponseItem;

  getAmount(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setAmount(value?: massa_model_v1_amount_pb.NativeAmount): ExecutionQueryResponseItem;
  hasAmount(): boolean;
  clearAmount(): ExecutionQueryResponseItem;

  getBytes(): Uint8Array | string;
  getBytes_asU8(): Uint8Array;
  getBytes_asB64(): string;
  setBytes(value: Uint8Array | string): ExecutionQueryResponseItem;
  hasBytes(): boolean;
  clearBytes(): ExecutionQueryResponseItem;

  getVecBytes(): massa_model_v1_commons_pb.ArrayOfBytesWrapper | undefined;
  setVecBytes(value?: massa_model_v1_commons_pb.ArrayOfBytesWrapper): ExecutionQueryResponseItem;
  hasVecBytes(): boolean;
  clearVecBytes(): ExecutionQueryResponseItem;

  getDeferredCredits(): DeferredCreditsEntryWrapper | undefined;
  setDeferredCredits(value?: DeferredCreditsEntryWrapper): ExecutionQueryResponseItem;
  hasDeferredCredits(): boolean;
  clearDeferredCredits(): ExecutionQueryResponseItem;

  getExecutionStatus(): ExecutionQueryExecutionStatus;
  setExecutionStatus(value: ExecutionQueryExecutionStatus): ExecutionQueryResponseItem;
  hasExecutionStatus(): boolean;
  clearExecutionStatus(): ExecutionQueryResponseItem;

  getCycleInfos(): ExecutionQueryCycleInfos | undefined;
  setCycleInfos(value?: ExecutionQueryCycleInfos): ExecutionQueryResponseItem;
  hasCycleInfos(): boolean;
  clearCycleInfos(): ExecutionQueryResponseItem;

  getEvents(): ScOutputEventsWrapper | undefined;
  setEvents(value?: ScOutputEventsWrapper): ExecutionQueryResponseItem;
  hasEvents(): boolean;
  clearEvents(): ExecutionQueryResponseItem;

  getDeferredCallQuote(): DeferredCallQuoteResponse | undefined;
  setDeferredCallQuote(value?: DeferredCallQuoteResponse): ExecutionQueryResponseItem;
  hasDeferredCallQuote(): boolean;
  clearDeferredCallQuote(): ExecutionQueryResponseItem;

  getDeferredCallInfo(): DeferredCallInfoResponse | undefined;
  setDeferredCallInfo(value?: DeferredCallInfoResponse): ExecutionQueryResponseItem;
  hasDeferredCallInfo(): boolean;
  clearDeferredCallInfo(): ExecutionQueryResponseItem;

  getDeferredCallsBySlot(): DeferredCallsBySlotResponse | undefined;
  setDeferredCallsBySlot(value?: DeferredCallsBySlotResponse): ExecutionQueryResponseItem;
  hasDeferredCallsBySlot(): boolean;
  clearDeferredCallsBySlot(): ExecutionQueryResponseItem;

  getResponseItemCase(): ExecutionQueryResponseItem.ResponseItemCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionQueryResponseItem.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionQueryResponseItem): ExecutionQueryResponseItem.AsObject;
  static serializeBinaryToWriter(message: ExecutionQueryResponseItem, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionQueryResponseItem;
  static deserializeBinaryFromReader(message: ExecutionQueryResponseItem, reader: jspb.BinaryReader): ExecutionQueryResponseItem;
}

export namespace ExecutionQueryResponseItem {
  export type AsObject = {
    pb_boolean?: boolean,
    rollCount?: number,
    amount?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    bytes?: Uint8Array | string,
    vecBytes?: massa_model_v1_commons_pb.ArrayOfBytesWrapper.AsObject,
    deferredCredits?: DeferredCreditsEntryWrapper.AsObject,
    executionStatus?: ExecutionQueryExecutionStatus,
    cycleInfos?: ExecutionQueryCycleInfos.AsObject,
    events?: ScOutputEventsWrapper.AsObject,
    deferredCallQuote?: DeferredCallQuoteResponse.AsObject,
    deferredCallInfo?: DeferredCallInfoResponse.AsObject,
    deferredCallsBySlot?: DeferredCallsBySlotResponse.AsObject,
  }

  export enum ResponseItemCase { 
    RESPONSE_ITEM_NOT_SET = 0,
    BOOLEAN = 1,
    ROLL_COUNT = 2,
    AMOUNT = 3,
    BYTES = 4,
    VEC_BYTES = 5,
    DEFERRED_CREDITS = 6,
    EXECUTION_STATUS = 7,
    CYCLE_INFOS = 8,
    EVENTS = 9,
    DEFERRED_CALL_QUOTE = 10,
    DEFERRED_CALL_INFO = 11,
    DEFERRED_CALLS_BY_SLOT = 12,
  }
}

export class DeferredCreditsEntryWrapper extends jspb.Message {
  getEntriesList(): Array<DeferredCreditsEntry>;
  setEntriesList(value: Array<DeferredCreditsEntry>): DeferredCreditsEntryWrapper;
  clearEntriesList(): DeferredCreditsEntryWrapper;
  addEntries(value?: DeferredCreditsEntry, index?: number): DeferredCreditsEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeferredCreditsEntryWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: DeferredCreditsEntryWrapper): DeferredCreditsEntryWrapper.AsObject;
  static serializeBinaryToWriter(message: DeferredCreditsEntryWrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeferredCreditsEntryWrapper;
  static deserializeBinaryFromReader(message: DeferredCreditsEntryWrapper, reader: jspb.BinaryReader): DeferredCreditsEntryWrapper;
}

export namespace DeferredCreditsEntryWrapper {
  export type AsObject = {
    entriesList: Array<DeferredCreditsEntry.AsObject>,
  }
}

export class DeferredCreditsEntry extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): DeferredCreditsEntry;
  hasSlot(): boolean;
  clearSlot(): DeferredCreditsEntry;

  getAmount(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setAmount(value?: massa_model_v1_amount_pb.NativeAmount): DeferredCreditsEntry;
  hasAmount(): boolean;
  clearAmount(): DeferredCreditsEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeferredCreditsEntry.AsObject;
  static toObject(includeInstance: boolean, msg: DeferredCreditsEntry): DeferredCreditsEntry.AsObject;
  static serializeBinaryToWriter(message: DeferredCreditsEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeferredCreditsEntry;
  static deserializeBinaryFromReader(message: DeferredCreditsEntry, reader: jspb.BinaryReader): DeferredCreditsEntry;
}

export namespace DeferredCreditsEntry {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    amount?: massa_model_v1_amount_pb.NativeAmount.AsObject,
  }
}

export class ExecutionQueryCycleInfos extends jspb.Message {
  getCycle(): number;
  setCycle(value: number): ExecutionQueryCycleInfos;

  getIsFinal(): boolean;
  setIsFinal(value: boolean): ExecutionQueryCycleInfos;

  getStakerInfosList(): Array<ExecutionQueryStakerInfoEntry>;
  setStakerInfosList(value: Array<ExecutionQueryStakerInfoEntry>): ExecutionQueryCycleInfos;
  clearStakerInfosList(): ExecutionQueryCycleInfos;
  addStakerInfos(value?: ExecutionQueryStakerInfoEntry, index?: number): ExecutionQueryStakerInfoEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionQueryCycleInfos.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionQueryCycleInfos): ExecutionQueryCycleInfos.AsObject;
  static serializeBinaryToWriter(message: ExecutionQueryCycleInfos, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionQueryCycleInfos;
  static deserializeBinaryFromReader(message: ExecutionQueryCycleInfos, reader: jspb.BinaryReader): ExecutionQueryCycleInfos;
}

export namespace ExecutionQueryCycleInfos {
  export type AsObject = {
    cycle: number,
    isFinal: boolean,
    stakerInfosList: Array<ExecutionQueryStakerInfoEntry.AsObject>,
  }
}

export class ExecutionQueryStakerInfoEntry extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): ExecutionQueryStakerInfoEntry;

  getInfo(): ExecutionQueryStakerInfo | undefined;
  setInfo(value?: ExecutionQueryStakerInfo): ExecutionQueryStakerInfoEntry;
  hasInfo(): boolean;
  clearInfo(): ExecutionQueryStakerInfoEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionQueryStakerInfoEntry.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionQueryStakerInfoEntry): ExecutionQueryStakerInfoEntry.AsObject;
  static serializeBinaryToWriter(message: ExecutionQueryStakerInfoEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionQueryStakerInfoEntry;
  static deserializeBinaryFromReader(message: ExecutionQueryStakerInfoEntry, reader: jspb.BinaryReader): ExecutionQueryStakerInfoEntry;
}

export namespace ExecutionQueryStakerInfoEntry {
  export type AsObject = {
    address: string,
    info?: ExecutionQueryStakerInfo.AsObject,
  }
}

export class ExecutionQueryStakerInfo extends jspb.Message {
  getActiveRolls(): number;
  setActiveRolls(value: number): ExecutionQueryStakerInfo;

  getProductionStats(): ExecutionQueryStakerInfoProductionStatsEntry | undefined;
  setProductionStats(value?: ExecutionQueryStakerInfoProductionStatsEntry): ExecutionQueryStakerInfo;
  hasProductionStats(): boolean;
  clearProductionStats(): ExecutionQueryStakerInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionQueryStakerInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionQueryStakerInfo): ExecutionQueryStakerInfo.AsObject;
  static serializeBinaryToWriter(message: ExecutionQueryStakerInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionQueryStakerInfo;
  static deserializeBinaryFromReader(message: ExecutionQueryStakerInfo, reader: jspb.BinaryReader): ExecutionQueryStakerInfo;
}

export namespace ExecutionQueryStakerInfo {
  export type AsObject = {
    activeRolls: number,
    productionStats?: ExecutionQueryStakerInfoProductionStatsEntry.AsObject,
  }
}

export class ExecutionQueryStakerInfoProductionStatsEntry extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): ExecutionQueryStakerInfoProductionStatsEntry;

  getStats(): ExecutionQueryStakerInfoProductionStats | undefined;
  setStats(value?: ExecutionQueryStakerInfoProductionStats): ExecutionQueryStakerInfoProductionStatsEntry;
  hasStats(): boolean;
  clearStats(): ExecutionQueryStakerInfoProductionStatsEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionQueryStakerInfoProductionStatsEntry.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionQueryStakerInfoProductionStatsEntry): ExecutionQueryStakerInfoProductionStatsEntry.AsObject;
  static serializeBinaryToWriter(message: ExecutionQueryStakerInfoProductionStatsEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionQueryStakerInfoProductionStatsEntry;
  static deserializeBinaryFromReader(message: ExecutionQueryStakerInfoProductionStatsEntry, reader: jspb.BinaryReader): ExecutionQueryStakerInfoProductionStatsEntry;
}

export namespace ExecutionQueryStakerInfoProductionStatsEntry {
  export type AsObject = {
    address: string,
    stats?: ExecutionQueryStakerInfoProductionStats.AsObject,
  }
}

export class ExecutionQueryStakerInfoProductionStats extends jspb.Message {
  getBlockSuccessCount(): number;
  setBlockSuccessCount(value: number): ExecutionQueryStakerInfoProductionStats;

  getBlockFailureCount(): number;
  setBlockFailureCount(value: number): ExecutionQueryStakerInfoProductionStats;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionQueryStakerInfoProductionStats.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionQueryStakerInfoProductionStats): ExecutionQueryStakerInfoProductionStats.AsObject;
  static serializeBinaryToWriter(message: ExecutionQueryStakerInfoProductionStats, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionQueryStakerInfoProductionStats;
  static deserializeBinaryFromReader(message: ExecutionQueryStakerInfoProductionStats, reader: jspb.BinaryReader): ExecutionQueryStakerInfoProductionStats;
}

export namespace ExecutionQueryStakerInfoProductionStats {
  export type AsObject = {
    blockSuccessCount: number,
    blockFailureCount: number,
  }
}

export class ScOutputEventsWrapper extends jspb.Message {
  getEventsList(): Array<massa_model_v1_execution_pb.ScExecutionEvent>;
  setEventsList(value: Array<massa_model_v1_execution_pb.ScExecutionEvent>): ScOutputEventsWrapper;
  clearEventsList(): ScOutputEventsWrapper;
  addEvents(value?: massa_model_v1_execution_pb.ScExecutionEvent, index?: number): massa_model_v1_execution_pb.ScExecutionEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScOutputEventsWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: ScOutputEventsWrapper): ScOutputEventsWrapper.AsObject;
  static serializeBinaryToWriter(message: ScOutputEventsWrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScOutputEventsWrapper;
  static deserializeBinaryFromReader(message: ScOutputEventsWrapper, reader: jspb.BinaryReader): ScOutputEventsWrapper;
}

export namespace ScOutputEventsWrapper {
  export type AsObject = {
    eventsList: Array<massa_model_v1_execution_pb.ScExecutionEvent.AsObject>,
  }
}

export class NewBlocksRequest extends jspb.Message {
  getFiltersList(): Array<NewBlocksFilter>;
  setFiltersList(value: Array<NewBlocksFilter>): NewBlocksRequest;
  clearFiltersList(): NewBlocksRequest;
  addFilters(value?: NewBlocksFilter, index?: number): NewBlocksFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewBlocksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewBlocksRequest): NewBlocksRequest.AsObject;
  static serializeBinaryToWriter(message: NewBlocksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewBlocksRequest;
  static deserializeBinaryFromReader(message: NewBlocksRequest, reader: jspb.BinaryReader): NewBlocksRequest;
}

export namespace NewBlocksRequest {
  export type AsObject = {
    filtersList: Array<NewBlocksFilter.AsObject>,
  }
}

export class NewBlocksServerRequest extends jspb.Message {
  getFiltersList(): Array<NewBlocksFilter>;
  setFiltersList(value: Array<NewBlocksFilter>): NewBlocksServerRequest;
  clearFiltersList(): NewBlocksServerRequest;
  addFilters(value?: NewBlocksFilter, index?: number): NewBlocksFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewBlocksServerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewBlocksServerRequest): NewBlocksServerRequest.AsObject;
  static serializeBinaryToWriter(message: NewBlocksServerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewBlocksServerRequest;
  static deserializeBinaryFromReader(message: NewBlocksServerRequest, reader: jspb.BinaryReader): NewBlocksServerRequest;
}

export namespace NewBlocksServerRequest {
  export type AsObject = {
    filtersList: Array<NewBlocksFilter.AsObject>,
  }
}

export class NewBlocksFilter extends jspb.Message {
  getBlockIds(): massa_model_v1_block_pb.BlockIds | undefined;
  setBlockIds(value?: massa_model_v1_block_pb.BlockIds): NewBlocksFilter;
  hasBlockIds(): boolean;
  clearBlockIds(): NewBlocksFilter;

  getAddresses(): massa_model_v1_address_pb.Addresses | undefined;
  setAddresses(value?: massa_model_v1_address_pb.Addresses): NewBlocksFilter;
  hasAddresses(): boolean;
  clearAddresses(): NewBlocksFilter;

  getSlotRange(): massa_model_v1_slot_pb.SlotRange | undefined;
  setSlotRange(value?: massa_model_v1_slot_pb.SlotRange): NewBlocksFilter;
  hasSlotRange(): boolean;
  clearSlotRange(): NewBlocksFilter;

  getFilterCase(): NewBlocksFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewBlocksFilter.AsObject;
  static toObject(includeInstance: boolean, msg: NewBlocksFilter): NewBlocksFilter.AsObject;
  static serializeBinaryToWriter(message: NewBlocksFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewBlocksFilter;
  static deserializeBinaryFromReader(message: NewBlocksFilter, reader: jspb.BinaryReader): NewBlocksFilter;
}

export namespace NewBlocksFilter {
  export type AsObject = {
    blockIds?: massa_model_v1_block_pb.BlockIds.AsObject,
    addresses?: massa_model_v1_address_pb.Addresses.AsObject,
    slotRange?: massa_model_v1_slot_pb.SlotRange.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    BLOCK_IDS = 1,
    ADDRESSES = 2,
    SLOT_RANGE = 3,
  }
}

export class NewBlocksResponse extends jspb.Message {
  getSignedBlock(): massa_model_v1_block_pb.SignedBlock | undefined;
  setSignedBlock(value?: massa_model_v1_block_pb.SignedBlock): NewBlocksResponse;
  hasSignedBlock(): boolean;
  clearSignedBlock(): NewBlocksResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewBlocksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewBlocksResponse): NewBlocksResponse.AsObject;
  static serializeBinaryToWriter(message: NewBlocksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewBlocksResponse;
  static deserializeBinaryFromReader(message: NewBlocksResponse, reader: jspb.BinaryReader): NewBlocksResponse;
}

export namespace NewBlocksResponse {
  export type AsObject = {
    signedBlock?: massa_model_v1_block_pb.SignedBlock.AsObject,
  }
}

export class NewBlocksServerResponse extends jspb.Message {
  getSignedBlock(): massa_model_v1_block_pb.SignedBlock | undefined;
  setSignedBlock(value?: massa_model_v1_block_pb.SignedBlock): NewBlocksServerResponse;
  hasSignedBlock(): boolean;
  clearSignedBlock(): NewBlocksServerResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewBlocksServerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewBlocksServerResponse): NewBlocksServerResponse.AsObject;
  static serializeBinaryToWriter(message: NewBlocksServerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewBlocksServerResponse;
  static deserializeBinaryFromReader(message: NewBlocksServerResponse, reader: jspb.BinaryReader): NewBlocksServerResponse;
}

export namespace NewBlocksServerResponse {
  export type AsObject = {
    signedBlock?: massa_model_v1_block_pb.SignedBlock.AsObject,
  }
}

export class NewEndorsementsRequest extends jspb.Message {
  getFiltersList(): Array<NewEndorsementsFilter>;
  setFiltersList(value: Array<NewEndorsementsFilter>): NewEndorsementsRequest;
  clearFiltersList(): NewEndorsementsRequest;
  addFilters(value?: NewEndorsementsFilter, index?: number): NewEndorsementsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewEndorsementsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewEndorsementsRequest): NewEndorsementsRequest.AsObject;
  static serializeBinaryToWriter(message: NewEndorsementsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewEndorsementsRequest;
  static deserializeBinaryFromReader(message: NewEndorsementsRequest, reader: jspb.BinaryReader): NewEndorsementsRequest;
}

export namespace NewEndorsementsRequest {
  export type AsObject = {
    filtersList: Array<NewEndorsementsFilter.AsObject>,
  }
}

export class NewEndorsementsServerRequest extends jspb.Message {
  getFiltersList(): Array<NewEndorsementsFilter>;
  setFiltersList(value: Array<NewEndorsementsFilter>): NewEndorsementsServerRequest;
  clearFiltersList(): NewEndorsementsServerRequest;
  addFilters(value?: NewEndorsementsFilter, index?: number): NewEndorsementsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewEndorsementsServerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewEndorsementsServerRequest): NewEndorsementsServerRequest.AsObject;
  static serializeBinaryToWriter(message: NewEndorsementsServerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewEndorsementsServerRequest;
  static deserializeBinaryFromReader(message: NewEndorsementsServerRequest, reader: jspb.BinaryReader): NewEndorsementsServerRequest;
}

export namespace NewEndorsementsServerRequest {
  export type AsObject = {
    filtersList: Array<NewEndorsementsFilter.AsObject>,
  }
}

export class NewEndorsementsFilter extends jspb.Message {
  getEndorsementIds(): massa_model_v1_endorsement_pb.EndorsementIds | undefined;
  setEndorsementIds(value?: massa_model_v1_endorsement_pb.EndorsementIds): NewEndorsementsFilter;
  hasEndorsementIds(): boolean;
  clearEndorsementIds(): NewEndorsementsFilter;

  getAddresses(): massa_model_v1_address_pb.Addresses | undefined;
  setAddresses(value?: massa_model_v1_address_pb.Addresses): NewEndorsementsFilter;
  hasAddresses(): boolean;
  clearAddresses(): NewEndorsementsFilter;

  getBlockIds(): massa_model_v1_block_pb.BlockIds | undefined;
  setBlockIds(value?: massa_model_v1_block_pb.BlockIds): NewEndorsementsFilter;
  hasBlockIds(): boolean;
  clearBlockIds(): NewEndorsementsFilter;

  getFilterCase(): NewEndorsementsFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewEndorsementsFilter.AsObject;
  static toObject(includeInstance: boolean, msg: NewEndorsementsFilter): NewEndorsementsFilter.AsObject;
  static serializeBinaryToWriter(message: NewEndorsementsFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewEndorsementsFilter;
  static deserializeBinaryFromReader(message: NewEndorsementsFilter, reader: jspb.BinaryReader): NewEndorsementsFilter;
}

export namespace NewEndorsementsFilter {
  export type AsObject = {
    endorsementIds?: massa_model_v1_endorsement_pb.EndorsementIds.AsObject,
    addresses?: massa_model_v1_address_pb.Addresses.AsObject,
    blockIds?: massa_model_v1_block_pb.BlockIds.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    ENDORSEMENT_IDS = 1,
    ADDRESSES = 2,
    BLOCK_IDS = 3,
  }
}

export class NewEndorsementsResponse extends jspb.Message {
  getSignedEndorsement(): massa_model_v1_endorsement_pb.SignedEndorsement | undefined;
  setSignedEndorsement(value?: massa_model_v1_endorsement_pb.SignedEndorsement): NewEndorsementsResponse;
  hasSignedEndorsement(): boolean;
  clearSignedEndorsement(): NewEndorsementsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewEndorsementsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewEndorsementsResponse): NewEndorsementsResponse.AsObject;
  static serializeBinaryToWriter(message: NewEndorsementsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewEndorsementsResponse;
  static deserializeBinaryFromReader(message: NewEndorsementsResponse, reader: jspb.BinaryReader): NewEndorsementsResponse;
}

export namespace NewEndorsementsResponse {
  export type AsObject = {
    signedEndorsement?: massa_model_v1_endorsement_pb.SignedEndorsement.AsObject,
  }
}

export class NewEndorsementsServerResponse extends jspb.Message {
  getSignedEndorsement(): massa_model_v1_endorsement_pb.SignedEndorsement | undefined;
  setSignedEndorsement(value?: massa_model_v1_endorsement_pb.SignedEndorsement): NewEndorsementsServerResponse;
  hasSignedEndorsement(): boolean;
  clearSignedEndorsement(): NewEndorsementsServerResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewEndorsementsServerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewEndorsementsServerResponse): NewEndorsementsServerResponse.AsObject;
  static serializeBinaryToWriter(message: NewEndorsementsServerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewEndorsementsServerResponse;
  static deserializeBinaryFromReader(message: NewEndorsementsServerResponse, reader: jspb.BinaryReader): NewEndorsementsServerResponse;
}

export namespace NewEndorsementsServerResponse {
  export type AsObject = {
    signedEndorsement?: massa_model_v1_endorsement_pb.SignedEndorsement.AsObject,
  }
}

export class NewFilledBlocksRequest extends jspb.Message {
  getFiltersList(): Array<NewBlocksFilter>;
  setFiltersList(value: Array<NewBlocksFilter>): NewFilledBlocksRequest;
  clearFiltersList(): NewFilledBlocksRequest;
  addFilters(value?: NewBlocksFilter, index?: number): NewBlocksFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewFilledBlocksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewFilledBlocksRequest): NewFilledBlocksRequest.AsObject;
  static serializeBinaryToWriter(message: NewFilledBlocksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewFilledBlocksRequest;
  static deserializeBinaryFromReader(message: NewFilledBlocksRequest, reader: jspb.BinaryReader): NewFilledBlocksRequest;
}

export namespace NewFilledBlocksRequest {
  export type AsObject = {
    filtersList: Array<NewBlocksFilter.AsObject>,
  }
}

export class NewFilledBlocksServerRequest extends jspb.Message {
  getFiltersList(): Array<NewBlocksFilter>;
  setFiltersList(value: Array<NewBlocksFilter>): NewFilledBlocksServerRequest;
  clearFiltersList(): NewFilledBlocksServerRequest;
  addFilters(value?: NewBlocksFilter, index?: number): NewBlocksFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewFilledBlocksServerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewFilledBlocksServerRequest): NewFilledBlocksServerRequest.AsObject;
  static serializeBinaryToWriter(message: NewFilledBlocksServerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewFilledBlocksServerRequest;
  static deserializeBinaryFromReader(message: NewFilledBlocksServerRequest, reader: jspb.BinaryReader): NewFilledBlocksServerRequest;
}

export namespace NewFilledBlocksServerRequest {
  export type AsObject = {
    filtersList: Array<NewBlocksFilter.AsObject>,
  }
}

export class NewFilledBlocksFilter extends jspb.Message {
  getBlockIds(): massa_model_v1_block_pb.BlockIds | undefined;
  setBlockIds(value?: massa_model_v1_block_pb.BlockIds): NewFilledBlocksFilter;
  hasBlockIds(): boolean;
  clearBlockIds(): NewFilledBlocksFilter;

  getAddresses(): massa_model_v1_address_pb.Addresses | undefined;
  setAddresses(value?: massa_model_v1_address_pb.Addresses): NewFilledBlocksFilter;
  hasAddresses(): boolean;
  clearAddresses(): NewFilledBlocksFilter;

  getSlotRange(): massa_model_v1_slot_pb.SlotRange | undefined;
  setSlotRange(value?: massa_model_v1_slot_pb.SlotRange): NewFilledBlocksFilter;
  hasSlotRange(): boolean;
  clearSlotRange(): NewFilledBlocksFilter;

  getFilterCase(): NewFilledBlocksFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewFilledBlocksFilter.AsObject;
  static toObject(includeInstance: boolean, msg: NewFilledBlocksFilter): NewFilledBlocksFilter.AsObject;
  static serializeBinaryToWriter(message: NewFilledBlocksFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewFilledBlocksFilter;
  static deserializeBinaryFromReader(message: NewFilledBlocksFilter, reader: jspb.BinaryReader): NewFilledBlocksFilter;
}

export namespace NewFilledBlocksFilter {
  export type AsObject = {
    blockIds?: massa_model_v1_block_pb.BlockIds.AsObject,
    addresses?: massa_model_v1_address_pb.Addresses.AsObject,
    slotRange?: massa_model_v1_slot_pb.SlotRange.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    BLOCK_IDS = 1,
    ADDRESSES = 2,
    SLOT_RANGE = 3,
  }
}

export class NewFilledBlocksResponse extends jspb.Message {
  getFilledBlock(): massa_model_v1_block_pb.FilledBlock | undefined;
  setFilledBlock(value?: massa_model_v1_block_pb.FilledBlock): NewFilledBlocksResponse;
  hasFilledBlock(): boolean;
  clearFilledBlock(): NewFilledBlocksResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewFilledBlocksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewFilledBlocksResponse): NewFilledBlocksResponse.AsObject;
  static serializeBinaryToWriter(message: NewFilledBlocksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewFilledBlocksResponse;
  static deserializeBinaryFromReader(message: NewFilledBlocksResponse, reader: jspb.BinaryReader): NewFilledBlocksResponse;
}

export namespace NewFilledBlocksResponse {
  export type AsObject = {
    filledBlock?: massa_model_v1_block_pb.FilledBlock.AsObject,
  }
}

export class NewFilledBlocksServerResponse extends jspb.Message {
  getFilledBlock(): massa_model_v1_block_pb.FilledBlock | undefined;
  setFilledBlock(value?: massa_model_v1_block_pb.FilledBlock): NewFilledBlocksServerResponse;
  hasFilledBlock(): boolean;
  clearFilledBlock(): NewFilledBlocksServerResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewFilledBlocksServerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewFilledBlocksServerResponse): NewFilledBlocksServerResponse.AsObject;
  static serializeBinaryToWriter(message: NewFilledBlocksServerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewFilledBlocksServerResponse;
  static deserializeBinaryFromReader(message: NewFilledBlocksServerResponse, reader: jspb.BinaryReader): NewFilledBlocksServerResponse;
}

export namespace NewFilledBlocksServerResponse {
  export type AsObject = {
    filledBlock?: massa_model_v1_block_pb.FilledBlock.AsObject,
  }
}

export class NewOperationsRequest extends jspb.Message {
  getFiltersList(): Array<NewOperationsFilter>;
  setFiltersList(value: Array<NewOperationsFilter>): NewOperationsRequest;
  clearFiltersList(): NewOperationsRequest;
  addFilters(value?: NewOperationsFilter, index?: number): NewOperationsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewOperationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewOperationsRequest): NewOperationsRequest.AsObject;
  static serializeBinaryToWriter(message: NewOperationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewOperationsRequest;
  static deserializeBinaryFromReader(message: NewOperationsRequest, reader: jspb.BinaryReader): NewOperationsRequest;
}

export namespace NewOperationsRequest {
  export type AsObject = {
    filtersList: Array<NewOperationsFilter.AsObject>,
  }
}

export class NewOperationsServerRequest extends jspb.Message {
  getFiltersList(): Array<NewOperationsFilter>;
  setFiltersList(value: Array<NewOperationsFilter>): NewOperationsServerRequest;
  clearFiltersList(): NewOperationsServerRequest;
  addFilters(value?: NewOperationsFilter, index?: number): NewOperationsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewOperationsServerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewOperationsServerRequest): NewOperationsServerRequest.AsObject;
  static serializeBinaryToWriter(message: NewOperationsServerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewOperationsServerRequest;
  static deserializeBinaryFromReader(message: NewOperationsServerRequest, reader: jspb.BinaryReader): NewOperationsServerRequest;
}

export namespace NewOperationsServerRequest {
  export type AsObject = {
    filtersList: Array<NewOperationsFilter.AsObject>,
  }
}

export class NewOperationsFilter extends jspb.Message {
  getOperationIds(): massa_model_v1_operation_pb.OperationIds | undefined;
  setOperationIds(value?: massa_model_v1_operation_pb.OperationIds): NewOperationsFilter;
  hasOperationIds(): boolean;
  clearOperationIds(): NewOperationsFilter;

  getAddresses(): massa_model_v1_address_pb.Addresses | undefined;
  setAddresses(value?: massa_model_v1_address_pb.Addresses): NewOperationsFilter;
  hasAddresses(): boolean;
  clearAddresses(): NewOperationsFilter;

  getOperationTypes(): massa_model_v1_operation_pb.OpTypes | undefined;
  setOperationTypes(value?: massa_model_v1_operation_pb.OpTypes): NewOperationsFilter;
  hasOperationTypes(): boolean;
  clearOperationTypes(): NewOperationsFilter;

  getFilterCase(): NewOperationsFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewOperationsFilter.AsObject;
  static toObject(includeInstance: boolean, msg: NewOperationsFilter): NewOperationsFilter.AsObject;
  static serializeBinaryToWriter(message: NewOperationsFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewOperationsFilter;
  static deserializeBinaryFromReader(message: NewOperationsFilter, reader: jspb.BinaryReader): NewOperationsFilter;
}

export namespace NewOperationsFilter {
  export type AsObject = {
    operationIds?: massa_model_v1_operation_pb.OperationIds.AsObject,
    addresses?: massa_model_v1_address_pb.Addresses.AsObject,
    operationTypes?: massa_model_v1_operation_pb.OpTypes.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    OPERATION_IDS = 1,
    ADDRESSES = 2,
    OPERATION_TYPES = 3,
  }
}

export class NewOperationsResponse extends jspb.Message {
  getSignedOperation(): massa_model_v1_operation_pb.SignedOperation | undefined;
  setSignedOperation(value?: massa_model_v1_operation_pb.SignedOperation): NewOperationsResponse;
  hasSignedOperation(): boolean;
  clearSignedOperation(): NewOperationsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewOperationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewOperationsResponse): NewOperationsResponse.AsObject;
  static serializeBinaryToWriter(message: NewOperationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewOperationsResponse;
  static deserializeBinaryFromReader(message: NewOperationsResponse, reader: jspb.BinaryReader): NewOperationsResponse;
}

export namespace NewOperationsResponse {
  export type AsObject = {
    signedOperation?: massa_model_v1_operation_pb.SignedOperation.AsObject,
  }
}

export class NewOperationsServerResponse extends jspb.Message {
  getSignedOperation(): massa_model_v1_operation_pb.SignedOperation | undefined;
  setSignedOperation(value?: massa_model_v1_operation_pb.SignedOperation): NewOperationsServerResponse;
  hasSignedOperation(): boolean;
  clearSignedOperation(): NewOperationsServerResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewOperationsServerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewOperationsServerResponse): NewOperationsServerResponse.AsObject;
  static serializeBinaryToWriter(message: NewOperationsServerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewOperationsServerResponse;
  static deserializeBinaryFromReader(message: NewOperationsServerResponse, reader: jspb.BinaryReader): NewOperationsServerResponse;
}

export namespace NewOperationsServerResponse {
  export type AsObject = {
    signedOperation?: massa_model_v1_operation_pb.SignedOperation.AsObject,
  }
}

export class NewTransfersInfoServerRequest extends jspb.Message {
  getAddress(): google_protobuf_wrappers_pb.StringValue | undefined;
  setAddress(value?: google_protobuf_wrappers_pb.StringValue): NewTransfersInfoServerRequest;
  hasAddress(): boolean;
  clearAddress(): NewTransfersInfoServerRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewTransfersInfoServerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewTransfersInfoServerRequest): NewTransfersInfoServerRequest.AsObject;
  static serializeBinaryToWriter(message: NewTransfersInfoServerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewTransfersInfoServerRequest;
  static deserializeBinaryFromReader(message: NewTransfersInfoServerRequest, reader: jspb.BinaryReader): NewTransfersInfoServerRequest;
}

export namespace NewTransfersInfoServerRequest {
  export type AsObject = {
    address?: google_protobuf_wrappers_pb.StringValue.AsObject,
  }
}

export class NewTransfersInfoServerResponse extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): NewTransfersInfoServerResponse;
  hasSlot(): boolean;
  clearSlot(): NewTransfersInfoServerResponse;

  getTimestamp(): number;
  setTimestamp(value: number): NewTransfersInfoServerResponse;

  getBlockId(): google_protobuf_wrappers_pb.StringValue | undefined;
  setBlockId(value?: google_protobuf_wrappers_pb.StringValue): NewTransfersInfoServerResponse;
  hasBlockId(): boolean;
  clearBlockId(): NewTransfersInfoServerResponse;

  getTransfersInfoList(): Array<massa_model_v1_execution_pb.ExecTransferInfo>;
  setTransfersInfoList(value: Array<massa_model_v1_execution_pb.ExecTransferInfo>): NewTransfersInfoServerResponse;
  clearTransfersInfoList(): NewTransfersInfoServerResponse;
  addTransfersInfo(value?: massa_model_v1_execution_pb.ExecTransferInfo, index?: number): massa_model_v1_execution_pb.ExecTransferInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewTransfersInfoServerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewTransfersInfoServerResponse): NewTransfersInfoServerResponse.AsObject;
  static serializeBinaryToWriter(message: NewTransfersInfoServerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewTransfersInfoServerResponse;
  static deserializeBinaryFromReader(message: NewTransfersInfoServerResponse, reader: jspb.BinaryReader): NewTransfersInfoServerResponse;
}

export namespace NewTransfersInfoServerResponse {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    timestamp: number,
    blockId?: google_protobuf_wrappers_pb.StringValue.AsObject,
    transfersInfoList: Array<massa_model_v1_execution_pb.ExecTransferInfo.AsObject>,
  }
}

export class NewSlotExecutionOutputsRequest extends jspb.Message {
  getFiltersList(): Array<NewSlotExecutionOutputsFilter>;
  setFiltersList(value: Array<NewSlotExecutionOutputsFilter>): NewSlotExecutionOutputsRequest;
  clearFiltersList(): NewSlotExecutionOutputsRequest;
  addFilters(value?: NewSlotExecutionOutputsFilter, index?: number): NewSlotExecutionOutputsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewSlotExecutionOutputsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewSlotExecutionOutputsRequest): NewSlotExecutionOutputsRequest.AsObject;
  static serializeBinaryToWriter(message: NewSlotExecutionOutputsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewSlotExecutionOutputsRequest;
  static deserializeBinaryFromReader(message: NewSlotExecutionOutputsRequest, reader: jspb.BinaryReader): NewSlotExecutionOutputsRequest;
}

export namespace NewSlotExecutionOutputsRequest {
  export type AsObject = {
    filtersList: Array<NewSlotExecutionOutputsFilter.AsObject>,
  }
}

export class NewSlotExecutionOutputsServerRequest extends jspb.Message {
  getFiltersList(): Array<NewSlotExecutionOutputsFilter>;
  setFiltersList(value: Array<NewSlotExecutionOutputsFilter>): NewSlotExecutionOutputsServerRequest;
  clearFiltersList(): NewSlotExecutionOutputsServerRequest;
  addFilters(value?: NewSlotExecutionOutputsFilter, index?: number): NewSlotExecutionOutputsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewSlotExecutionOutputsServerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewSlotExecutionOutputsServerRequest): NewSlotExecutionOutputsServerRequest.AsObject;
  static serializeBinaryToWriter(message: NewSlotExecutionOutputsServerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewSlotExecutionOutputsServerRequest;
  static deserializeBinaryFromReader(message: NewSlotExecutionOutputsServerRequest, reader: jspb.BinaryReader): NewSlotExecutionOutputsServerRequest;
}

export namespace NewSlotExecutionOutputsServerRequest {
  export type AsObject = {
    filtersList: Array<NewSlotExecutionOutputsFilter.AsObject>,
  }
}

export class NewSlotExecutionOutputsFilter extends jspb.Message {
  getStatus(): massa_model_v1_execution_pb.ExecutionOutputStatus;
  setStatus(value: massa_model_v1_execution_pb.ExecutionOutputStatus): NewSlotExecutionOutputsFilter;
  hasStatus(): boolean;
  clearStatus(): NewSlotExecutionOutputsFilter;

  getSlotRange(): massa_model_v1_slot_pb.SlotRange | undefined;
  setSlotRange(value?: massa_model_v1_slot_pb.SlotRange): NewSlotExecutionOutputsFilter;
  hasSlotRange(): boolean;
  clearSlotRange(): NewSlotExecutionOutputsFilter;

  getAsyncPoolChangesFilter(): AsyncPoolChangesFilter | undefined;
  setAsyncPoolChangesFilter(value?: AsyncPoolChangesFilter): NewSlotExecutionOutputsFilter;
  hasAsyncPoolChangesFilter(): boolean;
  clearAsyncPoolChangesFilter(): NewSlotExecutionOutputsFilter;

  getExecutedDenounciationFilter(): ExecutedDenounciationFilter | undefined;
  setExecutedDenounciationFilter(value?: ExecutedDenounciationFilter): NewSlotExecutionOutputsFilter;
  hasExecutedDenounciationFilter(): boolean;
  clearExecutedDenounciationFilter(): NewSlotExecutionOutputsFilter;

  getEventFilter(): ExecutionEventFilter | undefined;
  setEventFilter(value?: ExecutionEventFilter): NewSlotExecutionOutputsFilter;
  hasEventFilter(): boolean;
  clearEventFilter(): NewSlotExecutionOutputsFilter;

  getExecutedOpsChangesFilter(): ExecutedOpsChangesFilter | undefined;
  setExecutedOpsChangesFilter(value?: ExecutedOpsChangesFilter): NewSlotExecutionOutputsFilter;
  hasExecutedOpsChangesFilter(): boolean;
  clearExecutedOpsChangesFilter(): NewSlotExecutionOutputsFilter;

  getLedgerChangesFilter(): LedgerChangesFilter | undefined;
  setLedgerChangesFilter(value?: LedgerChangesFilter): NewSlotExecutionOutputsFilter;
  hasLedgerChangesFilter(): boolean;
  clearLedgerChangesFilter(): NewSlotExecutionOutputsFilter;

  getFilterCase(): NewSlotExecutionOutputsFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewSlotExecutionOutputsFilter.AsObject;
  static toObject(includeInstance: boolean, msg: NewSlotExecutionOutputsFilter): NewSlotExecutionOutputsFilter.AsObject;
  static serializeBinaryToWriter(message: NewSlotExecutionOutputsFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewSlotExecutionOutputsFilter;
  static deserializeBinaryFromReader(message: NewSlotExecutionOutputsFilter, reader: jspb.BinaryReader): NewSlotExecutionOutputsFilter;
}

export namespace NewSlotExecutionOutputsFilter {
  export type AsObject = {
    status?: massa_model_v1_execution_pb.ExecutionOutputStatus,
    slotRange?: massa_model_v1_slot_pb.SlotRange.AsObject,
    asyncPoolChangesFilter?: AsyncPoolChangesFilter.AsObject,
    executedDenounciationFilter?: ExecutedDenounciationFilter.AsObject,
    eventFilter?: ExecutionEventFilter.AsObject,
    executedOpsChangesFilter?: ExecutedOpsChangesFilter.AsObject,
    ledgerChangesFilter?: LedgerChangesFilter.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    STATUS = 1,
    SLOT_RANGE = 2,
    ASYNC_POOL_CHANGES_FILTER = 3,
    EXECUTED_DENOUNCIATION_FILTER = 4,
    EVENT_FILTER = 5,
    EXECUTED_OPS_CHANGES_FILTER = 6,
    LEDGER_CHANGES_FILTER = 7,
  }
}

export class AsyncPoolChangesFilter extends jspb.Message {
  getNone(): massa_model_v1_commons_pb.Empty | undefined;
  setNone(value?: massa_model_v1_commons_pb.Empty): AsyncPoolChangesFilter;
  hasNone(): boolean;
  clearNone(): AsyncPoolChangesFilter;

  getType(): massa_model_v1_execution_pb.AsyncPoolChangeType;
  setType(value: massa_model_v1_execution_pb.AsyncPoolChangeType): AsyncPoolChangesFilter;
  hasType(): boolean;
  clearType(): AsyncPoolChangesFilter;

  getHandler(): string;
  setHandler(value: string): AsyncPoolChangesFilter;
  hasHandler(): boolean;
  clearHandler(): AsyncPoolChangesFilter;

  getDestinationAddress(): string;
  setDestinationAddress(value: string): AsyncPoolChangesFilter;
  hasDestinationAddress(): boolean;
  clearDestinationAddress(): AsyncPoolChangesFilter;

  getEmitterAddress(): string;
  setEmitterAddress(value: string): AsyncPoolChangesFilter;
  hasEmitterAddress(): boolean;
  clearEmitterAddress(): AsyncPoolChangesFilter;

  getCanBeExecuted(): boolean;
  setCanBeExecuted(value: boolean): AsyncPoolChangesFilter;
  hasCanBeExecuted(): boolean;
  clearCanBeExecuted(): AsyncPoolChangesFilter;

  getFilterCase(): AsyncPoolChangesFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AsyncPoolChangesFilter.AsObject;
  static toObject(includeInstance: boolean, msg: AsyncPoolChangesFilter): AsyncPoolChangesFilter.AsObject;
  static serializeBinaryToWriter(message: AsyncPoolChangesFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AsyncPoolChangesFilter;
  static deserializeBinaryFromReader(message: AsyncPoolChangesFilter, reader: jspb.BinaryReader): AsyncPoolChangesFilter;
}

export namespace AsyncPoolChangesFilter {
  export type AsObject = {
    none?: massa_model_v1_commons_pb.Empty.AsObject,
    type?: massa_model_v1_execution_pb.AsyncPoolChangeType,
    handler?: string,
    destinationAddress?: string,
    emitterAddress?: string,
    canBeExecuted?: boolean,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    NONE = 1,
    TYPE = 2,
    HANDLER = 3,
    DESTINATION_ADDRESS = 4,
    EMITTER_ADDRESS = 5,
    CAN_BE_EXECUTED = 6,
  }
}

export class PosChangesFilter extends jspb.Message {
  getNone(): massa_model_v1_commons_pb.Empty | undefined;
  setNone(value?: massa_model_v1_commons_pb.Empty): PosChangesFilter;
  hasNone(): boolean;
  clearNone(): PosChangesFilter;

  getAddress(): string;
  setAddress(value: string): PosChangesFilter;
  hasAddress(): boolean;
  clearAddress(): PosChangesFilter;

  getFilterCase(): PosChangesFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PosChangesFilter.AsObject;
  static toObject(includeInstance: boolean, msg: PosChangesFilter): PosChangesFilter.AsObject;
  static serializeBinaryToWriter(message: PosChangesFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PosChangesFilter;
  static deserializeBinaryFromReader(message: PosChangesFilter, reader: jspb.BinaryReader): PosChangesFilter;
}

export namespace PosChangesFilter {
  export type AsObject = {
    none?: massa_model_v1_commons_pb.Empty.AsObject,
    address?: string,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    NONE = 1,
    ADDRESS = 2,
  }
}

export class ExecutionEventFilter extends jspb.Message {
  getNone(): massa_model_v1_commons_pb.Empty | undefined;
  setNone(value?: massa_model_v1_commons_pb.Empty): ExecutionEventFilter;
  hasNone(): boolean;
  clearNone(): ExecutionEventFilter;

  getCallerAddress(): string;
  setCallerAddress(value: string): ExecutionEventFilter;
  hasCallerAddress(): boolean;
  clearCallerAddress(): ExecutionEventFilter;

  getEmitterAddress(): string;
  setEmitterAddress(value: string): ExecutionEventFilter;
  hasEmitterAddress(): boolean;
  clearEmitterAddress(): ExecutionEventFilter;

  getOriginalOperationId(): string;
  setOriginalOperationId(value: string): ExecutionEventFilter;
  hasOriginalOperationId(): boolean;
  clearOriginalOperationId(): ExecutionEventFilter;

  getIsFailure(): boolean;
  setIsFailure(value: boolean): ExecutionEventFilter;
  hasIsFailure(): boolean;
  clearIsFailure(): ExecutionEventFilter;

  getFilterCase(): ExecutionEventFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionEventFilter.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionEventFilter): ExecutionEventFilter.AsObject;
  static serializeBinaryToWriter(message: ExecutionEventFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionEventFilter;
  static deserializeBinaryFromReader(message: ExecutionEventFilter, reader: jspb.BinaryReader): ExecutionEventFilter;
}

export namespace ExecutionEventFilter {
  export type AsObject = {
    none?: massa_model_v1_commons_pb.Empty.AsObject,
    callerAddress?: string,
    emitterAddress?: string,
    originalOperationId?: string,
    isFailure?: boolean,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    NONE = 1,
    CALLER_ADDRESS = 2,
    EMITTER_ADDRESS = 3,
    ORIGINAL_OPERATION_ID = 4,
    IS_FAILURE = 5,
  }
}

export class ExecutedOpsChangesFilter extends jspb.Message {
  getNone(): massa_model_v1_commons_pb.Empty | undefined;
  setNone(value?: massa_model_v1_commons_pb.Empty): ExecutedOpsChangesFilter;
  hasNone(): boolean;
  clearNone(): ExecutedOpsChangesFilter;

  getOperationId(): string;
  setOperationId(value: string): ExecutedOpsChangesFilter;
  hasOperationId(): boolean;
  clearOperationId(): ExecutedOpsChangesFilter;

  getFilterCase(): ExecutedOpsChangesFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutedOpsChangesFilter.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutedOpsChangesFilter): ExecutedOpsChangesFilter.AsObject;
  static serializeBinaryToWriter(message: ExecutedOpsChangesFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutedOpsChangesFilter;
  static deserializeBinaryFromReader(message: ExecutedOpsChangesFilter, reader: jspb.BinaryReader): ExecutedOpsChangesFilter;
}

export namespace ExecutedOpsChangesFilter {
  export type AsObject = {
    none?: massa_model_v1_commons_pb.Empty.AsObject,
    operationId?: string,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    NONE = 1,
    OPERATION_ID = 2,
  }
}

export class ExecutedDenounciationFilter extends jspb.Message {
  getNone(): massa_model_v1_commons_pb.Empty | undefined;
  setNone(value?: massa_model_v1_commons_pb.Empty): ExecutedDenounciationFilter;
  hasNone(): boolean;
  clearNone(): ExecutedDenounciationFilter;

  getFilterCase(): ExecutedDenounciationFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutedDenounciationFilter.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutedDenounciationFilter): ExecutedDenounciationFilter.AsObject;
  static serializeBinaryToWriter(message: ExecutedDenounciationFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutedDenounciationFilter;
  static deserializeBinaryFromReader(message: ExecutedDenounciationFilter, reader: jspb.BinaryReader): ExecutedDenounciationFilter;
}

export namespace ExecutedDenounciationFilter {
  export type AsObject = {
    none?: massa_model_v1_commons_pb.Empty.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    NONE = 1,
  }
}

export class LedgerChangesFilter extends jspb.Message {
  getNone(): massa_model_v1_commons_pb.Empty | undefined;
  setNone(value?: massa_model_v1_commons_pb.Empty): LedgerChangesFilter;
  hasNone(): boolean;
  clearNone(): LedgerChangesFilter;

  getAddress(): string;
  setAddress(value: string): LedgerChangesFilter;
  hasAddress(): boolean;
  clearAddress(): LedgerChangesFilter;

  getFilterCase(): LedgerChangesFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LedgerChangesFilter.AsObject;
  static toObject(includeInstance: boolean, msg: LedgerChangesFilter): LedgerChangesFilter.AsObject;
  static serializeBinaryToWriter(message: LedgerChangesFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LedgerChangesFilter;
  static deserializeBinaryFromReader(message: LedgerChangesFilter, reader: jspb.BinaryReader): LedgerChangesFilter;
}

export namespace LedgerChangesFilter {
  export type AsObject = {
    none?: massa_model_v1_commons_pb.Empty.AsObject,
    address?: string,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    NONE = 1,
    ADDRESS = 2,
  }
}

export class NewSlotExecutionOutputsResponse extends jspb.Message {
  getOutput(): massa_model_v1_execution_pb.SlotExecutionOutput | undefined;
  setOutput(value?: massa_model_v1_execution_pb.SlotExecutionOutput): NewSlotExecutionOutputsResponse;
  hasOutput(): boolean;
  clearOutput(): NewSlotExecutionOutputsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewSlotExecutionOutputsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewSlotExecutionOutputsResponse): NewSlotExecutionOutputsResponse.AsObject;
  static serializeBinaryToWriter(message: NewSlotExecutionOutputsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewSlotExecutionOutputsResponse;
  static deserializeBinaryFromReader(message: NewSlotExecutionOutputsResponse, reader: jspb.BinaryReader): NewSlotExecutionOutputsResponse;
}

export namespace NewSlotExecutionOutputsResponse {
  export type AsObject = {
    output?: massa_model_v1_execution_pb.SlotExecutionOutput.AsObject,
  }
}

export class NewSlotExecutionOutputsServerResponse extends jspb.Message {
  getOutput(): massa_model_v1_execution_pb.SlotExecutionOutput | undefined;
  setOutput(value?: massa_model_v1_execution_pb.SlotExecutionOutput): NewSlotExecutionOutputsServerResponse;
  hasOutput(): boolean;
  clearOutput(): NewSlotExecutionOutputsServerResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewSlotExecutionOutputsServerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewSlotExecutionOutputsServerResponse): NewSlotExecutionOutputsServerResponse.AsObject;
  static serializeBinaryToWriter(message: NewSlotExecutionOutputsServerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewSlotExecutionOutputsServerResponse;
  static deserializeBinaryFromReader(message: NewSlotExecutionOutputsServerResponse, reader: jspb.BinaryReader): NewSlotExecutionOutputsServerResponse;
}

export namespace NewSlotExecutionOutputsServerResponse {
  export type AsObject = {
    output?: massa_model_v1_execution_pb.SlotExecutionOutput.AsObject,
  }
}

export class NewSlotABICallStacksRequest extends jspb.Message {
  getFinalityLevel(): FinalityLevel;
  setFinalityLevel(value: FinalityLevel): NewSlotABICallStacksRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewSlotABICallStacksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewSlotABICallStacksRequest): NewSlotABICallStacksRequest.AsObject;
  static serializeBinaryToWriter(message: NewSlotABICallStacksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewSlotABICallStacksRequest;
  static deserializeBinaryFromReader(message: NewSlotABICallStacksRequest, reader: jspb.BinaryReader): NewSlotABICallStacksRequest;
}

export namespace NewSlotABICallStacksRequest {
  export type AsObject = {
    finalityLevel: FinalityLevel,
  }
}

export class NewSlotABICallStacksResponse extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): NewSlotABICallStacksResponse;
  hasSlot(): boolean;
  clearSlot(): NewSlotABICallStacksResponse;

  getAscCallStacksList(): Array<ASCABICallStack>;
  setAscCallStacksList(value: Array<ASCABICallStack>): NewSlotABICallStacksResponse;
  clearAscCallStacksList(): NewSlotABICallStacksResponse;
  addAscCallStacks(value?: ASCABICallStack, index?: number): ASCABICallStack;

  getOperationCallStacksList(): Array<OperationABICallStack>;
  setOperationCallStacksList(value: Array<OperationABICallStack>): NewSlotABICallStacksResponse;
  clearOperationCallStacksList(): NewSlotABICallStacksResponse;
  addOperationCallStacks(value?: OperationABICallStack, index?: number): OperationABICallStack;

  getDeferredCallStacksList(): Array<DeferredCallABICallStack>;
  setDeferredCallStacksList(value: Array<DeferredCallABICallStack>): NewSlotABICallStacksResponse;
  clearDeferredCallStacksList(): NewSlotABICallStacksResponse;
  addDeferredCallStacks(value?: DeferredCallABICallStack, index?: number): DeferredCallABICallStack;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewSlotABICallStacksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewSlotABICallStacksResponse): NewSlotABICallStacksResponse.AsObject;
  static serializeBinaryToWriter(message: NewSlotABICallStacksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewSlotABICallStacksResponse;
  static deserializeBinaryFromReader(message: NewSlotABICallStacksResponse, reader: jspb.BinaryReader): NewSlotABICallStacksResponse;
}

export namespace NewSlotABICallStacksResponse {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    ascCallStacksList: Array<ASCABICallStack.AsObject>,
    operationCallStacksList: Array<OperationABICallStack.AsObject>,
    deferredCallStacksList: Array<DeferredCallABICallStack.AsObject>,
  }
}

export class NewSlotTransfersRequest extends jspb.Message {
  getFinalityLevel(): FinalityLevel;
  setFinalityLevel(value: FinalityLevel): NewSlotTransfersRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewSlotTransfersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NewSlotTransfersRequest): NewSlotTransfersRequest.AsObject;
  static serializeBinaryToWriter(message: NewSlotTransfersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewSlotTransfersRequest;
  static deserializeBinaryFromReader(message: NewSlotTransfersRequest, reader: jspb.BinaryReader): NewSlotTransfersRequest;
}

export namespace NewSlotTransfersRequest {
  export type AsObject = {
    finalityLevel: FinalityLevel,
  }
}

export class NewSlotTransfersResponse extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): NewSlotTransfersResponse;
  hasSlot(): boolean;
  clearSlot(): NewSlotTransfersResponse;

  getTransfersList(): Array<TransferInfo>;
  setTransfersList(value: Array<TransferInfo>): NewSlotTransfersResponse;
  clearTransfersList(): NewSlotTransfersResponse;
  addTransfers(value?: TransferInfo, index?: number): TransferInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NewSlotTransfersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: NewSlotTransfersResponse): NewSlotTransfersResponse.AsObject;
  static serializeBinaryToWriter(message: NewSlotTransfersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NewSlotTransfersResponse;
  static deserializeBinaryFromReader(message: NewSlotTransfersResponse, reader: jspb.BinaryReader): NewSlotTransfersResponse;
}

export namespace NewSlotTransfersResponse {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    transfersList: Array<TransferInfo.AsObject>,
  }
}

export class SendBlocksRequest extends jspb.Message {
  getBlock(): Uint8Array | string;
  getBlock_asU8(): Uint8Array;
  getBlock_asB64(): string;
  setBlock(value: Uint8Array | string): SendBlocksRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendBlocksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendBlocksRequest): SendBlocksRequest.AsObject;
  static serializeBinaryToWriter(message: SendBlocksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendBlocksRequest;
  static deserializeBinaryFromReader(message: SendBlocksRequest, reader: jspb.BinaryReader): SendBlocksRequest;
}

export namespace SendBlocksRequest {
  export type AsObject = {
    block: Uint8Array | string,
  }
}

export class SendBlocksResponse extends jspb.Message {
  getBlockId(): string;
  setBlockId(value: string): SendBlocksResponse;
  hasBlockId(): boolean;
  clearBlockId(): SendBlocksResponse;

  getError(): massa_model_v1_commons_pb.Error | undefined;
  setError(value?: massa_model_v1_commons_pb.Error): SendBlocksResponse;
  hasError(): boolean;
  clearError(): SendBlocksResponse;

  getResultCase(): SendBlocksResponse.ResultCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendBlocksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SendBlocksResponse): SendBlocksResponse.AsObject;
  static serializeBinaryToWriter(message: SendBlocksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendBlocksResponse;
  static deserializeBinaryFromReader(message: SendBlocksResponse, reader: jspb.BinaryReader): SendBlocksResponse;
}

export namespace SendBlocksResponse {
  export type AsObject = {
    blockId?: string,
    error?: massa_model_v1_commons_pb.Error.AsObject,
  }

  export enum ResultCase { 
    RESULT_NOT_SET = 0,
    BLOCK_ID = 1,
    ERROR = 2,
  }
}

export class SendEndorsementsRequest extends jspb.Message {
  getEndorsementsList(): Array<Uint8Array | string>;
  setEndorsementsList(value: Array<Uint8Array | string>): SendEndorsementsRequest;
  clearEndorsementsList(): SendEndorsementsRequest;
  addEndorsements(value: Uint8Array | string, index?: number): SendEndorsementsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendEndorsementsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendEndorsementsRequest): SendEndorsementsRequest.AsObject;
  static serializeBinaryToWriter(message: SendEndorsementsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendEndorsementsRequest;
  static deserializeBinaryFromReader(message: SendEndorsementsRequest, reader: jspb.BinaryReader): SendEndorsementsRequest;
}

export namespace SendEndorsementsRequest {
  export type AsObject = {
    endorsementsList: Array<Uint8Array | string>,
  }
}

export class SendEndorsementsResponse extends jspb.Message {
  getEndorsementIds(): massa_model_v1_endorsement_pb.EndorsementIds | undefined;
  setEndorsementIds(value?: massa_model_v1_endorsement_pb.EndorsementIds): SendEndorsementsResponse;
  hasEndorsementIds(): boolean;
  clearEndorsementIds(): SendEndorsementsResponse;

  getError(): massa_model_v1_commons_pb.Error | undefined;
  setError(value?: massa_model_v1_commons_pb.Error): SendEndorsementsResponse;
  hasError(): boolean;
  clearError(): SendEndorsementsResponse;

  getResultCase(): SendEndorsementsResponse.ResultCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendEndorsementsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SendEndorsementsResponse): SendEndorsementsResponse.AsObject;
  static serializeBinaryToWriter(message: SendEndorsementsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendEndorsementsResponse;
  static deserializeBinaryFromReader(message: SendEndorsementsResponse, reader: jspb.BinaryReader): SendEndorsementsResponse;
}

export namespace SendEndorsementsResponse {
  export type AsObject = {
    endorsementIds?: massa_model_v1_endorsement_pb.EndorsementIds.AsObject,
    error?: massa_model_v1_commons_pb.Error.AsObject,
  }

  export enum ResultCase { 
    RESULT_NOT_SET = 0,
    ENDORSEMENT_IDS = 1,
    ERROR = 2,
  }
}

export class SendOperationsRequest extends jspb.Message {
  getOperationsList(): Array<Uint8Array | string>;
  setOperationsList(value: Array<Uint8Array | string>): SendOperationsRequest;
  clearOperationsList(): SendOperationsRequest;
  addOperations(value: Uint8Array | string, index?: number): SendOperationsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendOperationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SendOperationsRequest): SendOperationsRequest.AsObject;
  static serializeBinaryToWriter(message: SendOperationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendOperationsRequest;
  static deserializeBinaryFromReader(message: SendOperationsRequest, reader: jspb.BinaryReader): SendOperationsRequest;
}

export namespace SendOperationsRequest {
  export type AsObject = {
    operationsList: Array<Uint8Array | string>,
  }
}

export class SendOperationsResponse extends jspb.Message {
  getOperationIds(): massa_model_v1_operation_pb.OperationIds | undefined;
  setOperationIds(value?: massa_model_v1_operation_pb.OperationIds): SendOperationsResponse;
  hasOperationIds(): boolean;
  clearOperationIds(): SendOperationsResponse;

  getError(): massa_model_v1_commons_pb.Error | undefined;
  setError(value?: massa_model_v1_commons_pb.Error): SendOperationsResponse;
  hasError(): boolean;
  clearError(): SendOperationsResponse;

  getResultCase(): SendOperationsResponse.ResultCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SendOperationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SendOperationsResponse): SendOperationsResponse.AsObject;
  static serializeBinaryToWriter(message: SendOperationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SendOperationsResponse;
  static deserializeBinaryFromReader(message: SendOperationsResponse, reader: jspb.BinaryReader): SendOperationsResponse;
}

export namespace SendOperationsResponse {
  export type AsObject = {
    operationIds?: massa_model_v1_operation_pb.OperationIds.AsObject,
    error?: massa_model_v1_commons_pb.Error.AsObject,
  }

  export enum ResultCase { 
    RESULT_NOT_SET = 0,
    OPERATION_IDS = 1,
    ERROR = 2,
  }
}

export class TransactionsThroughputRequest extends jspb.Message {
  getInterval(): google_protobuf_wrappers_pb.UInt64Value | undefined;
  setInterval(value?: google_protobuf_wrappers_pb.UInt64Value): TransactionsThroughputRequest;
  hasInterval(): boolean;
  clearInterval(): TransactionsThroughputRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionsThroughputRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionsThroughputRequest): TransactionsThroughputRequest.AsObject;
  static serializeBinaryToWriter(message: TransactionsThroughputRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionsThroughputRequest;
  static deserializeBinaryFromReader(message: TransactionsThroughputRequest, reader: jspb.BinaryReader): TransactionsThroughputRequest;
}

export namespace TransactionsThroughputRequest {
  export type AsObject = {
    interval?: google_protobuf_wrappers_pb.UInt64Value.AsObject,
  }
}

export class TransactionsThroughputServerRequest extends jspb.Message {
  getInterval(): google_protobuf_wrappers_pb.UInt64Value | undefined;
  setInterval(value?: google_protobuf_wrappers_pb.UInt64Value): TransactionsThroughputServerRequest;
  hasInterval(): boolean;
  clearInterval(): TransactionsThroughputServerRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionsThroughputServerRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionsThroughputServerRequest): TransactionsThroughputServerRequest.AsObject;
  static serializeBinaryToWriter(message: TransactionsThroughputServerRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionsThroughputServerRequest;
  static deserializeBinaryFromReader(message: TransactionsThroughputServerRequest, reader: jspb.BinaryReader): TransactionsThroughputServerRequest;
}

export namespace TransactionsThroughputServerRequest {
  export type AsObject = {
    interval?: google_protobuf_wrappers_pb.UInt64Value.AsObject,
  }
}

export class TransactionsThroughputResponse extends jspb.Message {
  getThroughput(): number;
  setThroughput(value: number): TransactionsThroughputResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionsThroughputResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionsThroughputResponse): TransactionsThroughputResponse.AsObject;
  static serializeBinaryToWriter(message: TransactionsThroughputResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionsThroughputResponse;
  static deserializeBinaryFromReader(message: TransactionsThroughputResponse, reader: jspb.BinaryReader): TransactionsThroughputResponse;
}

export namespace TransactionsThroughputResponse {
  export type AsObject = {
    throughput: number,
  }
}

export class TransactionsThroughputServerResponse extends jspb.Message {
  getThroughput(): number;
  setThroughput(value: number): TransactionsThroughputServerResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransactionsThroughputServerResponse.AsObject;
  static toObject(includeInstance: boolean, msg: TransactionsThroughputServerResponse): TransactionsThroughputServerResponse.AsObject;
  static serializeBinaryToWriter(message: TransactionsThroughputServerResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransactionsThroughputServerResponse;
  static deserializeBinaryFromReader(message: TransactionsThroughputServerResponse, reader: jspb.BinaryReader): TransactionsThroughputServerResponse;
}

export namespace TransactionsThroughputServerResponse {
  export type AsObject = {
    throughput: number,
  }
}

export class SearchBlocksRequest extends jspb.Message {
  getFiltersList(): Array<SearchBlocksFilter>;
  setFiltersList(value: Array<SearchBlocksFilter>): SearchBlocksRequest;
  clearFiltersList(): SearchBlocksRequest;
  addFilters(value?: SearchBlocksFilter, index?: number): SearchBlocksFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchBlocksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchBlocksRequest): SearchBlocksRequest.AsObject;
  static serializeBinaryToWriter(message: SearchBlocksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchBlocksRequest;
  static deserializeBinaryFromReader(message: SearchBlocksRequest, reader: jspb.BinaryReader): SearchBlocksRequest;
}

export namespace SearchBlocksRequest {
  export type AsObject = {
    filtersList: Array<SearchBlocksFilter.AsObject>,
  }
}

export class SearchBlocksFilter extends jspb.Message {
  getBlockIds(): massa_model_v1_block_pb.BlockIds | undefined;
  setBlockIds(value?: massa_model_v1_block_pb.BlockIds): SearchBlocksFilter;
  hasBlockIds(): boolean;
  clearBlockIds(): SearchBlocksFilter;

  getAddresses(): massa_model_v1_address_pb.Addresses | undefined;
  setAddresses(value?: massa_model_v1_address_pb.Addresses): SearchBlocksFilter;
  hasAddresses(): boolean;
  clearAddresses(): SearchBlocksFilter;

  getSlotRange(): massa_model_v1_slot_pb.SlotRange | undefined;
  setSlotRange(value?: massa_model_v1_slot_pb.SlotRange): SearchBlocksFilter;
  hasSlotRange(): boolean;
  clearSlotRange(): SearchBlocksFilter;

  getFilterCase(): SearchBlocksFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchBlocksFilter.AsObject;
  static toObject(includeInstance: boolean, msg: SearchBlocksFilter): SearchBlocksFilter.AsObject;
  static serializeBinaryToWriter(message: SearchBlocksFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchBlocksFilter;
  static deserializeBinaryFromReader(message: SearchBlocksFilter, reader: jspb.BinaryReader): SearchBlocksFilter;
}

export namespace SearchBlocksFilter {
  export type AsObject = {
    blockIds?: massa_model_v1_block_pb.BlockIds.AsObject,
    addresses?: massa_model_v1_address_pb.Addresses.AsObject,
    slotRange?: massa_model_v1_slot_pb.SlotRange.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    BLOCK_IDS = 1,
    ADDRESSES = 2,
    SLOT_RANGE = 3,
  }
}

export class SearchBlocksResponse extends jspb.Message {
  getBlockInfosList(): Array<massa_model_v1_block_pb.BlockInfo>;
  setBlockInfosList(value: Array<massa_model_v1_block_pb.BlockInfo>): SearchBlocksResponse;
  clearBlockInfosList(): SearchBlocksResponse;
  addBlockInfos(value?: massa_model_v1_block_pb.BlockInfo, index?: number): massa_model_v1_block_pb.BlockInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchBlocksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchBlocksResponse): SearchBlocksResponse.AsObject;
  static serializeBinaryToWriter(message: SearchBlocksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchBlocksResponse;
  static deserializeBinaryFromReader(message: SearchBlocksResponse, reader: jspb.BinaryReader): SearchBlocksResponse;
}

export namespace SearchBlocksResponse {
  export type AsObject = {
    blockInfosList: Array<massa_model_v1_block_pb.BlockInfo.AsObject>,
  }
}

export class SearchEndorsementsRequest extends jspb.Message {
  getFiltersList(): Array<SearchEndorsementsFilter>;
  setFiltersList(value: Array<SearchEndorsementsFilter>): SearchEndorsementsRequest;
  clearFiltersList(): SearchEndorsementsRequest;
  addFilters(value?: SearchEndorsementsFilter, index?: number): SearchEndorsementsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchEndorsementsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchEndorsementsRequest): SearchEndorsementsRequest.AsObject;
  static serializeBinaryToWriter(message: SearchEndorsementsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchEndorsementsRequest;
  static deserializeBinaryFromReader(message: SearchEndorsementsRequest, reader: jspb.BinaryReader): SearchEndorsementsRequest;
}

export namespace SearchEndorsementsRequest {
  export type AsObject = {
    filtersList: Array<SearchEndorsementsFilter.AsObject>,
  }
}

export class SearchEndorsementsFilter extends jspb.Message {
  getEndorsementIds(): massa_model_v1_endorsement_pb.EndorsementIds | undefined;
  setEndorsementIds(value?: massa_model_v1_endorsement_pb.EndorsementIds): SearchEndorsementsFilter;
  hasEndorsementIds(): boolean;
  clearEndorsementIds(): SearchEndorsementsFilter;

  getAddresses(): massa_model_v1_address_pb.Addresses | undefined;
  setAddresses(value?: massa_model_v1_address_pb.Addresses): SearchEndorsementsFilter;
  hasAddresses(): boolean;
  clearAddresses(): SearchEndorsementsFilter;

  getBlockIds(): massa_model_v1_block_pb.BlockIds | undefined;
  setBlockIds(value?: massa_model_v1_block_pb.BlockIds): SearchEndorsementsFilter;
  hasBlockIds(): boolean;
  clearBlockIds(): SearchEndorsementsFilter;

  getFilterCase(): SearchEndorsementsFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchEndorsementsFilter.AsObject;
  static toObject(includeInstance: boolean, msg: SearchEndorsementsFilter): SearchEndorsementsFilter.AsObject;
  static serializeBinaryToWriter(message: SearchEndorsementsFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchEndorsementsFilter;
  static deserializeBinaryFromReader(message: SearchEndorsementsFilter, reader: jspb.BinaryReader): SearchEndorsementsFilter;
}

export namespace SearchEndorsementsFilter {
  export type AsObject = {
    endorsementIds?: massa_model_v1_endorsement_pb.EndorsementIds.AsObject,
    addresses?: massa_model_v1_address_pb.Addresses.AsObject,
    blockIds?: massa_model_v1_block_pb.BlockIds.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    ENDORSEMENT_IDS = 1,
    ADDRESSES = 2,
    BLOCK_IDS = 3,
  }
}

export class SearchEndorsementsResponse extends jspb.Message {
  getEndorsementInfosList(): Array<massa_model_v1_endorsement_pb.EndorsementInfo>;
  setEndorsementInfosList(value: Array<massa_model_v1_endorsement_pb.EndorsementInfo>): SearchEndorsementsResponse;
  clearEndorsementInfosList(): SearchEndorsementsResponse;
  addEndorsementInfos(value?: massa_model_v1_endorsement_pb.EndorsementInfo, index?: number): massa_model_v1_endorsement_pb.EndorsementInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchEndorsementsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchEndorsementsResponse): SearchEndorsementsResponse.AsObject;
  static serializeBinaryToWriter(message: SearchEndorsementsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchEndorsementsResponse;
  static deserializeBinaryFromReader(message: SearchEndorsementsResponse, reader: jspb.BinaryReader): SearchEndorsementsResponse;
}

export namespace SearchEndorsementsResponse {
  export type AsObject = {
    endorsementInfosList: Array<massa_model_v1_endorsement_pb.EndorsementInfo.AsObject>,
  }
}

export class SearchOperationsRequest extends jspb.Message {
  getFiltersList(): Array<SearchOperationsFilter>;
  setFiltersList(value: Array<SearchOperationsFilter>): SearchOperationsRequest;
  clearFiltersList(): SearchOperationsRequest;
  addFilters(value?: SearchOperationsFilter, index?: number): SearchOperationsFilter;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchOperationsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchOperationsRequest): SearchOperationsRequest.AsObject;
  static serializeBinaryToWriter(message: SearchOperationsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchOperationsRequest;
  static deserializeBinaryFromReader(message: SearchOperationsRequest, reader: jspb.BinaryReader): SearchOperationsRequest;
}

export namespace SearchOperationsRequest {
  export type AsObject = {
    filtersList: Array<SearchOperationsFilter.AsObject>,
  }
}

export class SearchOperationsFilter extends jspb.Message {
  getOperationIds(): massa_model_v1_operation_pb.OperationIds | undefined;
  setOperationIds(value?: massa_model_v1_operation_pb.OperationIds): SearchOperationsFilter;
  hasOperationIds(): boolean;
  clearOperationIds(): SearchOperationsFilter;

  getAddresses(): massa_model_v1_address_pb.Addresses | undefined;
  setAddresses(value?: massa_model_v1_address_pb.Addresses): SearchOperationsFilter;
  hasAddresses(): boolean;
  clearAddresses(): SearchOperationsFilter;

  getFilterCase(): SearchOperationsFilter.FilterCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchOperationsFilter.AsObject;
  static toObject(includeInstance: boolean, msg: SearchOperationsFilter): SearchOperationsFilter.AsObject;
  static serializeBinaryToWriter(message: SearchOperationsFilter, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchOperationsFilter;
  static deserializeBinaryFromReader(message: SearchOperationsFilter, reader: jspb.BinaryReader): SearchOperationsFilter;
}

export namespace SearchOperationsFilter {
  export type AsObject = {
    operationIds?: massa_model_v1_operation_pb.OperationIds.AsObject,
    addresses?: massa_model_v1_address_pb.Addresses.AsObject,
  }

  export enum FilterCase { 
    FILTER_NOT_SET = 0,
    OPERATION_IDS = 1,
    ADDRESSES = 2,
  }
}

export class SearchOperationsResponse extends jspb.Message {
  getOperationInfosList(): Array<massa_model_v1_operation_pb.OperationInfo>;
  setOperationInfosList(value: Array<massa_model_v1_operation_pb.OperationInfo>): SearchOperationsResponse;
  clearOperationInfosList(): SearchOperationsResponse;
  addOperationInfos(value?: massa_model_v1_operation_pb.OperationInfo, index?: number): massa_model_v1_operation_pb.OperationInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchOperationsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchOperationsResponse): SearchOperationsResponse.AsObject;
  static serializeBinaryToWriter(message: SearchOperationsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchOperationsResponse;
  static deserializeBinaryFromReader(message: SearchOperationsResponse, reader: jspb.BinaryReader): SearchOperationsResponse;
}

export namespace SearchOperationsResponse {
  export type AsObject = {
    operationInfosList: Array<massa_model_v1_operation_pb.OperationInfo.AsObject>,
  }
}

export class GetOperationABICallStacksRequest extends jspb.Message {
  getOperationIdsList(): Array<string>;
  setOperationIdsList(value: Array<string>): GetOperationABICallStacksRequest;
  clearOperationIdsList(): GetOperationABICallStacksRequest;
  addOperationIds(value: string, index?: number): GetOperationABICallStacksRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOperationABICallStacksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetOperationABICallStacksRequest): GetOperationABICallStacksRequest.AsObject;
  static serializeBinaryToWriter(message: GetOperationABICallStacksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOperationABICallStacksRequest;
  static deserializeBinaryFromReader(message: GetOperationABICallStacksRequest, reader: jspb.BinaryReader): GetOperationABICallStacksRequest;
}

export namespace GetOperationABICallStacksRequest {
  export type AsObject = {
    operationIdsList: Array<string>,
  }
}

export class ABICallStackElement extends jspb.Message {
  getName(): string;
  setName(value: string): ABICallStackElement;

  getParametersList(): Array<string>;
  setParametersList(value: Array<string>): ABICallStackElement;
  clearParametersList(): ABICallStackElement;
  addParameters(value: string, index?: number): ABICallStackElement;

  getReturnValue(): string;
  setReturnValue(value: string): ABICallStackElement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ABICallStackElement.AsObject;
  static toObject(includeInstance: boolean, msg: ABICallStackElement): ABICallStackElement.AsObject;
  static serializeBinaryToWriter(message: ABICallStackElement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ABICallStackElement;
  static deserializeBinaryFromReader(message: ABICallStackElement, reader: jspb.BinaryReader): ABICallStackElement;
}

export namespace ABICallStackElement {
  export type AsObject = {
    name: string,
    parametersList: Array<string>,
    returnValue: string,
  }
}

export class ABICallStackElementCall extends jspb.Message {
  getName(): string;
  setName(value: string): ABICallStackElementCall;

  getParametersList(): Array<string>;
  setParametersList(value: Array<string>): ABICallStackElementCall;
  clearParametersList(): ABICallStackElementCall;
  addParameters(value: string, index?: number): ABICallStackElementCall;

  getSubCallsList(): Array<ABICallStackElementParent>;
  setSubCallsList(value: Array<ABICallStackElementParent>): ABICallStackElementCall;
  clearSubCallsList(): ABICallStackElementCall;
  addSubCalls(value?: ABICallStackElementParent, index?: number): ABICallStackElementParent;

  getReturnValue(): string;
  setReturnValue(value: string): ABICallStackElementCall;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ABICallStackElementCall.AsObject;
  static toObject(includeInstance: boolean, msg: ABICallStackElementCall): ABICallStackElementCall.AsObject;
  static serializeBinaryToWriter(message: ABICallStackElementCall, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ABICallStackElementCall;
  static deserializeBinaryFromReader(message: ABICallStackElementCall, reader: jspb.BinaryReader): ABICallStackElementCall;
}

export namespace ABICallStackElementCall {
  export type AsObject = {
    name: string,
    parametersList: Array<string>,
    subCallsList: Array<ABICallStackElementParent.AsObject>,
    returnValue: string,
  }
}

export class ABICallStackElementParent extends jspb.Message {
  getElement(): ABICallStackElement | undefined;
  setElement(value?: ABICallStackElement): ABICallStackElementParent;
  hasElement(): boolean;
  clearElement(): ABICallStackElementParent;

  getElementCall(): ABICallStackElementCall | undefined;
  setElementCall(value?: ABICallStackElementCall): ABICallStackElementParent;
  hasElementCall(): boolean;
  clearElementCall(): ABICallStackElementParent;

  getCallStackElementCase(): ABICallStackElementParent.CallStackElementCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ABICallStackElementParent.AsObject;
  static toObject(includeInstance: boolean, msg: ABICallStackElementParent): ABICallStackElementParent.AsObject;
  static serializeBinaryToWriter(message: ABICallStackElementParent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ABICallStackElementParent;
  static deserializeBinaryFromReader(message: ABICallStackElementParent, reader: jspb.BinaryReader): ABICallStackElementParent;
}

export namespace ABICallStackElementParent {
  export type AsObject = {
    element?: ABICallStackElement.AsObject,
    elementCall?: ABICallStackElementCall.AsObject,
  }

  export enum CallStackElementCase { 
    CALL_STACK_ELEMENT_NOT_SET = 0,
    ELEMENT = 1,
    ELEMENT_CALL = 2,
  }
}

export class ABICallStack extends jspb.Message {
  getCallStackList(): Array<ABICallStackElementParent>;
  setCallStackList(value: Array<ABICallStackElementParent>): ABICallStack;
  clearCallStackList(): ABICallStack;
  addCallStack(value?: ABICallStackElementParent, index?: number): ABICallStackElementParent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ABICallStack.AsObject;
  static toObject(includeInstance: boolean, msg: ABICallStack): ABICallStack.AsObject;
  static serializeBinaryToWriter(message: ABICallStack, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ABICallStack;
  static deserializeBinaryFromReader(message: ABICallStack, reader: jspb.BinaryReader): ABICallStack;
}

export namespace ABICallStack {
  export type AsObject = {
    callStackList: Array<ABICallStackElementParent.AsObject>,
  }
}

export class GetOperationABICallStacksResponse extends jspb.Message {
  getCallStacksList(): Array<ABICallStack>;
  setCallStacksList(value: Array<ABICallStack>): GetOperationABICallStacksResponse;
  clearCallStacksList(): GetOperationABICallStacksResponse;
  addCallStacks(value?: ABICallStack, index?: number): ABICallStack;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOperationABICallStacksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetOperationABICallStacksResponse): GetOperationABICallStacksResponse.AsObject;
  static serializeBinaryToWriter(message: GetOperationABICallStacksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetOperationABICallStacksResponse;
  static deserializeBinaryFromReader(message: GetOperationABICallStacksResponse, reader: jspb.BinaryReader): GetOperationABICallStacksResponse;
}

export namespace GetOperationABICallStacksResponse {
  export type AsObject = {
    callStacksList: Array<ABICallStack.AsObject>,
  }
}

export class GetSlotABICallStacksRequest extends jspb.Message {
  getSlotsList(): Array<massa_model_v1_slot_pb.Slot>;
  setSlotsList(value: Array<massa_model_v1_slot_pb.Slot>): GetSlotABICallStacksRequest;
  clearSlotsList(): GetSlotABICallStacksRequest;
  addSlots(value?: massa_model_v1_slot_pb.Slot, index?: number): massa_model_v1_slot_pb.Slot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSlotABICallStacksRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSlotABICallStacksRequest): GetSlotABICallStacksRequest.AsObject;
  static serializeBinaryToWriter(message: GetSlotABICallStacksRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSlotABICallStacksRequest;
  static deserializeBinaryFromReader(message: GetSlotABICallStacksRequest, reader: jspb.BinaryReader): GetSlotABICallStacksRequest;
}

export namespace GetSlotABICallStacksRequest {
  export type AsObject = {
    slotsList: Array<massa_model_v1_slot_pb.Slot.AsObject>,
  }
}

export class ASCABICallStack extends jspb.Message {
  getIndex(): number;
  setIndex(value: number): ASCABICallStack;

  getCallStackList(): Array<ABICallStackElementParent>;
  setCallStackList(value: Array<ABICallStackElementParent>): ASCABICallStack;
  clearCallStackList(): ASCABICallStack;
  addCallStack(value?: ABICallStackElementParent, index?: number): ABICallStackElementParent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ASCABICallStack.AsObject;
  static toObject(includeInstance: boolean, msg: ASCABICallStack): ASCABICallStack.AsObject;
  static serializeBinaryToWriter(message: ASCABICallStack, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ASCABICallStack;
  static deserializeBinaryFromReader(message: ASCABICallStack, reader: jspb.BinaryReader): ASCABICallStack;
}

export namespace ASCABICallStack {
  export type AsObject = {
    index: number,
    callStackList: Array<ABICallStackElementParent.AsObject>,
  }
}

export class OperationABICallStack extends jspb.Message {
  getOperationId(): string;
  setOperationId(value: string): OperationABICallStack;

  getCallStackList(): Array<ABICallStackElementParent>;
  setCallStackList(value: Array<ABICallStackElementParent>): OperationABICallStack;
  clearCallStackList(): OperationABICallStack;
  addCallStack(value?: ABICallStackElementParent, index?: number): ABICallStackElementParent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OperationABICallStack.AsObject;
  static toObject(includeInstance: boolean, msg: OperationABICallStack): OperationABICallStack.AsObject;
  static serializeBinaryToWriter(message: OperationABICallStack, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OperationABICallStack;
  static deserializeBinaryFromReader(message: OperationABICallStack, reader: jspb.BinaryReader): OperationABICallStack;
}

export namespace OperationABICallStack {
  export type AsObject = {
    operationId: string,
    callStackList: Array<ABICallStackElementParent.AsObject>,
  }
}

export class DeferredCallABICallStack extends jspb.Message {
  getDeferredCallId(): string;
  setDeferredCallId(value: string): DeferredCallABICallStack;

  getCallStackList(): Array<ABICallStackElementParent>;
  setCallStackList(value: Array<ABICallStackElementParent>): DeferredCallABICallStack;
  clearCallStackList(): DeferredCallABICallStack;
  addCallStack(value?: ABICallStackElementParent, index?: number): ABICallStackElementParent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeferredCallABICallStack.AsObject;
  static toObject(includeInstance: boolean, msg: DeferredCallABICallStack): DeferredCallABICallStack.AsObject;
  static serializeBinaryToWriter(message: DeferredCallABICallStack, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DeferredCallABICallStack;
  static deserializeBinaryFromReader(message: DeferredCallABICallStack, reader: jspb.BinaryReader): DeferredCallABICallStack;
}

export namespace DeferredCallABICallStack {
  export type AsObject = {
    deferredCallId: string,
    callStackList: Array<ABICallStackElementParent.AsObject>,
  }
}

export class SlotABICallStacks extends jspb.Message {
  getAscCallStacksList(): Array<ASCABICallStack>;
  setAscCallStacksList(value: Array<ASCABICallStack>): SlotABICallStacks;
  clearAscCallStacksList(): SlotABICallStacks;
  addAscCallStacks(value?: ASCABICallStack, index?: number): ASCABICallStack;

  getOperationCallStacksList(): Array<OperationABICallStack>;
  setOperationCallStacksList(value: Array<OperationABICallStack>): SlotABICallStacks;
  clearOperationCallStacksList(): SlotABICallStacks;
  addOperationCallStacks(value?: OperationABICallStack, index?: number): OperationABICallStack;

  getDeferredCallStacksList(): Array<DeferredCallABICallStack>;
  setDeferredCallStacksList(value: Array<DeferredCallABICallStack>): SlotABICallStacks;
  clearDeferredCallStacksList(): SlotABICallStacks;
  addDeferredCallStacks(value?: DeferredCallABICallStack, index?: number): DeferredCallABICallStack;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SlotABICallStacks.AsObject;
  static toObject(includeInstance: boolean, msg: SlotABICallStacks): SlotABICallStacks.AsObject;
  static serializeBinaryToWriter(message: SlotABICallStacks, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SlotABICallStacks;
  static deserializeBinaryFromReader(message: SlotABICallStacks, reader: jspb.BinaryReader): SlotABICallStacks;
}

export namespace SlotABICallStacks {
  export type AsObject = {
    ascCallStacksList: Array<ASCABICallStack.AsObject>,
    operationCallStacksList: Array<OperationABICallStack.AsObject>,
    deferredCallStacksList: Array<DeferredCallABICallStack.AsObject>,
  }
}

export class GetSlotABICallStacksResponse extends jspb.Message {
  getSlotCallStacksList(): Array<SlotABICallStacks>;
  setSlotCallStacksList(value: Array<SlotABICallStacks>): GetSlotABICallStacksResponse;
  clearSlotCallStacksList(): GetSlotABICallStacksResponse;
  addSlotCallStacks(value?: SlotABICallStacks, index?: number): SlotABICallStacks;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSlotABICallStacksResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSlotABICallStacksResponse): GetSlotABICallStacksResponse.AsObject;
  static serializeBinaryToWriter(message: GetSlotABICallStacksResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSlotABICallStacksResponse;
  static deserializeBinaryFromReader(message: GetSlotABICallStacksResponse, reader: jspb.BinaryReader): GetSlotABICallStacksResponse;
}

export namespace GetSlotABICallStacksResponse {
  export type AsObject = {
    slotCallStacksList: Array<SlotABICallStacks.AsObject>,
  }
}

export class GetSlotTransfersRequest extends jspb.Message {
  getSlotsList(): Array<massa_model_v1_slot_pb.Slot>;
  setSlotsList(value: Array<massa_model_v1_slot_pb.Slot>): GetSlotTransfersRequest;
  clearSlotsList(): GetSlotTransfersRequest;
  addSlots(value?: massa_model_v1_slot_pb.Slot, index?: number): massa_model_v1_slot_pb.Slot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSlotTransfersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSlotTransfersRequest): GetSlotTransfersRequest.AsObject;
  static serializeBinaryToWriter(message: GetSlotTransfersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSlotTransfersRequest;
  static deserializeBinaryFromReader(message: GetSlotTransfersRequest, reader: jspb.BinaryReader): GetSlotTransfersRequest;
}

export namespace GetSlotTransfersRequest {
  export type AsObject = {
    slotsList: Array<massa_model_v1_slot_pb.Slot.AsObject>,
  }
}

export class TransferInfo extends jspb.Message {
  getFrom(): string;
  setFrom(value: string): TransferInfo;

  getTo(): string;
  setTo(value: string): TransferInfo;

  getAmount(): number;
  setAmount(value: number): TransferInfo;

  getOperationId(): string;
  setOperationId(value: string): TransferInfo;
  hasOperationId(): boolean;
  clearOperationId(): TransferInfo;

  getAscIndex(): number;
  setAscIndex(value: number): TransferInfo;
  hasAscIndex(): boolean;
  clearAscIndex(): TransferInfo;

  getDeferredCallId(): string;
  setDeferredCallId(value: string): TransferInfo;
  hasDeferredCallId(): boolean;
  clearDeferredCallId(): TransferInfo;

  getOperationIdOrAscIndexCase(): TransferInfo.OperationIdOrAscIndexCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransferInfo.AsObject;
  static toObject(includeInstance: boolean, msg: TransferInfo): TransferInfo.AsObject;
  static serializeBinaryToWriter(message: TransferInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransferInfo;
  static deserializeBinaryFromReader(message: TransferInfo, reader: jspb.BinaryReader): TransferInfo;
}

export namespace TransferInfo {
  export type AsObject = {
    from: string,
    to: string,
    amount: number,
    operationId?: string,
    ascIndex?: number,
    deferredCallId?: string,
  }

  export enum OperationIdOrAscIndexCase { 
    OPERATION_ID_OR_ASC_INDEX_NOT_SET = 0,
    OPERATION_ID = 4,
    ASC_INDEX = 5,
    DEFERRED_CALL_ID = 6,
  }
}

export class TransferInfos extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): TransferInfos;
  hasSlot(): boolean;
  clearSlot(): TransferInfos;

  getTransfersList(): Array<TransferInfo>;
  setTransfersList(value: Array<TransferInfo>): TransferInfos;
  clearTransfersList(): TransferInfos;
  addTransfers(value?: TransferInfo, index?: number): TransferInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TransferInfos.AsObject;
  static toObject(includeInstance: boolean, msg: TransferInfos): TransferInfos.AsObject;
  static serializeBinaryToWriter(message: TransferInfos, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TransferInfos;
  static deserializeBinaryFromReader(message: TransferInfos, reader: jspb.BinaryReader): TransferInfos;
}

export namespace TransferInfos {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    transfersList: Array<TransferInfo.AsObject>,
  }
}

export class GetSlotTransfersResponse extends jspb.Message {
  getTransferEachSlotList(): Array<TransferInfos>;
  setTransferEachSlotList(value: Array<TransferInfos>): GetSlotTransfersResponse;
  clearTransferEachSlotList(): GetSlotTransfersResponse;
  addTransferEachSlot(value?: TransferInfos, index?: number): TransferInfos;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSlotTransfersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSlotTransfersResponse): GetSlotTransfersResponse.AsObject;
  static serializeBinaryToWriter(message: GetSlotTransfersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSlotTransfersResponse;
  static deserializeBinaryFromReader(message: GetSlotTransfersResponse, reader: jspb.BinaryReader): GetSlotTransfersResponse;
}

export namespace GetSlotTransfersResponse {
  export type AsObject = {
    transferEachSlotList: Array<TransferInfos.AsObject>,
  }
}

export enum ExecutionQueryExecutionStatus { 
  EXECUTION_QUERY_EXECUTION_STATUS_UNSPECIFIED = 0,
  EXECUTION_QUERY_EXECUTION_STATUS_ALREADY_EXECUTED_WITH_SUCCESS = 1,
  EXECUTION_QUERY_EXECUTION_STATUS_ALREADY_EXECUTED_WITH_FAILURE = 2,
  EXECUTION_QUERY_EXECUTION_STATUS_EXECUTABLE_OR_EXPIRED = 3,
}
export enum FinalityLevel { 
  FINALITY_LEVEL_UNSPECIFIED = 0,
  FINALITY_LEVEL_CANDIDATE = 1,
  FINALITY_LEVEL_FINAL = 2,
}
