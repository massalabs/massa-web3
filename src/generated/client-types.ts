/**
 *
 * Amount of gas
 *
 */
export type GasAmount = number;
export type Integer2AHOqbcQ = number;
/**
 *
 * Byte array
 *
 */
export type Bytes = Integer2AHOqbcQ[];
export type NullQu0Arl1F = null;
/**
 *
 * Address
 *
 */
export type Address = string;
/**
 *
 * Caller's address, optional
 *
 */
export type AddressOption = NullQu0Arl1F | Address;
export type UnorderedSetOfInteger2AHOqbcQarZIQlOy = Integer2AHOqbcQ[];
/**
 *
 * Operation datastore TO FIX
 *
 */
export type OperationDatastore = NullQu0Arl1F | UnorderedSetOfInteger2AHOqbcQarZIQlOy;
/**
 *
 * MAS amount in float string
 *
 */
export type Amount = string;
/**
 *
 * MAS amount in float string
 *
 */
export type AmountOption = NullQu0Arl1F | Amount;
/**
 *
 * Read only bytecode execution
 *
 */
export interface ReadOnlyBytecodeExecution {
  max_gas: GasAmount;
  bytecode: Bytes;
  address?: AddressOption;
  operation_datastore?: OperationDatastore;
  fee?: AmountOption;
}
/**
 *
 * Target function
 *
 */
export type TargetFunction = string;
/**
 *
 * Serialized SC call params
 *
 */
export type SCCallParams = Integer2AHOqbcQ[];
/**
 *
 * Read only call
 *
 */
export interface ReadOnlyCall {
  max_gas: GasAmount;
  target_address: Address;
  target_function: TargetFunction;
  parameter: SCCallParams;
  caller_address: AddressOption;
  coins: AmountOption;
  fee: AmountOption;
}
/**
 *
 * Operation is final
 *
 */
export type IsFinal = boolean;
/**
 *
 * Address filter
 *
 */
export interface AddressFilter {
  address?: Address;
  is_final?: IsFinal;
}
/**
 *
 * Block identifier
 *
 */
export type BlockId = string;
/**
 *
 * after `expire_period` slot the operation won't be included in a block
 *
 */
export type Period = number;
/**
 *
 * Thread in which the operation can be included
 *
 */
export type Thread = number;
export interface DatastoreEntryInput {
  address: Address;
  key: Bytes;
}
/**
 *
 * Slot
 *
 */
export interface Slot {
  period: Period;
  thread: Thread;
}
/**
 *
 * Endorsement id
 *
 */
export type EndorsementId = string;
/**
 *
 * Operation id
 *
 */
export type OperationId = string;
/**
 *
 * Whether the event was generated in a failed executed or not
 *
 */
export type Error = boolean;
export type NumberHo1ClIqD = number;
/**
 *
 * `PrivateKey` is used for signature and decryption
 *
 */
export type PrivateKey = string;
/**
 *
 * Ipv4 or Ipv6 address
 *
 */
export type IpAddress = string;
export type StringDoaGddGA = string;
/**
 *
 * the content creator public key
 *
 */
export type PublicKey = string;
/**
 *
 * signature
 *
 */
export type Signature = string;
/**
 *
 * Operation input
 *
 */
export interface OperationInput {
  creator_public_key: PublicKey;
  signature: Signature;
  serialized_content: Bytes;
}
/**
 *
 * An PageRequest object, which contains limit (max elements par page) and a page offset.
 *
 */
export interface Pagination {
  limit: NumberHo1ClIqD;
  offset: NumberHo1ClIqD;
}
/**
 *
 * Included in case of error. The error message
 *
 */
export type StringOz2F8Z2Y = string;
/**
 *
 * The result of a read-only execution
 *
 */
export interface ReadOnlyResult {
  Ok?: Bytes;
  Error?: StringOz2F8Z2Y;
}
/**
 *
 * String of the event
 *
 */
export type EventData = string;
/**
 *
 * Wether the event was generated during  read only call
 *
 */
export type IsReadonly = boolean;
/**
 *
 * Addresses, most recent at the end
 *
 */
export type AddressStack = Address[];
/**
 *
 * Index of the event in the slot
 *
 */
export type IndexInSlot = number;
/**
 *
 * Context generated by the execution context
 *
 */
export interface EventExecutionContext {
  slot: Slot;
  block?: BlockId;
  read_only: IsReadonly;
  call_stack: AddressStack;
  index_in_slot: IndexInSlot;
  origin_operation_id?: OperationId;
  is_final: IsFinal;
  is_error?: Error;
}
export interface SCOutputEvent {
  data: EventData;
  context: EventExecutionContext;
}
export type OutputEvents = SCOutputEvent[];
/**
 *
 * ledger changes
 *
 */
