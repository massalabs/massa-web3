import { Buffer } from 'buffer';
import bs58 from 'bs58';
import { createHash } from "./crypto";
export const bs58EncodeCheck = (data, prefix = '00', encoding = 'hex') => {
    if (typeof data === 'string') {
        data = Buffer.from(data, encoding);
    }
    if (!Buffer.isBuffer(data)) {
        throw new TypeError('"data" argument must be a Buffer');
    }
    let _prefix = null;
    if (!Buffer.isBuffer(prefix)) {
        _prefix = Buffer.from(prefix, encoding);
    }
    const hash = createHash('sha256').update(Buffer.concat([_prefix, data])).digest();
    const checksum = createHash('sha256').update(hash).digest().slice(0, 4);
    const hashWithChecksum = Buffer.concat([_prefix, data, checksum]);
    return bs58.encode(hashWithChecksum);
};
export const bs58DecodeCheck = (string, encoding) => {
    const buffer = Buffer.from(bs58.decode(string));
    let prefix = buffer.slice(0, 1);
    let data = buffer.slice(1, -4);
    const checksum = buffer.slice(-4);
    const hash = createHash('sha256').update(Buffer.concat([prefix, data])).digest();
    const calculatedChecksum = createHash('sha256').update(hash).digest().slice(0, 4);
    //if (!checksum.equals(calculatedChecksum)) {
    //  throw new Error('Invalid checksum');
    //}
    return {
        prefix,
        data
    };
};
//# sourceMappingURL=bs58.js.map