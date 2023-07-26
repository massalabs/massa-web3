import { ICallData } from './ICallData';
import { IContractData } from './IContractData';
import { IRollsData } from './IRollsData';
import { ISignature } from './ISignature';
import { ITransactionData } from './ITransactionData';

/**
 * Represents a BaseAccount object.
 *
 * @see sign - Sign an array of bytes.
 * @see address - The address of the account.
 * @see sellRolls - Sell rolls.
 * @see buyRolls - Buy rolls.
 * @see sendTransaction - Send a transaction.
 * @see callSmartContract - Call a smart contract.
 * @see deploySmartContract - Deploy a smart contract.
 */
export interface IBaseAccount {
  /**
   * Sign a message.
   *
   * @returns Signature of the message.
   */
  sign(data: Buffer): Promise<ISignature>;

  /**
   * Verify integrity of the account.
   *
   * @throws - If the account is not valid.
   */
  verify(): Promise<void>;

  /**
   * The address of the account.
   *
   * @returns The address of the account.
   */
  address(): string;

  /**
   * @param txData - The transaction data.
   *
   * @returns A promise that resolves to an array of operation ids as strings.
   */
  sellRolls(txData: IRollsData): Promise<string>;

  /**
   * @param txData - The transaction data.
   *
   * @returns A promise that resolves to an array of operation ids as strings.
   */
  buyRolls(txData: IRollsData): Promise<string>;

  /**
   * @param txData - The transaction data.
   *
   * @returns A promise that resolves to an array of operation ids as strings.
   */
  sendTransaction(txData: ITransactionData): Promise<string>;

  /**
   * @param callData - The call data.
   *
   * @returns A promise that resolves to the result of the call.
   */
  callSmartContract(callData: ICallData): Promise<string>;

  /**
   * @param contractData - The contract data.
   *
   * @returns A promise that resolves to the address of the deployed contract.
   */
  deploySmartContract(contractData: IContractData): Promise<string>;
}
