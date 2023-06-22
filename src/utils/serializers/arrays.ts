/* eslint-disable no-case-declarations */

import { Args, NativeType, TypedArrayUnit } from '../arguments';
import {
  IDeserializedResult,
  ISerializable,
} from '../../interfaces/ISerializable';
import { bytesToStr, strToBytes } from './strings';
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

const MAX_STRING_CHARS = 100;

/**
 * Get the byte size of a typed array unit.
 *
 * @param typedArrayType - The typed array unit to get the size of.
 *
 * @returns The size of the typed array unit.
 */
const getDatatypeSize = (type: TypedArrayUnit): number => {
  switch (type) {
    case TypedArrayUnit.STRING:
      // this is very nasty :/
      return MAX_STRING_CHARS;
    case TypedArrayUnit.BOOL:
    case TypedArrayUnit.U8:
      return 1;
    case TypedArrayUnit.F32:
    case TypedArrayUnit.I32:
    case TypedArrayUnit.U32:
      return 4;
    case TypedArrayUnit.F64:
    case TypedArrayUnit.I64:
    case TypedArrayUnit.U64:
      return 8;
    case TypedArrayUnit.U128:
      return 16;
    case TypedArrayUnit.U256:
      return 32;
    default:
      throw new Error(`Unsupported type: ${Object.keys(TypedArrayUnit)[type]}`);
  }
};

/**
 * Serializes an array of serializable objects to bytes.
 *
 * @param source - The array of serializable objects to serialize.
 *
 * @returns The serialized array as Uint8Array.
 */
export function serializableObjectsArrayToBytes<T extends ISerializable<T>>(
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
export function deserializeObj<T extends ISerializable<T>>(
  data: Uint8Array,
  offset: number,
  Clazz: new () => T,
): IDeserializedResult<T> {
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
export function bytesToSerializableObjectArray<T extends ISerializable<T>>(
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
export function nativeTypeArrayToBytes(
  source: NativeType[],
  type: TypedArrayUnit,
): Uint8Array {
  let args = new Args();
  source.forEach((value) => {
    switch (type) {
      case TypedArrayUnit.STRING:
        if ((value as string).length > MAX_STRING_CHARS) {
          throw new Error(
            `String length exceeds the maximum limit of ${MAX_STRING_CHARS} characters. Please limit your strings to ${MAX_STRING_CHARS} characters.`,
          );
        }
        // init an array of MAX_STRING_CHARS length
        const strElt = new Uint8Array(MAX_STRING_CHARS);
        strElt.set(strToBytes(value as string));
        // Create a new Args containing the previously serialized strings and the new string element
        args = new Args(
          Args.concatArrays(new Uint8Array(args.serialize()), strElt),
        );
        break;
      case TypedArrayUnit.BOOL:
        args.addBool(value as boolean);
        break;
      case TypedArrayUnit.U8:
        args.addU8(value as number);
        break;
      case TypedArrayUnit.F64:
        args.addF64(value as number);
        break;
      case TypedArrayUnit.F32:
        args.addF32(value as number);
        break;
      case TypedArrayUnit.I32:
        args.addI32(value as number);
        break;
      case TypedArrayUnit.I64:
        args.addI64(value as bigint);
        break;
      case TypedArrayUnit.U32:
        args.addU32(value as number);
        break;
      case TypedArrayUnit.U64:
        args.addU64(value as bigint);
        break;
      case TypedArrayUnit.U128:
        args.addU128(value as bigint);
        break;
      case TypedArrayUnit.U256:
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
 * @param typedArrayType - The typed array unit type.
 *
 * @returns An array of converted native types.
 */
export function bytesToNativeTypeArray<T>(
  source: Uint8Array,
  typedArrayType: TypedArrayUnit,
): T[] {
  const sourceLength = source.length;
  const eltSize = getDatatypeSize(typedArrayType);

  // Calculate the total length of the array.
  let targetLength = sourceLength / eltSize;
  if (!(targetLength % 1 === 0)) {
    throw new Error(`None-integer array length computation`);
  }

  // Create a new typed array of type T and fill it with the converted values.
  const result: T[] = [];
  for (let i = 0; i < targetLength; i++) {
    const byteOffset = i * eltSize;

    const elt = source.slice(byteOffset, byteOffset + eltSize);

    switch (typedArrayType) {
      case TypedArrayUnit.STRING:
        // for strings, the array is filled with zeros to MAX_STRING_CHARS length elements... so we remove it
        const strElt = elt.filter((letter) => letter > 0);
        result[i] = bytesToStr(strElt) as unknown as T;
        break;
      case TypedArrayUnit.BOOL:
        result[i] = byteToBool(elt) as T;
        break;
      case TypedArrayUnit.U8:
        result[i] = byteToU8(elt) as T;
        break;
      case TypedArrayUnit.F32:
        result[i] = bytesToF32(elt) as T;
        break;
      case TypedArrayUnit.F64:
        result[i] = bytesToF64(elt) as T;
        break;
      case TypedArrayUnit.I32:
        result[i] = bytesToI32(elt) as T;
        break;
      case TypedArrayUnit.I64:
        result[i] = bytesToI64(elt) as T;
        break;
      case TypedArrayUnit.U32:
        result[i] = bytesToU32(elt) as T;
        break;
      case TypedArrayUnit.U64:
        result[i] = bytesToU64(elt) as T;
        break;
      case TypedArrayUnit.U128:
        result[i] = bytesToU128(elt) as T;
        break;
      case TypedArrayUnit.U256:
        result[i] = bytesToU256(elt) as T;
        break;
    }
  }
  return result;
}
