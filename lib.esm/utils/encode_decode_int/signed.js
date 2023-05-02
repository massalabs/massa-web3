import * as unsigned from './unsigned.js';
const oneBI = BigInt(1);
const twoBI = BigInt(2);
export function encodingLength(v) {
    return unsigned.encodingLength(v >= 0 ? v * twoBI : v * -twoBI - oneBI);
}
export function encode(v, buffer, byteOffset) {
    v = v >= 0 ? v * twoBI : v * -twoBI - oneBI;
    return unsigned.encode(v, buffer, byteOffset);
}
export function decode(data, offset = 0) {
    const v = unsigned.decode(data, offset);
    return v & oneBI ? (v + oneBI) / -twoBI : v / twoBI;
}
//# sourceMappingURL=signed.js.map