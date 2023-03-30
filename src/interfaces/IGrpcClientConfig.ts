import * as grpc from 'grpc';

export interface IGrpcClientConfig {
  host: string;
  port: number;
  clientId?: string;
  clientSecret?: string;
  sslCredentials?: grpc.ChannelCredentials;
}
