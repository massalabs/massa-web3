import { Address } from '../basicElements';
import { Mas } from '../basicElements/mas';
import { U64 } from '../basicElements/serializers/number/u64';
/**
 * Operation status.
 *
 * @remarks
 * This enumeration captures the lifecycle stages of a blockchain operation, from initiation to finalization.
 *
 * @privateRemarks
 * Keeps the order of the stages in the lifecycle as it is used by the wait method.
 */
export declare enum OperationStatus {
    /**
     * The operation has not been found within the blockchain, either because it is not yet processed or does not exist.
     */
    NotFound = 0,
    /**
     * The operation has been recognized and is awaiting inclusion in the blockchain ledger.
     */
    PendingInclusion = 1,
    /**
     * The operation has executed successfully; however, the block containing it has not yet been confirmed as final.
     */
    SpeculativeSuccess = 2,
    /**
     * The operation has failed; however, the block containing the failure has not yet been confirmed as final.
     */
    SpeculativeError = 3,
    /**
     * The operation has executed successfully and the block containing it has been confirmed as final.
     */
    Success = 4,
    /**
     * The operation has failed and the block containing the failure has been confirmed as final.
     */
    Error = 5
}
/**
 * Operation types.
 *
 * @remarks
 * The corresponding values are fixed by the node.
 */
export declare enum OperationType {
    Transaction = 0,
    RollBuy = 1,
    RollSell = 2,
    ExecuteSmartContractBytecode = 3,
    CallSmartContractFunction = 4
}
/**
 * Operation options.
 *
 * @remarks
 * Period to live is the number of periods the operation is valid for.
 * This value must be positive and if it's too big, the node will (silently?) reject the operation.
 *
 * If no fee is provided, minimal fee of connected node is used.
 * If no periodToLive is provided, the DefaultPeriodToLive is used.
 */
export type OperationOptions = {
    fee?: U64;
    periodToLive?: number;
};
export type BaseOperation = {
    fee: U64;
    expirePeriod: number;
    type: OperationType;
};
export type RollOperation = BaseOperation & {
    type: OperationType.RollBuy | OperationType.RollSell;
    amount: U64;
};
export type TransferOperation = BaseOperation & {
    type: OperationType.Transaction;
    amount: U64;
    recipientAddress: Address;
};
export type BaseSmartContractOperation = BaseOperation & {
    maxGas: U64;
    coins: U64;
};
export type CallOperation = BaseSmartContractOperation & {
    type: OperationType.CallSmartContractFunction;
    address: string;
    func: string;
    parameter: Uint8Array;
};
export type ReadOnlyParams = {
    parameter: Uint8Array;
    coins?: Mas;
    fee?: Mas;
    maxGas?: U64;
    func: string;
    target: string;
    caller: string;
};
export type ExecuteOperation = BaseOperation & {
    maxGas: U64;
    maxCoins: U64;
    type: OperationType.ExecuteSmartContractBytecode;
    contractDataBinary: Uint8Array;
    datastore?: Map<Uint8Array, Uint8Array>;
};
export type OperationDetails = RollOperation | TransferOperation | CallOperation | ExecuteOperation;
