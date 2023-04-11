/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { BytesMapFieldEntry } from "./common";

export const protobufPackage = "massa.api.v1";

/** The operation as sent in the network */
export interface Operation {
  /** The fee they have decided for this operation */
  fee: number;
  /** After `expire_period` slot the operation won't be included in a block */
  expirePeriod: number;
  /** The type specific operation part */
  op: OperationType | undefined;
}

/** Type specific operation content */
export interface OperationType {
  /** Transfer coins from sender to recipient */
  transaction:
    | Transaction
    | undefined;
  /** The sender buys `roll_count` rolls. Roll price is defined in configuration */
  rollBuy:
    | RollBuy
    | undefined;
  /** The sender sells `roll_count` rolls. Roll price is defined in configuration */
  rollSell:
    | RollSell
    | undefined;
  /** Execute a smart contract */
  executSc:
    | ExecuteSC
    | undefined;
  /** Calls an exported function from a stored smart contract */
  callSc: CallSC | undefined;
}

/** Transfer coins from sender to recipient */
export interface Transaction {
  /** Recipient address */
  recipientAddress: string;
  /** Amount */
  amount: number;
}

/** The sender buys `roll_count` rolls. Roll price is defined in configuration */
export interface RollBuy {
  /** Roll count */
  rollCount: number;
}

/** The sender sells `roll_count` rolls. Roll price is defined in configuration */
export interface RollSell {
  /** Roll count */
  rollCount: number;
}

/** Execute a smart contract */
export interface ExecuteSC {
  /** Smart contract bytecode. */
  data: Uint8Array;
  /** The maximum amount of gas that the execution of the contract is allowed to cost */
  maxGas: number;
  /** A key-value store associating a hash to arbitrary bytes */
  datastore: BytesMapFieldEntry[];
}

/** Calls an exported function from a stored smart contract */
export interface CallSC {
  /** Target smart contract address */
  targetAddr: string;
  /** Target function name. No function is called if empty */
  targetFunc: string;
  /** Parameter to pass to the target function */
  param: Uint8Array;
  /** The maximum amount of gas that the execution of the contract is allowed to cost */
  maxGas: number;
  /** Extra coins that are spent from the caller's balance and transferred to the target */
  coins: number;
}

