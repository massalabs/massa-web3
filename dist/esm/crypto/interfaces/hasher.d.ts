/// <reference types="node" />
export default interface Hasher {
    hash(data: Buffer | Uint8Array | string): Uint8Array;
}
