// package: massa
// file: protos/massaservice.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as protos_massaservice_pb from "../protos/massaservice_pb";

interface IMassaService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createOrderbook: IMassaService_IcreateOrderbook;
    deleteOrderbook: IMassaService_IdeleteOrderbook;
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

export const MassaService: IMassaService;

export interface IMassaServer extends grpc.UntypedServiceImplementation {
    createOrderbook: grpc.handleUnaryCall<protos_massaservice_pb.CreateOrderbookRequest, protos_massaservice_pb.CreateOrderbookResponse>;
    deleteOrderbook: grpc.handleUnaryCall<protos_massaservice_pb.DeleteOderbookRequest, protos_massaservice_pb.DeleteOrderbookResponse>;
}

export interface IMassaClient {
    createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
    deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
    deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
}

export class MassaClient extends grpc.Client implements IMassaClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    public createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    public createOrderbook(request: protos_massaservice_pb.CreateOrderbookRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.CreateOrderbookResponse) => void): grpc.ClientUnaryCall;
    public deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
    public deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
    public deleteOrderbook(request: protos_massaservice_pb.DeleteOderbookRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: protos_massaservice_pb.DeleteOrderbookResponse) => void): grpc.ClientUnaryCall;
}
