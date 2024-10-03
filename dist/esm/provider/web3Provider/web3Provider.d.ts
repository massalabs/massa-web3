/// <reference types="node" />
import { CallSCParams, DeploySCParams, NodeStatusInfo, Provider, SignedData } from '..';
import { SCProvider } from './smartContracts';
import { Account, Address, EventFilter, Network, SCEvent, SmartContract } from '../..';
import { Mas } from '../../basicElements/mas';
import { Operation, OperationStatus, OperationOptions } from '../../operation';
export declare class Web3Provider extends SCProvider implements Provider {
    static fromRPCUrl(url: string, account: Account): Web3Provider;
    static mainnet(account: Account): Web3Provider;
    static buildnet(account: Account): Web3Provider;
    private readonly _providerName;
    get accountName(): string;
    get providerName(): string;
    get address(): string;
    balance(final?: boolean): Promise<bigint>;
    networkInfos(): Promise<Network>;
    private rollOperation;
    /**
     * Buys rolls.
     *
     * @param amount - The number of rolls to buy.
     * @param opts - Optional operation details.
     *
     * @returns The ID of the operation.
     * @throws If the amount of rolls is not a positive non-zero value.
     */
    buyRolls(amount: Mas, opts?: OperationOptions): Promise<Operation>;
    /**
     * Sells rolls.
     *
     * @param amount - The number of rolls to sell.
     * @param opts - Optional operation details.
     *
     * @returns The ID of the operation.
     * @throws If the amount of rolls is not a positive non-zero value.
     */
    sellRolls(amount: Mas, opts?: OperationOptions): Promise<Operation>;
    /**
     * Transfers tokens.
     *
     * @param to - The address of the recipient.
     * @param amount - The amount of tokens to transfer.
     * @param opts - Optional operation details.
     *
     * @returns The ID of the operation.
     * @throws If the amount of tokens is not a positive non-zero value.
     */
    transfer(to: Address | string, amount: Mas, opts?: OperationOptions): Promise<Operation>;
    sign(data: Buffer | Uint8Array | string): Promise<SignedData>;
    callSC(params: CallSCParams): Promise<Operation>;
    deploySC(params: DeploySCParams): Promise<SmartContract>;
    getOperationStatus(opId: string): Promise<OperationStatus>;
    getEvents(filter: EventFilter): Promise<SCEvent[]>;
    getNodeStatus(): Promise<NodeStatusInfo>;
}
