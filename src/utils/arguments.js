/**
 * Args for remote function call.
 *
 * This class can serialize javascript native types into bytes, in order to
 * make smart-contract function call easier.
 *
 */
export default class Args {
  /**
   *
   * @param {string} serialized
   */
  constructor(serialized) {
    if (serialized === void 0) {
      serialized = "";
    }
    this.offset = 0;
    this.serialized = "";
    this.serialized = serialized;
  }

  /**
   * Returns the serialized string to pass to CallSC.
   *
   * @return {string} the serialized string
   */
  serialize() {
    return this.serialized;
  }

  // Getters

  /**
   * Returns the deserialized string.
   *
   * @return {string} the string
   */
  nextString() {
    var length = Number(this.nextU32());
    var offset = this.offset;
    var end = offset + length;
    var result = this.serialized.slice(offset, end);
    this.offset = end;
    return result;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {BigInt}
   */
  nextU32() {
    var byteArray = this.fromByteString(this.serialized);

    if (byteArray.length - this.offset < 4) {
      return NaN;
    }

    var value = 0n;

    // encoding is little endian
    for (var i = 3; i >= 1; --i) {
      value = (value | BigInt(byteArray[this.offset + i])) << BigInt(8);
    }

    value = value | BigInt(byteArray[this.offset]);

    this.offset += 4;
    return value;
  }

  addU32(number) {
    var u32 = BigInt.asUintN(32, number);
    var byteArray = new Uint8Array(4);
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

  // Setter

  /**
   * Adds an argument to the serialized byte string if the argument is an
   * instance of a handled type (String of 4294967295 characters maximum)
   *
   * @param {string} arg the argument to add
   *
   * @return {Args} the modified Arg instance
   */
  addString(arg) {
    if (typeof arg != "string") {
      console.warn(
        "Wrong arg type, required a string with max length 4294967295"
      );
    }

    this.addU32(BigInt(arg.length));
    this.serialized = this.serialized.concat(arg);

    return this;
  }

  addNumber32(arg) {
    if (typeof arg != "number") {
      // can't do anything if the arg is not a number
      console.warn("Wrong arg type, required a 32 signed number");
      return this;
    }

    this.serialized = this.serialized.concat(
      this.toByteString(this.integer32ToByteArray(arg))
    );

    return this;
  }

  // Utils

  /**
   * Returns a byte string.
   *
   * @param {Uint8Array} byteString
   * @return {string}
   */
  toByteString(byteString) {
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
  fromByteString(byteString) {
    var byteArray = new Uint8Array(byteString.length);
    for (var i = 0; i < byteArray.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray;
  }

  /**
   * Return the byte array of the absolute integer part of the given value.
   *
   * Max value handled is 4294967295.
   *
   * @param {number} value
   * @return {Uint8Array} array of bytes
   */
  integer32ToByteArray(value) {
    value = Math.abs(value);
    value = Math.trunc(value);

    if (value > 4294967295) {
      // 4294967295 is the max 32 bit integer value
      value = 4294967295;
    }

    const array = [];

    for (let index = 0; index < 4; index++) {
      var byte = value & 0xff;
      array[index] = byte;
      value = (value - byte) / 256;
    }

    return new Uint8Array(array);
  }

  /**
   * Converts a byte array into a u32.
   *
   * @param {Uint8Array} byteArray
   * @param {u8} offset
   * @return {u32}
   */
  toNumber32(byteArray, offset = 0) {
    if (byteArray.length - offset < 8) {
      return NaN;
    }
    var x = 0;
    for (var i = 3; i >= 1; --i) {
      x = (x | byteArray[offset + i]) << 8;
    }
    x = x | byteArray[offset];
    return x;
  }
}
