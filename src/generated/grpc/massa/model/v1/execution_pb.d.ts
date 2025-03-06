import * as jspb from 'google-protobuf'

import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb'; // proto import: "google/protobuf/wrappers.proto"
import * as massa_model_v1_amount_pb from '../../../massa/model/v1/amount_pb'; // proto import: "massa/model/v1/amount.proto"
import * as massa_model_v1_commons_pb from '../../../massa/model/v1/commons_pb'; // proto import: "massa/model/v1/commons.proto"
import * as massa_model_v1_denunciation_pb from '../../../massa/model/v1/denunciation_pb'; // proto import: "massa/model/v1/denunciation.proto"
import * as massa_model_v1_slot_pb from '../../../massa/model/v1/slot_pb'; // proto import: "massa/model/v1/slot.proto"


export class SlotExecutionOutput extends jspb.Message {
  getStatus(): ExecutionOutputStatus;
  setStatus(value: ExecutionOutputStatus): SlotExecutionOutput;

  getExecutionOutput(): ExecutionOutput | undefined;
  setExecutionOutput(value?: ExecutionOutput): SlotExecutionOutput;
  hasExecutionOutput(): boolean;
  clearExecutionOutput(): SlotExecutionOutput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SlotExecutionOutput.AsObject;
  static toObject(includeInstance: boolean, msg: SlotExecutionOutput): SlotExecutionOutput.AsObject;
  static serializeBinaryToWriter(message: SlotExecutionOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SlotExecutionOutput;
  static deserializeBinaryFromReader(message: SlotExecutionOutput, reader: jspb.BinaryReader): SlotExecutionOutput;
}

export namespace SlotExecutionOutput {
  export type AsObject = {
    status: ExecutionOutputStatus,
    executionOutput?: ExecutionOutput.AsObject,
  }
}

export class FinalizedExecutionOutput extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): FinalizedExecutionOutput;
  hasSlot(): boolean;
  clearSlot(): FinalizedExecutionOutput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FinalizedExecutionOutput.AsObject;
  static toObject(includeInstance: boolean, msg: FinalizedExecutionOutput): FinalizedExecutionOutput.AsObject;
  static serializeBinaryToWriter(message: FinalizedExecutionOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FinalizedExecutionOutput;
  static deserializeBinaryFromReader(message: FinalizedExecutionOutput, reader: jspb.BinaryReader): FinalizedExecutionOutput;
}

export namespace FinalizedExecutionOutput {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
  }
}

export class ExecutionOutput extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): ExecutionOutput;
  hasSlot(): boolean;
  clearSlot(): ExecutionOutput;

  getBlockId(): google_protobuf_wrappers_pb.StringValue | undefined;
  setBlockId(value?: google_protobuf_wrappers_pb.StringValue): ExecutionOutput;
  hasBlockId(): boolean;
  clearBlockId(): ExecutionOutput;

  getEventsList(): Array<ScExecutionEvent>;
  setEventsList(value: Array<ScExecutionEvent>): ExecutionOutput;
  clearEventsList(): ExecutionOutput;
  addEvents(value?: ScExecutionEvent, index?: number): ScExecutionEvent;

  getStateChanges(): StateChanges | undefined;
  setStateChanges(value?: StateChanges): ExecutionOutput;
  hasStateChanges(): boolean;
  clearStateChanges(): ExecutionOutput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionOutput): ExecutionOutput.AsObject;
  static serializeBinaryToWriter(message: ExecutionOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionOutput;
  static deserializeBinaryFromReader(message: ExecutionOutput, reader: jspb.BinaryReader): ExecutionOutput;
}

export namespace ExecutionOutput {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    blockId?: google_protobuf_wrappers_pb.StringValue.AsObject,
    eventsList: Array<ScExecutionEvent.AsObject>,
    stateChanges?: StateChanges.AsObject,
  }
}

export class ScExecutionEvent extends jspb.Message {
  getContext(): ScExecutionEventContext | undefined;
  setContext(value?: ScExecutionEventContext): ScExecutionEvent;
  hasContext(): boolean;
  clearContext(): ScExecutionEvent;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): ScExecutionEvent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScExecutionEvent.AsObject;
  static toObject(includeInstance: boolean, msg: ScExecutionEvent): ScExecutionEvent.AsObject;
  static serializeBinaryToWriter(message: ScExecutionEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScExecutionEvent;
  static deserializeBinaryFromReader(message: ScExecutionEvent, reader: jspb.BinaryReader): ScExecutionEvent;
}

export namespace ScExecutionEvent {
  export type AsObject = {
    context?: ScExecutionEventContext.AsObject,
    data: Uint8Array | string,
  }
}

export class ScExecutionEventContext extends jspb.Message {
  getOriginSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setOriginSlot(value?: massa_model_v1_slot_pb.Slot): ScExecutionEventContext;
  hasOriginSlot(): boolean;
  clearOriginSlot(): ScExecutionEventContext;

  getBlockId(): google_protobuf_wrappers_pb.StringValue | undefined;
  setBlockId(value?: google_protobuf_wrappers_pb.StringValue): ScExecutionEventContext;
  hasBlockId(): boolean;
  clearBlockId(): ScExecutionEventContext;

  getIndexInSlot(): number;
  setIndexInSlot(value: number): ScExecutionEventContext;

  getCallStackList(): Array<string>;
  setCallStackList(value: Array<string>): ScExecutionEventContext;
  clearCallStackList(): ScExecutionEventContext;
  addCallStack(value: string, index?: number): ScExecutionEventContext;

  getOriginOperationId(): google_protobuf_wrappers_pb.StringValue | undefined;
  setOriginOperationId(value?: google_protobuf_wrappers_pb.StringValue): ScExecutionEventContext;
  hasOriginOperationId(): boolean;
  clearOriginOperationId(): ScExecutionEventContext;

  getIsFailure(): boolean;
  setIsFailure(value: boolean): ScExecutionEventContext;

