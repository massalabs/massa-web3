export interface IReadData {
    fee: number;
    maxGas: number;
    simulatedGasPrice: number;
    targetAddress: string;
    targetFunction: string;
    parameter: string;
    callerAddress?: string;
}
