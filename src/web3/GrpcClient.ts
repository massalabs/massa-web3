import * as grpc from '@grpc/grpc-js';
import { MassaServiceClient } from '../protos/api_grpc_pb';
import GrpcClient from '../utils/grpc/GrpcClient';
import GrpcClientPromisifier from '../utils/grpc/GrpcClientPromisifier';
import { IGrpcClientConfig } from '../interfaces/IGrpcClientConfig';
import { IProvider, ProviderType } from '../interfaces/IProvider';

// grpcConn: IGrpcClientConfig

export class MassaGrpcClient extends GrpcClient {
  constructor(clientConfig: IGrpcClientConfig) {
    super();
    this.clientConfig = clientConfig;
    const grpcProvider: IProvider = this.clientConfig.providers.find(
      (provider) => provider.type === ProviderType.GRPC,
    );
    if (!grpcProvider) {
      throw new Error('No grpc provider provided');
    }
    this.client = new MassaServiceClient(
      grpcProvider.url,
      grpc.credentials.createInsecure(),
    );
    this.promisifier = new GrpcClientPromisifier(this.client);
    this.createOrderbook = this.createOrderbook.bind(this);
  }

  private clientConfig: IGrpcClientConfig;
  private client: MassaServiceClient;
  private promisifier: GrpcClientPromisifier;

  public async createOrderbook(): Promise<GetVersionResponse.AsObject | void> {
    const request = new GetVersionRequest();
    return await this.promisifier.promisifyCallWithMetadata<GetVersionRequest.AsObject | void>(
      this.client.createOrderbook,
      this.metadata,
      request,
    );
  }
}
