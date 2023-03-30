import { UntypedServiceImplementation } from '@grpc/grpc-js';
import * as grpc from 'grpc';
import { IHealthServer } from '../protos/healthcheck_grpc_pb';

export interface IGrpcServer {
  startServer(): Promise<void>;
  stopServer(): Promise<void>;
  isGrpcServerRunning(): boolean;
  addService<T>(
    serviceDefinition: grpc.ServiceDefinition<T>,
    implementation: UntypedServiceImplementation,
  ): void;
  useHealthCheckHandler(healthCheckImplementation: IHealthServer): void;
}
