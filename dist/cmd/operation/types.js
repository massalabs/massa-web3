"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationType = exports.OperationStatus = void 0;
/**
 * Operation status.
 *
 * @remarks
 * This enumeration captures the lifecycle stages of a blockchain operation, from initiation to finalization.
 *
 * @privateRemarks
 * Keeps the order of the stages in the lifecycle as it is used by the wait method.
 */
var OperationStatus;
(function (OperationStatus) {
    /**
     * The operation has not been found within the blockchain, either because it is not yet processed or does not exist.
     */
    OperationStatus[OperationStatus["NotFound"] = 0] = "NotFound";
    /**
     * The operation has been recognized and is awaiting inclusion in the blockchain ledger.
     */
    OperationStatus[OperationStatus["PendingInclusion"] = 1] = "PendingInclusion";
    /**
     * The operation has executed successfully; however, the block containing it has not yet been confirmed as final.
     */
    OperationStatus[OperationStatus["SpeculativeSuccess"] = 2] = "SpeculativeSuccess";
    /**
     * The operation has failed; however, the block containing the failure has not yet been confirmed as final.
     */
    OperationStatus[OperationStatus["SpeculativeError"] = 3] = "SpeculativeError";
    /**
     * The operation has executed successfully and the block containing it has been confirmed as final.
     */
    OperationStatus[OperationStatus["Success"] = 4] = "Success";
    /**
     * The operation has failed and the block containing the failure has been confirmed as final.
     */
    OperationStatus[OperationStatus["Error"] = 5] = "Error";
})(OperationStatus || (exports.OperationStatus = OperationStatus = {}));
/**
 * Operation types.
 *
 * @remarks
 * The corresponding values are fixed by the node.
 */
var OperationType;
(function (OperationType) {
    OperationType[OperationType["Transaction"] = 0] = "Transaction";
    OperationType[OperationType["RollBuy"] = 1] = "RollBuy";
    OperationType[OperationType["RollSell"] = 2] = "RollSell";
    OperationType[OperationType["ExecuteSmartContractBytecode"] = 3] = "ExecuteSmartContractBytecode";
    OperationType[OperationType["CallSmartContractFunction"] = 4] = "CallSmartContractFunction";
})(OperationType || (exports.OperationType = OperationType = {}));
//# sourceMappingURL=types.js.map