  getStatus(): ScExecutionEventStatus;
  setStatus(value: ScExecutionEventStatus): ScExecutionEventContext;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScExecutionEventContext.AsObject;
  static toObject(includeInstance: boolean, msg: ScExecutionEventContext): ScExecutionEventContext.AsObject;
  static serializeBinaryToWriter(message: ScExecutionEventContext, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScExecutionEventContext;
  static deserializeBinaryFromReader(message: ScExecutionEventContext, reader: jspb.BinaryReader): ScExecutionEventContext;
}

export namespace ScExecutionEventContext {
  export type AsObject = {
    originSlot?: massa_model_v1_slot_pb.Slot.AsObject,
    blockId?: google_protobuf_wrappers_pb.StringValue.AsObject,
    indexInSlot: number,
    callStackList: Array<string>,
    originOperationId?: google_protobuf_wrappers_pb.StringValue.AsObject,
    isFailure: boolean,
    status: ScExecutionEventStatus,
  }
}

export class ScExecutionEventsStatus extends jspb.Message {
  getStatusList(): Array<ScExecutionEventStatus>;
  setStatusList(value: Array<ScExecutionEventStatus>): ScExecutionEventsStatus;
  clearStatusList(): ScExecutionEventsStatus;
  addStatus(value: ScExecutionEventStatus, index?: number): ScExecutionEventsStatus;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ScExecutionEventsStatus.AsObject;
  static toObject(includeInstance: boolean, msg: ScExecutionEventsStatus): ScExecutionEventsStatus.AsObject;
  static serializeBinaryToWriter(message: ScExecutionEventsStatus, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ScExecutionEventsStatus;
  static deserializeBinaryFromReader(message: ScExecutionEventsStatus, reader: jspb.BinaryReader): ScExecutionEventsStatus;
}

export namespace ScExecutionEventsStatus {
  export type AsObject = {
    statusList: Array<ScExecutionEventStatus>,
  }
}

export class StateChanges extends jspb.Message {
  getLedgerChangesList(): Array<LedgerChangeEntry>;
  setLedgerChangesList(value: Array<LedgerChangeEntry>): StateChanges;
  clearLedgerChangesList(): StateChanges;
  addLedgerChanges(value?: LedgerChangeEntry, index?: number): LedgerChangeEntry;

  getAsyncPoolChangesList(): Array<AsyncPoolChangeEntry>;
  setAsyncPoolChangesList(value: Array<AsyncPoolChangeEntry>): StateChanges;
  clearAsyncPoolChangesList(): StateChanges;
  addAsyncPoolChanges(value?: AsyncPoolChangeEntry, index?: number): AsyncPoolChangeEntry;

  getExecutedOpsChangesList(): Array<ExecutedOpsChangeEntry>;
  setExecutedOpsChangesList(value: Array<ExecutedOpsChangeEntry>): StateChanges;
  clearExecutedOpsChangesList(): StateChanges;
  addExecutedOpsChanges(value?: ExecutedOpsChangeEntry, index?: number): ExecutedOpsChangeEntry;

  getExecutedDenunciationsChangesList(): Array<massa_model_v1_denunciation_pb.DenunciationIndex>;
  setExecutedDenunciationsChangesList(value: Array<massa_model_v1_denunciation_pb.DenunciationIndex>): StateChanges;
  clearExecutedDenunciationsChangesList(): StateChanges;
  addExecutedDenunciationsChanges(value?: massa_model_v1_denunciation_pb.DenunciationIndex, index?: number): massa_model_v1_denunciation_pb.DenunciationIndex;

  getExecutionTrailHashChange(): SetOrKeepString | undefined;
  setExecutionTrailHashChange(value?: SetOrKeepString): StateChanges;
  hasExecutionTrailHashChange(): boolean;
  clearExecutionTrailHashChange(): StateChanges;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StateChanges.AsObject;
  static toObject(includeInstance: boolean, msg: StateChanges): StateChanges.AsObject;
  static serializeBinaryToWriter(message: StateChanges, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StateChanges;
  static deserializeBinaryFromReader(message: StateChanges, reader: jspb.BinaryReader): StateChanges;
}

export namespace StateChanges {
  export type AsObject = {
    ledgerChangesList: Array<LedgerChangeEntry.AsObject>,
    asyncPoolChangesList: Array<AsyncPoolChangeEntry.AsObject>,
    executedOpsChangesList: Array<ExecutedOpsChangeEntry.AsObject>,
    executedDenunciationsChangesList: Array<massa_model_v1_denunciation_pb.DenunciationIndex.AsObject>,
    executionTrailHashChange?: SetOrKeepString.AsObject,
  }
}

export class ExecutedOpsChangeEntry extends jspb.Message {
  getOperationId(): string;
  setOperationId(value: string): ExecutedOpsChangeEntry;

  getValue(): ExecutedOpsChangeValue | undefined;
  setValue(value?: ExecutedOpsChangeValue): ExecutedOpsChangeEntry;
  hasValue(): boolean;
  clearValue(): ExecutedOpsChangeEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutedOpsChangeEntry.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutedOpsChangeEntry): ExecutedOpsChangeEntry.AsObject;
  static serializeBinaryToWriter(message: ExecutedOpsChangeEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutedOpsChangeEntry;
  static deserializeBinaryFromReader(message: ExecutedOpsChangeEntry, reader: jspb.BinaryReader): ExecutedOpsChangeEntry;
}

export namespace ExecutedOpsChangeEntry {
  export type AsObject = {
    operationId: string,
    value?: ExecutedOpsChangeValue.AsObject,
  }
}

export class ExecutedOpsChangeValue extends jspb.Message {
  getStatus(): OperationExecutionStatus;
  setStatus(value: OperationExecutionStatus): ExecutedOpsChangeValue;

  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): ExecutedOpsChangeValue;
  hasSlot(): boolean;
  clearSlot(): ExecutedOpsChangeValue;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutedOpsChangeValue.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutedOpsChangeValue): ExecutedOpsChangeValue.AsObject;
  static serializeBinaryToWriter(message: ExecutedOpsChangeValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutedOpsChangeValue;
  static deserializeBinaryFromReader(message: ExecutedOpsChangeValue, reader: jspb.BinaryReader): ExecutedOpsChangeValue;
}

export namespace ExecutedOpsChangeValue {
  export type AsObject = {
    status: OperationExecutionStatus,
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
  }
}

export class AsyncPoolChangeEntry extends jspb.Message {
  getAsyncMessageId(): string;
  setAsyncMessageId(value: string): AsyncPoolChangeEntry;

