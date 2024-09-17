export declare function integerToByte(sizeInBits: number, value: bigint, signed?: boolean): Uint8Array;
export declare function integerFromByte(sizeInBits: number, bytes: Uint8Array, signed?: boolean, index?: number): bigint;
export declare function numberToInteger(sizeInBits: number, value: number | bigint, signed?: boolean): bigint;
