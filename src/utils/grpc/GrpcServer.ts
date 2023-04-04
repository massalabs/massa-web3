import * as grpc from '@grpc/grpc-js';
import { IGrpcClientConfig } from '../../interfaces/IGrpcClientConfig';
import { IGrpcServer } from '../../interfaces/IGrpcServer';
import { HealthService, IHealthServer } from '../../protos/healthcheck_grpc_pb';

const MAX_MESSAGE_SIZE_BYTES: number = 64 * 1024 * 1024;
const DEFAULT_GRPC_PORT = '50051';

export default class GrpcServer<T> implements IGrpcServer {
  private isServerRunning = false;
  private grpcServer: grpc.Server;
  private credentials?: grpc.ServerCredentials;
  private grpcConn: IGrpcClientConfig;

  constructor(
    grpcConn: IGrpcClientConfig,
    serviceDefinition: grpc.ServiceDefinition<T>,
    credentials?: grpc.ServerCredentials,
  ) {
    this.grpcServer = new grpc.Server({
      'grpc.max_send_message_length': MAX_MESSAGE_SIZE_BYTES,
      'grpc.max_receive_message_length': MAX_MESSAGE_SIZE_BYTES,
    });
    this.credentials = credentials;
    this.grpcConn = grpcConn;

    this.addService = this.addService.bind(this);
    this.useHealthCheckHandler = this.useHealthCheckHandler.bind(this);
    this.startServer = this.startServer.bind(this);
    this.isGrpcServerRunning = this.isGrpcServerRunning.bind(this);
    this.stopServer = this.stopServer.bind(this);

    // You can define the service in the next step before starting the server
    this.addService(serviceDefinition, <any>this);
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
    implementation: grpc.UntypedServiceImplementation,
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

  /**
   * Starts the grpc server
   *
   */
  public async startServer(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isGrpcServerRunning()) return resolve();
      const that = this;
      try {
        this.grpcServer.bindAsync(
          that.grpcConn.port.toString() || DEFAULT_GRPC_PORT,
          that.credentials ? that.credentials : grpc.ServerCredentials.createInsecure(),
          (err: Error, port: number) => {
            if (err) {
              console.error(`Server failed to bind. ${err}`);
              return reject(err);
            } else {
              console.log(`Server started and listening on port ${port}`);
              that.grpcServer.start();
              that.isServerRunning = true;
              return resolve();
            }
          }
        );
      } catch (ex) {
        return reject(ex);
      }
      return resolve();
    });
  }

  /**
   * Indicates if the grpc server is running or not
   *
   * @returns bool if running, false otherwise
   */
  public isGrpcServerRunning(): boolean {
    return this.isServerRunning;
  }

  /**
   * Indicates if the grpc server is running or not
   *
   * @returns bool if running, false otherwise
   */
  public async stopServer(): Promise<void> {
    return new Promise<void>((resolve ,reject) => {
      this.grpcServer.tryShutdown((error) => {
        if (error) {
          return reject(error);
        }
        this.isServerRunning = false;
        return resolve();
      });
    });
  }
}
