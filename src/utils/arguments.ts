import { ISerializable } from '../interfaces/ISerializable';
import {
  bytesToF32,
  bytesToF64,
  bytesToI32,
  bytesToI64,
  bytesToStr,
  bytesToU32,
  bytesToU64,
  byteToU8,
  f32ToBytes,
  f64ToBytes,
  i32ToBytes,
  i64ToBytes,
  strToBytes,
  u32ToBytes,
  u64ToBytes,
  u8toByte,
  serializableObjectsArrayToBytes,
  deserializeObj,
  bytesToSerializableObjectArray,
  nativeTypeArrayToBytes,
} from './serializers';

/**
 * Typed Arguments facilitating the differentiation
 * between different argument types due to Javascript's
 * single number type.
 *
 * @remark In Assemblyscript the latter are all native types
 */
export enum TypedArrayUnit {
  U8,
  U16,
  U32,
  U64,
  I32,
  I64,
  F32,
  F64,
}

/**
 * Args for remote function call.
 *
 * This class can serialize javascript native types into bytes, in order to
 * make smart-contract function call easier.
 *
 */
export class Args {
  private offset = 0;
  private serialized: Uint8Array;

  /**
   *
   * @param {string} serialized
   */
  constructor(serialized: Array<number> | Uint8Array = [], offset = 0) {
    this.serialized = Uint8Array.from(serialized);
    this.offset = offset;
  }

  /**
   * Returns the current offset
   *
   * @returns {number} the current offset
   */
  public getOffset(): number {
    return this.offset;
  }

  /**
   * Returns the serialized array to pass to CallSC.
   *
   * @returns the serialized array
   */
  public serialize(): Array<number> {
    return Array.from(this.serialized);
  }

  // Getters

  /**
   * Returns the deserialized string.
   *
   * @returns the deserialized string
   */
  public nextString(): string {
    const length = this.nextU32();
    const end = this.offset + length;
    const result = bytesToStr(this.serialized.slice(this.offset, end));
    this.offset = end;
    return result;
  }

  /**
   * Returns the deserialized number.
   *
   * @returns
   */
  public nextU8(): bigint {
    const value = byteToU8(this.serialized, this.offset);
    this.offset++;
    return BigInt(value);
  }

  /**
   * Returns the deserialized number.
   *
   * @return {number}
   */
  public nextU32(): number {
    const value = bytesToU32(this.serialized, this.offset);
    this.offset += 4;
    return value;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {BigInt}
   */
  public nextU64(): bigint {
    const value = bytesToU64(this.serialized, this.offset);
    this.offset += 8;
    return value;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {number}
   */
  public nextI32(): number {
    const value = bytesToI32(this.serialized, this.offset);
    this.offset += 4;
    return value;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {BigInt}
   */
  public nextI64(): bigint {
    const value = bytesToI64(this.serialized, this.offset);
    this.offset += 8;
    return BigInt(value);
  }

  /**
   * Returns the deserialized number.
   *
   * @return {number}
   */
  public nextF32(): number {
    const value = bytesToF32(this.serialized, this.offset);
    this.offset += 4;
    return value;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {number}
   */
  public nextF64(): number {
    const value = bytesToF64(this.serialized, this.offset);
    this.offset += 8;
    return value;
  }

  /**
   * @return {Uint8Array} bytearray
   */
  public nextUint8Array(): Uint8Array {
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
  public nextSerializable<T extends ISerializable<T>>(Clazz: new () => T): T {
    let deserializationResult = deserializeObj(
      this.serialized,
      this.offset,
      Clazz,
    );
    this.offset = deserializationResult.offset;
    return deserializationResult.instance;
  }

  /**
   * @returns the deserialized array of object that implement ISerializable
   */
  public nextSerializableObjectArray<T extends ISerializable<T>>(
    Clazz: new () => T,
  ): T[] {
    const length = this.nextU32();
    if (this.offset + length > this.serialized.length) {
      throw new Error("can't deserialize length of array from given argument");
    }

    const bufferSize = length;

    if (bufferSize === 0) {
      return [];
    }

    const buffer = this.getNextData(bufferSize);

    const value = bytesToSerializableObjectArray<T>(buffer, Clazz);
    this.offset += bufferSize;
    return value;
  }

  // Setter

  /**
   *
   * @param {number} value
   * @return {Args}
   */
  public addU8(value: number): Args {
    this.serialized = this.concatArrays(this.serialized, u8toByte(value));
    this.offset++;
    return this;
  }

  /**
   *
   * @param {number} value
   * @return {Args}
   */
  public addU32(value: number): Args {
    this.serialized = this.concatArrays(this.serialized, u32ToBytes(value));
    this.offset += 4;
    return this;
  }

  /**
   *
   * @param {BigInt} bigInt
   * @return {Args}
   */
  public addU64(bigInt: bigint): Args {
    this.serialized = this.concatArrays(this.serialized, u64ToBytes(bigInt));

    this.offset += 8;

    return this;
  }

  /**
   *
   * @param {number} value
   * @return {Args}
   */
  public addI32(value: number): Args {
    this.serialized = this.concatArrays(this.serialized, i32ToBytes(value));
    this.offset += 4;
    return this;
  }

  /**
   *
   * @param {BigInt} bigInt
   * @return {Args}
   */
  public addI64(bigInt: bigint): Args {
    this.serialized = this.concatArrays(this.serialized, i64ToBytes(bigInt));
    this.offset += 8;
    return this;
  }

  /**
   *
   * @param {number} value
   * @return {Args}
   */
  public addF32(value: number): Args {
    this.serialized = this.concatArrays(this.serialized, f32ToBytes(value));
    this.offset += 4;
    return this;
  }

  /**
   *
   * @param {number} value
   * @return {Args}
   */
  public addF64(value: number): Args {
    this.serialized = this.concatArrays(this.serialized, f64ToBytes(value));
    this.offset += 8;
    return this;
  }

  /**
   *
   * @param {Uint8Array} array
   * @return {Args}
   */
  public addUint8Array(array: Uint8Array): Args {
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
  public addString(arg: string): Args {
    const maxSize = 4294967295;
    const size = arg.length;

    if (size > maxSize) {
      console.warn('input string is too long, it will be truncated');
      arg = arg.slice(0, maxSize);
    }

    const serialized = strToBytes(arg);
    this.addU32(serialized.length);

    this.serialized = this.concatArrays(this.serialized, strToBytes(arg));

    return this;
  }

  /**
   * Adds a serializable object that implements the ISerializable interface
   *
   * @param {ISerializable} the argument to add
   * @return {Args} the modified Arg instance
   */
  public addSerializable<T>(value: ISerializable<T>): Args {
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
  public addSerializableObjectArray<T extends ISerializable<T>>(
    arg: T[],
  ): Args {
    const content: Uint8Array = serializableObjectsArrayToBytes(arg);
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
  addNativeTypeArray<
    T extends ArrayLike<TypedArrayUnit | Uint8Array | string | boolean>,
  >(arg: T): Args {
    const content = nativeTypeArrayToBytes([]);
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
  private concatArrays(a: Uint8Array, b: Uint8Array): Uint8Array {
    return new Uint8Array([...a, ...b]);
  }

  /**
   * Returns the data of requested size for current offset
   *
   * @param size - The data size
   * @return {Uint8Array} the slice of the serialized internal buffer
   */
  private getNextData(size: number): Uint8Array {
    return this.serialized.slice(this.offset, this.offset + size);
  }
}
