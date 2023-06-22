import { EOperationStatus } from './EOperationStatus';
import { Account } from './Account';
import { Balance } from './Balance';
import { CallData } from './CallData';
import { ContractData } from './ContractData';
import { ContractReadOperationResponse } from './ContractReadOperationResponse';
import { Event } from './Event';
import { EventFilter } from './EventFilter';
import { ExecuteReadOnlyResponse } from './ExecuteReadOnlyResponse';
import { ReadData } from './ReadData';

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
export interface SmartContractsClient {
  /**
   * Deploy a smart contract.
   *
   * @param contractData - The contract data
   * @param executor - The account used to send the transaction (if not set, the base account is used)
   *
   * @returns The operation id
   */
  deploySmartContract(
    contractData: ContractData,
    executor?: Account,
  ): Promise<string>;

  /**
   * Calls a smart contract.
   *
   * @param callData - The call data
   * @param executor - The account used to send the transaction (if not set, the base account is used)
   *
   * @returns The operation id
   */
  callSmartContract(callData: CallData, executor?: Account): Promise<string>;

  /**
   * Read a smart contract.
   *
   * @param readData - The read data
   *
   * @returns The contract read operation response
   */
  readSmartContract(readData: ReadData): Promise<ContractReadOperationResponse>;

  /**
   * Get contract balance.
   *
   * @param address - The contract address
   *
   * @returns The contract balance (null if not found)
   */
  getContractBalance(address: string): Promise<Balance | null>;

  /**
   * Get filtered smart contract output events.
   *
   * @param eventFilterData - The event filter data
   *
   * @returns The array of corresponding events
   */
  getFilteredScOutputEvents(
    eventFilterData: EventFilter,
  ): Promise<Array<Event>>;

  /**
   * Execute read only smart contract.
   *
   * @param contractData - The contract data
   *
   * @returns The execute read only response
   */
  executeReadOnlySmartContract(
    contractData: ContractData,
  ): Promise<ExecuteReadOnlyResponse>;

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
