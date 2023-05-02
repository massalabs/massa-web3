import { wait } from './time';
const MAX_NUMBER_RETRIALS = 5;
export const trySafeExecute = async (func, args, retryTimes = MAX_NUMBER_RETRIALS) => {
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
            await wait(200 * (failureCounter + 1));
            if (failureCounter === retryTimes) {
                throw ex;
            }
        }
    }
    return res;
};
//# sourceMappingURL=retryExecuteFunction.js.map