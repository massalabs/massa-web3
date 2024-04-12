import * as ed from '@noble/ed25519'
import Signer from './interfaces/signer'

/**
 * Ed25519 implementation of the Signer interface.
 */
export default class Ed25519 implements Signer {
  generatePrivateKey(): Uint8Array {
    return ed.utils.randomPrivateKey()
  }

  async getPublicKey(privateKey: Uint8Array): Promise<Uint8Array> {
    return ed.getPublicKey(privateKey)
  }

  async sign(privateKey: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
    return ed.sign(data, privateKey)
  }

  async verify(
    publicKey: Uint8Array,
    data: Uint8Array,
    signature: Uint8Array
  ): Promise<boolean> {
    return ed.verify(signature, data, publicKey)
  }
}
