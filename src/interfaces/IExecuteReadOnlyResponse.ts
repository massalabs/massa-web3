import { IExecuteReadOnlyData } from "./IExecuteReadOnlyData";

export interface IExecuteReadOnlyResponse {
	returnValue: Uint8Array;
	info: IExecuteReadOnlyData;
}