import { Args } from '..';
import { Operation } from '../operation';
import { Provider, ReadSCData } from '../provider';
import { CallSCOptions, DeploySCOptions, ReadSCOptions } from './';
/**
 * A class to interact with a smart contract.
 */
export declare class SmartContract {
    provider: Provider;
    address: string;
    constructor(provider: Provider, address: string);
    /**
     * Executes a smart contract call operation
     * @param func - The smart contract function to be called.
     * @param parameter - Parameters for the function call in Uint8Array or number[] format.
     * @param options - Includes optional and required parameters like fee, maxGas, coins, and periodToLive.
     * @returns A promise that resolves to an Operation object representing the transaction.
     */
    call(func: string, args?: Args | Uint8Array, options?: CallSCOptions): Promise<Operation>;
    /**
     * Executes a smart contract read operation
     * @param func - The smart contract function to be called.
     * @param parameter - Parameter for the function call in Uint8Array format.
     * @param options - Includes optional parameters like fee, maxGas, coins, and periodToLive.
     * @returns A promise that resolves to the result of the read operation.
     */
    read(func: string, args?: Args | Uint8Array, options?: ReadSCOptions): Promise<ReadSCData>;
    /**
     * Executes a smart contract read operation
     * @param func - The smart contract function to be called.
     * @param parameter - Parameter for the function call in Uint8Array format.
     * @param options - Includes optional parameters like fee, maxGas, coins, and periodToLive.
     * @returns A promise that resolves to the result of the read operation.
     */
    static deploy(provider: Provider, byteCode: Uint8Array, constructorArgs?: Args | Uint8Array, options?: DeploySCOptions): Promise<SmartContract>;
}
