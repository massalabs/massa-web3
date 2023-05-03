/* Browser Crypto Shims */
import { hmac } from "@noble/hashes/hmac";
import { pbkdf2 } from "@noble/hashes/pbkdf2";
import { sha256 } from "@noble/hashes/sha256";
import { sha512 } from "@noble/hashes/sha512";
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
export function createHash(algo) {
    switch (algo) {
        case "sha256": return sha256.create();
        case "sha512": return sha512.create();
        default: throw new Error("Unknown algorithm");
    }
}
export function createHmac(_algo, key) {
    const algo = ({ sha256, sha512 }[_algo]);
    return hmac.create(algo, key);
}
export function pbkdf2Sync(password, salt, iterations, keylen, _algo) {
    const algo = ({ sha256, sha512 }[_algo]);
    return pbkdf2(algo, password, salt, { c: iterations, dkLen: keylen });
}
export function randomBytes(length) {
    const result = new Uint8Array(length);
    crypto.getRandomValues(result);
    return result;
}
//# sourceMappingURL=crypto.js.map