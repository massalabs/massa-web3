/* eslint-disable no-case-declarations */

import {
  Args,
  NativeType,
  ArrayTypes,
  DeserializedResult,
  Serializable,
  BYTES_8_OFFSET,
  BYTES_32_OFFSET,
  BYTES_64_OFFSET,
  BYTES_128_OFFSET,
  BYTES_256_OFFSET,
  DEFAULT_OFFSET,
} from '../args'
import { bytesToStr } from './strings'
import { byteToBool } from './bool'
import {
  byteToU8,
  bytesToF32,
  bytesToF64,
  bytesToI32,
  bytesToI64,
  bytesToU32,
  bytesToU64,
} from './numbers'
import { bytesToI128, bytesToU128, bytesToU256 } from './bignum'

const ZERO_LEN = 0
/**
 * Get the byte size of a typed array unit.
 *
 * @param typedArrayTypes - The typed array unit to get the size of.
 *
 * @returns The size of the typed array unit.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function getDatatypeSize(type: ArrayTypes): number {
  switch (type) {
    case ArrayTypes.BOOL:
    case ArrayTypes.U8:
      return BYTES_8_OFFSET
    case ArrayTypes.F32:
    case ArrayTypes.I32:
    case ArrayTypes.U32:
      return BYTES_32_OFFSET
    case ArrayTypes.F64:
    case ArrayTypes.I64:
    case ArrayTypes.U64:
      return BYTES_64_OFFSET
    case ArrayTypes.I128:
    case ArrayTypes.U128:
      return BYTES_128_OFFSET
    case ArrayTypes.U256:
      return BYTES_256_OFFSET
    default:
      throw new Error(`Unsupported type: ${Object.keys(ArrayTypes)[type]}`)
  }
}

/**
 * Serializes an array of serializable objects to bytes.
 *
 * @param source - The array of serializable objects to serialize.
 *
 * @returns The serialized array as Uint8Array.
 */

export function serializableObjectsArrayToBytes<T extends Serializable<T>>(
  source: T[]
): Uint8Array {
  return source.reduce(
    (acc, curr) => Args.concatArrays(acc, curr.serialize()),
    //eslint-disable-next-line @typescript-eslint/no-magic-numbers
    new Uint8Array(ZERO_LEN)
  )
}

/**
 * Deserializes a bytes array into an array of deserialized objects.
 *
 * @param data - The bytes array to deserialize.
 * @param offset - The offset to start deserializing from.
 * @param obj - The class used for deserialization.
 *
 * @returns The deserialized array of objects.
 */
export function deserializeObj<T extends Serializable<T>>(
  data: Uint8Array,
  offset: number,
  obj: new () => T
): DeserializedResult<T> {
  return new obj().deserialize(data, offset)
}

/**
 * Converts a Uint8Array into an array of deserialized type parameters.
 *
 * @param source - The Uint8Array to convert.
 * @param obj - The class constructor for deserialization.
 *
 * @returns An array of deserialized objects.
 */
export function bytesToSerializableObjectArray<T extends Serializable<T>>(
  source: Uint8Array,
  obj: new () => T
): T[] {
  const array: T[] = []
  let offset = DEFAULT_OFFSET

  while (offset < source.length) {
    const deserializationResult = deserializeObj(source, offset, obj)
    offset = deserializationResult.offset
    array.push(deserializationResult.instance)
  }

  return array
}

/**
 * Convert an array of native types to a Uint8Array.
 *
 * @remarks
 * This function performs a deep copy for native types only.
 * It is inspired by https://github.com/AssemblyScript/assemblyscript/blob/main/std/assembly/array.ts#L69-L81
 *
 * @param source - The array to convert.
 * @param type - The typed array unit type.
 *
 * @returns The converted Uint8Array.
 */
export function arrayToBytes(
  source: NativeType[],
  type: ArrayTypes
): Uint8Array {
  const args = new Args()
  source.forEach((value) => {
    switch (type) {
      case ArrayTypes.STRING:
        args.addString(value as string)
        break
      case ArrayTypes.BOOL:
        args.addBool(value as boolean)
        break
      case ArrayTypes.U8:
        args.addU8(value as number)
        break
      case ArrayTypes.F64:
        args.addF64(value as number)
        break
      case ArrayTypes.F32:
        args.addF32(value as number)
        break
      case ArrayTypes.I32:
        args.addI32(value as number)
        break
      case ArrayTypes.I64:
        args.addI64(value as bigint)
        break
      case ArrayTypes.U32:
        args.addU32(value as number)
        break
      case ArrayTypes.U64:
        args.addU64(value as bigint)
        break
      case ArrayTypes.I128:
        args.addI128(value as bigint)
        break
      case ArrayTypes.U128:
        args.addU128(value as bigint)
        break
      case ArrayTypes.U256:
        args.addU256(value as bigint)
        break
      default:
        throw new Error(`Unsupported type: ${type}`)
    }
  })
  return new Uint8Array(args.serialize())
}

/**
 * Converts a Uint8Array into an array of native types.
 *
 * @remarks
 * This function is inspired by https://github.com/AssemblyScript/assemblyscript/blob/main/std/assembly/array.ts#L69-L81
 *
 * @param source - The Uint8Array to convert.
 * @param type - The typed array unit type.
 *
 * @returns An array of converted native types.
 */
export function bytesToArray<T>(source: Uint8Array, type: ArrayTypes): T[] {
  const sourceLength = source.length

  let byteOffset = DEFAULT_OFFSET
  const result: T[] = []
  let elementSize: number

  if (type !== ArrayTypes.STRING) {
    elementSize = getDatatypeSize(type)
  }

  while (byteOffset < sourceLength) {
    if (type === ArrayTypes.STRING) {
      elementSize = bytesToU32(source, byteOffset)
      byteOffset += BYTES_32_OFFSET
    }
    const elt = source.slice(byteOffset, byteOffset + elementSize)
    byteOffset += elementSize

    switch (type) {
      case ArrayTypes.STRING:
        result.push(bytesToStr(elt) as T)
        break
      case ArrayTypes.BOOL:
        result.push(byteToBool(elt) as T)
        break
      case ArrayTypes.U8:
        result.push(byteToU8(elt) as T)
        break
      case ArrayTypes.F32:
        result.push(bytesToF32(elt) as T)
        break
      case ArrayTypes.F64:
        result.push(bytesToF64(elt) as T)
        break
      case ArrayTypes.I32:
        result.push(bytesToI32(elt) as T)
        break
      case ArrayTypes.I64:
        result.push(bytesToI64(elt) as T)
        break
      case ArrayTypes.U32:
        result.push(bytesToU32(elt) as T)
        break
      case ArrayTypes.U64:
        result.push(bytesToU64(elt) as T)
        break
      case ArrayTypes.I128:
        result.push(bytesToI128(elt) as T)
        break
      case ArrayTypes.U128:
        result.push(bytesToU128(elt) as T)
        break
      case ArrayTypes.U256:
        result.push(bytesToU256(elt) as T)
        break
    }
  }
  return result
}
