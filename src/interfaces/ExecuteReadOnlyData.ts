import { Event } from './Event';
import { ReadOperationResult } from './ReadOperationResult';
import { Slot } from './Slot';

/**
 * Represents the inputs of a read-only operation on a deployed contract.
 *
 * @see executed_at of type `Slot` represents the slot when the read operation was executed.
 * @see result of type `ReadOperationResult` represents the result of the read operation.
 * @see output_events of type `Array<Event>` represents any events that were emitted during the execution of the read operation.
 * @see gas_cost of type `number` represents the amount of gas that was consumed by the read operation.
 */
export interface ExecuteReadOnlyData {
  executed_at: Slot;
  result: ReadOperationResult;
  output_events: Array<Event>;
  gas_cost: number;
}
