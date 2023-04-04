import * as grpc from '@grpc/grpc-js';
import {
  AddOrderRequest,
  AddOrderResponse,
  CancelOrderRequest,
  CancelOrderResponse,
  CreateOrderbookRequest,
  CreateOrderbookResponse,
  DeleteOderbookRequest,
  DeleteOrderbookResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetStatsRequest,
  GetStatsResponse,
  Order,
  OrderSide,
  OrderStatus,
  OrderType,
} from '../protos/orderbookservice_pb';
import { OrderbookClient } from '../protos/orderbookservice_grpc_pb';
import GrpcClient from '../utils/grpc/GrpcClient';
import GrpcClientPromisifier from '../utils/grpc/GrpcClientPromisifier';
import { IGrpcClientConfig } from '../interfaces/IGrpcClientConfig';
import { IProvider, ProviderType } from '../interfaces/IProvider';

// grpcConn: IGrpcClientConfig 

export class MassaGrpcClient extends GrpcClient {
  constructor(clientConfig: IGrpcClientConfig) {
    super();
    this.clientConfig = clientConfig;
    const grpcProvider: IProvider = this.clientConfig.providers.find((provider) => provider.type === ProviderType.GRPC);
    if (!grpcProvider) {
      throw new Error('No grpc provider provided');
    }
    this.client = new OrderbookClient(
      grpcProvider.url,
      grpc.credentials.createInsecure()
    );
    this.promisifier = new GrpcClientPromisifier(this.client);
    this.addOrder = this.addOrder.bind(this);
  }

  private clientConfig: IGrpcClientConfig;
  private client: OrderbookClient;
  private promisifier: GrpcClientPromisifier;

  public async addOrder(): Promise<AddOrderResponse.AsObject | void> {
    const request = new AddOrderRequest();
    return await this.promisifier.promisifyCallWithMetadata<AddOrderResponse.AsObject | void>(
      this.client.addOrder,
      this.metadata,
      request,
    );
  }

}
