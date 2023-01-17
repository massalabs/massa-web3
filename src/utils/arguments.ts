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
   * Constructs a new instance of of the `Args` class
   * @param {string} serialized Serialized initial data
   */
  constructor(serialized: Array<number> | Uint8Array = []) {
    this.serialized = Uint8Array.from(serialized);
  }

  /**
   * Returns the serialized string to pass to `CallSC`.
   *
   * @returns {string} the serialized string
   */
  serialize(): Array<number> {
    return Array.from(this.serialized);
  }

  // Getters

  /**
   * Returns the next string from the deserialized `Args`
   * 
   * @returns {string} string
  */
  nextString(): string {
    const length = Number(this.nextU32());
    const end = this.offset + length;
    const result = this.toByteString(this.serialized.slice(this.offset, end));
    this.offset = end;
    return result;
  }

  /**
   * Returns the next U32 from the deserialized `Args`
   * 
   * @returns {bigint} u32 number
  */
  nextU32(): bigint {
    const buffer = this.serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getUint32(this.offset, true);
    this.offset += 4;
    return BigInt(value);
  }

  /**
   * Returns the next U64 from the deserialized `Args`
   * 
   * @returns {bigint} u64 number
  */
  nextU64(): bigint {
    const buffer = this.serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getBigUint64(this.offset, true);
    this.offset += 8;
    return BigInt(value);
  }

  /**
   * Returns the next I32 from the deserialized `Args`
   * 
   * @returns {bigint} i32 number
  */
  nextI32(): bigint {
    const buffer = this.serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getInt32(this.offset, true);
    this.offset += 4;
    return BigInt(value);
  }

  /**
   * Returns the next I64 from the deserialized `Args`
   * 
   * @returns {bigint} i64 number
  */
  nextI64(): bigint {
    const buffer = this.serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getBigInt64(this.offset, true);
    this.offset += 8;
    return BigInt(value);
  }

  /**
   * Returns the next F32 from the deserialized `Args`
   * 
   * @returns {number} f32 number
  */
  nextF32(): number {
    const buffer = this.serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getFloat32(this.offset, true);
    this.offset += 4;
    return value;
  }

  /**
   * Returns the next F64 from the deserialized `Args`
   * 
   * @returns {number} f64 number
  */
  nextF64(): number {
    const buffer = this.serialized.buffer;
    const view = new DataView(buffer);
    const value = view.getFloat64(this.offset, true);
    this.offset += 8;
    return value;
  }

  /**
   * Returns the next `Uint8Array` from the deserialized `Args`
   * 
   * @returns {Uint8Array} byte array
  */
  nextUint8Array(): Uint8Array {
    const length = Number(this.nextU32());
    const byteArray = this.serialized.slice(
      this.offset,
      (this.offset) + length,
    );
    this.offset += length;
    return byteArray;
  }

  // Setter

  /**
 * Adds an U32 to an `Args` serializer
 * @param {BigInt} bigInt the bigInt to be added
 * 
 * @returns {Args} the `Args` instance
 */
  addU32(bigInt: bigint): Args {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, Number(bigInt), true);
    this.serialized = this.concatArrays(this.serialized, new Uint8Array(view.buffer));

    this.offset += 4;

    return this;
  }

  /**
 * Adds an U64 to an `Args` serializer
 * @param {BigInt} bigInt the bigInt to be added
 * 
 * @returns {Args} the `Args` instance
 */
  addU64(bigInt: bigint): Args {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigUint64(0, bigInt, true);
    this.serialized = this.concatArrays(this.serialized, new Uint8Array(view.buffer));

    this.offset += 8;

    return this;
  }

  /**
 * Adds an I32 to an `Args` serializer
 * @param {BigInt} bigInt the bigInt to be added
 * 
 * @returns {Args} the `Args` instance
 */
  addI32(bigInt: bigint): Args {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setInt32(0, Number(bigInt), true);
    this.serialized = this.concatArrays(this.serialized, new Uint8Array(view.buffer));

    this.offset += 4;

    return this;
  }

  /**
 * Adds an I64 to an `Args` serializer
 * @param {BigInt} bigInt the bigInt to be added
 * 
 * @returns {Args} the `Args` instance
 */
  addI64(bigInt: bigint): Args {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setBigInt64(0, bigInt, true);
    this.serialized = this.concatArrays(this.serialized, new Uint8Array(view.buffer));

    this.offset += 8;

    return this;
  }

  /**
   * Adds an F32 to an `Args` serializer
   * @param {number} bigInt the bigInt to be added
   * 
   * @returns {Args} the `Args` instance
   */
  addF32(number: number): Args {
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setFloat32(0, number, true);
    this.serialized = this.concatArrays(this.serialized, new Uint8Array(view.buffer));

    this.offset += 4;

    return this;
  }


  /**
  * Adds an F64 to an `Args` serializer
  * @param {number} number the number to be added
  * 
  * @returns {Args} the `Args` instance
  */
  addF64(number: number): Args {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, number, true);
    this.serialized = this.concatArrays(this.serialized, new Uint8Array(view.buffer));

    this.offset += 8;

    return this;
  }

  /**
  * Adds an Uint8 to an `Args` serializer
  * @param {Uint8Array} array the byte array of the data to be added
  * 
  * @returns {Args} the `Args` instance
  */
  addUint8Array(array: Uint8Array): Args {
    this.addU32(BigInt(array.length));
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
   * @returns {Args} the modified Arg instance
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
   * Converts a byte array into a string
   *
   * @param {Uint8Array} bytes The bytes array to convert to a string
   * 
   * @returns {string} The bytes string
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
   * @param {string} byteString The string to be converted
   *
   * @returns {Uint8Array} The converted byte array
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
   * @returns {Uint8Array} the concatenated array
   */
  private concatArrays(a: Uint8Array, b: Uint8Array): Uint8Array {
    const c = new Uint8Array(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
  }
}
