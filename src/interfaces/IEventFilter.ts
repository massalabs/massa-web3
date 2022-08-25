import { ISlot } from "./ISlot";

export interface IEventFilter {
    start: null | ISlot;
	end: null | ISlot;
	emitter_address: null | string; // Address
	original_caller_address: null | string; // Address
	original_operation_id: null | string; // operation id
	/// is_final value (true=resolves to only final events, false => resolves to only candidate events, null => resolves to final and candidate events)
	is_final: boolean | null;
}
