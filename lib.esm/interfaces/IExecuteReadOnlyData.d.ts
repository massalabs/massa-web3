import { IEvent } from './IEvent';
import { IReadOperationResult } from './IReadOperationResult';
import { ISlot } from './ISlot';
export interface IExecuteReadOnlyData {
    executed_at: ISlot;
    result: IReadOperationResult;
    output_events: Array<IEvent>;
    gas_cost: number;
}
