/**
 * Represents a slot
 *
 * @see period - period of the slot
 * @see thread - thread of the slot
 */
export interface Slot {
  period: number; // will use by default Slot{period: 0, thread: 0}
  thread: number; // will use by default Slot{period: 0, thread: 0}
}
