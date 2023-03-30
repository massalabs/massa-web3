// package: orderbook
// file: protos/orderbookservice.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf';

export class Order extends jspb.Message {
  getOrderbookId(): string;
  setOrderbookId(value: string): Order;
  getId(): string;
  setId(value: string): Order;
  getTicker(): string;
  setTicker(value: string): Order;
  getOrderType(): OrderType;
  setOrderType(value: OrderType): Order;
  getOrderSide(): OrderSide;
  setOrderSide(value: OrderSide): Order;
  getPrice(): string;
  setPrice(value: string): Order;
  getQuantity(): string;
  setQuantity(value: string): Order;
  getStatus(): OrderStatus;
  setStatus(value: OrderStatus): Order;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Order.AsObject;
  static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: Order,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): Order;
  static deserializeBinaryFromReader(
    message: Order,
    reader: jspb.BinaryReader,
  ): Order;
}

export namespace Order {
  export type AsObject = {
    orderbookId: string;
    id: string;
    ticker: string;
    orderType: OrderType;
    orderSide: OrderSide;
    price: string;
    quantity: string;
    status: OrderStatus;
  };
}

export class AddOrderRequest extends jspb.Message {
  getOrderbookId(): string;
  setOrderbookId(value: string): AddOrderRequest;
  getTicker(): string;
  setTicker(value: string): AddOrderRequest;
  getOrderType(): OrderType;
  setOrderType(value: OrderType): AddOrderRequest;
  getOrderSide(): OrderSide;
  setOrderSide(value: OrderSide): AddOrderRequest;
  getPrice(): string;
  setPrice(value: string): AddOrderRequest;
  getQuantity(): string;
  setQuantity(value: string): AddOrderRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddOrderRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: AddOrderRequest,
  ): AddOrderRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: AddOrderRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): AddOrderRequest;
  static deserializeBinaryFromReader(
    message: AddOrderRequest,
    reader: jspb.BinaryReader,
  ): AddOrderRequest;
}

export namespace AddOrderRequest {
  export type AsObject = {
    orderbookId: string;
    ticker: string;
    orderType: OrderType;
    orderSide: OrderSide;
    price: string;
    quantity: string;
  };
}

export class AddOrderResponse extends jspb.Message {
  hasOrder(): boolean;
  clearOrder(): void;
  getOrder(): Order | undefined;
  setOrder(value?: Order): AddOrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): AddOrderResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: AddOrderResponse,
  ): AddOrderResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: AddOrderResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): AddOrderResponse;
  static deserializeBinaryFromReader(
    message: AddOrderResponse,
    reader: jspb.BinaryReader,
  ): AddOrderResponse;
}

export namespace AddOrderResponse {
  export type AsObject = {
    order?: Order.AsObject;
  };
}

export class CancelOrderRequest extends jspb.Message {
  getOrderbookId(): string;
  setOrderbookId(value: string): CancelOrderRequest;
  getTicker(): string;
  setTicker(value: string): CancelOrderRequest;
  getOrderId(): string;
  setOrderId(value: string): CancelOrderRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelOrderRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CancelOrderRequest,
  ): CancelOrderRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: CancelOrderRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CancelOrderRequest;
  static deserializeBinaryFromReader(
    message: CancelOrderRequest,
    reader: jspb.BinaryReader,
  ): CancelOrderRequest;
}

export namespace CancelOrderRequest {
  export type AsObject = {
    orderbookId: string;
    ticker: string;
    orderId: string;
  };
}

export class CancelOrderResponse extends jspb.Message {
  getStatus(): OrderStatus;
  setStatus(value: OrderStatus): CancelOrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CancelOrderResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CancelOrderResponse,
  ): CancelOrderResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: CancelOrderResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CancelOrderResponse;
  static deserializeBinaryFromReader(
    message: CancelOrderResponse,
    reader: jspb.BinaryReader,
  ): CancelOrderResponse;
}

export namespace CancelOrderResponse {
  export type AsObject = {
    status: OrderStatus;
  };
}

export class GetOrderRequest extends jspb.Message {
  getOrderbookId(): string;
  setOrderbookId(value: string): GetOrderRequest;
  getOrderId(): string;
  setOrderId(value: string): GetOrderRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOrderRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetOrderRequest,
  ): GetOrderRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetOrderRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetOrderRequest;
  static deserializeBinaryFromReader(
    message: GetOrderRequest,
    reader: jspb.BinaryReader,
  ): GetOrderRequest;
}

export namespace GetOrderRequest {
  export type AsObject = {
    orderbookId: string;
    orderId: string;
  };
}

export class GetOrderResponse extends jspb.Message {
  hasOrder(): boolean;
  clearOrder(): void;
  getOrder(): Order | undefined;
  setOrder(value?: Order): GetOrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetOrderResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetOrderResponse,
  ): GetOrderResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetOrderResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetOrderResponse;
  static deserializeBinaryFromReader(
    message: GetOrderResponse,
    reader: jspb.BinaryReader,
  ): GetOrderResponse;
}

export namespace GetOrderResponse {
  export type AsObject = {
    order?: Order.AsObject;
  };
}

export class GetStatsRequest extends jspb.Message {
  getOrderbookId(): string;
  setOrderbookId(value: string): GetStatsRequest;
  getTicker(): string;
  setTicker(value: string): GetStatsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStatsRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetStatsRequest,
  ): GetStatsRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetStatsRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetStatsRequest;
  static deserializeBinaryFromReader(
    message: GetStatsRequest,
    reader: jspb.BinaryReader,
  ): GetStatsRequest;
}

export namespace GetStatsRequest {
  export type AsObject = {
    orderbookId: string;
    ticker: string;
  };
}

export class GetStatsResponse extends jspb.Message {
  getMaxBid(): string;
  setMaxBid(value: string): GetStatsResponse;
  getMaxAsk(): string;
  setMaxAsk(value: string): GetStatsResponse;
  getSpread(): string;
  setSpread(value: string): GetStatsResponse;
  getTradedVolume(): string;
  setTradedVolume(value: string): GetStatsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetStatsResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetStatsResponse,
  ): GetStatsResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetStatsResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetStatsResponse;
  static deserializeBinaryFromReader(
    message: GetStatsResponse,
    reader: jspb.BinaryReader,
  ): GetStatsResponse;
}

export namespace GetStatsResponse {
  export type AsObject = {
    maxBid: string;
    maxAsk: string;
    spread: string;
    tradedVolume: string;
  };
}

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

export enum OrderSide {
  ASK = 0,
  BID = 1,
}

export enum OrderType {
  LIMIT = 0,
  MARKET = 1,
}

export enum OrderStatus {
  UNFILLED = 0,
  PLACED = 1,
  CANCELLED = 2,
  PARTIALLYFILLED = 3,
  FILLED = 4,
}
