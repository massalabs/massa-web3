/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "massa.api.v1";

/** BytesMapFieldEntry */
export interface BytesMapFieldEntry {
  /** bytes key */
  key: Uint8Array;
  /** bytes key */
  value: Uint8Array;
}

/** Packages a type such that it can be securely sent and received in a trust-free network */
export interface SecureShare {
  /** Content in sharable, deserializable form. Is used in the secure verification protocols */
  serializedData: Uint8Array;
  /** A cryptographically generated value using `serialized_data` and a public key. */
  signature: string;
  /** The public-key component used in the generation of the signature */
  contentCreatorPubKey: string;
  /** Derived from the same public key used to generate the signature */
  contentCreatorAddress: string;
  /** A secure hash of the data. See also [massa_hash::Hash] */
  id: string;
}

function createBaseBytesMapFieldEntry(): BytesMapFieldEntry {
  return { key: new Uint8Array(), value: new Uint8Array() };
}

export const BytesMapFieldEntry = {
  encode(message: BytesMapFieldEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key.length !== 0) {
      writer.uint32(10).bytes(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BytesMapFieldEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBytesMapFieldEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.key = reader.bytes();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BytesMapFieldEntry {
    return {
      key: isSet(object.key) ? bytesFromBase64(object.key) : new Uint8Array(),
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(),
    };
  },

  toJSON(message: BytesMapFieldEntry): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = base64FromBytes(message.key !== undefined ? message.key : new Uint8Array()));
    message.value !== undefined &&
      (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
    return obj;
  },

  create<I extends Exact<DeepPartial<BytesMapFieldEntry>, I>>(base?: I): BytesMapFieldEntry {
    return BytesMapFieldEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<BytesMapFieldEntry>, I>>(object: I): BytesMapFieldEntry {
    const message = createBaseBytesMapFieldEntry();
    message.key = object.key ?? new Uint8Array();
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};

function createBaseSecureShare(): SecureShare {
  return {
    serializedData: new Uint8Array(),
    signature: "",
    contentCreatorPubKey: "",
    contentCreatorAddress: "",
    id: "",
  };
}

export const SecureShare = {
  encode(message: SecureShare, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.serializedData.length !== 0) {
      writer.uint32(10).bytes(message.serializedData);
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SecureShare {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSecureShare();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.serializedData = reader.bytes();
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

  fromJSON(object: any): SecureShare {
    return {
      serializedData: isSet(object.serializedData) ? bytesFromBase64(object.serializedData) : new Uint8Array(),
      signature: isSet(object.signature) ? String(object.signature) : "",
      contentCreatorPubKey: isSet(object.contentCreatorPubKey) ? String(object.contentCreatorPubKey) : "",
      contentCreatorAddress: isSet(object.contentCreatorAddress) ? String(object.contentCreatorAddress) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: SecureShare): unknown {
    const obj: any = {};
    message.serializedData !== undefined &&
      (obj.serializedData = base64FromBytes(
        message.serializedData !== undefined ? message.serializedData : new Uint8Array(),
      ));
    message.signature !== undefined && (obj.signature = message.signature);
    message.contentCreatorPubKey !== undefined && (obj.contentCreatorPubKey = message.contentCreatorPubKey);
    message.contentCreatorAddress !== undefined && (obj.contentCreatorAddress = message.contentCreatorAddress);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<SecureShare>, I>>(base?: I): SecureShare {
    return SecureShare.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SecureShare>, I>>(object: I): SecureShare {
    const message = createBaseSecureShare();
    message.serializedData = object.serializedData ?? new Uint8Array();
    message.signature = object.signature ?? "";
    message.contentCreatorPubKey = object.contentCreatorPubKey ?? "";
    message.contentCreatorAddress = object.contentCreatorAddress ?? "";
    message.id = object.id ?? "";
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
