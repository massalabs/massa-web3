"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trySafeExecute = void 0;
const tslib_1 = require("tslib");
const Wait_1 = require("./Wait");
const MAX_NUMBER_RETRIALS = 5;
const trySafeExecute = (func, args, retryTimes = MAX_NUMBER_RETRIALS) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    args = args || [];
    if (!func)
        throw new Error(`Function execution init conditions are erroneous: ${func}`);
    let failureCounter = 0;
    let res = null;
    while (true) {
        try {
            res = yield func(...args);
            break;
        }
        catch (ex) {
            const msg = `Failed to execute function ${func.name}. Retrying for ${++failureCounter}th time in 1s.`;
            console.error(msg);
            yield (0, Wait_1.wait)(200 * (failureCounter + 1));
            if (failureCounter === retryTimes) {
                throw ex;
            }
        }
    }
    return res;
});
exports.trySafeExecute = trySafeExecute;
//# sourceMappingURL=retryExecuteFunction.js.map