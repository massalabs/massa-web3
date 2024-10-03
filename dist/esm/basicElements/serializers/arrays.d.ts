import { NativeType, ArrayTypes, DeserializedResult, Serializable } from '../args';
/**
 * Get the byte size of a typed array unit.
 *
 * @param typedArrayTypes - The typed array unit to get the size of.
 *
 * @returns The size of the typed array unit.
 */
export declare function getDatatypeSize(type: ArrayTypes): number;
/**
 * Serializes an array of serializable objects to bytes.
 *
 * @param source - The array of serializable objects to serialize.
 *
 * @returns The serialized array as Uint8Array.
 */
export declare function serializableObjectsArrayToBytes<T extends Serializable<T>>(source: T[]): Uint8Array;
/**
 * Deserializes a bytes array into an array of deserialized objects.
 *
 * @param data - The bytes array to deserialize.
 * @param offset - The offset to start deserializing from.
 * @param obj - The class used for deserialization.
 *
 * @returns The deserialized array of objects.
 */
export declare function deserializeObj<T extends Serializable<T>>(data: Uint8Array, offset: number, obj: new () => T): DeserializedResult<T>;
/**
 * Converts a Uint8Array into an array of deserialized type parameters.
 *
 * @param source - The Uint8Array to convert.
 * @param obj - The class constructor for deserialization.
 *
 * @returns An array of deserialized objects.
 */
export declare function bytesToSerializableObjectArray<T extends Serializable<T>>(source: Uint8Array, obj: new () => T): T[];
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
export declare function arrayToBytes(source: NativeType[], type: ArrayTypes): Uint8Array;
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
export declare function bytesToArray<T>(source: Uint8Array, type: ArrayTypes): T[];
