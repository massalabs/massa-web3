import * as jspb from 'google-protobuf'



export class StakerEntry extends jspb.Message {
  getAddress(): string;
  setAddress(value: string): StakerEntry;

  getRolls(): number;
  setRolls(value: number): StakerEntry;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StakerEntry.AsObject;
  static toObject(includeInstance: boolean, msg: StakerEntry): StakerEntry.AsObject;
  static serializeBinaryToWriter(message: StakerEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StakerEntry;
  static deserializeBinaryFromReader(message: StakerEntry, reader: jspb.BinaryReader): StakerEntry;
}

export namespace StakerEntry {
  export type AsObject = {
    address: string,
    rolls: number,
  }
}

