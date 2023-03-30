import * as grpc from 'grpc';
import { IHealthServer } from '../protos/healthcheck_grpc_pb';

export default interface IGrpcServer {
  startServer(): Promise<void>;
  stopServer(): Promise<void>;
  isGrpcServerRunning(): boolean;
  addService<T>(
    serviceDefinition: grpc.ServiceDefinition<T>,
    implementation: T,
  ): void;
  useHealthCheckHandler(healthCheckImplementation: IHealthServer): void;
};;;;;;;;;;
