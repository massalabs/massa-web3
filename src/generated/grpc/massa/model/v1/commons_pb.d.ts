import * as jspb from 'google-protobuf'



export class Error extends jspb.Message {
  getCode(): number;
  setCode(value: number): Error;

  getMessage(): string;
  setMessage(value: string): Error;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Error.AsObject;
  static toObject(includeInstance: boolean, msg: Error): Error.AsObject;
  static serializeBinaryToWriter(message: Error, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Error;
  static deserializeBinaryFromReader(message: Error, reader: jspb.BinaryReader): Error;
}

export namespace Error {
  export type AsObject = {
    code: number,
    message: string,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class BytesMapFieldEntry extends jspb.Message {
  getKey(): Uint8Array | string;
  getKey_asU8(): Uint8Array;
  getKey_asB64(): string;
  setKey(value: Uint8Array | string): BytesMapFieldEntry;

  getValue(): Uint8Array | string;
  getValue_asU8(): Uint8Array;
  getValue_asB64(): string;
  setValue(value: Uint8Array | string): BytesMapFieldEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BytesMapFieldEntry.AsObject;
  static toObject(includeInstance: boolean, msg: BytesMapFieldEntry): BytesMapFieldEntry.AsObject;
  static serializeBinaryToWriter(message: BytesMapFieldEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BytesMapFieldEntry;
  static deserializeBinaryFromReader(message: BytesMapFieldEntry, reader: jspb.BinaryReader): BytesMapFieldEntry;
}

export namespace BytesMapFieldEntry {
  export type AsObject = {
    key: Uint8Array | string,
    value: Uint8Array | string,
  }
}

export class ArrayOfBytesWrapper extends jspb.Message {
  getItemsList(): Array<Uint8Array | string>;
  setItemsList(value: Array<Uint8Array | string>): ArrayOfBytesWrapper;
  clearItemsList(): ArrayOfBytesWrapper;
  addItems(value: Uint8Array | string, index?: number): ArrayOfBytesWrapper;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ArrayOfBytesWrapper.AsObject;
  static toObject(includeInstance: boolean, msg: ArrayOfBytesWrapper): ArrayOfBytesWrapper.AsObject;
  static serializeBinaryToWriter(message: ArrayOfBytesWrapper, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ArrayOfBytesWrapper;
  static deserializeBinaryFromReader(message: ArrayOfBytesWrapper, reader: jspb.BinaryReader): ArrayOfBytesWrapper;
}

export namespace ArrayOfBytesWrapper {
  export type AsObject = {
    itemsList: Array<Uint8Array | string>,
  }
}

export class KeyPair extends jspb.Message {
  getPublicKey(): string;
  setPublicKey(value: string): KeyPair;

  getSecretKey(): string;
  setSecretKey(value: string): KeyPair;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KeyPair.AsObject;
  static toObject(includeInstance: boolean, msg: KeyPair): KeyPair.AsObject;
  static serializeBinaryToWriter(message: KeyPair, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KeyPair;
  static deserializeBinaryFromReader(message: KeyPair, reader: jspb.BinaryReader): KeyPair;
}

export namespace KeyPair {
  export type AsObject = {
    publicKey: string,
    secretKey: string,
  }
}

export enum ComparisonResult { 
  COMPARISON_RESULT_UNSPECIFIED = 0,
  COMPARISON_RESULT_LOWER = 1,
  COMPARISON_RESULT_EQUAL = 2,
  COMPARISON_RESULT_GREATER = 3,
}
