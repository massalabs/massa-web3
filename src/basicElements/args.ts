import {
  Bit,
  U8,
  U32,
  U64,
  U128,
  arrayToBytes,
  bytesToArray,
  bytesToF32,
  bytesToF64,
  bytesToI128,
  bytesToI32,
  bytesToI64,
  bytesToSerializableObjectArray,
  bytesToStr,
  bytesToU256,
  deserializeObj,
  f32ToBytes,
  f64ToBytes,
  i128ToBytes,
  i32ToBytes,
  i64ToBytes,
  serializableObjectsArrayToBytes,
  strToBytes,
  u128ToBytes,
  u256ToBytes,
} from './serializers'

/**
 * Interface for serializable objects
 *
 * @see serialize - serialize object to Uint8Array
 * @see deserialize - deserialize Uint8Array to object
 */
export type Serializable<T> = {
  serialize(): Uint8Array
  deserialize(data: Uint8Array, offset: number): DeserializedResult<T>
}

/**
 * Interface for deserialized result
 *
 * @see instance - deserialized instance
 * @see offset - offset of the deserialized instance
 */
export type DeserializedResult<T> = {
  instance: T
  offset: number
}

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
  I128,
  U128,
  U256,
  I32,
  I64,
  F32,
  F64,
  ARRAY,
  UINT8ARRAY,
  SERIALIZABLE,
  //eslint-disable-next-line @typescript-eslint/naming-convention
  SERIALIZABLE_OBJECT_ARRAY,
}

export enum ArrayTypes {
  STRING,
  BOOL,
  U8,
  U32,
  U64,
  I128,
  U128,
  U256,
  I32,
  I64,
  F32,
  F64,
}

export type IParam = {
  type: ArgTypes
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
}

/**
 * Native types in AssemblyScript
 *
 * @remarks
 * These are the types that can be used in AssemblyScript
 */
export type NativeType = string | boolean | number | bigint

