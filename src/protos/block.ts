/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { SignedEndorsement } from "./endorsement";
import { SignedOperation } from "./operation";
import { Slot } from "./slot";

export const protobufPackage = "massa.api.v1";

/** Block */
export interface Block {
  /** Signed header */
  header:
    | SignedBlockHeader
    | undefined;
  /** Operations ids */
  operations: string[];
}

/** Filled block */
export interface FilledBlock {
  /** Signed header */
  header:
    | SignedBlockHeader
    | undefined;
  /** Operations */
  operations: FilledOperationTuple[];
}

/** Block header */
export interface BlockHeader {
  /** Slot */
  slot:
    | Slot
    | undefined;
  /** parents */
  parents: string[];
  /** All operations hash */
  operationMerkleRoot: string;
  /** Signed endorsements */
  endorsements: SignedEndorsement[];
}

/** Filled Operation Tuple */
export interface FilledOperationTuple {
  /** Operation id */
  operationId: string;
  /** Signed operation */
  operation: SignedOperation | undefined;
}

/** Signed block */
export interface SignedBlock {
  /** Block */
  content:
    | Block
    | undefined;
  /** A cryptographically generated value using `serialized_data` and a public key. */
  signature: string;
  /** The public-key component used in the generation of the signature */
  contentCreatorPubKey: string;
  /** Derived from the same public key used to generate the signature */
  contentCreatorAddress: string;
  /** A secure hash of the data. See also [massa_hash::Hash] */
  id: string;
}

/** Signed block header */
export interface SignedBlockHeader {
  /** BlockHeader */
  content:
    | BlockHeader
    | undefined;
  /** A cryptographically generated value using `serialized_data` and a public key. */
  signature: string;
  /** The public-key component used in the generation of the signature */
  contentCreatorPubKey: string;
  /** Derived from the same public key used to generate the signature */
  contentCreatorAddress: string;
  /** A secure hash of the data. See also [massa_hash::Hash] */
  id: string;
}

function createBaseBlock(): Block {
  return { header: undefined, operations: [] };
}

