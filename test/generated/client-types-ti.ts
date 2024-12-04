/**
 * This module was automatically generated by `ts-interface-builder`
 */
import * as t from "ts-interface-checker";
// tslint:disable:object-literal-key-quotes

export const GasAmount = t.name("number");

export const Integer2AHOqbcQ = t.name("number");

export const Bytes = t.array("Integer2AHOqbcQ");

export const NullQu0Arl1F = t.name("null");

export const Address = t.name("string");

export const AddressOption = t.union("NullQu0Arl1F", "Address");

export const OperationDatastore = t.union("NullQu0Arl1F", "Bytes");

export const Amount = t.name("string");

export const AmountOption = t.union("NullQu0Arl1F", "Amount");

export const ReadOnlyBytecodeExecution = t.iface([], {
  "max_gas": "GasAmount",
  "bytecode": "Bytes",
  "address": t.opt("AddressOption"),
  "operation_datastore": t.opt("OperationDatastore"),
  "fee": t.opt("AmountOption"),
});

export const TargetFunction = t.name("string");

export const ReadOnlyCall = t.iface([], {
  "max_gas": "GasAmount",
  "target_address": "Address",
  "target_function": "TargetFunction",
  "parameter": "Bytes",
  "caller_address": "AddressOption",
  "coins": "AmountOption",
  "fee": "AmountOption",
});

export const IsFinal = t.name("boolean");

export const AddressFilter = t.iface([], {
  "address": t.opt("Address"),
  "is_final": t.opt("IsFinal"),
});

export const BlockId = t.name("string");

export const Period = t.name("number");

export const Thread = t.name("number");

export const DatastoreEntryInput = t.iface([], {
  "address": "Address",
  "key": "Bytes",
});

export const Slot = t.iface([], {
  "period": "Period",
  "thread": "Thread",
});

export const EndorsementId = t.name("string");

export const OperationId = t.name("string");

export const Error = t.name("boolean");

export const NumberHo1ClIqD = t.name("number");

export const PrivateKey = t.name("string");

export const IpAddress = t.name("string");

export const StringDoaGddGA = t.name("string");

export const PublicKey = t.name("string");

export const Signature = t.name("string");

export const OperationInput = t.iface([], {
  "creator_public_key": "PublicKey",
  "signature": "Signature",
  "serialized_content": "Bytes",
});

export const Pagination = t.iface([], {
  "limit": "NumberHo1ClIqD",
  "offset": "NumberHo1ClIqD",
});

export const StringOz2F8Z2Y = t.name("string");

export const ReadOnlyResult = t.iface([], {
  "Ok": t.opt("Bytes"),
  "Error": t.opt("StringOz2F8Z2Y"),
});

export const EventData = t.name("string");

export const BlockIdOption = t.union("NullQu0Arl1F", "BlockId");

export const IsReadonly = t.name("boolean");

export const AddressStack = t.array("Address");

export const IndexInSlot = t.name("number");

export const EventExecutionContext = t.iface([], {
  "slot": "Slot",
  "block": t.opt("BlockIdOption"),
  "read_only": "IsReadonly",
  "call_stack": "AddressStack",
  "index_in_slot": "IndexInSlot",
  "origin_operation_id": t.opt("OperationId"),
  "is_final": "IsFinal",
  "is_error": t.opt("Error"),
});

export const SCOutputEvent = t.iface([], {
  "data": "EventData",
  "context": "EventExecutionContext",
});

export const OutputEvents = t.array("SCOutputEvent");

export const ObjectD93Z4FAG = t.iface([], {
  [t.indexKey]: "any",
});

export const ObjectHAgrRKSz = t.iface([], {
  [t.indexKey]: "any",
});

export const UnorderedSetOfObjectHAgrRKSz46QV1Tyv = t.array("ObjectHAgrRKSz");

export const ObjectYWuwfL0B = t.iface([], {
  [t.indexKey]: "any",
});

export const ObjectTK16EAH4 = t.iface([], {
  [t.indexKey]: "any",
});

export const Object413CQ8L2 = t.iface([], {
  [t.indexKey]: "any",
});

export const ObjectOfStringDoaGddGANwpLofVw = t.iface([], {
  "Set": "StringDoaGddGA",
  [t.indexKey]: "any",
});

export const ExecutionTrailHashChange = t.union("ObjectOfStringDoaGddGANwpLofVw", "StringDoaGddGA");

export const StateChanges = t.iface([], {
  "ledger_changes": "ObjectD93Z4FAG",
  "async_pool_changes": "UnorderedSetOfObjectHAgrRKSz46QV1Tyv",
  "pos_changes": "ObjectYWuwfL0B",
  "executed_ops_changes": "ObjectTK16EAH4",
  "executed_denunciations_changes": "Object413CQ8L2",
  "execution_trail_hash_change": "ExecutionTrailHashChange",
});

export const ExecuteReadOnlyResponse = t.iface([], {
  "executed_at": "Slot",
  "result": "ReadOnlyResult",
  "output_events": "OutputEvents",
  "gas_cost": "GasAmount",
  "state_changes": "StateChanges",
});

export const RollAmount = t.name("number");

export const DatastoreKeys = t.array("Bytes");

export const ObjectOfSlotAmountWrpyYBUS = t.iface([], {
  "slot": t.opt("Slot"),
  "amount": t.opt("Amount"),
  [t.indexKey]: "any",
});

export const DeferredCredits = t.array("ObjectOfSlotAmountWrpyYBUS");

export const UnorderedSetOfSlotwrpyYBUS = t.array("Slot");

