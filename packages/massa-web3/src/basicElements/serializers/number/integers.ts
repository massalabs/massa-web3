import { U16, U32, U64, U8 } from '..'
import { FIRST, ONE, ZERO } from '../../../utils'

function mustBeValidUnsigned(sizeInBits: number, value: bigint): void {
  if (value < BigInt(ZERO)) {
    throw new Error("negative value can't be serialized as unsigned integer.")
  }
  if (value >= BigInt(ONE) << BigInt(sizeInBits)) {
    throw new Error(`value ${value} is too large for an U${sizeInBits}.`)
  }
}

export function unsignedToByte(sizeInBits: number, value: bigint): Uint8Array {
  mustBeValidUnsigned(sizeInBits, value)
  const buffer = new ArrayBuffer(sizeInBits / U8.SIZE_BIT)
  const view = new DataView(buffer)
  switch (sizeInBits) {
    case U8.SIZE_BIT:
      view.setUint8(FIRST, Number(value))
      break
    case U16.SIZE_BIT:
      view.setUint16(FIRST, Number(value), true)
      break
    case U32.SIZE_BIT:
      view.setUint32(FIRST, Number(value), true)
      break
    case U64.SIZE_BIT:
      view.setBigUint64(FIRST, value, true)
      break
    default:
      throw new Error(`unsupported U${sizeInBits} serialization.`)
  }
  return new Uint8Array(view.buffer)
}

export function unsignedFromByte(
  sizeInBits: number,
  bytes: Uint8Array,
  index = FIRST
): bigint {
  if (bytes.length < index + sizeInBits / U8.SIZE_BIT) {
    throw new Error('not enough bytes to read the value.')
  }
  const view = new DataView(bytes.buffer)
  switch (sizeInBits) {
    case U8.SIZE_BIT:
      return BigInt(view.getUint8(index))
    case U16.SIZE_BIT:
      return BigInt(view.getUint16(index, true))
    case U32.SIZE_BIT:
      return BigInt(view.getUint32(index, true))
    case U64.SIZE_BIT:
      return view.getBigUint64(index, true)
    default:
      throw new Error(`unsupported U${sizeInBits} deserialization`)
  }
}

export function numberToUnsigned(
  sizeInBits: number,
  value: number | bigint
): bigint {
  if (typeof value === 'number' && !Number.isSafeInteger(value)) {
    throw new Error(`value ${value} is not a safe integer.`)
  }
  const int = BigInt(value)
  mustBeValidUnsigned(sizeInBits, int)
  return int
}
