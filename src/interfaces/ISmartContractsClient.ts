import { EOperationStatus } from './EOperationStatus';
import { IAccount } from './IAccount';
import { IBalance } from './IBalance';
import { ICallData } from './ICallData';
import { IContractData } from './IContractData';
import { IContractReadOperationResponse } from './IContractReadOperationResponse';
import { IEvent } from './IEvent';
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
  deploySmartContract(
    contractData: IContractData,
    executor?: IAccount,
  ): Promise<string>;
  callSmartContract(callData: ICallData, executor?: IAccount): Promise<string>;
  readSmartContract(
    readData: IReadData,
  ): Promise<IContractReadOperationResponse>;
  getContractBalance(address: string): Promise<IBalance | null>;
  getFilteredScOutputEvents(
    eventFilterData: IEventFilter,
  ): Promise<Array<IEvent>>;
  executeReadOnlySmartContract(
    contractData: IContractData,
  ): Promise<IExecuteReadOnlyResponse>;
  getOperationStatus(opId: string): Promise<EOperationStatus>;
  awaitRequiredOperationStatus(
    opId: string,
    requiredStatus: EOperationStatus,
  ): Promise<EOperationStatus>;
}
