import { EOperationStatus } from "../interfaces/EOperationStatus";
import { IAccount } from "../interfaces/IAccount";
import { ICallData } from "../interfaces/ICallData";
import { IClientConfig } from "../interfaces/IClientConfig";
import { IContractData } from "../interfaces/IContractData";
import { IContractReadOperationData } from "../interfaces/IContractReadOperationData";
import { IEvent } from "../interfaces/IEvent";
import { IEventFilter } from "../interfaces/IEventFilter";
import { IExecuteReadOnlyResponse } from "../interfaces/IExecuteReadOnlyResponse";
import { IReadData } from "../interfaces/IReadData";
import { BaseClient } from "./BaseClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";
/** Smart Contracts Client which enables compilation, deployment and streaming of events */
export declare class SmartContractsClient extends BaseClient {
    private readonly publicApiClient;
    private readonly walletClient;
    private isWebAssemblyCliInitialized;
    constructor(clientConfig: IClientConfig, publicApiClient: PublicApiClient, walletClient: WalletClient);
    /** create and send an operation containing byte code */
    deploySmartContract(contractData: IContractData, executor: IAccount): Promise<Array<string>>;
    /** call smart contract method */
    callSmartContract(callData: ICallData, executor: IAccount): Promise<Array<string>>;
    /** read smart contract method */
    readSmartContract(readData: IReadData): Promise<Array<IContractReadOperationData>>;
    /** get filtered smart contract events */
    getFilteredScOutputEvents(eventFilterData: IEventFilter): Promise<Array<IEvent>>;
    /** Read-only smart contracts */
    executeReadOnlySmartContract(contractData: IContractData): Promise<Array<IExecuteReadOnlyResponse>>;
    getOperationStatus(opId: string): Promise<EOperationStatus>;
    awaitRequiredOperationStatus(opId: string, requiredStatus: EOperationStatus): Promise<EOperationStatus>;
}
