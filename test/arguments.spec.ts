import 'mocha';
import { expect } from 'chai';
import { Args, ISerializable } from '../src';
import { IDeserializedResult } from '../src/interfaces/ISerializable';
import { TypedArrayUnit } from '../src/utils/arguments';

export class Divinity implements ISerializable<Divinity> {
  constructor(public age: number = 0, public name: string = '') {}

  serialize(): Uint8Array {
    return Uint8Array.from(
      new Args().addU32(this.age).addString(this.name).serialize(),
    );
  }

  deserialize(data: Uint8Array, offset: number): IDeserializedResult<Divinity> {
    const args = new Args(data, offset);
    this.age = args.nextU32();
    this.name = args.nextString();
    return { instance: this, offset: args.getOffset() };
  }
}

describe('Args class', () => {
  it('demonstrative test case', () => {
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
    expect(args2.nextString()).to.equal('hello');
    // and so on with the 2 following arguments
    expect(args2.nextString()).to.equal('world');
    expect(args2.nextU32()).to.equal(97);
  });

  it('with u32', () => {
    const args1 = new Args();
    args1.addU32(97);

    const args4 = new Args(args1.serialize());
    expect(args4.nextU32()).to.equal(97);
  });

  it('with string', () => {
    const valueA = 'a'.repeat(13);
    const args1 = new Args();
    args1.addString(valueA);
    const byteString = args1.serialize();
    const args2 = new Args(byteString);
    expect(args2.nextString()).to.equal(valueA);

    const valueB = 'b'.repeat(65600);
    const args3 = new Args();
    args3.addString(valueB);
    const byteString2 = args3.serialize();
    const args4 = new Args(byteString2);
    expect(args4.nextString()).to.equal(valueB);
  });

  it('u32 and string', () => {
    const args1 = new Args();
    args1.addU32(97);
    args1.addString('hello');
    args1.addString('world');

    const args2 = new Args(args1.serialize());
    expect(args2.nextU32()).to.equal(97);
    expect(args2.nextString()).to.equal('hello');
    expect(args2.nextString()).to.equal('world');
  });

  it('i32', () => {
    const args1 = new Args();
    args1.addI32(-97);
    const args2 = new Args(args1.serialize());
    expect(args2.nextI32()).to.equal(-97);
  });

  it('u64, i32 and string', () => {
    const args1 = new Args();
    args1.addU64(BigInt(97));
    args1.addI32(-97);
    args1.addString('hello');
    args1.addString('world');

    const args2 = new Args(args1.serialize());
    expect(args2.nextU64()).to.equal(BigInt(97));
    expect(args2.nextI32()).to.equal(-97);
    expect(args2.nextString()).to.equal('hello');
    expect(args2.nextString()).to.equal('world');
  });

  it('i64, i32 and string', () => {
    const args1 = new Args();
    args1.addI64(BigInt(-97));
    args1.addI32(-97);
    args1.addString('hello');
    args1.addString('world');

    const args2 = new Args(args1.serialize());
    expect(args2.nextI64()).to.equal(BigInt(-97));
    expect(args2.nextI32()).to.equal(-97);
    expect(args2.nextString()).to.equal('hello');
    expect(args2.nextString()).to.equal('world');
  });

  it('f32, i64 and string', () => {
    const args1 = new Args();
    args1.addF32(1.234);
    args1.addI64(BigInt(-97));
    args1.addString('hello');
    args1.addString('world');

    const args2 = new Args(args1.serialize());
    expect(args2.nextF32()).to.be.closeTo(1.234, 1e-7);
    expect(args2.nextI64()).to.equal(BigInt(-97));
    expect(args2.nextString()).to.equal('hello');
    expect(args2.nextString()).to.equal('world');
  });

  it('f64, i64 and string', () => {
    const args1 = new Args();
    args1.addF64(146738984765738.234);
    args1.addI64(BigInt(-97));
    args1.addString('hello');
    args1.addString('world');

    const args2 = new Args(args1.serialize());
    expect(args2.nextF64()).to.equal(146738984765738.234);
    expect(args2.nextI64()).to.equal(BigInt(-97));
    expect(args2.nextString()).to.equal('hello');
    expect(args2.nextString()).to.equal('world');
  });

  it('byteArray, i64, string', () => {
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
    expect(args2.nextUint8Array()).to.deep.equal(byteArray);
    expect(args2.nextI64()).to.equal(BigInt(-97));
    expect(args2.nextString()).to.equal('hello');
    expect(args2.nextString()).to.equal('world');
  });

  it('a single serializable', () => {
    const classObject = new Divinity(14, 'Poseidon');
    const args = new Args(new Args().addSerializable(classObject).serialize());
    const deserialized = args.nextSerializable(Divinity);
    expect(deserialized.age).equals(14);
    expect(deserialized.name).equals('Poseidon');
  });

  it('serializable and not serializables', () => {
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

    expect(args.nextUint8Array()).to.deep.equal(array);
    expect(args.nextU32()).equals(age);
    expect(args.nextString()).equals(name);
    const deserialized = args.nextSerializable(Divinity);
    expect(deserialized.age).equals(14);
    expect(deserialized.name).equals('Poseidon');
  });

  it('an array of serializables', () => {
    const arrayOfSerializable = [
      new Divinity(14, 'Poseidon'),
      new Divinity(45, 'Superman'),
    ];
    const args = new Args(
      new Args().addSerializableObjectArray(arrayOfSerializable).serialize(),
    );

    const deserialized = args.nextSerializableObjectArray(Divinity);

    expect(deserialized.length).to.be.equal(2);
    expect(deserialized[0].age).equals(14);
    expect(deserialized[0].name).equals('Poseidon');
    expect(deserialized[1].age).equals(45);
    expect(deserialized[1].name).equals('Superman');
  });

  it('a mixed array of serializables and others', () => {
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

    expect(args.nextUint8Array()).to.deep.equal(array);
    const deserialized = args.nextSerializableObjectArray(Divinity);
    expect(deserialized.length).equals(2);
    expect(deserialized[0].age).equals(14);
    expect(deserialized[0].name).equals('Poseidon');
    expect(deserialized[1].age).equals(45);
    expect(deserialized[1].name).equals('Superman');
    expect(args.nextU32()).equals(age);
    expect(args.nextString()).equals(name);
  });

  it('With array of booleans', () => {
    const arrayBooleans = [false, false, true, true, false];
    const serialized = new Args()
      .addNativeTypeArray(arrayBooleans, TypedArrayUnit.BOOL)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.BOOL);
    expect(deserialized).to.deep.equal(arrayBooleans);
  });

  it('With array of U8s', () => {
    const arrayU8s = [10, 20, 30];
    const serialized = new Args()
      .addNativeTypeArray(arrayU8s, TypedArrayUnit.U8)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.U8);
    expect(deserialized).to.deep.equal(arrayU8s);
  });

  it('With array of U32s', () => {
    const arrayU32s = [100000, 200000, 300000];
    const serialized = new Args()
      .addNativeTypeArray(arrayU32s, TypedArrayUnit.U32)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.U32);
    expect(deserialized).to.deep.equal(arrayU32s);
  });

  it('With array of U64s', () => {
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
    expect(deserialized).to.deep.equal(arrayU64s);
  });

  it('With array of F32s', () => {
    const arrayF32s = [8.4, -9.6];
    const serialized = new Args()
      .addNativeTypeArray(arrayF32s, TypedArrayUnit.F32)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.F32);
    expect(deserialized[0]).to.be.closeTo(arrayF32s[0], 0.00001);
    expect(deserialized[1]).to.be.closeTo(arrayF32s[1], 0.00001);
  });

  it('With array of F64s', () => {
    const arrayF64s = [17800.47444, -97234.65711];
    const serialized = new Args()
      .addNativeTypeArray(arrayF64s, TypedArrayUnit.F64)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.F64);
    expect(deserialized[0]).to.be.closeTo(arrayF64s[0], 0.00001);
    expect(deserialized[1]).to.be.closeTo(arrayF64s[1], 0.00001);
  });

  it('With array of I32s', () => {
    const arrayI32s = [-2300, 9760];
    const serialized = new Args()
      .addNativeTypeArray(arrayI32s, TypedArrayUnit.I32)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.I32);
    expect(deserialized).to.deep.equal(arrayI32s);
  });

  it('With array of I64s', () => {
    const arrayI64s = [BigInt(-2300345435), BigInt(97607665667)];
    const serialized = new Args()
      .addNativeTypeArray(arrayI64s, TypedArrayUnit.I64)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.I64);
    expect(deserialized).to.deep.equal(arrayI64s);
  });

  it('byteArray, i64, string, native array', () => {
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
    expect(args2.nextUint8Array()).to.deep.equal(byteArray);
    expect(args2.nextI64()).to.equal(BigInt(-97));
    expect(args2.nextString()).to.equal('hello');
    expect(args2.nextString()).to.equal('world');
    expect(args2.nextNativeTypeArray(TypedArrayUnit.I32)).to.deep.equal(
      i32Array,
    );
  });

  it('native serializable and not serializables', () => {
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

    expect(args.nextUint8Array()).to.deep.equal(array);
    expect(args.nextU32()).equals(age);
    expect(args.nextString()).equals(name);
    expect(args.nextNativeTypeArray(TypedArrayUnit.I32)).to.deep.equal(
      i32Array,
    );
    const deserialized = args.nextSerializable(Divinity);
    expect(deserialized.age).equals(14);
    expect(deserialized.name).equals('Poseidon');
  });

  it('With array of Strings', () => {
    const arrayStrings = ['hello there', 'evgeni'];
    const serialized = new Args()
      .addNativeTypeArray(arrayStrings, TypedArrayUnit.STRING)
      .serialize();
    const args = new Args(serialized);
    const deserialized = args.nextNativeTypeArray(TypedArrayUnit.STRING);
    expect(deserialized).to.deep.equal(arrayStrings);
  });
});
