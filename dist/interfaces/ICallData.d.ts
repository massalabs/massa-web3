export interface ICallData {
    fee: number;
    maxGas: number;
    gasPrice: number;
    parallelCoins: number;
    sequentialCoins: number;
    targetAddress: string;
    functionName: string;
    parameter: string;
}
