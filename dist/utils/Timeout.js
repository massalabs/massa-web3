"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interval = exports.Timeout = void 0;
const UUID_1 = require("./UUID");
const timers_1 = require("timers");
class Timeout {
    constructor(timeoutMil, callback) {
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
    getId() {
        if (!this.id)
            this.id = (0, UUID_1.generateUUID)();
        return this.id;
    }
    clear() {
        if (!this.isCleared) {
            (0, timers_1.clearTimeout)(this.timeoutHook);
            this.isCleared = true;
        }
    }
}
exports.Timeout = Timeout;
class Interval {
    constructor(timeoutMil, callback) {
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
    getId() {
        if (!this.id)
            this.id = (0, UUID_1.generateUUID)();
        return this.id;
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