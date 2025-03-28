import * as jspb from 'google-protobuf'



export class NativeTime extends jspb.Message {
  getMilliseconds(): number;
  setMilliseconds(value: number): NativeTime;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NativeTime.AsObject;
  static toObject(includeInstance: boolean, msg: NativeTime): NativeTime.AsObject;
  static serializeBinaryToWriter(message: NativeTime, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NativeTime;
  static deserializeBinaryFromReader(message: NativeTime, reader: jspb.BinaryReader): NativeTime;
}

export namespace NativeTime {
  export type AsObject = {
    milliseconds: number,
  }
}

