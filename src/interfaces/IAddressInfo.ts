import { ISlot } from './ISlot';

/**
 * Represents the production statistics for a specific cycle.
 * @remarks
 * This interface is used to track the production statistics of a cycle,
 * including the number of successful and unsuccessful production attempts.
 */
export interface IProductionStats {
  cycle: number;
  is_final: boolean;
  nok_count: number;
  ok_count: number;
}

/**
 * Represents the endorsement draws data for a slot and its index.
 * @remarks
 * This interface is used to track the endorsement draws information,
 * including the slot and index of the draw.
 */
export interface IEndorsementDraws {
  slot: ISlot;
  index: number;
}

/**
 * Represents a ledger datastore with a mapping of string keys to an array of numbers.
 * @remarks
 * This interface is used to define a ledger datastore that maps string keys
 * to an array of numbers.
 */
export interface ILedgerDatastore {
  [name: string]: number[];
}

/**
 * Represents the cycle information including active rolls, cycle number, and production statistics.
 * @remarks
 * This interface is used to track the cycle information, including the number of active rolls,
 * cycle number, and statistics related to production attempts.
 */
export interface ICycleInfos {
  active_rolls: number;
  cycle: number;
  is_final: boolean;
  nok_count: number;
  ok_count: number;
}

/**
 * Represents the deferred credits for a specific slot and amount.
 * @remarks
 * This interface is used to track the deferred credits information,
 * including the slot for which the deferred credits are applied and the amount.
 */
export interface IDeferredCredits {
  slot: ISlot;
  amount: number;
}

/**
 * Represents the address information including balances, datastore keys, roll counts,
 * and information about created blocks, endorsements, and operations.
 * @remarks
 * This interface is used to track address-related information, including balances,
 * roll counts, created blocks, endorsements, and operations, as well as cycle
 * information and deferred credits.
 */
export interface IAddressInfo {
  address: string;
  candidate_balance: string; // represent an Amount in coins
  candidate_datastore_keys: Array<Array<number>>;
  candidate_roll_count: number;
  created_blocks: Array<string>;
  created_endorsements: Array<string>;
  created_operations: Array<string>;
  cycle_infos: Array<ICycleInfos>;
  deferred_credits: Array<IDeferredCredits>;
  final_balance: string; // represent an Amount in coins
  final_datastore_keys: Array<Array<number>>;
  final_roll_count: number;
  next_block_draws: ISlot[];
  next_endorsement_draws: Array<IEndorsementDraws>;
  thread: number;
}
