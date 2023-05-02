import { ISlot } from './ISlot';

/**
 * Allows you to filter events by their properties.
 *
 * @see start of type `ISlot` represents the start of the time interval (can be null).
 * @see end of type `ISlot` represents the end of the time interval (can be null).
 * @see emitter_address of type `string` represents the address that emitted the event (can be null).
 * @see original_caller_address of type `string` represents the operation id that generated the event (can be null).
 * @see is_final of type `boolean` to filter final events (true), candidate events (false) or both (null).
 *
 */
export interface IEventFilter {
  start: null | ISlot;
  end: null | ISlot;
  emitter_address: null | string; // Address
  original_caller_address: null | string; // Address
  original_operation_id: null | string; // operation id
  /// is_final value (true=resolves to only final events, false => resolves to only candidate events, null => resolves to final and candidate events)
  is_final: boolean | null;
}
