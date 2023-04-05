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
export function nativeTypeArrayToBytes<
  T extends ArrayLike<TypedArrayUnit | Uint8Array | string | boolean>,
>(source: T[]): Uint8Array {
  const elementSize = new DataView(new ArrayBuffer(1)); // .setUint8(0, 0).byteOffset; // size of each element in bytes
  const sourceLength = source.length;

  // ensures that the new array has the proper length.
  let targetLength = sourceLength * 2; // elementSize;

  // allocates a new Uint8Array in the memory
  let target = new Uint8Array(targetLength);

  for (let i = 0; i < sourceLength; i++) {
    switch (typeof source[i]) {
      case 'bigint':
        break;
      case 'boolean':
        break;
      case 'object':
        if (source[i] === null) {
          // nothing to copy
        } else {
          throw new Error(`Unsupported type ${typeof source[i]}`);
        }
        break;
      default:
        throw new Error(`Unsupported type ${typeof source[i]}`);
    }
  }

  return target;
}
