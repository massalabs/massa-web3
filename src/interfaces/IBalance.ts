/**
 * Represents the balance information for a given address.
 * @remarks
 * This interface is used to track both the final and candidate balances
 * for an address, which are represented as BigInt.
 */
export interface IBalance {
  final: bigint;
  candidate: bigint;
}
