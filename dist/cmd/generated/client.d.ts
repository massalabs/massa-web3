import { PostMessageWindowTransport, PostMessageIframeTransport, WebSocketTransport, HTTPTransport, Client, JSONRPCError } from "@open-rpc/client-js";
import { OpenrpcDocument as OpenRPC } from "@open-rpc/meta-schema";
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
 * Amount in coins
 *
 */
export type StringUEOIWsxD = string;
/**
 *
 * Amount in coins, optional
 *
 */
export type OneOfNullQu0Arl1FStringUEOIWsxDWJnwaakv = NullQu0Arl1F | StringUEOIWsxD;
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
    caller_address?: OneOfNullQu0Arl1FStringDoaGddGAHzYKhN99;
    coins?: OneOfNullQu0Arl1FStringUEOIWsxDWJnwaakv;
    fee?: OneOfNullQu0Arl1FStringDoaGddGANOhzhrxe;
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
/**
 *
 * Included in case of success. The result of the execution
 *
 */
export type UnorderedSetOfNumberHo1ClIqDKTdDgRxH = NumberHo1ClIqD[];
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
    Ok?: UnorderedSetOfNumberHo1ClIqDKTdDgRxH;
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
 * Block Id
 *
 */
export type OneOfBlockIdNullQu0Arl1FPrQcxUW9 = NullQu0Arl1F | BlockId;
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
 * Origin operation id
 *
 */
export type OneOfOperationIdNullQu0Arl1FHQguGgO5 = NullQu0Arl1F | OperationId;
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
    block?: OneOfBlockIdNullQu0Arl1FPrQcxUW9;
    read_only: BooleanQYH7IQYB;
    call_stack: UnorderedSetOfAddressqhKJr2Tw;
    index_in_slot: NumberHGt16B6Y;
    origin_operation_id?: OneOfOperationIdNullQu0Arl1FHQguGgO5;
    is_final: BooleanSPcYqJj2;
    is_error?: BooleanIqtEc7R0;
}
export interface SCOutputEvent {
    data: StringBt9L6T1F;
    context: EventExecutionContext;
}
export type UnorderedSetOfSCOutputEventOYFZHNQ5 = SCOutputEvent[];
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
export interface ObjectD93Z4FAG {
    [key: string]: any;
}
export interface ObjectHAgrRKSz {
    [key: string]: any;
}
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
export interface ObjectYWuwfL0B {
    [key: string]: any;
}
/**
 *
 * executed operations changes
 *
 */
export interface ObjectTK16EAH4 {
    [key: string]: any;
}
/**
 *
 * deferred call changes
 *
 */
export interface Object8GtTSzoU {
    [key: string]: any;
}
/**
 *
 * executed denunciation changes
 *
 */
export interface Object413CQ8L2 {
    [key: string]: any;
}
export interface ObjectOfStringDoaGddGANwpLofVw {
    Set: StringDoaGddGA;
    [k: string]: any;
}
/**
 *
 * execution trail hash change
 *
 */
