import { ISlot } from "./ISlot";
export interface IEvent {
    id?: string;
    data: string;
    context: {
        slot: ISlot;
        block: null | string;
        read_only: Boolean;
        call_stack: [string];
        index_in_slot: number;
        origin_operation_id: null | string;
    };
}
