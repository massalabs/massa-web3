export interface ICallData {
    fee: bigint;
    maxGas: bigint;
    coins: bigint;
    targetAddress: string;
    functionName: string;
    parameter: Array<number>;
}
