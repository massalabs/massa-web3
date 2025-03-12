import * as jspb from 'google-protobuf'

import * as massa_model_v1_amount_pb from '../../../massa/model/v1/amount_pb'; // proto import: "massa/model/v1/amount.proto"
import * as massa_model_v1_commons_pb from '../../../massa/model/v1/commons_pb'; // proto import: "massa/model/v1/commons.proto"


export class Operation extends jspb.Message {
  getFee(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setFee(value?: massa_model_v1_amount_pb.NativeAmount): Operation;
  hasFee(): boolean;
  clearFee(): Operation;

  getExpirePeriod(): number;
  setExpirePeriod(value: number): Operation;

  getOp(): OperationType | undefined;
  setOp(value?: OperationType): Operation;
  hasOp(): boolean;
  clearOp(): Operation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Operation.AsObject;
  static toObject(includeInstance: boolean, msg: Operation): Operation.AsObject;
  static serializeBinaryToWriter(message: Operation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Operation;
  static deserializeBinaryFromReader(message: Operation, reader: jspb.BinaryReader): Operation;
}

export namespace Operation {
  export type AsObject = {
    fee?: massa_model_v1_amount_pb.NativeAmount.AsObject,
    expirePeriod: number,
    op?: OperationType.AsObject,
  }
}

export class OperationType extends jspb.Message {
  getTransaction(): Transaction | undefined;
  setTransaction(value?: Transaction): OperationType;
  hasTransaction(): boolean;
  clearTransaction(): OperationType;

  getRollBuy(): RollBuy | undefined;
  setRollBuy(value?: RollBuy): OperationType;
  hasRollBuy(): boolean;
  clearRollBuy(): OperationType;

  getRollSell(): RollSell | undefined;
  setRollSell(value?: RollSell): OperationType;
  hasRollSell(): boolean;
  clearRollSell(): OperationType;

  getExecutSc(): ExecuteSC | undefined;
  setExecutSc(value?: ExecuteSC): OperationType;
  hasExecutSc(): boolean;
  clearExecutSc(): OperationType;

  getCallSc(): CallSC | undefined;
  setCallSc(value?: CallSC): OperationType;
  hasCallSc(): boolean;
  clearCallSc(): OperationType;

  getTypeCase(): OperationType.TypeCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OperationType.AsObject;
  static toObject(includeInstance: boolean, msg: OperationType): OperationType.AsObject;
  static serializeBinaryToWriter(message: OperationType, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OperationType;
  static deserializeBinaryFromReader(message: OperationType, reader: jspb.BinaryReader): OperationType;
}

export namespace OperationType {
  export type AsObject = {
    transaction?: Transaction.AsObject,
    rollBuy?: RollBuy.AsObject,
    rollSell?: RollSell.AsObject,
    executSc?: ExecuteSC.AsObject,
    callSc?: CallSC.AsObject,
  }

  export enum TypeCase { 
    TYPE_NOT_SET = 0,
    TRANSACTION = 1,
    ROLL_BUY = 2,
    ROLL_SELL = 3,
    EXECUT_SC = 4,
    CALL_SC = 5,
  }
}

export class Transaction extends jspb.Message {
  getRecipientAddress(): string;
  setRecipientAddress(value: string): Transaction;

  getAmount(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setAmount(value?: massa_model_v1_amount_pb.NativeAmount): Transaction;
  hasAmount(): boolean;
  clearAmount(): Transaction;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Transaction.AsObject;
  static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
  static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Transaction;
  static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
  export type AsObject = {
    recipientAddress: string,
    amount?: massa_model_v1_amount_pb.NativeAmount.AsObject,
  }
}

export class RollBuy extends jspb.Message {
  getRollCount(): number;
  setRollCount(value: number): RollBuy;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RollBuy.AsObject;
  static toObject(includeInstance: boolean, msg: RollBuy): RollBuy.AsObject;
  static serializeBinaryToWriter(message: RollBuy, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RollBuy;
  static deserializeBinaryFromReader(message: RollBuy, reader: jspb.BinaryReader): RollBuy;
}

export namespace RollBuy {
  export type AsObject = {
    rollCount: number,
  }
}

export class RollSell extends jspb.Message {
  getRollCount(): number;
  setRollCount(value: number): RollSell;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RollSell.AsObject;
  static toObject(includeInstance: boolean, msg: RollSell): RollSell.AsObject;
  static serializeBinaryToWriter(message: RollSell, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RollSell;
  static deserializeBinaryFromReader(message: RollSell, reader: jspb.BinaryReader): RollSell;
}

export namespace RollSell {
  export type AsObject = {
    rollCount: number,
  }
}

export class ExecuteSC extends jspb.Message {
  getData(): Uint8Array | string;
  getData_asU8(): Uint8Array;
  getData_asB64(): string;
  setData(value: Uint8Array | string): ExecuteSC;

  getMaxCoins(): number;
  setMaxCoins(value: number): ExecuteSC;

  getMaxGas(): number;
  setMaxGas(value: number): ExecuteSC;

  getDatastoreList(): Array<massa_model_v1_commons_pb.BytesMapFieldEntry>;
  setDatastoreList(value: Array<massa_model_v1_commons_pb.BytesMapFieldEntry>): ExecuteSC;
  clearDatastoreList(): ExecuteSC;
  addDatastore(value?: massa_model_v1_commons_pb.BytesMapFieldEntry, index?: number): massa_model_v1_commons_pb.BytesMapFieldEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteSC.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteSC): ExecuteSC.AsObject;
  static serializeBinaryToWriter(message: ExecuteSC, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteSC;
  static deserializeBinaryFromReader(message: ExecuteSC, reader: jspb.BinaryReader): ExecuteSC;
}

export namespace ExecuteSC {
  export type AsObject = {
    data: Uint8Array | string,
    maxCoins: number,
    maxGas: number,
    datastoreList: Array<massa_model_v1_commons_pb.BytesMapFieldEntry.AsObject>,
  }
}

export class CallSC extends jspb.Message {
  getTargetAddress(): string;
  setTargetAddress(value: string): CallSC;

  getTargetFunction(): string;
  setTargetFunction(value: string): CallSC;

  getParameter(): Uint8Array | string;
  getParameter_asU8(): Uint8Array;
  getParameter_asB64(): string;
  setParameter(value: Uint8Array | string): CallSC;

  getMaxGas(): number;
  setMaxGas(value: number): CallSC;

  getCoins(): massa_model_v1_amount_pb.NativeAmount | undefined;
  setCoins(value?: massa_model_v1_amount_pb.NativeAmount): CallSC;
  hasCoins(): boolean;
  clearCoins(): CallSC;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallSC.AsObject;
  static toObject(includeInstance: boolean, msg: CallSC): CallSC.AsObject;
  static serializeBinaryToWriter(message: CallSC, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallSC;
  static deserializeBinaryFromReader(message: CallSC, reader: jspb.BinaryReader): CallSC;
}

export namespace CallSC {
  export type AsObject = {
    targetAddress: string,
    targetFunction: string,
    parameter: Uint8Array | string,
    maxGas: number,
    coins?: massa_model_v1_amount_pb.NativeAmount.AsObject,
  }
}

export class SignedOperation extends jspb.Message {
  getContent(): Operation | undefined;
  setContent(value?: Operation): SignedOperation;
  hasContent(): boolean;
  clearContent(): SignedOperation;

  getSignature(): string;
  setSignature(value: string): SignedOperation;

  getContentCreatorPubKey(): string;
  setContentCreatorPubKey(value: string): SignedOperation;

  getContentCreatorAddress(): string;
  setContentCreatorAddress(value: string): SignedOperation;

  getSecureHash(): string;
  setSecureHash(value: string): SignedOperation;

  getSerializedSize(): number;
  setSerializedSize(value: number): SignedOperation;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SignedOperation.AsObject;
  static toObject(includeInstance: boolean, msg: SignedOperation): SignedOperation.AsObject;
  static serializeBinaryToWriter(message: SignedOperation, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SignedOperation;
  static deserializeBinaryFromReader(message: SignedOperation, reader: jspb.BinaryReader): SignedOperation;
}

export namespace SignedOperation {
  export type AsObject = {
    content?: Operation.AsObject,
    signature: string,
    contentCreatorPubKey: string,
    contentCreatorAddress: string,
    secureHash: string,
    serializedSize: number,
  }
}

export class OperationWrapper extends jspb.Message {
  getBlockIdsList(): Array<string>;
  setBlockIdsList(value: Array<string>): OperationWrapper;
  clearBlockIdsList(): OperationWrapper;
  addBlockIds(value: string, index?: number): OperationWrapper;

  getThread(): number;
  setThread(value: number): OperationWrapper;

  getOperation(): SignedOperation | undefined;
  setOperation(value?: SignedOperation): OperationWrapper;
  hasOperation(): boolean;
  clearOperation(): OperationWrapper;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OperationWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: OperationWrapper): OperationWrapper.AsObject;
  static serializeBinaryToWriter(message: OperationWrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OperationWrapper;
  static deserializeBinaryFromReader(message: OperationWrapper, reader: jspb.BinaryReader): OperationWrapper;
}

export namespace OperationWrapper {
  export type AsObject = {
    blockIdsList: Array<string>,
    thread: number,
    operation?: SignedOperation.AsObject,
  }
}

export class OperationInfo extends jspb.Message {
  getId(): string;
  setId(value: string): OperationInfo;

  getBlockIdsList(): Array<string>;
  setBlockIdsList(value: Array<string>): OperationInfo;
  clearBlockIdsList(): OperationInfo;
  addBlockIds(value: string, index?: number): OperationInfo;

  getThread(): number;
  setThread(value: number): OperationInfo;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OperationInfo.AsObject;
  static toObject(includeInstance: boolean, msg: OperationInfo): OperationInfo.AsObject;
  static serializeBinaryToWriter(message: OperationInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OperationInfo;
  static deserializeBinaryFromReader(message: OperationInfo, reader: jspb.BinaryReader): OperationInfo;
}

export namespace OperationInfo {
  export type AsObject = {
    id: string,
    blockIdsList: Array<string>,
    thread: number,
  }
}

export class OperationIds extends jspb.Message {
  getOperationIdsList(): Array<string>;
  setOperationIdsList(value: Array<string>): OperationIds;
  clearOperationIdsList(): OperationIds;
  addOperationIds(value: string, index?: number): OperationIds;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OperationIds.AsObject;
  static toObject(includeInstance: boolean, msg: OperationIds): OperationIds.AsObject;
  static serializeBinaryToWriter(message: OperationIds, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OperationIds;
  static deserializeBinaryFromReader(message: OperationIds, reader: jspb.BinaryReader): OperationIds;
}

export namespace OperationIds {
  export type AsObject = {
    operationIdsList: Array<string>,
  }
}

export class OpTypes extends jspb.Message {
  getOpTypesList(): Array<OpType>;
  setOpTypesList(value: Array<OpType>): OpTypes;
  clearOpTypesList(): OpTypes;
  addOpTypes(value: OpType, index?: number): OpTypes;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OpTypes.AsObject;
  static toObject(includeInstance: boolean, msg: OpTypes): OpTypes.AsObject;
  static serializeBinaryToWriter(message: OpTypes, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OpTypes;
  static deserializeBinaryFromReader(message: OpTypes, reader: jspb.BinaryReader): OpTypes;
}

export namespace OpTypes {
  export type AsObject = {
    opTypesList: Array<OpType>,
  }
}

export enum OpType { 
  OP_TYPE_UNSPECIFIED = 0,
  OP_TYPE_TRANSACTION = 1,
  OP_TYPE_ROLL_BUY = 2,
  OP_TYPE_ROLL_SELL = 3,
  OP_TYPE_EXECUTE_SC = 4,
  OP_TYPE_CALL_SC = 5,
}
