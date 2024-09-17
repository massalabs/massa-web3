import { Mas } from './mas';
/**
 * Calculates the cost of a given number of bytes.
 *
 * @param numberOfBytes - The number of bytes.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export declare function bytes(numberOfBytes: number): Mas;
/**
 * Calculates the cost of creating a new account.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export declare function account(): Mas;
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
export declare function smartContract(numberOfBytes: number): Mas;
/**
 * Calculates the cost of creating a new entry in the datastore.
 *
 * @returns The cost in the smallest unit of the Massa currency.
 */
export declare function newEntry(): Mas;
