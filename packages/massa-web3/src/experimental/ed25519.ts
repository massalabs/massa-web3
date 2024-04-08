import * as ed from '@noble/ed25519'
import Crypto from './interfaces/crypto'

export default class ed25519 implements Crypto {
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
