/* eslint-disable no-case-declarations */
import { Args, ArrayTypes, DEFAULT_OFFSET, } from '../args';
import { bytesToStr } from './strings';
import { byteToBool } from './bool';
import { bytesToF32, bytesToF64 } from './numbers';
import { U8, U16, U32, U64, U128, U256, I8, I16, I32, I64, I128, I256 } from '.';
/**
 * Get the byte size of a typed array unit.
 *
 * @param typedArrayTypes - The typed array unit to get the size of.
 *
 * @returns The size of the typed array unit.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function getDatatypeSize(type) {
    switch (type) {
        case ArrayTypes.BOOL:
        case ArrayTypes.U8:
        case ArrayTypes.I8:
            return U8.SIZE_BYTE;
        case ArrayTypes.F32:
        case ArrayTypes.I32:
        case ArrayTypes.U32:
            return U32.SIZE_BYTE;
        case ArrayTypes.F64:
        case ArrayTypes.I64:
        case ArrayTypes.U64:
            return U64.SIZE_BYTE;
        case ArrayTypes.I128:
        case ArrayTypes.U128:
            return U128.SIZE_BYTE;
        case ArrayTypes.U256:
            return U256.SIZE_BYTE;
        default:
            throw new Error(`Unsupported type: ${Object.keys(ArrayTypes)[type]}`);
    }
}
/**
 * Serializes an array of serializable objects to bytes.
 *
 * @param source - The array of serializable objects to serialize.
 *
 * @returns The serialized array as Uint8Array.
 */
export function serializableObjectsArrayToBytes(source) {
    return source.reduce((acc, curr) => Args.concatArrays(acc, curr.serialize()), 
    //eslint-disable-next-line @typescript-eslint/no-magic-numbers
    new Uint8Array(0));
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
export function deserializeObj(data, offset, obj) {
    return new obj().deserialize(data, offset);
}
/**
 * Converts a Uint8Array into an array of deserialized type parameters.
 *
 * @param source - The Uint8Array to convert.
 * @param obj - The class constructor for deserialization.
 *
 * @returns An array of deserialized objects.
 */
export function bytesToSerializableObjectArray(source, obj) {
    const array = [];
    let offset = DEFAULT_OFFSET;
    while (offset < source.length) {
        const deserializationResult = deserializeObj(source, offset, obj);
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
export function arrayToBytes(source, type) {
    const args = new Args();
    source.forEach((value) => {
        switch (type) {
            case ArrayTypes.STRING:
                args.addString(value);
                break;
            case ArrayTypes.BOOL:
                args.addBool(value);
                break;
            case ArrayTypes.U8:
                args.addU8(value);
                break;
            case ArrayTypes.U16:
                args.addU16(value);
                break;
            case ArrayTypes.U32:
                args.addU32(value);
                break;
            case ArrayTypes.U64:
                args.addU64(value);
                break;
            case ArrayTypes.U128:
                args.addU128(value);
                break;
            case ArrayTypes.U256:
                args.addU256(value);
                break;
            case ArrayTypes.I8:
                args.addI8(value);
                break;
            case ArrayTypes.I16:
                args.addI16(value);
                break;
            case ArrayTypes.I32:
                args.addI32(value);
                break;
            case ArrayTypes.I64:
                args.addI64(value);
                break;
            case ArrayTypes.I128:
                args.addI128(value);
                break;
            case ArrayTypes.I256:
                args.addI256(value);
                break;
            case ArrayTypes.F64:
                args.addF64(value);
                break;
            case ArrayTypes.F32:
                args.addF32(value);
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
export function bytesToArray(source, type) {
    const sourceLength = source.length;
    let byteOffset = DEFAULT_OFFSET;
    const result = [];
    let elementSize = 0;
    if (type !== ArrayTypes.STRING) {
        elementSize = getDatatypeSize(type);
    }
    while (byteOffset < sourceLength) {
        if (type === ArrayTypes.STRING) {
            const { value, offset } = U32.fromBuffer(source, byteOffset);
            elementSize = Number(value);
            byteOffset = offset;
        }
        const elt = source.slice(byteOffset, byteOffset + elementSize);
        byteOffset += elementSize;
        switch (type) {
            case ArrayTypes.STRING:
                result.push(bytesToStr(elt));
                break;
            case ArrayTypes.BOOL:
                result.push(byteToBool(elt));
                break;
            case ArrayTypes.U8:
                result.push(U8.fromBytes(elt));
                break;
            case ArrayTypes.U16:
                result.push(U16.fromBytes(elt));
                break;
            case ArrayTypes.U32:
                result.push(U32.fromBytes(elt));
                break;
            case ArrayTypes.U64:
                result.push(U64.fromBytes(elt));
                break;
            case ArrayTypes.U128:
                result.push(U128.fromBytes(elt));
                break;
            case ArrayTypes.U256:
                result.push(U256.fromBytes(elt));
                break;
            case ArrayTypes.I8:
                result.push(I8.fromBytes(elt));
                break;
            case ArrayTypes.I16:
                result.push(I16.fromBytes(elt));
                break;
            case ArrayTypes.I32:
                result.push(I32.fromBytes(elt));
                break;
            case ArrayTypes.I64:
                result.push(I64.fromBytes(elt));
                break;
            case ArrayTypes.I128:
                result.push(I128.fromBytes(elt));
                break;
            case ArrayTypes.I256:
                result.push(I256.fromBytes(elt));
                break;
            case ArrayTypes.F32:
                result.push(bytesToF32(elt));
                break;
            case ArrayTypes.F64:
                result.push(bytesToF64(elt));
                break;
        }
    }
    return result;
}
//# sourceMappingURL=arrays.js.map