export const ObjectOfSlotNumberHo1ClIqDWrpyYBUS = t.iface([], {
  "slot": t.opt("Slot"),
  "index": t.opt("NumberHo1ClIqD"),
  [t.indexKey]: "any",
});

export const UnorderedSetOfObjectOfSlotNumberHo1ClIqDWrpyYBUSwrpyYBUS = t.array("ObjectOfSlotNumberHo1ClIqDWrpyYBUS");

export const BlockIdList = t.array("BlockId");

export const UnorderedSetOfOperationIdwrpyYBUS = t.array("OperationId");

export const UnorderedSetOfEndorsementIdwrpyYBUS = t.array("EndorsementId");

export const OneOfRollAmountNullQu0Arl1FGg9ZJg6R = t.union("NullQu0Arl1F", "RollAmount");

export const ExecutionAddressCycleInfo = t.iface([], {
  "cycle": "NumberHo1ClIqD",
  "is_final": "IsFinal",
  "ok_count": "NumberHo1ClIqD",
  "nok_count": "NumberHo1ClIqD",
  "active_rolls": t.opt("OneOfRollAmountNullQu0Arl1FGg9ZJg6R"),
});

export const UnorderedSetOfExecutionAddressCycleInfowrpyYBUS = t.array("ExecutionAddressCycleInfo");

export const AddressInfo = t.iface([], {
  "address": "Address",
  "thread": "Thread",
  "final_balance": "Amount",
  "final_roll_count": "RollAmount",
  "final_datastore_keys": "DatastoreKeys",
  "candidate_balance": "Amount",
  "candidate_roll_count": "RollAmount",
  "candidate_datastore_keys": "DatastoreKeys",
  "deferred_credits": "DeferredCredits",
  "next_block_draws": "UnorderedSetOfSlotwrpyYBUS",
  "next_endorsement_draws": "UnorderedSetOfObjectOfSlotNumberHo1ClIqDWrpyYBUSwrpyYBUS",
  "created_blocks": "BlockIdList",
  "created_operations": "UnorderedSetOfOperationIdwrpyYBUS",
  "created_endorsements": "UnorderedSetOfEndorsementIdwrpyYBUS",
  "cycle_infos": "UnorderedSetOfExecutionAddressCycleInfowrpyYBUS",
});

export const IsCandidate = t.name("boolean");

export const IsDiscarded = t.name("boolean");

export const InBlockClique = t.name("boolean");

export const NumberTbrodUsH = t.name("number");

export const OneOfNullQu0Arl1FNumberHo1ClIqD4U4GpKJM = t.union("NullQu0Arl1F", "NumberHo1ClIqD");

export const EndorsementContent = t.iface([], {
  "slot": "Slot",
  "index": "NumberHo1ClIqD",
  "endorsed_block": "BlockId",
});

export const ObjectOfSignatureEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUS = t.iface([], {
  "content": t.opt("EndorsementContent"),
  "signature": t.opt("Signature"),
  "content_creator_pub_key": t.opt("PublicKey"),
  "content_creator_address": t.opt("Address"),
  "id": t.opt("EndorsementId"),
  [t.indexKey]: "any",
});

export const UnorderedSetOfObjectOfSignatureEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUSwrpyYBUS = t.array("ObjectOfSignatureEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUS");

export const ObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUS = t.iface([], {
  "public_key": t.opt("PublicKey"),
  "slot": t.opt("Slot"),
  "index": t.opt("Integer2AHOqbcQ"),
  "hash_1": t.opt("StringDoaGddGA"),
  "hash_2": t.opt("StringDoaGddGA"),
  "signature_1": t.opt("Signature"),
  "signature_2": t.opt("Signature"),
  [t.indexKey]: "any",
});

export const ObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUS = t.iface([], {
  "public_key": t.opt("PublicKey"),
  "slot": t.opt("Slot"),
  "hash_1": t.opt("StringDoaGddGA"),
  "hash_2": t.opt("StringDoaGddGA"),
  "signature_1": t.opt("Signature"),
  "signature_2": t.opt("Signature"),
  [t.indexKey]: "any",
});

export const OneOfObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUSTKq8XnCL = t.union("ObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUS", "ObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUS");

export const UnorderedSetOfOneOfObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUSTKq8XnCLwrpyYBUS = t.array("OneOfObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUSTKq8XnCL");

export const Header = t.iface([], {
  "current_version": t.opt("NumberTbrodUsH"),
  "announced_version": t.opt("OneOfNullQu0Arl1FNumberHo1ClIqD4U4GpKJM"),
  "operation_merkle_root": "StringDoaGddGA",
  "parents": "BlockIdList",
  "slot": "Slot",
  "endorsements": t.opt("UnorderedSetOfObjectOfSignatureEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUSwrpyYBUS"),
  "denunciations": t.opt("UnorderedSetOfOneOfObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUSTKq8XnCLwrpyYBUS"),
});

export const WrappedHeader = t.iface([], {
  "content": "Header",
  "signature": "Signature",
  "content_creator_pub_key": "PublicKey",
  "content_creator_address": "Address",
  "id": t.opt("BlockId"),
});

export const Block = t.iface([], {
  "header": "WrappedHeader",
  "operations": "UnorderedSetOfOperationIdwrpyYBUS",
});

export const BlockInfoContent = t.iface([], {
  "is_final": "IsFinal",
  "is_candidate": "IsCandidate",
  "is_discarded": t.opt("IsDiscarded"),
  "is_in_blockclique": "InBlockClique",
  "block": "Block",
});

export const BlockInfo = t.iface([], {
  "id": "BlockId",
  "content": t.opt("BlockInfoContent"),
});

export const Number7BVjpZ2Z = t.name("number");

