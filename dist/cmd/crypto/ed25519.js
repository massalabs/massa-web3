"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ed = tslib_1.__importStar(require("@noble/ed25519"));
/**
 * Ed25519 implementation of the Signer interface.
 */
class Ed25519 {
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    generatePrivateKey() {
        return ed.utils.randomPrivateKey();
    }
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    async getPublicKey(privateKey) {
        return ed.getPublicKey(privateKey);
    }
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    async sign(privateKey, data) {
        return ed.sign(data, privateKey);
    }
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    async verify(publicKey, data, signature) {
        return ed.verify(signature, data, publicKey);
    }
}
exports.default = Ed25519;
//# sourceMappingURL=ed25519.js.map