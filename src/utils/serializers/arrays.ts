/* eslint-disable no-case-declarations */

// Lookup table for native types
const getDatatypeSize = (typedArrayType: TypedArrayUnit): number => {
  switch (typedArrayType) {
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

  // allocates a new Array in the memory
  const target = new Uint8Array(totalLength);

  let offset = 0;
  for (let i = 0; i < nbElements; i++) {
    // copies the content of the source buffer to the newly allocated array.
    target.set(pointers[i], offset);
    offset += sizes[i];
  }

  return target;
}

export function deserializeObj<T extends ISerializable<T>>(
  data: Uint8Array,
  offset: number,
  Clazz: new () => T,
): IDeserializedResult<T> {
  const deserialized = new Clazz().deserialize(data, offset);
  return deserialized;
}

/**
 * Converts a Uint8Array into an Array of deserialized type parameters T.
 *
 * @param source - the Uint8Array to convert
 * @param Clazz - the class constructor prototype T.prototype
 *
 * @return {T[]} an array of deserialized T's
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
 * Convert an array of type parameter to StaticArray<u8>
 *
 * @remarks
 * This will perform a deep copy only for native types.
 * inspired by https://github.com/AssemblyScript/assemblyscript/blob/main/std/assembly/array.ts#L69-L81
 *
 * @see {@link Serializable}
 *
 * @param source - the array to convert
 */
export function nativeTypeArrayToBytes<T extends TypedArrayUnit>(
  source: any[],
  type: T,
): Uint8Array {
  const sourceLength = source.length;

  // Calculate the target length based on the type size and source length
  const targetLength = sourceLength * getDatatypeSize(type);
  console.log('TARGET LEN ', targetLength);

  // allocates a new Uint8Array in the memory
  let target = new Uint8Array(targetLength);

  for (let i = 0; i < sourceLength; i++) {
    const value = source[i];
    // For boolean and number values, we can just write them to the target buffer directly
    const view = new DataView(
      target.buffer,
      target.byteOffset + i * getDatatypeSize(type),
    );
    switch (type) {
      case TypedArrayUnit.BOOL:
        view.setUint8(0, value ? 1 : 0);
        break;
      case TypedArrayUnit.U8:
        view.setUint8(0, value);
        break;
      case TypedArrayUnit.F64:
        view.setFloat64(0, value, true);
        break;
      case TypedArrayUnit.F32:
        view.setFloat32(0, value, true);
        break;
      case TypedArrayUnit.I32:
        view.setInt32(0, value, true);
        break;
      case TypedArrayUnit.I64:
        view.setBigInt64(0, BigInt(value), true);
        break;
      case TypedArrayUnit.U32:
        view.setUint32(0, value, true);
        break;
      case TypedArrayUnit.U64:
        view.setBigUint64(0, BigInt(value), true);
        break;
      default:
        throw new Error(`Unsupported type ${type}`);
    }
  }
  console.log('FINAL BUFFER ', target);
  return target;
}

/**
 * Converts a StaticArray<u8> into an Array of type parameter.
 *
 * @remarks
 * inspired by https://github.com/AssemblyScript/assemblyscript/blob/main/std/assembly/array.ts#L69-L81
 *
 * @param source - the array to convert
 */
export function bytesToNativeTypeArray<T extends TypedArrayUnit>(
  source: Uint8Array,
  typedArrayType: T,
): T[] {
  console.log('DESERIALIZATION LEN ', source);
  const sourceLength = source.length;
  // Calculate the total length of the array
  let targetLength = sourceLength / getDatatypeSize(typedArrayType);
  const dataView = new DataView(source.buffer);

  // Create a new typed array of type T and fill it with the converted values
  const result: T[] = [];
  let byteOffset = 0;
  for (let i = 0; i < targetLength; i++) {
    const size = getDatatypeSize(typedArrayType);
    switch (typedArrayType) {
      case TypedArrayUnit.BOOL:
        const boolVal = source[i] === 1 ? true : false;
        result.push(boolVal as unknown as T);
        byteOffset += size;
        break;
      case TypedArrayUnit.U8:
        result.push(source[i] as unknown as T);
        byteOffset += size;
        break;
      case TypedArrayUnit.F32:
        result.push(dataView.getFloat32(byteOffset, true) as unknown as T);
        byteOffset += size;
        break;
      case TypedArrayUnit.F64:
        result.push(dataView.getFloat64(byteOffset, true) as unknown as T);
        byteOffset += size;
        break;
      case TypedArrayUnit.I32:
        result.push(dataView.getInt32(byteOffset, true) as unknown as T);
        byteOffset += size;
        break;
      case TypedArrayUnit.I64:
        result.push(dataView.getBigInt64(byteOffset, true) as unknown as T);
        byteOffset += size;
        break;
      case TypedArrayUnit.U32:
        result.push(dataView.getUint32(byteOffset, true) as unknown as T);
        byteOffset += size;
        break;
      case TypedArrayUnit.U64:
        result.push(dataView.getBigUint64(byteOffset, true) as unknown as T);
        byteOffset += size;
        break;
    }
  }
  return result;
}
