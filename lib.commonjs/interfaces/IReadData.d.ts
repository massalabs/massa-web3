export interface IReadData {
    fee: bigint;
    maxGas: bigint;
    targetAddress: string;
    targetFunction: string;
    parameter: Array<number>;
    callerAddress?: string;
}
