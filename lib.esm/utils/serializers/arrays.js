/* eslint-disable no-case-declarations */
const MAX_STRING_CHARS = 100;
// Lookup table for native types
const getDatatypeSize = (typedArrayType) => {
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
import { TypedArrayUnit } from '../arguments';
import { bytesToStr, strToBytes } from './strings';
export function serializableObjectsArrayToBytes(source) {
    const nbElements = source.length;
    const pointers = new Array(nbElements);
    const sizes = new Array(nbElements);
    let totalLength = 0;
    for (let i = 0; i < nbElements; i++) {
        const bytes = source[i].serialize();
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
export function deserializeObj(data, offset, Clazz) {
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
export function bytesToSerializableObjectArray(source, Clazz) {
    const array = [];
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
export function nativeTypeArrayToBytes(source, type) {
    const sourceLength = source.length;
    // Calculate the target length based on the type size and source length
    const targetLength = sourceLength * getDatatypeSize(type);
    // allocates a new Uint8Array in the memory
    let target = new Uint8Array(targetLength);
    for (let i = 0; i < sourceLength; i++) {
        const value = source[i];
        // For boolean and number values, we can just write them to the target buffer directly
        const view = new DataView(target.buffer, target.byteOffset + i * getDatatypeSize(type));
        switch (type) {
            case TypedArrayUnit.STRING:
                if (value.length > MAX_STRING_CHARS) {
                    throw new Error(`String has more than ${MAX_STRING_CHARS} (max.). Please limit your strings to ${MAX_STRING_CHARS} chars`);
                }
                const b = strToBytes(value);
                for (let j = 0; j < b.length; j++) {
                    view.setUint8(j, b[j]);
                }
                break;
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
export function bytesToNativeTypeArray(source, typedArrayType) {
    const sourceLength = source.length;
    // Calculate the total length of the array
    let targetLength = sourceLength / getDatatypeSize(typedArrayType);
    if (!(targetLength % 1 === 0)) {
        throw new Error(`None-integer array length computation`);
    }
    const dataView = new DataView(source.buffer);
    // Create a new typed array of type T and fill it with the converted values
    const result = [];
    let byteOffset = 0;
    for (let i = 0; i < targetLength; i++) {
        const size = getDatatypeSize(typedArrayType);
        switch (typedArrayType) {
            case TypedArrayUnit.STRING:
                let dataArr = [];
                for (let j = 0; j < size; j++) {
                    const letter = dataView.getUint8(byteOffset + j);
                    if (letter <= 0)
                        continue;
                    dataArr.push(letter);
                }
                result.push(bytesToStr(Uint8Array.from(dataArr)));
                break;
            case TypedArrayUnit.BOOL:
                const boolVal = source[i] === 1 ? true : false;
                result.push(boolVal);
                break;
            case TypedArrayUnit.U8:
                result.push(source[i]);
                break;
            case TypedArrayUnit.F32:
                result.push(dataView.getFloat32(byteOffset, true));
                break;
            case TypedArrayUnit.F64:
                result.push(dataView.getFloat64(byteOffset, true));
                break;
            case TypedArrayUnit.I32:
                result.push(dataView.getInt32(byteOffset, true));
                break;
            case TypedArrayUnit.I64:
                result.push(dataView.getBigInt64(byteOffset, true));
                break;
            case TypedArrayUnit.U32:
                result.push(dataView.getUint32(byteOffset, true));
                break;
            case TypedArrayUnit.U64:
                result.push(dataView.getBigUint64(byteOffset, true));
                break;
        }
        byteOffset += size;
    }
    return result;
}
//# sourceMappingURL=arrays.js.map