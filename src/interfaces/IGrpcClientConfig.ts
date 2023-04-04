import * as grpc from 'grpc';
import { IClientConfig } from './IClientConfig';

export interface IGrpcClientConfig extends IClientConfig {
  clientSecret?: string;
  sslCredentials?: grpc.ChannelCredentials;
}
