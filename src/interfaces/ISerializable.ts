export interface ISerializable<T> {
  serialize(): Uint8Array;
  deserialize(data: Uint8Array, offset: number): IDeserializedResult<T>;
}

export interface IDeserializedResult<T> {
  instance: T;
  offset: number;
}
