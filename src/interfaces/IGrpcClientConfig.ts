import * as grpc from 'grpc';

export interface IGrpcClientConfig {
  host?: string;
  port: number;
  clientSecret?: string;
  sslCredentials?: grpc.ChannelCredentials;
}
