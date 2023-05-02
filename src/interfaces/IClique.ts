/**
 * Represents a clique of blocks in the blockchain.
 * @remarks
 * This interface is used to track a block clique, including the block IDs,
 * the fitness of the clique, and whether it is a valid block clique. Fitness
 * is a measure of the quality of a block clique, with a higher fitness value
 * indicating a better block clique.
 */
export interface IClique {
  block_ids: string[];
  fitness: number;
  is_blockclique: boolean;
}
