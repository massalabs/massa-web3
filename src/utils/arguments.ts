/**
 * Args for remote function call.
 *
 * This class can serialize javascript native types into bytes, in order to
 * make smart-contract function call easier.
 *
 */
export default class Args {
  private offset: number = 0;
  private serialized: string = "";

  /**
   *
   * @param {string} serialized
   */
  constructor(serialized: string = "") {
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

  // Getters

  /**
   * Returns the deserialized string.
   *
   * @return {string} the string
   */
  nextString(): string {
    const length = Number(this.nextU32());
    const end = this.offset + length;
    const result = this.serialized.slice(this.offset, end);
    this.offset = end;
    return result;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {BigInt}
   */
  nextU32(): BigInt {
    const byteArray = this.fromByteString(this.serialized);

    if (byteArray.length - this.offset < 4) {
      return BigInt(NaN);
    }

    let value = BigInt(0);

    // encoding is little endian
    for (let i = 3; i >= 1; --i) {
      value = (value | BigInt(byteArray[this.offset + i])) << BigInt(8);
    }

    value = value | BigInt(byteArray[this.offset]);
    this.offset += 4;

    return value;
  }

  // Setter

  /**
   *
   * @param {BigInt} bigInt
   * @return {Args}
   */
  addU32(bigInt): Args {
    const u32 = BigInt.asUintN(32, bigInt);
    const byteArray = new Uint8Array(4);
    for (let i = 0; i < byteArray.length; i++) {
      // extracts the value of the first, second, third or forth byte by moving
      // the _select all bits_ (0xFF) mask
      const targetByte = u32 & (BigInt(0xff) << BigInt(8 * i));
      // reduces the extracted value to one byte by removing
      // already encoded and zeroed byte
      const byte = targetByte >> BigInt(8 * i);
      byteArray[i] = Number(byte);
    }

    this.serialized = this.serialized.concat(this.toByteString(byteArray));

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
    if (typeof arg != "string") {
      console.warn(
        "Wrong arg type, required a string with max length 4294967295"
      );
    } else {
        this.addU32(BigInt(arg.length));
        this.serialized = this.serialized.concat(arg);
    }

    return this;
  }

  // Utils

  /**
   * Returns a byte string.
   *
   * @param {Uint8Array} byteString
   * @return {string}
   */
  toByteString(byteString: Uint8Array): string {
    let s = "";
    for (let i = 0; i < byteString.length; i++) {
      s += String.fromCharCode(byteString[i]);
    }
    return s;
  }

  /**
   * Converts a string into a byte array.
   *
   * @param {string} byteString
   * @return {Uint8Array}
   */
  fromByteString(byteString: string): Uint8Array {
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray;
  }
}