export interface ObjectD93Z4FAG { [key: string]: any; }
export interface ObjectHAgrRKSz { [key: string]: any; }
/**
 *
 * async pool changes
 *
 */
export type UnorderedSetOfObjectHAgrRKSz46QV1Tyv = ObjectHAgrRKSz[];
/**
 *
 * pos changes
 *
 */
export interface ObjectYWuwfL0B { [key: string]: any; }
/**
 *
 * executed operations changes
 *
 */
export interface ObjectTK16EAH4 { [key: string]: any; }
/**
 *
 * executed denunciation changes
 *
 */
export interface Object413CQ8L2 { [key: string]: any; }
/**
 *
 * execution trail hash change
 *
 */
export type StringIytPJwYq = string;
export interface StateChanges {
  ledger_changes: ObjectD93Z4FAG;
  async_pool_changes: UnorderedSetOfObjectHAgrRKSz46QV1Tyv;
  pos_changes: ObjectYWuwfL0B;
  executed_ops_changes: ObjectTK16EAH4;
  executed_denunciations_changes: Object413CQ8L2;
  execution_trail_hash_change: StringIytPJwYq;
}
export interface ExecuteReadOnlyResponse {
  executed_at: Slot;
  result: ReadOnlyResult;
  output_events: OutputEvents;
  gas_cost: GasAmount;
  state_changes: StateChanges;
}
/**
 *
 * Amount of rolls
 *
 */
export type RollAmount = number;
/**
 *
 * The candidate datastore keys
 *
 */
export type DatastoreKeys = Bytes[];
export interface ObjectOfSlotAmountWrpyYBUS {
  slot?: Slot;
  amount?: Amount;
  [k: string]: any;
}
/**
 *
 * The deferred credits
 *
 */
export type UnorderedSetOfObjectOfSlotAmountWrpyYBUSwrpyYBUS = ObjectOfSlotAmountWrpyYBUS[];
export type UnorderedSetOfSlotwrpyYBUS = Slot[];
export interface ObjectOfSlotNumberHo1ClIqDWrpyYBUS {
  slot?: Slot;
  index?: NumberHo1ClIqD;
  [k: string]: any;
}
/**
 *
 * The next endorsement draws
 *
 */
export type UnorderedSetOfObjectOfSlotNumberHo1ClIqDWrpyYBUSwrpyYBUS = ObjectOfSlotNumberHo1ClIqDWrpyYBUS[];
export type UnorderedSetOfBlockIdwrpyYBUS = BlockId[];
/**
 *
 * Operations
 *
 */
export type UnorderedSetOfOperationIdwrpyYBUS = OperationId[];
/**
 *
 * EndorsementIds of created endorsements
 *
 */
export type UnorderedSetOfEndorsementIdwrpyYBUS = EndorsementId[];
export type OneOfRollAmountNullQu0Arl1FGg9ZJg6R = NullQu0Arl1F | RollAmount;
export interface ExecutionAddressCycleInfo {
  cycle: NumberHo1ClIqD;
  is_final: IsFinal;
  ok_count: NumberHo1ClIqD;
  nok_count: NumberHo1ClIqD;
  active_rolls?: OneOfRollAmountNullQu0Arl1FGg9ZJg6R;
}
/**
 *
 * Cycle infos
 *
 */
export type UnorderedSetOfExecutionAddressCycleInfowrpyYBUS = ExecutionAddressCycleInfo[];
export interface AddressInfo {
  address: Address;
  thread: Thread;
  final_balance: Amount;
  final_roll_count: RollAmount;
  final_datastore_keys: DatastoreKeys;
  candidate_balance: Amount;
  candidate_roll_count: RollAmount;
  candidate_datastore_keys: DatastoreKeys;
  deferred_credits: UnorderedSetOfObjectOfSlotAmountWrpyYBUSwrpyYBUS;
  next_block_draws: UnorderedSetOfSlotwrpyYBUS;
  next_endorsement_draws: UnorderedSetOfObjectOfSlotNumberHo1ClIqDWrpyYBUSwrpyYBUS;
  created_blocks: UnorderedSetOfBlockIdwrpyYBUS;
  created_operations: UnorderedSetOfOperationIdwrpyYBUS;
  created_endorsements: UnorderedSetOfEndorsementIdwrpyYBUS;
  cycle_infos: UnorderedSetOfExecutionAddressCycleInfowrpyYBUS;
}
/**
 *
 * true if candidate
 *
 */
export type IsCandidate = boolean;
/**
 *
 * true if discarded
 *
 */
export type IsDiscarded = boolean;
/**
 *
 * true if in the last clique
 *
 */
export type InBlockClique = boolean;
/**
 *
 * Current version
 *
 */
export type NumberTbrodUsH = number;
/**
 *
 * Announced version
 *
 */
