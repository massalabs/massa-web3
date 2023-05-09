import { IEvent } from './IEvent';
import { IReadOperationResult } from './IReadOperationResult';
import { ISlot } from './ISlot';

/**
 * Represents the inputs of a read-only operation on a deployed contract.
 *
 * @see executed_at of type `ISlot` represents the time slot when the read operation was executed.
 * @see result of type `IReadOperationResult` represents the result of the read operation.
 * @see output_events of type `Array<IEvent>` represents any events that were emitted during the execution of the read operation.
 * @see gas_cost of type `number` represents the amount of gas that was consumed by the read operation.
 */
export interface IContractReadOperationData {
  executed_at: ISlot;
  result: IReadOperationResult;
  output_events: Array<IEvent>;
  gas_cost: number;
}
