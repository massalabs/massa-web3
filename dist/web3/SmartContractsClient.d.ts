/// <reference types="node" />
import * as fs from "fs";
import { EOperationStatus } from "../interfaces/EOperationStatus";
import { IAccount } from "../interfaces/IAccount";
import { ICallData } from "../interfaces/ICallData";
import { IClientConfig } from "../interfaces/IClientConfig";
import { IContractData } from "../interfaces/IContractData";
import { IEvent } from "../interfaces/IEvent";
import { IEventFilter } from "../interfaces/IEventFilter";
import { IExecuteReadOnlyResponse } from "../interfaces/IExecuteReadOnlyResponse";
import { BaseClient } from "./BaseClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";
export interface CompiledSmartContract {
    binary: Uint8Array;
    text: string;
    base64: string;
}
export interface WasmConfig {
    smartContractFilePath: fs.PathLike;
    wasmBinaryPath?: fs.PathLike;
    wasmTextPath?: fs.PathLike;
}
/** Smart Contracts Client which enables compilation, deployment and streaming of events */
export declare class SmartContractsClient extends BaseClient {
    private readonly publicApiClient;
    private readonly walletClient;
    private isWebAssemblyCliInitialized;
    constructor(clientConfig: IClientConfig, publicApiClient: PublicApiClient, walletClient: WalletClient);
    /** initializes the webassembly cli under the hood */
    private initWebAssemblyCli;
    /** compile smart contract on the fly using the assemblyscript smart contract code as a string */
    compileSmartContractFromString(smartContractContent: string): Promise<CompiledSmartContract>;
    /** compile smart contract from a physical assemblyscript (.ts) file */
    compileSmartContractFromSourceFile(config: WasmConfig): Promise<CompiledSmartContract>;
    /** compile smart contract from a physical assemblyscript file */
    compileSmartContractFromWasmFile(wasmFilePath: fs.PathLike): Promise<CompiledSmartContract>;
    /** compile smart contract from a physical assemblyscript (.ts) file */
    compileSmartContractOnTheFly(smartContractContent: string): Promise<any>;
    /** create and send an operation containing byte code */
    deploySmartContract(contractData: IContractData, executor: IAccount): Promise<Array<string>>;
    /** call smart contract method */
    callSmartContract(callData: ICallData, executor: IAccount): Promise<Array<string>>;
    /** get filtered smart contract events */
    getFilteredScOutputEvents(eventFilterData: IEventFilter): Promise<Array<IEvent>>;
    /** Read-only smart contracts */
    executeReadOnlySmartContract(contractData: IContractData): Promise<Array<IExecuteReadOnlyResponse>>;
    private getOperationStatus;
    awaitFinalOperationStatus(opId: string): Promise<EOperationStatus>;
}
