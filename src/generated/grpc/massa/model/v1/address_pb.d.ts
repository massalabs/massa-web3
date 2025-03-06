import * as jspb from 'google-protobuf'



export class NativeAddress extends jspb.Message {
  getCategory(): AddressCategory;
  setCategory(value: AddressCategory): NativeAddress;

  getVersion(): number;
  setVersion(value: number): NativeAddress;

  getContent(): Uint8Array | string;
  getContent_asU8(): Uint8Array;
  getContent_asB64(): string;
  setContent(value: Uint8Array | string): NativeAddress;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NativeAddress.AsObject;
  static toObject(includeInstance: boolean, msg: NativeAddress): NativeAddress.AsObject;
  static serializeBinaryToWriter(message: NativeAddress, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NativeAddress;
  static deserializeBinaryFromReader(message: NativeAddress, reader: jspb.BinaryReader): NativeAddress;
}

export namespace NativeAddress {
  export type AsObject = {
    category: AddressCategory,
    version: number,
    content: Uint8Array | string,
  }
}

export class Addresses extends jspb.Message {
  getAddressesList(): Array<string>;
  setAddressesList(value: Array<string>): Addresses;
  clearAddressesList(): Addresses;
  addAddresses(value: string, index?: number): Addresses;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Addresses.AsObject;
  static toObject(includeInstance: boolean, msg: Addresses): Addresses.AsObject;
  static serializeBinaryToWriter(message: Addresses, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Addresses;
  static deserializeBinaryFromReader(message: Addresses, reader: jspb.BinaryReader): Addresses;
}

export namespace Addresses {
  export type AsObject = {
    addressesList: Array<string>,
  }
}

export enum AddressCategory { 
  ADDRESS_CATEGORY_UNSPECIFIED = 0,
  ADDRESS_CATEGORY_USER_ADDRESS = 1,
  ADDRESS_CATEGORY_SC_ADDRESS = 2,
}
