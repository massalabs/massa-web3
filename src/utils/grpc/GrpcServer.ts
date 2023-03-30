import * as grpc from 'grpc';
import IGrpcServer from './IGrpcServer';
import IGrpcClientConfig from './IGrpcClientConfig';
import { HealthService, IHealthServer } from '../../protos/healthcheck_grpc_pb';

const MAX_MESSAGE_SIZE_BYTES: number = 64 * 1024 * 1024;
const DEFAULT_GRPC_HOST = '0.0.0.0';
const DEFAULT_GRPC_PORT = '50051';

export default class GrpcServer<T> implements IGrpcServer {
  private isServerRunning = false;
  private grpcServer: grpc.Server;

  constructor(
    grpcConn: IGrpcClientConfig,
    serviceDefinition?: grpc.ServiceDefinition<T>,
    credentials?: grpc.ServerCredentials,
  ) {
    this.grpcServer = new grpc.Server({
      'grpc.max_send_message_length': MAX_MESSAGE_SIZE_BYTES,
      'grpc.max_receive_message_length': MAX_MESSAGE_SIZE_BYTES,
    });
    this.grpcServer.bind(
      (grpcConn.host || DEFAULT_GRPC_HOST)
        .concat(':')
        .concat(grpcConn.port.toString() || DEFAULT_GRPC_PORT),
      credentials ? credentials : grpc.ServerCredentials.createInsecure(),
    );

    // You can define the service in the next step before starting the server
    if (serviceDefinition) {
      this.addService(serviceDefinition, (<any>this) as T);
    }

    this.addService = this.addService.bind(this);
    this.useHealthCheckHandler = this.useHealthCheckHandler.bind(this);
    this.startServer = this.startServer.bind(this);
    this.isGrpcServerRunning = this.isGrpcServerRunning.bind(this);
    this.stopServer = this.stopServer.bind(this);
  }

  /**
   * Add a service to GRPC
   * NOTICE: you can add a service before starting the server, not later
   *
   * @param serviceDefinition grpc.ServiceDefinition<T>
   * @param implementation T
   */
  public addService<T>(
    serviceDefinition: grpc.ServiceDefinition<T>,
    implementation: T,
  ): void {
    this.grpcServer.addService(serviceDefinition, implementation);
  }

  /**
   * As a parameter provide your server health-check class implementation
   *
   * @param healthCheckImplementation
   */
  public useHealthCheckHandler(healthCheckImplementation: IHealthServer): void {
    this.addService(HealthService, healthCheckImplementation);
  }

  public async startServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isGrpcServerRunning()) return resolve();
      try {
        this.grpcServer.start();
      } catch (ex) {
        return reject(ex);
      }
      this.isServerRunning = true;
      resolve();
    });
  }

  public isGrpcServerRunning(): boolean {
    return this.isServerRunning;
  }

  public async stopServer(): Promise<void> {
    return new Promise<void>((resolve /* , reject */) => {
      this.grpcServer.tryShutdown(() => {
        this.isServerRunning = false;
        return resolve();
      });
    });
  }
}
