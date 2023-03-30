import * as grpc from 'grpc';
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

export default class NearIndexerClient extends GrpcClient {
  constructor(grpcConn: IGrpcClientConfig) {
    super();
    this.grpcConn = grpcConn;
    this.client = new OrderbookClient(
      this.grpcConn.host.concat(':').concat(this.grpcConn.port.toString()),
      grpc.credentials.createInsecure(),
    );
    this.promisifier = new GrpcClientPromisifier(this.client);
    this.startIndexing = this.startIndexing.bind(this);
    this.stopIndexing = this.stopIndexing.bind(this);
  }

  private grpcConn: IGrpcClientConfig;
  private client: OrderbookClient;
  private promisifier: GrpcClientPromisifier;

  public async startIndexing(): Promise<StartIndexResponse.AsObject | void> {
    const request = new StartIndexRequest();
    return await this.promisifier.promisifyCallWithMetadata<StartIndexResponse.AsObject | void>(
      this.client.startIndexing,
      this.metadata,
      request,
    );
  }

  public async stopIndexing(): Promise<StopIndexResponse.AsObject | void> {
    const request = new StopIndexRequest();
    return await this.promisifier.promisifyCallWithMetadata<StopIndexResponse.AsObject | void>(
      this.client.stopIndexing,
      this.metadata,
      request,
    );
  }

  public async getLatestProcessedBlock(): Promise<GetLatestProcessedBlockResponse.AsObject | void> {
    const request = new GetLatestProcessedBlockRequest();
    return await this.promisifier.promisifyCallWithMetadata<GetLatestProcessedBlockResponse.AsObject | void>(
      this.client.getLatestProcessedBlock,
      this.metadata,
      request,
    );
  }
}
