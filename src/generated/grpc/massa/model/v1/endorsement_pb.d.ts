import * as jspb from 'google-protobuf'

import * as massa_model_v1_slot_pb from '../../../massa/model/v1/slot_pb'; // proto import: "massa/model/v1/slot.proto"


export class Endorsement extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): Endorsement;
  hasSlot(): boolean;
  clearSlot(): Endorsement;

  getIndex(): number;
  setIndex(value: number): Endorsement;

  getEndorsedBlock(): string;
  setEndorsedBlock(value: string): Endorsement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Endorsement.AsObject;
  static toObject(includeInstance: boolean, msg: Endorsement): Endorsement.AsObject;
  static serializeBinaryToWriter(message: Endorsement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Endorsement;
  static deserializeBinaryFromReader(message: Endorsement, reader: jspb.BinaryReader): Endorsement;
}

export namespace Endorsement {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    index: number,
    endorsedBlock: string,
  }
}

export class SignedEndorsement extends jspb.Message {
  getContent(): Endorsement | undefined;
  setContent(value?: Endorsement): SignedEndorsement;
  hasContent(): boolean;
  clearContent(): SignedEndorsement;

  getSignature(): string;
  setSignature(value: string): SignedEndorsement;

  getContentCreatorPubKey(): string;
  setContentCreatorPubKey(value: string): SignedEndorsement;

  getContentCreatorAddress(): string;
  setContentCreatorAddress(value: string): SignedEndorsement;

  getSecureHash(): string;
  setSecureHash(value: string): SignedEndorsement;

  getSerializedSize(): number;
  setSerializedSize(value: number): SignedEndorsement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignedEndorsement.AsObject;
  static toObject(includeInstance: boolean, msg: SignedEndorsement): SignedEndorsement.AsObject;
  static serializeBinaryToWriter(message: SignedEndorsement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignedEndorsement;
  static deserializeBinaryFromReader(message: SignedEndorsement, reader: jspb.BinaryReader): SignedEndorsement;
}

export namespace SignedEndorsement {
  export type AsObject = {
    content?: Endorsement.AsObject,
    signature: string,
    contentCreatorPubKey: string,
    contentCreatorAddress: string,
    secureHash: string,
    serializedSize: number,
  }
}

export class EndorsementIds extends jspb.Message {
  getEndorsementIdsList(): Array<string>;
  setEndorsementIdsList(value: Array<string>): EndorsementIds;
  clearEndorsementIdsList(): EndorsementIds;
  addEndorsementIds(value: string, index?: number): EndorsementIds;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EndorsementIds.AsObject;
  static toObject(includeInstance: boolean, msg: EndorsementIds): EndorsementIds.AsObject;
  static serializeBinaryToWriter(message: EndorsementIds, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EndorsementIds;
  static deserializeBinaryFromReader(message: EndorsementIds, reader: jspb.BinaryReader): EndorsementIds;
}

export namespace EndorsementIds {
  export type AsObject = {
    endorsementIdsList: Array<string>,
  }
}

export class EndorsementWrapper extends jspb.Message {
  getInPool(): boolean;
  setInPool(value: boolean): EndorsementWrapper;

  getInBlocksList(): Array<string>;
  setInBlocksList(value: Array<string>): EndorsementWrapper;
  clearInBlocksList(): EndorsementWrapper;
  addInBlocks(value: string, index?: number): EndorsementWrapper;

  getIsFinal(): boolean;
  setIsFinal(value: boolean): EndorsementWrapper;

  getEndorsement(): SignedEndorsement | undefined;
  setEndorsement(value?: SignedEndorsement): EndorsementWrapper;
  hasEndorsement(): boolean;
  clearEndorsement(): EndorsementWrapper;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EndorsementWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: EndorsementWrapper): EndorsementWrapper.AsObject;
  static serializeBinaryToWriter(message: EndorsementWrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EndorsementWrapper;
  static deserializeBinaryFromReader(message: EndorsementWrapper, reader: jspb.BinaryReader): EndorsementWrapper;
}

export namespace EndorsementWrapper {
  export type AsObject = {
    inPool: boolean,
    inBlocksList: Array<string>,
    isFinal: boolean,
    endorsement?: SignedEndorsement.AsObject,
  }
}

export class EndorsementInfo extends jspb.Message {
  getEndorsementId(): string;
  setEndorsementId(value: string): EndorsementInfo;

  getInPool(): boolean;
  setInPool(value: boolean): EndorsementInfo;

  getInBlocksList(): Array<string>;
  setInBlocksList(value: Array<string>): EndorsementInfo;
  clearInBlocksList(): EndorsementInfo;
  addInBlocks(value: string, index?: number): EndorsementInfo;

  getIsFinal(): boolean;
  setIsFinal(value: boolean): EndorsementInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EndorsementInfo.AsObject;
  static toObject(includeInstance: boolean, msg: EndorsementInfo): EndorsementInfo.AsObject;
  static serializeBinaryToWriter(message: EndorsementInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EndorsementInfo;
  static deserializeBinaryFromReader(message: EndorsementInfo, reader: jspb.BinaryReader): EndorsementInfo;
}

export namespace EndorsementInfo {
  export type AsObject = {
    endorsementId: string,
    inPool: boolean,
    inBlocksList: Array<string>,
    isFinal: boolean,
  }
}

