import 'mocha';
import { expect } from 'chai';
import { Args, ISerializable } from '../src';
import { IDeserializedResult } from '../src/interfaces/ISerializable';

export class Divinity implements ISerializable<Divinity> {
  constructor(public age: number = 0, public name: string = '') {}

  serialize(): Uint8Array {
    return Uint8Array.from(new Args().addU32(this.age).addString(this.name).serialize());
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


  it('serializable', () => {
    const arrayOfSerializable = [
      new Divinity(14, 'Poseidon'),
      new Divinity(45, 'Superman'),
    ];
    const args = new Args(
      new Args().addSerializableObjectArray(arrayOfSerializable).serialize(),
    );
    console.log("SER ", args);
    const deser = args.nextSerializableObjectArray<Divinity>(Divinity);
    console.log("DESER ", deser);

    expect(deser.length).to.be.equal(2);
    expect(deser[0].age).equals(14);
    expect(deser[0].name).equals('Poseidon');
    expect(deser[1].age).equals(45);
    expect(deser[1].name).equals('Superman');
  });
});
