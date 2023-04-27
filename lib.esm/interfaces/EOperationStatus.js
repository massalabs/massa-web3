/**
 * Enum for representing operation state transitions
 */
export var EOperationStatus;
(function (EOperationStatus) {
    EOperationStatus[EOperationStatus["INCLUDED_PENDING"] = 0] = "INCLUDED_PENDING";
    EOperationStatus[EOperationStatus["AWAITING_INCLUSION"] = 1] = "AWAITING_INCLUSION";
    EOperationStatus[EOperationStatus["FINAL"] = 2] = "FINAL";
    EOperationStatus[EOperationStatus["INCONSISTENT"] = 3] = "INCONSISTENT";
    EOperationStatus[EOperationStatus["NOT_FOUND"] = 4] = "NOT_FOUND";
})(EOperationStatus || (EOperationStatus = {}));
//# sourceMappingURL=EOperationStatus.js.map