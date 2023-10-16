import { ISerializable } from './interfaces/ISerializable';
import * as ser from './serializers';

/**
 * Typed Arguments facilitating the differentiation
 * between different argument types due to Javascript's
 * single number type.
 *
 * @remarks In AssemblyScript the latter are all native types
 */
export enum ArgTypes {
  STRING,
  BOOL,
  U8,
  U32,
  U64,
  U128,
  U256,
  I32,
  I64,
  F32,
  F64,
  ARRAY,
  UINT8ARRAY,
  SERIALIZABLE,
  SERIALIZABLE_OBJECT_ARRAY,
}

export enum ArrayTypes {
  STRING,
  BOOL,
  U8,
  U32,
  U64,
  U128,
  U256,
  I32,
  I64,
  F32,
  F64,
}

export interface IParam {
  type: ArgTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
}

/**
 * Native types in AssemblyScript
 *
 * @remarks
 * These are the types that can be used in AssemblyScript
 */
export type NativeType = string | boolean | number | bigint;

/**
 * Storage and serialization class for remote function call arguments.
 *
 * @remarks
 * This class can serialize typescript native types into bytes, in order to
 * make smart-contract function call easier.
 * It also can deserialize bytes.
 *
 */
export class Args {
  private offset = 0;
  private serialized: Uint8Array;
  private argsList: Array<IParam> = [];

  /**
   * Constructor to either serialize or deserialize data passed from/to DApps and remote Smart contracts.
   *
   * @param serialized - The optional serialized arguments to deserialize.
   * @param offset - The optional offset to start deserializing from.
   */
  constructor(serialized: Array<number> | Uint8Array = [], offset = 0) {
    this.serialized = Uint8Array.from(serialized);
    this.offset = offset;
  }

  public getArgsList(): Array<IParam> {
    return this.argsList;
  }

  /**
   * Returns the current deserialization offset of the serialized byte array.
   *
   * @returns the current offset
   */
  public getOffset(): number {
    return this.offset;
  }

