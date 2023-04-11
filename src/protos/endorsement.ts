/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Slot } from "./slot";

export const protobufPackage = "massa.api.v1";

/** An endorsement, as sent in the network */
export interface Endorsement {
  /** Slot in which the endorsement can be included */
  slot:
    | Slot
    | undefined;
  /** Endorsement index inside the including block */
  index: number;
  /**
   * Hash of endorsed block
   * This is the parent in thread `self.slot.thread` of the block in which the endorsement is included
   */
  endorsedBlock: string;
}

/** Signed endorsement */
export interface SignedEndorsement {
  /** Endorsement */
  content:
    | Endorsement
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

function createBaseEndorsement(): Endorsement {
  return { slot: undefined, index: 0, endorsedBlock: "" };
}

export const Endorsement = {
  encode(message: Endorsement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slot !== undefined) {
      Slot.encode(message.slot, writer.uint32(10).fork()).ldelim();
    }
    if (message.index !== 0) {
      writer.uint32(21).fixed32(message.index);
    }
    if (message.endorsedBlock !== "") {
      writer.uint32(26).string(message.endorsedBlock);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Endorsement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEndorsement();
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
          if (tag != 21) {
            break;
          }

          message.index = reader.fixed32();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.endorsedBlock = reader.string();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Endorsement {
    return {
      slot: isSet(object.slot) ? Slot.fromJSON(object.slot) : undefined,
      index: isSet(object.index) ? Number(object.index) : 0,
      endorsedBlock: isSet(object.endorsedBlock) ? String(object.endorsedBlock) : "",
    };
  },

  toJSON(message: Endorsement): unknown {
    const obj: any = {};
    message.slot !== undefined && (obj.slot = message.slot ? Slot.toJSON(message.slot) : undefined);
    message.index !== undefined && (obj.index = Math.round(message.index));
    message.endorsedBlock !== undefined && (obj.endorsedBlock = message.endorsedBlock);
    return obj;
  },

  create<I extends Exact<DeepPartial<Endorsement>, I>>(base?: I): Endorsement {
    return Endorsement.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Endorsement>, I>>(object: I): Endorsement {
    const message = createBaseEndorsement();
    message.slot = (object.slot !== undefined && object.slot !== null) ? Slot.fromPartial(object.slot) : undefined;
    message.index = object.index ?? 0;
    message.endorsedBlock = object.endorsedBlock ?? "";
    return message;
  },
};

function createBaseSignedEndorsement(): SignedEndorsement {
  return { content: undefined, signature: "", contentCreatorPubKey: "", contentCreatorAddress: "", id: "" };
}

export const SignedEndorsement = {
  encode(message: SignedEndorsement, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.content !== undefined) {
      Endorsement.encode(message.content, writer.uint32(10).fork()).ldelim();
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SignedEndorsement {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignedEndorsement();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.content = Endorsement.decode(reader, reader.uint32());
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

  fromJSON(object: any): SignedEndorsement {
    return {
      content: isSet(object.content) ? Endorsement.fromJSON(object.content) : undefined,
      signature: isSet(object.signature) ? String(object.signature) : "",
      contentCreatorPubKey: isSet(object.contentCreatorPubKey) ? String(object.contentCreatorPubKey) : "",
      contentCreatorAddress: isSet(object.contentCreatorAddress) ? String(object.contentCreatorAddress) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: SignedEndorsement): unknown {
    const obj: any = {};
    message.content !== undefined && (obj.content = message.content ? Endorsement.toJSON(message.content) : undefined);
    message.signature !== undefined && (obj.signature = message.signature);
    message.contentCreatorPubKey !== undefined && (obj.contentCreatorPubKey = message.contentCreatorPubKey);
    message.contentCreatorAddress !== undefined && (obj.contentCreatorAddress = message.contentCreatorAddress);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<SignedEndorsement>, I>>(base?: I): SignedEndorsement {
    return SignedEndorsement.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SignedEndorsement>, I>>(object: I): SignedEndorsement {
    const message = createBaseSignedEndorsement();
    message.content = (object.content !== undefined && object.content !== null)
      ? Endorsement.fromPartial(object.content)
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
