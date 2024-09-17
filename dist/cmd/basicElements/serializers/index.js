"use strict";
/**
 * This module provides encoding and decoding functions for various data types.
 * It includes functions for strings, numeric data (integers and floating-point numbers),
 * booleans, and arrays containing native types.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.argsListToBytes = void 0;
const tslib_1 = require("tslib");
const args_1 = require("../args");
/**
 * This module exports encoding and decoding functions for strings.
 */
tslib_1.__exportStar(require("./strings"), exports);
/**
 * This module exports functions needed to process numeric data, such as integers and
 * floating point numbers and their binary representations in Uint8Array.
 * The functions handle signed and unsigned native integers.
 */
tslib_1.__exportStar(require("./numbers"), exports);
/**
 * This module exports encoding and decoding functions for booleans.
 */
tslib_1.__exportStar(require("./bool"), exports);
/**
 * This module exports serialization and deserialization functions for arrays containing native types.
 */
tslib_1.__exportStar(require("./arrays"), exports);
function argsListToBytes(argsList) {
    return argsList.reduce((acc, curr) => args_1.Args.concatArrays(acc, new TextEncoder().encode(curr.value)), 
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    new Uint8Array(0));
}
exports.argsListToBytes = argsListToBytes;
tslib_1.__exportStar(require("./number/index"), exports);
tslib_1.__exportStar(require("./interface"), exports);
//# sourceMappingURL=index.js.map