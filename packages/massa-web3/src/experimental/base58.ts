import { encode, decode } from 'bs58check'
import Serialization from './interfaces/serialization'

export default class base58 implements Serialization {
  encodeToString(data: Uint8Array): string {
    return encode(data)
  }

  decodeFromString(data: string): Uint8Array {
    return decode(data)
  }
}
