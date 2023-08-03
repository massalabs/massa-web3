import { IContractReadOperationResponse, IEvent } from '@massalabs/web3-utils';
import { EOperationStatus } from './EOperationStatus';
import { IBalance } from './IBalance';
import { IBaseAccount } from './IBaseAccount';
import { ICallData } from './ICallData';
import { IContractData } from './IContractData';
import { IEventFilter } from './IEventFilter';
import { IExecuteReadOnlyResponse } from './IExecuteReadOnlyResponse';
import { IReadData } from './IReadData';

/**
 * Represents a SmartContractClient object.
 *
 * @see deploySmartContract - deploy smart contract
 * @see callSmartContract - call smart contract
 * @see readSmartContract - read smart contract
 * @see getContractBalance - get contract balance
 * @see getFilteredScOutputEvents - get filtered smart contract output events
 * @see executeReadOnlySmartContract - execute read only smart contract
 * @see getOperationStatus - get operation status
 * @see awaitRequiredOperationStatus - await required operation status
 */
export interface ISmartContractsClient {
  /**
   * Deploy a smart contract.
   *
   * @param contractData - The contract data
   * @param executor - The account used to send the transaction (if not set, the base account is used)
   *
   * @returns The operation id
   */
  deploySmartContract(
    contractData: IContractData,
    executor?: IBaseAccount,
  ): Promise<string>;

  /**
   * Calls a smart contract.
   *
   * @param callData - The call data
   * @param executor - The account used to send the transaction (if not set, the base account is used)
   *
   * @returns The operation id
   */
  callSmartContract(
    callData: ICallData,
    executor?: IBaseAccount,
  ): Promise<string>;

  /**
   * Read a smart contract.
   *
   * @param readData - The read data
   *
   * @returns The contract read operation response
   */
  readSmartContract(
    readData: IReadData,
  ): Promise<IContractReadOperationResponse>;

  /**
   * Get contract balance.
   *
   * @param address - The contract address
   *
   * @returns The contract balance (null if not found)
   */
  getContractBalance(address: string): Promise<IBalance | null>;

  /**
   * Get filtered smart contract output events.
   *
   * @param eventFilterData - The event filter data
   *
   * @returns The array of corresponding events
   */
  getFilteredScOutputEvents(
    eventFilterData: IEventFilter,
  ): Promise<Array<IEvent>>;

  /**
   * Execute read only smart contract.
   *
   * @param contractData - The contract data
   *
   * @returns The execute read only response
   */
  executeReadOnlySmartContract(
    contractData: IContractData,
  ): Promise<IExecuteReadOnlyResponse>;

  /**
   * Get an operation status.
   *
   * @param opId - The operation id
   *
   * @returns The operation status
   */
  getOperationStatus(opId: string): Promise<EOperationStatus>;

  /**
   * Await required operation status.
   *
   * @param opId - The operation id
   * @param requiredStatus - The required operation status
   *
   * @returns The operation status
   */
  awaitRequiredOperationStatus(
    opId: string,
    requiredStatus: EOperationStatus,
  ): Promise<EOperationStatus>;
}
