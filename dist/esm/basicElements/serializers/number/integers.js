import { U8, U16, U32, U64, U128, U256 } from '..';
function mustBeValidSigned(sizeInBits, value) {
    const min = -(1n << (BigInt(sizeInBits) - 1n));
    const max = (1n << (BigInt(sizeInBits) - 1n)) - 1n;
    if (value < min || value > max) {
        throw new Error(`value ${value} is out of range for an I${sizeInBits}.`);
    }
}
function mustBeValidUnsigned(sizeInBits, value) {
    if (value < 0n) {
        throw new Error("negative value can't be serialized as unsigned integer.");
    }
    if (value >= 1n << BigInt(sizeInBits)) {
        throw new Error(`value ${value} is too large for an U${sizeInBits}.`);
    }
}
export function integerToByte(sizeInBits, value, signed = false) {
    signed
        ? mustBeValidSigned(sizeInBits, value)
        : mustBeValidUnsigned(sizeInBits, value);
    const buffer = new ArrayBuffer(sizeInBits / U8.SIZE_BIT);
    const view = new DataView(buffer);
    switch (sizeInBits) {
        case U8.SIZE_BIT:
            signed ? view.setInt8(0, Number(value)) : view.setUint8(0, Number(value));
            break;
        case U16.SIZE_BIT:
            signed
                ? view.setInt16(0, Number(value), true)
                : view.setUint16(0, Number(value), true);
            break;
        case U32.SIZE_BIT:
            signed
                ? view.setInt32(0, Number(value), true)
                : view.setUint32(0, Number(value), true);
            break;
        case U64.SIZE_BIT:
            signed
                ? view.setBigInt64(0, value, true)
                : view.setBigUint64(0, value, true);
            break;
        case U128.SIZE_BIT:
            setBigUint128(view, value);
            break;
        case U256.SIZE_BIT:
            setBigUint256(view, value);
            break;
        default:
            throw new Error(`unsupported ${signed ? 'I' : 'U'}${sizeInBits} serialization.`);
    }
    return new Uint8Array(view.buffer);
}
export function integerFromByte(sizeInBits, bytes, signed = false, index = 0) {
    if (bytes.length < index + sizeInBits / U8.SIZE_BIT) {
        throw new Error('not enough bytes to read the value.');
    }
    const view = new DataView(bytes.buffer);
    switch (sizeInBits) {
        case U8.SIZE_BIT:
            return signed ? BigInt(view.getInt8(index)) : BigInt(view.getUint8(index));
        case U16.SIZE_BIT:
            return signed
                ? BigInt(view.getInt16(index, true))
                : BigInt(view.getUint16(index, true));
        case U32.SIZE_BIT:
            return signed
                ? BigInt(view.getInt32(index, true))
                : BigInt(view.getUint32(index, true));
        case U64.SIZE_BIT:
            return signed
                ? view.getBigInt64(index, true)
                : view.getBigUint64(index, true);
        case U128.SIZE_BIT:
            return signed ? getBigInt128(view, index) : getBigUint128(view, index);
        case U256.SIZE_BIT:
            return signed ? getBigInt256(view, index) : getBigUint256(view, index);
        default:
            throw new Error(`unsupported ${signed ? 'I' : 'U'}${sizeInBits} deserialization`);
    }
}
export function numberToInteger(sizeInBits, value, signed = false) {
    if (typeof value === 'number' && !Number.isSafeInteger(value)) {
        throw new Error(`value ${value} is not a safe integer.`);
    }
    const int = BigInt(value);
    signed
        ? mustBeValidSigned(sizeInBits, int)
        : mustBeValidUnsigned(sizeInBits, int);
    return int;
}
function setBigUint128(view, value) {
    const offset = 0;
    view.setBigUint64(offset, value & U64.MAX, true);
    view.setBigUint64(offset + U64.SIZE_BYTE, value >> BigInt(U64.SIZE_BIT), true);
}
function getBigUint128(view, offset) {
    const low = view.getBigUint64(offset, true);
    offset += U64.SIZE_BYTE;
    const high = view.getBigUint64(offset, true);
    return (high << BigInt(U64.SIZE_BIT)) | low;
}
function setBigUint256(view, value) {
    let offset = 0;
    for (let i = 0; i < U256.SIZE_BYTE / U64.SIZE_BYTE; i++) {
        view.setBigUint64(offset, value & U64.MAX, true);
        offset += U64.SIZE_BYTE;
        value >>= BigInt(U64.SIZE_BIT);
    }
}
function getBigUint256(view, offset) {
    let result = 0n;
    const nbParts = U256.SIZE_BYTE / U64.SIZE_BYTE;
    for (let i = 0; i < nbParts; i++) {
        const part = view.getBigUint64(offset + i * U64.SIZE_BYTE, true);
        result = result | (part << BigInt(i * U64.SIZE_BIT));
    }
    return result;
}
function getBigInt128(view, offset) {
    return BigInt.asIntN(U128.SIZE_BIT, getBigUint128(view, offset));
}
function getBigInt256(view, offset) {
    return BigInt.asIntN(U256.SIZE_BIT, getBigUint256(view, offset));
}
//# sourceMappingURL=integers.js.map