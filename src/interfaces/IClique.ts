/**
 * Represents a clique of blocks in the blockchain.
 *
 * @remarks
 * This interface is used to track a block clique, including the block IDs,
 * the fitness of the clique, and whether it is a valid block clique.
 * Fitness is a measure of the quality of a block clique, with a higher fitness value
 * indicating a better block clique.
 *
 * @see block_ids - An array of strings representing the block IDs in the clique.
 * @see fitness - A number representing the fitness value of the block clique.
 * @see is_blockclique - A boolean indicating whether the clique is a valid block clique.
 */
export interface IClique {
  block_ids: string[];
  fitness: number;
  is_blockclique: boolean;
}
