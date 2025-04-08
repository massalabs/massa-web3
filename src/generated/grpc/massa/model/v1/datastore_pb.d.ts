import * as jspb from 'google-protobuf'



export class AddressKeysEntries extends jspb.Message {
  getAddressKeyEntriesList(): Array<AddressKeyEntry>;
  setAddressKeyEntriesList(value: Array<AddressKeyEntry>): AddressKeysEntries;
  clearAddressKeyEntriesList(): AddressKeysEntries;
  addAddressKeyEntries(value?: AddressKeyEntry, index?: number): AddressKeyEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressKeysEntries.AsObject;
  static toObject(includeInstance: boolean, msg: AddressKeysEntries): AddressKeysEntries.AsObject;
  static serializeBinaryToWriter(message: AddressKeysEntries, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressKeysEntries;
  static deserializeBinaryFromReader(message: AddressKeysEntries, reader: jspb.BinaryReader): AddressKeysEntries;
}

export namespace AddressKeysEntries {
  export type AsObject = {
    addressKeyEntriesList: Array<AddressKeyEntry.AsObject>,
  }
}

export class AddressKeyEntry extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): AddressKeyEntry;

  getKey(): Uint8Array | string;
  getKey_asU8(): Uint8Array;
  getKey_asB64(): string;
  setKey(value: Uint8Array | string): AddressKeyEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddressKeyEntry.AsObject;
  static toObject(includeInstance: boolean, msg: AddressKeyEntry): AddressKeyEntry.AsObject;
  static serializeBinaryToWriter(message: AddressKeyEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): AddressKeyEntry;
  static deserializeBinaryFromReader(message: AddressKeyEntry, reader: jspb.BinaryReader): AddressKeyEntry;
}

export namespace AddressKeyEntry {
  export type AsObject = {
    address: string,
    key: Uint8Array | string,
  }
}

export class DatastoreEntry extends jspb.Message {
  getFinalValue(): Uint8Array | string;
  getFinalValue_asU8(): Uint8Array;
  getFinalValue_asB64(): string;
  setFinalValue(value: Uint8Array | string): DatastoreEntry;

  getCandidateValue(): Uint8Array | string;
  getCandidateValue_asU8(): Uint8Array;
  getCandidateValue_asB64(): string;
  setCandidateValue(value: Uint8Array | string): DatastoreEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DatastoreEntry.AsObject;
  static toObject(includeInstance: boolean, msg: DatastoreEntry): DatastoreEntry.AsObject;
  static serializeBinaryToWriter(message: DatastoreEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DatastoreEntry;
  static deserializeBinaryFromReader(message: DatastoreEntry, reader: jspb.BinaryReader): DatastoreEntry;
}

export namespace DatastoreEntry {
  export type AsObject = {
    finalValue: Uint8Array | string,
    candidateValue: Uint8Array | string,
  }
}

