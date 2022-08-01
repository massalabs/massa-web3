import { IEvent } from "./IEvent";
import { ISlot } from "./ISlot";

export interface IContractReadOperationData {
	executed_at: ISlot;
	result: string; // "Ok" or error message
	output_events: Array<IEvent>;
}
