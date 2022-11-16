import {Address} from './address';
import {ByteArray} from '@massalabs/as/assembly/byteArray';

/**
 * Args for remote function call.
 *
 * This class can serialize assembly script native types into bytes, in order to
 * make smart-contract function call easier.
 *
 * In a smart-contract exposed function, use this class to deserialize the string
 * argument, using the `next...` methods.
 *
 * In a smart-contract, to call another smart-contract function, use this class
 * to serialize the arguments you want to pass to the smart-contract function
 * call.
 *
 */
export class Args {
  private offset: i64 = 0;
  private serialized: string = '';

  /**
   *
   * @param {string} serialized
   */
  constructor(serialized: string = '') {
    this.serialized = serialized;
  }

  /**
   * Returns the serialized string to pass to CallSC.
   *
   * @return {string} the serialized string
   */
  serialize(): string {
    return this.serialized;
  }

  // getters

  /**
   * Returns the deserialized address.
   *
   * @return {Address} the address
   */
  nextAddress(): Address {
    const address = new Address();
    this.offset = address.fromStringSegment(
      this.serialized,
      this.offset as i32,
    );
    return address;
  }

  /**
   * Returns the deserialized string.
   *
   * @return {string} the string
   */
  nextString(): string {
    const length = this.nextU32();
    let offset: i32 = this.offset as i32;
    const end = offset + length;
    const result = this.serialized.slice(offset, end);
    this.offset = end;
    return result;
  }

  /**
   * Returns the deserialized number as u64.
   *
   * @return {u64}
   */
  nextU64(): u64 {
    const byteArray = this.fromByteString(this.serialized);
    const value = this.toU64(byteArray, this.offset as u8);
    this.offset += 8;
    return value;
  }

  /**
   * Returns the deserialized number as i64.
   *
   * @return {i64}
   */
  nextI64(): i64 {
    const byteArray = this.fromByteString(this.serialized);
    const value = changetype<i64>(this.toU64(byteArray, this.offset as u8));
    this.offset += 8;
    return value;
  }

  /**
   * Returns the deserialized number as u32.
   *
   * @return {u32}
   */
  nextU32(): u32 {
    const byteArray = this.fromByteString(this.serialized);
    const value = this.toU32(byteArray, this.offset as u8);
    this.offset += 4;
    return value;
  }

  /**
   * Returns the deserialized number as i32.
   *
   * @return {i32}
   */
  nextI32(): i32 {
    const byteArray = this.fromByteString(this.serialized);
    const value = changetype<i32>(this.toU32(byteArray, this.offset as u8));
    this.offset += 4;
    return value;
  }

  // Setter

  /**
   * Adds an argument to the serialized byte string if the argument is an
   * instance of a handled type (String of u32.MAX_VALUE characters maximum,
   * Address, u32, i32, u64, i64).
   *
   * @param {T} arg the argument to add
   *
   * @return {Args} the modified Arg instance
   */
  add<T>(arg: T): Args {
    if (arg instanceof Address) {
      this.serialized = this.serialized.concat(arg.toStringSegment());
    } else if (arg instanceof String) {
      const str: string = arg.toString();
      this.add<u32>(str.length);
      this.serialized = this.serialized.concat(str as string);
    } else if (arg instanceof u32) {
      this.serialized = this.serialized.concat(
        ByteArray.fromU32(arg as u32).toByteString(),
      );
    } else if (arg instanceof i64) {
      this.serialized = this.serialized.concat(
        ByteArray.fromI64(arg as i64).toByteString(),
      );
    } else if (arg instanceof u64) {
      this.serialized = this.serialized.concat(
        ByteArray.fromU64(arg as u64).toByteString(),
      );
    } else if (arg instanceof i32 || typeof arg == 'number') {
      // doing this `const one = 1;`, variable one is instance of i32
      // and typeof number
      this.serialized = this.serialized.concat(
        ByteArray.fromI32(arg as i32).toByteString(),
      );
    }
    return this;
  }

  // Utils

  /**
   * Converts a string into a byte array.
   *
   * @param {string} byteString
   * @return {Uint8Array}
   */
  private fromByteString(byteString: string): Uint8Array {
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = u8(byteString.charCodeAt(i));
    }
    return byteArray;
  }

  /**
   * Converts a byte array into a u64.
   *
   * @param {Uint8Array} byteArray
   * @param {u8} offset
   * @return {u64}
   */
  private toU64(byteArray: Uint8Array, offset: u8 = 0): u64 {
    if (byteArray.length - offset < sizeof<u64>()) {
      return <u64>NaN;
    }

    let x: u64 = 0;
    for (let i = 7; i >= 1; --i) {
      x = (x | byteArray[offset + i]) << 8;
    }
    x = x | byteArray[offset];
    return x;
  }

  /**
   * Converts a byte array into a u32.
   *
   * @param {Uint8Array} byteArray
   * @param {u8} offset
   * @return {u32}
   */
  private toU32(byteArray: Uint8Array, offset: u8 = 0): u32 {
    if (byteArray.length - offset < sizeof<u32>()) {
      return <u32>NaN;
    }

    let x: u32 = 0;
    for (let i = 3; i >= 1; --i) {
      x = (x | byteArray[offset + i]) << 8;
    }
    x = x | byteArray[offset];
    return x;
  }
}
