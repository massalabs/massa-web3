import { Slot } from './Slot';

/**
 * Represents a graph interval.
 *
 * @see id of type `string` represents the graph id.
 * @see is_final of type `boolean` represents if the graph is final.
 * @see is_stale of type `boolean` represents if the graph is stale.
 * @see is_in_blockclique of type `boolean` represents if the graph has been added to the blockclique.
 * @see slot of type `Slot` represents the time slot when the graph was created.
 * @see creator of type `string` represents the creator of the graph.
 * @see parents of type `Array<string>` represents the parents of the graph.
 */
export interface GraphInterval {
  id: string; // graph id
  is_final: boolean; // is final ?
  is_stale: boolean; // is stale ?
  is_in_blockclique: boolean; // has it been added to the blockclique
  slot: Slot; // slot ?
  creator: string; // creator
  parents: Array<string>; // parents
}
