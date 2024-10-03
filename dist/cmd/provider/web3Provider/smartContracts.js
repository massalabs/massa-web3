"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCProvider = void 0;
const tslib_1 = require("tslib");
const __1 = require("../..");
const errors_1 = require("../../errors");
const smartContracts_1 = require("../../smartContracts");
const __2 = require("..");
const StorageCost = tslib_1.__importStar(require("../../basicElements/storage"));
const dataStore_1 = require("../../dataStore");
const bytecode_1 = require("../../basicElements/bytecode");
const deployer_bytecode_1 = require("../../generated/deployer-bytecode");
const operation_1 = require("../../operation");
const operationManager_1 = require("../../operation/operationManager");
class SCProvider {
    client;
    account;
    constructor(client, account) {
        this.client = client;
        this.account = account;
    }
    /**
     * Reads smart contract function.
     * @param params - readSCParams.
     * @returns A promise that resolves to a ReadSCData.
     */
    async readSC(params) {
        const args = params.parameter ?? new Uint8Array();
        const caller = params.caller ?? this.account.address.toString();
        const readOnlyParams = {
            ...params,
            caller,
            parameter: args instanceof Uint8Array ? args : Uint8Array.from(args.serialize()),
        };
        return this.client.executeReadOnlyCall(readOnlyParams);
    }
    /**
     * Executes a smart contract call operation
     * @param params - callSCParams.
     * @returns A promise that resolves to an Operation object representing the transaction.
     */
    async call(params) {
        const coins = params.coins ?? 0n;
        await this.checkAccountBalance(coins);
        const args = params.parameter ?? new Uint8Array();
        const parameter = args instanceof Uint8Array ? args : Uint8Array.from(args.serialize());
        const fee = params.fee ?? (await this.client.getMinimalFee());
        let maxGas = params.maxGas;
        if (!maxGas) {
            maxGas = await this.getGasEstimation(params);
        }
        else {
            if (maxGas > smartContracts_1.MAX_GAS_CALL) {
                throw new errors_1.ErrorMaxGas({ isHigher: true, amount: smartContracts_1.MAX_GAS_CALL });
            }
            else if (maxGas < smartContracts_1.MIN_GAS_CALL) {
                throw new errors_1.ErrorMaxGas({ isHigher: false, amount: smartContracts_1.MIN_GAS_CALL });
            }
        }
        const details = {
            fee,
            expirePeriod: await (0, operationManager_1.getAbsoluteExpirePeriod)(this.client, params.periodToLive),
            type: operation_1.OperationType.CallSmartContractFunction,
            coins,
            maxGas,
            address: params.target,
            func: params.func,
            parameter,
        };
        const manager = new operationManager_1.OperationManager(this.account.privateKey, this.client);
        return manager.send(details);
    }
    /**
     * Returns the gas estimation for a given function.
     *
     * @remarks To avoid running out of gas, the gas estimation is increased by 20%.
     *
     * @param params - callSCParams.
     * @throws If the read operation returns an error.
     * @returns The gas estimation for the function.
     */
    async getGasEstimation(params) {
        const result = await this.readSC(params);
        if (result.info.error) {
            throw new Error(result.info.error);
        }
        const gasCost = BigInt(result.info.gasCost);
        return (0, __1.minBigInt)(
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        gasCost + (gasCost * __2.GAS_ESTIMATION_TOLERANCE) / 100n, smartContracts_1.MAX_GAS_CALL);
    }
    async checkAccountBalance(coins) {
        if (coins > 0n) {
            const balance = await this.client.getBalance(this.account.address.toString());
            if (balance < coins) {
                throw new errors_1.ErrorInsufficientBalance({
                    userBalance: balance,
                    neededBalance: coins,
                });
            }
        }
    }
    /**
     * Deploys a smart contract on the blockchain.
     *
     * @param params - Optional deployment details with defaults as follows:
     * @param params.fee - Execution fee, auto-estimated if absent.
     * @param params.maxCoins - Maximum number of coins to use, auto-estimated if absent.
     * @param params.maxGas - Maximum execution gas, auto-estimated if absent.
     * @param params.periodToLive - Duration in blocks before the transaction expires, defaults to 10.
     * @param params.waitFinalExecution - Whether to wait for the transaction to be finalized, defaults to true.
     *
     *
     * @returns The deployed smart contract.
     *
     * @throws If the account has insufficient balance to deploy the smart contract.
     */
    async deploy(params) {
        const coins = params.coins ?? 0n;
        const totalCost = StorageCost.smartContract(params.byteCode.length) + coins;
        await this.checkAccountBalance(totalCost);
        const args = params.parameter ?? new Uint8Array();
        const parameter = args instanceof Uint8Array ? args : Uint8Array.from(args.serialize());
        const datastore = (0, dataStore_1.populateDatastore)([
            {
                data: params.byteCode,
                args: parameter,
                coins,
            },
        ]);
        const fee = params.fee ?? (await this.client.getMinimalFee());
        return (0, bytecode_1.execute)(this.client, this.account.privateKey, deployer_bytecode_1.DEPLOYER_BYTECODE, {
            fee,
            periodToLive: params.periodToLive,
            maxCoins: totalCost,
            maxGas: params.maxGas,
            datastore,
        });
    }
    async getStorageKeys(address, filter = new Uint8Array(), final = true) {
        const filterBytes = typeof filter === 'string' ? (0, __1.strToBytes)(filter) : filter;
        return this.client.getDataStoreKeys(address, filterBytes, final);
    }
    async readStorage(address, keys, final = true) {
        const entries = keys.map((key) => ({ address, key }));
        return this.client.getDatastoreEntries(entries, final);
    }
}
exports.SCProvider = SCProvider;
//# sourceMappingURL=smartContracts.js.map