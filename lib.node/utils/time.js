"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTimeoutRejection = exports.wait = exports.Interval = exports.Timeout = void 0;
class Timeout {
    constructor(timeoutMil, callback) {
        this.clear = this.clear.bind(this);
        const that = this;
        this.isCleared = false;
        this.isCalled = false;
        this.timeoutHook = setTimeout(() => {
            if (!that.isCleared) {
                this.isCalled = true;
                callback();
            }
        }, timeoutMil);
    }
    clear() {
        if (!this.isCleared) {
            clearTimeout(this.timeoutHook);
            this.isCleared = true;
        }
    }
}
exports.Timeout = Timeout;
class Interval {
    constructor(timeoutMil, callback) {
        this.clear = this.clear.bind(this);
        const that = this;
        this.isCleared = false;
        this.isCalled = false;
        this.intervalHook = setInterval(() => {
            if (!that.isCleared) {
                this.isCalled = true;
                callback();
            }
        }, timeoutMil);
    }
    clear() {
        if (!this.isCleared) {
            clearInterval(this.intervalHook);
            this.isCleared = true;
        }
    }
}
exports.Interval = Interval;
const wait = async (timeMilli) => {
    return new Promise((resolve, reject) => {
        const timeout = new Timeout(timeMilli, () => {
            timeout.clear();
            return resolve();
        });
    });
};
exports.wait = wait;
async function withTimeoutRejection(promise, timeoutMs) {
    const sleep = new Promise((resolve, reject) => setTimeout(() => reject(new Error(`Timeout of ${timeoutMs} has passed and promise did not resolve`)), timeoutMs));
    return Promise.race([promise, sleep]);
}
exports.withTimeoutRejection = withTimeoutRejection;
//# sourceMappingURL=time.js.map