// package: massa
// file: protos/massaservice.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf';

export class CreateOrderbookRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateOrderbookRequest;
  getTicker(): string;
  setTicker(value: string): CreateOrderbookRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrderbookRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CreateOrderbookRequest,
  ): CreateOrderbookRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: CreateOrderbookRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrderbookRequest;
  static deserializeBinaryFromReader(
    message: CreateOrderbookRequest,
    reader: jspb.BinaryReader,
  ): CreateOrderbookRequest;
}

export namespace CreateOrderbookRequest {
  export type AsObject = {
    name: string;
    ticker: string;
  };
}

export class CreateOrderbookResponse extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): CreateOrderbookResponse;
  getTicker(): string;
  setTicker(value: string): CreateOrderbookResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOrderbookResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CreateOrderbookResponse,
  ): CreateOrderbookResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: CreateOrderbookResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CreateOrderbookResponse;
  static deserializeBinaryFromReader(
    message: CreateOrderbookResponse,
    reader: jspb.BinaryReader,
  ): CreateOrderbookResponse;
}

export namespace CreateOrderbookResponse {
  export type AsObject = {
    uuid: string;
    ticker: string;
  };
}

export class DeleteOderbookRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): DeleteOderbookRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOderbookRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: DeleteOderbookRequest,
  ): DeleteOderbookRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: DeleteOderbookRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOderbookRequest;
  static deserializeBinaryFromReader(
    message: DeleteOderbookRequest,
    reader: jspb.BinaryReader,
  ): DeleteOderbookRequest;
}

export namespace DeleteOderbookRequest {
  export type AsObject = {
    uuid: string;
  };
}

export class DeleteOrderbookResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOrderbookResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: DeleteOrderbookResponse,
  ): DeleteOrderbookResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: DeleteOrderbookResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOrderbookResponse;
  static deserializeBinaryFromReader(
    message: DeleteOrderbookResponse,
    reader: jspb.BinaryReader,
  ): DeleteOrderbookResponse;
}

export namespace DeleteOrderbookResponse {
  export type AsObject = {};
}
