/* eslint-disable @typescript-eslint/no-loss-of-precision */
import { expect, it, describe } from '@jest/globals';
import {
  DeserializedResult,
  Serializable,
} from '../../src/interfaces/Serializable';
import { Args, TypedArrayUnit } from '../../src/utils/arguments';

export class Divinity implements Serializable<Divinity> {
  constructor(public age: number = 0, public name: string = '') {}

  serialize(): Uint8Array {
    return Uint8Array.from(
      new Args().addU32(this.age).addString(this.name).serialize(),
    );
  }

  deserialize(data: Uint8Array, offset: number): DeserializedResult<Divinity> {
    const args = new Args(data, offset);
    this.age = args.nextU32();
    this.name = args.nextString();
    return { instance: this, offset: args.getOffset() };
  }
}

describe('Args class', () => {
  it('should retrieve strings and U32 values from an Args object', () => {
    // Create an argument class instance
    const args1 = new Args();
    // add some arguments
    args1.addString('hello').addString('world').addU32(97);

    // use serialize to get the byte string
    const byteString = args1.serialize();

    // create an argument class with the byte string
    const args2 = new Args(byteString);
    // assert that the first address is same we provide
    // in the first call to add function
    expect(args2.nextString()).toEqual('hello');
    // and so on with the 2 following arguments
    expect(args2.nextString()).toEqual('world');
    expect(args2.nextU32()).toEqual(97);
  });

  it('should retrieve an U32 from an Args object', () => {
    const args1 = new Args();
    args1.addU32(97);

    const args4 = new Args(args1.serialize());
    expect(args4.nextU32()).toEqual(97);
  });

  it('should retrieve a string from an Args object', () => {
    const valueA = 'a'.repeat(13);
    const args1 = new Args();
    args1.addString(valueA);
    const byteString = args1.serialize();
    const args2 = new Args(byteString);
    expect(args2.nextString()).toEqual(valueA);

    const valueB = 'b'.repeat(65600);
    const args3 = new Args();
    args3.addString(valueB);
    const byteString2 = args3.serialize();
    const args4 = new Args(byteString2);
    expect(args4.nextString()).toEqual(valueB);
  });

  it('should correctly serialize and deserialize an Args object containing an U32 and a string', () => {
    const args1 = new Args();
    args1.addU32(97);
    args1.addString('hello');
    args1.addString('world');

    const args2 = new Args(args1.serialize());
    expect(args2.nextU32()).toEqual(97);
    expect(args2.nextString()).toEqual('hello');
    expect(args2.nextString()).toEqual('world');
  });

  it('should correctly serialize and deserialize an Args object containing an i32', () => {
    const args1 = new Args();
    args1.addI32(-97);
    const args2 = new Args(args1.serialize());
    expect(args2.nextI32()).toEqual(-97);
  });

  it('should correctly serialize and deserialize an Args object containing an u64, an i32 and a string', () => {
    const args1 = new Args();
    args1.addU64(BigInt(97));
    args1.addI32(-97);
    args1.addString('hello');
    args1.addString('world');

    const args2 = new Args(args1.serialize());
    expect(args2.nextU64()).toEqual(BigInt(97));
    expect(args2.nextI32()).toEqual(-97);
    expect(args2.nextString()).toEqual('hello');
    expect(args2.nextString()).toEqual('world');
  });

  it('should correctly serialize and deserialize an Args object containing an i64, an i32 and a string', () => {
    const args1 = new Args();
    args1.addI64(BigInt(-97));
    args1.addI32(-97);
    args1.addString('hello');
    args1.addString('world');

    const args2 = new Args(args1.serialize());
    expect(args2.nextI64()).toEqual(BigInt(-97));
    expect(args2.nextI32()).toEqual(-97);
    expect(args2.nextString()).toEqual('hello');
    expect(args2.nextString()).toEqual('world');
  });

  it('should correctly serialize and deserialize an Args object containing a f32, an i64 and a string', () => {
    const args1 = new Args();
    args1.addF32(1.234);
    args1.addI64(BigInt(-97));
    args1.addString('hello');
    args1.addString('world');
    args1.addU8(12);

    const args2 = new Args(args1.serialize());
    expect(args2.nextF32()).toBeCloseTo(1.234, 1e-7);
    expect(args2.nextI64()).toEqual(BigInt(-97));
    expect(args2.nextString()).toEqual('hello');
    expect(args2.nextString()).toEqual('world');
  });

  it('should correctly serialize and deserialize an Args object containing a U8 and a boolean', () => {
    const args1 = new Args();
    args1.addU8(12);
    args1.addBool(true);

    const args2 = new Args(args1.serialize());
    expect(args2.nextU8()).toEqual(BigInt(12));
    expect(args2.nextBool()).toEqual(true);
  });

  it('should correctly serialize and deserialize an Args object containing a f64, an i64 and a string', () => {
    const args1 = new Args();
    args1.addF64(146738984765738.234);
    args1.addI64(BigInt(-97));
    args1.addString('hello');
    args1.addString('world');

    const args2 = new Args(args1.serialize());
    expect(args2.nextF64()).toEqual(146738984765738.234);
    expect(args2.nextI64()).toEqual(BigInt(-97));
    expect(args2.nextString()).toEqual('hello');
    expect(args2.nextString()).toEqual('world');
  });

  it('should correctly serialize and deserialize an Args object containing a u128, an u256 and a string', () => {
    const u128Val = 146738984765738234n;
    const u256Val = 146738984765738234146738984765738234n;
    const str = 'random string lolmao';
    const args1 = new Args();
    args1.addU128(u128Val);
    args1.addU256(u256Val);
    args1.addString(str);

    const args2 = new Args(args1.serialize());
    expect(args2.nextU128()).toEqual(u128Val);
    expect(args2.nextU256()).toEqual(u256Val);
    expect(args2.nextString()).toEqual(str);
  });

  it('should correctly serialize and deserialize an Args object containing a byteArray, an i64 and a string', () => {
    const args1 = new Args();
    const byteArray = new Uint8Array(4);
    byteArray[0] = 1;
    byteArray[1] = 2;
    byteArray[2] = 3;
    byteArray[3] = 4;
    args1.addUint8Array(byteArray);
    args1.addI64(BigInt(-97));
    args1.addString('hello');
    args1.addString('world');

    const args2 = new Args(args1.serialize());
    expect(args2.nextUint8Array()).toEqual(byteArray);
    expect(args2.nextI64()).toEqual(BigInt(-97));
    expect(args2.nextString()).toEqual('hello');
    expect(args2.nextString()).toEqual('world');
  });

  it('should correctly serialize and deserialize an Args object containing a single serializable object', () => {
    const classObject = new Divinity(14, 'Poseidon');
    const args = new Args(new Args().addSerializable(classObject).serialize());
    const deserialized = args.nextSerializable(Divinity);
    expect(deserialized.age).toEqual(14);
    expect(deserialized.name).toEqual('Poseidon');
  });

  it('should correctly serialize and deserialize an Args object containing an array, a number, a string and an Object', () => {
    const array = new Uint8Array(2);
    array.set([65, 88]);
    const age = 24;
    const name = 'Me';
    const classObject = new Divinity(14, 'Poseidon');

    const args = new Args(
      new Args()
        .addUint8Array(array)
        .addU32(age)
        .addString(name)
        .addSerializable(classObject)
        .serialize(),
    );

    expect(args.nextUint8Array()).toEqual(array);
    expect(args.nextU32()).toEqual(age);
    expect(args.nextString()).toEqual(name);
    const deserialized = args.nextSerializable(Divinity);
    expect(deserialized.age).toEqual(14);
    expect(deserialized.name).toEqual('Poseidon');
  });

  it('should return undefined when deserializing an empty array using nextSerializableObjectArray', () => {
    const arrayOfSerializable = [];
    const args = new Args(
      new Args().addSerializableObjectArray(arrayOfSerializable).serialize(),
    );

    const deserialized = args.nextSerializableObjectArray(Divinity);
    expect(deserialized[0]).toBe(undefined);
  });

  it('should correctly serialize and deserialize an Args object containing an array of serializables', () => {
    const arrayOfSerializable = [
      new Divinity(14, 'Poseidon'),
      new Divinity(45, 'Superman'),
    ];
    const args = new Args(
      new Args().addSerializableObjectArray(arrayOfSerializable).serialize(),
    );

    const deserialized = args.nextSerializableObjectArray(Divinity);

    expect(deserialized.length).toEqual(2);
    expect(deserialized[0].age).toEqual(14);
    expect(deserialized[0].name).toEqual('Poseidon');
    expect(deserialized[1].age).toEqual(45);
    expect(deserialized[1].name).toEqual('Superman');
  });

  it('should correctly serialize and deserialize an Args object containing a mixed array of serializables and others', () => {
    const array = new Uint8Array(2);
    array.set([65, 88]);
    const age = 24;
    const name = 'Me';

    const arrayOfSerializable = [
      new Divinity(14, 'Poseidon'),
      new Divinity(45, 'Superman'),
    ];
    const args = new Args(
      new Args()
        .addUint8Array(array)
        .addSerializableObjectArray(arrayOfSerializable)
        .addU32(age)
        .addString(name)
        .serialize(),
    );

    expect(args.nextUint8Array()).toEqual(array);
    const deserialized = args.nextSerializableObjectArray(Divinity);
    expect(deserialized.length).toEqual(2);
    expect(deserialized[0].age).toEqual(14);
    expect(deserialized[0].name).toEqual('Poseidon');
    expect(deserialized[1].age).toEqual(45);
    expect(deserialized[1].name).toEqual('Superman');
    expect(args.nextU32()).toEqual(age);
    expect(args.nextString()).toEqual(name);
  });

  it('should correctly serialize and deserialize an Args object containing an array of booleans', () => {
    const arrayBooleans = [false, false, true, true, false];
    const serialized = new Args()
      .addNativeTypeArray(arrayBooleans, TypedArrayUnit.BOOL)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.BOOL);
    expect(deserialized).toEqual(arrayBooleans);
  });

  it('should correctly serialize and deserialize an Args object containing an array of U8s', () => {
    const arrayU8s = [10, 20, 30];
    const serialized = new Args()
      .addNativeTypeArray(arrayU8s, TypedArrayUnit.U8)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.U8);
    expect(deserialized).toEqual(arrayU8s);
  });

  it('should correctly serialize and deserialize an Args object containing an array of U32s', () => {
    const arrayU32s = [100000, 200000, 300000];
    const serialized = new Args()
      .addNativeTypeArray(arrayU32s, TypedArrayUnit.U32)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.U32);
    expect(deserialized).toEqual(arrayU32s);
  });

  it('should correctly serialize and deserialize an Args object containing an array of U64s', () => {
    const arrayU64s = [
      BigInt(10000000000),
      BigInt(2000000000),
      BigInt(3000000000),
    ];
    const serialized = new Args()
      .addNativeTypeArray(arrayU64s, TypedArrayUnit.U64)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.U64);
    expect(deserialized).toEqual(arrayU64s);
  });

  it('should correctly serialize and deserialize an Args object containing an array of F32s', () => {
    const arrayF32s = [8.4, -9.6];
    const serialized = new Args()
      .addNativeTypeArray(arrayF32s, TypedArrayUnit.F32)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.F32);
    expect(deserialized[0]).toBeCloseTo(arrayF32s[0], 0.00001);
    expect(deserialized[1]).toBeCloseTo(arrayF32s[1], 0.00001);
  });

  it('should correctly serialize and deserialize an Args object containing an array of F64s', () => {
    const arrayF64s = [17800.47444, -97234.65711];
    const serialized = new Args()
      .addNativeTypeArray(arrayF64s, TypedArrayUnit.F64)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.F64);
    expect(deserialized[0]).toBeCloseTo(arrayF64s[0], 0.00001);
    expect(deserialized[1]).toBeCloseTo(arrayF64s[1], 0.00001);
  });

  it('should correctly serialize and deserialize an Args object containing an array of I32s', () => {
    const arrayI32s = [-2300, 9760];
    const serialized = new Args()
      .addNativeTypeArray(arrayI32s, TypedArrayUnit.I32)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.I32);
    expect(deserialized).toEqual(arrayI32s);
  });

  it('should correctly serialize and deserialize an Args object containing an array of I64s', () => {
    const arrayI64s = [BigInt(-2300345435), BigInt(97607665667)];
    const serialized = new Args()
      .addNativeTypeArray(arrayI64s, TypedArrayUnit.I64)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.I64);
    expect(deserialized).toEqual(arrayI64s);
  });

  it('should correctly serialize and deserialize an Args object containing a byteArray, an i64, a string and a native array', () => {
    const args1 = new Args();
    const byteArray = new Uint8Array(4);
    byteArray[0] = 1;
    byteArray[1] = 2;
    byteArray[2] = 3;
    byteArray[3] = 4;
    args1.addUint8Array(byteArray);
    args1.addI64(BigInt(-97));
    args1.addString('hello');
    args1.addString('world');
    const i32Array = [100, 200, 300];
    args1.addNativeTypeArray(i32Array, TypedArrayUnit.I32);

    const args2 = new Args(args1.serialize());
    expect(args2.nextUint8Array()).toEqual(byteArray);
    expect(args2.nextI64()).toEqual(BigInt(-97));
    expect(args2.nextString()).toEqual('hello');
    expect(args2.nextString()).toEqual('world');
    expect(args2.nextNativeTypeArray(TypedArrayUnit.I32)).toEqual(i32Array);
  });

  it('should correctly serialize and deserialize an Args object containing a native serializable object', () => {
    const array = new Uint8Array(2);
    array.set([65, 88]);
    const age = 24;
    const name = 'Me';
    const classObject = new Divinity(14, 'Poseidon');
    const i32Array = [100, 200, 300];

    const args = new Args(
      new Args()
        .addUint8Array(array)
        .addU32(age)
        .addString(name)
        .addNativeTypeArray(i32Array, TypedArrayUnit.I32)
        .addSerializable(classObject)
        .serialize(),
    );

    expect(args.nextUint8Array()).toEqual(array);
    expect(args.nextU32()).toEqual(age);
    expect(args.nextString()).toEqual(name);
    expect(args.nextNativeTypeArray(TypedArrayUnit.I32)).toEqual(i32Array);
    const deserialized = args.nextSerializable(Divinity);
    expect(deserialized.age).toEqual(14);
    expect(deserialized.name).toEqual('Poseidon');
  });

  it('should correctly serialize and deserialize an Args object containing an array of Strings', () => {
    const arrayStrings = ['hello there', 'evgeni'];
    const serialized = new Args()
      .addNativeTypeArray(arrayStrings, TypedArrayUnit.STRING)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.STRING);
    expect(deserialized).toEqual(arrayStrings);
  });
});
