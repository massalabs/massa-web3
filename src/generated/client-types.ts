/**
 *
 * Max available gas
 *
 */
export type NumberPsns2WbD = number;
export type Integer2AHOqbcQ = number;
/**
 *
 * Bytecode to execute
 *
 */
export type UnorderedSetOfInteger2AHOqbcQjNvs9B0Z = Integer2AHOqbcQ[];
/**
 *
 * Address
 *
 */
export type Address = string;
/**
 *
 * An operation datastore
 *
 */
export type UnorderedSetOfInteger2AHOqbcQtXvTMhya = Integer2AHOqbcQ[];
/**
 *
 * Whether to start execution from final or active state
 *
 */
export type BooleanHNwwo80P = boolean;
/**
 *
 * Amount in coins, optional
 *
 */
export type NumberZ1JdLCIz = number;
/**
 *
 * Fee, optional
 *
 */
export type NumberSnYk3VhE = number;
/**
 *
 * Read only bytecode execution
 *
 */
export interface ReadOnlyBytecodeExecution {
  max_gas: NumberPsns2WbD;
  bytecode: UnorderedSetOfInteger2AHOqbcQjNvs9B0Z;
  address?: Address;
  operation_datastore?: UnorderedSetOfInteger2AHOqbcQtXvTMhya;
  is_final?: BooleanHNwwo80P;
  coins?: NumberZ1JdLCIz;
  fee?: NumberSnYk3VhE;
}
/**
 *
 * Target address
 *
 */
export type StringYvGZTlwQ = string;
/**
 *
 * Target function
 *
 */
export type StringBtBJC5Iw = string;
/**
 *
 * Function parameter
 *
 */
export type UnorderedSetOfInteger2AHOqbcQzYHdsLoW = Integer2AHOqbcQ[];
export type NullQu0Arl1F = null;
export type StringDoaGddGA = string;
/**
 *
 * Caller's address, optional
 *
 */
export type OneOfNullQu0Arl1FStringDoaGddGAHzYKhN99 = NullQu0Arl1F | StringDoaGddGA;
/**
 *
 * Amount in coins, optional
 *
 */
export type OneOfNullQu0Arl1FStringDoaGddGAEUSQB1KK = NullQu0Arl1F | StringDoaGddGA;
/**
 *
 * Fee, optional
 *
 */
export type OneOfNullQu0Arl1FStringDoaGddGANOhzhrxe = NullQu0Arl1F | StringDoaGddGA;
/**
 *
 * Read only call
 *
 */
export interface ReadOnlyCall {
  max_gas: NumberPsns2WbD;
  target_address: StringYvGZTlwQ;
  target_function: StringBtBJC5Iw;
  parameter: UnorderedSetOfInteger2AHOqbcQzYHdsLoW;
  caller_address: OneOfNullQu0Arl1FStringDoaGddGAHzYKhN99;
  coins: OneOfNullQu0Arl1FStringDoaGddGAEUSQB1KK;
  fee: OneOfNullQu0Arl1FStringDoaGddGANOhzhrxe;
}
/**
 *
 * true means final, false means candidate
 *
 */
export type Boolean7Xei3MDX = boolean;
/**
 *
 * Address filter
 *
 */
export interface AddressFilter {
  address?: Address;
  is_final?: Boolean7Xei3MDX;
}
/**
 *
 * Block identifier
 *
 */
export type BlockId = string;
export type NumberHo1ClIqD = number;
export type UnorderedSetOfInteger2AHOqbcQBha3UJIJ = Integer2AHOqbcQ[];
export interface DatastoreEntryInput {
  address: Address;
  key: UnorderedSetOfInteger2AHOqbcQBha3UJIJ;
}
/**
 *
 * Slot
 *
 */
export interface Slot {
  period: NumberHo1ClIqD;
  thread: NumberHo1ClIqD;
}
/**
 *
 * Optional emitter address
 *
 */
export type String5J7NQ8B1 = string;
/**
 *
 * Optional caller address
 *
 */
export type StringCc6XlKeq = string;
/**
 *
 * Optional operation id
 *
 */
export type StringUcQL9QGN = string;
/**
 *
 * Optional filter to filter only candidate or final events
 *
 */
export type BooleanObf9WMA0 = boolean;
/**
 *
 * Optional filter to retrieve events generated in a failed execution
 *
 */
export type BooleanAXlyTrPe = boolean;
/**
 *
 * `PrivateKey` is used for signature and decryption
 *
 */
export type PrivateKey = string;
/**
 *
 * Ip address
 *
 */
export type StringBBdNk2Ku = string;
/**
 *
 * ip address
 *
 */
export type StringOGpKXaCP = string;
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
export type UnorderedSetOfInteger2AHOqbcQarZIQlOy = Integer2AHOqbcQ[];
/**
 *
 * Operation input
 *
 */
