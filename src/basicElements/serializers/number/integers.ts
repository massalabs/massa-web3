import { U8, U16, U32, U64, U128, U256 } from '..'
import { FIRST, ONE, ZERO } from '../../../utils'

function mustBeValidSigned(sizeInBits: number, value: bigint): void {
  const min = -(BigInt(ONE) << (BigInt(sizeInBits) - BigInt(ONE)))
  const max = (BigInt(ONE) << (BigInt(sizeInBits) - BigInt(ONE))) - BigInt(ONE)
  if (value < min || value > max) {
    throw new Error(`value ${value} is out of range for an I${sizeInBits}.`)
  }
}

function mustBeValidUnsigned(sizeInBits: number, value: bigint): void {
  if (value < BigInt(ZERO)) {
    throw new Error("negative value can't be serialized as unsigned integer.")
  }
  if (value >= BigInt(ONE) << BigInt(sizeInBits)) {
    throw new Error(`value ${value} is too large for an U${sizeInBits}.`)
  }
}

export function integerToByte(
  sizeInBits: number,
  value: bigint,
  signed = false
): Uint8Array {
  signed
    ? mustBeValidSigned(sizeInBits, value)
    : mustBeValidUnsigned(sizeInBits, value)

  const buffer = new ArrayBuffer(sizeInBits / U8.SIZE_BIT)
  const view = new DataView(buffer)
  switch (sizeInBits) {
    case U8.SIZE_BIT:
      signed
        ? view.setInt8(FIRST, Number(value))
        : view.setUint8(FIRST, Number(value))
      break
    case U16.SIZE_BIT:
      signed
        ? view.setInt16(FIRST, Number(value), true)
        : view.setUint16(FIRST, Number(value), true)
      break
    case U32.SIZE_BIT:
      signed
        ? view.setInt32(FIRST, Number(value), true)
        : view.setUint32(FIRST, Number(value), true)
      break
    case U64.SIZE_BIT:
      signed
        ? view.setBigInt64(FIRST, value, true)
        : view.setBigUint64(FIRST, value, true)
      break
    case U128.SIZE_BIT:
      setBigUint128(view, value)
      break
    case U256.SIZE_BIT:
      setBigUint256(view, value)
      break
    default:
      throw new Error(
        `unsupported ${signed ? 'I' : 'U'}${sizeInBits} serialization.`
      )
  }
  return new Uint8Array(view.buffer)
}

export function integerFromByte(
  sizeInBits: number,
  bytes: Uint8Array,
  signed = false,
  index = FIRST
): bigint {
  if (bytes.length < index + sizeInBits / U8.SIZE_BIT) {
    throw new Error('not enough bytes to read the value.')
  }
  const view = new DataView(bytes.buffer)
  switch (sizeInBits) {
    case U8.SIZE_BIT:
      return signed ? BigInt(view.getInt8(index)) : BigInt(view.getUint8(index))
    case U16.SIZE_BIT:
      return signed
        ? BigInt(view.getInt16(index, true))
        : BigInt(view.getUint16(index, true))
    case U32.SIZE_BIT:
      return signed
        ? BigInt(view.getInt32(index, true))
        : BigInt(view.getUint32(index, true))
    case U64.SIZE_BIT:
      return signed
        ? view.getBigInt64(index, true)
        : view.getBigUint64(index, true)
    case U128.SIZE_BIT:
      return signed ? getBigInt128(view, index) : getBigUint128(view, index)
    case U256.SIZE_BIT:
      return signed ? getBigInt256(view, index) : getBigUint256(view, index)
    default:
      throw new Error(
        `unsupported ${signed ? 'I' : 'U'}${sizeInBits} deserialization`
      )
  }
}

export function numberToInteger(
  sizeInBits: number,
  value: number | bigint,
  signed = false
): bigint {
  if (typeof value === 'number' && !Number.isSafeInteger(value)) {
    throw new Error(`value ${value} is not a safe integer.`)
  }
  const int = BigInt(value)
  signed
    ? mustBeValidSigned(sizeInBits, int)
    : mustBeValidUnsigned(sizeInBits, int)
  return int
}

function setBigUint128(view: DataView, value: bigint): void {
  const offset = ZERO
  view.setBigUint64(offset, value & U64.MAX, true)
  view.setBigUint64(offset + U64.SIZE_BYTE, value >> BigInt(U64.SIZE_BIT), true)
}

function getBigUint128(view: DataView, offset: number): bigint {
  const low = view.getBigUint64(offset, true)
  offset += U64.SIZE_BYTE
  const high = view.getBigUint64(offset, true)
  return (high << BigInt(U64.SIZE_BIT)) | low
}

function setBigUint256(view: DataView, value: bigint): void {
  let offset = ZERO
  for (let i = ZERO; i < U256.SIZE_BYTE / U64.SIZE_BYTE; i++) {
    view.setBigUint64(offset, value & U64.MAX, true)
    offset += U64.SIZE_BYTE
    value >>= BigInt(U64.SIZE_BIT)
  }
}

function getBigUint256(view: DataView, offset: number): bigint {
  let result = BigInt(ZERO)
  const nbParts = U256.SIZE_BYTE / U64.SIZE_BYTE

  for (let i = ZERO; i < nbParts; i++) {
    const part = view.getBigUint64(offset + i * U64.SIZE_BYTE, true)
    result = result | (part << BigInt(i * U64.SIZE_BIT))
  }

  return result
}

function getBigInt128(view: DataView, offset: number): bigint {
  return BigInt.asIntN(U128.SIZE_BIT, getBigUint128(view, offset))
}

function getBigInt256(view: DataView, offset: number): bigint {
  return BigInt.asIntN(U256.SIZE_BIT, getBigUint256(view, offset))
}