export const BooleanXIboFXzF = t.name("boolean");

export const Clique = t.iface([], {
  "block_ids": "BlockIdList",
  "fitness": "Number7BVjpZ2Z",
  "is_blockclique": "BooleanXIboFXzF",
});

export const BytesOption = t.union("NullQu0Arl1F", "Bytes");

export const DatastoreEntryOutput = t.iface([], {
  "candidate_value": "BytesOption",
  "final_value": "BytesOption",
});

export const Context = t.iface([], {
  [t.indexKey]: "any",
});

export const IsSuccess = t.name("boolean");

export const TransferReceipt = t.iface([], {
  "from": "Address",
  "to": "Address",
  "amount": "Amount",
  "effective_amount_received": "Amount",
  "context": "Context",
  "succeed": "IsSuccess",
  "fee": "Amount",
  "block_id": "BlockId",
});

export const UnorderedSetOfTransferReceiptzpyvh8AY = t.array("TransferReceipt");

export const BooleanVyG3AETh = t.name("boolean");

export const Endorsement = t.iface([], {
  "content": "EndorsementContent",
  "content_creator_pub_key": "PublicKey",
  "content_creator_address": t.opt("Address"),
  "id": t.opt("EndorsementId"),
  "signature": "Signature",
});

export const EndorsementInfo = t.iface([], {
  "id": "EndorsementId",
  "in_pool": "BooleanVyG3AETh",
  "in_blocks": "BlockIdList",
  "is_final": "IsFinal",
  "endorsement": "Endorsement",
});

export const Stale = t.name("boolean");

export const GraphInterval = t.iface([], {
  "creator": "PublicKey",
  "id": "BlockId",
  "is_final": "IsFinal",
  "is_in_blockclique": "InBlockClique",
  "is_stale": "Stale",
  "parents": "BlockIdList",
  "slot": "Slot",
});

export const BooleanSJ3TNusg = t.name("boolean");

export const IsFinalOperation = t.union("NullQu0Arl1F", "IsFinal");

export const TransactionReceipt = t.iface([], {
  "amount": "Amount",
  "recipient_address": "Address",
});

export const UnorderedSetOfBytes0JFPBP6Z = t.array("Bytes");

export const DatastoreEntry = t.array("UnorderedSetOfBytes0JFPBP6Z");

export const ExecuteSCReceipt = t.iface([], {
  "data": "Bytes",
  "max_gas": "GasAmount",
  "datastore": "DatastoreEntry",
});

export const FunctionName = t.name("string");

export const CallSCReceipt = t.iface([], {
  "target_addr": "Address",
  "target_func": "FunctionName",
  "param": "Bytes",
  "max_gas": "GasAmount",
  "coins": "Amount",
});

export const RollBuyReceipt = t.iface([], {
  "roll_count": "RollAmount",
});

export const RollSellReceipt = t.iface([], {
  "roll_count": "RollAmount",
});

export const OperationType = t.iface([], {
  "Transaction": t.opt("TransactionReceipt"),
  "ExecuteSC": t.opt("ExecuteSCReceipt"),
  "CallSC": t.opt("CallSCReceipt"),
  "RollBuy": t.opt("RollBuyReceipt"),
  "RollSell": t.opt("RollSellReceipt"),
});

export const Operation = t.iface([], {
  "fee": "Amount",
  "expire_period": "Period",
  "op": "OperationType",
});

export const WrappedOperation = t.iface([], {
  "content": "Operation",
  "signature": "Signature",
  "content_creator_pub_key": t.opt("PublicKey"),
  "content_creator_address": t.opt("Address"),
  "id": t.opt("OperationId"),
});

export const OneOfBooleanVyG3AEThNullQu0Arl1FE3Qax0Os = t.union("NullQu0Arl1F", "BooleanVyG3AETh");

export const OperationInfo = t.iface([], {
  "id": "OperationId",
  "in_blocks": "BlockIdList",
  "in_pool": "BooleanSJ3TNusg",
  "is_operation_final": "IsFinalOperation",
  "thread": "Thread",
  "operation": "WrappedOperation",
  "op_exec_status": t.opt("OneOfBooleanVyG3AEThNullQu0Arl1FE3Qax0Os"),
});

export const ObjectOfAddressRollAmountUf3B9Cb5 = t.iface([], {
  "address": t.opt("Address"),
  "active_rolls": t.opt("RollAmount"),
  [t.indexKey]: "any",
});

export const Staker = t.iface([], {
  [t.indexKey]: "any",
});

export const Number2A9FvvYh = t.name("number");

export const OneOfNullQu0Arl1FNumberHo1ClIqD73O8PHnh = t.union("NullQu0Arl1F", "NumberHo1ClIqD");

export const NumberSgfzurLm = t.name("number");

export const NumberUwkWWxaa = t.name("number");

export const NumberTs6Cn6JQ = t.name("number");

export const NumberGrsxxfaH = t.name("number");

export const Number8ImKBhpQ = t.name("number");

export const NumberAxwlzLso = t.name("number");

export const Config = t.iface([], {
  "block_reward": "Amount",
  "delta_f0": "Number2A9FvvYh",
  "end_timestamp": t.opt("OneOfNullQu0Arl1FNumberHo1ClIqD73O8PHnh"),
  "genesis_timestamp": "NumberSgfzurLm",
  "max_block_size": t.opt("NumberUwkWWxaa"),
  "operation_validity_periods": "NumberTs6Cn6JQ",
  "periods_per_cycle": "NumberGrsxxfaH",
  "roll_price": "Amount",
  "t0": "Number8ImKBhpQ",
  "thread_count": "NumberAxwlzLso",
});