  getValue(): AsyncPoolChangeValue | undefined;
  setValue(value?: AsyncPoolChangeValue): AsyncPoolChangeEntry;
  hasValue(): boolean;
  clearValue(): AsyncPoolChangeEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AsyncPoolChangeEntry.AsObject;
  static toObject(includeInstance: boolean, msg: AsyncPoolChangeEntry): AsyncPoolChangeEntry.AsObject;
  static serializeBinaryToWriter(message: AsyncPoolChangeEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AsyncPoolChangeEntry;
  static deserializeBinaryFromReader(message: AsyncPoolChangeEntry, reader: jspb.BinaryReader): AsyncPoolChangeEntry;
}

export namespace AsyncPoolChangeEntry {
  export type AsObject = {
    asyncMessageId: string,
    value?: AsyncPoolChangeValue.AsObject,
  }
}

export class AsyncPoolChangeValue extends jspb.Message {
  getType(): AsyncPoolChangeType;
  setType(value: AsyncPoolChangeType): AsyncPoolChangeValue;

  getCreatedMessage(): AsyncMessage | undefined;
  setCreatedMessage(value?: AsyncMessage): AsyncPoolChangeValue;
  hasCreatedMessage(): boolean;
  clearCreatedMessage(): AsyncPoolChangeValue;

  getUpdatedMessage(): AsyncMessageUpdate | undefined;
  setUpdatedMessage(value?: AsyncMessageUpdate): AsyncPoolChangeValue;
  hasUpdatedMessage(): boolean;
  clearUpdatedMessage(): AsyncPoolChangeValue;

  getMessageCase(): AsyncPoolChangeValue.MessageCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AsyncPoolChangeValue.AsObject;
  static toObject(includeInstance: boolean, msg: AsyncPoolChangeValue): AsyncPoolChangeValue.AsObject;
  static serializeBinaryToWriter(message: AsyncPoolChangeValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AsyncPoolChangeValue;
  static deserializeBinaryFromReader(message: AsyncPoolChangeValue, reader: jspb.BinaryReader): AsyncPoolChangeValue;
}

export namespace AsyncPoolChangeValue {
  export type AsObject = {
    type: AsyncPoolChangeType,
    createdMessage?: AsyncMessage.AsObject,
    updatedMessage?: AsyncMessageUpdate.AsObject,
  }

  export enum MessageCase { 
    MESSAGE_NOT_SET = 0,
    CREATED_MESSAGE = 2,
    UPDATED_MESSAGE = 3,
  }
}

export class AsyncMessage extends jspb.Message {
  getEmissionSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setEmissionSlot(value?: massa_model_v1_slot_pb.Slot): AsyncMessage;
  hasEmissionSlot(): boolean;
  clearEmissionSlot(): AsyncMessage;

  getEmissionIndex(): number;
  setEmissionIndex(value: number): AsyncMessage;

  getSender(): string;
  setSender(value: string): AsyncMessage;

  getDestination(): string;
  setDestination(value: string): AsyncMessage;

  getHandler(): string;
  setHandler(value: string): AsyncMessage;

  getMaxGas(): number;
  setMaxGas(value: number): AsyncMessage;

