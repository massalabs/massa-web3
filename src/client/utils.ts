import { strToBytes } from '../basicElements'

export function formatDatastoreKey(key: Uint8Array | string): Uint8Array {
  if (typeof key === 'string') {
    return strToBytes(key)
  }
  return key
}
