import { Args } from '../basicElements'

export function parseCallArgs(args?: Uint8Array | Args): Uint8Array {
  const bytesOrArgs = args ?? new Uint8Array()
  return bytesOrArgs instanceof Uint8Array
    ? bytesOrArgs
    : bytesOrArgs.serialize()
}
