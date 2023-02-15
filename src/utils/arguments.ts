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
  constructor(serialized: Array<number> | Uint8Array = []) {
    this.serialized = Uint8Array.from(serialized);
  }

  /**
   * Returns the serialized array to pass to CallSC.
   *
   * @returns the serialized array
   */
  serialize(): Array<number> {
    return Array.from(this.serialized);
  }

  // Getters

  /**
   * Returns the deserialized string.
   *
   * @returns the deserialized string
   */
  nextString(): string {
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
  nextU8(): bigint {
    const value = byteToU8(this.serialized, this.offset);
    this.offset++;
    return BigInt(value);
  }

  /**
   * Returns the deserialized number.
   *
   * @return {number}
   */
  nextU32(): number {
    const value = bytesToU32(this.serialized, this.offset);
    this.offset += 4;
    return value;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {BigInt}
   */
  nextU64(): bigint {
    const value = bytesToU64(this.serialized, this.offset);
    this.offset += 8;
    return value;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {number}
   */
  nextI32(): number {
    const value = bytesToI32(this.serialized, this.offset);
    this.offset += 4;
    return value;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {BigInt}
   */
  nextI64(): bigint {
    const value = bytesToI64(this.serialized, this.offset);
    this.offset += 8;
    return BigInt(value);
  }

  /**
   * Returns the deserialized number.
   *
   * @return {number}
   */
  nextF32(): number {
    const value = bytesToF32(this.serialized, this.offset);
    this.offset += 4;
    return value;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {number}
   */
  nextF64(): number {
    const value = bytesToF64(this.serialized, this.offset);
    this.offset += 8;
    return value;
  }

  /**
   * @return {Uint8Array} bytearray
   */
  nextUint8Array(): Uint8Array {
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
  addU8(value: number): Args {
    this.serialized = this.concatArrays(this.serialized, u8toByte(value));
    this.offset++;
    return this;
  }

  /**
   *
   * @param {number} value
   * @return {Args}
   */
  addU32(value: number): Args {
    this.serialized = this.concatArrays(this.serialized, u32ToBytes(value));
    this.offset += 4;
    return this;
  }

  /**
   *
   * @param {BigInt} bigInt
   * @return {Args}
   */
  addU64(bigInt: bigint): Args {
    this.serialized = this.concatArrays(this.serialized, u64ToBytes(bigInt));

    this.offset += 8;

    return this;
  }

  /**
   *
   * @param {number} value
   * @return {Args}
   */
  addI32(value: number): Args {
    this.serialized = this.concatArrays(this.serialized, i32ToBytes(value));
    this.offset += 4;
    return this;
  }

  /**
   *
   * @param {BigInt} bigInt
   * @return {Args}
   */
  addI64(bigInt: bigint): Args {
    this.serialized = this.concatArrays(this.serialized, i64ToBytes(bigInt));
    this.offset += 8;
    return this;
  }

  /**
   *
   * @param {number} value
   * @return {Args}
   */
  addF32(value: number): Args {
    this.serialized = this.concatArrays(this.serialized, f32ToBytes(value));
    this.offset += 4;
    return this;
  }

  /**
   *
   * @param {number} value
   * @return {Args}
   */
  addF64(value: number): Args {
    this.serialized = this.concatArrays(this.serialized, f64ToBytes(value));
    this.offset += 8;
    return this;
  }

  /**
   *
   * @param {Uint8Array} array
   * @return {Args}
   */
  addUint8Array(array: Uint8Array): Args {
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
  addString(arg: string): Args {
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
}
