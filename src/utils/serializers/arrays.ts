/* eslint-disable no-case-declarations */

import { Args, NativeType, ArrayType } from '../arguments';
import {
  DeserializedResult,
  Serializable,
} from '../../interfaces/Serializable';
import { bytesToStr } from './strings';
import { byteToBool } from './bool';
import {
  byteToU8,
  bytesToF32,
  bytesToF64,
  bytesToI32,
  bytesToI64,
  bytesToU128,
  bytesToU256,
  bytesToU32,
  bytesToU64,
} from './numbers';

/**
 * Get the byte size of a typed array unit.
 *
 * @param typedArrayType - The typed array unit to get the size of.
 *
 * @returns The size of the typed array unit.
 */
const getDatatypeSize = (type: ArrayType): number => {
  switch (type) {
    case ArrayType.BOOL:
    case ArrayType.U8:
      return 1;
    case ArrayType.F32:
    case ArrayType.I32:
    case ArrayType.U32:
      return 4;
    case ArrayType.F64:
    case ArrayType.I64:
    case ArrayType.U64:
      return 8;
    case ArrayType.U128:
      return 16;
    case ArrayType.U256:
      return 32;
    default:
      throw new Error(`Unsupported type: ${Object.keys(ArrayType)[type]}`);
  }
};

/**
 * Serializes an array of serializable objects to bytes.
 *
 * @param source - The array of serializable objects to serialize.
 *
 * @returns The serialized array as Uint8Array.
 */
export function serializableObjectsArrayToBytes<T extends Serializable<T>>(
  source: T[],
): Uint8Array {
  const nbElements = source.length;
  const pointers = new Array<Uint8Array>(nbElements);
  const sizes = new Array<number>(nbElements);
  let totalLength = 0;

  for (let i = 0; i < nbElements; i++) {
    const bytes: Uint8Array = source[i].serialize();
    pointers[i] = bytes;
    sizes[i] = bytes.length;
    totalLength += bytes.length;
  }

  const target = new Uint8Array(totalLength);

  let offset = 0;
  for (let i = 0; i < nbElements; i++) {
    target.set(pointers[i], offset);
    offset += sizes[i];
  }

  return target;
}

/**
 * Deserializes a bytes array into an array of deserialized objects.
 *
 * @param data - The bytes array to deserialize.
 * @param offset - The offset to start deserializing from.
 * @param Clazz - The class used for deserialization.
 *
 * @returns The deserialized array of objects.
 */
export function deserializeObj<T extends Serializable<T>>(
  data: Uint8Array,
  offset: number,
  Clazz: new () => T,
): DeserializedResult<T> {
  const deserialized = new Clazz().deserialize(data, offset);
  return deserialized;
}

/**
 * Converts a Uint8Array into an array of deserialized type parameters.
 *
 * @param source - The Uint8Array to convert.
 * @param Clazz - The class constructor for deserialization.
 *
 * @returns An array of deserialized objects.
 */
export function bytesToSerializableObjectArray<T extends Serializable<T>>(
  source: Uint8Array,
  Clazz: new () => T,
): T[] {
  const array: T[] = [];
  let offset = 0;

  while (offset < source.length) {
    let deserializationResult = deserializeObj(source, offset, Clazz);
    offset = deserializationResult.offset;
    array.push(deserializationResult.instance);
  }

  return array;
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
  type: ArrayType,
): Uint8Array {
  let args = new Args();
  source.forEach((value) => {
    switch (type) {
      case ArrayType.STRING:
        args.addString(value as string);
        break;
      case ArrayType.BOOL:
        args.addBool(value as boolean);
        break;
      case ArrayType.U8:
        args.addU8(value as number);
        break;
      case ArrayType.F64:
        args.addF64(value as number);
        break;
      case ArrayType.F32:
        args.addF32(value as number);
        break;
      case ArrayType.I32:
        args.addI32(value as number);
        break;
      case ArrayType.I64:
        args.addI64(value as bigint);
        break;
      case ArrayType.U32:
        args.addU32(value as number);
        break;
      case ArrayType.U64:
        args.addU64(value as bigint);
        break;
      case ArrayType.U128:
        args.addU128(value as bigint);
        break;
      case ArrayType.U256:
        args.addU256(value as bigint);
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  });
  return new Uint8Array(args.serialize());
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
export function bytesToArray<T>(source: Uint8Array, type: ArrayType): T[] {
  const sourceLength = source.length;

  let byteOffset = 0;
  const result: T[] = [];
  let eltSize: number;

  if (type !== ArrayType.STRING) {
    eltSize = getDatatypeSize(type);
  }

  while (byteOffset < sourceLength) {
    if (type === ArrayType.STRING) {
      eltSize = bytesToU32(source, byteOffset);
      byteOffset += 4;
    }
    const elt = source.slice(byteOffset, byteOffset + eltSize);
    byteOffset += eltSize;

    switch (type) {
      case ArrayType.STRING:
        result.push(bytesToStr(elt) as T);
        break;
      case ArrayType.BOOL:
        result.push(byteToBool(elt) as T);
        break;
      case ArrayType.U8:
        result.push(byteToU8(elt) as T);
        break;
      case ArrayType.F32:
        result.push(bytesToF32(elt) as T);
        break;
      case ArrayType.F64:
        result.push(bytesToF64(elt) as T);
        break;
      case ArrayType.I32:
        result.push(bytesToI32(elt) as T);
        break;
      case ArrayType.I64:
        result.push(bytesToI64(elt) as T);
        break;
      case ArrayType.U32:
        result.push(bytesToU32(elt) as T);
        break;
      case ArrayType.U64:
        result.push(bytesToU64(elt) as T);
        break;
      case ArrayType.U128:
        result.push(bytesToU128(elt) as T);
        break;
      case ArrayType.U256:
        result.push(bytesToU256(elt) as T);
        break;
    }
  }
  return result;
}
