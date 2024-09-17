/**
 * Interface for serializable objects
 *
 * @see serialize - serialize object to Uint8Array
 * @see deserialize - deserialize Uint8Array to object
 */
export interface ISerializable<T> {
    serialize(): Uint8Array;
    deserialize(data: Uint8Array, offset: number): IDeserializedResult<T>;
}
/**
 * Interface for deserialized result
 *
 * @see instance - deserialized instance
 * @see offset - offset of the deserialized instance
 */
export interface IDeserializedResult<T> {
    instance: T;
    offset: number;
}