export const ObjectOfStringDoaGddGAIpAddressWrpyYBUS = t.iface([], {
  "node_id": t.opt("StringDoaGddGA"),
  "ip_address": t.opt("IpAddress"),
  [t.indexKey]: "any",
});

export const ConnectedNodes = t.iface([], {
  [t.indexKey]: "any",
});

export const NumberLpoULYcx = t.name("number");

export const ConsensusStats = t.iface([], {
  "clique_count": "NumberHo1ClIqD",
  "end_timespan": "NumberLpoULYcx",
  "final_block_count": "NumberHo1ClIqD",
  "stale_block_count": "NumberHo1ClIqD",
  "start_timespan": "NumberLpoULYcx",
});

export const NumberSWFW9I8Z = t.name("number");

export const NumberYQZ1VVuw = t.name("number");

export const NumberQuWRP8Oa = t.name("number");

export const NumberSDEXjSo6 = t.name("number");

export const NumberWc2YJi2H = t.name("number");

export const NumberZdt4Udf4 = t.name("number");

export const NumberLgEVA2Rp = t.name("number");

export const NumberNw53IytE = t.name("number");

export const NumberXuleKeT9 = t.name("number");

export const NetworkStats = t.iface([], {
  "active_node_count": "NumberWc2YJi2H",
  "banned_peer_count": "NumberZdt4Udf4",
  "in_connection_count": "NumberLgEVA2Rp",
  "known_peer_count": "NumberNw53IytE",
  "out_connection_count": "NumberXuleKeT9",
});

export const StringOFgZzVe7 = t.name("string");

export const OneOfIpAddressNullQu0Arl1FXaFV5TPI = t.union("NullQu0Arl1F", "IpAddress");

export const PoolStats = t.array("NumberHo1ClIqD");

export const Version = t.name("string");

export const NumberDk8ZmyGi = t.name("number");

export const NumberWbCeho3I = t.name("number");

export const NumberGCfSuERd = t.name("number");

export const NumberJ4Dz6P30 = t.name("number");

export const ExecutionStats = t.iface([], {
  "time_window_start": "NumberDk8ZmyGi",
  "time_window_end": "NumberWbCeho3I",
  "final_block_count": "NumberGCfSuERd",
  "final_executed_operations_count": "NumberJ4Dz6P30",
  "active_cursor": "Slot",
  "final_cursor": "Slot",
});

export const NumberBte4OVdF = t.name("number");

export const AlwaysFalse = t.name("any");

export const UnorderedSetOfStakerdplIH7J8 = t.array("Staker");

export const ObjectOfPeriodBlockIdWrpyYBUS = t.iface([], {
  "BlockId": t.opt("BlockId"),
  "period": t.opt("Period"),
  [t.indexKey]: "any",
});

export const BlockParent = t.iface([], {
  [t.indexKey]: "any",
});

export const Operations = t.array("OperationInfo");

export const FilledBlock = t.iface([], {
  "header": "WrappedHeader",
  "operations": "Operations",
});

export const FilledBlockInfoContent = t.iface([], {
  "is_final": "IsFinal",
  "is_stale": "Stale",
  "is_in_blockclique": "InBlockClique",
  "block": "FilledBlock",
});

export const UnorderedSetOfReadOnlyBytecodeExecutionNzcRfs8A = t.array("ReadOnlyBytecodeExecution");

export const UnorderedSetOfReadOnlyCallfpPkkjmf = t.array("ReadOnlyCall");

export const UnorderedSetOfAddressjJsnATCO = t.array("Address");

export const AddressList = t.array("AddressFilter");

export const UnorderedSetOfDatastoreEntryInputLrTgdYH8 = t.array("DatastoreEntryInput");

export const UnorderedSetOfEndorsementIdqnHAk5M0 = t.array("EndorsementId");

export const EventFilter = t.iface([], {
  "start": t.opt("Slot"),
  "end": t.opt("Slot"),
  "emitter_address": t.opt("Address"),
  "original_caller_address": t.opt("Address"),
  "original_operation_id": t.opt("OperationId"),
  "is_final": t.opt("IsFinal"),
  "is_error": t.opt("Error"),
});

export const ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq = t.iface([], {
  "start": t.opt("NumberHo1ClIqD"),
  "end": t.opt("NumberHo1ClIqD"),
});

export const UnorderedSetOfOperationId5TxbV4NZ = t.array("OperationId");

export const UnorderedSetOfPrivateKeyG69QLiLP = t.array("PrivateKey");

export const IpAddressList = t.array("IpAddress");

export const UnorderedSetOfStringDoaGddGADvj0XlFa = t.array("StringDoaGddGA");

export const UnorderedSetOfIpAddressiIc9WbOi = t.array("IpAddress");

export const UnorderedSetOfOperationInputx51DfMZX = t.array("OperationInput");

export const ApiRequest = t.iface([], {
  "page_request": t.opt("Pagination"),
});

export const UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS = t.array("ExecuteReadOnlyResponse");

export const UnorderedSetOfAddressInfowrpyYBUS = t.array("AddressInfo");

export const BytecodeList = t.array("Bytes");

export const UnorderedSetOfBlockInfowrpyYBUS = t.array("BlockInfo");

export const UnorderedSetOfCliqueMz9JAAOV = t.array("Clique");

export const UnorderedSetOfDatastoreEntryOutputgBhWTzxI = t.array("DatastoreEntryOutput");

export const UnorderedSetOfUnorderedSetOfTransferReceiptzpyvh8AYeEDRSdp7 = t.array("UnorderedSetOfTransferReceiptzpyvh8AY");

