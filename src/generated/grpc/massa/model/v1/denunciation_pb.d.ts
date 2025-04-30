import * as jspb from 'google-protobuf'

import * as massa_model_v1_amount_pb from '../../../massa/model/v1/amount_pb'; // proto import: "massa/model/v1/amount.proto"
import * as massa_model_v1_slot_pb from '../../../massa/model/v1/slot_pb'; // proto import: "massa/model/v1/slot.proto"


export class Denunciation extends jspb.Message {
  getBlockHeader(): BlockHeaderDenunciation | undefined;
  setBlockHeader(value?: BlockHeaderDenunciation): Denunciation;
  hasBlockHeader(): boolean;
  clearBlockHeader(): Denunciation;

  getEndorsement(): EndorsementDenunciation | undefined;
  setEndorsement(value?: EndorsementDenunciation): Denunciation;
  hasEndorsement(): boolean;
  clearEndorsement(): Denunciation;

  getAddress(): DenunciationAddress | undefined;
  setAddress(value?: DenunciationAddress): Denunciation;
  hasAddress(): boolean;
  clearAddress(): Denunciation;

  getEntryCase(): Denunciation.EntryCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Denunciation.AsObject;
  static toObject(includeInstance: boolean, msg: Denunciation): Denunciation.AsObject;
  static serializeBinaryToWriter(message: Denunciation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Denunciation;
  static deserializeBinaryFromReader(message: Denunciation, reader: jspb.BinaryReader): Denunciation;
}

export namespace Denunciation {
  export type AsObject = {
    blockHeader?: BlockHeaderDenunciation.AsObject,
    endorsement?: EndorsementDenunciation.AsObject,
    address?: DenunciationAddress.AsObject,
  }

  export enum EntryCase {
    ENTRY_NOT_SET = 0,
    BLOCK_HEADER = 1,
    ENDORSEMENT = 2,
    ADDRESS = 3,
  }
}

export class BlockHeaderDenunciation extends jspb.Message {
  getPublicKey(): string;
  setPublicKey(value: string): BlockHeaderDenunciation;

  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): BlockHeaderDenunciation;
  hasSlot(): boolean;
  clearSlot(): BlockHeaderDenunciation;

  getHash1(): string;
  setHash1(value: string): BlockHeaderDenunciation;

  getHash2(): string;
  setHash2(value: string): BlockHeaderDenunciation;

  getSignature1(): string;
  setSignature1(value: string): BlockHeaderDenunciation;

  getSignature2(): string;
  setSignature2(value: string): BlockHeaderDenunciation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockHeaderDenunciation.AsObject;
  static toObject(includeInstance: boolean, msg: BlockHeaderDenunciation): BlockHeaderDenunciation.AsObject;
  static serializeBinaryToWriter(message: BlockHeaderDenunciation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockHeaderDenunciation;
  static deserializeBinaryFromReader(message: BlockHeaderDenunciation, reader: jspb.BinaryReader): BlockHeaderDenunciation;
}

export namespace BlockHeaderDenunciation {
  export type AsObject = {
    publicKey: string,
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    hash1: string,
    hash2: string,
    signature1: string,
    signature2: string,
  }
}

export class EndorsementDenunciation extends jspb.Message {
  getPublicKey(): string;
  setPublicKey(value: string): EndorsementDenunciation;

  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): EndorsementDenunciation;
  hasSlot(): boolean;
  clearSlot(): EndorsementDenunciation;

  getIndex(): number;
  setIndex(value: number): EndorsementDenunciation;

  getHash1(): string;
  setHash1(value: string): EndorsementDenunciation;

  getHash2(): string;
  setHash2(value: string): EndorsementDenunciation;

  getSignature1(): string;
  setSignature1(value: string): EndorsementDenunciation;

