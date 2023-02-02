import * as ser from "../src/utils/serializers";
import { expect } from "chai";
import { asTests } from "./fixtures/as-serializer";

describe("Serialization tests", () => {
    it("ser/deser with emojis", () => {
        const str = "Hello world 🙂";
        expect(ser.bytesToStr(ser.strToBytes(str))).equal(str);
    });
    it("ser/deser Ascii", () => {
        const str =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        expect(ser.bytesToStr(ser.strToBytes(str))).equal(str);
    });
    it("ser/deser utf16 char", () => {
        const str = String.fromCharCode(0xd83d, 0xde42);
        expect(ser.bytesToStr(ser.strToBytes(str))).equal("🙂");
    });
    it("ser/deser bool", () => {
        let val = false;
        expect(ser.byteToBool(ser.boolToByte(val))).equal(val);
        val = true;
        expect(ser.byteToBool(ser.boolToByte(val))).equal(val);
    });
    it("ser/deser u8", () => {
        const val = 123;
        expect(ser.byteToU8(ser.u8toByte(val))).equal(val);
    });
    it("ser/deser u32", () => {
        const val = 666;
        expect(ser.bytesToU32(ser.u32ToBytes(val))).equal(val);
    });
    it("ser/deser u64", () => {
        const val = BigInt(666);
        expect(ser.bytesToU64(ser.u64ToBytes(val))).equal(val);
    });
    it("ser/deser i32", () => {
        const val = -666;
        expect(ser.bytesToI32(ser.i32ToBytes(val))).equals(val);
    });
    it("ser/deser i64", () => {
        const val = BigInt(-666);
        expect(ser.bytesToI64(ser.i64ToBytes(val))).equal(val);
    });
    it("ser/deser f32", () => {
        const val = -666.666;
        expect(ser.bytesToF32(ser.f32ToBytes(val))).to.be.closeTo(val, 0.001);
    });
    it("ser/deser f64", () => {
        const val = -666.666;
        expect(ser.bytesToF64(ser.f64ToBytes(val))).equal(val);
    });
    it("ser/deser f64 max val", () => {
        const val = Number.MAX_VALUE;
        expect(ser.bytesToF64(ser.f64ToBytes(val))).equal(val);
    });
});

describe("Test against assemblyscript serializer", () => {
    for (const test of asTests) {
        it(`AS tests ${test.name}: serialize`, () => {
            expect(ser[test.ser](test.val)).eql(
                new Uint8Array(test.serialized)
            );
        });

        it(`AS tests ${test.name}: deserialize`, () => {
            if (test.deser === "bytesToF32") {
                // Special case for 32bits floats
                expect(
                    ser[test.deser](new Uint8Array(test.serialized))
                ).to.be.closeTo(test.val as number, 0.001);
            } else {
                expect(ser[test.deser](new Uint8Array(test.serialized))).equal(
                    test.val
                );
            }
        });
    }
});