export const UnorderedSetOfEndorsementInfowrpyYBUS = t.array("EndorsementInfo");

export const UnorderedSetOfGraphIntervalwrpyYBUS = t.array("GraphInterval");

export const UnorderedSetOfOperationInfowrpyYBUS = t.array("OperationInfo");

export const NodeStatus = t.iface([], {
  "config": "Config",
  "connected_nodes": "ConnectedNodes",
  "consensus_stats": "ConsensusStats",
  "current_cycle": "NumberSWFW9I8Z",
  "current_time": "NumberYQZ1VVuw",
  "current_cycle_time": "NumberQuWRP8Oa",
  "next_cycle_time": "NumberSDEXjSo6",
  "last_slot": "Slot",
  "network_stats": "NetworkStats",
  "next_slot": "Slot",
  "node_id": "StringOFgZzVe7",
  "node_ip": t.opt("OneOfIpAddressNullQu0Arl1FXaFV5TPI"),
  "pool_stats": "PoolStats",
  "version": "Version",
  "execution_stats": "ExecutionStats",
  "chain_id": "NumberBte4OVdF",
  "minimal_fees": t.opt("Amount"),
});

export const PubkeySig = t.iface([], {
  "public_key": "PublicKey",
  "signature": "Signature",
});

export const PagedVecStaker = t.iface([], {
  "content": t.opt("UnorderedSetOfStakerdplIH7J8"),
  "total_count": t.opt("NumberHo1ClIqD"),
});

export const UnorderedSetOfBlockParentwrpyYBUS = t.array("BlockParent");

export const FilledBlockInfo = t.iface([], {
  "id": "OperationId",
  "content": t.opt("FilledBlockInfoContent"),
});

export const AnyOfUnorderedSetOfReadOnlyBytecodeExecutionNzcRfs8AUnorderedSetOfReadOnlyCallfpPkkjmfUnorderedSetOfAddressjJsnATCOAddressListBlockIdListSlotUnorderedSetOfDatastoreEntryInputLrTgdYH8UnorderedSetOfSlotwrpyYBUSUnorderedSetOfEndorsementIdqnHAk5M0EventFilterObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75FqUnorderedSetOfOperationId5TxbV4NZPaginationUnorderedSetOfPrivateKeyG69QLiLPIpAddressListIpAddressListIpAddressListUnorderedSetOfStringDoaGddGADvj0XlFaIpAddressListIpAddressListIpAddressListIpAddressListIpAddressListUnorderedSetOfAddressjJsnATCOBytesUnorderedSetOfIpAddressiIc9WbOiIpAddressListIpAddressListUnorderedSetOfOperationInputx51DfMZXApiRequestInteger2AHOqbcQInteger2AHOqbcQInteger2AHOqbcQInteger2AHOqbcQUnorderedSetOfExecuteReadOnlyResponsewrpyYBUSUnorderedSetOfExecuteReadOnlyResponsewrpyYBUSUnorderedSetOfAddressInfowrpyYBUSBytecodeListUnorderedSetOfBlockInfowrpyYBUSBlockUnorderedSetOfCliqueMz9JAAOVUnorderedSetOfDatastoreEntryOutputgBhWTzxIUnorderedSetOfUnorderedSetOfTransferReceiptzpyvh8AYeEDRSdp7UnorderedSetOfEndorsementInfowrpyYBUSOutputEventsUnorderedSetOfGraphIntervalwrpyYBUSUnorderedSetOfOperationInfowrpyYBUSUnorderedSetOfStakerdplIH7J8NodeStatusAlwaysFalseUnorderedSetOfAddressjJsnATCOAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseIpAddressListIpAddressListAlwaysFalseIpAddressListAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalsePubkeySigAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseUnorderedSetOfOperationId5TxbV4NZPagedVecStakerUnorderedSetOfBlockParentwrpyYBUSVersionBlockInfoWrappedHeaderFilledBlockInfoOperationBooleanVyG3AEThBooleanVyG3AEThBooleanVyG3AEThBooleanVyG3AETh = t.union("UnorderedSetOfReadOnlyBytecodeExecutionNzcRfs8A", "UnorderedSetOfReadOnlyCallfpPkkjmf", "UnorderedSetOfAddressjJsnATCO", "AddressList", "BlockIdList", "Slot", "UnorderedSetOfDatastoreEntryInputLrTgdYH8", "UnorderedSetOfSlotwrpyYBUS", "UnorderedSetOfEndorsementIdqnHAk5M0", "EventFilter", "ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq", "UnorderedSetOfOperationId5TxbV4NZ", "Pagination", "UnorderedSetOfPrivateKeyG69QLiLP", "IpAddressList", "UnorderedSetOfStringDoaGddGADvj0XlFa", "Bytes", "UnorderedSetOfIpAddressiIc9WbOi", "UnorderedSetOfOperationInputx51DfMZX", "ApiRequest", "Integer2AHOqbcQ", "UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS", "UnorderedSetOfAddressInfowrpyYBUS", "BytecodeList", "UnorderedSetOfBlockInfowrpyYBUS", "Block", "UnorderedSetOfCliqueMz9JAAOV", "UnorderedSetOfDatastoreEntryOutputgBhWTzxI", "UnorderedSetOfUnorderedSetOfTransferReceiptzpyvh8AYeEDRSdp7", "UnorderedSetOfEndorsementInfowrpyYBUS", "OutputEvents", "UnorderedSetOfGraphIntervalwrpyYBUS", "UnorderedSetOfOperationInfowrpyYBUS", "UnorderedSetOfStakerdplIH7J8", "NodeStatus", "AlwaysFalse", "PubkeySig", "PagedVecStaker", "UnorderedSetOfBlockParentwrpyYBUS", "Version", "BlockInfo", "WrappedHeader", "FilledBlockInfo", "Operation", "BooleanVyG3AETh");