export interface OperationInput {
  creator_public_key: PublicKey;
  signature: Signature;
  serialized_content: UnorderedSetOfInteger2AHOqbcQarZIQlOy;
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
export interface ExecuteAt {
  period: NumberHo1ClIqD;
  thread: NumberHo1ClIqD;
}
export type StringUJarsTOs = string;
/**
 *
 * Included in case of success. The result of the execution
 *
 */
export type UnorderedSetOfStringUJarsTOsgviiNMvH = StringUJarsTOs[];
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
  Ok?: UnorderedSetOfStringUJarsTOsgviiNMvH;
  Error?: StringOz2F8Z2Y;
}
/**
 *
 * String of the event you sended
 *
 */
export type StringBt9L6T1F = string;
/**
 *
 * Wether the event was generated during  read only call
 *
 */
export type BooleanQYH7IQYB = boolean;
/**
 *
 * Addresses, most recent at the end
 *
 */
export type UnorderedSetOfAddressqhKJr2Tw = Address[];
/**
 *
 * Index of the event in the slot
 *
 */
export type NumberHGt16B6Y = number;
/**
 *
 * Operation id
 *
 */
export type OperationId = string;
/**
 *
 * Whether the event is final
 *
 */
export type BooleanSPcYqJj2 = boolean;
/**
 *
 * Whether the event was generated in a failed executed or not
 *
 */
export type BooleanIqtEc7R0 = boolean;
/**
 *
 * Context generated by the execution context
 *
 */
export interface EventExecutionContext {
  slot: Slot;
  block?: BlockId;
  read_only: BooleanQYH7IQYB;
  call_stack: UnorderedSetOfAddressqhKJr2Tw;
  index_in_slot: NumberHGt16B6Y;
  origin_operation_id?: OperationId;
  is_final: BooleanSPcYqJj2;
  is_error?: BooleanIqtEc7R0;
}
export interface SCOutputEvent {
  data: StringBt9L6T1F;
  context: EventExecutionContext;
}
export type UnorderedSetOfSCOutputEventHwhiOmzE = SCOutputEvent[];
/**
 *
 * The gas cost for the execution
 *
 */
export type NumberAIaYfWME = number;
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
  executed_at: ExecuteAt;
  result: ReadOnlyResult;
  output_events: UnorderedSetOfSCOutputEventHwhiOmzE;
  gas_cost: NumberAIaYfWME;
  state_changes: StateChanges;
}
/**
 *
 * The thread the address belongs to
 *
 */
export type NumberSYJcvZVm = number;
/**
 *
 * The final balance
 *
 */
export type StringFFlpWNJb = string;
/**
 *
 * The final roll count
 *
 */
export type NumberPAAsFK4N = number;
export type UnorderedSetOfNumberHo1ClIqDAokMKuEf = NumberHo1ClIqD[];
/**
 *
 * The final datastore keys
 *
 */
export type UnorderedSetOfUnorderedSetOfNumberHo1ClIqDAokMKuEfIixaMtvV = UnorderedSetOfNumberHo1ClIqDAokMKuEf[];
/**
 *
 * The candidate balance
 *
 */
export type StringSZbUM3UB = string;
/**
 *
 * The candidate roll count
 *
 */
export type NumberUycrgn8X = number;
/**
 *
 * The candidate datastore keys
 *
 */
export type UnorderedSetOfUnorderedSetOfNumberHo1ClIqDAokMKuEfmvpf11Qe = UnorderedSetOfNumberHo1ClIqDAokMKuEf[];
export interface ObjectOfSlotStringDoaGddGAQZyvCcRS {
  slot?: Slot;
  amount?: StringDoaGddGA;
  [k: string]: any;
}
/**
 *
 * The deferred credits
 *
 */
export type UnorderedSetOfObjectOfSlotStringDoaGddGAQZyvCcRS732D8Bc5 = ObjectOfSlotStringDoaGddGAQZyvCcRS[];
/**
 *
 * The next block draws
 *
 */
export type UnorderedSetOfSlotpnXhUhWs = Slot[];
export interface ObjectOfSlotNumberHo1ClIqDMPMjgxrm {
  slot?: Slot;
  index?: NumberHo1ClIqD;
  [k: string]: any;
}
/**
 *
 * The next endorsement draws
 *
 */
export type UnorderedSetOfObjectOfSlotNumberHo1ClIqDMPMjgxrm06Ae306Q = ObjectOfSlotNumberHo1ClIqDMPMjgxrm[];
/**
 *
 * BlockIds of created blocks
 *
 */
export type UnorderedSetOfBlockIdpdDCfi0P = BlockId[];
/**
 *
 * OperationIds of created operations
 *
 */
export type UnorderedSetOfOperationId971EzIER = OperationId[];
/**
 *
 * Endorsement id
 *
 */
export type EndorsementId = string;
/**
 *
 * EndorsementIds of created endorsements
 *
 */
