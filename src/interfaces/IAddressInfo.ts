export interface IProductionStats {
    cycle: number;
    is_final: boolean;
    nok_count: number;
    ok_count: number;
}

export interface IEndorsementDraws {
    slot: {
        period: number,
        thread: number,
    };
    index: number;
}

export interface ILedgerDatastore {
    [name: string]: number[];
}

export interface ICycleInfos {
    active_rolls: number;
    cycle: number;
    is_final: boolean;
    nok_count: number;
    ok_count: number;
}

export interface IDeferredCredits {
    slot: {
        period: number,
        thread: number,
    };
    amount: number;
}

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
    next_block_draws: [
        {
            period: number,
            thread: number,
        },
    ];
    next_endorsement_draws: Array<IEndorsementDraws>;
    thread: number;
  }