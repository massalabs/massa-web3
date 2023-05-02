"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bs58DecodeCheck = exports.bs58EncodeCheck = void 0;
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const bs58_1 = tslib_1.__importDefault(require("bs58"));
const buffer_1 = require("buffer");
const bs58EncodeCheck = (data, prefix = '00', encoding = 'hex') => {
    if (typeof data === 'string') {
        data = buffer_1.Buffer.from(data, encoding);
    }
    if (!buffer_1.Buffer.isBuffer(data)) {
        throw new TypeError('"data" argument must be a Buffer');
    }
    let _prefix = null;
    if (!buffer_1.Buffer.isBuffer(prefix)) {
        _prefix = buffer_1.Buffer.from(prefix, encoding);
    }
    const hash = crypto_1.default.createHash('sha256').update(buffer_1.Buffer.concat([_prefix, data])).digest();
    const checksum = crypto_1.default.createHash('sha256').update(hash).digest().slice(0, 4);
    const hashWithChecksum = buffer_1.Buffer.concat([_prefix, data, checksum]);
    return bs58_1.default.encode(hashWithChecksum);
};
exports.bs58EncodeCheck = bs58EncodeCheck;
const bs58DecodeCheck = (string, encoding) => {
    const buffer = buffer_1.Buffer.from(bs58_1.default.decode(string));
    let prefix = buffer.slice(0, 1);
    let data = buffer.slice(1, -4);
    const checksum = buffer.slice(-4);
    const hash = crypto_1.default.createHash('sha256').update(buffer_1.Buffer.concat([prefix, data])).digest();
    const calculatedChecksum = crypto_1.default.createHash('sha256').update(hash).digest().slice(0, 4);
    if (!checksum.equals(calculatedChecksum)) {
        throw new Error('Invalid checksum');
    }
    return {
        prefix,
        data
    };
};
exports.bs58DecodeCheck = bs58DecodeCheck;
//# sourceMappingURL=bs58.js.map