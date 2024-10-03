import Serializer from './interfaces/serializer';
/**
 * Base58 implementation of the Serializer interface.
 */
export default class Base58 implements Serializer {
    serialize(data: Uint8Array): string;
    deserialize(data: string): Uint8Array;
}