export type OneOfObjectOfStringDoaGddGANwpLofVwStringDoaGddGAXjvqkj7F = ObjectOfStringDoaGddGANwpLofVw | StringDoaGddGA;
export interface StateChanges {
    ledger_changes: ObjectD93Z4FAG;
    async_pool_changes: UnorderedSetOfObjectHAgrRKSz46QV1Tyv;
    pos_changes: ObjectYWuwfL0B;
    executed_ops_changes: ObjectTK16EAH4;
    deferred_call_changes: Object8GtTSzoU;
    executed_denunciations_changes: Object413CQ8L2;
    execution_trail_hash_change: OneOfObjectOfStringDoaGddGANwpLofVwStringDoaGddGAXjvqkj7F;
}
export interface ExecuteReadOnlyResponse {
    executed_at: ExecuteAt;
    result: ReadOnlyResult;
    output_events: UnorderedSetOfSCOutputEventOYFZHNQ5;
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
export interface ObjectOfStringDoaGddGAEndorsementIdPublicKeyAddressEndorsementContentQm34HuM6 {
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
export type UnorderedSetOfObjectOfStringDoaGddGAEndorsementIdPublicKeyAddressEndorsementContentQm34HuM62M5VcL0D = ObjectOfStringDoaGddGAEndorsementIdPublicKeyAddressEndorsementContentQm34HuM6[];
export interface ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAAyHztuA7 {
    public_key?: StringDoaGddGA;
    slot?: Integer2AHOqbcQ;
    index?: Integer2AHOqbcQ;
    hash_1?: StringDoaGddGA;
    hash_2?: StringDoaGddGA;
    signature_1?: StringDoaGddGA;
    signature_2?: StringDoaGddGA;
    [k: string]: any;
}
export interface ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAGD2XRxon {
    public_key?: StringDoaGddGA;
    slot?: Integer2AHOqbcQ;
    hash_1?: StringDoaGddGA;
    hash_2?: StringDoaGddGA;
    signature_1?: StringDoaGddGA;
    signature_2?: StringDoaGddGA;
    [k: string]: any;
}
export type OneOfObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAAyHztuA7ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAGD2XRxon2GptXxnw = ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAAyHztuA7 | ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAGD2XRxon;
/**
 *
 * Denunciations
 *
 */
export type UnorderedSetOfOneOfObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAAyHztuA7ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAGD2XRxon2GptXxnwLKxyS0DP = OneOfObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAAyHztuA7ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAGD2XRxon2GptXxnw[];
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
    endorsements?: UnorderedSetOfObjectOfStringDoaGddGAEndorsementIdPublicKeyAddressEndorsementContentQm34HuM62M5VcL0D;
    denunciations?: UnorderedSetOfOneOfObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAInteger2AHOqbcQStringDoaGddGAStringDoaGddGAAyHztuA7ObjectOfInteger2AHOqbcQStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAStringDoaGddGAGD2XRxon2GptXxnwLKxyS0DP;
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
export type OneOfNullQu0Arl1FStringDoaGddGAUBejLf7Q = StringDoaGddGA | NullQu0Arl1F;
/**
 *
 * Datastore entry
 *
 */
export interface DatastoreEntryOutput {
    candidate_value?: OneOfNullQu0Arl1FStringDoaGddGAUBejLf7Q;
    final_value?: OneOfNullQu0Arl1FStringDoaGddGAUBejLf7Q;
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
export type StringY2SYXWiA = string;
/**
 *
 * Amount received by the receiver
 *
 */
export type StringYVXxb2TR = string;
/**
 *
 * Context of the transfer : operation or asynchronous execution
 *
 */
export interface ObjectVq9C5HF8 {
    [key: string]: any;
}
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
    amount: StringY2SYXWiA;
    effective_amount_received: StringYVXxb2TR;
    context: ObjectVq9C5HF8;
    succeed: BooleanYDqyb5Vp;
    fee: NumberV8R93Gu7;
    block_id: StringUyVBK2CK;
}
export type UnorderedSetOfTransferKPrtCcuK = Transfer[];
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
export interface Datastore {
    [key: string]: any;
}
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
    ExecuteSC?: ExecuteSC;
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
export interface Staker {
    [key: string]: any;
}
/**
 *
 * Used to compute finality threshold
 *
 */
export type Number2A9FvvYh = number;
/**
 *
 * (Only in testnets)
Time in milliseconds when the blockclique started.
 *
 */
export type OneOfNullQu0Arl1FNumberHo1ClIqD73O8PHnh = NullQu0Arl1F | NumberHo1ClIqD;
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
    end_timestamp?: OneOfNullQu0Arl1FNumberHo1ClIqD73O8PHnh;
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
export interface ConnectedNodes {
    [key: string]: any;
}
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
 * Minimal fees to include operation in a block
 *
 */
export type String3RwRd0Pa = string;
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
export interface BlockParent {
    [key: string]: any;
}
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
export type UnorderedSetOfOperationInfoIG5UPgpG = OperationInfo[];
/**
 *
 * filled block
 *
 */
export interface FilledBlock {
    header: WrappedHeader;
    operations: UnorderedSetOfOperationInfoIG5UPgpG;
}
export interface FilledBlockInfoContent {
    is_final: BooleanZxUVUy6M;
    is_stale: Boolean4XbLtRCK;
    is_in_blockclique: BooleanHjqkwJfo;
    block: FilledBlock;
}
export type UnorderedSetOfReadOnlyBytecodeExecutionK4Ht8Zdn = ReadOnlyBytecodeExecution[];
export type UnorderedSetOfReadOnlyCall0N8FWao7 = ReadOnlyCall[];
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
export type StringUJarsTOs = string;
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
export type UnorderedSetOfExecuteReadOnlyResponselLDHsO24 = ExecuteReadOnlyResponse[];
export type UnorderedSetOfAddressInfoCm3Tm6FQ = AddressInfo[];
export type UnorderedSetOfUnorderedSetOfNumberHo1ClIqDAokMKuEfbuExLS5G = UnorderedSetOfNumberHo1ClIqDAokMKuEf[];
export type UnorderedSetOfBlockInfoYE0DVFoI = BlockInfo[];
export type UnorderedSetOfCliqueeS9LyMHx = Clique[];
export type UnorderedSetOfDatastoreEntryOutputgFkmXHTz = DatastoreEntryOutput[];
export type UnorderedSetOfUnorderedSetOfTransferKPrtCcuKlkKPLj8D = UnorderedSetOfTransferKPrtCcuK[];
export type UnorderedSetOfEndorsementInfoeYLhCU05 = EndorsementInfo[];
export type UnorderedSetOfGraphIntervalnrFPkOrt = GraphInterval[];
export type UnorderedSetOfOperationInfohzGVbuvX = OperationInfo[];
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
    last_slot?: Slot;
    network_stats: NetworkStats;
    next_slot: Slot;
    node_id: StringOFgZzVe7;
    node_ip?: OneOfNullQu0Arl1FStringDoaGddGANsst9HIR;
    pool_stats: PoolStats;
    version: Version;
    execution_stats: ExecutionStats;
    chain_id: NumberBte4OVdF;
    minimal_fees?: String3RwRd0Pa;
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
export type AnyOfUnorderedSetOfReadOnlyBytecodeExecutionK4Ht8ZdnUnorderedSetOfReadOnlyCall0N8FWao7UnorderedSetOfAddressjJsnATCOUnorderedSetOfAddressFilteraFrapw7XUnorderedSetOfBlockIdZXK9XY8ASlotUnorderedSetOfDatastoreEntryInputBdlngHsZUnorderedSetOfSlotn0BdrHhhUnorderedSetOfStringDoaGddGADvj0XlFaEventFilterObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75FqUnorderedSetOfStringDoaGddGADvj0XlFaPaginationUnorderedSetOfPrivateKeyG69QLiLPUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringDoaGddGADvj0XlFaUnorderedSetOfStringDoaGddGADvj0XlFaUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfAddressjJsnATCOStringUJarsTOsUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringBBdNk2Kup3WUWKiMUnorderedSetOfStringOGpKXaCP4RgV7KAwUnorderedSetOfOperationInput9XcIbRG1ApiRequestInteger2AHOqbcQInteger2AHOqbcQInteger2AHOqbcQInteger2AHOqbcQUnorderedSetOfExecuteReadOnlyResponselLDHsO24UnorderedSetOfExecuteReadOnlyResponselLDHsO24UnorderedSetOfAddressInfoCm3Tm6FQUnorderedSetOfUnorderedSetOfNumberHo1ClIqDAokMKuEfbuExLS5GUnorderedSetOfBlockInfoYE0DVFoIBlockUnorderedSetOfCliqueeS9LyMHxUnorderedSetOfDatastoreEntryOutputgFkmXHTzUnorderedSetOfUnorderedSetOfTransferKPrtCcuKlkKPLj8DUnorderedSetOfEndorsementInfoeYLhCU05UnorderedSetOfSCOutputEventOYFZHNQ5UnorderedSetOfGraphIntervalnrFPkOrtUnorderedSetOfOperationInfohzGVbuvXUnorderedSetOfStakerX7P278VSNodeStatusAlwaysFalseUnorderedSetOfAddressjJsnATCOAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseUnorderedSetOfIpAddressWpGgzO6MUnorderedSetOfIpAddressWpGgzO6MAlwaysFalseUnorderedSetOfIpAddressWpGgzO6MAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalsePubkeySigAlwaysFalseAlwaysFalseAlwaysFalseAlwaysFalseUnorderedSetOfOperationId5TxbV4NZPagedVecStakerUnorderedSetOfBlockParentxrssVm84VersionBlockInfoWrappedHeaderFilledBlockInfoOperationBooleanVyG3AEThBooleanVyG3AEThBooleanVyG3AEThBooleanVyG3AETh = UnorderedSetOfReadOnlyBytecodeExecutionK4Ht8Zdn | UnorderedSetOfReadOnlyCall0N8FWao7 | UnorderedSetOfAddressjJsnATCO | UnorderedSetOfAddressFilteraFrapw7X | UnorderedSetOfBlockIdZXK9XY8A | Slot | UnorderedSetOfDatastoreEntryInputBdlngHsZ | UnorderedSetOfSlotn0BdrHhh | UnorderedSetOfStringDoaGddGADvj0XlFa | EventFilter | ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq | Pagination | UnorderedSetOfPrivateKeyG69QLiLP | UnorderedSetOfStringBBdNk2Kup3WUWKiM | StringUJarsTOs | UnorderedSetOfStringOGpKXaCP4RgV7KAw | UnorderedSetOfOperationInput9XcIbRG1 | ApiRequest | Integer2AHOqbcQ | UnorderedSetOfExecuteReadOnlyResponselLDHsO24 | UnorderedSetOfAddressInfoCm3Tm6FQ | UnorderedSetOfUnorderedSetOfNumberHo1ClIqDAokMKuEfbuExLS5G | UnorderedSetOfBlockInfoYE0DVFoI | Block | UnorderedSetOfCliqueeS9LyMHx | UnorderedSetOfDatastoreEntryOutputgFkmXHTz | UnorderedSetOfUnorderedSetOfTransferKPrtCcuKlkKPLj8D | UnorderedSetOfEndorsementInfoeYLhCU05 | UnorderedSetOfSCOutputEventOYFZHNQ5 | UnorderedSetOfGraphIntervalnrFPkOrt | UnorderedSetOfOperationInfohzGVbuvX | UnorderedSetOfStakerX7P278VS | NodeStatus | AlwaysFalse | UnorderedSetOfIpAddressWpGgzO6M | PubkeySig | UnorderedSetOfOperationId5TxbV4NZ | PagedVecStaker | UnorderedSetOfBlockParentxrssVm84 | Version | BlockInfo | WrappedHeader | FilledBlockInfo | Operation | BooleanVyG3AETh;
export type ExecuteReadOnlyBytecode = (ReadOnlyBytecodeExecution: UnorderedSetOfReadOnlyBytecodeExecutionK4Ht8Zdn) => Promise<UnorderedSetOfExecuteReadOnlyResponselLDHsO24>;
export type ExecuteReadOnlyCall = (ReadOnlyCall: UnorderedSetOfReadOnlyCall0N8FWao7) => Promise<UnorderedSetOfExecuteReadOnlyResponselLDHsO24>;
export type GetAddresses = (address: UnorderedSetOfAddressjJsnATCO) => Promise<UnorderedSetOfAddressInfoCm3Tm6FQ>;
export type GetAddressesBytecode = (addressFilter: UnorderedSetOfAddressFilteraFrapw7X) => Promise<UnorderedSetOfUnorderedSetOfNumberHo1ClIqDAokMKuEfbuExLS5G>;
export type GetBlocks = (blockId: UnorderedSetOfBlockIdZXK9XY8A) => Promise<UnorderedSetOfBlockInfoYE0DVFoI>;
export type GetBlockcliqueBlockBySlot = (slot: Slot) => Promise<Block>;
export type GetCliques = () => Promise<UnorderedSetOfCliqueeS9LyMHx>;
export type GetDatastoreEntries = (DatastoreEntryInputs: UnorderedSetOfDatastoreEntryInputBdlngHsZ) => Promise<UnorderedSetOfDatastoreEntryOutputgFkmXHTz>;
export type GetSlotsTransfers = (slots: UnorderedSetOfSlotn0BdrHhh) => Promise<UnorderedSetOfUnorderedSetOfTransferKPrtCcuKlkKPLj8D>;
export type GetEndorsements = (endorsementId: UnorderedSetOfStringDoaGddGADvj0XlFa) => Promise<UnorderedSetOfEndorsementInfoeYLhCU05>;
export type GetFilteredScOutputEvent = (EventFilter: EventFilter) => Promise<UnorderedSetOfSCOutputEventOYFZHNQ5>;
export type GetGraphInterval = (TimeInterval: ObjectOfNumberHo1ClIqDNumberHo1ClIqDTmeT75Fq) => Promise<UnorderedSetOfGraphIntervalnrFPkOrt>;
export type GetOperations = (operationId: UnorderedSetOfStringDoaGddGADvj0XlFa) => Promise<UnorderedSetOfOperationInfohzGVbuvX>;
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
export interface Options {
    transport: {
        type: "websocket" | "http" | "https" | "postmessagewindow" | "postmessageiframe";
        host: string;
        port: number;
        path?: string;
        protocol?: string;
    };
}
export declare class MassaOpenRPCSpecification {
    rpc: Client;
    static openrpcDocument: OpenRPC;
    transport: HTTPTransport | WebSocketTransport | PostMessageWindowTransport | PostMessageIframeTransport;
    private validator;
    private timeout;
    constructor(options: Options);
    /**
     * Adds a JSONRPC notification handler to handle receiving notifications.
     * @example
     * myClient.onNotification((data)=>console.log(data));
     */
    onNotification(callback: (data: any) => void): void;
    /**
     * Adds an optional JSONRPCError handler to handle receiving errors that cannot be resolved to a specific request
     * @example
     * myClient.onError((err: JSONRPCError)=>console.log(err.message));
     */
    onError(callback: (data: JSONRPCError) => void): void;
    /**
     * Sets a default timeout in ms for all requests excluding notifications.
     * @example
     * // 20s timeout
     * myClient.setDefaultTimeout(20000);
     * // Removes timeout from request
     * myClient.setDefaultTimeout(undefined);
     */
    setDefaultTimeout(ms?: number): void;
    /**
     * Initiates [[MassaOpenRPCSpecification.startBatch]] in order to build a batch call.
     *
     * Subsequent calls to [[MassaOpenRPCSpecification.request]] will be added to the batch.
     * Once [[MassaOpenRPCSpecification.stopBatch]] is called, the promises for the [[MassaOpenRPCSpecification.request]]
     * will then be resolved.  If there is already a batch in progress this method is a noop.
     *
     * @example
     * myClient.startBatch();
     * myClient.foo().then(() => console.log("foobar"))
     * myClient.bar().then(() => console.log("foobarbaz"))
     * myClient.stopBatch();
     */
    startBatch(): void;
    /**
     * Initiates [[Client.stopBatch]] in order to finalize and send the batch to the underlying transport.
     *
     * stopBatch will send the [[MassaOpenRPCSpecification]] calls made since the last [[MassaOpenRPCSpecification.startBatch]] call. For
     * that reason, [[MassaOpenRPCSpecification.startBatch]] MUST be called before [[MassaOpenRPCSpecification.stopBatch]].
     *
     * @example
     * myClient.startBatch();
     * myClient.foo().then(() => console.log("foobar"))
     * myClient.bar().then(() => console.log("foobarbaz"))
     * myClient.stopBatch();
     */
    stopBatch(): void;
    private request;
    /**
     * Execute a smart contract in a read only context
     */
    execute_read_only_bytecode: ExecuteReadOnlyBytecode;
    /**
     * Call a function of a contract in a read only context
     */
    execute_read_only_call: ExecuteReadOnlyCall;
    /**
     * To check when your address is selected to stake.
     */
    get_addresses: GetAddresses;
    /**
     * Returns the bytecode of the given addresses.
     */
    get_addresses_bytecode: GetAddressesBytecode;
    /**
     * Get blocks
     */
    get_blocks: GetBlocks;
    /**
     * Get a block in the blockclique
     */
    get_blockclique_block_by_slot: GetBlockcliqueBlockBySlot;
    /**
     * Get cliques
     */
    get_cliques: GetCliques;
    /**
     * Get a data entry both at the latest final and active executed slots for the given addresses.
     */
    get_datastore_entries: GetDatastoreEntries;
    /**
     * Get transfers for specified slots
     */
    get_slots_transfers: GetSlotsTransfers;
    /**
     * Get endorsements
     */
    get_endorsements: GetEndorsements;
    /**
     * Returns events optionally filtered
     */
    get_filtered_sc_output_event: GetFilteredScOutputEvent;
    /**
     * Get graph interval
     */
    get_graph_interval: GetGraphInterval;
    /**
     * Get operations
     */
    get_operations: GetOperations;
    /**
     * Get stakers
     */
    get_stakers: GetStakers;
    /**
     * Summary of the current state
     */
    get_status: GetStatus;
    /**
     * Add a vec of new secret(private) keys for the node to use to stake
     */
    add_staking_secret_keys: AddStakingSecretKeys;
    /**
     * Return hashset of staking addresses
     */
    get_staking_addresses: GetStakingAddresses;
    /**
     * Add to bootstrap blacklist given IP addresses
     */
    node_add_to_bootstrap_blacklist: NodeAddToBootstrapBlacklist;
    /**
     * Add to bootstrap whitelist given IP addresses
     */
    node_add_to_bootstrap_whitelist: NodeAddToBootstrapWhitelist;
    /**
     * Add to peers whitelist given IP addresses
     */
    node_add_to_peers_whitelist: NodeAddToPeersWhitelist;
    /**
     * Ban given ids
     */
    node_ban_by_id: NodeBanById;
    /**
     * Ban given IP addresses
     */
    node_ban_by_ip: NodeBanByIp;
    /**
     * Returns bootstrap blacklist IP addresses
     */
    node_bootstrap_blacklist: NodeBootstrapBlacklist;
    /**
     * Returns bootstrap whitelist IP addresses
     */
    node_bootstrap_whitelist: NodeBootstrapWhitelist;
    /**
     * Allow everyone to bootstrap from the node
     */
    node_bootstrap_whitelist_allow_all: NodeBootstrapWhitelistAllowAll;
    /**
     * Returns peers whitelist IP addresses
     */
    node_peers_whitelist: NodePeersWhitelist;
    /**
     * Remove from bootstrap blacklist given IP addresses
     */
    node_remove_from_bootstrap_blacklist: NodeRemoveFromBootstrapBlacklist;
    /**
     * Remove from bootstrap whitelist given IP addresses
     */
    node_remove_from_bootstrap_whitelist: NodeRemoveFromBootstrapWhitelist;
    /**
     * Remove from peers whitelist given IP addresses
     */
    node_remove_from_peers_whitelist: NodeRemoveFromPeersWhitelist;
    /**
     * Remove from whitelist given IP addresses
     */
    node_remove_from_whitelist: NodeRemoveFromWhitelist;
    /**
     * Remove a vec of addresses used to stake
     */
    remove_staking_addresses: RemoveStakingAddresses;
    /**
     * Sign message with node’s key
     */
    node_sign_message: NodeSignMessage;
    /**
     * Gracefully stop the node
     */
    stop_node: StopNode;
    /**
     * Unban given ids
     */
    node_unban_by_id: NodeUnbanById;
    /**
     * Unban given IP addresses
     */
    node_unban_by_ip: NodeUnbanByIp;
    /**
     * Whitelist given IP addresses
     */
    node_whitelist: NodeWhitelist;
    /**
     * Adds operations to pool
     */
    send_operations: SendOperations;
    /**
     * Get largest stakers
     */
    get_largest_stakers: GetLargestStakers;
    /**
     * Get next block best parents
     */
    get_next_block_best_parents: GetNextBlockBestParents;
    /**
     * Get Massa node version
     */
    get_version: GetVersion;
    /**
     * New produced blocks
     */
    subscribe_new_blocks: SubscribeNewBlocks;
    /**
     * New produced blocks headers
     */
    subscribe_new_blocks_headers: SubscribeNewBlocksHeaders;
    /**
     * New produced blocks with operations content
     */
    subscribe_new_filled_blocks: SubscribeNewFilledBlocks;
    /**
     * Subscribe to new operations
     */
    subscribe_new_operations: SubscribeNewOperations;
    /**
     * Unsubscribe from new produced blocks
     */
    unsubscribe_new_blocks: UnsubscribeNewBlocks;
    /**
     * Unsubscribe from new produced blocks headers
     */
    unsubscribe_new_blocks_headers: UnsubscribeNewBlocksHeaders;
    /**
     * Unsubscribe from new produced filled blocks
     */
    unsubscribe_new_filled_blocks: UnsubscribeNewFilledBlocks;
    /**
     * Unsubscribe from new received operations
     */
    unsubscribe_new_operations: UnsubscribeNewOperations;
}
export default MassaOpenRPCSpecification;
