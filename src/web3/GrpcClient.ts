import * as grpc from '@grpc/grpc-js';
import {
  CreateOrderbookRequest,
  CreateOrderbookResponse,
  DeleteOderbookRequest,
  DeleteOrderbookResponse,
} from '../protos/massaservice_pb';
import { MassaClient } from '../protos/massaservice_grpc_pb';
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
    this.client = new MassaClient(
      grpcProvider.url,
      grpc.credentials.createInsecure(),
    );
    this.promisifier = new GrpcClientPromisifier(this.client);
    this.createOrderbook = this.createOrderbook.bind(this);
    this.deleteOrderbook = this.deleteOrderbook.bind(this);
  }

  private clientConfig: IGrpcClientConfig;
  private client: MassaClient;
  private promisifier: GrpcClientPromisifier;

  public async createOrderbook(): Promise<CreateOrderbookResponse.AsObject | void> {
    const request = new CreateOrderbookRequest();
    return await this.promisifier.promisifyCallWithMetadata<CreateOrderbookResponse.AsObject | void>(
      this.client.createOrderbook,
      this.metadata,
      request,
    );
  }

  public async deleteOrderbook(): Promise<DeleteOrderbookResponse.AsObject | void> {
    const request = new DeleteOderbookRequest();
    return await this.promisifier.promisifyCallWithMetadata<DeleteOrderbookResponse.AsObject | void>(
      this.client.deleteOrderbook,
      this.metadata,
      request,
    );
  }
}
