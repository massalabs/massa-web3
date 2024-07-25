import { Address, SmartContract } from '..'
import { Mas } from '../basicElements/mas'
import { Operation, OperationStatus, OptOpDetails } from '../operation'
import {
  CallSCParams,
  DeploySCParams,
  ReadOnlyCallResult,
  ReadSCParams,
  SCOutputEvent,
} from './'

/**
 * Defines the expected structure for a provider.
 */
export type Provider = {
  /** Retrieves the account's address. */
  get address(): string

  /** Retrieves the provider's name associated with the account. */
  get accountName(): string

  /** Retrieves the account's name. */
  get providerName(): string

  /** Initiates a balance retrieval request for the account. */
  balance(final: boolean): Promise<bigint>

  // /**
  //  * Signs data.
  //  * @param data - Data to be signed (Buffer, Uint8Array, or string).
  //  */
  // sign(data: Buffer | Uint8Array | string): Promise<IAccountSignOutput>;

  /**
   * Purchases rolls.
   * @param amount - Amount of rolls.
   * @param opts - options.
   */
  buyRolls(amount: Mas, opts?: OptOpDetails): Promise<Operation>

  /**
   * Sells rolls.
   * @param amount - Amount of rolls.
   * @param opts - options.
   */
  sellRolls(amount: Mas, opts?: OptOpDetails): Promise<Operation>

  /**
   * Sends a transaction.
   *
   * @param to - Address of the recipient.
   * @param amount - MAS Amount to send.
   * @param opts - options.
   */
  transfer(
    to: Address | string,
    amount: Mas,
    opts?: OptOpDetails
  ): Promise<Operation>

  /**
   * Calls a smart contract.
   *
   * @param params - callSCParams.
   */
  callSC(params: CallSCParams): Promise<Operation>

  /**
   * Reads a smart contract.
   *
   * @param params - ReadOnlyCallParams.
   */
  readSC(params: ReadSCParams): Promise<ReadOnlyCallResult>

  /**
   * Deploys a smart contract.
   *
   * @param params - deploySCParams.
   */
  deploySC(params: DeploySCParams): Promise<SmartContract>

  /**
   * Gets the status of an operation.
   *
   * @param OpId - Operation Id.
   */
  getOperationStatus(OpId: string): Promise<OperationStatus>

  /**
   * Gets Events of an operation.
   *
   * @param OpId - Operation Id.
   * @param waitFinal - wait operation to be final.
   */
  getOperationEvents(OpId: string, waitFinal: boolean): Promise<SCOutputEvent[]>
}
