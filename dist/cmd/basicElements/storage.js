"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newEntry = exports.smartContract = exports.account = exports.bytes = void 0;
const mas_1 = require("./mas");
const serializers_1 = require("./serializers");
const BYTE_COST_MICRO_MASSA = 100n;
const ACCOUNT_SIZE_BYTES = 10;
/**
 * Calculates the cost of a given number of bytes.
 *
 * @param numberOfBytes - The number of bytes.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
function bytes(numberOfBytes) {
    return BigInt(numberOfBytes) * (0, mas_1.fromMicroMas)(BYTE_COST_MICRO_MASSA);
}
exports.bytes = bytes;
/**
 * Calculates the cost of creating a new account.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
function account() {
    return bytes(ACCOUNT_SIZE_BYTES);
}
exports.account = account;
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
function smartContract(numberOfBytes) {
    return bytes(numberOfBytes) + account();
}
exports.smartContract = smartContract;
/**
 * Calculates the cost of creating a new entry in the datastore.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
function newEntry() {
    return bytes(serializers_1.U32.SIZE_BYTE);
}
exports.newEntry = newEntry;
//# sourceMappingURL=storage.js.map