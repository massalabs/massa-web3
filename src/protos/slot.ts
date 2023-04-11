/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "massa.api.v1";

/** When an address is drawn to create an endorsement it is selected for a specific index */
export interface IndexedSlot {
  /** Slot */
  slot:
    | Slot
    | undefined;
  /** Endorsement index in the slot */
  index: number;
}

/** A point in time where a block is expected */
export interface Slot {
  /** Period */
  period: number;
  /** Thread */
  thread: number;
}

function createBaseIndexedSlot(): IndexedSlot {
  return { slot: undefined, index: 0 };
}

export const IndexedSlot = {
  encode(message: IndexedSlot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.slot !== undefined) {
      Slot.encode(message.slot, writer.uint32(10).fork()).ldelim();
    }
    if (message.index !== 0) {
      writer.uint32(17).fixed64(message.index);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): IndexedSlot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndexedSlot();
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
          if (tag != 17) {
            break;
          }

          message.index = longToNumber(reader.fixed64() as Long);
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): IndexedSlot {
    return {
      slot: isSet(object.slot) ? Slot.fromJSON(object.slot) : undefined,
      index: isSet(object.index) ? Number(object.index) : 0,
    };
  },

  toJSON(message: IndexedSlot): unknown {
    const obj: any = {};
    message.slot !== undefined && (obj.slot = message.slot ? Slot.toJSON(message.slot) : undefined);
    message.index !== undefined && (obj.index = Math.round(message.index));
    return obj;
  },

  create<I extends Exact<DeepPartial<IndexedSlot>, I>>(base?: I): IndexedSlot {
    return IndexedSlot.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<IndexedSlot>, I>>(object: I): IndexedSlot {
    const message = createBaseIndexedSlot();
    message.slot = (object.slot !== undefined && object.slot !== null) ? Slot.fromPartial(object.slot) : undefined;
    message.index = object.index ?? 0;
    return message;
  },
};

function createBaseSlot(): Slot {
  return { period: 0, thread: 0 };
}

export const Slot = {
  encode(message: Slot, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.period !== 0) {
      writer.uint32(9).fixed64(message.period);
    }
    if (message.thread !== 0) {
      writer.uint32(21).fixed32(message.thread);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Slot {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSlot();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 9) {
            break;
          }

          message.period = longToNumber(reader.fixed64() as Long);
          continue;
        case 2:
          if (tag != 21) {
            break;
          }

          message.thread = reader.fixed32();
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Slot {
    return {
      period: isSet(object.period) ? Number(object.period) : 0,
      thread: isSet(object.thread) ? Number(object.thread) : 0,
    };
  },

  toJSON(message: Slot): unknown {
    const obj: any = {};
    message.period !== undefined && (obj.period = Math.round(message.period));
    message.thread !== undefined && (obj.thread = Math.round(message.thread));
    return obj;
  },

  create<I extends Exact<DeepPartial<Slot>, I>>(base?: I): Slot {
    return Slot.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Slot>, I>>(object: I): Slot {
    const message = createBaseSlot();
    message.period = object.period ?? 0;
    message.thread = object.thread ?? 0;
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
