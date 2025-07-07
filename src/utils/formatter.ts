import { Args, strToBytes } from '../basicElements'

export function parseCallArgs(args?: Uint8Array | Args): Uint8Array {
  const bytesOrArgs = args ?? new Uint8Array()
  return bytesOrArgs instanceof Uint8Array
    ? bytesOrArgs
    : bytesOrArgs.serialize()
}

export function formatDatastoreKey(key: Uint8Array | string): Uint8Array {
  if (typeof key === 'string') {
    return strToBytes(key)
  }
  return key
}
