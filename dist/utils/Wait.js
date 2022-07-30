"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseWithTimeout = exports.wait = void 0;
const tslib_1 = require("tslib");
const Timeout_1 = require("./Timeout");
const wait = (timeMilli) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const timeout = new Timeout_1.Timeout(timeMilli, () => {
            timeout.clear();
            return resolve();
        });
    });
});
exports.wait = wait;
const promiseWithTimeout = (timeLimit, task, failureValue) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    let timeout;
    const timeoutPromise = new Promise((resolve, reject) => {
        timeout = setTimeout(() => {
            resolve(failureValue);
        }, timeLimit);
    });
    const response = yield Promise.race([task, timeoutPromise]);
    if (timeout) {
        clearTimeout(timeout);
    }
    return response;
});
exports.promiseWithTimeout = promiseWithTimeout;
//# sourceMappingURL=Wait.js.map