/**
 * Represents the inputs of a datastore entry.
 *
 * @see address of type `string` represents the address of the datastore entry.
 * @see key of type `Uint8Array` represents the key of the datastore entry.
 */
export interface IDatastoreEntryInput {
  address: string;
  key: Uint8Array;
}
