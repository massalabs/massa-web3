import { U8, U16, U32, U64, U128, U256 } from '..'
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
    case U128.SIZE_BIT:
      setBigUint128(view, FIRST, value)
      break
    case U256.SIZE_BIT:
      setBigUint256(view, FIRST, value)
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
    case U128.SIZE_BIT:
      return getBigUint128(view, index)
    case U256.SIZE_BIT:
      return getBigUint256(view, index)
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

const SHIFT_128_BITS = 128n
const SHIFT_192_BITS = 192n

function setBigUint128(
  view: DataView,
  byteOffset: number,
  value: bigint
): void {
  view.setBigUint64(byteOffset, value & U64.MAX, true)
  view.setBigUint64(
    byteOffset + U8.SIZE_BIT,
    value >> BigInt(U64.SIZE_BIT),
    true
  )
}

function getBigUint128(view: DataView, byteOffset: number): bigint {
  const low = view.getBigUint64(byteOffset, true)
  byteOffset += U8.SIZE_BIT
  const high = view.getBigUint64(byteOffset, true)
  return (high << BigInt(U64.SIZE_BIT)) | low
}

function setBigUint256(
  view: DataView,
  byteOffset: number,
  value: bigint
): void {
  view.setBigUint64(byteOffset, value & U64.MAX, true)
  byteOffset += U64.SIZE_BYTE
  value = value >> BigInt(U64.SIZE_BIT)
  view.setBigUint64(byteOffset, value & U64.MAX, true)
  byteOffset += U64.SIZE_BYTE
  value = value >> BigInt(U64.SIZE_BIT)
  view.setBigUint64(byteOffset, value & U64.MAX, true)
  byteOffset += U64.SIZE_BYTE
  value = value >> BigInt(U64.SIZE_BIT)
  view.setBigUint64(byteOffset, value, true)
}

function getBigUint256(view: DataView, byteOffset: number): bigint {
  const part1 = view.getBigUint64(byteOffset, true)
  byteOffset += U64.SIZE_BYTE
  const part2 = view.getBigUint64(byteOffset, true)
  byteOffset += U64.SIZE_BYTE
  const part3 = view.getBigUint64(byteOffset, true)
  byteOffset += U64.SIZE_BYTE
  const part4 = view.getBigUint64(byteOffset, true)
  return (
    (part4 << SHIFT_192_BITS) |
    (part3 << SHIFT_128_BITS) |
    (part2 << BigInt(U64.SIZE_BIT)) |
    part1
  )
}
