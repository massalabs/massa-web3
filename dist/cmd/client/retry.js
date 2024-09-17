"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withRetry = exports.DEFAULT_RETRY_OPTS = void 0;
const DEFAULT_RETRIES = 3;
const DEFAULT_DELAY = 300;
exports.DEFAULT_RETRY_OPTS = {
    retries: DEFAULT_RETRIES,
    delay: DEFAULT_DELAY,
};
// Wrapped rpc call with retry strategy
function withRetry(fn, opt) {
    return new Promise((resolve, reject) => {
        function attempt() {
            fn()
                .then(resolve)
                .catch((error) => {
                if (opt.retries === 0) {
                    reject(error);
                }
                else {
                    opt.retries--;
                    setTimeout(attempt, opt.delay);
                }
            });
        }
        attempt();
    });
}
exports.withRetry = withRetry;
//# sourceMappingURL=retry.js.map