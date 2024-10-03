import { PublicAPI } from './publicAPI';
export declare class JsonRPCClient extends PublicAPI {
    constructor(url: string);
    static buildnet(): JsonRPCClient;
    static testnet(): JsonRPCClient;
    static mainnet(): JsonRPCClient;
}
