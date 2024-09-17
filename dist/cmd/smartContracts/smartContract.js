"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartContract = void 0;
/**
 * A class to interact with a smart contract.
 */
class SmartContract {
    provider;
    address;
    constructor(provider, address) {
        this.provider = provider;
        this.address = address;
    }
    /**
     * Executes a smart contract call operation
     * @param func - The smart contract function to be called.
     * @param parameter - Parameters for the function call in Uint8Array or number[] format.
     * @param options - Includes optional and required parameters like fee, maxGas, coins, and periodToLive.
     * @returns A promise that resolves to an Operation object representing the transaction.
     */
    async call(func, args = new Uint8Array(), options = {}) {
        const callParams = {
            func,
            parameter: args,
            target: this.address,
            ...options,
            caller: this.provider.address,
        };
        return this.provider.callSC(callParams);
    }
    /**
     * Executes a smart contract read operation
     * @param func - The smart contract function to be called.
     * @param parameter - Parameter for the function call in Uint8Array format.
     * @param options - Includes optional parameters like fee, maxGas, coins, and periodToLive.
     * @returns A promise that resolves to the result of the read operation.
     */
    async read(func, args = new Uint8Array(), options = {}) {
        const readParams = {
            func,
            parameter: args,
            target: this.address,
            ...options,
        };
        return this.provider.readSC(readParams);
    }
    /**
     * Executes a smart contract read operation
     * @param func - The smart contract function to be called.
     * @param parameter - Parameter for the function call in Uint8Array format.
     * @param options - Includes optional parameters like fee, maxGas, coins, and periodToLive.
     * @returns A promise that resolves to the result of the read operation.
     */
    static async deploy(provider, byteCode, constructorArgs = new Uint8Array(), options = {}) {
        const deployParams = {
            byteCode,
            parameter: constructorArgs,
            ...options,
        };
        return provider.deploySC(deployParams);
    }
}
exports.SmartContract = SmartContract;
//# sourceMappingURL=smartContract.js.map