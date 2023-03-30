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

export default class MyOrderbookClient extends GrpcClient {
  constructor(grpcConn: IGrpcClientConfig) {
    super();
    this.grpcConn = grpcConn;
    this.client = new OrderbookClient(
      this.grpcConn.host.concat(':').concat(this.grpcConn.port.toString()),
      grpc.credentials.createInsecure(),
    );
    this.promisifier = new GrpcClientPromisifier(this.client);
    this.addOrder = this.addOrder.bind(this);
  }

  private grpcConn: IGrpcClientConfig;
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
