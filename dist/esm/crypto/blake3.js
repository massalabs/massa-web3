import { blake3 as hashBlake3 } from '@noble/hashes/blake3';
/**
 * Blake3 implementation of the Hasher interface.
 */
export default class Blake3 {
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    hash(data) {
        return hashBlake3(data);
    }
}
//# sourceMappingURL=blake3.js.map