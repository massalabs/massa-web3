/**
 * Args for remote function call.
 *
 * This class can serialize javascript native types into bytes, in order to
 * make smart-contract function call easier.
 *
 */
export default class Args {
  private offset: number = 0;
  private serialized: Uint8Array;

  /**
   *
   * @param {string} serialized
   */
  constructor(serialized: string = "") {
    this.serialized = this.fromByteString(serialized);
  }

  /**
   * Returns the serialized string to pass to CallSC.
   *
   * @return {string} the serialized string
   */
  serialize(): string {
    return this.toByteString(this.serialized);
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
    const result = this.toByteString(this.serialized.slice(this.offset, end));
    this.offset = end;
    return result;
  }

  /**
   * Returns the deserialized number.
   *
   * @return {BigInt}
   */
  nextU32(): BigInt {
    let buffer = this.serialized.buffer;
    let view = new DataView(buffer);
    let value = view.getUint32(this.offset);
    this.offset += 4
    return BigInt(value);
  }

  // Setter

  /**
   *
   * @param {BigInt} bigInt
   * @return {Args}
   */
  addU32(bigInt: BigInt): Args {
    let buffer = new ArrayBuffer(4);
    let view = new DataView(buffer);
    view.setUint32(0, Number(bigInt));
    this.serialized = this.concatArrays(this.serialized, new Uint8Array(view.buffer));

    this.offset += 4;

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
    const size = BigInt(arg.length);

    if (size > maxSize) {
        console.warn("input string is too long, it will be truncated");
        arg = arg.slice(0, maxSize);
    }

    this.addU32(size);

    this.serialized = this.concatArrays(this.serialized, this.fromByteString(arg));

    return this;
  }

  // Utils

  /**
   * Returns a byte string.
   *
   * @param {Uint8Array} bytes
   * @return {string}
   */
  private toByteString(bytes: Uint8Array): string {
    let s = "";
    for (let i = 0; i < bytes.length; i++) {
      s += String.fromCharCode(bytes[i]);
    }
    return s;
  }

  /**
   * Converts a string into a byte array.
   *
   * @param {string} byteString
   * @return {Uint8Array}
   */
  private fromByteString(byteString: string): Uint8Array {
    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteArray.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }
    return byteArray;
  }

  /**
   * Internal function to concat to Uint8Array.
   *
   * @param {Uint8Array} a first array to concat
   * @param {Uint8Array} b second array to concat
   *
   * @return {Uint8Array} the concatenated array
   */
    private concatArrays(a: Uint8Array, b: Uint8Array): Uint8Array {
    var c = new Uint8Array(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }
}
