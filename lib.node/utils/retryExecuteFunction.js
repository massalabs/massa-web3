"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trySafeExecute = void 0;
const time_1 = require("./time");
const MAX_NUMBER_RETRIALS = 5;
const trySafeExecute = async (func, args, retryTimes = MAX_NUMBER_RETRIALS) => {
    args = args || [];
    if (!func)
        throw new Error(`Function execution init conditions are erroneous: ${func}`);
    let failureCounter = 0;
    let res = null;
    while (true) {
        try {
            res = await func(...args);
            break;
        }
        catch (ex) {
            const msg = `Failed to execute function ${func.name}. Retrying for ${++failureCounter}th time in 1s.`;
            console.error(msg);
            await (0, time_1.wait)(200 * (failureCounter + 1));
            if (failureCounter === retryTimes) {
                throw ex;
            }
        }
    }
    return res;
};
exports.trySafeExecute = trySafeExecute;
//# sourceMappingURL=retryExecuteFunction.js.map