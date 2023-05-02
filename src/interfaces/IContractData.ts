/**
 * Represents the information for a smart contract.
 * @remarks
 * This interface is used to track the smart contract information, including the
 * storage fee, maximum gas, contract data (as text or bytecode), contract address,
 * and an optional datastore for the smart contract's operational storage data.
 */
export interface IContractData {
  fee: bigint;

  maxCoins: bigint;

  maxGas: bigint;
  contractDataText?: string;
  contractDataBinary?: Uint8Array;
  address?: string;
  datastore?: Map<Uint8Array, Uint8Array>;
}