export type UnorderedSetOfEndorsementIdNN27ZC1J = EndorsementId[];
export type BooleanVyG3AETh = boolean;
export type OneOfNullQu0Arl1FNumberHo1ClIqDKWtQwzS8 = NullQu0Arl1F | NumberHo1ClIqD;
export interface ExecutionAddressCycleInfo {
  cycle: NumberHo1ClIqD;
  is_final: BooleanVyG3AETh;
  ok_count: NumberHo1ClIqD;
  nok_count: NumberHo1ClIqD;
  active_rolls?: OneOfNullQu0Arl1FNumberHo1ClIqDKWtQwzS8;
}
/**
 *
 * Cycle infos
 *
 */
export type UnorderedSetOfExecutionAddressCycleInfo8D3STgcL = ExecutionAddressCycleInfo[];
export interface AddressInfo {
  address: Address;
  thread: NumberSYJcvZVm;
  final_balance: StringFFlpWNJb;
  final_roll_count: NumberPAAsFK4N;
  final_datastore_keys: UnorderedSetOfUnorderedSetOfNumberHo1ClIqDAokMKuEfIixaMtvV;
  candidate_balance: StringSZbUM3UB;
  candidate_roll_count: NumberUycrgn8X;
  candidate_datastore_keys: UnorderedSetOfUnorderedSetOfNumberHo1ClIqDAokMKuEfmvpf11Qe;
  deferred_credits: UnorderedSetOfObjectOfSlotStringDoaGddGAQZyvCcRS732D8Bc5;
  next_block_draws: UnorderedSetOfSlotpnXhUhWs;
  next_endorsement_draws: UnorderedSetOfObjectOfSlotNumberHo1ClIqDMPMjgxrm06Ae306Q;
  created_blocks: UnorderedSetOfBlockIdpdDCfi0P;
  created_operations: UnorderedSetOfOperationId971EzIER;
  created_endorsements: UnorderedSetOfEndorsementIdNN27ZC1J;
  cycle_infos: UnorderedSetOfExecutionAddressCycleInfo8D3STgcL;
}
/**
 *
 * true if final
 *
 */
export type BooleanZxUVUy6M = boolean;
/**
 *
 * true if candidate
 *
 */
export type BooleanMazVJcyf = boolean;
/**
 *
 * true if discarded
 *
 */
export type BooleanHJvzO9WE = boolean;
/**
 *
 * true if in the greatest clique
 *
 */
