/**
 * Represents the data entry both at the latest final and active executed slots.
 *
 * @see final_value of type `Uint8Array | null` represents the value of the data entry at the latest final executed slot.
 * @see candidate_value of type `Uint8Array | null` represents the value of the data entry at the latest active executed slot.
 */
export interface DatastoreEntry {
  final_value: Uint8Array | null;
  candidate_value: Uint8Array | null;
}
