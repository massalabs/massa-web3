export declare enum PublicApiUrl {
    Mainnet = "https://mainnet.massa.net/api/v2",
    Testnet = "https://testnet.massa.net/api/v2",
    Buildnet = "https://buildnet.massa.net/api/v2"
}
export declare enum NetworkName {
    Mainnet = "mainnet",
    Testnet = "testnet",
    Buildnet = "buildnet"
}
export declare const CHAIN_ID: {
    Mainnet: bigint;
    Testnet: bigint;
    Buildnet: bigint;
};
export type Network = {
    name: NetworkName | string;
    chainId: bigint;
    url?: string;
    minimalFee: bigint;
};
