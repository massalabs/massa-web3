/// <reference types="node" />
import Hasher from './interfaces/hasher';
/**
 * Blake3 implementation of the Hasher interface.
 */
export default class Blake3 implements Hasher {
    hash(data: Buffer | Uint8Array | string): Uint8Array;
}
