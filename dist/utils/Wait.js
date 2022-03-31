"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
const tslib_1 = require("tslib");
const Timeout_1 = require("./Timeout");
const wait = (timeMilli) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const timeout = new Timeout_1.Timeout(timeMilli, () => {
            timeout.clear();
            resolve();
        });
    });
});
exports.wait = wait;
//# sourceMappingURL=Wait.js.map