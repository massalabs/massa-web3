import { MassaFee } from '../web3/MassaFee';
import { MassaGas } from '../web3/MassaGas';

export interface IContractData {
  /// storage fee for taking place in books
  fee: MassaFee;
  /// The maximum amount of gas that the execution of the contract is allowed to cost.
  maxGas: MassaGas;
  /// Smart contract data as text.
  contractDataText?: string;
  /// Smart contract data as bytecode
  contractDataBinary?: Uint8Array;
  /// smart contract address
  address?: string;
  /// key/value datamap that can store smart contract operational storage data
  datastore?: Map<Uint8Array, Uint8Array>;
}
