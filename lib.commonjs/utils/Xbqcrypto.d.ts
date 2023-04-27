/// <reference types="node" />
export declare function hashBlake3(data: Uint8Array | string): Uint8Array;
export declare function base58Encode(data: Buffer | Uint8Array): string;
export declare function base58Decode(data: string): Buffer;
export declare function varintEncode(data: number | bigint): Uint8Array;
export declare function varintDecode(data: Uint8Array): number;
