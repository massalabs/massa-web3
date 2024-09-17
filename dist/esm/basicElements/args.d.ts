import { U8, U16, U32, U64, U128, U256, I8, I16, I32, I64, I128, I256 } from './serializers';
/**
 * Interface for serializable objects
 *
 * @see serialize - serialize object to Uint8Array
 * @see deserialize - deserialize Uint8Array to object
 */
export type Serializable<T> = {
    serialize(): Uint8Array;
    deserialize(data: Uint8Array, offset: number): DeserializedResult<T>;
};
/**
 * Interface for deserialized result
 *
 * @see instance - deserialized instance
 * @see offset - offset of the deserialized instance
 */
export type DeserializedResult<T> = {
    instance: T;
    offset: number;
};
/**
 * Typed Arguments facilitating the differentiation
 * between different argument types due to Javascript's
 * single number type.
 *
 * @remarks In AssemblyScript the latter are all native types
 */
export declare enum ArgTypes {
    STRING = 0,
    BOOL = 1,
    U8 = 2,
    U16 = 3,
    U32 = 4,
    U64 = 5,
    U128 = 6,
    U256 = 7,
    I8 = 8,
    I16 = 9,
    I32 = 10,
    I64 = 11,
    I128 = 12,
    I256 = 13,
    F32 = 14,
    F64 = 15,
    ARRAY = 16,
    UINT8ARRAY = 17,
    SERIALIZABLE = 18,
    SERIALIZABLE_OBJECT_ARRAY = 19
}
export declare enum ArrayTypes {
    STRING = 0,
    BOOL = 1,
    U8 = 2,
    U16 = 3,
    U32 = 4,
    U64 = 5,
    U128 = 6,
    U256 = 7,
    I8 = 8,
    I16 = 9,
    I32 = 10,
    I64 = 11,
    I128 = 12,
    I256 = 13,
    F32 = 14,
    F64 = 15
}
export type IParam = {
    type: ArgTypes;
    value: any;
};
/**
 * Native types in AssemblyScript
 *
 * @remarks
 * These are the types that can be used in AssemblyScript
 */
export type NativeType = string | boolean | number | bigint;
export declare const DEFAULT_OFFSET = 0;
/**
 * Storage and serialization class for remote function call arguments.
 *
 * @remarks
 * This class can serialize typescript native types into bytes, in order to
 * make smart-contract function call easier.
 * It also can deserialize bytes.
 *
 */
export declare class Args {
    serialized: Uint8Array;
    offset: number;
    private argsList;
    /**
     * Constructor to either serialize or deserialize data passed from/to DApps and remote Smart contracts.
     *
     * @param serialized - The optional serialized arguments to deserialize.
     * @param offset - The optional offset to start deserializing from.
     */
    constructor(serialized?: Uint8Array, offset?: number);
    getArgsList(): IParam[];
    /**
     * Returns the current deserialization offset of the serialized byte array.
     *
     * @returns the current offset
     */
    getOffset(): number;
    /**
     * Returns the serialized byte array.
     *
     * @returns A byte array.
     */
    serialize(): Uint8Array;
    /**
     * Returns the next string in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized string
     */
    nextString(): string;
    private nextInteger;
    /**
     * Returns the next unsigned byte in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextU8(): U8.U8;
    /**
     * Returns the next unsigned short integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextU16(): U16.U16;
    /**
     * Returns the next unsigned integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number
     */
    nextU32(): U32.U32;
    /**
     * Returns the next long integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextU64(): U64.U64;
    /**
     * Returns the next uint128 in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextU128(): U128.U128;
    /**
     * Returns the next uint256 in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextU256(): U256.U256;
    /**
     * Returns the next signed byte in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI8(): I8.I8;
    /**
     * Returns the next signed short integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI16(): I16.I16;
    /**
     * Returns the next signed integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI32(): I32.I32;
    /**
     * Returns the next signed long integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI64(): I64.I64;
    /**
     * Returns the next signed long integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI128(): I128.I128;
    /**
     * Returns the next signed long integer in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextI256(): I256.I256;
    /**
     * Returns the next boolean in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized boolean.
     */
    nextBool(): boolean;
    /**
     * Returns the next floating number in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextF32(): number;
    /**
     * Returns the next long floating number in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized number.
     */
    nextF64(): number;
    /**
     * Returns the next sub byte array in the serialized byte array.
     *
     * @remarks
     * Increments to offset to point the data after the one that as been deserialized in the byte array.
     *
     * @returns the deserialized byte array.
     */
    nextUint8Array(): Uint8Array;
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
    nextSerializable<T extends Serializable<T>>(ctor: new () => T): T;
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
    nextSerializableObjectArray<T extends Serializable<T>>(ctor: new () => T): T[];
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
    nextArray<T>(type: ArrayTypes): T[];
    /**
     * Adds a unsigned byte to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addU8(value: U8.U8): this;
    addU16(value: U16.U16): this;
    /**
     * Adds an unsigned integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addU32(value: U32.U32): this;
    /**
     * Adds an unsigned long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addU64(value: U64.U64): this;
    /**
     * Adds an unsigned long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addU128(bigInt: U128.U128): this;
    /**
     * Adds an unsigned long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addU256(bigInt: U256.U256): this;
    /**
     * Adds a signed byte to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI8(value: I8.I8): this;
    /**
     * Adds a signed short integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI16(value: I16.I16): this;
    /**
     * Adds a signed integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI32(value: I32.I32): this;
    /**
     * Adds a signed long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI64(value: I64.I64): this;
    /**
     * Adds a signed long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI128(value: I128.I128): this;
    /**
     * Adds a signed long integer to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addI256(value: I256.I256): this;
    /**
     * Adds a boolean to the serialized arguments.
     *
     * @param value - the boolean to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addBool(value: boolean): this;
    /**
     * Adds a floating number to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addF32(value: number): this;
    /**
     * Adds a long floating number to the serialized arguments.
     *
     * @param value - the number to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addF64(value: number): this;
    /**
     * Adds a byte array integer to the serialized arguments.
     *
     * @param array - the array to add.
     *
     * @returns the serialized arguments to be able to chain `add` method calls.
     */
    addUint8Array(array: Uint8Array): this;
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
    addString(value: string): this;
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
    addSerializable<T>(value: Serializable<T>): this;
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
    addSerializableObjectArray<T extends Serializable<T>>(arg: T[]): this;
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
    addArray(arg: NativeType[], type: ArrayTypes): this;
    /**
     * Internal function to concat to Uint8Array.
     *
     * @param a - first array to concat
     * @param b - second array to concat
     *
     * @returns the concatenated array
     */
    static concatArrays(a: Uint8Array, b: Uint8Array): Uint8Array;
    /**
     * Returns the data of requested size for current offset
     *
     * @param size - The data size
     * @returns the slice of the serialized internal buffer
     */
    private getNextData;
}
