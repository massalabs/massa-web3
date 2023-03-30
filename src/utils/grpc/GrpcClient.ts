import * as grpc from 'grpc';

export default abstract class GrpcClient {
  constructor() {
    this.setMetadataKVP = this.setMetadataKVP.bind(this);
    this.getMetadataKVP = this.getMetadataKVP.bind(this);
    this.metadata = new grpc.Metadata();
  }

  protected readonly metadata: grpc.Metadata;

  public setMetadataKVP(key: string, value: string | Buffer) {
    this.metadata.add(key, value);
  }

  public getMetadataKVP(key: string): grpc.MetadataValue[] {
    return this.metadata.get(key);
  }
}