export type BooleanHjqkwJfo = boolean;
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
export type UnorderedSetOfStringDoaGddGADvj0XlFa = StringDoaGddGA[];
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
export interface ObjectOfStringDoaGddGAEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUS {
  content?: EndorsementContent;
  signature?: StringDoaGddGA;
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
export type UnorderedSetOfObjectOfStringDoaGddGAEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUSwrpyYBUS = ObjectOfStringDoaGddGAEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUS[];
export interface ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUS {
  public_key?: StringDoaGddGA;
  slot?: Integer2AHOqbcQ;
  index?: Integer2AHOqbcQ;
  hash_1?: StringDoaGddGA;
  hash_2?: StringDoaGddGA;
  signature_1?: StringDoaGddGA;
  signature_2?: StringDoaGddGA;
  [k: string]: any;
}
export interface ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAWrpyYBUS {
  public_key?: StringDoaGddGA;
  slot?: Integer2AHOqbcQ;
  hash_1?: StringDoaGddGA;
  hash_2?: StringDoaGddGA;
  signature_1?: StringDoaGddGA;
  signature_2?: StringDoaGddGA;
  [k: string]: any;
}
export type OneOfObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAWrpyYBUSGJLAASWC = ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUS | ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAWrpyYBUS;
/**
 *
 * Denunciations
 *
 */
export type UnorderedSetOfOneOfObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAWrpyYBUSGJLAASWCwrpyYBUS = OneOfObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAWrpyYBUSGJLAASWC[];
/**
 *
 * header type
 *
 */
export interface Header {
  current_version?: NumberTbrodUsH;
  announced_version?: OneOfNullQu0Arl1FNumberHo1ClIqD4U4GpKJM;
  operation_merkle_root: StringDoaGddGA;
  parents: UnorderedSetOfStringDoaGddGADvj0XlFa;
  slot: Slot;
  endorsements?: UnorderedSetOfObjectOfStringDoaGddGAEndorsementIdPublicKeyAddressEndorsementContentWrpyYBUSwrpyYBUS;
  denunciations?: UnorderedSetOfOneOfObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAWrpyYBUSObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAWrpyYBUSGJLAASWCwrpyYBUS;
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
/**
 *
 * Operations
 *
 */
export type UnorderedSetOfStringDoaGddGAucaTsQyS = StringDoaGddGA[];
export interface Block {
  header: WrappedHeader;
  operations: UnorderedSetOfStringDoaGddGAucaTsQyS;
}
export interface BlockInfoContent {
  is_final: BooleanZxUVUy6M;
  is_candidate: BooleanMazVJcyf;
  is_discarded?: BooleanHJvzO9WE;
  is_in_blockclique: BooleanHjqkwJfo;
  block: Block;
}
export interface BlockInfo {
  id: StringDoaGddGA;
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
 * The candidate datastore entry value bytes
 *
 */
export type UnorderedSetOfInteger2AHOqbcQO7Zjb5J8 = Integer2AHOqbcQ[];
/**
 *
 * The final datastore entry value bytes
 *
 */
export type UnorderedSetOfInteger2AHOqbcQkkcEIHm8 = Integer2AHOqbcQ[];
/**
 *
 * Datastore entry
 *
 */
export interface DatastoreEntryOutput {
  candidate_value: UnorderedSetOfInteger2AHOqbcQO7Zjb5J8;
  final_value: UnorderedSetOfInteger2AHOqbcQkkcEIHm8;
}
/**
 *
 * Address of the sender
 *
 */
export type StringYVTrFSaQ = string;
/**
 *
 * Address of the receiver
 *
 */
export type StringZyWeUFZ8 = string;
/**
 *
 * Amount transferred
 *
 */
export type IntegerCOVAu0Eq = number;
/**
 *
 * Amount received by the receiver
 *
 */
export type IntegerVC2Agt39 = number;
/**
 *
 * Context of the transfer : operation or asyncronous execution
 *
 */
export interface Object0XCk2T5H { [key: string]: any; }
/**
 *
 * True if the operation succeed otherwise false
 *
 */
export type BooleanYDqyb5Vp = boolean;
/**
 *
 * Fees passed to the operation
 *
 */
export type NumberV8R93Gu7 = number;
/**
 *
 * ID of the block in which the operation is included
 *
 */
export type StringUyVBK2CK = string;
/**
 *
 * Describe a transfer of MAS
 *
 */
export interface Transfer {
  from: StringYVTrFSaQ;
  to: StringZyWeUFZ8;
  amount: IntegerCOVAu0Eq;
  effective_amount_received: IntegerVC2Agt39;
  context: Object0XCk2T5H;
  succeed: BooleanYDqyb5Vp;
  fee: NumberV8R93Gu7;
  block_id: StringUyVBK2CK;
}
export type UnorderedSetOfTransferQEyQHpyL = Transfer[];
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
  signature: StringDoaGddGA;
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
  is_final: BooleanVyG3AETh;
  endorsement: Endorsement;
}
/**
 *
 * Public key
 *
 */
export type StringVuVvWRdT = string;
/**
 *
 * Block Id
 *
 */
export type StringU8LlHDu1 = string;
/**
 *
 * As many block Ids as there are threads
 *
 */
export type UnorderedSetOfStringDoaGddGAMZnHm9WS = StringDoaGddGA[];
export interface GraphInterval {
  creator: StringVuVvWRdT;
  id: StringU8LlHDu1;
  is_final: BooleanVyG3AETh;
  is_in_blockclique: BooleanVyG3AETh;
  is_stale: BooleanVyG3AETh;
  parents: UnorderedSetOfStringDoaGddGAMZnHm9WS;
  slot: Slot;
}
/**
 *
 * Operation id
 *
 */
export type StringYTemzr68 = string;
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
export type OneOfBooleanVyG3AEThNullQu0Arl1FCuqCzoUJ = NullQu0Arl1F | BooleanVyG3AETh;
/**
 *
 * Thread in which the operation can be included
 *
 */
export type NumberZoWtBk8U = number;
/**
 *
 * the fee they have decided for this operation
 *
 */
export type StringV3754ZDT = string;
/**
 *
 * after `expire_period` slot the operation won't be included in a block
 *
 */
export type NumberSbfeGjn7 = number;
/**
 *
 * Represent an Amount in coins
 *
 */
export type StringNIrlyE1J = string;
/**
 *
 * transfer coins from sender to recipient
 *
 */
export interface Transaction {
  amount: StringNIrlyE1J;
  recipient_address: StringDoaGddGA;
}
/**
 *
 * Vec of bytes to execute
 *
 */
export type UnorderedSetOfNumberHo1ClIqDd5W02PgX = NumberHo1ClIqD[];
/**
 *
 * Maximum amount of gas that the execution of the contract is allowed to cost.
 *
 */
export type NumberQUXtpAPK = number;
export interface ObjectOfUnorderedSetOfInteger2AHOqbcQarZIQlOyUnorderedSetOfInteger2AHOqbcQarZIQlOyDbxIogvI {
  entry?: UnorderedSetOfInteger2AHOqbcQarZIQlOy;
  bytes?: UnorderedSetOfInteger2AHOqbcQarZIQlOy;
  [k: string]: any;
}
/**
 *
 * A tuple which contains (key, value)
 *
 */
export interface Datastore { [key: string]: any; }
/**
 *
 * Execute a smart contract.
 *
 */
export interface ExecuteSC {
  data: UnorderedSetOfNumberHo1ClIqDd5W02PgX;
  max_gas: NumberQUXtpAPK;
  datastore: Datastore;
}
/**
 *
 * Function name
 *
 */
export type String7HCIMJir = string;
/**
 *
 * Parameter to pass to the function
 *
 */
export type StringSjIor0MV = string;
/**
 *
 * Amount
 *
 */
export type Number5Mo1HId6 = number;
/**
 *
 * Calls an exported function from a stored smart contract
 *
 */
export interface CallSC {
  target_addr: Address;
  target_func: String7HCIMJir;
  param: StringSjIor0MV;
  max_gas: NumberHo1ClIqD;
  coins: Number5Mo1HId6;
}
/**
 *
 * roll count
 *
 */
export type NumberJdJmnq9D = number;
/**
 *
 * the sender buys `roll_count` rolls. Roll price is defined in configuration
 *
 */
export interface RollBuy {
  roll_count: NumberJdJmnq9D;
}
/**
 *
 * the sender sells `roll_count` rolls. Roll price is defined in configuration
 *
 */
export interface RollSell {
  roll_count: NumberJdJmnq9D;
}
/**
 *
 * the type specific operation part
 *
 */
export interface OperationType {
  Transaction?: Transaction;
  ExecutSC?: ExecuteSC;
  CallSC?: CallSC;
  RollBuy?: RollBuy;
  RollSell?: RollSell;
}
/**
 *
 * Operation
 *
 */
export interface Operation {
  fee: StringV3754ZDT;
  expire_period: NumberSbfeGjn7;
  op: OperationType;
}
/**
 *
 * The operation itself
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
  id: StringYTemzr68;
  in_blocks: UnorderedSetOfBlockIdyEy9Dvpn;
  in_pool: BooleanSJ3TNusg;
  is_operation_final: OneOfBooleanVyG3AEThNullQu0Arl1FCuqCzoUJ;
  thread: NumberZoWtBk8U;
  operation: WrappedOperation;
  op_exec_status?: OneOfBooleanVyG3AEThNullQu0Arl1FE3Qax0Os;
}
export interface ObjectOfAddressNumberHo1ClIqDFbgdJFtJ {
  address?: Address;
  active_rolls?: NumberHo1ClIqD;
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
  block_reward: StringNIrlyE1J;
  delta_f0: Number2A9FvvYh;
  end_timestamp?: OneOfNullQu0Arl1FNumberHo1ClIqDXysINzQy;
  genesis_timestamp: NumberSgfzurLm;
  max_block_size?: NumberUwkWWxaa;
  operation_validity_periods: NumberTs6Cn6JQ;
  periods_per_cycle: NumberGrsxxfaH;
  roll_price: StringNIrlyE1J;
  t0: Number8ImKBhpQ;
  thread_count: NumberAxwlzLso;
}
export interface ObjectOfStringDoaGddGAStringDoaGddGAXJdFCZe6 {
  node_id?: StringDoaGddGA;
  ip_address?: StringDoaGddGA;
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
export type OneOfNullQu0Arl1FStringDoaGddGANsst9HIR = NullQu0Arl1F | StringDoaGddGA;
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
/**
 *
 * Minimal fee
 *
 */
export type StringTXHumHoA = string;
type AlwaysFalse = any;
/**
 *
 * Ip address
 *
 */
export type IpAddress = string;
/**
 *
 * public key
 *
 */
export type StringTPMT1Yxd = string;
/**
 *
 * signature
 *
 */
export type StringXHbmHEWh = string;
export type UnorderedSetOfStakerX7P278VS = Staker[];
export interface ObjectOfNumberHo1ClIqDBlockIdHCnqqlza {
  BlockId?: BlockId;
  period?: NumberHo1ClIqD;
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
 * true if incompatible with a final block
 *
 */
export type Boolean4XbLtRCK = boolean;
/**
 *
 * Operations
 *
 */
export type UnorderedSetOfOperationInfowrpyYBUS = OperationInfo[];
/**
 *
 * filled block
 *
 */
export interface FilledBlock {
  header: WrappedHeader;
  operations: UnorderedSetOfOperationInfowrpyYBUS;
}
export interface FilledBlockInfoContent {
  is_final: BooleanZxUVUy6M;
  is_stale: Boolean4XbLtRCK;
  is_in_blockclique: BooleanHjqkwJfo;
  block: FilledBlock;
}
export type UnorderedSetOfReadOnlyBytecodeExecutionK4Ht8Zdn = ReadOnlyBytecodeExecution[];
export type UnorderedSetOfReadOnlyCallm6DMxyzd = ReadOnlyCall[];
export type UnorderedSetOfAddressjJsnATCO = Address[];
export type UnorderedSetOfAddressFilteraFrapw7X = AddressFilter[];
export type UnorderedSetOfBlockIdZXK9XY8A = BlockId[];
export type UnorderedSetOfDatastoreEntryInputBdlngHsZ = DatastoreEntryInput[];
export type UnorderedSetOfSlotn0BdrHhh = Slot[];
/**
 *
 * Event filter
 *
 */
export interface EventFilter {
  start?: Slot;
  end?: Slot;
  emitter_address?: String5J7NQ8B1;
  original_caller_address?: StringCc6XlKeq;
  original_operation_id?: StringUcQL9QGN;
  is_final?: BooleanObf9WMA0;
  is_error?: BooleanAXlyTrPe;
}
export interface ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq {
  start?: NumberHo1ClIqD;
  end?: NumberHo1ClIqD;
}
export type UnorderedSetOfPrivateKeyG69QLiLP = PrivateKey[];
export type UnorderedSetOfStringBBdNk2Kup3WUWKiM = StringBBdNk2Ku[];
export type UnorderedSetOfStringOGpKXaCP4RgV7KAw = StringOGpKXaCP[];
export type UnorderedSetOfOperationInput9XcIbRG1 = OperationInput[];
/**
 *
 * ApiRequest for apiV2
 *
 */
export interface ApiRequest {
  page_request?: Pagination;
}
export type UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS = ExecuteReadOnlyResponse[];
export type UnorderedSetOfAddressInfoCm3Tm6FQ = AddressInfo[];
export type UnorderedSetOfStringUJarsTOsGY6FcFnU = StringUJarsTOs[];
export type UnorderedSetOfBlockInfowrpyYBUS = BlockInfo[];
export type UnorderedSetOfCliqueeS9LyMHx = Clique[];
export type UnorderedSetOfDatastoreEntryOutputbVMCAJLz = DatastoreEntryOutput[];
export type UnorderedSetOfUnorderedSetOfTransferQEyQHpyLoFgVJgXU = UnorderedSetOfTransferQEyQHpyL[];
export type UnorderedSetOfEndorsementInfowrpyYBUS = EndorsementInfo[];
export type UnorderedSetOfGraphIntervalwrpyYBUS = GraphInterval[];
export type UnorderedSetOfOperationInfoMdPofISE = OperationInfo[];
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
  node_ip?: OneOfNullQu0Arl1FStringDoaGddGANsst9HIR;
  pool_stats: PoolStats;
  version: Version;
  execution_stats: ExecutionStats;
  chain_id: NumberBte4OVdF;
  minimal_fees?: StringTXHumHoA;
}
export type UnorderedSetOfIpAddressWpGgzO6M = IpAddress[];
/**
 *
 * Public key and a signature it has produced used for serialization/deserialization purpose
 *
 */
export interface PubkeySig {
  public_key: StringTPMT1Yxd;
  signature: StringXHbmHEWh;
}
export type UnorderedSetOfOperationId5TxbV4NZ = OperationId[];
/**
 *
 * PagedVec of stakers for apiV2
 *
 */
export interface PagedVecStaker {
  content?: UnorderedSetOfStakerX7P278VS;
  total_count?: NumberHo1ClIqD;
}
export type UnorderedSetOfBlockParentxrssVm84 = BlockParent[];
export interface FilledBlockInfo {
  id: StringDoaGddGA;
  content?: FilledBlockInfoContent;
}
/**
 *
 * Generated! Represents an alias to any of the provided schemas
 *
 */
export type AnyOfUnorderedSetOfReadOnlyBytecodeExecutionK4Ht8ZdnUnorderedSetOfReadOnlyCallm6DMxyzdUnorderedSetOfAddressjJsnATCOUnorderedSetOfAddressFilteraFrapw7XUnorderedSetOfBlockIdZXK9XY8ASlotUnorderedSetOfDatastoreEntryInputBdlngHsZUnorderedSetOfSlotn0BdrHhhUnorderedSetOfStringDoaGddGADvj0XlFaEventFilterObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75FqUnorderedSetOfStringDoaGddGADvj0XlFaPaginationUnorderedSetOfPrivateKeyG69QLiLPUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringDoaGddGADvj0XlFaUnorderedSetOfStringDoaGddGADvj0XlFaUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfAddressjJsnATCOStringUJarsTOsUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringOGpKXaCP4RgV7KAwUnorderedSetOfOperationInput9XcIbRG1ApiRequestInteger2AHOqbcQInteger2AHOqbcQInteger2AHOqbcQInteger2AHOqbcQUnorderedSetOfExecuteReadOnlyResponsewrpyYBUSUnorderedSetOfExecuteReadOnlyResponsewrpyYBUSUnorderedSetOfAddressInfoCm3Tm6FQUnorderedSetOfStringUJarsTOsGY6FcFnUUnorderedSetOfBlockInfowrpyYBUSBlockUnorderedSetOfCliqueeS9LyMHxUnorderedSetOfDatastoreEntryOutputbVMCAJLzUnorderedSetOfUnorderedSetOfTransferQEyQHpyLoFgVJgXUUnorderedSetOfEndorsementInfowrpyYBUSUnorderedSetOfSCOutputEventHwhiOmzEUnorderedSetOfGraphIntervalwrpyYBUSUnorderedSetOfOperationInfoMdPofISEUnorderedSetOfStakerX7P278VSNodeStatusAlwaysFalseUnorderedSetOfAddressjJsnATCOAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseUnorderedSetOfIpAddressWpGgzO6MUnorderedSetOfIpAddressWpGgzO6MAlwaysFalseUnorderedSetOfIpAddressWpGgzO6MAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalsePubkeySigAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseUnorderedSetOfOperationId5TxbV4NZPagedVecStakerUnorderedSetOfBlockParentxrssVm84VersionBlockInfoWrappedHeaderFilledBlockInfoOperationBooleanVyG3AEThBooleanVyG3AEThBooleanVyG3AEThBooleanVyG3AETh = UnorderedSetOfReadOnlyBytecodeExecutionK4Ht8Zdn | UnorderedSetOfReadOnlyCallm6DMxyzd | UnorderedSetOfAddressjJsnATCO | UnorderedSetOfAddressFilteraFrapw7X | UnorderedSetOfBlockIdZXK9XY8A | Slot | UnorderedSetOfDatastoreEntryInputBdlngHsZ | UnorderedSetOfSlotn0BdrHhh | UnorderedSetOfStringDoaGddGADvj0XlFa | EventFilter | ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq | Pagination | UnorderedSetOfPrivateKeyG69QLiLP | UnorderedSetOfStringBBdNk2Kup3WUWKiM | StringUJarsTOs | UnorderedSetOfStringOGpKXaCP4RgV7KAw | UnorderedSetOfOperationInput9XcIbRG1 | ApiRequest | Integer2AHOqbcQ | UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS | UnorderedSetOfAddressInfoCm3Tm6FQ | UnorderedSetOfStringUJarsTOsGY6FcFnU | UnorderedSetOfBlockInfowrpyYBUS | Block | UnorderedSetOfCliqueeS9LyMHx | UnorderedSetOfDatastoreEntryOutputbVMCAJLz | UnorderedSetOfUnorderedSetOfTransferQEyQHpyLoFgVJgXU | UnorderedSetOfEndorsementInfowrpyYBUS | UnorderedSetOfSCOutputEventHwhiOmzE | UnorderedSetOfGraphIntervalwrpyYBUS | UnorderedSetOfOperationInfoMdPofISE | UnorderedSetOfStakerX7P278VS | NodeStatus | AlwaysFalse | UnorderedSetOfIpAddressWpGgzO6M | PubkeySig | UnorderedSetOfOperationId5TxbV4NZ | PagedVecStaker | UnorderedSetOfBlockParentxrssVm84 | Version | BlockInfo | WrappedHeader | FilledBlockInfo | Operation | BooleanVyG3AETh;
export type ExecuteReadOnlyBytecode = (ReadOnlyBytecodeExecution: UnorderedSetOfReadOnlyBytecodeExecutionK4Ht8Zdn) => Promise<UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS>;
export type ExecuteReadOnlyCall = (ReadOnlyCall: UnorderedSetOfReadOnlyCallm6DMxyzd) => Promise<UnorderedSetOfExecuteReadOnlyResponsewrpyYBUS>;
export type GetAddresses = (address: UnorderedSetOfAddressjJsnATCO) => Promise<UnorderedSetOfAddressInfoCm3Tm6FQ>;
export type GetAddressesBytecode = (addressFilter: UnorderedSetOfAddressFilteraFrapw7X) => Promise<UnorderedSetOfStringUJarsTOsGY6FcFnU>;
export type GetBlocks = (blockId: UnorderedSetOfBlockIdZXK9XY8A) => Promise<UnorderedSetOfBlockInfowrpyYBUS>;
export type GetBlockcliqueBlockBySlot = (slot: Slot) => Promise<Block>;
export type GetCliques = () => Promise<UnorderedSetOfCliqueeS9LyMHx>;
export type GetDatastoreEntries = (DatastoreEntryInputs: UnorderedSetOfDatastoreEntryInputBdlngHsZ) => Promise<UnorderedSetOfDatastoreEntryOutputbVMCAJLz>;
export type GetSlotsTransfers = (slots: UnorderedSetOfSlotn0BdrHhh) => Promise<UnorderedSetOfUnorderedSetOfTransferQEyQHpyLoFgVJgXU>;
export type GetEndorsements = (endorsementId: UnorderedSetOfStringDoaGddGADvj0XlFa) => Promise<UnorderedSetOfEndorsementInfowrpyYBUS>;
export type GetFilteredScOutputEvent = (EventFilter: EventFilter) => Promise<UnorderedSetOfSCOutputEventHwhiOmzE>;
export type GetGraphInterval = (TimeInterval: ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq) => Promise<UnorderedSetOfGraphIntervalwrpyYBUS>;
export type GetOperations = (operationId: UnorderedSetOfStringDoaGddGADvj0XlFa) => Promise<UnorderedSetOfOperationInfoMdPofISE>;
export type GetStakers = (PageRequest: Pagination) => Promise<UnorderedSetOfStakerX7P278VS>;
export type GetStatus = () => Promise<NodeStatus>;
export type AddStakingSecretKeys = (SecretKeys: UnorderedSetOfPrivateKeyG69QLiLP) => Promise<AlwaysFalse>;
export type GetStakingAddresses = () => Promise<UnorderedSetOfAddressjJsnATCO>;
export type NodeAddToBootstrapBlacklist = (ip: UnorderedSetOfStringBBdNk2Kup3WUWKiM) => Promise<AlwaysFalse>;
export type NodeAddToBootstrapWhitelist = (ip: UnorderedSetOfStringBBdNk2Kup3WUWKiM) => Promise<AlwaysFalse>;
export type NodeAddToPeersWhitelist = (ip: UnorderedSetOfStringBBdNk2Kup3WUWKiM) => Promise<AlwaysFalse>;
export type NodeBanById = (id: UnorderedSetOfStringDoaGddGADvj0XlFa) => Promise<AlwaysFalse>;
export type NodeBanByIp = (ip: UnorderedSetOfStringDoaGddGADvj0XlFa) => Promise<AlwaysFalse>;
export type NodeBootstrapBlacklist = () => Promise<UnorderedSetOfIpAddressWpGgzO6M>;
export type NodeBootstrapWhitelist = () => Promise<UnorderedSetOfIpAddressWpGgzO6M>;
export type NodeBootstrapWhitelistAllowAll = () => Promise<AlwaysFalse>;
export type NodePeersWhitelist = () => Promise<UnorderedSetOfIpAddressWpGgzO6M>;
export type NodeRemoveFromBootstrapBlacklist = (ip: UnorderedSetOfStringBBdNk2Kup3WUWKiM) => Promise<AlwaysFalse>;
export type NodeRemoveFromBootstrapWhitelist = (ip: UnorderedSetOfStringBBdNk2Kup3WUWKiM) => Promise<AlwaysFalse>;
export type NodeRemoveFromPeersWhitelist = (ip: UnorderedSetOfStringBBdNk2Kup3WUWKiM) => Promise<AlwaysFalse>;
export type NodeRemoveFromWhitelist = (ip: UnorderedSetOfStringBBdNk2Kup3WUWKiM) => Promise<AlwaysFalse>;
export type RemoveStakingAddresses = (addresses: UnorderedSetOfAddressjJsnATCO) => Promise<AlwaysFalse>;
export type NodeSignMessage = (message: StringUJarsTOs) => Promise<PubkeySig>;
export type StopNode = () => Promise<AlwaysFalse>;
export type NodeUnbanById = (id: UnorderedSetOfStringBBdNk2Kup3WUWKiM) => Promise<AlwaysFalse>;
export type NodeUnbanByIp = (ip: UnorderedSetOfStringBBdNk2Kup3WUWKiM) => Promise<AlwaysFalse>;
export type NodeWhitelist = (ip: UnorderedSetOfStringOGpKXaCP4RgV7KAw) => Promise<AlwaysFalse>;
export type SendOperations = (OperationInput: UnorderedSetOfOperationInput9XcIbRG1) => Promise<UnorderedSetOfOperationId5TxbV4NZ>;
export type GetLargestStakers = (ApiRequest: ApiRequest) => Promise<PagedVecStaker>;
export type GetNextBlockBestParents = () => Promise<UnorderedSetOfBlockParentxrssVm84>;
export type GetVersion = () => Promise<Version>;
export type SubscribeNewBlocks = () => Promise<BlockInfo>;
export type SubscribeNewBlocksHeaders = () => Promise<WrappedHeader>;
export type SubscribeNewFilledBlocks = () => Promise<FilledBlockInfo>;
export type SubscribeNewOperations = () => Promise<Operation>;
export type UnsubscribeNewBlocks = (subscriptionId: Integer2AHOqbcQ) => Promise<BooleanVyG3AETh>;
export type UnsubscribeNewBlocksHeaders = (subscriptionId: Integer2AHOqbcQ) => Promise<BooleanVyG3AETh>;
export type UnsubscribeNewFilledBlocks = (subscriptionId: Integer2AHOqbcQ) => Promise<BooleanVyG3AETh>;
export type UnsubscribeNewOperations = (subscriptionId: Integer2AHOqbcQ) => Promise<BooleanVyG3AETh>;