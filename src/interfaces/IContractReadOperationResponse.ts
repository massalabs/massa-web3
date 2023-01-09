import { IContractReadOperationData } from "./IContractReadOperationData";

export interface IContractReadOperationResponse {
	returnValue: Uint8Array;
	info: IContractReadOperationData;
}
