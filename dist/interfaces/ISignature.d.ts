export interface ISignature {
    r: Uint8Array;
    s: Uint8Array;
    v: number;
    hex: string;
    base58Encoded: string;
}