  getSignature2(): string;
  setSignature2(value: string): EndorsementDenunciation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EndorsementDenunciation.AsObject;
  static toObject(includeInstance: boolean, msg: EndorsementDenunciation): EndorsementDenunciation.AsObject;
  static serializeBinaryToWriter(message: EndorsementDenunciation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EndorsementDenunciation;
  static deserializeBinaryFromReader(message: EndorsementDenunciation, reader: jspb.BinaryReader): EndorsementDenunciation;
}

export namespace EndorsementDenunciation {
  export type AsObject = {
    publicKey: string,
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    index: number,
    hash1: string,
    hash2: string,
    signature1: string,
    signature2: string,
  }
}

export class DenunciationIndex extends jspb.Message {
  getBlockHeader(): DenunciationBlockHeader | undefined;
  setBlockHeader(value?: DenunciationBlockHeader): DenunciationIndex;
  hasBlockHeader(): boolean;
  clearBlockHeader(): DenunciationIndex;

  getEndorsement(): DenunciationEndorsement | undefined;
  setEndorsement(value?: DenunciationEndorsement): DenunciationIndex;
  hasEndorsement(): boolean;
  clearEndorsement(): DenunciationIndex;

  getEntryCase(): DenunciationIndex.EntryCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DenunciationIndex.AsObject;
  static toObject(includeInstance: boolean, msg: DenunciationIndex): DenunciationIndex.AsObject;
  static serializeBinaryToWriter(message: DenunciationIndex, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DenunciationIndex;
  static deserializeBinaryFromReader(message: DenunciationIndex, reader: jspb.BinaryReader): DenunciationIndex;
}

export namespace DenunciationIndex {
  export type AsObject = {
    blockHeader?: DenunciationBlockHeader.AsObject,
    endorsement?: DenunciationEndorsement.AsObject,
  }

  export enum EntryCase {
    ENTRY_NOT_SET = 0,
    BLOCK_HEADER = 1,
    ENDORSEMENT = 2,
  }
}

export class DenunciationBlockHeader extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): DenunciationBlockHeader;
  hasSlot(): boolean;
  clearSlot(): DenunciationBlockHeader;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DenunciationBlockHeader.AsObject;
  static toObject(includeInstance: boolean, msg: DenunciationBlockHeader): DenunciationBlockHeader.AsObject;
  static serializeBinaryToWriter(message: DenunciationBlockHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DenunciationBlockHeader;
  static deserializeBinaryFromReader(message: DenunciationBlockHeader, reader: jspb.BinaryReader): DenunciationBlockHeader;
}

export namespace DenunciationBlockHeader {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
  }
}

export class DenunciationEndorsement extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): DenunciationEndorsement;
  hasSlot(): boolean;
  clearSlot(): DenunciationEndorsement;

  getIndex(): number;
  setIndex(value: number): DenunciationEndorsement;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DenunciationEndorsement.AsObject;
  static toObject(includeInstance: boolean, msg: DenunciationEndorsement): DenunciationEndorsement.AsObject;
  static serializeBinaryToWriter(message: DenunciationEndorsement, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DenunciationEndorsement;
  static deserializeBinaryFromReader(message: DenunciationEndorsement, reader: jspb.BinaryReader): DenunciationEndorsement;
}

export namespace DenunciationEndorsement {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    index: number,
  }
}

export class DenunciationAddress extends jspb.Message {
  getAddressDenounced(): string;
  setAddressDenounced(value: string): DenunciationAddress;

  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): DenunciationAddress;
  hasSlot(): boolean;
  clearSlot(): DenunciationAddress;

  getSlashed(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setSlashed(value?: massa_model_v1_amount_pb.NativeAmount): DenunciationAddress;
  hasSlashed(): boolean;
  clearSlashed(): DenunciationAddress;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DenunciationAddress.AsObject;
  static toObject(includeInstance: boolean, msg: DenunciationAddress): DenunciationAddress.AsObject;
  static serializeBinaryToWriter(message: DenunciationAddress, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DenunciationAddress;
  static deserializeBinaryFromReader(message: DenunciationAddress, reader: jspb.BinaryReader): DenunciationAddress;
}

export namespace DenunciationAddress {
  export type AsObject = {
    addressDenounced: string,
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    slashed?: massa_model_v1_amount_pb.NativeAmount.AsObject,
  }
}

