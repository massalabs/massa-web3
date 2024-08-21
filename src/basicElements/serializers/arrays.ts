/* eslint-disable no-case-declarations */

import {
  Args,
  NativeType,
  ArrayTypes,
  DeserializedResult,
  Serializable,
  DEFAULT_OFFSET,
} from '../args'
import { bytesToStr } from './strings'
import { byteToBool } from './bool'
import { bytesToF32, bytesToF64 } from './numbers'
import { U8, U16, U32, U64, U128, U256, I8, I16, I32, I64, I128, I256 } from '.'

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
    case ArrayTypes.I8:
      return U8.SIZE_BYTE
    case ArrayTypes.F32:
    case ArrayTypes.I32:
    case ArrayTypes.U32:
      return U32.SIZE_BYTE
    case ArrayTypes.F64:
    case ArrayTypes.I64:
    case ArrayTypes.U64:
      return U64.SIZE_BYTE
    case ArrayTypes.I128:
    case ArrayTypes.U128:
      return U128.SIZE_BYTE
    case ArrayTypes.U256:
      return U256.SIZE_BYTE
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
    new Uint8Array(0)
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
        args.addU8(value as U8.U8)
        break
      case ArrayTypes.U16:
        args.addU16(value as U16.U16)
        break
      case ArrayTypes.U32:
        args.addU32(value as U32.U32)
        break
      case ArrayTypes.U64:
        args.addU64(value as U64.U64)
        break
      case ArrayTypes.U128:
        args.addU128(value as U128.U128)
        break
      case ArrayTypes.U256:
        args.addU256(value as U256.U256)
        break
      case ArrayTypes.I8:
        args.addI8(value as I8.I8)
        break
      case ArrayTypes.I16:
        args.addI16(value as I16.I16)
        break
      case ArrayTypes.I32:
        args.addI32(value as I32.I32)
        break
      case ArrayTypes.I64:
        args.addI64(value as I64.I64)
        break
      case ArrayTypes.I128:
        args.addI128(value as I128.I128)
        break
      case ArrayTypes.I256:
        args.addI256(value as I256.I256)
        break
      case ArrayTypes.F64:
        args.addF64(value as number)
        break
      case ArrayTypes.F32:
        args.addF32(value as number)
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
  let elementSize = 0

  if (type !== ArrayTypes.STRING) {
    elementSize = getDatatypeSize(type)
  }

  while (byteOffset < sourceLength) {
    if (type === ArrayTypes.STRING) {
      const { value, offset } = U32.fromBuffer(source, byteOffset)
      elementSize = Number(value)
      byteOffset = offset
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
        result.push(U8.fromBytes(elt) as T)
        break
      case ArrayTypes.U16:
        result.push(U16.fromBytes(elt) as T)
        break
      case ArrayTypes.U32:
        result.push(U32.fromBytes(elt) as T)
        break
      case ArrayTypes.U64:
        result.push(U64.fromBytes(elt) as T)
        break
      case ArrayTypes.U128:
        result.push(U128.fromBytes(elt) as T)
        break
      case ArrayTypes.U256:
        result.push(U256.fromBytes(elt) as T)
        break
      case ArrayTypes.I8:
        result.push(I8.fromBytes(elt) as T)
        break
      case ArrayTypes.I16:
        result.push(I16.fromBytes(elt) as T)
        break
      case ArrayTypes.I32:
        result.push(I32.fromBytes(elt) as T)
        break
      case ArrayTypes.I64:
        result.push(I64.fromBytes(elt) as T)
        break
      case ArrayTypes.I128:
        result.push(I128.fromBytes(elt) as T)
        break
      case ArrayTypes.I256:
        result.push(I256.fromBytes(elt) as T)
        break
      case ArrayTypes.F32:
        result.push(bytesToF32(elt) as T)
        break
      case ArrayTypes.F64:
        result.push(bytesToF64(elt) as T)
        break
    }
  }
  return result
}
