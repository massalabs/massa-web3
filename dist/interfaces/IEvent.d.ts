export interface IEvent {
    data: string;
    id: string;
    context: {
        slot: {
            period: number;
            thread: number;
        };
        block: null | string;
        read_only: Boolean;
        call_stack: [string];
        index_in_slot: number;
        origin_operation_id: null | string;
    };
}
