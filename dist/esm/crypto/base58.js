import bs58check from 'bs58check';
/**
 * Base58 implementation of the Serializer interface.
 */
export default class Base58 {
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    serialize(data) {
        return bs58check.encode(data);
    }
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    deserialize(data) {
        return bs58check.decode(data);
    }
}
//# sourceMappingURL=base58.js.map