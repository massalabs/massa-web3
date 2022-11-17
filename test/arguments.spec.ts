import "mocha";
import { expect } from "chai";
import Args from "../src/utils/arguments";

describe("Args class", () => {
    it("demonstrative test case", () => {
        // Create an argument class instance
        const args1 = new Args();
        // add some arguments
        args1
        .addString("hello")
        .addString("world")
        .addU32(BigInt(97));

        // use serialize to get the byte string
        const byteString = args1.serialize();

        // create an argument class with the byte string
        const args2 = new Args(byteString);
        // assert that the first address is same we provide
        // in the first call to add function
        expect(args2.nextString()).to.equal("hello");
        // and so on with the 2 following arguments
        expect(args2.nextString()).to.equal("world");
        expect(args2.nextU32()).to.equal(BigInt(97));
    });

    it("with u32", () => {
        const args1 = new Args();
        args1.addU32(BigInt(97));

        const args4 = new Args(args1.serialize());
        expect(args4.nextU32()).to.equal(BigInt(97));
    });

    it("with string", () => {
        const valueA = "a".repeat(13)
        const args1 = new Args();
        args1.addString(valueA);
        const byteString = args1.serialize();
        const args2 = new Args(byteString);
        expect(args2.nextString()).to.equal(valueA);

        const valueB = "b".repeat(65600)
        const args3 = new Args();
        args3.addString(valueB);
        const byteString2 = args3.serialize();
        const args4 = new Args(byteString2);
        expect(args4.nextString()).to.equal(valueB);
    });
});
