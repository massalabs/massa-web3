import { IDeserializedResult, ISerializable } from './ISerializable';
import { TypedArrayUnit } from './units';
export declare function serializableObjectsArrayToBytes<T extends ISerializable<T>>(source: T[]): Uint8Array;
export declare function deserializeObj<T extends ISerializable<T>>(data: Uint8Array, offset: number, Clazz: new () => T): IDeserializedResult<T>;
/**
 * Converts a Uint8Array into an Array of deserialized type parameters T.
 *
 * @param source - the Uint8Array to convert
 * @param Clazz - the class constructor prototype T.prototype
 *
 * @return {T[]} an array of deserialized T's
 */
export declare function bytesToSerializableObjectArray<T extends ISerializable<T>>(source: Uint8Array, Clazz: new () => T): T[];
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
export declare function nativeTypeArrayToBytes<T extends TypedArrayUnit>(source: any[], type: T): Uint8Array;
/**
 * Converts a StaticArray<u8> into an Array of type parameter.
 *
 * @remarks
 * inspired by https://github.com/AssemblyScript/assemblyscript/blob/main/std/assembly/array.ts#L69-L81
 *
 * @param source - the array to convert
 */
export declare function bytesToNativeTypeArray<T extends TypedArrayUnit>(source: Uint8Array, typedArrayType: T): T[];
