/* eslint-disable no-case-declarations */

import { NativeType } from '../arguments';

const MAX_STRING_CHARS = 100;

/**
 * Get the byte size of a typed array unit.
 *
 * @param typedArrayType - The typed array unit to get the size of.
 *
 * @returns The size of the typed array unit.
 */
const getDatatypeSize = (typedArrayType: TypedArrayUnit): number => {
  switch (typedArrayType) {
    case TypedArrayUnit.STRING:
      return MAX_STRING_CHARS;
    case TypedArrayUnit.BOOL:
      return 1;
    case TypedArrayUnit.F32:
      return 4;
    case TypedArrayUnit.F64:
      return 8;
    case TypedArrayUnit.I32:
      return 4;
    case TypedArrayUnit.I64:
      return 8;
    case TypedArrayUnit.U8:
      return 1;
    case TypedArrayUnit.U32:
      return 4;
    case TypedArrayUnit.U64:
      return 8;
  }
};

import {
  IDeserializedResult,
  ISerializable,
} from '../../interfaces/ISerializable';
import { TypedArrayUnit } from '../arguments';
import { bytesToStr, strToBytes } from './strings';

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
export function nativeTypeArrayToBytes<T extends TypedArrayUnit>(
  source: NativeType[],
  type: T,
): Uint8Array {
  const sourceLength = source.length;

  // Calculate the target length based on the type size and source length.
  const targetLength = sourceLength * getDatatypeSize(type);

  // Allocate a new Uint8Array in memory.
  let target = new Uint8Array(targetLength);

  for (let i = 0; i < sourceLength; i++) {
    const value = source[i];
    // For boolean and number values, write them directly to the target buffer.
    const view = new DataView(
      target.buffer,
      target.byteOffset + i * getDatatypeSize(type),
    );
    switch (type) {
      case TypedArrayUnit.STRING:
        if ((value as string).length > MAX_STRING_CHARS) {
          throw new Error(
            `String length exceeds the maximum limit of ${MAX_STRING_CHARS} characters. Please limit your strings to ${MAX_STRING_CHARS} characters.`,
          );
        }
        const bytes: Uint8Array = strToBytes(value as string);
        for (let j = 0; j < bytes.length; j++) {
          view.setUint8(j, bytes[j]);
        }
        break;
      case TypedArrayUnit.BOOL:
        view.setUint8(0, value ? 1 : 0);
        break;
      case TypedArrayUnit.U8:
        view.setUint8(0, value as number);
        break;
      case TypedArrayUnit.F64:
        view.setFloat64(0, value as number, true);
        break;
      case TypedArrayUnit.F32:
        view.setFloat32(0, value as number, true);
        break;
      case TypedArrayUnit.I32:
        view.setInt32(0, value as number, true);
        break;
      case TypedArrayUnit.I64:
        view.setBigInt64(0, BigInt(value as bigint), true);
        break;
      case TypedArrayUnit.U32:
        view.setUint32(0, value as number, true);
        break;
      case TypedArrayUnit.U64:
        view.setBigUint64(0, BigInt(value as bigint), true);
        break;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }
  return target;
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
export function bytesToNativeTypeArray<T extends TypedArrayUnit>(
  source: Uint8Array,
  typedArrayType: T,
): T[] {
  const sourceLength = source.length;
  // Calculate the total length of the array.
  let targetLength = sourceLength / getDatatypeSize(typedArrayType);
  if (!(targetLength % 1 === 0)) {
    throw new Error(`None-integer array length computation`);
  }
  const dataView = new DataView(source.buffer);

  // Create a new typed array of type T and fill it with the converted values.
  const result: T[] = [];
  let byteOffset = 0;
  for (let i = 0; i < targetLength; i++) {
    const size = getDatatypeSize(typedArrayType);
    switch (typedArrayType) {
      case TypedArrayUnit.STRING:
        let dataArr = [];
        for (let j = 0; j < size; j++) {
          const letter = dataView.getUint8(byteOffset + j);
          if (letter <= 0) continue;
          dataArr.push(letter);
        }
        result.push(bytesToStr(Uint8Array.from(dataArr)) as unknown as T);
        break;
      case TypedArrayUnit.BOOL:
        const boolVal = source[i] === 1 ? true : false;
        result.push(boolVal as unknown as T);
        break;
      case TypedArrayUnit.U8:
        result.push(source[i] as unknown as T);
        break;
      case TypedArrayUnit.F32:
        result.push(dataView.getFloat32(byteOffset, true) as unknown as T);
        break;
      case TypedArrayUnit.F64:
        result.push(dataView.getFloat64(byteOffset, true) as unknown as T);
        break;
      case TypedArrayUnit.I32:
        result.push(dataView.getInt32(byteOffset, true) as unknown as T);
        break;
      case TypedArrayUnit.I64:
        result.push(dataView.getBigInt64(byteOffset, true) as unknown as T);
        break;
      case TypedArrayUnit.U32:
        result.push(dataView.getUint32(byteOffset, true) as unknown as T);
        break;
      case TypedArrayUnit.U64:
        result.push(dataView.getBigUint64(byteOffset, true) as unknown as T);
        break;
    }
    byteOffset += size;
  }
  return result;
}
