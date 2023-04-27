"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Args = void 0;
const serializers_1 = require("./serializers");
/**
 * Args for remote function call.
 *
 * This class can serialize javascript native types into bytes, in order to
 * make smart-contract function call easier.
 *
 */
class Args {
    offset = 0;
    serialized;
    /**
     *
     * @param {string} serialized
     */
    constructor(serialized = [], offset = 0) {
        this.serialized = Uint8Array.from(serialized);
        this.offset = offset;
    }
    /**
     * Returns the current offset
     *
     * @returns {number} the current offset
     */
    getOffset() {
        return this.offset;
    }
    /**
     * Returns the serialized array to pass to CallSC.
     *
     * @returns the serialized array
     */
    serialize() {
        return Array.from(this.serialized);
    }
    // Getters
    /**
     * Returns the deserialized string.
     *
     * @returns the deserialized string
     */
    nextString() {
        const length = this.nextU32();
        const end = this.offset + length;
        const result = (0, serializers_1.bytesToStr)(this.serialized.slice(this.offset, end));
        this.offset = end;
        return result;
    }
    /**
     * Returns the deserialized number.
     *
     * @returns
     */
    nextU8() {
        const value = (0, serializers_1.byteToU8)(this.serialized, this.offset);
        this.offset++;
        return BigInt(value);
    }
    /**
     * Returns the deserialized number.
     *
     * @return {number}
     */
    nextU32() {
        const value = (0, serializers_1.bytesToU32)(this.serialized, this.offset);
        this.offset += 4;
        return value;
    }
    /**
     * Returns the deserialized number.
     *
     * @return {BigInt}
     */
    nextU64() {
        const value = (0, serializers_1.bytesToU64)(this.serialized, this.offset);
        this.offset += 8;
        return value;
    }
    /**
     * Returns the deserialized boolean
     */
    nextBool() {
        return !!this.serialized[this.offset++];
    }
    /**
     * Returns the deserialized number.
     *
     * @return {number}
     */
    nextI32() {
        const value = (0, serializers_1.bytesToI32)(this.serialized, this.offset);
        this.offset += 4;
        return value;
    }
    /**
     * Returns the deserialized number.
     *
     * @return {BigInt}
     */
    nextI64() {
        const value = (0, serializers_1.bytesToI64)(this.serialized, this.offset);
        this.offset += 8;
        return BigInt(value);
    }
    /**
     * Returns the deserialized number.
     *
     * @return {number}
     */
    nextF32() {
        const value = (0, serializers_1.bytesToF32)(this.serialized, this.offset);
        this.offset += 4;
        return value;
    }
    /**
     * Returns the deserialized number.
     *
     * @return {number}
     */
    nextF64() {
        const value = (0, serializers_1.bytesToF64)(this.serialized, this.offset);
        this.offset += 8;
        return value;
    }
    /**
     * @return {Uint8Array} bytearray
     */
    nextUint8Array() {
        const length = this.nextU32();
        const byteArray = this.serialized.slice(this.offset, this.offset + length);
        this.offset += length;
        return byteArray;
    }
    /**
     * This function deserialize an object implementing ISerializable
     *
     * @param Clazz - the class constructor prototype T.prototype
     * @returns the deserialized object T
     */
    nextSerializable(Clazz) {
        let deserializationResult = (0, serializers_1.deserializeObj)(this.serialized, this.offset, Clazz);
        this.offset = deserializationResult.offset;
        return deserializationResult.instance;
    }
    /**
     * @returns the deserialized array of object that implement ISerializable
     */
    nextSerializableObjectArray(Clazz) {
        const length = this.nextU32();
        if (this.offset + length > this.serialized.length) {
            throw new Error("can't deserialize length of array from given argument");
        }
        const bufferSize = length;
        if (bufferSize === 0) {
            return [];
        }
        const buffer = this.getNextData(bufferSize);
        const value = (0, serializers_1.bytesToSerializableObjectArray)(buffer, Clazz);
        this.offset += bufferSize;
        return value;
    }
    /**
     * @returns the next array of object that are native type
     */
    nextNativeTypeArray(typedArrayType) {
        const length = this.nextU32();
        if (this.offset + length > this.serialized.length) {
            throw new Error("can't deserialize length of array from given argument");
        }
        const bufferSize = length;
        if (bufferSize === 0) {
            return [];
        }
        const buffer = this.getNextData(bufferSize);
        const value = (0, serializers_1.bytesToNativeTypeArray)(buffer, typedArrayType);
        this.offset += bufferSize;
        return value;
    }
    // Setter
    /**
     *
     * @param {number} value
     * @return {Args}
     */
    addU8(value) {
        this.serialized = this.concatArrays(this.serialized, (0, serializers_1.u8toByte)(value));
        this.offset++;
        return this;
    }
    /**
     *
     * @param {boolean} value
     * @return {Args}
     */
    addBool(value) {
        this.serialized = this.concatArrays(this.serialized, (0, serializers_1.u8toByte)(value ? 1 : 0));
        this.offset++;
        return this;
    }
    /**
     *
     * @param {number} value
     * @return {Args}
     */
    addU32(value) {
        this.serialized = this.concatArrays(this.serialized, (0, serializers_1.u32ToBytes)(value));
        this.offset += 4;
        return this;
    }
    /**
     *
     * @param {BigInt} bigInt
     * @return {Args}
     */
    addU64(bigInt) {
        this.serialized = this.concatArrays(this.serialized, (0, serializers_1.u64ToBytes)(bigInt));
        this.offset += 8;
        return this;
    }
    /**
     *
     * @param {number} value
     * @return {Args}
     */
    addI32(value) {
        this.serialized = this.concatArrays(this.serialized, (0, serializers_1.i32ToBytes)(value));
        this.offset += 4;
        return this;
    }
    /**
     *
     * @param {BigInt} bigInt
     * @return {Args}
     */
    addI64(bigInt) {
        this.serialized = this.concatArrays(this.serialized, (0, serializers_1.i64ToBytes)(bigInt));
        this.offset += 8;
        return this;
    }
    /**
     *
     * @param {number} value
     * @return {Args}
     */
    addF32(value) {
        this.serialized = this.concatArrays(this.serialized, (0, serializers_1.f32ToBytes)(value));
        this.offset += 4;
        return this;
    }
    /**
     *
     * @param {number} value
     * @return {Args}
     */
    addF64(value) {
        this.serialized = this.concatArrays(this.serialized, (0, serializers_1.f64ToBytes)(value));
        this.offset += 8;
        return this;
    }
    /**
     *
     * @param {Uint8Array} array
     * @return {Args}
     */
    addUint8Array(array) {
        this.addU32(array.length);
        this.serialized = this.concatArrays(this.serialized, array);
        this.offset += array.length;
        return this;
    }
    /**
     * Adds an argument to the serialized byte string if the argument is an
     * instance of a handled type (String of 4294967295 characters maximum)
     *
     * @param {string} arg the argument to add
     *
     * @return {Args} the modified Arg instance
     */
    addString(arg) {
        const maxSize = 4294967295;
        const size = arg.length;
        if (size > maxSize) {
            console.warn('input string is too long, it will be truncated');
            arg = arg.slice(0, maxSize);
        }
        const serialized = (0, serializers_1.strToBytes)(arg);
        this.addU32(serialized.length);
        this.serialized = this.concatArrays(this.serialized, (0, serializers_1.strToBytes)(arg));
        return this;
    }
    /**
     * Adds a serializable object that implements the ISerializable interface
     *
     * @param {ISerializable} the argument to add
     * @return {Args} the modified Arg instance
     */
    addSerializable(value) {
        const serializedValue = value.serialize();
        this.serialized = this.concatArrays(this.serialized, serializedValue);
        this.offset += serializedValue.length;
        return this;
    }
    /**
     * Adds an array of element that implement `ISerializable`.
     *
     * @remarks
     * This will perform a deep copy of your objects thanks to the `serialize` method you define in your class.
     *
     * @see {@link ISerializable}
     *
     * @param arg - the argument to add
     * @returns the modified Arg instance
     */
    addSerializableObjectArray(arg) {
        const content = (0, serializers_1.serializableObjectsArrayToBytes)(arg);
        this.addU32(content.length);
        this.serialized = this.concatArrays(this.serialized, content);
        return this;
    }
    /**
     * Adds an array.
     *
     * @remarks
     * If the type of the values of the array is not native type, this will serialize the pointers, which is certainly not
     * what you want. You can only serialize properly array of native types or array of `Serializable` object.
     *
     * @see {@link addSerializableObjectArray}
     *
     * @param arg - the argument to add
     * @returns the modified Arg instance
     */
    addNativeTypeArray(arg, type) {
        const content = (0, serializers_1.nativeTypeArrayToBytes)(arg, type);
        this.addU32(content.length);
        this.serialized = this.concatArrays(this.serialized, content);
        return this;
    }
    // Utils
    /**
     * Internal function to concat to Uint8Array.
     *
     * @param {Uint8Array} a first array to concat
     * @param {Uint8Array | ArrayBuffer} b second array to concat
     *
     * @return {Uint8Array} the concatenated array
     */
    concatArrays(a, b) {
        return new Uint8Array([...a, ...b]);
    }
    /**
     * Returns the data of requested size for current offset
     *
     * @param size - The data size
     * @return {Uint8Array} the slice of the serialized internal buffer
     */
    getNextData(size) {
        return this.serialized.slice(this.offset, this.offset + size);
    }
}
exports.Args = Args;
//# sourceMappingURL=arguments.js.map