"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = exports.DEFAULT_OFFSET = exports.ArrayTypes = exports.ArgTypes = void 0;
const serializers_1 = require("./serializers");
/**
 * Typed Arguments facilitating the differentiation
 * between different argument types due to Javascript's
 * single number type.
 *
 * @remarks In AssemblyScript the latter are all native types
 */
var ArgTypes;
(function (ArgTypes) {
    ArgTypes[ArgTypes["STRING"] = 0] = "STRING";
    ArgTypes[ArgTypes["BOOL"] = 1] = "BOOL";
    ArgTypes[ArgTypes["U8"] = 2] = "U8";
    ArgTypes[ArgTypes["U16"] = 3] = "U16";
    ArgTypes[ArgTypes["U32"] = 4] = "U32";
    ArgTypes[ArgTypes["U64"] = 5] = "U64";
    ArgTypes[ArgTypes["U128"] = 6] = "U128";
    ArgTypes[ArgTypes["U256"] = 7] = "U256";
    ArgTypes[ArgTypes["I8"] = 8] = "I8";
    ArgTypes[ArgTypes["I16"] = 9] = "I16";
    ArgTypes[ArgTypes["I32"] = 10] = "I32";
    ArgTypes[ArgTypes["I64"] = 11] = "I64";
    ArgTypes[ArgTypes["I128"] = 12] = "I128";
    ArgTypes[ArgTypes["I256"] = 13] = "I256";
    ArgTypes[ArgTypes["F32"] = 14] = "F32";
    ArgTypes[ArgTypes["F64"] = 15] = "F64";
    ArgTypes[ArgTypes["ARRAY"] = 16] = "ARRAY";
    ArgTypes[ArgTypes["UINT8ARRAY"] = 17] = "UINT8ARRAY";
    ArgTypes[ArgTypes["SERIALIZABLE"] = 18] = "SERIALIZABLE";
    //eslint-disable-next-line @typescript-eslint/naming-convention
    ArgTypes[ArgTypes["SERIALIZABLE_OBJECT_ARRAY"] = 19] = "SERIALIZABLE_OBJECT_ARRAY";
})(ArgTypes || (exports.ArgTypes = ArgTypes = {}));
var ArrayTypes;
(function (ArrayTypes) {
    ArrayTypes[ArrayTypes["STRING"] = 0] = "STRING";
    ArrayTypes[ArrayTypes["BOOL"] = 1] = "BOOL";
    ArrayTypes[ArrayTypes["U8"] = 2] = "U8";
    ArrayTypes[ArrayTypes["U16"] = 3] = "U16";
    ArrayTypes[ArrayTypes["U32"] = 4] = "U32";
    ArrayTypes[ArrayTypes["U64"] = 5] = "U64";
    ArrayTypes[ArrayTypes["U128"] = 6] = "U128";
    ArrayTypes[ArrayTypes["U256"] = 7] = "U256";
    ArrayTypes[ArrayTypes["I8"] = 8] = "I8";
    ArrayTypes[ArrayTypes["I16"] = 9] = "I16";
    ArrayTypes[ArrayTypes["I32"] = 10] = "I32";
    ArrayTypes[ArrayTypes["I64"] = 11] = "I64";
    ArrayTypes[ArrayTypes["I128"] = 12] = "I128";
    ArrayTypes[ArrayTypes["I256"] = 13] = "I256";
    ArrayTypes[ArrayTypes["F32"] = 14] = "F32";
    ArrayTypes[ArrayTypes["F64"] = 15] = "F64";
})(ArrayTypes || (exports.ArrayTypes = ArrayTypes = {}));
const BYTES_32_OFFSET = 4;
const BYTES_64_OFFSET = 8;
exports.DEFAULT_OFFSET = 0;
/**
 * Storage and serialization class for remote function call arguments.
 *
 * @remarks
 * This class can serialize typescript native types into bytes, in order to
 * make smart-contract function call easier.
 * It also can deserialize bytes.
 *
 */
