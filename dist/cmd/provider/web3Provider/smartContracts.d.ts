import { Account, PublicAPI } from '../..';
import { U64 } from '../../basicElements/serializers/number/u64';
import { CallSCParams, DeploySCParams, ReadSCParams, ReadSCData } from '..';
import { Mas } from '../../basicElements/mas';
export declare class SCProvider {
    client: PublicAPI;
    account: Account;
    constructor(client: PublicAPI, account: Account);
    /**
     * Reads smart contract function.
     * @param params - readSCParams.
     * @returns A promise that resolves to a ReadSCData.
     */
    readSC(params: ReadSCParams): Promise<ReadSCData>;
    /**
     * Executes a smart contract call operation
     * @param params - callSCParams.
     * @returns A promise that resolves to an Operation object representing the transaction.
     */
    call(params: CallSCParams): Promise<string>;
    /**
     * Returns the gas estimation for a given function.
     *
     * @remarks To avoid running out of gas, the gas estimation is increased by 20%.
     *
     * @param params - callSCParams.
     * @throws If the read operation returns an error.
     * @returns The gas estimation for the function.
     */
    protected getGasEstimation(params: CallSCParams): Promise<U64>;
    protected checkAccountBalance(coins: Mas): Promise<void>;
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
    protected deploy(params: DeploySCParams): Promise<string>;
}
