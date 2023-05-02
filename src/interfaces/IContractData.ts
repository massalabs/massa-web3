/**
 * Represents the information for a smart contract.
 * @remarks
 * This interface is used to track the smart contract information, including the
 * storage fee, maximum gas, contract data (as text or bytecode), contract address,
 * and an optional datastore for the smart contract's operational storage data.
 *
 * @see fee of type `bigint` represents the storage fee for the smart contract.
 * @see maxGas of type `bigint` represents the maximum gas that can be consumed by the smart contract.
 * @see contractDataText of type `string | undefined` represents the contract's data as text (optional).
 * @see contractDataBinary of type `Uint8Array | undefined` represents the contract's data as bytecode (optional).
 * @see address of type `string | undefined` represents the smart contract address (optional).
 * @see datastore of type `Map<Uint8Array, Uint8Array> | undefined` represents the smart contract's operational storage data (optional).
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
