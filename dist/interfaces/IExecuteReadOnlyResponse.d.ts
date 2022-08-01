import { IEvent } from "./IEvent";
import { ISlot } from "./ISlot";
export interface IExecuteReadOnlyResponse {
    executed_at: ISlot;
    result: string | null;
    output_events: Map<string, IEvent>;
}
