"use strict";
/* Browser Crypto Shims */
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBytes = exports.pbkdf2Sync = exports.createHmac = exports.createHash = void 0;
const hmac_1 = require("@noble/hashes/hmac");
const pbkdf2_1 = require("@noble/hashes/pbkdf2");
const sha256_1 = require("@noble/hashes/sha256");
const sha512_1 = require("@noble/hashes/sha512");
function getGlobal() {
    if (typeof self !== 'undefined') {
        return self;
    }
    if (typeof window !== 'undefined') {
        return window;
    }
    if (typeof global !== 'undefined') {
        return global;
    }
    throw new Error('unable to locate global object');
}
;
const anyGlobal = getGlobal();
const crypto = anyGlobal.crypto || anyGlobal.msCrypto;
function createHash(algo) {
    switch (algo) {
        case "sha256": return sha256_1.sha256.create();
        case "sha512": return sha512_1.sha512.create();
        default: throw new Error("Unknown algorithm");
    }
}
exports.createHash = createHash;
function createHmac(_algo, key) {
    const algo = ({ sha256: sha256_1.sha256, sha512: sha512_1.sha512 }[_algo]);
    return hmac_1.hmac.create(algo, key);
}
exports.createHmac = createHmac;
function pbkdf2Sync(password, salt, iterations, keylen, _algo) {
    const algo = ({ sha256: sha256_1.sha256, sha512: sha512_1.sha512 }[_algo]);
    return (0, pbkdf2_1.pbkdf2)(algo, password, salt, { c: iterations, dkLen: keylen });
}
exports.pbkdf2Sync = pbkdf2Sync;
function randomBytes(length) {
    const result = new Uint8Array(length);
    crypto.getRandomValues(result);
    return result;
}
exports.randomBytes = randomBytes;
//# sourceMappingURL=crypto.js.map