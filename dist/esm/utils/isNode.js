export function isNode() {
    // inspired from secure-random.js
    // we check for process.pid to prevent browserify from tricking us
    return (typeof process !== 'undefined' &&
        typeof process.pid === 'number' &&
        typeof process.versions?.node === 'string');
}
//# sourceMappingURL=isNode.js.map