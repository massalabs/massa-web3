"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNode = void 0;
function isNode() {
    // inspired from secure-random.js
    // we check for process.pid to prevent browserify from tricking us
    return (typeof process !== 'undefined' &&
        typeof process.pid === 'number' &&
        typeof process.versions?.node === 'string');
}
exports.isNode = isNode;
//# sourceMappingURL=isNode.js.map