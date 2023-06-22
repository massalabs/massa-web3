/**
 * Interface for staking addresses
 *
 * @see name - name of the staking address with the number of rolls it has
 */
export interface StakingAddresses {
  [name: string]: number; // address-rolls number
}
