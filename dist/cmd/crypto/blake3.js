"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const blake3_1 = require("@noble/hashes/blake3");
/**
 * Blake3 implementation of the Hasher interface.
 */
class Blake3 {
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    hash(data) {
        return (0, blake3_1.blake3)(data);
    }
}
exports.default = Blake3;
//# sourceMappingURL=blake3.js.map