import * as grpc from 'grpc';
import {
  StartIndexRequest,
  StartIndexResponse,
  StopIndexRequest,
  StopIndexResponse,
  GetLatestProcessedBlockRequest,
  GetLatestProcessedBlockResponse,
} from '../../protos/nearindexer_pb';
import { NearIndexerEngineServiceClient } from '../../protos/nearindexer_grpc_pb';
import IGrpcClientConfig from '../utils/grpc/IGrpcClientConfig';
import GrpcClient from '../utils/grpc/GrpcClient';
import GrpcClientPromisifier from '../utils/grpc/GrpcClientPromisifier';

export default class NearIndexerClient extends GrpcClient {
  constructor(grpcConn: IGrpcClientConfig) {
    super();
    this.grpcConn = grpcConn;
    this.client = new NearIndexerEngineServiceClient(
      this.grpcConn.host.concat(':').concat(this.grpcConn.port.toString()),
      grpc.credentials.createInsecure(),
    );
    this.promisifier = new GrpcClientPromisifier(this.client);
    this.startIndexing = this.startIndexing.bind(this);
    this.stopIndexing = this.stopIndexing.bind(this);
  }

  private grpcConn: IGrpcClientConfig;
  private client: NearIndexerEngineServiceClient;
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
