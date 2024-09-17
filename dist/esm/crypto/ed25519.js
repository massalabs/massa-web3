import * as ed from '@noble/ed25519';
/**
 * Ed25519 implementation of the Signer interface.
 */
export default class Ed25519 {
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
//# sourceMappingURL=ed25519.js.map