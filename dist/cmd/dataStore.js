"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populateDatastore = void 0;
const basicElements_1 = require("./basicElements");
const CONTRACTS_NUMBER_KEY = new Uint8Array([0]);
/**
 * Generates a key for coin data in the datastore.
 *
 * @param offset - The offset to use when generating the key.
 * @returns A Uint8Array representing the key.
 */
function coinsKey(offset) {
    return new basicElements_1.Args()
        .addU64(BigInt(offset + 1))
        .addUint8Array(basicElements_1.U8.toBytes(1n))
        .serialize();
}
/**
 * Generates a key for args data in the datastore.
 *
 * @param offset - The offset to use when generating the key.
 * @returns A Uint8Array representing the key.
 */
function argsKey(offset) {
    return new basicElements_1.Args()
        .addU64(BigInt(offset + 1))
        .addUint8Array(basicElements_1.U8.toBytes(0n))
        .serialize();
}
/**
 * Generates a key for contract data in the datastore.
 *
 * @param offset - The offset to use when generating the key.
 * @returns A Uint8Array representing the key.
 */
function contractKey(offset) {
    return basicElements_1.U64.toBytes(BigInt(offset + 1));
}
/**
 * Populates the datastore with the contracts.
 *
 * @remarks
 * This function is to be used in conjunction with the deployer smart contract.
 * The deployer smart contract expects to have an execution datastore in a specific state.
 * This function populates the datastore according to that expectation.
 *
 * @param contracts - The contracts to populate the datastore with.
 *
 * @returns The populated datastore.
 */
function populateDatastore(contracts) {
    const datastore = new Map();
    // set the number of contracts in the first key of the datastore
    datastore.set(CONTRACTS_NUMBER_KEY, basicElements_1.U64.toBytes(BigInt(contracts.length)));
    contracts.forEach((contract, i) => {
        datastore.set(contractKey(i), contract.data);
        datastore.set(argsKey(i), contract.args);
        datastore.set(coinsKey(i), basicElements_1.U64.toBytes(contract.coins));
    });
    return datastore;
}
exports.populateDatastore = populateDatastore;
//# sourceMappingURL=dataStore.js.map