const BYTES_32_OFFSET = 4
const BYTES_64_OFFSET = 8
export const BYTES_128_OFFSET = 16
export const BYTES_256_OFFSET = 32
export const DEFAULT_OFFSET = 0
const ZERO = 0

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
  private argsList: IParam[] = []

  /**
   * Constructor to either serialize or deserialize data passed from/to DApps and remote Smart contracts.
   *
   * @param serialized - The optional serialized arguments to deserialize.
   * @param offset - The optional offset to start deserializing from.
   */
  constructor(
    public serialized = new Uint8Array(),
    public offset = DEFAULT_OFFSET
  ) {}

  public getArgsList(): IParam[] {
    return this.argsList
  }

  /**
   * Returns the current deserialization offset of the serialized byte array.
   *
   * @returns the current offset
   */
  public getOffset(): number {
    return this.offset
  }

  /**
   * Returns the serialized byte array.
   *
   * @returns A byte array.
   */
  public serialize(): Uint8Array {
    return Uint8Array.from(this.serialized)
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
    const length = Number(this.nextU32())
    const end = this.offset + length
    const result = bytesToStr(this.serialized.slice(this.offset, end))

    this.offset = end
    return result
  }

  private nextInteger(
    extractor: (
      buffer: Uint8Array,
      offset: number
    ) => { value: bigint; offset: number }
  ): bigint {
    const { value, offset } = extractor(this.serialized, this.offset)
    this.offset = offset
    return value
  }

  /**
   * Returns the next unsigned byte in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number.
   */
  public nextU8(): U8.U8 {
    return this.nextInteger(U8.fromBuffer)
  }

  /**
   * Returns the next unsigned integer in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number
   */
  public nextU32(): U32.U32 {
    return this.nextInteger(U32.fromBuffer)
  }

  /**
   * Returns the next long integer in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number.
   */
  public nextU64(): U64.U64 {
    return this.nextInteger(U64.fromBuffer)
  }

  /**
   * Returns the next int128 in the serialized byte array.
   *
   * @remarks
   * Increments to offset to point the data after the one that as been deserialized in the byte array.
   *
   * @returns the deserialized number.
   */
  public nextI128(): bigint {
    const value = bytesToI128(this.serialized, this.offset)

    this.offset += BYTES_128_OFFSET
    return value
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
    return this.nextInteger(U128.fromBuffer)
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
    const value = bytesToU256(this.serialized, this.offset)

    this.offset += BYTES_256_OFFSET
    return value
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
    return !!this.serialized[this.offset++]
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
    const value = bytesToI32(this.serialized, this.offset)

    this.offset += BYTES_32_OFFSET
    return value
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
    const value = bytesToI64(this.serialized, this.offset)

    this.offset += BYTES_64_OFFSET
    return BigInt(value)
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
    const value = bytesToF32(this.serialized, this.offset)

    this.offset += BYTES_32_OFFSET
    return value
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
    const value = bytesToF64(this.serialized, this.offset)

    this.offset += BYTES_64_OFFSET
    return value
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
    const length = Number(this.nextU32())
    const byteArray = this.serialized.slice(this.offset, this.offset + length)

    this.offset += length
    return byteArray
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
  public nextSerializable<T extends Serializable<T>>(ctor: new () => T): T {
    const deserializationResult = deserializeObj(
      this.serialized,
      this.offset,
      ctor
    )
    this.offset = deserializationResult.offset
    return deserializationResult.instance
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
  public nextSerializableObjectArray<T extends Serializable<T>>(
    ctor: new () => T
  ): T[] {
    const length = Number(this.nextU32())

    if (!length) {
      return []
    }

    if (this.offset + length > this.serialized.length) {
      throw new Error("can't deserialize length of array from given argument")
    }

    const buffer = this.getNextData(length)

    const value = bytesToSerializableObjectArray<T>(buffer, ctor)
    this.offset += length
    return value
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
    const length = Number(this.nextU32())

    if (!length) {
      return []
    }

    if (this.offset + length > this.serialized.length) {
      throw new Error("can't deserialize length of array from given argument")
    }

    const buffer = this.getNextData(length)
    const value = bytesToArray<T>(buffer, type)
    this.offset += length
    return value
  }

  // Setter

  /**
   * Adds a unsigned byte to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addU8(value: U8.U8): this {
    this.serialized = Args.concatArrays(this.serialized, U8.toBytes(value))
    this.offset++
    this.argsList.push({ type: ArgTypes.U8, value: value })
    return this
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
      U8.toBytes(value ? Bit.ONE : Bit.ZERO)
    )
    this.offset++
    this.argsList.push({ type: ArgTypes.BOOL, value: value })
    return this
  }

  /**
   * Adds an unsigned integer to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addU32(value: U32.U32): this {
    this.serialized = Args.concatArrays(this.serialized, U32.toBytes(value))
    this.offset += U32.SIZE_BYTE
    this.argsList.push({ type: ArgTypes.U32, value: value })
    return this
  }

  /**
   * Adds an unsigned long integer to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addU64(value: U64.U64): this {
    this.serialized = Args.concatArrays(this.serialized, U64.toBytes(value))

    this.offset += U64.SIZE_BYTE
    this.argsList.push({ type: ArgTypes.U64, value: value })
    return this
  }

  /**
   * Adds a signed long integer to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addI128(bigInt: bigint): this {
    this.serialized = Args.concatArrays(this.serialized, i128ToBytes(bigInt))

    this.offset += BYTES_128_OFFSET
    this.argsList.push({ type: ArgTypes.I128, value: bigInt })
    return this
  }

  /**
   * Adds an unsigned long integer to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addU128(bigInt: U128.U128): this {
    this.serialized = Args.concatArrays(this.serialized, u128ToBytes(bigInt))

    this.offset += U128.SIZE_BYTE
    this.argsList.push({ type: ArgTypes.U128, value: bigInt })
    return this
  }

  /**
   * Adds an unsigned long integer to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addU256(bigInt: bigint): this {
    this.serialized = Args.concatArrays(this.serialized, u256ToBytes(bigInt))

    this.offset += BYTES_256_OFFSET
    this.argsList.push({ type: ArgTypes.U256, value: bigInt })
    return this
  }

  /**
   * Adds a signed integer to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addI32(value: number): this {
    this.serialized = Args.concatArrays(this.serialized, i32ToBytes(value))
    this.offset += BYTES_32_OFFSET
    this.argsList.push({ type: ArgTypes.I32, value: value })
    return this
  }

  /**
   * Adds a signed long integer to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addI64(bigInt: bigint): this {
    this.serialized = Args.concatArrays(this.serialized, i64ToBytes(bigInt))
    this.offset += BYTES_64_OFFSET
    this.argsList.push({ type: ArgTypes.I64, value: bigInt })
    return this
  }

  /**
   * Adds a floating number to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addF32(value: number): this {
    this.serialized = Args.concatArrays(this.serialized, f32ToBytes(value))
    this.offset += BYTES_32_OFFSET
    this.argsList.push({ type: ArgTypes.F32, value: value })
    return this
  }

  /**
   * Adds a long floating number to the serialized arguments.
   *
   * @param value - the number to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addF64(value: number): this {
    this.serialized = Args.concatArrays(this.serialized, f64ToBytes(value))
    this.offset += BYTES_64_OFFSET
    this.argsList.push({ type: ArgTypes.F64, value: value })
    return this
  }

  /**
   * Adds a byte array integer to the serialized arguments.
   *
   * @param array - the array to add.
   *
   * @returns the serialized arguments to be able to chain `add` method calls.
   */
  public addUint8Array(array: Uint8Array): this {
    this.addU32(U32.fromNumber(array.length))
    this.serialized = Args.concatArrays(this.serialized, array)
    this.offset += array.length
    // Remove the U32 from the argsList
    this.argsList.pop()
    this.argsList.push({ type: ArgTypes.UINT8ARRAY, value: array })
    return this
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
    const maxSize = 4294967295
    const size = value.length

    if (size > maxSize) {
      // eslint-disable-next-line no-console
      console.warn('input string is too long, it will be truncated')
      value = value.slice(ZERO, maxSize)
    }

    const serialized = strToBytes(value)
    this.addU32(U32.fromNumber(serialized.length))
    this.serialized = Args.concatArrays(this.serialized, strToBytes(value))
    this.offset += strToBytes(value).length

    // Remove the U32 from the argsList
    this.argsList.pop()
    this.argsList.push({ type: ArgTypes.STRING, value: value })

    return this
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
  public addSerializable<T>(value: Serializable<T>): this {
    const serializedValue = value.serialize()
    this.serialized = Args.concatArrays(this.serialized, serializedValue)
    this.offset += serializedValue.length
    this.argsList.push({ type: ArgTypes.SERIALIZABLE, value: value })
    return this
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
  public addSerializableObjectArray<T extends Serializable<T>>(arg: T[]): this {
    const content: Uint8Array = serializableObjectsArrayToBytes(arg)
    this.addU32(U32.fromNumber(content.length))
    this.serialized = Args.concatArrays(this.serialized, content)
    this.offset += content.length

    // Remove the U32 from the argsList
    this.argsList.pop()
    this.argsList.push({
      type: ArgTypes.SERIALIZABLE_OBJECT_ARRAY,
      value: arg,
    })
    return this
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
    const content = arrayToBytes(arg, type)
    this.addU32(U32.fromNumber(content.length))
    this.serialized = Args.concatArrays(this.serialized, content)
    this.offset += content.length

    // Remove the U32 from the argsList
    this.argsList.pop()
    this.argsList.push({ type: ArgTypes.ARRAY, value: arg })
    return this
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
    return new Uint8Array([...a, ...b])
  }

  /**
   * Returns the data of requested size for current offset
   *
   * @param size - The data size
   * @returns the slice of the serialized internal buffer
   */
  private getNextData(size: number): Uint8Array {
    return this.serialized.slice(this.offset, this.offset + size)
  }
}
