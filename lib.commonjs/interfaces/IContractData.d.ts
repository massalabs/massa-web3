export interface IContractData {
    fee: bigint;
    maxGas: bigint;
    contractDataText?: string;
    contractDataBinary?: Uint8Array;
    address?: string;
    datastore?: Map<Uint8Array, Uint8Array>;
}
