export interface NodesMap {
    [name: string]: string;
}
export interface INodeStatus {
    config: {
        block_reward: string;
        delta_f0: number;
        end_timestamp: number | null;
        genesis_timestamp: number;
        max_block_size: number;
        operation_validity_periods: number;
        periods_per_cycle: number;
        pos_lock_cycles: number;
        pos_lookback_cycles: number;
        roll_price: string;
        t0: number;
        thread_count: number;
    };
    connected_nodes: NodesMap;
    consensus_stats: {
        clique_count: 1;
        end_timespan: number;
        final_block_count: number;
        final_operation_count: number;
        staker_count: number;
        stale_block_count: number;
        start_timespan: number;
    };
    current_cycle: number;
    current_time: number;
    last_slot: {
        period: number;
        thread: number;
    };
    network_stats: {
        active_node_count: number;
        banned_peer_count: number;
        in_connection_count: number;
        known_peer_count: number;
        out_connection_count: number;
    };
    next_slot: {
        period: number;
        thread: number;
    };
    node_id: string;
    node_ip: string | null;
    pool_stats: {
        endorsement_count: number;
        operation_count: number;
    };
    version: string;
}
