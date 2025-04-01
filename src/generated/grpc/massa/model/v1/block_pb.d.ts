import * as jspb from 'google-protobuf'

import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb'; // proto import: "google/protobuf/wrappers.proto"
import * as massa_model_v1_denunciation_pb from '../../../massa/model/v1/denunciation_pb'; // proto import: "massa/model/v1/denunciation.proto"
import * as massa_model_v1_endorsement_pb from '../../../massa/model/v1/endorsement_pb'; // proto import: "massa/model/v1/endorsement.proto"
import * as massa_model_v1_operation_pb from '../../../massa/model/v1/operation_pb'; // proto import: "massa/model/v1/operation.proto"
import * as massa_model_v1_slot_pb from '../../../massa/model/v1/slot_pb'; // proto import: "massa/model/v1/slot.proto"


export class Block extends jspb.Message {
  getHeader(): SignedBlockHeader | undefined;
  setHeader(value?: SignedBlockHeader): Block;
  hasHeader(): boolean;
  clearHeader(): Block;

  getOperationsList(): Array<string>;
  setOperationsList(value: Array<string>): Block;
  clearOperationsList(): Block;
  addOperations(value: string, index?: number): Block;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    header?: SignedBlockHeader.AsObject,
    operationsList: Array<string>,
  }
}

export class FilledBlock extends jspb.Message {
  getHeader(): SignedBlockHeader | undefined;
  setHeader(value?: SignedBlockHeader): FilledBlock;
  hasHeader(): boolean;
  clearHeader(): FilledBlock;

  getOperationsList(): Array<FilledOperationEntry>;
  setOperationsList(value: Array<FilledOperationEntry>): FilledBlock;
  clearOperationsList(): FilledBlock;
  addOperations(value?: FilledOperationEntry, index?: number): FilledOperationEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FilledBlock.AsObject;
  static toObject(includeInstance: boolean, msg: FilledBlock): FilledBlock.AsObject;
  static serializeBinaryToWriter(message: FilledBlock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FilledBlock;
  static deserializeBinaryFromReader(message: FilledBlock, reader: jspb.BinaryReader): FilledBlock;
}

export namespace FilledBlock {
  export type AsObject = {
    header?: SignedBlockHeader.AsObject,
    operationsList: Array<FilledOperationEntry.AsObject>,
  }
}

export class BlockHeader extends jspb.Message {
  getCurrentVersion(): number;
  setCurrentVersion(value: number): BlockHeader;

  getAnnouncedVersion(): google_protobuf_wrappers_pb.UInt32Value | undefined;
  setAnnouncedVersion(value?: google_protobuf_wrappers_pb.UInt32Value): BlockHeader;
  hasAnnouncedVersion(): boolean;
  clearAnnouncedVersion(): BlockHeader;

  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): BlockHeader;
  hasSlot(): boolean;
  clearSlot(): BlockHeader;

  getParentsList(): Array<string>;
  setParentsList(value: Array<string>): BlockHeader;
  clearParentsList(): BlockHeader;
  addParents(value: string, index?: number): BlockHeader;

  getOperationsHash(): string;
  setOperationsHash(value: string): BlockHeader;

  getEndorsementsList(): Array<massa_model_v1_endorsement_pb.SignedEndorsement>;
  setEndorsementsList(value: Array<massa_model_v1_endorsement_pb.SignedEndorsement>): BlockHeader;
  clearEndorsementsList(): BlockHeader;
  addEndorsements(value?: massa_model_v1_endorsement_pb.SignedEndorsement, index?: number): massa_model_v1_endorsement_pb.SignedEndorsement;

  getDenunciationsList(): Array<massa_model_v1_denunciation_pb.Denunciation>;
  setDenunciationsList(value: Array<massa_model_v1_denunciation_pb.Denunciation>): BlockHeader;
  clearDenunciationsList(): BlockHeader;
  addDenunciations(value?: massa_model_v1_denunciation_pb.Denunciation, index?: number): massa_model_v1_denunciation_pb.Denunciation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockHeader.AsObject;
  static toObject(includeInstance: boolean, msg: BlockHeader): BlockHeader.AsObject;
  static serializeBinaryToWriter(message: BlockHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockHeader;
  static deserializeBinaryFromReader(message: BlockHeader, reader: jspb.BinaryReader): BlockHeader;
}

export namespace BlockHeader {
  export type AsObject = {
    currentVersion: number,
    announcedVersion?: google_protobuf_wrappers_pb.UInt32Value.AsObject,
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    parentsList: Array<string>,
    operationsHash: string,
    endorsementsList: Array<massa_model_v1_endorsement_pb.SignedEndorsement.AsObject>,
    denunciationsList: Array<massa_model_v1_denunciation_pb.Denunciation.AsObject>,
  }
}

export class FilledOperationEntry extends jspb.Message {
  getOperationId(): string;
  setOperationId(value: string): FilledOperationEntry;

  getOperation(): massa_model_v1_operation_pb.SignedOperation | undefined;
  setOperation(value?: massa_model_v1_operation_pb.SignedOperation): FilledOperationEntry;
  hasOperation(): boolean;
  clearOperation(): FilledOperationEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FilledOperationEntry.AsObject;
  static toObject(includeInstance: boolean, msg: FilledOperationEntry): FilledOperationEntry.AsObject;
  static serializeBinaryToWriter(message: FilledOperationEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FilledOperationEntry;
  static deserializeBinaryFromReader(message: FilledOperationEntry, reader: jspb.BinaryReader): FilledOperationEntry;
}

export namespace FilledOperationEntry {
  export type AsObject = {
    operationId: string,
    operation?: massa_model_v1_operation_pb.SignedOperation.AsObject,
  }
}

export class SignedBlock extends jspb.Message {
  getContent(): Block | undefined;
  setContent(value?: Block): SignedBlock;
  hasContent(): boolean;
  clearContent(): SignedBlock;

