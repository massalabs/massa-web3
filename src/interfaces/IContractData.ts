import { MassaAmount } from '../web3/MassaAmount';

export interface IContractData {
  /// storage fee for taking place in books
  fee: MassaAmount;
  /// The maximum amount of gas that the execution of the contract is allowed to cost.
  maxGas: MassaAmount;
  /// Smart contract data as text.
  contractDataText?: string;
  /// Smart contract data as bytecode
  contractDataBinary?: Uint8Array;
  /// smart contract address
  address?: string;
  /// key/value datamap that can store smart contract operational storage data
  datastore?: Map<Uint8Array, Uint8Array>;
}
