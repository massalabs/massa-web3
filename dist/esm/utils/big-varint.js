/* eslint-disable @typescript-eslint/no-magic-numbers */
// This code was taken from the lib big-varint. https://github.com/joeltg/big-varint/blob/65346e5688245b20f05e5ce2dd8c784eb3ae3e15/src/unsigned.ts#L1C1-L58C2
const LIMIT = 0x7fn;
export function encodingLength(value) {
    let i = 0;
    for (; value >= 0x80n; i++) {
        value >>= 7n;
    }
    return i + 1;
}
export function encode(i, buffer, byteOffset) {
    if (i < 0n) {
        throw new RangeError('value must be unsigned');
    }
    const byteLength = encodingLength(i);
    buffer = buffer || new ArrayBuffer(byteLength);
    byteOffset = byteOffset || 0;
    if (buffer.byteLength < byteOffset + byteLength) {
        throw new RangeError('the buffer is too small to encode the number at the offset');
    }
    const array = new Uint8Array(buffer, byteOffset);
    let offset = 0;
    while (LIMIT < i) {
        array[offset++] = Number(i & LIMIT) | 0x80;
        i >>= 7n;
    }
    array[offset] = Number(i);
    return array;
}
export function decode(data, offset = 0) {
    let i = 0n;
    let n = 0;
    let b;
    do {
        b = data[offset + n];
        if (b === undefined) {
            throw new RangeError('offset out of range');
        }
        i += BigInt(b & 0x7f) << BigInt(n * 7);
        n++;
    } while (0x80 <= b);
    return i;
}
//# sourceMappingURL=big-varint.js.map