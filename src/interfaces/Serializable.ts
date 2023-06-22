/**
 * Interface for serializable objects
 *
 * @see serialize - serialize object to Uint8Array
 * @see deserialize - deserialize Uint8Array to object
 */
export interface Serializable<T> {
  serialize(): Uint8Array;
  deserialize(data: Uint8Array, offset: number): DeserializedResult<T>;
}

/**
 * Interface for deserialized result
 *
 * @see instance - deserialized instance
 * @see offset - offset of the deserialized instance
 */
export interface DeserializedResult<T> {
  instance: T;
  offset: number;
}
