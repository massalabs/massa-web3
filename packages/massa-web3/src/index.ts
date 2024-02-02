/** Polyfills */
import { Buffer } from 'buffer'
import EventEmitter from 'events'

declare global {
  interface Window {
    Buffer: typeof Buffer
    EventEmitter: typeof EventEmitter
  }
}

// Check if we are on browser
if (typeof window !== 'undefined') {
  window.Buffer = Buffer
  window.EventEmitter = EventEmitter
}

/** Exposed interfaces */
export { IAccount } from './interfaces/IAccount'
export { IEventFilter } from './interfaces/IEventFilter'
export { IEventRegexFilter } from './interfaces/IEventRegexFilter'
export { IAddressInfo } from './interfaces/IAddressInfo'
export { IBlockInfo } from './interfaces/IBlockInfo'
export { IClientConfig } from './interfaces/IClientConfig'
export { IClique } from './interfaces/IClique'
export { IContractData } from './interfaces/IContractData'
export { ICallData } from './interfaces/ICallData'
export { IReadData } from './interfaces/IReadData'
export { IFullAddressInfo } from './interfaces/IFullAddressInfo'
export { IEndorsement } from './interfaces/IEndorsement'
export { INodeStatus } from './interfaces/INodeStatus'
export { IOperationData } from './interfaces/IOperationData'
export { IProvider, ProviderType } from './interfaces/IProvider'
export { IRollsData } from './interfaces/IRollsData'
export { ISignature } from './interfaces/ISignature'
export { ISignedMessage } from './interfaces/ISignedMessage'
export { IStakingAddresses } from './interfaces/IStakingAddresses'
export { ITransactionData } from './interfaces/ITransactionData'
export { IBalance } from './interfaces/IBalance'
export { IDatastoreEntry } from './interfaces/IDatastoreEntry'
export { IExecuteReadOnlyData } from './interfaces/IExecuteReadOnlyData'
export { IExecuteReadOnlyResponse } from './interfaces/IExecuteReadOnlyResponse'
export { JsonRpcResponseData } from './interfaces/JsonRpcResponseData'
export { EOperationStatus } from './interfaces/EOperationStatus'
export {
  ITransactionOpType,
  IRollBuyOpType,
  IRollSellOpType,
  IExecSmartContractOpType,
  OperationTypeId,
  OpType,
} from './interfaces/OperationTypes'
export { IClient } from './interfaces/IClient'
export { IPublicApiClient } from './interfaces/IPublicApiClient'
export { IPrivateApiClient } from './interfaces/IPrivateApiClient'
export { IWalletClient } from './interfaces/IWalletClient'
export { ISmartContractsClient } from './interfaces/ISmartContractsClient'
export { IDatastoreEntryInput } from './interfaces/IDatastoreEntryInput'
export { IGetGraphInterval } from './interfaces/IGetGraphInterval'
export { IGraphInterval } from './interfaces/IGraphInterval'
export {
  IBlockcliqueBlockBySlot,
  IBlockHeaderInfo,
  IEndorsementInfo,
} from './interfaces/IBlockcliqueBlockBySlot'
export { ISubscribeNewBlocksMessage } from './interfaces/ISubscribeNewBlocksMessage'
export { ISubscribedFullBlocksMessage } from './interfaces/ISubscribedFullBlocksMessage'
export { IBaseAccount } from './interfaces/IBaseAccount'

/** Exposed clients and factories */
export { ClientFactory } from './web3/ClientFactory'
export { Client } from './web3/Client'
export { PublicApiClient } from './web3/PublicApiClient'
export { PrivateApiClient } from './web3/PrivateApiClient'
export { WalletClient } from './web3/WalletClient'
export {
  EventPoller,
  ON_MASSA_EVENT_DATA,
  ON_MASSA_EVENT_ERROR,
} from './web3/EventPoller'
export {
  SmartContractsClient,
  MASSA_PROTOFILE_KEY,
  PROTO_FILE_SEPARATOR,
} from './web3/SmartContractsClient'
export { withTimeoutRejection } from './utils/time'

export { Web3Account } from './web3/accounts/Web3Account'
export { WalletProviderAccount } from './web3/accounts/WalletProviderAccount'

/**
 * This namespace provides utility functions, such as unit conversion, serialization, encoding, etc.
 */
export * as utils from './utils'
export * from './utils/keyAndAddresses'
export * from '@massalabs/web3-utils'
