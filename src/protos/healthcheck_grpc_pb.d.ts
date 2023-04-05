// package: massa
// file: protos/healthcheck.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from '@grpc/grpc-js';
import * as protos_healthcheck_pb from '../protos/healthcheck_pb';

interface IHealthService
  extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  check: IHealthService_ICheck;
  watch: IHealthService_IWatch;
}

interface IHealthService_ICheck
  extends grpc.MethodDefinition<
    protos_healthcheck_pb.HealthCheckRequest,
    protos_healthcheck_pb.HealthCheckResponse
  > {
  path: '/massa.Health/Check';
  requestStream: false;
  responseStream: false;
  requestSerialize: grpc.serialize<protos_healthcheck_pb.HealthCheckRequest>;
  requestDeserialize: grpc.deserialize<protos_healthcheck_pb.HealthCheckRequest>;
  responseSerialize: grpc.serialize<protos_healthcheck_pb.HealthCheckResponse>;
  responseDeserialize: grpc.deserialize<protos_healthcheck_pb.HealthCheckResponse>;
}
interface IHealthService_IWatch
  extends grpc.MethodDefinition<
    protos_healthcheck_pb.HealthCheckRequest,
    protos_healthcheck_pb.HealthCheckResponse
  > {
  path: '/massa.Health/Watch';
  requestStream: false;
  responseStream: true;
  requestSerialize: grpc.serialize<protos_healthcheck_pb.HealthCheckRequest>;
  requestDeserialize: grpc.deserialize<protos_healthcheck_pb.HealthCheckRequest>;
  responseSerialize: grpc.serialize<protos_healthcheck_pb.HealthCheckResponse>;
  responseDeserialize: grpc.deserialize<protos_healthcheck_pb.HealthCheckResponse>;
}

export const HealthService: IHealthService;

export interface IHealthServer extends grpc.UntypedServiceImplementation {
  check: grpc.handleUnaryCall<
    protos_healthcheck_pb.HealthCheckRequest,
    protos_healthcheck_pb.HealthCheckResponse
  >;
  watch: grpc.handleServerStreamingCall<
    protos_healthcheck_pb.HealthCheckRequest,
    protos_healthcheck_pb.HealthCheckResponse
  >;
}

export interface IHealthClient {
  check(
    request: protos_healthcheck_pb.HealthCheckRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_healthcheck_pb.HealthCheckResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  check(
    request: protos_healthcheck_pb.HealthCheckRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_healthcheck_pb.HealthCheckResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  check(
    request: protos_healthcheck_pb.HealthCheckRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_healthcheck_pb.HealthCheckResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  watch(
    request: protos_healthcheck_pb.HealthCheckRequest,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientReadableStream<protos_healthcheck_pb.HealthCheckResponse>;
  watch(
    request: protos_healthcheck_pb.HealthCheckRequest,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientReadableStream<protos_healthcheck_pb.HealthCheckResponse>;
}

export class HealthClient extends grpc.Client implements IHealthClient {
  constructor(
    address: string,
    credentials: grpc.ChannelCredentials,
    options?: Partial<grpc.ClientOptions>,
  );
  public check(
    request: protos_healthcheck_pb.HealthCheckRequest,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_healthcheck_pb.HealthCheckResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public check(
    request: protos_healthcheck_pb.HealthCheckRequest,
    metadata: grpc.Metadata,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_healthcheck_pb.HealthCheckResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public check(
    request: protos_healthcheck_pb.HealthCheckRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (
      error: grpc.ServiceError | null,
      response: protos_healthcheck_pb.HealthCheckResponse,
    ) => void,
  ): grpc.ClientUnaryCall;
  public watch(
    request: protos_healthcheck_pb.HealthCheckRequest,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientReadableStream<protos_healthcheck_pb.HealthCheckResponse>;
  public watch(
    request: protos_healthcheck_pb.HealthCheckRequest,
    metadata?: grpc.Metadata,
    options?: Partial<grpc.CallOptions>,
  ): grpc.ClientReadableStream<protos_healthcheck_pb.HealthCheckResponse>;
}
