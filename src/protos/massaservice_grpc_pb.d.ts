// package: massa
// file: protos/massaservice.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as protos_massaservice_pb from "../protos/massaservice_pb";

interface IMassaService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createOrderbook: IMassaService_IcreateOrderbook;
    deleteOrderbook: IMassaService_IdeleteOrderbook;
    addOrder: IMassaService_IaddOrder;
    cancelOrder: IMassaService_IcancelOrder;
    getOrder: IMassaService_IgetOrder;
    getStats: IMassaService_IgetStats;
}

interface IMassaService_IcreateOrderbook extends grpc.MethodDefinition<protos_massaservice_pb.CreateOrderbookRequest, protos_massaservice_pb.CreateOrderbookResponse> {
    path: "/massa.Massa/createOrderbook";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protos_massaservice_pb.CreateOrderbookRequest>;
    requestDeserialize: grpc.deserialize<protos_massaservice_pb.CreateOrderbookRequest>;
    responseSerialize: grpc.serialize<protos_massaservice_pb.CreateOrderbookResponse>;
    responseDeserialize: grpc.deserialize<protos_massaservice_pb.CreateOrderbookResponse>;
}
interface IMassaService_IdeleteOrderbook extends grpc.MethodDefinition<protos_massaservice_pb.DeleteOderbookRequest, protos_massaservice_pb.DeleteOrderbookResponse> {
    path: "/massa.Massa/deleteOrderbook";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protos_massaservice_pb.DeleteOderbookRequest>;
    requestDeserialize: grpc.deserialize<protos_massaservice_pb.DeleteOderbookRequest>;
    responseSerialize: grpc.serialize<protos_massaservice_pb.DeleteOrderbookResponse>;
    responseDeserialize: grpc.deserialize<protos_massaservice_pb.DeleteOrderbookResponse>;
}
interface IMassaService_IaddOrder extends grpc.MethodDefinition<protos_massaservice_pb.AddOrderRequest, protos_massaservice_pb.AddOrderResponse> {
    path: "/massa.Massa/addOrder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protos_massaservice_pb.AddOrderRequest>;
    requestDeserialize: grpc.deserialize<protos_massaservice_pb.AddOrderRequest>;
    responseSerialize: grpc.serialize<protos_massaservice_pb.AddOrderResponse>;
    responseDeserialize: grpc.deserialize<protos_massaservice_pb.AddOrderResponse>;
}
interface IMassaService_IcancelOrder extends grpc.MethodDefinition<protos_massaservice_pb.CancelOrderRequest, protos_massaservice_pb.CancelOrderResponse> {
    path: "/massa.Massa/cancelOrder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protos_massaservice_pb.CancelOrderRequest>;
    requestDeserialize: grpc.deserialize<protos_massaservice_pb.CancelOrderRequest>;
    responseSerialize: grpc.serialize<protos_massaservice_pb.CancelOrderResponse>;
    responseDeserialize: grpc.deserialize<protos_massaservice_pb.CancelOrderResponse>;
}
interface IMassaService_IgetOrder extends grpc.MethodDefinition<protos_massaservice_pb.GetOrderRequest, protos_massaservice_pb.GetOrderResponse> {
    path: "/massa.Massa/getOrder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protos_massaservice_pb.GetOrderRequest>;
    requestDeserialize: grpc.deserialize<protos_massaservice_pb.GetOrderRequest>;
    responseSerialize: grpc.serialize<protos_massaservice_pb.GetOrderResponse>;
    responseDeserialize: grpc.deserialize<protos_massaservice_pb.GetOrderResponse>;
}
interface IMassaService_IgetStats extends grpc.MethodDefinition<protos_massaservice_pb.GetStatsRequest, protos_massaservice_pb.GetStatsResponse> {
    path: "/massa.Massa/getStats";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<protos_massaservice_pb.GetStatsRequest>;
    requestDeserialize: grpc.deserialize<protos_massaservice_pb.GetStatsRequest>;
    responseSerialize: grpc.serialize<protos_massaservice_pb.GetStatsResponse>;
    responseDeserialize: grpc.deserialize<protos_massaservice_pb.GetStatsResponse>;
}

