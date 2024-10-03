"use strict";
/* eslint-disable no-case-declarations */
Object.defineProperty(exports, "__esModule", { value: true });
exports.bytesToArray = exports.arrayToBytes = exports.bytesToSerializableObjectArray = exports.deserializeObj = exports.serializableObjectsArrayToBytes = exports.getDatatypeSize = void 0;
const args_1 = require("../args");
const strings_1 = require("./strings");
const bool_1 = require("./bool");
const numbers_1 = require("./numbers");
const _1 = require(".");
/**
 * Get the byte size of a typed array unit.
 *
 * @param typedArrayTypes - The typed array unit to get the size of.
 *
 * @returns The size of the typed array unit.
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
function getDatatypeSize(type) {
    switch (type) {
        case args_1.ArrayTypes.BOOL:
        case args_1.ArrayTypes.U8:
        case args_1.ArrayTypes.I8:
            return _1.U8.SIZE_BYTE;
        case args_1.ArrayTypes.F32:
        case args_1.ArrayTypes.I32:
        case args_1.ArrayTypes.U32:
            return _1.U32.SIZE_BYTE;
        case args_1.ArrayTypes.F64:
        case args_1.ArrayTypes.I64:
        case args_1.ArrayTypes.U64:
            return _1.U64.SIZE_BYTE;
        case args_1.ArrayTypes.I128:
        case args_1.ArrayTypes.U128:
            return _1.U128.SIZE_BYTE;
        case args_1.ArrayTypes.U256:
            return _1.U256.SIZE_BYTE;
        default:
            throw new Error(`Unsupported type: ${Object.keys(args_1.ArrayTypes)[type]}`);
    }
}
exports.getDatatypeSize = getDatatypeSize;
/**
 * Serializes an array of serializable objects to bytes.
 *
 * @param source - The array of serializable objects to serialize.
 *
 * @returns The serialized array as Uint8Array.
 */
function serializableObjectsArrayToBytes(source) {
    return source.reduce((acc, curr) => args_1.Args.concatArrays(acc, curr.serialize()), 
    //eslint-disable-next-line @typescript-eslint/no-magic-numbers
    new Uint8Array(0));
}
exports.serializableObjectsArrayToBytes = serializableObjectsArrayToBytes;
/**
 * Deserializes a bytes array into an array of deserialized objects.
 *
 * @param data - The bytes array to deserialize.
 * @param offset - The offset to start deserializing from.
 * @param obj - The class used for deserialization.
 *
 * @returns The deserialized array of objects.
 */
function deserializeObj(data, offset, obj) {
    return new obj().deserialize(data, offset);
}
exports.deserializeObj = deserializeObj;
/**
 * Converts a Uint8Array into an array of deserialized type parameters.
 *
 * @param source - The Uint8Array to convert.
 * @param obj - The class constructor for deserialization.
 *
 * @returns An array of deserialized objects.
 */
function bytesToSerializableObjectArray(source, obj) {
    const array = [];
    let offset = args_1.DEFAULT_OFFSET;
    while (offset < source.length) {
        const deserializationResult = deserializeObj(source, offset, obj);
        offset = deserializationResult.offset;
        array.push(deserializationResult.instance);
    }
    return array;
}
exports.bytesToSerializableObjectArray = bytesToSerializableObjectArray;
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
function arrayToBytes(source, type) {
    const args = new args_1.Args();
    source.forEach((value) => {
        switch (type) {
            case args_1.ArrayTypes.STRING:
                args.addString(value);
                break;
            case args_1.ArrayTypes.BOOL:
                args.addBool(value);
                break;
            case args_1.ArrayTypes.U8:
                args.addU8(value);
                break;
            case args_1.ArrayTypes.U16:
                args.addU16(value);
                break;
            case args_1.ArrayTypes.U32:
                args.addU32(value);
                break;
            case args_1.ArrayTypes.U64:
                args.addU64(value);
                break;
            case args_1.ArrayTypes.U128:
                args.addU128(value);
                break;
            case args_1.ArrayTypes.U256:
                args.addU256(value);
                break;
            case args_1.ArrayTypes.I8:
                args.addI8(value);
                break;
            case args_1.ArrayTypes.I16:
                args.addI16(value);
                break;
            case args_1.ArrayTypes.I32:
                args.addI32(value);
                break;
            case args_1.ArrayTypes.I64:
                args.addI64(value);
                break;
            case args_1.ArrayTypes.I128:
                args.addI128(value);
                break;
            case args_1.ArrayTypes.I256:
                args.addI256(value);
                break;
            case args_1.ArrayTypes.F64:
                args.addF64(value);
                break;
            case args_1.ArrayTypes.F32:
                args.addF32(value);
                break;
            default:
                throw new Error(`Unsupported type: ${type}`);
        }
    });
    return new Uint8Array(args.serialize());
}
exports.arrayToBytes = arrayToBytes;
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
function bytesToArray(source, type) {
    const sourceLength = source.length;
    let byteOffset = args_1.DEFAULT_OFFSET;
    const result = [];
    let elementSize = 0;
    if (type !== args_1.ArrayTypes.STRING) {
        elementSize = getDatatypeSize(type);
    }
    while (byteOffset < sourceLength) {
        if (type === args_1.ArrayTypes.STRING) {
            const { value, offset } = _1.U32.fromBuffer(source, byteOffset);
            elementSize = Number(value);
            byteOffset = offset;
        }
        const elt = source.slice(byteOffset, byteOffset + elementSize);
        byteOffset += elementSize;
        switch (type) {
            case args_1.ArrayTypes.STRING:
                result.push((0, strings_1.bytesToStr)(elt));
                break;
            case args_1.ArrayTypes.BOOL:
                result.push((0, bool_1.byteToBool)(elt));
                break;
            case args_1.ArrayTypes.U8:
                result.push(_1.U8.fromBytes(elt));
                break;
            case args_1.ArrayTypes.U16:
                result.push(_1.U16.fromBytes(elt));
                break;
            case args_1.ArrayTypes.U32:
                result.push(_1.U32.fromBytes(elt));
                break;
            case args_1.ArrayTypes.U64:
                result.push(_1.U64.fromBytes(elt));
                break;
            case args_1.ArrayTypes.U128:
                result.push(_1.U128.fromBytes(elt));
                break;
            case args_1.ArrayTypes.U256:
                result.push(_1.U256.fromBytes(elt));
                break;
            case args_1.ArrayTypes.I8:
                result.push(_1.I8.fromBytes(elt));
                break;
            case args_1.ArrayTypes.I16:
                result.push(_1.I16.fromBytes(elt));
                break;
            case args_1.ArrayTypes.I32:
                result.push(_1.I32.fromBytes(elt));
                break;
            case args_1.ArrayTypes.I64:
                result.push(_1.I64.fromBytes(elt));
                break;
            case args_1.ArrayTypes.I128:
                result.push(_1.I128.fromBytes(elt));
                break;
            case args_1.ArrayTypes.I256:
                result.push(_1.I256.fromBytes(elt));
                break;
            case args_1.ArrayTypes.F32:
                result.push((0, numbers_1.bytesToF32)(elt));
                break;
            case args_1.ArrayTypes.F64:
                result.push((0, numbers_1.bytesToF64)(elt));
                break;
        }
    }
    return result;
}
exports.bytesToArray = bytesToArray;
//# sourceMappingURL=arrays.js.map