export type OneOfNullQu0Arl1FNumberHo1ClIqD4U4GpKJM = NullQu0Arl1F | NumberHo1ClIqD;
/**
 *
 * Endorsement content
 *
 */
export interface EndorsementContent {
  slot: Slot;
  index: NumberHo1ClIqD;
  endorsed_block: BlockId;
}
export interface ObjectOfSignatureEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUS {
  content?: EndorsementContent;
  signature?: Signature;
  content_creator_pub_key?: PublicKey;
  content_creator_address?: Address;
  id?: EndorsementId;
  [k: string]: any;
}
/**
 *
 * Endorsements
 *
 */
export type UnorderedSetOfObjectOfSignatureEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUSwrpyYBUS = ObjectOfSignatureEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUS[];
export interface ObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUS {
  public_key?: PublicKey;
  slot?: Slot;
  index?: Integer2AHOqbcQ;
  hash_1?: StringDoaGddGA;
  hash_2?: StringDoaGddGA;
  signature_1?: Signature;
  signature_2?: Signature;
  [k: string]: any;
}
export interface ObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUS {
  public_key?: PublicKey;
  slot?: Slot;
  hash_1?: StringDoaGddGA;
  hash_2?: StringDoaGddGA;
  signature_1?: Signature;
  signature_2?: Signature;
  [k: string]: any;
}
export type OneOfObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUSTKq8XnCL = ObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUS | ObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUS;
/**
 *
 * Denunciations
 *
 */
export type UnorderedSetOfOneOfObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUSTKq8XnCLwrpyYBUS = OneOfObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUSTKq8XnCL[];
export interface Header {
  current_version?: NumberTbrodUsH;
  announced_version?: OneOfNullQu0Arl1FNumberHo1ClIqD4U4GpKJM;
  operation_merkle_root: StringDoaGddGA;
  parents: UnorderedSetOfBlockIdwrpyYBUS;
  slot: Slot;
  endorsements?: UnorderedSetOfObjectOfSignatureEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUSwrpyYBUS;
  denunciations?: UnorderedSetOfOneOfObjectOfSlotSignatureSignaturePublicKeyInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfSlotSignatureSignaturePublicKeyStringDoaGddGAStringDoaGddGAWrpyYBUSTKq8XnCLwrpyYBUS;
}
/**
 *
 * signed operation
 *
 */
export interface WrappedHeader {
  content: Header;
  signature: Signature;
  content_creator_pub_key: PublicKey;
  content_creator_address: Address;
  id?: BlockId;
}
export interface Block {
  header: WrappedHeader;
  operations: UnorderedSetOfOperationIdwrpyYBUS;
}
export interface BlockInfoContent {
  is_final: IsFinal;
  is_candidate: IsCandidate;
  is_discarded?: IsDiscarded;
  is_in_blockclique: InBlockClique;
  block: Block;
}
export interface BlockInfo {
  id: BlockId;
  content?: BlockInfoContent;
}
/**
 *
 * The block ids of the blocks in that clique
 *
 */
export type UnorderedSetOfBlockId1V6I15AQ = BlockId[];
/**
 *
 * Depends on descendants and endorsement count
 *
 */
export type Number7BVjpZ2Z = number;
/**
 *
 * True if it is the clique of higher fitness
 *
 */
export type BooleanXIboFXzF = boolean;
/**
 *
 * Clique
 *
 */
export interface Clique {
  block_ids: UnorderedSetOfBlockId1V6I15AQ;
  fitness: Number7BVjpZ2Z;
  is_blockclique: BooleanXIboFXzF;
}
/**
 *
 * The final datastore entry value bytes
 *
 */
export type BytesOption = NullQu0Arl1F | Bytes;
/**
 *
 * Datastore entry
 *
 */
export interface DatastoreEntryOutput {
  candidate_value: BytesOption;
  final_value: BytesOption;
}
/**
 *
 * Context of the transfer : operation or asynchronous execution
 *
 */
export interface Context { [key: string]: any; }
/**
 *
 * True if the operation succeed otherwise false
 *
 */
export type IsSuccess = boolean;
/**
 *
 * MAS Transfer operation receipt
 *
 */
export interface TransferReceipt {
  from: Address;
  to: Address;
  amount: Amount;
  effective_amount_received: Amount;
  context: Context;
  succeed: IsSuccess;
  fee: Amount;
  block_id: BlockId;
}
export type UnorderedSetOfTransferReceiptzpyvh8AY = TransferReceipt[];
export type BooleanVyG3AETh = boolean;
/**
 *
 * Block Id
 *
 */
export type UnorderedSetOfBlockId7G1Sy5Qv = BlockId[];
/**
 *
 * Endorsement
 *
 */
export interface Endorsement {
  content: EndorsementContent;
  content_creator_pub_key: PublicKey;
  content_creator_address?: Address;
  id?: EndorsementId;
  signature: Signature;
}
/**
 *
 * Endorsement info
 *
 */
