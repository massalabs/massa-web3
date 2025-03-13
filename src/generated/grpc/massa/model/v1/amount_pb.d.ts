import * as jspb from 'google-protobuf'



export class NativeAmount extends jspb.Message {
  getMantissa(): number;
  setMantissa(value: number): NativeAmount;

  getScale(): number;
  setScale(value: number): NativeAmount;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NativeAmount.AsObject;
  static toObject(includeInstance: boolean, msg: NativeAmount): NativeAmount.AsObject;
  static serializeBinaryToWriter(message: NativeAmount, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NativeAmount;
  static deserializeBinaryFromReader(message: NativeAmount, reader: jspb.BinaryReader): NativeAmount;
}

export namespace NativeAmount {
  export type AsObject = {
    mantissa: number,
    scale: number,
  }
}

