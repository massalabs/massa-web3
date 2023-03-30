// package: orderbook
// file: protos/orderbookservice.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from 'grpc';
import * as protos_orderbookservice_pb from '../protos/orderbookservice_pb';

interface IOrderbookService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  createOrderbook: IOrderbookService_IcreateOrderbook;
  deleteOrderbook: IOrderbookService_IdeleteOrderbook;
  addOrder: IOrderbookService_IaddOrder;
  cancelOrder: IOrderbookService_IcancelOrder;
  getOrder: IOrderbookService_IgetOrder;
  getStats: IOrderbookService_IgetStats;
}

interface IOrderbookService_IcreateOrderbook
  extends grpc.MethodDefinition<
    protos_orderbookservice_pb.CreateOrderbookRequest,
    protos_orderbookservice_pb.CreateOrderbookResponse
  > {
  path: '/orderbook.Orderbook/createOrderbook';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<protos_orderbookservice_pb.CreateOrderbookRequest>;
  requestDeserialize: grpc.deserialize<protos_orderbookservice_pb.CreateOrderbookRequest>;
  responseSerialize: grpc.serialize<protos_orderbookservice_pb.CreateOrderbookResponse>;
  responseDeserialize: grpc.deserialize<protos_orderbookservice_pb.CreateOrderbookResponse>;
}
interface IOrderbookService_IdeleteOrderbook
  extends grpc.MethodDefinition<
    protos_orderbookservice_pb.DeleteOderbookRequest,
    protos_orderbookservice_pb.DeleteOrderbookResponse
  > {
  path: '/orderbook.Orderbook/deleteOrderbook';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<protos_orderbookservice_pb.DeleteOderbookRequest>;
  requestDeserialize: grpc.deserialize<protos_orderbookservice_pb.DeleteOderbookRequest>;
  responseSerialize: grpc.serialize<protos_orderbookservice_pb.DeleteOrderbookResponse>;
  responseDeserialize: grpc.deserialize<protos_orderbookservice_pb.DeleteOrderbookResponse>;
}
interface IOrderbookService_IaddOrder
  extends grpc.MethodDefinition<
    protos_orderbookservice_pb.AddOrderRequest,
    protos_orderbookservice_pb.AddOrderResponse
  > {
  path: '/orderbook.Orderbook/addOrder';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<protos_orderbookservice_pb.AddOrderRequest>;
  requestDeserialize: grpc.deserialize<protos_orderbookservice_pb.AddOrderRequest>;
  responseSerialize: grpc.serialize<protos_orderbookservice_pb.AddOrderResponse>;
  responseDeserialize: grpc.deserialize<protos_orderbookservice_pb.AddOrderResponse>;
}
interface IOrderbookService_IcancelOrder
  extends grpc.MethodDefinition<
    protos_orderbookservice_pb.CancelOrderRequest,
    protos_orderbookservice_pb.CancelOrderResponse
  > {
  path: '/orderbook.Orderbook/cancelOrder';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<protos_orderbookservice_pb.CancelOrderRequest>;
  requestDeserialize: grpc.deserialize<protos_orderbookservice_pb.CancelOrderRequest>;
  responseSerialize: grpc.serialize<protos_orderbookservice_pb.CancelOrderResponse>;
  responseDeserialize: grpc.deserialize<protos_orderbookservice_pb.CancelOrderResponse>;
}
interface IOrderbookService_IgetOrder
  extends grpc.MethodDefinition<
    protos_orderbookservice_pb.GetOrderRequest,
    protos_orderbookservice_pb.GetOrderResponse
  > {
  path: '/orderbook.Orderbook/getOrder';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<protos_orderbookservice_pb.GetOrderRequest>;
  requestDeserialize: grpc.deserialize<protos_orderbookservice_pb.GetOrderRequest>;
  responseSerialize: grpc.serialize<protos_orderbookservice_pb.GetOrderResponse>;
  responseDeserialize: grpc.deserialize<protos_orderbookservice_pb.GetOrderResponse>;
}
interface IOrderbookService_IgetStats
  extends grpc.MethodDefinition<
    protos_orderbookservice_pb.GetStatsRequest,
    protos_orderbookservice_pb.GetStatsResponse
  > {
  path: '/orderbook.Orderbook/getStats';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<protos_orderbookservice_pb.GetStatsRequest>;
  requestDeserialize: grpc.deserialize<protos_orderbookservice_pb.GetStatsRequest>;
  responseSerialize: grpc.serialize<protos_orderbookservice_pb.GetStatsResponse>;
  responseDeserialize: grpc.deserialize<protos_orderbookservice_pb.GetStatsResponse>;
}

export const OrderbookService: IOrderbookService;

