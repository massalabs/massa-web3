"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const bs58check_1 = tslib_1.__importDefault(require("bs58check"));
/**
 * Base58 implementation of the Serializer interface.
 */
class Base58 {
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    serialize(data) {
        return bs58check_1.default.encode(data);
    }
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    deserialize(data) {
        return bs58check_1.default.decode(data);
    }
}
exports.default = Base58;
//# sourceMappingURL=base58.js.map