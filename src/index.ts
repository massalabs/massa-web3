/** Polyfills */
import { Buffer } from 'buffer';
import EventEmitter from 'events';

declare global {
  interface Window {
    Buffer: typeof Buffer;
    EventEmitter: typeof EventEmitter;
  }
}

// Check if we are on browser
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
  window.EventEmitter = EventEmitter;
}

/** Exposed interfaces */
export { Account } from './interfaces/Account';
export { Event } from './interfaces/Event';
export { EventFilter } from './interfaces/EventFilter';
export { EventRegexFilter } from './interfaces/EventRegexFilter';
export { Slot } from './interfaces/Slot';
export { AddressInfo } from './interfaces/AddressInfo';
export { BlockInfo } from './interfaces/BlockInfo';
export { ClientConfig } from './interfaces/ClientConfig';
export { Clique } from './interfaces/Clique';
export { ContractData } from './interfaces/ContractData';
export { CallData } from './interfaces/CallData';
export { ReadData } from './interfaces/ReadData';
export { FullAddressInfo } from './interfaces/FullAddressInfo';
export { Endorsement } from './interfaces/Endorsement';
export { NodeStatus } from './interfaces/NodeStatus';
export { OperationData } from './interfaces/OperationData';
export { Provider, ProviderType } from './interfaces/Provider';
export { RollsData } from './interfaces/RollsData';
export { Signature } from './interfaces/Signature';
export { SignedMessage } from './interfaces/SignedMessage';
export { StakingAddresses } from './interfaces/StakingAddresses';
export { TransactionData } from './interfaces/TransactionData';
export { Balance } from './interfaces/Balance';
export { Serializable } from './interfaces/Serializable';
export { DeserializedResult } from './interfaces/Serializable';
export { DatastoreEntry } from './interfaces/DatastoreEntry';
export { ContractReadOperationData } from './interfaces/ContractReadOperationData';
export { ContractReadOperationResponse } from './interfaces/ContractReadOperationResponse';
export { ReadOperationResult } from './interfaces/ReadOperationResult';
export { ExecuteReadOnlyData } from './interfaces/ExecuteReadOnlyData';
export { ExecuteReadOnlyResponse } from './interfaces/ExecuteReadOnlyResponse';
export { JsonRpcResponseData } from './interfaces/JsonRpcResponseData';
export { EOperationStatus } from './interfaces/EOperationStatus';
export {
  TransactionOpType,
  RollBuyOpType,
  RollSellOpType,
  ExecSmartContractOpType,
  OperationTypeId,
  OpType,
} from './interfaces/OperationTypes';
export { Client } from './interfaces/Client';
export { PublicApiClient } from './interfaces/PublicApiClient';
export { PrivateApiClient } from './interfaces/PrivateApiClient';
export { WalletClient } from './interfaces/WalletClient';
export { SmartContractsClient } from './interfaces/SmartContractsClient';
export { DatastoreEntryInput } from './interfaces/DatastoreEntryInput';
export { GetGraphInterval } from './interfaces/GetGraphInterval';
export { GraphInterval } from './interfaces/GraphInterval';
export {
  BlockcliqueBlockBySlot,
  BlockHeaderInfo,
  EndorsementInfo,
} from './interfaces/BlockcliqueBlockBySlot';
export { SubscribeNewBlocksMessage } from './interfaces/SubscribeNewBlocksMessage';
export { SubscribedFullBlocksMessage } from './interfaces/SubscribedFullBlocksMessage';

/** Exposed clients and factories */
export { ClientFactory, DefaultProviderUrls } from './web3/ClientFactory';
export { Client } from './web3/Client';
export { PublicApiClient } from './web3/PublicApiClient';
export { PrivateApiClient } from './web3/PrivateApiClient';
export { WalletClient } from './web3/WalletClient';
export {
  EventPoller,
  ON_MASSA_EVENT_DATA,
  ON_MASSA_EVENT_ERROR,
} from './web3/EventPoller';
export { SmartContractsClient } from './web3/SmartContractsClient';
export * from './utils/arguments';
export { fromMAS, toMAS, MassaUnits } from './utils/converters';
export * from './utils/serializers';

/** Exposed utils */
export * as utils from './utils/Xbqcrypto';
export * as time from './utils/time';
