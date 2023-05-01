"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MassaUnits = exports.toMAS = exports.fromMAS = void 0;
const tslib_1 = require("tslib");
const bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
const MASSA_SCALING_FACTOR = 9;
/**
 * Convert any value expressed in Massa back to nanoMassa
 * @param amountInMassa any amount in Massa
 * @returns bigint representing the amount expressed in nanoMassa
 */
const fromMAS = (amountInMassa) => {
    const amount = new bignumber_js_1.default(amountInMassa.toString());
    const scaleFactor = new bignumber_js_1.default(10).pow(new bignumber_js_1.default(MASSA_SCALING_FACTOR));
    const amountScaled = amount.times(scaleFactor);
    return BigInt(amountScaled.toFixed(0));
};
exports.fromMAS = fromMAS;
/**
 * Convert any value expressed in nano Massa back to Massa
 * @param amountInNanoMassa any amount in nanoMassa
 * @returns BigNumber representing the amount expressed in Massa
 */
const toMAS = (amountInNanoMassa) => {
    const amount = new bignumber_js_1.default(amountInNanoMassa.toString());
    const scaleFactor = new bignumber_js_1.default(10).pow(new bignumber_js_1.default(MASSA_SCALING_FACTOR));
    const amountScaled = amount.dividedBy(scaleFactor);
    return new bignumber_js_1.default(amountScaled.toFixed(MASSA_SCALING_FACTOR));
};
exports.toMAS = toMAS;
exports.MassaUnits = {
    oneMassa: BigInt(10 ** 9),
    mMassa: BigInt(10 ** 6),
    uMassa: BigInt(10 ** 3),
};
//# sourceMappingURL=converters.js.map