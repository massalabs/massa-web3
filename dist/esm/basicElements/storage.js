import { fromMicroMas } from './mas';
import { U32 } from './serializers';
const BYTE_COST_MICRO_MASSA = 100n;
const ACCOUNT_SIZE_BYTES = 10;
/**
 * Calculates the cost of a given number of bytes.
 *
 * @param numberOfBytes - The number of bytes.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export function bytes(numberOfBytes) {
    return BigInt(numberOfBytes) * fromMicroMas(BYTE_COST_MICRO_MASSA);
}
/**
 * Calculates the cost of creating a new account.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export function account() {
    return bytes(ACCOUNT_SIZE_BYTES);
}
/**
 * Calculates the cost of deploying a smart contract.
 *
 * @remarks
 * The cost of deploying a smart contract includes the cost of creating a new account.
 *
 * @param numberOfBytes - The number of bytes of the smart contract.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export function smartContract(numberOfBytes) {
    return bytes(numberOfBytes) + account();
}
/**
 * Calculates the cost of creating a new entry in the datastore.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export function newEntry() {
    return bytes(U32.SIZE_BYTE);
}
//# sourceMappingURL=storage.js.map