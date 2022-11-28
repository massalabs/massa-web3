import { createSC, generateEvent, getOpData } from "@massalabs/massa-as-sdk";

export function main(): void {
    const key1: StaticArray<u8> = [0, 1, 2, 3, 4];
    const bytecode1 = getOpData(key1);
    const address1 = createSC(bytecode1);
    generateEvent("SC created at:" + address1.toByteString());

    // let key2: StaticArray<u8> = [5, 6, 7, 8, 9];
    // const bytecode2 = getOpData(key2);
    // const address2 = createSC(bytecode2);
    // generateEvent(address2.toByteString());
}