export interface EndorsementInfo {
  id: EndorsementId;
  in_pool: BooleanVyG3AETh;
  in_blocks: UnorderedSetOfBlockId7G1Sy5Qv;
  is_final: IsFinal;
  endorsement: Endorsement;
}
/**
 *
 * true if incompatible with a final block
 *
 */
export type Stale = boolean;
/**
 *
 * As many block Ids as there are threads
 *
 */
export type UnorderedSetOfBlockIdNY3ZAj2A = BlockId[];
export interface GraphInterval {
  creator: PublicKey;
  id: BlockId;
  is_final: IsFinal;
  is_in_blockclique: InBlockClique;
  is_stale: Stale;
  parents: UnorderedSetOfBlockIdNY3ZAj2A;
  slot: Slot;
}
/**
 *
 * Block ids
The operation appears in `in_blocks`
If it appears in multiple blocks, these blocks are in different cliques
 *
 */
export type UnorderedSetOfBlockIdyEy9Dvpn = BlockId[];
/**
 *
 * True if operation is still in pool
 *
 */
export type BooleanSJ3TNusg = boolean;
/**
 *
 * True if the operation is final (for example in a final block)
 *
 */
export type IsFinalOperation = NullQu0Arl1F | IsFinal;
/**
 *
 * transfer coins from sender to recipient
 *
 */
export interface TransactionReceipt {
  amount: Amount;
  recipient_address: Address;
}
export type UnorderedSetOfBytes0JFPBP6Z = Bytes[];
/**
 *
 * A tuple which contains (key, value)
 *
 */
export type DatastoreEntry = UnorderedSetOfBytes0JFPBP6Z[];
/**
 *
 * Execute a smart contract.
 *
 */
export interface ExecuteSCReceipt {
  data: Bytes;
  max_gas: GasAmount;
  datastore: DatastoreEntry;
}
/**
 *
 * Contract Function name to call
 *
 */
export type FunctionName = string;
/**
 *
 * Calls an exported function from a stored smart contract
 *
 */
export interface CallSCReceipt {
  target_addr: Address;
  target_func: FunctionName;
  param: SCCallParams;
  max_gas: GasAmount;
  coins: Amount;
}
/**
 *
 * the sender buys `roll_count` rolls. Roll price is defined in configuration
 *
 */
export interface RollBuyReceipt {
  roll_count: RollAmount;
}
/**
 *
 * the sender sells `roll_count` rolls. Roll price is defined in configuration
 *
 */
export interface RollSellReceipt {
  roll_count: RollAmount;
}
/**
 *
 * the type specific operation part
 *
 */
export interface OperationType {
  Transaction?: TransactionReceipt;
  ExecutSC?: ExecuteSCReceipt;
  CallSC?: CallSCReceipt;
  RollBuy?: RollBuyReceipt;
  RollSell?: RollSellReceipt;
}
/**
 *
 * Operation
 *
 */
export interface Operation {
  fee: Amount;
  expire_period: Period;
  op: OperationType;
}
/**
 *
 * signed operation
 *
 */
export interface WrappedOperation {
  content: Operation;
  signature: Signature;
  content_creator_pub_key?: PublicKey;
  content_creator_address?: Address;
  id?: OperationId;
}
/**
 *
 * true if the operation execution succeeded, false if failed, None means unknown
 *
 */
export type OneOfBooleanVyG3AEThNullQu0Arl1FE3Qax0Os = NullQu0Arl1F | BooleanVyG3AETh;
/**
 *
 * Operation info
 *
 */
export interface OperationInfo {
  id: OperationId;
  in_blocks: UnorderedSetOfBlockIdyEy9Dvpn;
  in_pool: BooleanSJ3TNusg;
  is_operation_final: IsFinalOperation;
  thread: Thread;
  operation: WrappedOperation;
  op_exec_status?: OneOfBooleanVyG3AEThNullQu0Arl1FE3Qax0Os;
}
export interface ObjectOfAddressRollAmountUf3B9Cb5 {
  address?: Address;
  active_rolls?: RollAmount;
  [k: string]: any;
}
/**
 *
 * A tuple which contains (address, active_rolls)
 *
 */
export interface Staker { [key: string]: any; }
/**
 *
 * Used to compute finality threshold
 *
 */
export type Number2A9FvvYh = number;
/**
 *
 * (Only in tesnets)
Time in milliseconds when the blockclique started.
 *
 */
export type OneOfNullQu0Arl1FNumberHo1ClIqDXysINzQy = NullQu0Arl1F | NumberHo1ClIqD;
/**
 *
 * Time in milliseconds when the blockclique started.
 *
 */
export type NumberSgfzurLm = number;
/**
 *
 * Maximum size (in bytes) of a block
 *
 */