export interface IOrderbookServer {
  createOrderbook: grpc.handleUnaryCall<
    protos_orderbookservice_pb.CreateOrderbookRequest,
    protos_orderbookservice_pb.CreateOrderbookResponse
  >;
  deleteOrderbook: grpc.handleUnaryCall<
    protos_orderbookservice_pb.DeleteOderbookRequest,
    protos_orderbookservice_pb.DeleteOrderbookResponse
  >;
  addOrder: grpc.handleUnaryCall<
    protos_orderbookservice_pb.AddOrderRequest,
    protos_orderbookservice_pb.AddOrderResponse
  >;
  cancelOrder: grpc.handleUnaryCall<
    protos_orderbookservice_pb.CancelOrderRequest,
    protos_orderbookservice_pb.CancelOrderResponse
  >;
  getOrder: grpc.handleUnaryCall<
    protos_orderbookservice_pb.GetOrderRequest,
    protos_orderbookservice_pb.GetOrderResponse
  >;
  getStats: grpc.handleUnaryCall<
    protos_orderbookservice_pb.GetStatsRequest,
    protos_orderbookservice_pb.GetStatsResponse
  >;
}

export interface IOrderbookClient {
  createOrderbook(
    request: protos_orderbookservice_pb.CreateOrderbookRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CreateOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  createOrderbook(
    request: protos_orderbookservice_pb.CreateOrderbookRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CreateOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  createOrderbook(
    request: protos_orderbookservice_pb.CreateOrderbookRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CreateOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  deleteOrderbook(
    request: protos_orderbookservice_pb.DeleteOderbookRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.DeleteOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  deleteOrderbook(
    request: protos_orderbookservice_pb.DeleteOderbookRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.DeleteOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  deleteOrderbook(
    request: protos_orderbookservice_pb.DeleteOderbookRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.DeleteOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  addOrder(
    request: protos_orderbookservice_pb.AddOrderRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.AddOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  addOrder(
    request: protos_orderbookservice_pb.AddOrderRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.AddOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  addOrder(
    request: protos_orderbookservice_pb.AddOrderRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.AddOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  cancelOrder(
    request: protos_orderbookservice_pb.CancelOrderRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CancelOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  cancelOrder(
    request: protos_orderbookservice_pb.CancelOrderRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CancelOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  cancelOrder(
    request: protos_orderbookservice_pb.CancelOrderRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CancelOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getOrder(
    request: protos_orderbookservice_pb.GetOrderRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getOrder(
    request: protos_orderbookservice_pb.GetOrderRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getOrder(
    request: protos_orderbookservice_pb.GetOrderRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getStats(
    request: protos_orderbookservice_pb.GetStatsRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetStatsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getStats(
    request: protos_orderbookservice_pb.GetStatsRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetStatsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  getStats(
    request: protos_orderbookservice_pb.GetStatsRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetStatsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
}

export class OrderbookClient extends grpc.Client implements IOrderbookClient {
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: object,
  );
  public createOrderbook(
    request: protos_orderbookservice_pb.CreateOrderbookRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CreateOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public createOrderbook(
    request: protos_orderbookservice_pb.CreateOrderbookRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CreateOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public createOrderbook(
    request: protos_orderbookservice_pb.CreateOrderbookRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CreateOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public deleteOrderbook(
    request: protos_orderbookservice_pb.DeleteOderbookRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.DeleteOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public deleteOrderbook(
    request: protos_orderbookservice_pb.DeleteOderbookRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.DeleteOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public deleteOrderbook(
    request: protos_orderbookservice_pb.DeleteOderbookRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.DeleteOrderbookResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public addOrder(
    request: protos_orderbookservice_pb.AddOrderRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.AddOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public addOrder(
    request: protos_orderbookservice_pb.AddOrderRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.AddOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public addOrder(
    request: protos_orderbookservice_pb.AddOrderRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.AddOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public cancelOrder(
    request: protos_orderbookservice_pb.CancelOrderRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CancelOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public cancelOrder(
    request: protos_orderbookservice_pb.CancelOrderRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CancelOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public cancelOrder(
    request: protos_orderbookservice_pb.CancelOrderRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.CancelOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getOrder(
    request: protos_orderbookservice_pb.GetOrderRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getOrder(
    request: protos_orderbookservice_pb.GetOrderRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getOrder(
    request: protos_orderbookservice_pb.GetOrderRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetOrderResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getStats(
    request: protos_orderbookservice_pb.GetStatsRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetStatsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getStats(
    request: protos_orderbookservice_pb.GetStatsRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetStatsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public getStats(
    request: protos_orderbookservice_pb.GetStatsRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_orderbookservice_pb.GetStatsResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
}