class Args {
    serialized;
    offset;
    argsList = [];
    /**
     * Constructor to either serialize or deserialize data passed from/to DApps and remote Smart contracts.
     *
     * @param serialized - The optional serialized arguments to deserialize.
     * @param offset - The optional offset to start deserializing from.
     */
    constructor(serialized = new Uint8Array(), offset = exports.DEFAULT_OFFSET) {
        this.serialized = serialized;
        this.offset = offset;
    }
    getArgsList() {
        return this.argsList;
    }
    /**
     * Returns the current deserialization offset of the serialized byte array.
     *
     * @returns the current offset
     */
    getOffset() {
        return this.offset;
    }
    /**
     * Returns the serialized byte array.
     *
     * @returns A byte array.
     */
    serialize() {
        return Uint8Array.from(this.serialized);
    }
    // Getters
    /**
     * Returns the next string in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized string
     */
    nextString() {
        const length = Number(this.nextU32());
        const end = this.offset + length;
        const result = (0, serializers_1.bytesToStr)(this.serialized.slice(this.offset, end));
        this.offset = end;
        return result;
    }
    nextInteger(extractor) {
        const { value, offset } = extractor(this.serialized, this.offset);
        this.offset = offset;
        return value;
    }
    /**
     * Returns the next unsigned byte in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextU8() {
        return this.nextInteger(serializers_1.U8.fromBuffer);
    }
    /**
     * Returns the next unsigned short integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextU16() {
        return this.nextInteger(serializers_1.U16.fromBuffer);
    }
    /**
     * Returns the next unsigned integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number
     */
    nextU32() {
        return this.nextInteger(serializers_1.U32.fromBuffer);
    }
    /**
     * Returns the next long integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextU64() {
        return this.nextInteger(serializers_1.U64.fromBuffer);
    }
    /**
     * Returns the next uint128 in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextU128() {
        return this.nextInteger(serializers_1.U128.fromBuffer);
    }
    /**
     * Returns the next uint256 in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextU256() {
        return this.nextInteger(serializers_1.U256.fromBuffer);
    }
    /**
     * Returns the next signed byte in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI8() {
        return this.nextInteger(serializers_1.I8.fromBuffer);
    }
    /**
     * Returns the next signed short integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI16() {
        return this.nextInteger(serializers_1.I16.fromBuffer);
    }
    /**
     * Returns the next signed integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI32() {
        return this.nextInteger(serializers_1.I32.fromBuffer);
    }
    /**
     * Returns the next signed long integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI64() {
        return this.nextInteger(serializers_1.I64.fromBuffer);
    }
    /**
     * Returns the next signed long integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI128() {
        return this.nextInteger(serializers_1.I128.fromBuffer);
    }
    /**
     * Returns the next signed long integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI256() {
        return this.nextInteger(serializers_1.I256.fromBuffer);
    }
    /**
     * Returns the next boolean in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized boolean.
     */
    nextBool() {
        return !!this.serialized[this.offset++];
    }
    /**
     * Returns the next floating number in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextF32() {
        const value = (0, serializers_1.bytesToF32)(this.serialized, this.offset);
        this.offset += BYTES_32_OFFSET;
        return value;
    }
    /**
     * Returns the next long floating number in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextF64() {
        const value = (0, serializers_1.bytesToF64)(this.serialized, this.offset);
        this.offset += BYTES_64_OFFSET;
        return value;
    }
    /**
     * Returns the next sub byte array in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized byte array.
     */
    nextUint8Array() {
        const length = Number(this.nextU32());
        const byteArray = this.serialized.slice(this.offset, this.offset + length);
        this.offset += length;
        return byteArray;
    }
    /**
     * Returns the next {@link ISerializable} object in the serialized byte array
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @param ctor - the class constructor prototype T.prototype
     *
     * @returns the deserialized object T
     */
    nextSerializable(ctor) {
        const deserializationResult = (0, serializers_1.deserializeObj)(this.serialized, this.offset, ctor);
        this.offset = deserializationResult.offset;
        return deserializationResult.instance;
    }
    /**
     * Returns the next array of {@link ISerializable} objects in the serialized byte array
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @param ctor - the class constructor prototype T.prototype
     *
     * @returns the deserialized array of object that implement ISerializable
     */
    nextSerializableObjectArray(ctor) {
        const length = Number(this.nextU32());
        if (!length) {
            return [];
        }
        if (this.offset + length > this.serialized.length) {
            throw new Error("can't deserialize length of array from given argument");
        }
        const buffer = this.getNextData(length);
        const value = (0, serializers_1.bytesToSerializableObjectArray)(buffer, ctor);
        this.offset += length;
        return value;
    }
    /**
     * Returns the next array of {@link ArgTypes} objects in the serialized byte array
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @param type - the type of the elements in the array.
     *
     * @returns the next array of object that are native type
     */
    nextArray(type) {
        const length = Number(this.nextU32());
        if (!length) {
            return [];
        }
        if (this.offset + length > this.serialized.length) {
            throw new Error("can't deserialize length of array from given argument");
        }
        const buffer = this.getNextData(length);
        const value = (0, serializers_1.bytesToArray)(buffer, type);
        this.offset += length;
        return value;
    }
    // Setter
    /**
     * Adds a unsigned byte to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addU8(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.U8.toBytes(value));
        this.offset++;
        this.argsList.push({ type: ArgTypes.U8, value: value });
        return this;
    }
    addU16(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.U16.toBytes(value));
        this.offset += serializers_1.U16.SIZE_BYTE;
        this.argsList.push({ type: ArgTypes.U16, value: value });
        return this;
    }
    /**
     * Adds an unsigned integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addU32(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.U32.toBytes(value));
        this.offset += serializers_1.U32.SIZE_BYTE;
        this.argsList.push({ type: ArgTypes.U32, value: value });
        return this;
    }
    /**
     * Adds an unsigned long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addU64(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.U64.toBytes(value));
        this.offset += serializers_1.U64.SIZE_BYTE;
        this.argsList.push({ type: ArgTypes.U64, value: value });
        return this;
    }
    /**
     * Adds an unsigned long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addU128(bigInt) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.U128.toBytes(bigInt));
        this.offset += serializers_1.U128.SIZE_BYTE;
        this.argsList.push({ type: ArgTypes.U128, value: bigInt });
        return this;
    }
    /**
     * Adds an unsigned long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addU256(bigInt) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.U256.toBytes(bigInt));
        this.offset += serializers_1.U256.SIZE_BYTE;
        this.argsList.push({ type: ArgTypes.U256, value: bigInt });
        return this;
    }
    /**
     * Adds a signed byte to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI8(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.I8.toBytes(value));
        this.offset++;
        this.argsList.push({ type: ArgTypes.I8, value: value });
        return this;
    }
    /**
     * Adds a signed short integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI16(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.I16.toBytes(value));
        this.offset += serializers_1.I16.SIZE_BYTE;
        this.argsList.push({ type: ArgTypes.I16, value: value });
        return this;
    }
    /**
     * Adds a signed integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI32(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.I32.toBytes(value));
        this.offset += serializers_1.I32.SIZE_BYTE;
        this.argsList.push({ type: ArgTypes.I32, value: value });
        return this;
    }
    /**
     * Adds a signed long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI64(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.I64.toBytes(value));
        this.offset += serializers_1.I64.SIZE_BYTE;
        this.argsList.push({ type: ArgTypes.I64, value: value });
        return this;
    }
    /**
     * Adds a signed long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI128(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.I128.toBytes(value));
        this.offset += serializers_1.I128.SIZE_BYTE;
        this.argsList.push({ type: ArgTypes.I128, value: value });
        return this;
    }
    /**
     * Adds a signed long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI256(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.I256.toBytes(value));
        this.offset += serializers_1.I256.SIZE_BYTE;
        this.argsList.push({ type: ArgTypes.I256, value: value });
        return this;
    }
    /**
     * Adds a boolean to the serialized arguments.
     *
     * @param value - the boolean to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addBool(value) {
        this.serialized = Args.concatArrays(this.serialized, serializers_1.U8.toBytes(value ? 1n : 0n));
        this.offset++;
        this.argsList.push({ type: ArgTypes.BOOL, value: value });
        return this;
    }
    /**
     * Adds a floating number to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addF32(value) {
        this.serialized = Args.concatArrays(this.serialized, (0, serializers_1.f32ToBytes)(value));
        this.offset += BYTES_32_OFFSET;
        this.argsList.push({ type: ArgTypes.F32, value: value });
        return this;
    }
    /**
     * Adds a long floating number to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addF64(value) {
        this.serialized = Args.concatArrays(this.serialized, (0, serializers_1.f64ToBytes)(value));
        this.offset += BYTES_64_OFFSET;
        this.argsList.push({ type: ArgTypes.F64, value: value });
        return this;
    }
    /**
     * Adds a byte array integer to the serialized arguments.
     *
     * @param array - the array to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addUint8Array(array) {
        this.addU32(serializers_1.U32.fromNumber(array.length));
        this.serialized = Args.concatArrays(this.serialized, array);
        this.offset += array.length;
        // Remove the U32 from the argsList
        this.argsList.pop();
        this.argsList.push({ type: ArgTypes.UINT8ARRAY, value: array });
        return this;
    }
    /**
     * Adds a string to the serialized arguments.
     *
     * @remarks
     * Works only if the argument is an instance of a handled type (String of 4294967295 characters maximum)
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addString(value) {
        const maxSize = 4294967295;
        const size = value.length;
        if (size > maxSize) {
            // eslint-disable-next-line no-console
            console.warn('input string is too long, it will be truncated');
            value = value.slice(0, maxSize);
        }
        const serialized = (0, serializers_1.strToBytes)(value);
        this.addU32(serializers_1.U32.fromNumber(serialized.length));
        this.serialized = Args.concatArrays(this.serialized, (0, serializers_1.strToBytes)(value));
        this.offset += (0, serializers_1.strToBytes)(value).length;
        // Remove the U32 from the argsList
        this.argsList.pop();
        this.argsList.push({ type: ArgTypes.STRING, value: value });
        return this;
    }
    /**
     * Adds a serializable object to the serialized arguments.
     *
     * @remarks
     * The object must implement the {@link ISerializable} interface
     *
     * @see {@link ISerializable}
     *
     * @param value - the object to add
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addSerializable(value) {
        const serializedValue = value.serialize();
        this.serialized = Args.concatArrays(this.serialized, serializedValue);
        this.offset += serializedValue.length;
        this.argsList.push({ type: ArgTypes.SERIALIZABLE, value: value });
        return this;
    }
    /**
     * Adds an array of serializable objects to the serialized arguments.
     *
     * @remarks
     * Each object must implement the {@link ISerializable} interface.
     * This will perform a deep copy of your objects thanks to the {@link ISerializable.serialize}
     * method you define in your class.
     *
     * @see {@link ISerializable}
     *
     * @param arg - the argument to add
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addSerializableObjectArray(arg) {
        const content = (0, serializers_1.serializableObjectsArrayToBytes)(arg);
        this.addU32(serializers_1.U32.fromNumber(content.length));
        this.serialized = Args.concatArrays(this.serialized, content);
        this.offset += content.length;
        // Remove the U32 from the argsList
        this.argsList.pop();
        this.argsList.push({
            type: ArgTypes.SERIALIZABLE_OBJECT_ARRAY,
            value: arg,
        });
        return this;
    }
    /**
     * Adds an array of objects to the serialized arguments.
     *
     * @remarks
     * If the type of the values of the array is not native type, this will serialize the pointers, which is certainly
     * not what you want! You can only serialize properly array of native types or array of `Serializable` object.
     *
     * @see {@link addSerializableObjectArray}
     *
     * @param arg - the argument to add
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addArray(arg, type) {
        const content = (0, serializers_1.arrayToBytes)(arg, type);
        this.addU32(serializers_1.U32.fromNumber(content.length));
        this.serialized = Args.concatArrays(this.serialized, content);
        this.offset += content.length;
        // Remove the U32 from the argsList
        this.argsList.pop();
        this.argsList.push({ type: ArgTypes.ARRAY, value: arg });
        return this;
    }
    // Utils
    /**
     * Internal function to concat to Uint8Array.
     *
     * @param a - first array to concat
     * @param b - second array to concat
     *
     * @returns the concatenated array
     */
    static concatArrays(a, b) {
        return new Uint8Array([...a, ...b]);
    }
    /**
     * Returns the data of requested size for current offset
     *
     * @param size - The data size
     * @returns the slice of the serialized internal buffer
     */
    getNextData(size) {
        return this.serialized.slice(this.offset, this.offset + size);
    }
}
exports.Args = Args;
//# sourceMappingURL=args.js.map