export type NumberUwkWWxaa = number;
/**
 *
 * Maximum operation validity period count
 *
 */
export type NumberTs6Cn6JQ = number;
/**
 *
 * cycle duration in periods
 *
 */
export type NumberGrsxxfaH = number;
/**
 *
 * Time between the periods in the same thread.
 *
 */
export type Number8ImKBhpQ = number;
/**
 *
 * Number of threads
 *
 */
export type NumberAxwlzLso = number;
/**
 *
 * Compact configuration
 *
 */
export interface Config {
  block_reward: Amount;
  delta_f0: Number2A9FvvYh;
  end_timestamp?: OneOfNullQu0Arl1FNumberHo1ClIqDXysINzQy;
  genesis_timestamp: NumberSgfzurLm;
  max_block_size?: NumberUwkWWxaa;
  operation_validity_periods: NumberTs6Cn6JQ;
  periods_per_cycle: NumberGrsxxfaH;
  roll_price: Amount;
  t0: Number8ImKBhpQ;
  thread_count: NumberAxwlzLso;
}
export interface ObjectOfStringDoaGddGAIpAddressWrpyYBUS {
  node_id?: StringDoaGddGA;
  ip_address?: IpAddress;
  [k: string]: any;
}
/**
 *
 * Connected nodes (node id, ip address, true if the connection is outgoing, false if incoming)
 *
 */
export interface ConnectedNodes { [key: string]: any; }
/**
 *
 * Stats time interval, millis since 1970-01-01
 *
 */
export type NumberLpoULYcx = number;
/**
 *
 * Consensus stats
 *
 */
export interface ConsensusStats {
  clique_count: NumberHo1ClIqD;
  end_timespan: NumberLpoULYcx;
  final_block_count: NumberHo1ClIqD;
  stale_block_count: NumberHo1ClIqD;
  start_timespan: NumberLpoULYcx;
}
/**
 *
 * Current cycle
 *
 */
export type NumberSWFW9I8Z = number;
/**
 *
 * Time in milliseconds since 1970-01-01
 *
 */
export type NumberYQZ1VVuw = number;
/**
 *
 * current cycle starting time in milliseconds since 1970-01-01
 *
 */
export type NumberQuWRP8Oa = number;
/**
 *
 * next cycle starting time in milliseconds since 1970-01-01
 *
 */
export type NumberSDEXjSo6 = number;
/**
 *
 * Active node count
 *
 */
export type NumberWc2YJi2H = number;
/**
 *
 * Banned node count
 *
 */
export type NumberZdt4Udf4 = number;
/**
 *
 * In connections count
 *
 */
export type NumberLgEVA2Rp = number;
/**
 *
 * Total known peers count
 *
 */
export type NumberNw53IytE = number;
/**
 *
 * Out connections count
 *
 */
export type NumberXuleKeT9 = number;
/**
 *
 * Network stats
 *
 */
export interface NetworkStats {
  active_node_count: NumberWc2YJi2H;
  banned_peer_count: NumberZdt4Udf4;
  in_connection_count: NumberLgEVA2Rp;
  known_peer_count: NumberNw53IytE;
  out_connection_count: NumberXuleKeT9;
}
/**
 *
 * Our node id
 *
 */
export type StringOFgZzVe7 = string;
/**
 *
 * Optional node ip if provided
 *
 */
export type OneOfIpAddressNullQu0Arl1FXaFV5TPI = NullQu0Arl1F | IpAddress;
/**
 *
 * Pool stats
 *
 */
export type PoolStats = NumberHo1ClIqD[];
/**
 *
 * Application version, checked during handshakes
 *
 */
export type Version = string;
/**
 *
 * Time window start
 *
 */
export type NumberDk8ZmyGi = number;
/**
 *
 * Time window end
 *
 */
export type NumberWbCeho3I = number;
/**
 *
 * number of final blocks in the time window
 *
 */
export type NumberGCfSuERd = number;
/**
 *
 * number of final executed operations in the time window
 *
 */
export type NumberJ4Dz6P30 = number;
/**
 *
 * Execution stats
 *
 */
export interface ExecutionStats {
  time_window_start: NumberDk8ZmyGi;
  time_window_end: NumberWbCeho3I;
  final_block_count: NumberGCfSuERd;
  final_executed_operations_count: NumberJ4Dz6P30;
  active_cursor: Slot;
  final_cursor: Slot;
}
/**
 *
 * Chain id
 *
 */
export type NumberBte4OVdF = number;
type AlwaysFalse = any;
export type UnorderedSetOfStakerdplIH7J8 = Staker[];
export interface ObjectOfPeriodBlockIdWrpyYBUS {
  BlockId?: BlockId;
  period?: Period;
  [k: string]: any;
}
/**
 *
 * A tuple which contains (BlockId, period)
 *
 */