  /**
   * Returns the serialized byte array.
   *
   * @returns A byte array.
   */
  public serialize(): Array<number> {
    return Array.from(this.serialized);
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
  public nextString(): string {
    const length = this.nextU32();
    const end = this.offset + length;
    const result = ser.bytesToStr(this.serialized.slice(this.offset, end));

    this.offset = end;
    return result;
  }

  /**
   * Returns the next unsigned byte in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number.
   */
  public nextU8(): bigint {
    const value = ser.byteToU8(this.serialized, this.offset);

    this.offset++;
    return BigInt(value);
  }

  /**
   * Returns the next unsigned integer in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number
   */
  public nextU32(): number {
    const value = ser.bytesToU32(this.serialized, this.offset);

    this.offset += 4;
    return value;
  }

  /**
   * Returns the next long integer in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number.
   */
  public nextU64(): bigint {
    const value = ser.bytesToU64(this.serialized, this.offset);

    this.offset += 8;
    return value;
  }

  /**
   * Returns the next uint128 in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number.
   */
  public nextU128(): bigint {
    const value = ser.bytesToU128(this.serialized, this.offset);

    this.offset += 16;
    return value;
  }

  /**
   * Returns the next uint256 in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number.
   */
  public nextU256(): bigint {
    const value = ser.bytesToU256(this.serialized, this.offset);

    this.offset += 32;
    return value;
  }

  /**
   * Returns the next boolean in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized boolean.
   */
  nextBool(): boolean {
    return !!this.serialized[this.offset++];
  }

  /**
   * Returns the next signed integer in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number.
   */
  public nextI32(): number {
    const value = ser.bytesToI32(this.serialized, this.offset);

    this.offset += 4;
    return value;
  }

  /**
   * Returns the next signed long integer in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number.
   */
  public nextI64(): bigint {
    const value = ser.bytesToI64(this.serialized, this.offset);

    this.offset += 8;
    return BigInt(value);
  }

  /**
   * Returns the next floating number in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number.
   */
  public nextF32(): number {
    const value = ser.bytesToF32(this.serialized, this.offset);

    this.offset += 4;
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
  public nextF64(): number {
    const value = ser.bytesToF64(this.serialized, this.offset);

    this.offset += 8;
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
  public nextUint8Array(): Uint8Array {
    const length = this.nextU32();
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
  public nextSerializable<T extends ISerializable<T>>(ctor: new () => T): T {
    let deserializationResult = ser.deserializeObj(
      this.serialized,
      this.offset,
      ctor,
    );
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
  public nextSerializableObjectArray<T extends ISerializable<T>>(
    ctor: new () => T,
  ): T[] {
    const length = this.nextU32();

    if (!length) {
      return [];
    }

    if (this.offset + length > this.serialized.length) {
      throw new Error("can't deserialize length of array from given argument");
    }

    const buffer = this.getNextData(length);

    const value = ser.bytesToSerializableObjectArray<T>(buffer, ctor);
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
  nextArray<T>(type: ArrayTypes): T[] {
    const length = this.nextU32();

    if (!length) {
      return [];
    }

    if (this.offset + length > this.serialized.length) {
      throw new Error("can't deserialize length of array from given argument");
    }

    const buffer = this.getNextData(length);
    const value = ser.bytesToArray<T>(buffer, type);
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
  public addU8(value: number): this {
    this.serialized = Args.concatArrays(this.serialized, ser.u8toByte(value));
    this.offset++;
    this.argsList.push({ type: ArgTypes.U8, value: value });
    return this;
  }

  /**
   * Adds a boolean to the serialized arguments.
   *
   * @param value - the boolean to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addBool(value: boolean): this {
    this.serialized = Args.concatArrays(
      this.serialized,
      ser.u8toByte(value ? 1 : 0),
    );
    this.offset++;
    this.argsList.push({ type: ArgTypes.BOOL, value: value });
    return this;
  }

  /**
   * Adds an unsigned integer to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addU32(value: number): this {
    this.serialized = Args.concatArrays(this.serialized, ser.u32ToBytes(value));
    this.offset += 4;
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
  public addU64(bigInt: bigint): this {
    this.serialized = Args.concatArrays(
      this.serialized,
      ser.u64ToBytes(bigInt),
    );

    this.offset += 8;
    this.argsList.push({ type: ArgTypes.U64, value: bigInt });
    return this;
  }

  /**
   * Adds an unsigned long integer to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addU128(bigInt: bigint): this {
    this.serialized = Args.concatArrays(
      this.serialized,
      ser.u128ToBytes(bigInt),
    );

    this.offset += 16;
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
  public addU256(bigInt: bigint): this {
    this.serialized = Args.concatArrays(
      this.serialized,
      ser.u256ToBytes(bigInt),
    );

    this.offset += 32;
    this.argsList.push({ type: ArgTypes.U256, value: bigInt });
    return this;
  }

  /**
   * Adds a signed integer to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addI32(value: number): this {
    this.serialized = Args.concatArrays(this.serialized, ser.i32ToBytes(value));
    this.offset += 4;
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
  public addI64(bigInt: bigint): this {
    this.serialized = Args.concatArrays(
      this.serialized,
      ser.i64ToBytes(bigInt),
    );
    this.offset += 8;
    this.argsList.push({ type: ArgTypes.I64, value: bigInt });
    return this;
  }

  /**
   * Adds a floating number to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addF32(value: number): this {
    this.serialized = Args.concatArrays(this.serialized, ser.f32ToBytes(value));
    this.offset += 4;
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
  public addF64(value: number): this {
    this.serialized = Args.concatArrays(this.serialized, ser.f64ToBytes(value));
    this.offset += 8;
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
  public addUint8Array(array: Uint8Array): this {
    this.addU32(array.length);
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
  public addString(value: string): this {
    const maxSize = 4294967295;
    const size = value.length;

    if (size > maxSize) {
      // eslint-disable-next-line no-console
      console.warn('input string is too long, it will be truncated');
      value = value.slice(0, maxSize);
    }

    const serialized = ser.strToBytes(value);
    this.addU32(serialized.length);
    this.serialized = Args.concatArrays(this.serialized, ser.strToBytes(value));
    this.offset += ser.strToBytes(value).length;

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
  public addSerializable<T>(value: ISerializable<T>): this {
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
  public addSerializableObjectArray<T extends ISerializable<T>>(
    arg: T[],
  ): this {
    const content: Uint8Array = ser.serializableObjectsArrayToBytes(arg);
    this.addU32(content.length);
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
  addArray(arg: NativeType[], type: ArrayTypes): this {
    const content = ser.arrayToBytes(arg, type);
    this.addU32(content.length);
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
  static concatArrays(a: Uint8Array, b: Uint8Array): Uint8Array {
    return new Uint8Array([...a, ...b]);
  }

  /**
   * Returns the data of requested size for current offset
   *
   * @param size - The data size
   * @returns the slice of the serialized internal buffer
   */
  private getNextData(size: number): Uint8Array {
    return this.serialized.slice(this.offset, this.offset + size);
  }
}
