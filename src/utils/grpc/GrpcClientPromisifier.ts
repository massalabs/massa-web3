import IGrpcStream from './IGrpcStream';
import * as grpc from 'grpc';
import { Message } from 'google-protobuf';

export default class GrpcClientPromisifier {
  constructor(private grpcClient: grpc.Client) {}

  public promisifyCall<T>(func: Function, req: any): Promise<T | void> {
    return new Promise<T | void>((resolve, reject) => {
      const bindedFunc = func.bind(this.grpcClient);
      bindedFunc(req, (error: Error, data) => {
        if (error) {
          return reject(error);
        }

        if (!data) {
          return resolve();
        } else if (data.toObject) {
          return resolve(data.toObject());
        } else {
          return resolve(data);
        }
      });
    });
  }

  public promisifyCallWithMetadata<T>(
    func: Function,
    metadata: grpc.Metadata,
    req: any,
  ): Promise<T | void> {
    return new Promise<T | void>((resolve, reject) => {
      const bindedFunc = func.bind(this.grpcClient);
      bindedFunc(req, metadata, (error: Error, data) => {
        if (error) {
          return reject(error);
        }

        if (!data) {
          return resolve();
        } else if (data.toObject) {
          return resolve(data.toObject());
        } else {
          return resolve(data);
        }
      });
    });
  }

  public promisifyStream(func: Function, req: Message): Promise<IGrpcStream> {
    return new Promise<IGrpcStream>((resolve, reject) => {
      try {
        const bindedFunc = func.bind(this.grpcClient);
        const stream = bindedFunc(req);
        return resolve(stream);
      } catch (ex) {
        return reject(ex);
      }
    });
  }
}