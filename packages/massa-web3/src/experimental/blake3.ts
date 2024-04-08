import { blake3 as hashBlake3 } from '@noble/hashes/blake3'
import Hash from './interfaces/hash'

export default class blake3 implements Hash {
  hash(data: Buffer | Uint8Array | string): Uint8Array {
    return hashBlake3(data)
  }
}
