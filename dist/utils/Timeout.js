"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = exports.Timeout = void 0;
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
//# sourceMappingURL=Timeout.js.map