import * as jspb from 'google-protobuf'

import * as massa_model_v1_time_pb from '../../../massa/model/v1/time_pb'; // proto import: "massa/model/v1/time.proto"


export class MipStatusEntry extends jspb.Message {
  getMipInfo(): MipInfo | undefined;
  setMipInfo(value?: MipInfo): MipStatusEntry;
  hasMipInfo(): boolean;
  clearMipInfo(): MipStatusEntry;

  getStateId(): ComponentStateId;
  setStateId(value: ComponentStateId): MipStatusEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MipStatusEntry.AsObject;
  static toObject(includeInstance: boolean, msg: MipStatusEntry): MipStatusEntry.AsObject;
  static serializeBinaryToWriter(message: MipStatusEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MipStatusEntry;
  static deserializeBinaryFromReader(message: MipStatusEntry, reader: jspb.BinaryReader): MipStatusEntry;
}

export namespace MipStatusEntry {
  export type AsObject = {
    mipInfo?: MipInfo.AsObject,
    stateId: ComponentStateId,
  }
}

export class MipInfo extends jspb.Message {
  getName(): string;
  setName(value: string): MipInfo;

  getVersion(): number;
  setVersion(value: number): MipInfo;

  getStart(): massa_model_v1_time_pb.NativeTime | undefined;
  setStart(value?: massa_model_v1_time_pb.NativeTime): MipInfo;
  hasStart(): boolean;
  clearStart(): MipInfo;

  getTimeout(): massa_model_v1_time_pb.NativeTime | undefined;
  setTimeout(value?: massa_model_v1_time_pb.NativeTime): MipInfo;
  hasTimeout(): boolean;
  clearTimeout(): MipInfo;

  getActivationDelay(): massa_model_v1_time_pb.NativeTime | undefined;
  setActivationDelay(value?: massa_model_v1_time_pb.NativeTime): MipInfo;
  hasActivationDelay(): boolean;
  clearActivationDelay(): MipInfo;

  getComponentsList(): Array<MipComponentEntry>;
  setComponentsList(value: Array<MipComponentEntry>): MipInfo;
  clearComponentsList(): MipInfo;
  addComponents(value?: MipComponentEntry, index?: number): MipComponentEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MipInfo.AsObject;
  static toObject(includeInstance: boolean, msg: MipInfo): MipInfo.AsObject;
  static serializeBinaryToWriter(message: MipInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MipInfo;
  static deserializeBinaryFromReader(message: MipInfo, reader: jspb.BinaryReader): MipInfo;
}

export namespace MipInfo {
  export type AsObject = {
    name: string,
    version: number,
    start?: massa_model_v1_time_pb.NativeTime.AsObject,
    timeout?: massa_model_v1_time_pb.NativeTime.AsObject,
    activationDelay?: massa_model_v1_time_pb.NativeTime.AsObject,
    componentsList: Array<MipComponentEntry.AsObject>,
  }
}

export class MipComponentEntry extends jspb.Message {
  getKind(): MipComponent;
  setKind(value: MipComponent): MipComponentEntry;

  getVersion(): number;
  setVersion(value: number): MipComponentEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MipComponentEntry.AsObject;
  static toObject(includeInstance: boolean, msg: MipComponentEntry): MipComponentEntry.AsObject;
  static serializeBinaryToWriter(message: MipComponentEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MipComponentEntry;
  static deserializeBinaryFromReader(message: MipComponentEntry, reader: jspb.BinaryReader): MipComponentEntry;
}

export namespace MipComponentEntry {
  export type AsObject = {
    kind: MipComponent,
    version: number,
  }
}

export enum ComponentStateId { 
  COMPONENT_STATE_ID_UNSPECIFIED = 0,
  COMPONENT_STATE_ID_ERROR = 1,
  COMPONENT_STATE_ID_DEFINED = 2,
  COMPONENT_STATE_ID_STARTED = 3,
  COMPONENT_STATE_ID_LOCKEDIN = 4,
  COMPONENT_STATE_ID_ACTIVE = 5,
  COMPONENT_STATE_ID_FAILED = 6,
}
export enum MipComponent { 
  MIP_COMPONENT_UNSPECIFIED = 0,
  MIP_COMPONENT_ADDRESS = 1,
  MIP_COMPONENT_KEYPAIR = 2,
}