  getFee(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setFee(value?: massa_model_v1_amount_pb.NativeAmount): AsyncMessage;
  hasFee(): boolean;
  clearFee(): AsyncMessage;

  getCoins(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setCoins(value?: massa_model_v1_amount_pb.NativeAmount): AsyncMessage;
  hasCoins(): boolean;
  clearCoins(): AsyncMessage;

  getValidityStart(): massa_model_v1_slot_pb.Slot | undefined;
  setValidityStart(value?: massa_model_v1_slot_pb.Slot): AsyncMessage;
  hasValidityStart(): boolean;
  clearValidityStart(): AsyncMessage;

  getValidityEnd(): massa_model_v1_slot_pb.Slot | undefined;
  setValidityEnd(value?: massa_model_v1_slot_pb.Slot): AsyncMessage;
  hasValidityEnd(): boolean;
  clearValidityEnd(): AsyncMessage;

  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): AsyncMessage;

  getTrigger(): AsyncMessageTrigger | undefined;
  setTrigger(value?: AsyncMessageTrigger): AsyncMessage;
  hasTrigger(): boolean;
  clearTrigger(): AsyncMessage;

  getCanBeExecuted(): boolean;
  setCanBeExecuted(value: boolean): AsyncMessage;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AsyncMessage.AsObject;
  static toObject(includeInstance: boolean, msg: AsyncMessage): AsyncMessage.AsObject;
  static serializeBinaryToWriter(message: AsyncMessage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AsyncMessage;
  static deserializeBinaryFromReader(message: AsyncMessage, reader: jspb.BinaryReader): AsyncMessage;
}

export namespace AsyncMessage {
  export type AsObject = {
    emissionSlot?: massa_model_v1_slot_pb.Slot.AsObject,
    emissionIndex: number,
    sender: string,
    destination: string,
    handler: string,
    maxGas: number,
    fee?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    coins?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    validityStart?: massa_model_v1_slot_pb.Slot.AsObject,
    validityEnd?: massa_model_v1_slot_pb.Slot.AsObject,
    data: Uint8Array | string,
    trigger?: AsyncMessageTrigger.AsObject,
    canBeExecuted: boolean,
  }
}

export class AsyncMessageUpdate extends jspb.Message {
  getEmissionSlot(): SetOrKeepSlot | undefined;
  setEmissionSlot(value?: SetOrKeepSlot): AsyncMessageUpdate;
  hasEmissionSlot(): boolean;
  clearEmissionSlot(): AsyncMessageUpdate;

  getEmissionIndex(): SetOrKeepUint64 | undefined;
  setEmissionIndex(value?: SetOrKeepUint64): AsyncMessageUpdate;
  hasEmissionIndex(): boolean;
  clearEmissionIndex(): AsyncMessageUpdate;

  getSender(): SetOrKeepString | undefined;
  setSender(value?: SetOrKeepString): AsyncMessageUpdate;
  hasSender(): boolean;
  clearSender(): AsyncMessageUpdate;

  getDestination(): SetOrKeepString | undefined;
  setDestination(value?: SetOrKeepString): AsyncMessageUpdate;
  hasDestination(): boolean;
  clearDestination(): AsyncMessageUpdate;

  getHandler(): SetOrKeepString | undefined;
  setHandler(value?: SetOrKeepString): AsyncMessageUpdate;
  hasHandler(): boolean;
  clearHandler(): AsyncMessageUpdate;

  getMaxGas(): SetOrKeepUint64 | undefined;
  setMaxGas(value?: SetOrKeepUint64): AsyncMessageUpdate;
  hasMaxGas(): boolean;
  clearMaxGas(): AsyncMessageUpdate;

  getFee(): SetOrKeepUint64 | undefined;
  setFee(value?: SetOrKeepUint64): AsyncMessageUpdate;
  hasFee(): boolean;
  clearFee(): AsyncMessageUpdate;

  getCoins(): SetOrKeepUint64 | undefined;
  setCoins(value?: SetOrKeepUint64): AsyncMessageUpdate;
  hasCoins(): boolean;
  clearCoins(): AsyncMessageUpdate;

  getValidityStart(): SetOrKeepSlot | undefined;
  setValidityStart(value?: SetOrKeepSlot): AsyncMessageUpdate;
  hasValidityStart(): boolean;
  clearValidityStart(): AsyncMessageUpdate;

  getValidityEnd(): SetOrKeepSlot | undefined;
  setValidityEnd(value?: SetOrKeepSlot): AsyncMessageUpdate;
  hasValidityEnd(): boolean;
  clearValidityEnd(): AsyncMessageUpdate;

  getData(): SetOrKeepBytes | undefined;
  setData(value?: SetOrKeepBytes): AsyncMessageUpdate;
  hasData(): boolean;
  clearData(): AsyncMessageUpdate;

  getTrigger(): SetOrKeepAsyncMessageTrigger | undefined;
  setTrigger(value?: SetOrKeepAsyncMessageTrigger): AsyncMessageUpdate;
  hasTrigger(): boolean;
  clearTrigger(): AsyncMessageUpdate;

  getCanBeExecuted(): SetOrKeepBool | undefined;
  setCanBeExecuted(value?: SetOrKeepBool): AsyncMessageUpdate;
  hasCanBeExecuted(): boolean;
  clearCanBeExecuted(): AsyncMessageUpdate;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AsyncMessageUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: AsyncMessageUpdate): AsyncMessageUpdate.AsObject;
  static serializeBinaryToWriter(message: AsyncMessageUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AsyncMessageUpdate;
  static deserializeBinaryFromReader(message: AsyncMessageUpdate, reader: jspb.BinaryReader): AsyncMessageUpdate;
}

export namespace AsyncMessageUpdate {
  export type AsObject = {
    emissionSlot?: SetOrKeepSlot.AsObject,
    emissionIndex?: SetOrKeepUint64.AsObject,
    sender?: SetOrKeepString.AsObject,
    destination?: SetOrKeepString.AsObject,
    handler?: SetOrKeepString.AsObject,
    maxGas?: SetOrKeepUint64.AsObject,
    fee?: SetOrKeepUint64.AsObject,
    coins?: SetOrKeepUint64.AsObject,
    validityStart?: SetOrKeepSlot.AsObject,
    validityEnd?: SetOrKeepSlot.AsObject,
    data?: SetOrKeepBytes.AsObject,
    trigger?: SetOrKeepAsyncMessageTrigger.AsObject,
    canBeExecuted?: SetOrKeepBool.AsObject,
  }
}

export class SetOrKeepSlot extends jspb.Message {
  getSet(): massa_model_v1_slot_pb.Slot | undefined;
  setSet(value?: massa_model_v1_slot_pb.Slot): SetOrKeepSlot;
  hasSet(): boolean;
  clearSet(): SetOrKeepSlot;

  getKeep(): massa_model_v1_commons_pb.Empty | undefined;
  setKeep(value?: massa_model_v1_commons_pb.Empty): SetOrKeepSlot;
  hasKeep(): boolean;
  clearKeep(): SetOrKeepSlot;

  getChangeCase(): SetOrKeepSlot.ChangeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrKeepSlot.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrKeepSlot): SetOrKeepSlot.AsObject;
  static serializeBinaryToWriter(message: SetOrKeepSlot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrKeepSlot;
  static deserializeBinaryFromReader(message: SetOrKeepSlot, reader: jspb.BinaryReader): SetOrKeepSlot;
}

export namespace SetOrKeepSlot {
  export type AsObject = {
    set?: massa_model_v1_slot_pb.Slot.AsObject,
    keep?: massa_model_v1_commons_pb.Empty.AsObject,
  }

  export enum ChangeCase { 
    CHANGE_NOT_SET = 0,
    SET = 1,
    KEEP = 2,
  }
}

export class SetOrKeepUint64 extends jspb.Message {
  getSet(): google_protobuf_wrappers_pb.UInt64Value | undefined;
  setSet(value?: google_protobuf_wrappers_pb.UInt64Value): SetOrKeepUint64;
  hasSet(): boolean;
  clearSet(): SetOrKeepUint64;

  getKeep(): massa_model_v1_commons_pb.Empty | undefined;
  setKeep(value?: massa_model_v1_commons_pb.Empty): SetOrKeepUint64;
  hasKeep(): boolean;
  clearKeep(): SetOrKeepUint64;

  getChangeCase(): SetOrKeepUint64.ChangeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrKeepUint64.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrKeepUint64): SetOrKeepUint64.AsObject;
  static serializeBinaryToWriter(message: SetOrKeepUint64, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrKeepUint64;
  static deserializeBinaryFromReader(message: SetOrKeepUint64, reader: jspb.BinaryReader): SetOrKeepUint64;
}

export namespace SetOrKeepUint64 {
  export type AsObject = {
    set?: google_protobuf_wrappers_pb.UInt64Value.AsObject,
    keep?: massa_model_v1_commons_pb.Empty.AsObject,
  }

  export enum ChangeCase { 
    CHANGE_NOT_SET = 0,
    SET = 1,
    KEEP = 2,
  }
}

export class SetOrKeepString extends jspb.Message {
  getSet(): google_protobuf_wrappers_pb.StringValue | undefined;
  setSet(value?: google_protobuf_wrappers_pb.StringValue): SetOrKeepString;
  hasSet(): boolean;
  clearSet(): SetOrKeepString;

  getKeep(): massa_model_v1_commons_pb.Empty | undefined;
  setKeep(value?: massa_model_v1_commons_pb.Empty): SetOrKeepString;
  hasKeep(): boolean;
  clearKeep(): SetOrKeepString;

  getChangeCase(): SetOrKeepString.ChangeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrKeepString.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrKeepString): SetOrKeepString.AsObject;
  static serializeBinaryToWriter(message: SetOrKeepString, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrKeepString;
  static deserializeBinaryFromReader(message: SetOrKeepString, reader: jspb.BinaryReader): SetOrKeepString;
}

export namespace SetOrKeepString {
  export type AsObject = {
    set?: google_protobuf_wrappers_pb.StringValue.AsObject,
    keep?: massa_model_v1_commons_pb.Empty.AsObject,
  }

  export enum ChangeCase { 
    CHANGE_NOT_SET = 0,
    SET = 1,
    KEEP = 2,
  }
}

export class SetOrKeepBytes extends jspb.Message {
  getSet(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setSet(value?: google_protobuf_wrappers_pb.BytesValue): SetOrKeepBytes;
  hasSet(): boolean;
  clearSet(): SetOrKeepBytes;

  getKeep(): massa_model_v1_commons_pb.Empty | undefined;
  setKeep(value?: massa_model_v1_commons_pb.Empty): SetOrKeepBytes;
  hasKeep(): boolean;
  clearKeep(): SetOrKeepBytes;

  getChangeCase(): SetOrKeepBytes.ChangeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrKeepBytes.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrKeepBytes): SetOrKeepBytes.AsObject;
  static serializeBinaryToWriter(message: SetOrKeepBytes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrKeepBytes;
  static deserializeBinaryFromReader(message: SetOrKeepBytes, reader: jspb.BinaryReader): SetOrKeepBytes;
}

export namespace SetOrKeepBytes {
  export type AsObject = {
    set?: google_protobuf_wrappers_pb.BytesValue.AsObject,
    keep?: massa_model_v1_commons_pb.Empty.AsObject,
  }

  export enum ChangeCase { 
    CHANGE_NOT_SET = 0,
    SET = 1,
    KEEP = 2,
  }
}

export class SetOrKeepBool extends jspb.Message {
  getSet(): google_protobuf_wrappers_pb.BoolValue | undefined;
  setSet(value?: google_protobuf_wrappers_pb.BoolValue): SetOrKeepBool;
  hasSet(): boolean;
  clearSet(): SetOrKeepBool;

  getKeep(): massa_model_v1_commons_pb.Empty | undefined;
  setKeep(value?: massa_model_v1_commons_pb.Empty): SetOrKeepBool;
  hasKeep(): boolean;
  clearKeep(): SetOrKeepBool;

  getChangeCase(): SetOrKeepBool.ChangeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrKeepBool.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrKeepBool): SetOrKeepBool.AsObject;
  static serializeBinaryToWriter(message: SetOrKeepBool, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrKeepBool;
  static deserializeBinaryFromReader(message: SetOrKeepBool, reader: jspb.BinaryReader): SetOrKeepBool;
}

export namespace SetOrKeepBool {
  export type AsObject = {
    set?: google_protobuf_wrappers_pb.BoolValue.AsObject,
    keep?: massa_model_v1_commons_pb.Empty.AsObject,
  }

  export enum ChangeCase { 
    CHANGE_NOT_SET = 0,
    SET = 1,
    KEEP = 2,
  }
}

export class SetOrKeepAsyncMessageTrigger extends jspb.Message {
  getSet(): AsyncMessageTrigger | undefined;
  setSet(value?: AsyncMessageTrigger): SetOrKeepAsyncMessageTrigger;
  hasSet(): boolean;
  clearSet(): SetOrKeepAsyncMessageTrigger;

  getKeep(): massa_model_v1_commons_pb.Empty | undefined;
  setKeep(value?: massa_model_v1_commons_pb.Empty): SetOrKeepAsyncMessageTrigger;
  hasKeep(): boolean;
  clearKeep(): SetOrKeepAsyncMessageTrigger;

  getChangeCase(): SetOrKeepAsyncMessageTrigger.ChangeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrKeepAsyncMessageTrigger.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrKeepAsyncMessageTrigger): SetOrKeepAsyncMessageTrigger.AsObject;
  static serializeBinaryToWriter(message: SetOrKeepAsyncMessageTrigger, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrKeepAsyncMessageTrigger;
  static deserializeBinaryFromReader(message: SetOrKeepAsyncMessageTrigger, reader: jspb.BinaryReader): SetOrKeepAsyncMessageTrigger;
}

export namespace SetOrKeepAsyncMessageTrigger {
  export type AsObject = {
    set?: AsyncMessageTrigger.AsObject,
    keep?: massa_model_v1_commons_pb.Empty.AsObject,
  }

  export enum ChangeCase { 
    CHANGE_NOT_SET = 0,
    SET = 1,
    KEEP = 2,
  }
}

export class AsyncMessageTrigger extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AsyncMessageTrigger;

  getDatastoreKey(): google_protobuf_wrappers_pb.BytesValue | undefined;
  setDatastoreKey(value?: google_protobuf_wrappers_pb.BytesValue): AsyncMessageTrigger;
  hasDatastoreKey(): boolean;
  clearDatastoreKey(): AsyncMessageTrigger;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AsyncMessageTrigger.AsObject;
  static toObject(includeInstance: boolean, msg: AsyncMessageTrigger): AsyncMessageTrigger.AsObject;
  static serializeBinaryToWriter(message: AsyncMessageTrigger, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AsyncMessageTrigger;
  static deserializeBinaryFromReader(message: AsyncMessageTrigger, reader: jspb.BinaryReader): AsyncMessageTrigger;
}

export namespace AsyncMessageTrigger {
  export type AsObject = {
    address: string,
    datastoreKey?: google_protobuf_wrappers_pb.BytesValue.AsObject,
  }
}

export class LedgerChangeEntry extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): LedgerChangeEntry;

  getValue(): LedgerChangeValue | undefined;
  setValue(value?: LedgerChangeValue): LedgerChangeEntry;
  hasValue(): boolean;
  clearValue(): LedgerChangeEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LedgerChangeEntry.AsObject;
  static toObject(includeInstance: boolean, msg: LedgerChangeEntry): LedgerChangeEntry.AsObject;
  static serializeBinaryToWriter(message: LedgerChangeEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LedgerChangeEntry;
  static deserializeBinaryFromReader(message: LedgerChangeEntry, reader: jspb.BinaryReader): LedgerChangeEntry;
}

export namespace LedgerChangeEntry {
  export type AsObject = {
    address: string,
    value?: LedgerChangeValue.AsObject,
  }
}

export class LedgerChangeValue extends jspb.Message {
  getType(): LedgerChangeType;
  setType(value: LedgerChangeType): LedgerChangeValue;

  getCreatedEntry(): LedgerEntry | undefined;
  setCreatedEntry(value?: LedgerEntry): LedgerChangeValue;
  hasCreatedEntry(): boolean;
  clearCreatedEntry(): LedgerChangeValue;

  getUpdatedEntry(): LedgerEntryUpdate | undefined;
  setUpdatedEntry(value?: LedgerEntryUpdate): LedgerChangeValue;
  hasUpdatedEntry(): boolean;
  clearUpdatedEntry(): LedgerChangeValue;

  getEntryCase(): LedgerChangeValue.EntryCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LedgerChangeValue.AsObject;
  static toObject(includeInstance: boolean, msg: LedgerChangeValue): LedgerChangeValue.AsObject;
  static serializeBinaryToWriter(message: LedgerChangeValue, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LedgerChangeValue;
  static deserializeBinaryFromReader(message: LedgerChangeValue, reader: jspb.BinaryReader): LedgerChangeValue;
}

export namespace LedgerChangeValue {
  export type AsObject = {
    type: LedgerChangeType,
    createdEntry?: LedgerEntry.AsObject,
    updatedEntry?: LedgerEntryUpdate.AsObject,
  }

  export enum EntryCase { 
    ENTRY_NOT_SET = 0,
    CREATED_ENTRY = 2,
    UPDATED_ENTRY = 3,
  }
}

export class LedgerEntry extends jspb.Message {
  getBalance(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setBalance(value?: massa_model_v1_amount_pb.NativeAmount): LedgerEntry;
  hasBalance(): boolean;
  clearBalance(): LedgerEntry;

  getBytecode(): Uint8Array | string;
  getBytecode_asU8(): Uint8Array;
  getBytecode_asB64(): string;
  setBytecode(value: Uint8Array | string): LedgerEntry;

  getDatastoreList(): Array<massa_model_v1_commons_pb.BytesMapFieldEntry>;
  setDatastoreList(value: Array<massa_model_v1_commons_pb.BytesMapFieldEntry>): LedgerEntry;
  clearDatastoreList(): LedgerEntry;
  addDatastore(value?: massa_model_v1_commons_pb.BytesMapFieldEntry, index?: number): massa_model_v1_commons_pb.BytesMapFieldEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LedgerEntry.AsObject;
  static toObject(includeInstance: boolean, msg: LedgerEntry): LedgerEntry.AsObject;
  static serializeBinaryToWriter(message: LedgerEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LedgerEntry;
  static deserializeBinaryFromReader(message: LedgerEntry, reader: jspb.BinaryReader): LedgerEntry;
}

export namespace LedgerEntry {
  export type AsObject = {
    balance?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    bytecode: Uint8Array | string,
    datastoreList: Array<massa_model_v1_commons_pb.BytesMapFieldEntry.AsObject>,
  }
}

export class LedgerEntryUpdate extends jspb.Message {
  getBalance(): SetOrKeepBalance | undefined;
  setBalance(value?: SetOrKeepBalance): LedgerEntryUpdate;
  hasBalance(): boolean;
  clearBalance(): LedgerEntryUpdate;

  getBytecode(): SetOrKeepBytes | undefined;
  setBytecode(value?: SetOrKeepBytes): LedgerEntryUpdate;
  hasBytecode(): boolean;
  clearBytecode(): LedgerEntryUpdate;

  getDatastoreList(): Array<SetOrDeleteDatastoreEntry>;
  setDatastoreList(value: Array<SetOrDeleteDatastoreEntry>): LedgerEntryUpdate;
  clearDatastoreList(): LedgerEntryUpdate;
  addDatastore(value?: SetOrDeleteDatastoreEntry, index?: number): SetOrDeleteDatastoreEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LedgerEntryUpdate.AsObject;
  static toObject(includeInstance: boolean, msg: LedgerEntryUpdate): LedgerEntryUpdate.AsObject;
  static serializeBinaryToWriter(message: LedgerEntryUpdate, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LedgerEntryUpdate;
  static deserializeBinaryFromReader(message: LedgerEntryUpdate, reader: jspb.BinaryReader): LedgerEntryUpdate;
}

export namespace LedgerEntryUpdate {
  export type AsObject = {
    balance?: SetOrKeepBalance.AsObject,
    bytecode?: SetOrKeepBytes.AsObject,
    datastoreList: Array<SetOrDeleteDatastoreEntry.AsObject>,
  }
}

export class SetOrKeepBalance extends jspb.Message {
  getSet(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setSet(value?: massa_model_v1_amount_pb.NativeAmount): SetOrKeepBalance;
  hasSet(): boolean;
  clearSet(): SetOrKeepBalance;

  getKeep(): massa_model_v1_commons_pb.Empty | undefined;
  setKeep(value?: massa_model_v1_commons_pb.Empty): SetOrKeepBalance;
  hasKeep(): boolean;
  clearKeep(): SetOrKeepBalance;

  getChangeCase(): SetOrKeepBalance.ChangeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrKeepBalance.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrKeepBalance): SetOrKeepBalance.AsObject;
  static serializeBinaryToWriter(message: SetOrKeepBalance, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrKeepBalance;
  static deserializeBinaryFromReader(message: SetOrKeepBalance, reader: jspb.BinaryReader): SetOrKeepBalance;
}

export namespace SetOrKeepBalance {
  export type AsObject = {
    set?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    keep?: massa_model_v1_commons_pb.Empty.AsObject,
  }

  export enum ChangeCase { 
    CHANGE_NOT_SET = 0,
    SET = 1,
    KEEP = 2,
  }
}

export class SetOrDeleteDatastoreEntry extends jspb.Message {
  getSet(): massa_model_v1_commons_pb.BytesMapFieldEntry | undefined;
  setSet(value?: massa_model_v1_commons_pb.BytesMapFieldEntry): SetOrDeleteDatastoreEntry;
  hasSet(): boolean;
  clearSet(): SetOrDeleteDatastoreEntry;

  getDelete(): massa_model_v1_commons_pb.Empty | undefined;
  setDelete(value?: massa_model_v1_commons_pb.Empty): SetOrDeleteDatastoreEntry;
  hasDelete(): boolean;
  clearDelete(): SetOrDeleteDatastoreEntry;

  getChangeCase(): SetOrDeleteDatastoreEntry.ChangeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetOrDeleteDatastoreEntry.AsObject;
  static toObject(includeInstance: boolean, msg: SetOrDeleteDatastoreEntry): SetOrDeleteDatastoreEntry.AsObject;
  static serializeBinaryToWriter(message: SetOrDeleteDatastoreEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetOrDeleteDatastoreEntry;
  static deserializeBinaryFromReader(message: SetOrDeleteDatastoreEntry, reader: jspb.BinaryReader): SetOrDeleteDatastoreEntry;
}

export namespace SetOrDeleteDatastoreEntry {
  export type AsObject = {
    set?: massa_model_v1_commons_pb.BytesMapFieldEntry.AsObject,
    pb_delete?: massa_model_v1_commons_pb.Empty.AsObject,
  }

  export enum ChangeCase { 
    CHANGE_NOT_SET = 0,
    SET = 1,
    DELETE = 2,
  }
}

export class ReadOnlyExecutionCall extends jspb.Message {
  getMaxGas(): number;
  setMaxGas(value: number): ReadOnlyExecutionCall;

  getCallStackList(): Array<ExecutionStackElement>;
  setCallStackList(value: Array<ExecutionStackElement>): ReadOnlyExecutionCall;
  clearCallStackList(): ReadOnlyExecutionCall;
  addCallStack(value?: ExecutionStackElement, index?: number): ExecutionStackElement;

  getBytecodeCall(): BytecodeExecution | undefined;
  setBytecodeCall(value?: BytecodeExecution): ReadOnlyExecutionCall;
  hasBytecodeCall(): boolean;
  clearBytecodeCall(): ReadOnlyExecutionCall;

  getFunctionCall(): FunctionCall | undefined;
  setFunctionCall(value?: FunctionCall): ReadOnlyExecutionCall;
  hasFunctionCall(): boolean;
  clearFunctionCall(): ReadOnlyExecutionCall;

  getCallerAddress(): google_protobuf_wrappers_pb.StringValue | undefined;
  setCallerAddress(value?: google_protobuf_wrappers_pb.StringValue): ReadOnlyExecutionCall;
  hasCallerAddress(): boolean;
  clearCallerAddress(): ReadOnlyExecutionCall;

  getFee(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setFee(value?: massa_model_v1_amount_pb.NativeAmount): ReadOnlyExecutionCall;
  hasFee(): boolean;
  clearFee(): ReadOnlyExecutionCall;

  getTargetCase(): ReadOnlyExecutionCall.TargetCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadOnlyExecutionCall.AsObject;
  static toObject(includeInstance: boolean, msg: ReadOnlyExecutionCall): ReadOnlyExecutionCall.AsObject;
  static serializeBinaryToWriter(message: ReadOnlyExecutionCall, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadOnlyExecutionCall;
  static deserializeBinaryFromReader(message: ReadOnlyExecutionCall, reader: jspb.BinaryReader): ReadOnlyExecutionCall;
}

export namespace ReadOnlyExecutionCall {
  export type AsObject = {
    maxGas: number,
    callStackList: Array<ExecutionStackElement.AsObject>,
    bytecodeCall?: BytecodeExecution.AsObject,
    functionCall?: FunctionCall.AsObject,
    callerAddress?: google_protobuf_wrappers_pb.StringValue.AsObject,
    fee?: massa_model_v1_amount_pb.NativeAmount.AsObject,
  }

  export enum TargetCase { 
    TARGET_NOT_SET = 0,
    BYTECODE_CALL = 3,
    FUNCTION_CALL = 4,
  }
}

export class BytecodeExecution extends jspb.Message {
  getBytecode(): Uint8Array | string;
  getBytecode_asU8(): Uint8Array;
  getBytecode_asB64(): string;
  setBytecode(value: Uint8Array | string): BytecodeExecution;

  getOperationDatastore(): Uint8Array | string;
  getOperationDatastore_asU8(): Uint8Array;
  getOperationDatastore_asB64(): string;
  setOperationDatastore(value: Uint8Array | string): BytecodeExecution;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BytecodeExecution.AsObject;
  static toObject(includeInstance: boolean, msg: BytecodeExecution): BytecodeExecution.AsObject;
  static serializeBinaryToWriter(message: BytecodeExecution, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BytecodeExecution;
  static deserializeBinaryFromReader(message: BytecodeExecution, reader: jspb.BinaryReader): BytecodeExecution;
}

export namespace BytecodeExecution {
  export type AsObject = {
    bytecode: Uint8Array | string,
    operationDatastore: Uint8Array | string,
  }
}

export class FunctionCall extends jspb.Message {
  getTargetAddress(): string;
  setTargetAddress(value: string): FunctionCall;

  getTargetFunction(): string;
  setTargetFunction(value: string): FunctionCall;

  getParameter(): Uint8Array | string;
  getParameter_asU8(): Uint8Array;
  getParameter_asB64(): string;
  setParameter(value: Uint8Array | string): FunctionCall;

  getCoins(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setCoins(value?: massa_model_v1_amount_pb.NativeAmount): FunctionCall;
  hasCoins(): boolean;
  clearCoins(): FunctionCall;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FunctionCall.AsObject;
  static toObject(includeInstance: boolean, msg: FunctionCall): FunctionCall.AsObject;
  static serializeBinaryToWriter(message: FunctionCall, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FunctionCall;
  static deserializeBinaryFromReader(message: FunctionCall, reader: jspb.BinaryReader): FunctionCall;
}

export namespace FunctionCall {
  export type AsObject = {
    targetAddress: string,
    targetFunction: string,
    parameter: Uint8Array | string,
    coins?: massa_model_v1_amount_pb.NativeAmount.AsObject,
  }
}

export class ReadOnlyExecutionOutput extends jspb.Message {
  getOut(): ExecutionOutput | undefined;
  setOut(value?: ExecutionOutput): ReadOnlyExecutionOutput;
  hasOut(): boolean;
  clearOut(): ReadOnlyExecutionOutput;

  getUsedGas(): number;
  setUsedGas(value: number): ReadOnlyExecutionOutput;

  getCallResult(): Uint8Array | string;
  getCallResult_asU8(): Uint8Array;
  getCallResult_asB64(): string;
  setCallResult(value: Uint8Array | string): ReadOnlyExecutionOutput;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ReadOnlyExecutionOutput.AsObject;
  static toObject(includeInstance: boolean, msg: ReadOnlyExecutionOutput): ReadOnlyExecutionOutput.AsObject;
  static serializeBinaryToWriter(message: ReadOnlyExecutionOutput, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ReadOnlyExecutionOutput;
  static deserializeBinaryFromReader(message: ReadOnlyExecutionOutput, reader: jspb.BinaryReader): ReadOnlyExecutionOutput;
}

export namespace ReadOnlyExecutionOutput {
  export type AsObject = {
    out?: ExecutionOutput.AsObject,
    usedGas: number,
    callResult: Uint8Array | string,
  }
}

export class ExecutionStackElement extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): ExecutionStackElement;

  getCoins(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setCoins(value?: massa_model_v1_amount_pb.NativeAmount): ExecutionStackElement;
  hasCoins(): boolean;
  clearCoins(): ExecutionStackElement;

  getOwnedAddressesList(): Array<string>;
  setOwnedAddressesList(value: Array<string>): ExecutionStackElement;
  clearOwnedAddressesList(): ExecutionStackElement;
  addOwnedAddresses(value: string, index?: number): ExecutionStackElement;

  getOperationDatastoreList(): Array<massa_model_v1_commons_pb.BytesMapFieldEntry>;
  setOperationDatastoreList(value: Array<massa_model_v1_commons_pb.BytesMapFieldEntry>): ExecutionStackElement;
  clearOperationDatastoreList(): ExecutionStackElement;
  addOperationDatastore(value?: massa_model_v1_commons_pb.BytesMapFieldEntry, index?: number): massa_model_v1_commons_pb.BytesMapFieldEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecutionStackElement.AsObject;
  static toObject(includeInstance: boolean, msg: ExecutionStackElement): ExecutionStackElement.AsObject;
  static serializeBinaryToWriter(message: ExecutionStackElement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecutionStackElement;
  static deserializeBinaryFromReader(message: ExecutionStackElement, reader: jspb.BinaryReader): ExecutionStackElement;
}

export namespace ExecutionStackElement {
  export type AsObject = {
    address: string,
    coins?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    ownedAddressesList: Array<string>,
    operationDatastoreList: Array<massa_model_v1_commons_pb.BytesMapFieldEntry.AsObject>,
  }
}

export enum ScExecutionEventStatus { 
  SC_EXECUTION_EVENT_STATUS_UNSPECIFIED = 0,
  SC_EXECUTION_EVENT_STATUS_FINAL = 1,
  SC_EXECUTION_EVENT_STATUS_READ_ONLY = 2,
  SC_EXECUTION_EVENT_STATUS_CANDIDATE = 3,
}
export enum ExecutionOutputStatus { 
  EXECUTION_OUTPUT_STATUS_UNSPECIFIED = 0,
  EXECUTION_OUTPUT_STATUS_CANDIDATE = 1,
  EXECUTION_OUTPUT_STATUS_FINAL = 2,
  EXECUTION_OUTPUT_STATUS_UNKNOWN = 3,
}
export enum OperationExecutionStatus { 
  OPERATION_EXECUTION_STATUS_UNSPECIFIED = 0,
  OPERATION_EXECUTION_STATUS_SUCCESS = 1,
  OPERATION_EXECUTION_STATUS_FAILED = 2,
}
export enum AsyncPoolChangeType { 
  ASYNC_POOL_CHANGE_TYPE_UNSPECIFIED = 0,
  ASYNC_POOL_CHANGE_TYPE_SET = 1,
  ASYNC_POOL_CHANGE_TYPE_UPDATE = 2,
  ASYNC_POOL_CHANGE_TYPE_DELETE = 3,
}
export enum LedgerChangeType { 
  LEDGER_CHANGE_TYPE_UNSPECIFIED = 0,
  LEDGER_CHANGE_TYPE_SET = 1,
  LEDGER_CHANGE_TYPE_UPDATE = 2,
  LEDGER_CHANGE_TYPE_DELETE = 3,
}
