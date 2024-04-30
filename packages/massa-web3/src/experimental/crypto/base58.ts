import { encode, decode } from 'bs58check'
import Serializer from './interfaces/serializer'

/**
 * Base58 implementation of the Serializer interface.
 */
export default class Base58 implements Serializer {
  // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
  serialize(data: Uint8Array): string {
    return encode(data)
  }

  // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
  deserialize(data: string): Uint8Array {
    return decode(data)
  }
}
