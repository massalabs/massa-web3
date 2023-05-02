import { Buffer } from 'buffer';
export declare const bs58EncodeCheck: (data: Buffer, prefix?: string, encoding?: string) => string;
export declare const bs58DecodeCheck: (string: string, encoding?: string) => {
    prefix: Buffer;
    data: Buffer;
};