export const ExecuteReadOnlyBytecode = t.func("UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS", t.param("ReadOnlyBytecodeExecution", "UnorderedSetOfReadOnlyBytecodeExecutionNzcRfs8A"));

export const ExecuteReadOnlyCall = t.func("UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS", t.param("ReadOnlyCall", "UnorderedSetOfReadOnlyCallfpPkkjmf"));

export const GetAddresses = t.func("UnorderedSetOfAddressInfowrpyYBUS", t.param("address", "UnorderedSetOfAddressjJsnATCO"));

export const GetAddressesBytecode = t.func("BytecodeList", t.param("addressFilter", "AddressList"));

export const GetBlocks = t.func("UnorderedSetOfBlockInfowrpyYBUS", t.param("blockIds", "BlockIdList"));

export const GetBlockcliqueBlockBySlot = t.func("Block", t.param("slot", "Slot"));

export const GetCliques = t.func("UnorderedSetOfCliqueMz9JAAOV");

export const GetDatastoreEntries = t.func("UnorderedSetOfDatastoreEntryOutputgBhWTzxI", t.param("DatastoreEntryInputs", "UnorderedSetOfDatastoreEntryInputLrTgdYH8"));

export const GetSlotsTransfers = t.func("UnorderedSetOfUnorderedSetOfTransferReceiptzpyvh8AYeEDRSdp7", t.param("slots", "UnorderedSetOfSlotwrpyYBUS"));

export const GetEndorsements = t.func("UnorderedSetOfEndorsementInfowrpyYBUS", t.param("endorsementId", "UnorderedSetOfEndorsementIdqnHAk5M0"));

export const GetFilteredScOutputEvent = t.func("OutputEvents", t.param("EventFilter", "EventFilter"));

export const GetGraphInterval = t.func("UnorderedSetOfGraphIntervalwrpyYBUS", t.param("TimeInterval", "ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq"));

export const GetOperations = t.func("UnorderedSetOfOperationInfowrpyYBUS", t.param("operationId", "UnorderedSetOfOperationId5TxbV4NZ"));

export const GetStakers = t.func("UnorderedSetOfStakerdplIH7J8", t.param("PageRequest", "Pagination"));

export const GetStatus = t.func("NodeStatus");

export const AddStakingSecretKeys = t.func("AlwaysFalse", t.param("SecretKeys", "UnorderedSetOfPrivateKeyG69QLiLP"));

export const GetStakingAddresses = t.func("UnorderedSetOfAddressjJsnATCO");

export const NodeAddToBootstrapBlacklist = t.func("AlwaysFalse", t.param("ip", "IpAddressList"));

export const NodeAddToBootstrapWhitelist = t.func("AlwaysFalse", t.param("ip", "IpAddressList"));

export const NodeAddToPeersWhitelist = t.func("AlwaysFalse", t.param("ip", "IpAddressList"));

export const NodeBanById = t.func("AlwaysFalse", t.param("id", "UnorderedSetOfStringDoaGddGADvj0XlFa"));

export const NodeBanByIp = t.func("AlwaysFalse", t.param("ip", "IpAddressList"));

export const NodeBootstrapBlacklist = t.func("IpAddressList");

export const NodeBootstrapWhitelist = t.func("IpAddressList");

export const NodeBootstrapWhitelistAllowAll = t.func("AlwaysFalse");

export const NodePeersWhitelist = t.func("IpAddressList");

export const NodeRemoveFromBootstrapBlacklist = t.func("AlwaysFalse", t.param("ip", "IpAddressList"));

export const NodeRemoveFromBootstrapWhitelist = t.func("AlwaysFalse", t.param("ip", "IpAddressList"));

export const NodeRemoveFromPeersWhitelist = t.func("AlwaysFalse", t.param("ip", "IpAddressList"));

export const NodeRemoveFromWhitelist = t.func("AlwaysFalse", t.param("ip", "IpAddressList"));

export const RemoveStakingAddresses = t.func("AlwaysFalse", t.param("addresses", "UnorderedSetOfAddressjJsnATCO"));

export const NodeSignMessage = t.func("PubkeySig", t.param("message", "Bytes"));

export const StopNode = t.func("AlwaysFalse");

export const NodeUnbanById = t.func("AlwaysFalse", t.param("id", "UnorderedSetOfIpAddressiIc9WbOi"));

export const NodeUnbanByIp = t.func("AlwaysFalse", t.param("ip", "IpAddressList"));

export const NodeWhitelist = t.func("AlwaysFalse", t.param("ip", "IpAddressList"));

export const SendOperations = t.func("UnorderedSetOfOperationId5TxbV4NZ", t.param("OperationInput", "UnorderedSetOfOperationInputx51DfMZX"));

export const GetLargestStakers = t.func("PagedVecStaker", t.param("ApiRequest", "ApiRequest"));

export const GetNextBlockBestParents = t.func("UnorderedSetOfBlockParentwrpyYBUS");

export const GetVersion = t.func("Version");

export const SubscribeNewBlocks = t.func("BlockInfo");

export const SubscribeNewBlocksHeaders = t.func("WrappedHeader");

export const SubscribeNewFilledBlocks = t.func("FilledBlockInfo");

export const SubscribeNewOperations = t.func("Operation");

export const UnsubscribeNewBlocks = t.func("BooleanVyG3AETh", t.param("subscriptionId", "Integer2AHOqbcQ"));

