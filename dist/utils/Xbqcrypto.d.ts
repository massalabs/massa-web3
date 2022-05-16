/// <reference types="node" />
export declare function hashSha256(data: any): Uint8Array;
export declare function base58checkEncode(data: Buffer | Uint8Array): string;
export declare function base58checkDecode(data: string): Buffer;
export declare function varintEncode(data: number): [number];
export declare function varintDecode(data: [number]): number;
export declare function typedArrayToBuffer(array: Uint8Array): ArrayBuffer;