export const MassaService: IMassaService;

export interface IMassaServer extends grpc.UntypedServiceImplementation {
    createOrderbook: grpc.handleUnaryCall<protos_massaservice_pb.CreateOrderbookRequest, protos_massaservice_pb.CreateOrderbookResponse>;
    deleteOrderbook: grpc.handleUnaryCall<protos_massaservice_pb.DeleteOderbookRequest, protos_massaservice_pb.DeleteOrderbookResponse>;
    addOrder: grpc.handleUnaryCall<protos_massaservice_pb.AddOrderRequest, protos_massaservice_pb.AddOrderResponse>;
    cancelOrder: grpc.handleUnaryCall<protos_massaservice_pb.CancelOrderRequest, protos_massaservice_pb.CancelOrderResponse>;
    getOrder: grpc.handleUnaryCall<protos_massaservice_pb.GetOrderRequest, protos_massaservice_pb.GetOrderResponse>;
    getStats: grpc.handleUnaryCall<protos_massaservice_pb.GetStatsRequest, protos_massaservice_pb.GetStatsResponse>;
}

export interface IMassaClient {
    createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
    deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
    deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
    addOrder(request: protos_massaservice_pb.AddOrderRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.AddOrderResponse) => void): grpc.ClientUnaryCall;
    addOrder(request: protos_massaservice_pb.AddOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.AddOrderResponse) => void): grpc.ClientUnaryCall;
    addOrder(request: protos_massaservice_pb.AddOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.AddOrderResponse) => void): grpc.ClientUnaryCall;
    cancelOrder(request: protos_massaservice_pb.CancelOrderRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    cancelOrder(request: protos_massaservice_pb.CancelOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    cancelOrder(request: protos_massaservice_pb.CancelOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    getOrder(request: protos_massaservice_pb.GetOrderRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetOrderResponse) => void): grpc.ClientUnaryCall;
    getOrder(request: protos_massaservice_pb.GetOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetOrderResponse) => void): grpc.ClientUnaryCall;
    getOrder(request: protos_massaservice_pb.GetOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetOrderResponse) => void): grpc.ClientUnaryCall;
    getStats(request: protos_massaservice_pb.GetStatsRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetStatsResponse) => void): grpc.ClientUnaryCall;
    getStats(request: protos_massaservice_pb.GetStatsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetStatsResponse) => void): grpc.ClientUnaryCall;
    getStats(request: protos_massaservice_pb.GetStatsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetStatsResponse) => void): grpc.ClientUnaryCall;
}

export class MassaClient extends grpc.Client implements IMassaClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    public createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    public createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    public deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
    public deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
    public deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
    public addOrder(request: protos_massaservice_pb.AddOrderRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.AddOrderResponse) => void): grpc.ClientUnaryCall;
    public addOrder(request: protos_massaservice_pb.AddOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.AddOrderResponse) => void): grpc.ClientUnaryCall;
    public addOrder(request: protos_massaservice_pb.AddOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.AddOrderResponse) => void): grpc.ClientUnaryCall;
    public cancelOrder(request: protos_massaservice_pb.CancelOrderRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    public cancelOrder(request: protos_massaservice_pb.CancelOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    public cancelOrder(request: protos_massaservice_pb.CancelOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CancelOrderResponse) => void): grpc.ClientUnaryCall;
    public getOrder(request: protos_massaservice_pb.GetOrderRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetOrderResponse) => void): grpc.ClientUnaryCall;
    public getOrder(request: protos_massaservice_pb.GetOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetOrderResponse) => void): grpc.ClientUnaryCall;
    public getOrder(request: protos_massaservice_pb.GetOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetOrderResponse) => void): grpc.ClientUnaryCall;
    public getStats(request: protos_massaservice_pb.GetStatsRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetStatsResponse) => void): grpc.ClientUnaryCall;
    public getStats(request: protos_massaservice_pb.GetStatsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetStatsResponse) => void): grpc.ClientUnaryCall;
    public getStats(request: protos_massaservice_pb.GetStatsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.GetStatsResponse) => void): grpc.ClientUnaryCall;
}