/** Signed operation */
export interface SignedOperation {
  /** Operation */
  content:
    | Operation
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

function createBaseOperation(): Operation {
  return { fee: 0, expirePeriod: 0, op: undefined };
}

export const Operation = {
  encode(message: Operation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fee !== 0) {
      writer.uint32(9).fixed64(message.fee);
    }
    if (message.expirePeriod !== 0) {
      writer.uint32(17).fixed64(message.expirePeriod);
    }
    if (message.op !== undefined) {
      OperationType.encode(message.op, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Operation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 9) {
            break;
          }

          message.fee = longToNumber(reader.fixed64() as Long);
          continue;
        case 2:
          if (tag != 17) {
            break;
          }

          message.expirePeriod = longToNumber(reader.fixed64() as Long);
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.op = OperationType.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Operation {
    return {
      fee: isSet(object.fee) ? Number(object.fee) : 0,
      expirePeriod: isSet(object.expirePeriod) ? Number(object.expirePeriod) : 0,
      op: isSet(object.op) ? OperationType.fromJSON(object.op) : undefined,
    };
  },

  toJSON(message: Operation): unknown {
    const obj: any = {};
    message.fee !== undefined && (obj.fee = Math.round(message.fee));
    message.expirePeriod !== undefined && (obj.expirePeriod = Math.round(message.expirePeriod));
    message.op !== undefined && (obj.op = message.op ? OperationType.toJSON(message.op) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<Operation>, I>>(base?: I): Operation {
    return Operation.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Operation>, I>>(object: I): Operation {
    const message = createBaseOperation();
    message.fee = object.fee ?? 0;
    message.expirePeriod = object.expirePeriod ?? 0;
    message.op = (object.op !== undefined && object.op !== null) ? OperationType.fromPartial(object.op) : undefined;
    return message;
  },
};

function createBaseOperationType(): OperationType {
  return { transaction: undefined, rollBuy: undefined, rollSell: undefined, executSc: undefined, callSc: undefined };
}

export const OperationType = {
  encode(message: OperationType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.transaction !== undefined) {
      Transaction.encode(message.transaction, writer.uint32(10).fork()).ldelim();
    }
    if (message.rollBuy !== undefined) {
      RollBuy.encode(message.rollBuy, writer.uint32(18).fork()).ldelim();
    }
    if (message.rollSell !== undefined) {
      RollSell.encode(message.rollSell, writer.uint32(26).fork()).ldelim();
    }
    if (message.executSc !== undefined) {
      ExecuteSC.encode(message.executSc, writer.uint32(34).fork()).ldelim();
    }
    if (message.callSc !== undefined) {
      CallSC.encode(message.callSc, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OperationType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOperationType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.transaction = Transaction.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.rollBuy = RollBuy.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.rollSell = RollSell.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag != 34) {
            break;
          }

          message.executSc = ExecuteSC.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag != 42) {
            break;
          }

          message.callSc = CallSC.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OperationType {
    return {
      transaction: isSet(object.transaction) ? Transaction.fromJSON(object.transaction) : undefined,
      rollBuy: isSet(object.rollBuy) ? RollBuy.fromJSON(object.rollBuy) : undefined,
      rollSell: isSet(object.rollSell) ? RollSell.fromJSON(object.rollSell) : undefined,
      executSc: isSet(object.executSc) ? ExecuteSC.fromJSON(object.executSc) : undefined,
      callSc: isSet(object.callSc) ? CallSC.fromJSON(object.callSc) : undefined,
    };
  },

  toJSON(message: OperationType): unknown {
    const obj: any = {};
    message.transaction !== undefined &&
      (obj.transaction = message.transaction ? Transaction.toJSON(message.transaction) : undefined);
    message.rollBuy !== undefined && (obj.rollBuy = message.rollBuy ? RollBuy.toJSON(message.rollBuy) : undefined);
    message.rollSell !== undefined && (obj.rollSell = message.rollSell ? RollSell.toJSON(message.rollSell) : undefined);
    message.executSc !== undefined &&
      (obj.executSc = message.executSc ? ExecuteSC.toJSON(message.executSc) : undefined);
    message.callSc !== undefined && (obj.callSc = message.callSc ? CallSC.toJSON(message.callSc) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<OperationType>, I>>(base?: I): OperationType {
    return OperationType.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OperationType>, I>>(object: I): OperationType {
    const message = createBaseOperationType();
    message.transaction = (object.transaction !== undefined && object.transaction !== null)
      ? Transaction.fromPartial(object.transaction)
      : undefined;
    message.rollBuy = (object.rollBuy !== undefined && object.rollBuy !== null)
      ? RollBuy.fromPartial(object.rollBuy)
      : undefined;
    message.rollSell = (object.rollSell !== undefined && object.rollSell !== null)
      ? RollSell.fromPartial(object.rollSell)
      : undefined;
    message.executSc = (object.executSc !== undefined && object.executSc !== null)
      ? ExecuteSC.fromPartial(object.executSc)
      : undefined;
    message.callSc = (object.callSc !== undefined && object.callSc !== null)
      ? CallSC.fromPartial(object.callSc)
      : undefined;
    return message;
  },
};

function createBaseTransaction(): Transaction {
  return { recipientAddress: "", amount: 0 };
}

export const Transaction = {
  encode(message: Transaction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.recipientAddress !== "") {
      writer.uint32(10).string(message.recipientAddress);
    }
    if (message.amount !== 0) {
      writer.uint32(17).fixed64(message.amount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Transaction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.recipientAddress = reader.string();
          continue;
        case 2:
          if (tag != 17) {
            break;
          }

          message.amount = longToNumber(reader.fixed64() as Long);
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Transaction {
    return {
      recipientAddress: isSet(object.recipientAddress) ? String(object.recipientAddress) : "",
      amount: isSet(object.amount) ? Number(object.amount) : 0,
    };
  },

  toJSON(message: Transaction): unknown {
    const obj: any = {};
    message.recipientAddress !== undefined && (obj.recipientAddress = message.recipientAddress);
    message.amount !== undefined && (obj.amount = Math.round(message.amount));
    return obj;
  },

  create<I extends Exact<DeepPartial<Transaction>, I>>(base?: I): Transaction {
    return Transaction.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Transaction>, I>>(object: I): Transaction {
    const message = createBaseTransaction();
    message.recipientAddress = object.recipientAddress ?? "";
    message.amount = object.amount ?? 0;
    return message;
  },
};

function createBaseRollBuy(): RollBuy {
  return { rollCount: 0 };
}

export const RollBuy = {
  encode(message: RollBuy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollCount !== 0) {
      writer.uint32(9).fixed64(message.rollCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RollBuy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRollBuy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 9) {
            break;
          }

          message.rollCount = longToNumber(reader.fixed64() as Long);
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RollBuy {
    return { rollCount: isSet(object.rollCount) ? Number(object.rollCount) : 0 };
  },

  toJSON(message: RollBuy): unknown {
    const obj: any = {};
    message.rollCount !== undefined && (obj.rollCount = Math.round(message.rollCount));
    return obj;
  },

  create<I extends Exact<DeepPartial<RollBuy>, I>>(base?: I): RollBuy {
    return RollBuy.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RollBuy>, I>>(object: I): RollBuy {
    const message = createBaseRollBuy();
    message.rollCount = object.rollCount ?? 0;
    return message;
  },
};

function createBaseRollSell(): RollSell {
  return { rollCount: 0 };
}

export const RollSell = {
  encode(message: RollSell, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.rollCount !== 0) {
      writer.uint32(9).fixed64(message.rollCount);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RollSell {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRollSell();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 9) {
            break;
          }

          message.rollCount = longToNumber(reader.fixed64() as Long);
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): RollSell {
    return { rollCount: isSet(object.rollCount) ? Number(object.rollCount) : 0 };
  },

  toJSON(message: RollSell): unknown {
    const obj: any = {};
    message.rollCount !== undefined && (obj.rollCount = Math.round(message.rollCount));
    return obj;
  },

  create<I extends Exact<DeepPartial<RollSell>, I>>(base?: I): RollSell {
    return RollSell.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RollSell>, I>>(object: I): RollSell {
    const message = createBaseRollSell();
    message.rollCount = object.rollCount ?? 0;
    return message;
  },
};

function createBaseExecuteSC(): ExecuteSC {
  return { data: new Uint8Array(), maxGas: 0, datastore: [] };
}

export const ExecuteSC = {
  encode(message: ExecuteSC, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.maxGas !== 0) {
      writer.uint32(17).fixed64(message.maxGas);
    }
    for (const v of message.datastore) {
      BytesMapFieldEntry.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExecuteSC {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExecuteSC();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.data = reader.bytes();
          continue;
        case 2:
          if (tag != 17) {
            break;
          }

          message.maxGas = longToNumber(reader.fixed64() as Long);
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.datastore.push(BytesMapFieldEntry.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ExecuteSC {
    return {
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      maxGas: isSet(object.maxGas) ? Number(object.maxGas) : 0,
      datastore: Array.isArray(object?.datastore)
        ? object.datastore.map((e: any) => BytesMapFieldEntry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ExecuteSC): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    message.maxGas !== undefined && (obj.maxGas = Math.round(message.maxGas));
    if (message.datastore) {
      obj.datastore = message.datastore.map((e) => e ? BytesMapFieldEntry.toJSON(e) : undefined);
    } else {
      obj.datastore = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ExecuteSC>, I>>(base?: I): ExecuteSC {
    return ExecuteSC.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ExecuteSC>, I>>(object: I): ExecuteSC {
    const message = createBaseExecuteSC();
    message.data = object.data ?? new Uint8Array();
    message.maxGas = object.maxGas ?? 0;
    message.datastore = object.datastore?.map((e) => BytesMapFieldEntry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCallSC(): CallSC {
  return { targetAddr: "", targetFunc: "", param: new Uint8Array(), maxGas: 0, coins: 0 };
}

export const CallSC = {
  encode(message: CallSC, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.targetAddr !== "") {
      writer.uint32(10).string(message.targetAddr);
    }
    if (message.targetFunc !== "") {
      writer.uint32(18).string(message.targetFunc);
    }
    if (message.param.length !== 0) {
      writer.uint32(26).bytes(message.param);
    }
    if (message.maxGas !== 0) {
      writer.uint32(33).fixed64(message.maxGas);
    }
    if (message.coins !== 0) {
      writer.uint32(41).fixed64(message.coins);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CallSC {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCallSC();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.targetAddr = reader.string();
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.targetFunc = reader.string();
          continue;
        case 3:
          if (tag != 26) {
            break;
          }

          message.param = reader.bytes();
          continue;
        case 4:
          if (tag != 33) {
            break;
          }

          message.maxGas = longToNumber(reader.fixed64() as Long);
          continue;
        case 5:
          if (tag != 41) {
            break;
          }

          message.coins = longToNumber(reader.fixed64() as Long);
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CallSC {
    return {
      targetAddr: isSet(object.targetAddr) ? String(object.targetAddr) : "",
      targetFunc: isSet(object.targetFunc) ? String(object.targetFunc) : "",
      param: isSet(object.param) ? bytesFromBase64(object.param) : new Uint8Array(),
      maxGas: isSet(object.maxGas) ? Number(object.maxGas) : 0,
      coins: isSet(object.coins) ? Number(object.coins) : 0,
    };
  },

  toJSON(message: CallSC): unknown {
    const obj: any = {};
    message.targetAddr !== undefined && (obj.targetAddr = message.targetAddr);
    message.targetFunc !== undefined && (obj.targetFunc = message.targetFunc);
    message.param !== undefined &&
      (obj.param = base64FromBytes(message.param !== undefined ? message.param : new Uint8Array()));
    message.maxGas !== undefined && (obj.maxGas = Math.round(message.maxGas));
    message.coins !== undefined && (obj.coins = Math.round(message.coins));
    return obj;
  },

  create<I extends Exact<DeepPartial<CallSC>, I>>(base?: I): CallSC {
    return CallSC.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CallSC>, I>>(object: I): CallSC {
    const message = createBaseCallSC();
    message.targetAddr = object.targetAddr ?? "";
    message.targetFunc = object.targetFunc ?? "";
    message.param = object.param ?? new Uint8Array();
    message.maxGas = object.maxGas ?? 0;
    message.coins = object.coins ?? 0;
    return message;
  },
};

function createBaseSignedOperation(): SignedOperation {
  return { content: undefined, signature: "", contentCreatorPubKey: "", contentCreatorAddress: "", id: "" };
}

export const SignedOperation = {
  encode(message: SignedOperation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.content !== undefined) {
      Operation.encode(message.content, writer.uint32(10).fork()).ldelim();
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SignedOperation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSignedOperation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.content = Operation.decode(reader, reader.uint32());
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

  fromJSON(object: any): SignedOperation {
    return {
      content: isSet(object.content) ? Operation.fromJSON(object.content) : undefined,
      signature: isSet(object.signature) ? String(object.signature) : "",
      contentCreatorPubKey: isSet(object.contentCreatorPubKey) ? String(object.contentCreatorPubKey) : "",
      contentCreatorAddress: isSet(object.contentCreatorAddress) ? String(object.contentCreatorAddress) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: SignedOperation): unknown {
    const obj: any = {};
    message.content !== undefined && (obj.content = message.content ? Operation.toJSON(message.content) : undefined);
    message.signature !== undefined && (obj.signature = message.signature);
    message.contentCreatorPubKey !== undefined && (obj.contentCreatorPubKey = message.contentCreatorPubKey);
    message.contentCreatorAddress !== undefined && (obj.contentCreatorAddress = message.contentCreatorAddress);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  create<I extends Exact<DeepPartial<SignedOperation>, I>>(base?: I): SignedOperation {
    return SignedOperation.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SignedOperation>, I>>(object: I): SignedOperation {
    const message = createBaseSignedOperation();
    message.content = (object.content !== undefined && object.content !== null)
      ? Operation.fromPartial(object.content)
      : undefined;
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
