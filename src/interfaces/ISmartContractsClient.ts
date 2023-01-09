import { EOperationStatus } from "./EOperationStatus";
import { IAccount } from "./IAccount";
import { IBalance } from "./IBalance";
import { ICallData } from "./ICallData";
import { IContractData } from "./IContractData";
import { IContractReadOperationResponse } from "./IContractReadOperationResponse";
import { IEvent } from "./IEvent";
import { IEventFilter } from "./IEventFilter";
import { IExecuteReadOnlyResponse } from "./IExecuteReadOnlyResponse";
import { IReadData } from "./IReadData";

export interface ISmartContractsClient {
	deploySmartContract(contractData: IContractData, executor?: IAccount): Promise<string>;
	callSmartContract(callData: ICallData, executor?: IAccount): Promise<string>;
	readSmartContract(readData: IReadData): Promise<IContractReadOperationResponse>;
	getContractBalance(address: string): Promise<IBalance | null>;
	getFilteredScOutputEvents(eventFilterData: IEventFilter): Promise<Array<IEvent>>;
	executeReadOnlySmartContract(contractData: IContractData): Promise<IExecuteReadOnlyResponse>;
	getOperationStatus(opId: string): Promise<EOperationStatus>;
	awaitRequiredOperationStatus(opId: string, requiredStatus: EOperationStatus): Promise<EOperationStatus>;
}