export const Block = {
  encode(message: Block, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.header !== undefined) {
      SignedBlockHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.operations) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Block {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.header = SignedBlockHeader.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.operations.push(reader.string());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Block {
    return {
      header: isSet(object.header) ? SignedBlockHeader.fromJSON(object.header) : undefined,
      operations: Array.isArray(object?.operations) ? object.operations.map((e: any) => String(e)) : [],
    };
  },

  toJSON(message: Block): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header ? SignedBlockHeader.toJSON(message.header) : undefined);
    if (message.operations) {
      obj.operations = message.operations.map((e) => e);
    } else {
      obj.operations = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Block>, I>>(base?: I): Block {
    return Block.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Block>, I>>(object: I): Block {
    const message = createBaseBlock();
    message.header = (object.header !== undefined && object.header !== null)
      ? SignedBlockHeader.fromPartial(object.header)
      : undefined;
    message.operations = object.operations?.map((e) => e) || [];
    return message;
  },
};

function createBaseFilledBlock(): FilledBlock {
  return { header: undefined, operations: [] };
}

export const FilledBlock = {
  encode(message: FilledBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.header !== undefined) {
      SignedBlockHeader.encode(message.header, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.operations) {
      FilledOperationTuple.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FilledBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilledBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.header = SignedBlockHeader.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.operations.push(FilledOperationTuple.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): FilledBlock {
    return {
      header: isSet(object.header) ? SignedBlockHeader.fromJSON(object.header) : undefined,
      operations: Array.isArray(object?.operations)
        ? object.operations.map((e: any) => FilledOperationTuple.fromJSON(e))
        : [],
    };
  },

  toJSON(message: FilledBlock): unknown {
    const obj: any = {};
    message.header !== undefined &&
      (obj.header = message.header ? SignedBlockHeader.toJSON(message.header) : undefined);
    if (message.operations) {
      obj.operations = message.operations.map((e) => e ? FilledOperationTuple.toJSON(e) : undefined);
    } else {
      obj.operations = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<FilledBlock>, I>>(base?: I): FilledBlock {
    return FilledBlock.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FilledBlock>, I>>(object: I): FilledBlock {
    const message = createBaseFilledBlock();
    message.header = (object.header !== undefined && object.header !== null)
      ? SignedBlockHeader.fromPartial(object.header)
      : undefined;
    message.operations = object.operations?.map((e) => FilledOperationTuple.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBlockHeader(): BlockHeader {
  return { slot: undefined, parents: [], operationMerkleRoot: "", endorsements: [] };
}

export const BlockHeader = {
  encode(message: BlockHeader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slot !== undefined) {
      Slot.encode(message.slot, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.parents) {
      writer.uint32(18).string(v!);
    }
    if (message.operationMerkleRoot !== "") {
      writer.uint32(26).string(message.operationMerkleRoot);
    }
    for (const v of message.endorsements) {
      SignedEndorsement.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BlockHeader {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBlockHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.slot = Slot.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.parents.push(reader.string());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.operationMerkleRoot = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.endorsements.push(SignedEndorsement.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BlockHeader {
    return {
      slot: isSet(object.slot) ? Slot.fromJSON(object.slot) : undefined,
      parents: Array.isArray(object?.parents) ? object.parents.map((e: any) => String(e)) : [],
      operationMerkleRoot: isSet(object.operationMerkleRoot) ? String(object.operationMerkleRoot) : "",
      endorsements: Array.isArray(object?.endorsements)
        ? object.endorsements.map((e: any) => SignedEndorsement.fromJSON(e))
        : [],
    };
  },

  toJSON(message: BlockHeader): unknown {
    const obj: any = {};
    message.slot !== undefined && (obj.slot = message.slot ? Slot.toJSON(message.slot) : undefined);
    if (message.parents) {
      obj.parents = message.parents.map((e) => e);
    } else {
      obj.parents = [];
    }
    message.operationMerkleRoot !== undefined && (obj.operationMerkleRoot = message.operationMerkleRoot);
    if (message.endorsements) {
      obj.endorsements = message.endorsements.map((e) => e ? SignedEndorsement.toJSON(e) : undefined);
    } else {
      obj.endorsements = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BlockHeader>, I>>(base?: I): BlockHeader {
    return BlockHeader.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BlockHeader>, I>>(object: I): BlockHeader {
    const message = createBaseBlockHeader();
    message.slot = (object.slot !== undefined && object.slot !== null) ? Slot.fromPartial(object.slot) : undefined;
    message.parents = object.parents?.map((e) => e) || [];
    message.operationMerkleRoot = object.operationMerkleRoot ?? "";
    message.endorsements = object.endorsements?.map((e) => SignedEndorsement.fromPartial(e)) || [];
    return message;
  },
};

function createBaseFilledOperationTuple(): FilledOperationTuple {
  return { operationId: "", operation: undefined };
}

export const FilledOperationTuple = {
  encode(message: FilledOperationTuple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operationId !== "") {
      writer.uint32(10).string(message.operationId);
    }
    if (message.operation !== undefined) {
      SignedOperation.encode(message.operation, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FilledOperationTuple {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilledOperationTuple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.operationId = reader.string();
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

  fromJSON(object: any): FilledOperationTuple {
    return {
      operationId: isSet(object.operationId) ? String(object.operationId) : "",
      operation: isSet(object.operation) ? SignedOperation.fromJSON(object.operation) : undefined,
    };
  },

  toJSON(message: FilledOperationTuple): unknown {
    const obj: any = {};
    message.operationId !== undefined && (obj.operationId = message.operationId);
    message.operation !== undefined &&
      (obj.operation = message.operation ? SignedOperation.toJSON(message.operation) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<FilledOperationTuple>, I>>(base?: I): FilledOperationTuple {
    return FilledOperationTuple.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FilledOperationTuple>, I>>(object: I): FilledOperationTuple {
    const message = createBaseFilledOperationTuple();
    message.operationId = object.operationId ?? "";
    message.operation = (object.operation !== undefined && object.operation !== null)
      ? SignedOperation.fromPartial(object.operation)
      : undefined;
    return message;
  },
};

function createBaseSignedBlock(): SignedBlock {
  return { content: undefined, signature: "", contentCreatorPubKey: "", contentCreatorAddress: "", id: "" };
}

export const SignedBlock = {
  encode(message: SignedBlock, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.content !== undefined) {
      Block.encode(message.content, writer.uint32(10).fork()).ldelim();
    }
    if (message.signature !== "") {
      writer.uint32(18).string(message.signature);
    }
    if (message.contentCreatorPubKey !== "") {
      writer.uint32(26).string(message.contentCreatorPubKey);
    }
    if (message.contentCreatorAddress !== "") {
      writer.uint32(34).string(message.contentCreatorAddress);
    }
    if (message.id !== "") {
      writer.uint32(42).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignedBlock {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignedBlock();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.content = Block.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.signature = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.contentCreatorPubKey = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.contentCreatorAddress = reader.string();
          continue;
        case 5:
          if (tag != 42) {
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

  fromJSON(object: any): SignedBlock {
    return {
      content: isSet(object.content) ? Block.fromJSON(object.content) : undefined,
      signature: isSet(object.signature) ? String(object.signature) : "",
      contentCreatorPubKey: isSet(object.contentCreatorPubKey) ? String(object.contentCreatorPubKey) : "",
      contentCreatorAddress: isSet(object.contentCreatorAddress) ? String(object.contentCreatorAddress) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: SignedBlock): unknown {
    const obj: any = {};
    message.content !== undefined && (obj.content = message.content ? Block.toJSON(message.content) : undefined);
    message.signature !== undefined && (obj.signature = message.signature);
    message.contentCreatorPubKey !== undefined && (obj.contentCreatorPubKey = message.contentCreatorPubKey);
    message.contentCreatorAddress !== undefined && (obj.contentCreatorAddress = message.contentCreatorAddress);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<SignedBlock>, I>>(base?: I): SignedBlock {
    return SignedBlock.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SignedBlock>, I>>(object: I): SignedBlock {
    const message = createBaseSignedBlock();
    message.content = (object.content !== undefined && object.content !== null)
      ? Block.fromPartial(object.content)
      : undefined;
    message.signature = object.signature ?? "";
    message.contentCreatorPubKey = object.contentCreatorPubKey ?? "";
    message.contentCreatorAddress = object.contentCreatorAddress ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseSignedBlockHeader(): SignedBlockHeader {
  return { content: undefined, signature: "", contentCreatorPubKey: "", contentCreatorAddress: "", id: "" };
}

export const SignedBlockHeader = {
  encode(message: SignedBlockHeader, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.content !== undefined) {
      BlockHeader.encode(message.content, writer.uint32(10).fork()).ldelim();
    }
    if (message.signature !== "") {
      writer.uint32(18).string(message.signature);
    }
    if (message.contentCreatorPubKey !== "") {
      writer.uint32(26).string(message.contentCreatorPubKey);
    }
    if (message.contentCreatorAddress !== "") {
      writer.uint32(34).string(message.contentCreatorAddress);
    }
    if (message.id !== "") {
      writer.uint32(42).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SignedBlockHeader {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignedBlockHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.content = BlockHeader.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.signature = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.contentCreatorPubKey = reader.string();
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.contentCreatorAddress = reader.string();
          continue;
        case 5:
          if (tag != 42) {
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

  fromJSON(object: any): SignedBlockHeader {
    return {
      content: isSet(object.content) ? BlockHeader.fromJSON(object.content) : undefined,
      signature: isSet(object.signature) ? String(object.signature) : "",
      contentCreatorPubKey: isSet(object.contentCreatorPubKey) ? String(object.contentCreatorPubKey) : "",
      contentCreatorAddress: isSet(object.contentCreatorAddress) ? String(object.contentCreatorAddress) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: SignedBlockHeader): unknown {
    const obj: any = {};
    message.content !== undefined && (obj.content = message.content ? BlockHeader.toJSON(message.content) : undefined);
    message.signature !== undefined && (obj.signature = message.signature);
    message.contentCreatorPubKey !== undefined && (obj.contentCreatorPubKey = message.contentCreatorPubKey);
    message.contentCreatorAddress !== undefined && (obj.contentCreatorAddress = message.contentCreatorAddress);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<SignedBlockHeader>, I>>(base?: I): SignedBlockHeader {
    return SignedBlockHeader.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SignedBlockHeader>, I>>(object: I): SignedBlockHeader {
    const message = createBaseSignedBlockHeader();
    message.content = (object.content !== undefined && object.content !== null)
      ? BlockHeader.fromPartial(object.content)
      : undefined;
    message.signature = object.signature ?? "";
    message.contentCreatorPubKey = object.contentCreatorPubKey ?? "";
    message.contentCreatorAddress = object.contentCreatorAddress ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
