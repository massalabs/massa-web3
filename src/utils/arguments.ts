import { IDeserializedResult, ISerializable } from '../interfaces/ISerializable';
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
} from './serializers';

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



  // =================================================================================
  public addSerializableObjectArray<T extends ISerializable<T>>(arg: T[]): Args {
    const content: Uint8Array = serializableObjectsArrayToBytes(arg);
    this.addU32(content.length);
    this.serialized = this.concatArrays(this.serialized, content);
    return this;
  }

  public nextSerializableObjectArray<T extends ISerializable<T>>(Clazz: new() => T): T[] {
    const length = this.nextU32();
    if (this.offset + length > this.serialized.length) {
      throw new Error("can't deserialize length of array from given argument");
    }
  
    const bufferSize = length;
  
    if (bufferSize === 0) {
      return [];
    }
  
    const buffer = this.getNextData(bufferSize);
  
    const value = this.bytesToSerializableObjectArray<T>(buffer, Clazz);
    this.offset += bufferSize;
    return value;
  }

  private getNextData(size: number): Uint8Array {
    return this.serialized.slice(this.offset, this.offset + size);
  }

  private bytesToSerializableObjectArray<T extends ISerializable<T>>(
    source: Uint8Array,
    Clazz: new() => T
  ): T[] {
    const array: T[] = [];
    let offset = 0;
  
    while (offset < source.length) {
      let deserializationResult = deserializeObj(source, offset, Clazz);
      offset = deserializationResult.offset;
      array.push(deserializationResult.instance);
    }
  
    return array;
  }
}

export function serializableObjectsArrayToBytes<T extends ISerializable<T>>(
  source: T[],
): Uint8Array {
  const nbElements = source.length;
  const pointers = new Array<Uint8Array>(nbElements);
  const sizes = new Array<number>(nbElements);
  let totalLength = 0;

  for (let i = 0; i < nbElements; i++) {
    const bytes: Uint8Array = source[i].serialize();
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

function deserializeObj<T extends ISerializable<T>>(data: Uint8Array, offset: number, Clazz: new() => T): IDeserializedResult<T> {
  const deserialized = new Clazz().deserialize(data, offset);
  return deserialized;
}