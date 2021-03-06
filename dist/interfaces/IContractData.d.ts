export interface IContractData {
    fee: number;
    maxGas: number;
    gasPrice: number;
    coins: number;
    contractDataBase64?: string;
    contractDataText?: string;
    contractDataBinary?: Uint8Array;
    address?: string;
}
