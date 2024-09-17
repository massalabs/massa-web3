import Signer from './interfaces/signer';
/**
 * Ed25519 implementation of the Signer interface.
 */
export default class Ed25519 implements Signer {
    generatePrivateKey(): Uint8Array;
    getPublicKey(privateKey: Uint8Array): Promise<Uint8Array>;
    sign(privateKey: Uint8Array, data: Uint8Array): Promise<Uint8Array>;
    verify(publicKey: Uint8Array, data: Uint8Array, signature: Uint8Array): Promise<boolean>;
}
