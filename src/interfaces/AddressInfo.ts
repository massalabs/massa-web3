import { Slot } from './Slot';

/**
 * Represents the production statistics for a specific cycle.
 *
 * @remarks
 * This interface is used to track the production statistics of a cycle,
 * including the number of successful and unsuccessful production attempts.
 */
export interface ProductionStats {
  cycle: number;
  is_final: boolean;
  nok_count: number;
  ok_count: number;
}

/**
 * Represents the endorsement draws data for a slot and its index.
 */
export interface EndorsementDraws {
  slot: Slot;
  index: number;
}

/**
 * Represents a ledger datastore with a mapping of string keys to an array of numbers.
 */
export interface LedgerDatastore {
  [name: string]: number[];
}

/**
 * Represents the cycle information including active rolls, cycle number, and production statistics.
 */
export interface CycleInfos {
  active_rolls: number;
  cycle: number;
  is_final: boolean;
  nok_count: number;
  ok_count: number;
}

/**
 * Represents the deferred credits for a specific slot and amount.
 */
export interface DeferredCredits {
  slot: Slot;
  amount: number;
}

/**
 * Represents the address information including balances, datastore keys, roll counts,
 * and information about created blocks, endorsements, and operations.
 */
export interface AddressInfo {
  address: string;
  candidate_balance: string; // Represents an amount in coins.
  candidate_datastore_keys: Array<Array<number>>;
  candidate_roll_count: number;
  created_blocks: Array<string>;
  created_endorsements: Array<string>;
  created_operations: Array<string>;
  cycle_infos: Array<CycleInfos>;
  deferred_credits: Array<DeferredCredits>;
  final_balance: string; // Represents an amount in coins.
  final_datastore_keys: Array<Array<number>>;
  final_roll_count: number;
  next_block_draws: Slot[];
  next_endorsement_draws: Array<EndorsementDraws>;
  thread: number;
}