export interface BlockParent { [key: string]: any; }
/**
 *
 * Operations
 *
 */
export type Operations = OperationInfo[];
/**
 *
 * filled block
 *
 */
export interface FilledBlock {
  header: WrappedHeader;
  operations: Operations;
}
export interface FilledBlockInfoContent {
  is_final: IsFinal;
  is_stale: Stale;
  is_in_blockclique: InBlockClique;
  block: FilledBlock;
}
export type UnorderedSetOfReadOnlyBytecodeExecutionZbvNyXvD = ReadOnlyBytecodeExecution[];
export type UnorderedSetOfReadOnlyCallOGx8T3Ix = ReadOnlyCall[];
export type UnorderedSetOfAddressjJsnATCO = Address[];
export type AddressList = AddressFilter[];
export type UnorderedSetOfBlockIdZXK9XY8A = BlockId[];
export type UnorderedSetOfDatastoreEntryInputLrTgdYH8 = DatastoreEntryInput[];
export type UnorderedSetOfEndorsementIdqnHAk5M0 = EndorsementId[];
/**
 *
 * Event filter
 *
 */
export interface EventFilter {
  start?: Slot;
  end?: Slot;
  emitter_address?: Address;
  original_caller_address?: Address;
  original_operation_id?: OperationId;
  is_final?: IsFinal;
  is_error?: Error;
}
export interface ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq {
  start?: NumberHo1ClIqD;
  end?: NumberHo1ClIqD;
}
export type UnorderedSetOfOperationId5TxbV4NZ = OperationId[];
export type UnorderedSetOfPrivateKeyG69QLiLP = PrivateKey[];
/**
 *
 * Array of Ipv4 or Ipv6 address
 *
 */
export type IpAddressList = IpAddress[];
export type UnorderedSetOfStringDoaGddGADvj0XlFa = StringDoaGddGA[];
export type UnorderedSetOfIpAddressiIc9WbOi = IpAddress[];
export type UnorderedSetOfOperationInputx51DfMZX = OperationInput[];
/**
 *
 * ApiRequest for apiV2
 *
 */
export interface ApiRequest {
  page_request?: Pagination;
}
export type UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS = ExecuteReadOnlyResponse[];
export type UnorderedSetOfAddressInfowrpyYBUS = AddressInfo[];
export type BytecodeList = Bytes[];
export type UnorderedSetOfBlockInfowrpyYBUS = BlockInfo[];
export type UnorderedSetOfCliqueeS9LyMHx = Clique[];
export type UnorderedSetOfDatastoreEntryOutputgBhWTzxI = DatastoreEntryOutput[];
export type UnorderedSetOfUnorderedSetOfTransferReceiptzpyvh8AYeEDRSdp7 = UnorderedSetOfTransferReceiptzpyvh8AY[];
export type UnorderedSetOfEndorsementInfowrpyYBUS = EndorsementInfo[];
export type UnorderedSetOfGraphIntervalwrpyYBUS = GraphInterval[];
export type UnorderedSetOfOperationInfowrpyYBUS = OperationInfo[];
/**
 *
 * Node status
 *
 */
export interface NodeStatus {
  config: Config;
  connected_nodes: ConnectedNodes;
  consensus_stats: ConsensusStats;
  current_cycle: NumberSWFW9I8Z;
  current_time: NumberYQZ1VVuw;
  current_cycle_time: NumberQuWRP8Oa;
  next_cycle_time: NumberSDEXjSo6;
  last_slot: Slot;
  network_stats: NetworkStats;
  next_slot: Slot;
  node_id: StringOFgZzVe7;
  node_ip?: OneOfIpAddressNullQu0Arl1FXaFV5TPI;
  pool_stats: PoolStats;
  version: Version;
  execution_stats: ExecutionStats;
  chain_id: NumberBte4OVdF;
  minimal_fees?: Amount;
}
/**
 *
 * Public key and a signature it has produced used for serialization/deserialization purpose
 *
 */
export interface PubkeySig {
  public_key: PublicKey;
  signature: Signature;
}
/**
 *
 * PagedVec of stakers for apiV2
 *
 */
export interface PagedVecStaker {
  content?: UnorderedSetOfStakerdplIH7J8;
  total_count?: NumberHo1ClIqD;
}
export type UnorderedSetOfBlockParentwrpyYBUS = BlockParent[];
export interface FilledBlockInfo {
  id: OperationId;
  content?: FilledBlockInfoContent;
}
/**
 *
 * Generated! Represents an alias to any of the provided schemas
 *
 */
