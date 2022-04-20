import { ISlot } from "./ISlot";
export interface IExecuteReadOnlyResponse {
    executed_at: ISlot;
    result: string | null;
    output_events: Map<string, ISCOutputEvent>;
}
export interface ISCOutputEvent {
    id: string;
    context: IEventExecutionContext;
    data: string;
}
export interface IEventExecutionContext {
    slot: ISlot;
    block: string | null;
    read_only: boolean;
    index_in_slot: number;
    call_stack: Object;
    origin_operation_id: string | null;
}
