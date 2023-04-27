"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JSON_RPC_REQUEST_METHOD = void 0;
var JSON_RPC_REQUEST_METHOD;
(function (JSON_RPC_REQUEST_METHOD) {
    // public Api
    JSON_RPC_REQUEST_METHOD["GET_STATUS"] = "get_status";
    JSON_RPC_REQUEST_METHOD["GET_ADDRESSES"] = "get_addresses";
    JSON_RPC_REQUEST_METHOD["SEND_OPERATIONS"] = "send_operations";
    JSON_RPC_REQUEST_METHOD["GET_BLOCKS"] = "get_blocks";
    JSON_RPC_REQUEST_METHOD["GET_ENDORSEMENTS"] = "get_endorsements";
    JSON_RPC_REQUEST_METHOD["GET_OPERATIONS"] = "get_operations";
    JSON_RPC_REQUEST_METHOD["GET_CLIQUES"] = "get_cliques";
    JSON_RPC_REQUEST_METHOD["GET_STAKERS"] = "get_stakers";
    JSON_RPC_REQUEST_METHOD["GET_FILTERED_SC_OUTPUT_EVENT"] = "get_filtered_sc_output_event";
    JSON_RPC_REQUEST_METHOD["EXECUTE_READ_ONLY_BYTECODE"] = "execute_read_only_bytecode";
    JSON_RPC_REQUEST_METHOD["EXECUTE_READ_ONLY_CALL"] = "execute_read_only_call";
    JSON_RPC_REQUEST_METHOD["GET_DATASTORE_ENTRIES"] = "get_datastore_entries";
    JSON_RPC_REQUEST_METHOD["GET_BLOCKCLIQUE_BLOCK_BY_SLOT"] = "get_blockclique_block_by_slot";
    JSON_RPC_REQUEST_METHOD["GET_GRAPH_INTERVAL"] = "get_graph_interval";
    // private Api
    JSON_RPC_REQUEST_METHOD["STOP_NODE"] = "stop_node";
    JSON_RPC_REQUEST_METHOD["NODE_BAN_BY_IP"] = "node_ban_by_ip";
    JSON_RPC_REQUEST_METHOD["NODE_BAN_BY_ID"] = "node_ban_by_id";
    JSON_RPC_REQUEST_METHOD["NODE_UNBAN_BY_IP"] = "node_unban_by_ip";
    JSON_RPC_REQUEST_METHOD["NODE_UNBAN_BY_ID"] = "node_unban_by_id";
    JSON_RPC_REQUEST_METHOD["GET_STAKING_ADDRESSES"] = "get_staking_addresses";
    JSON_RPC_REQUEST_METHOD["REMOVE_STAKING_ADDRESSES"] = "remove_staking_addresses";
    JSON_RPC_REQUEST_METHOD["ADD_STAKING_PRIVATE_KEYS"] = "add_staking_private_keys";
    JSON_RPC_REQUEST_METHOD["NODE_SIGN_MESSAGE"] = "node_sign_message";
    JSON_RPC_REQUEST_METHOD["NODE_REMOVE_FROM_WHITELIST"] = "node_remove_from_whitelist";
    JSON_RPC_REQUEST_METHOD["NODE_ADD_TO_PEERS_WHITELIST"] = "node_add_to_peers_whitelist";
})(JSON_RPC_REQUEST_METHOD = exports.JSON_RPC_REQUEST_METHOD || (exports.JSON_RPC_REQUEST_METHOD = {}));
//# sourceMappingURL=JsonRpcMethods.js.map