  getSignature(): string;
  setSignature(value: string): SignedBlock;

  getContentCreatorPubKey(): string;
  setContentCreatorPubKey(value: string): SignedBlock;

  getContentCreatorAddress(): string;
  setContentCreatorAddress(value: string): SignedBlock;

  getSecureHash(): string;
  setSecureHash(value: string): SignedBlock;

  getSerializedSize(): number;
  setSerializedSize(value: number): SignedBlock;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignedBlock.AsObject;
  static toObject(includeInstance: boolean, msg: SignedBlock): SignedBlock.AsObject;
  static serializeBinaryToWriter(message: SignedBlock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignedBlock;
  static deserializeBinaryFromReader(message: SignedBlock, reader: jspb.BinaryReader): SignedBlock;
}

export namespace SignedBlock {
  export type AsObject = {
    content?: Block.AsObject,
    signature: string,
    contentCreatorPubKey: string,
    contentCreatorAddress: string,
    secureHash: string,
    serializedSize: number,
  }
}

export class SignedBlockHeader extends jspb.Message {
  getContent(): BlockHeader | undefined;
  setContent(value?: BlockHeader): SignedBlockHeader;
  hasContent(): boolean;
  clearContent(): SignedBlockHeader;

  getSignature(): string;
  setSignature(value: string): SignedBlockHeader;

  getContentCreatorPubKey(): string;
  setContentCreatorPubKey(value: string): SignedBlockHeader;

  getContentCreatorAddress(): string;
  setContentCreatorAddress(value: string): SignedBlockHeader;

  getSecureHash(): string;
  setSecureHash(value: string): SignedBlockHeader;

  getSerializedSize(): number;
  setSerializedSize(value: number): SignedBlockHeader;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignedBlockHeader.AsObject;
  static toObject(includeInstance: boolean, msg: SignedBlockHeader): SignedBlockHeader.AsObject;
  static serializeBinaryToWriter(message: SignedBlockHeader, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignedBlockHeader;
  static deserializeBinaryFromReader(message: SignedBlockHeader, reader: jspb.BinaryReader): SignedBlockHeader;
}

export namespace SignedBlockHeader {
  export type AsObject = {
    content?: BlockHeader.AsObject,
    signature: string,
    contentCreatorPubKey: string,
    contentCreatorAddress: string,
    secureHash: string,
    serializedSize: number,
  }
}

export class BlockWrapper extends jspb.Message {
  getStatus(): BlockStatus;
  setStatus(value: BlockStatus): BlockWrapper;

  getBlock(): Block | undefined;
  setBlock(value?: Block): BlockWrapper;
  hasBlock(): boolean;
  clearBlock(): BlockWrapper;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: BlockWrapper): BlockWrapper.AsObject;
  static serializeBinaryToWriter(message: BlockWrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockWrapper;
  static deserializeBinaryFromReader(message: BlockWrapper, reader: jspb.BinaryReader): BlockWrapper;
}

export namespace BlockWrapper {
  export type AsObject = {
    status: BlockStatus,
    block?: Block.AsObject,
  }
}

export class BlockInfo extends jspb.Message {
  getBlockId(): string;
  setBlockId(value: string): BlockInfo;

  getStatus(): BlockStatus;
  setStatus(value: BlockStatus): BlockInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockInfo.AsObject;
  static toObject(includeInstance: boolean, msg: BlockInfo): BlockInfo.AsObject;
  static serializeBinaryToWriter(message: BlockInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockInfo;
  static deserializeBinaryFromReader(message: BlockInfo, reader: jspb.BinaryReader): BlockInfo;
}

export namespace BlockInfo {
  export type AsObject = {
    blockId: string,
    status: BlockStatus,
  }
}

export class BlockIds extends jspb.Message {
  getBlockIdsList(): Array<string>;
  setBlockIdsList(value: Array<string>): BlockIds;
  clearBlockIdsList(): BlockIds;
  addBlockIds(value: string, index?: number): BlockIds;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockIds.AsObject;
  static toObject(includeInstance: boolean, msg: BlockIds): BlockIds.AsObject;
  static serializeBinaryToWriter(message: BlockIds, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockIds;
  static deserializeBinaryFromReader(message: BlockIds, reader: jspb.BinaryReader): BlockIds;
}

export namespace BlockIds {
  export type AsObject = {
    blockIdsList: Array<string>,
  }
}

export class BlockParent extends jspb.Message {
  getBlockId(): string;
  setBlockId(value: string): BlockParent;

  getPeriod(): number;
  setPeriod(value: number): BlockParent;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BlockParent.AsObject;
  static toObject(includeInstance: boolean, msg: BlockParent): BlockParent.AsObject;
  static serializeBinaryToWriter(message: BlockParent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BlockParent;
  static deserializeBinaryFromReader(message: BlockParent, reader: jspb.BinaryReader): BlockParent;
}

export namespace BlockParent {
  export type AsObject = {
    blockId: string,
    period: number,
  }
}

export enum BlockStatus { 
  BLOCK_STATUS_UNSPECIFIED = 0,
  BLOCK_STATUS_NON_FINAL_BLOCKCLIQUE = 1,
  BLOCK_STATUS_FINAL = 2,
  BLOCK_STATUS_NON_FINAL_ALTERNATE_CLIQUE = 3,
  BLOCK_STATUS_DISCARDED = 4,
}
