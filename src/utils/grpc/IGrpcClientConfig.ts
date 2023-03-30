import * as grpc from 'grpc';

export default interface IGrpcClientConfig {
  host: string;
  port: number;
  clientId?: string;
  clientSecret?: string;
  sslCredentials?: grpc.ChannelCredentials;
};;;;;;;;;;