export const UnsubscribeNewBlocksHeaders = t.func("BooleanVyG3AETh", t.param("subscriptionId", "Integer2AHOqbcQ"));

export const UnsubscribeNewFilledBlocks = t.func("BooleanVyG3AETh", t.param("subscriptionId", "Integer2AHOqbcQ"));

export const UnsubscribeNewOperations = t.func("BooleanVyG3AETh", t.param("subscriptionId", "Integer2AHOqbcQ"));

const exportedTypeSuite: t.ITypeSuite = {
  GasAmount,
  Integer2AHOqbcQ,
  Bytes,
  NullQu0Arl1F,
  Address,
  AddressOption,
  OperationDatastore,
  Amount,
  AmountOption,
  ReadOnlyBytecodeExecution,
  TargetFunction,
  ReadOnlyCall,
  IsFinal,
  AddressFilter,
  BlockId,
  Period,
  Thread,
  DatastoreEntryInput,
  Slot,
  EndorsementId,
  OperationId,
  Error,
  NumberHo1ClIqD,
  PrivateKey,
  IpAddress,
  StringDoaGddGA,
  PublicKey,
  Signature,
  OperationInput,
  Pagination,
  StringOz2F8Z2Y,
  ReadOnlyResult,
  EventData,
  BlockIdOption,
  IsReadonly,
  AddressStack,
  IndexInSlot,
  EventExecutionContext,
  SCOutputEvent,
  OutputEvents,
  ObjectD93Z4FAG,
  ObjectHAgrRKSz,
  UnorderedSetOfObjectHAgrRKSz46QV1Tyv,
  ObjectYWuwfL0B,
  ObjectTK16EAH4,
  Object413CQ8L2,
  ObjectOfStringDoaGddGANwpLofVw,
  ExecutionTrailHashChange,
  StateChanges,
  ExecuteReadOnlyResponse,
  RollAmount,
  DatastoreKeys,
  ObjectOfSlotAmountWrpyYBUS,
  DeferredCredits,
  UnorderedSetOfSlotwrpyYBUS,
  ObjectOfSlotNumberHo1ClIqDWrpyYBUS,
  UnorderedSetOfObjectOfSlotNumberHo1ClIqDWrpyYBUSwrpyYBUS,
  BlockIdList,
  UnorderedSetOfOperationIdwrpyYBUS,
  UnorderedSetOfEndorsementIdwrpyYBUS,
  OneOfRollAmountNullQu0Arl1FGg9ZJg6R,
  ExecutionAddressCycleInfo,
  UnorderedSetOfExecutionAddressCycleInfowrpyYBUS,
  AddressInfo,
  IsCandidate,
  IsDiscarded,
  InBlockClique,
  NumberTbrodUsH,
  OneOfNullQu0Arl1FNumberHo1ClIqD4U4GpKJM,
  EndorsementContent,
  ObjectOfSignatureEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUS,
  UnorderedSetOfObjectOfSignatureEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUSwrpyYBUS,
  ObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUS,
  ObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUS,
  OneOfObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUSTKq8XnCL,
  UnorderedSetOfOneOfObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUSTKq8XnCLwrpyYBUS,
  Header,
  WrappedHeader,
  Block,
  BlockInfoContent,
  BlockInfo,
  Number7BVjpZ2Z,
  BooleanXIboFXzF,
  Clique,
  BytesOption,
  DatastoreEntryOutput,
  Context,
  IsSuccess,
  TransferReceipt,
  UnorderedSetOfTransferReceiptzpyvh8AY,
  BooleanVyG3AETh,
  Endorsement,
  EndorsementInfo,
  Stale,
  GraphInterval,
  BooleanSJ3TNusg,
  IsFinalOperation,
  TransactionReceipt,
  UnorderedSetOfBytes0JFPBP6Z,
  DatastoreEntry,
  ExecuteSCReceipt,
  FunctionName,
  CallSCReceipt,
  RollBuyReceipt,
  RollSellReceipt,
  OperationType,
  Operation,
  WrappedOperation,
  OneOfBooleanVyG3AEThNullQu0Arl1FE3Qax0Os,
  OperationInfo,
  ObjectOfAddressRollAmountUf3B9Cb5,
  Staker,
  Number2A9FvvYh,
  OneOfNullQu0Arl1FNumberHo1ClIqD73O8PHnh,
  NumberSgfzurLm,
  NumberUwkWWxaa,
  NumberTs6Cn6JQ,
  NumberGrsxxfaH,
  Number8ImKBhpQ,
  NumberAxwlzLso,
  Config,
  ObjectOfStringDoaGddGAIpAddressWrpyYBUS,
  ConnectedNodes,
  NumberLpoULYcx,
  ConsensusStats,
  NumberSWFW9I8Z,
  NumberYQZ1VVuw,
  NumberQuWRP8Oa,
  NumberSDEXjSo6,
  NumberWc2YJi2H,
  NumberZdt4Udf4,
  NumberLgEVA2Rp,
  NumberNw53IytE,
  NumberXuleKeT9,
  NetworkStats,
  StringOFgZzVe7,
  OneOfIpAddressNullQu0Arl1FXaFV5TPI,
  PoolStats,
  Version,
  NumberDk8ZmyGi,
  NumberWbCeho3I,
  NumberGCfSuERd,
  NumberJ4Dz6P30,
  ExecutionStats,
  NumberBte4OVdF,
  AlwaysFalse,
  UnorderedSetOfStakerdplIH7J8,
  ObjectOfPeriodBlockIdWrpyYBUS,
  BlockParent,
  Operations,
  FilledBlock,
  FilledBlockInfoContent,
  UnorderedSetOfReadOnlyBytecodeExecutionNzcRfs8A,
  UnorderedSetOfReadOnlyCallfpPkkjmf,
  UnorderedSetOfAddressjJsnATCO,
  AddressList,
  UnorderedSetOfDatastoreEntryInputLrTgdYH8,
  UnorderedSetOfEndorsementIdqnHAk5M0,
  EventFilter,
  ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq,
  UnorderedSetOfOperationId5TxbV4NZ,
  UnorderedSetOfPrivateKeyG69QLiLP,
  IpAddressList,
  UnorderedSetOfStringDoaGddGADvj0XlFa,
  UnorderedSetOfIpAddressiIc9WbOi,
  UnorderedSetOfOperationInputx51DfMZX,
  ApiRequest,
  UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS,
  UnorderedSetOfAddressInfowrpyYBUS,
  BytecodeList,
  UnorderedSetOfBlockInfowrpyYBUS,
  UnorderedSetOfCliqueMz9JAAOV,
  UnorderedSetOfDatastoreEntryOutputgBhWTzxI,
  UnorderedSetOfUnorderedSetOfTransferReceiptzpyvh8AYeEDRSdp7,
  UnorderedSetOfEndorsementInfowrpyYBUS,
  UnorderedSetOfGraphIntervalwrpyYBUS,
  UnorderedSetOfOperationInfowrpyYBUS,
  NodeStatus,
  PubkeySig,
  PagedVecStaker,
  UnorderedSetOfBlockParentwrpyYBUS,
  FilledBlockInfo,
  AnyOfUnorderedSetOfReadOnlyBytecodeExecutionNzcRfs8AUnorderedSetOfReadOnlyCallfpPkkjmfUnorderedSetOfAddressjJsnATCOAddressListBlockIdListSlotUnorderedSetOfDatastoreEntryInputLrTgdYH8UnorderedSetOfSlotwrpyYBUSUnorderedSetOfEndorsementIdqnHAk5M0EventFilterObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75FqUnorderedSetOfOperationId5TxbV4NZPaginationUnorderedSetOfPrivateKeyG69QLiLPIpAddressListIpAddressListIpAddressListUnorderedSetOfStringDoaGddGADvj0XlFaIpAddressListIpAddressListIpAddressListIpAddressListIpAddressListUnorderedSetOfAddressjJsnATCOBytesUnorderedSetOfIpAddressiIc9WbOiIpAddressListIpAddressListUnorderedSetOfOperationInputx51DfMZXApiRequestInteger2AHOqbcQInteger2AHOqbcQInteger2AHOqbcQInteger2AHOqbcQUnorderedSetOfExecuteReadOnlyResponsewrpyYBUSUnorderedSetOfExecuteReadOnlyResponsewrpyYBUSUnorderedSetOfAddressInfowrpyYBUSBytecodeListUnorderedSetOfBlockInfowrpyYBUSBlockUnorderedSetOfCliqueMz9JAAOVUnorderedSetOfDatastoreEntryOutputgBhWTzxIUnorderedSetOfUnorderedSetOfTransferReceiptzpyvh8AYeEDRSdp7UnorderedSetOfEndorsementInfowrpyYBUSOutputEventsUnorderedSetOfGraphIntervalwrpyYBUSUnorderedSetOfOperationInfowrpyYBUSUnorderedSetOfStakerdplIH7J8NodeStatusAlwaysFalseUnorderedSetOfAddressjJsnATCOAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseIpAddressListIpAddressListAlwaysFalseIpAddressListAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalsePubkeySigAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseUnorderedSetOfOperationId5TxbV4NZPagedVecStakerUnorderedSetOfBlockParentwrpyYBUSVersionBlockInfoWrappedHeaderFilledBlockInfoOperationBooleanVyG3AEThBooleanVyG3AEThBooleanVyG3AEThBooleanVyG3AETh,
  ExecuteReadOnlyBytecode,
  ExecuteReadOnlyCall,
  GetAddresses,
  GetAddressesBytecode,
  GetBlocks,
  GetBlockcliqueBlockBySlot,
  GetCliques,
  GetDatastoreEntries,
  GetSlotsTransfers,
  GetEndorsements,
  GetFilteredScOutputEvent,
  GetGraphInterval,
  GetOperations,
  GetStakers,
  GetStatus,
  AddStakingSecretKeys,
  GetStakingAddresses,
  NodeAddToBootstrapBlacklist,
  NodeAddToBootstrapWhitelist,
  NodeAddToPeersWhitelist,
  NodeBanById,
  NodeBanByIp,
  NodeBootstrapBlacklist,
  NodeBootstrapWhitelist,
  NodeBootstrapWhitelistAllowAll,
  NodePeersWhitelist,
  NodeRemoveFromBootstrapBlacklist,
  NodeRemoveFromBootstrapWhitelist,
  NodeRemoveFromPeersWhitelist,
  NodeRemoveFromWhitelist,
  RemoveStakingAddresses,
  NodeSignMessage,
  StopNode,
  NodeUnbanById,
  NodeUnbanByIp,
  NodeWhitelist,
  SendOperations,
  GetLargestStakers,
  GetNextBlockBestParents,
  GetVersion,
  SubscribeNewBlocks,
  SubscribeNewBlocksHeaders,
  SubscribeNewFilledBlocks,
  SubscribeNewOperations,
  UnsubscribeNewBlocks,
  UnsubscribeNewBlocksHeaders,
  UnsubscribeNewFilledBlocks,
  UnsubscribeNewOperations,
};
export default exportedTypeSuite;
