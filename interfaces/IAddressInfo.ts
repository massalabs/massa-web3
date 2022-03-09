export interface IAddressInfo {
    address: string,
    balance: {
        candidate_balance: string, // represent an Amount in coins
        final_balance: string, // represent an Amount in coins
        locked_balance: string, // represent an Amount in coins
    },
    block_draws: [
        {
            period: number,
            thread: number,
        },
    ],
    blocks_created: [string], // Block ids
    endorsement_draws: [
        {
            slot: {
                period: number,
                thread: number,
            },
            index: number,
        },
    ],
    involved_in_endorsements: [string], // Endorsement Id
    involved_in_operations: [string], // Operation id
    production_stats: [
        // as many items as cached cycles
        {
            cycle: number,
            is_final: boolean,
            nok_count: number,
            ok_count: number,
        },
    ],
    rolls: {
        active_rolls: number,
        candidate_rolls: number,
        final_rolls: number,
    },
    thread: number,
    sce_ledger_info: {
        balance: String // reprensents an amount
        module: null | [number] // stored bytecode
        datastore: {
            xxxxxxxxxxxxxxxxxxxxxx: [number] // bytes
        }
    }
  }
