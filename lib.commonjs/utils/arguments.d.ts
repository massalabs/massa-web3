import { ISerializable } from './serializers/ISerializable';
import { TypedArrayUnit } from './serializers';
/**
 * Args for remote function call.
 *
 * This class can serialize javascript native types into bytes, in order to
 * make smart-contract function call easier.
 *
 */
export declare class Args {
    private offset;
    private serialized;
    /**
     *
     * @param {string} serialized
     */
    constructor(serialized?: Array<number> | Uint8Array, offset?: number);
    /**
     * Returns the current offset
     *
     * @returns {number} the current offset
     */
    getOffset(): number;
    /**
     * Returns the serialized array to pass to CallSC.
     *
     * @returns the serialized array
     */
    serialize(): Array<number>;
    /**
     * Returns the deserialized string.
     *
     * @returns the deserialized string
     */
    nextString(): string;
    /**
     * Returns the deserialized number.
     *
     * @returns
     */
    nextU8(): bigint;
    /**
     * Returns the deserialized number.
     *
     * @return {number}
     */
    nextU32(): number;
    /**
     * Returns the deserialized number.
     *
     * @return {BigInt}
     */
    nextU64(): bigint;
    /**
     * Returns the deserialized boolean
     */
    nextBool(): boolean;
    /**
     * Returns the deserialized number.
     *
     * @return {number}
     */
    nextI32(): number;
    /**
     * Returns the deserialized number.
     *
     * @return {BigInt}
     */
    nextI64(): bigint;
    /**
     * Returns the deserialized number.
     *
     * @return {number}
     */
    nextF32(): number;
    /**
     * Returns the deserialized number.
     *
     * @return {number}
     */
    nextF64(): number;
    /**
     * @return {Uint8Array} bytearray
     */
    nextUint8Array(): Uint8Array;
    /**
     * This function deserialize an object implementing ISerializable
     *
     * @param Clazz - the class constructor prototype T.prototype
     * @returns the deserialized object T
     */
    nextSerializable<T extends ISerializable<T>>(Clazz: new () => T): T;
    /**
     * @returns the deserialized array of object that implement ISerializable
     */
    nextSerializableObjectArray<T extends ISerializable<T>>(Clazz: new () => T): T[];
    /**
     * @returns the next array of object that are native type
     */
    nextNativeTypeArray<T extends TypedArrayUnit>(typedArrayType: T): T[];
    /**
     *
     * @param {number} value
     * @return {Args}
     */
    addU8(value: number): Args;
    /**
     *
     * @param {boolean} value
     * @return {Args}
     */
    addBool(value: boolean): Args;
    /**
     *
     * @param {number} value
     * @return {Args}
     */
    addU32(value: number): Args;
    /**
     *
     * @param {BigInt} bigInt
     * @return {Args}
     */
    addU64(bigInt: bigint): Args;
    /**
     *
     * @param {number} value
     * @return {Args}
     */
    addI32(value: number): Args;
    /**
     *
     * @param {BigInt} bigInt
     * @return {Args}
     */
    addI64(bigInt: bigint): Args;
    /**
     *
     * @param {number} value
     * @return {Args}
     */
    addF32(value: number): Args;
    /**
     *
     * @param {number} value
     * @return {Args}
     */
    addF64(value: number): Args;
    /**
     *
     * @param {Uint8Array} array
     * @return {Args}
     */
    addUint8Array(array: Uint8Array): Args;
    /**
     * Adds an argument to the serialized byte string if the argument is an
     * instance of a handled type (String of 4294967295 characters maximum)
     *
     * @param {string} arg the argument to add
     *
     * @return {Args} the modified Arg instance
     */
    addString(arg: string): Args;
    /**
     * Adds a serializable object that implements the ISerializable interface
     *
     * @param {ISerializable} the argument to add
     * @return {Args} the modified Arg instance
     */
    addSerializable<T>(value: ISerializable<T>): Args;
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
    addSerializableObjectArray<T extends ISerializable<T>>(arg: T[]): Args;
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
    addNativeTypeArray<T extends TypedArrayUnit>(arg: any[], type: T): Args;
    /**
     * Internal function to concat to Uint8Array.
     *
     * @param {Uint8Array} a first array to concat
     * @param {Uint8Array | ArrayBuffer} b second array to concat
     *
     * @return {Uint8Array} the concatenated array
     */
    private concatArrays;
    /**
     * Returns the data of requested size for current offset
     *
     * @param size - The data size
     * @return {Uint8Array} the slice of the serialized internal buffer
     */
    private getNextData;
}