export type AnyOfUnorderedSetOfReadOnlyBytecodeExecutionZbvNyXvDUnorderedSetOfReadOnlyCallOGx8T3IxUnorderedSetOfAddressjJsnATCOAddressListUnorderedSetOfBlockIdZXK9XY8ASlotUnorderedSetOfDatastoreEntryInputLrTgdYH8UnorderedSetOfSlotwrpyYBUSUnorderedSetOfEndorsementIdqnHAk5M0EventFilterObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75FqUnorderedSetOfOperationId5TxbV4NZPaginationUnorderedSetOfPrivateKeyG69QLiLPIpAddressListIpAddressListIpAddressListUnorderedSetOfStringDoaGddGADvj0XlFaIpAddressListIpAddressListIpAddressListIpAddressListIpAddressListUnorderedSetOfAddressjJsnATCOBytesUnorderedSetOfIpAddressiIc9WbOiIpAddressListIpAddressListUnorderedSetOfOperationInputx51DfMZXApiRequestInteger2AHOqbcQInteger2AHOqbcQInteger2AHOqbcQInteger2AHOqbcQUnorderedSetOfExecuteReadOnlyResponsewrpyYBUSUnorderedSetOfExecuteReadOnlyResponsewrpyYBUSUnorderedSetOfAddressInfowrpyYBUSBytecodeListUnorderedSetOfBlockInfowrpyYBUSBlockUnorderedSetOfCliqueeS9LyMHxUnorderedSetOfDatastoreEntryOutputgBhWTzxIUnorderedSetOfUnorderedSetOfTransferReceiptzpyvh8AYeEDRSdp7UnorderedSetOfEndorsementInfowrpyYBUSOutputEventsUnorderedSetOfGraphIntervalwrpyYBUSUnorderedSetOfOperationInfowrpyYBUSUnorderedSetOfStakerdplIH7J8NodeStatusAlwaysFalseUnorderedSetOfAddressjJsnATCOAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseIpAddressListIpAddressListAlwaysFalseIpAddressListAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalsePubkeySigAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseUnorderedSetOfOperationId5TxbV4NZPagedVecStakerUnorderedSetOfBlockParentwrpyYBUSVersionBlockInfoWrappedHeaderFilledBlockInfoOperationBooleanVyG3AEThBooleanVyG3AEThBooleanVyG3AEThBooleanVyG3AETh = UnorderedSetOfReadOnlyBytecodeExecutionZbvNyXvD | UnorderedSetOfReadOnlyCallOGx8T3Ix | UnorderedSetOfAddressjJsnATCO | AddressList | UnorderedSetOfBlockIdZXK9XY8A | Slot | UnorderedSetOfDatastoreEntryInputLrTgdYH8 | UnorderedSetOfSlotwrpyYBUS | UnorderedSetOfEndorsementIdqnHAk5M0 | EventFilter | ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq | UnorderedSetOfOperationId5TxbV4NZ | Pagination | UnorderedSetOfPrivateKeyG69QLiLP | IpAddressList | UnorderedSetOfStringDoaGddGADvj0XlFa | Bytes | UnorderedSetOfIpAddressiIc9WbOi | UnorderedSetOfOperationInputx51DfMZX | ApiRequest | Integer2AHOqbcQ | UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS | UnorderedSetOfAddressInfowrpyYBUS | BytecodeList | UnorderedSetOfBlockInfowrpyYBUS | Block | UnorderedSetOfCliqueeS9LyMHx | UnorderedSetOfDatastoreEntryOutputgBhWTzxI | UnorderedSetOfUnorderedSetOfTransferReceiptzpyvh8AYeEDRSdp7 | UnorderedSetOfEndorsementInfowrpyYBUS | OutputEvents | UnorderedSetOfGraphIntervalwrpyYBUS | UnorderedSetOfOperationInfowrpyYBUS | UnorderedSetOfStakerdplIH7J8 | NodeStatus | AlwaysFalse | PubkeySig | PagedVecStaker | UnorderedSetOfBlockParentwrpyYBUS | Version | BlockInfo | WrappedHeader | FilledBlockInfo | Operation | BooleanVyG3AETh;
export type ExecuteReadOnlyBytecode = (ReadOnlyBytecodeExecution: UnorderedSetOfReadOnlyBytecodeExecutionZbvNyXvD) => Promise<UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS>;
export type ExecuteReadOnlyCall = (ReadOnlyCall: UnorderedSetOfReadOnlyCallOGx8T3Ix) => Promise<UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS>;
export type GetAddresses = (address: UnorderedSetOfAddressjJsnATCO) => Promise<UnorderedSetOfAddressInfowrpyYBUS>;
export type GetAddressesBytecode = (addressFilter: AddressList) => Promise<BytecodeList>;
export type GetBlocks = (blockIds: UnorderedSetOfBlockIdZXK9XY8A) => Promise<UnorderedSetOfBlockInfowrpyYBUS>;
export type GetBlockcliqueBlockBySlot = (slot: Slot) => Promise<Block>;
export type GetCliques = () => Promise<UnorderedSetOfCliqueeS9LyMHx>;
export type GetDatastoreEntries = (DatastoreEntryInputs: UnorderedSetOfDatastoreEntryInputLrTgdYH8) => Promise<UnorderedSetOfDatastoreEntryOutputgBhWTzxI>;
export type GetSlotsTransfers = (slots: UnorderedSetOfSlotwrpyYBUS) => Promise<UnorderedSetOfUnorderedSetOfTransferReceiptzpyvh8AYeEDRSdp7>;
export type GetEndorsements = (endorsementId: UnorderedSetOfEndorsementIdqnHAk5M0) => Promise<UnorderedSetOfEndorsementInfowrpyYBUS>;
export type GetFilteredScOutputEvent = (EventFilter: EventFilter) => Promise<OutputEvents>;
export type GetGraphInterval = (TimeInterval: ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq) => Promise<UnorderedSetOfGraphIntervalwrpyYBUS>;
export type GetOperations = (operationId: UnorderedSetOfOperationId5TxbV4NZ) => Promise<UnorderedSetOfOperationInfowrpyYBUS>;
export type GetStakers = (PageRequest: Pagination) => Promise<UnorderedSetOfStakerdplIH7J8>;
export type GetStatus = () => Promise<NodeStatus>;
export type AddStakingSecretKeys = (SecretKeys: UnorderedSetOfPrivateKeyG69QLiLP) => Promise<AlwaysFalse>;
export type GetStakingAddresses = () => Promise<UnorderedSetOfAddressjJsnATCO>;
export type NodeAddToBootstrapBlacklist = (ip: IpAddressList) => Promise<AlwaysFalse>;
export type NodeAddToBootstrapWhitelist = (ip: IpAddressList) => Promise<AlwaysFalse>;
export type NodeAddToPeersWhitelist = (ip: IpAddressList) => Promise<AlwaysFalse>;
export type NodeBanById = (id: UnorderedSetOfStringDoaGddGADvj0XlFa) => Promise<AlwaysFalse>;
export type NodeBanByIp = (ip: IpAddressList) => Promise<AlwaysFalse>;
export type NodeBootstrapBlacklist = () => Promise<IpAddressList>;
export type NodeBootstrapWhitelist = () => Promise<IpAddressList>;
export type NodeBootstrapWhitelistAllowAll = () => Promise<AlwaysFalse>;
export type NodePeersWhitelist = () => Promise<IpAddressList>;
export type NodeRemoveFromBootstrapBlacklist = (ip: IpAddressList) => Promise<AlwaysFalse>;
export type NodeRemoveFromBootstrapWhitelist = (ip: IpAddressList) => Promise<AlwaysFalse>;
export type NodeRemoveFromPeersWhitelist = (ip: IpAddressList) => Promise<AlwaysFalse>;
export type NodeRemoveFromWhitelist = (ip: IpAddressList) => Promise<AlwaysFalse>;
export type RemoveStakingAddresses = (addresses: UnorderedSetOfAddressjJsnATCO) => Promise<AlwaysFalse>;
export type NodeSignMessage = (message: Bytes) => Promise<PubkeySig>;
export type StopNode = () => Promise<AlwaysFalse>;
export type NodeUnbanById = (id: UnorderedSetOfIpAddressiIc9WbOi) => Promise<AlwaysFalse>;
export type NodeUnbanByIp = (ip: IpAddressList) => Promise<AlwaysFalse>;
export type NodeWhitelist = (ip: IpAddressList) => Promise<AlwaysFalse>;
export type SendOperations = (OperationInput: UnorderedSetOfOperationInputx51DfMZX) => Promise<UnorderedSetOfOperationId5TxbV4NZ>;
export type GetLargestStakers = (ApiRequest: ApiRequest) => Promise<PagedVecStaker>;
export type GetNextBlockBestParents = () => Promise<UnorderedSetOfBlockParentwrpyYBUS>;
export type GetVersion = () => Promise<Version>;
export type SubscribeNewBlocks = () => Promise<BlockInfo>;
export type SubscribeNewBlocksHeaders = () => Promise<WrappedHeader>;
export type SubscribeNewFilledBlocks = () => Promise<FilledBlockInfo>;
export type SubscribeNewOperations = () => Promise<Operation>;
export type UnsubscribeNewBlocks = (subscriptionId: Integer2AHOqbcQ) => Promise<BooleanVyG3AETh>;
export type UnsubscribeNewBlocksHeaders = (subscriptionId: Integer2AHOqbcQ) => Promise<BooleanVyG3AETh>;
export type UnsubscribeNewFilledBlocks = (subscriptionId: Integer2AHOqbcQ) => Promise<BooleanVyG3AETh>;
export type UnsubscribeNewOperations = (subscriptionId: Integer2AHOqbcQ) => Promise<BooleanVyG3AETh>;