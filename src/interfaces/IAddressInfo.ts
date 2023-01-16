import { ISlot } from "./ISlot";

export interface IProductionStats {
    /**
     * The current cycle number
	 * */
    cycle: number;
    /**
     * Boolean if the cycle is final
	 * */
    is_final: boolean;
    /**
     * Count of not successful sub-cycles
	 * */
    nok_count: number;
    /**
     * Count of successful sub-cycles
	 * */
    ok_count: number;
}

export interface IEndorsementDraws {
    /**
     * The slot of the endorsement
	 * */
    slot: ISlot;
    /**
     * The endorsement index
	 * */
    index: number;
}

export interface ILedgerDatastore {
    /**
     * A map containing datastore entries as pairs of mapped keys to bytearray entries
	 * */
    [name: string]: [number];
}

export interface ICycleInfos {
    /**
     * The number of active rolls
	 * */
    active_rolls: number;
    /**
     * The current cycle number
	 * */
    cycle: number;
    /**
     * Boolean if the cycle is final
	 * */
    is_final: boolean;
    /**
     * Count of not successful sub-cycles
	 * */
    nok_count: number;
    /**
     * Count of successful sub-cycles
	 * */
    ok_count: number;
}

export interface IDeferredCredits {
    /**
     * The slot info
	 * */
    slot: ISlot;
    /**
     * The amount of differed credit
	 * */
    amount: number;
}

export interface IAddressInfo {
    /**
     * The address
	 * */
    address: string;
    /**
     * The candidate balance in coins
	 * */
    candidate_balance: string;
    /**
     * The candidate datastore keys in an array
	 * */
    candidate_datastore_keys: Array<Array<number>>;
    /**
     * The candidate roll count amount
	 * */
    candidate_roll_count: number;
    /**
     * The created block ids
	 * */
    created_blocks: Array<string>;
    /**
     * The created endorsement ids
	 * */
    created_endorsements: Array<string>;
    /**
     * The created operation ids
	 * */
    created_operations: Array<string>;
    /**
     * Information about the cycles
	 * */
    cycle_infos: Array<ICycleInfos>;
    /**
     * Information about the deferred cycles
	 * */
    deferred_credits: Array<IDeferredCredits>;
    /**
     * Final coins balance
	 * */
    final_balance: string;
    /**
     * Final datastore keys
	 * */
    final_datastore_keys: Array<Array<number>>;
    /**
     * Final rolls count
	 * */
    final_roll_count: number;
    /**
     * Slots for the next block draw
	 * */
    next_block_draws: Array<ISlot>;
    /**
     * Next endorsement draws
	 * */
    next_endorsement_draws: Array<IEndorsementDraws>;
    /**
     * Thread number
	 * */
    thread: number;
  }