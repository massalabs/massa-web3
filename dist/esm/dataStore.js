import { Args, U64, U8 } from './basicElements';
const CONTRACTS_NUMBER_KEY = new Uint8Array([0]);
/**
 * Generates a key for coin data in the datastore.
 *
 * @param offset - The offset to use when generating the key.
 * @returns A Uint8Array representing the key.
 */
function coinsKey(offset) {
    return new Args()
        .addU64(BigInt(offset + 1))
        .addUint8Array(U8.toBytes(1n))
        .serialize();
}
/**
 * Generates a key for args data in the datastore.
 *
 * @param offset - The offset to use when generating the key.
 * @returns A Uint8Array representing the key.
 */
function argsKey(offset) {
    return new Args()
        .addU64(BigInt(offset + 1))
        .addUint8Array(U8.toBytes(0n))
        .serialize();
}
/**
 * Generates a key for contract data in the datastore.
 *
 * @param offset - The offset to use when generating the key.
 * @returns A Uint8Array representing the key.
 */
function contractKey(offset) {
    return U64.toBytes(BigInt(offset + 1));
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
export function populateDatastore(contracts) {
    const datastore = new Map();
    // set the number of contracts in the first key of the datastore
    datastore.set(CONTRACTS_NUMBER_KEY, U64.toBytes(BigInt(contracts.length)));
    contracts.forEach((contract, i) => {
        datastore.set(contractKey(i), contract.data);
        datastore.set(argsKey(i), contract.args);
        datastore.set(coinsKey(i), U64.toBytes(contract.coins));
    });
    return datastore;
}
//# sourceMappingURL=dataStore.js.map