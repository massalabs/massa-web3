import { Address, EventFilter, Network, SCEvent, SmartContract } from '..'
import { Mas } from '../basicElements/mas'
import { Operation, OperationOptions, OperationStatus } from '../operation'
import {
  CallSCParams,
  DeploySCParams,
  ReadSCData,
  ReadSCParams,
  SignedData,
  NodeStatusInfo,
  ExecuteScParams,
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
  networkInfos(): Promise<Network>
  sign(data: Buffer | Uint8Array | string): Promise<SignedData>
  buyRolls(amount: Mas, opts?: OperationOptions): Promise<Operation>
  sellRolls(amount: Mas, opts?: OperationOptions): Promise<Operation>
  transfer(
    to: Address | string,
    amount: Mas,
    opts?: OperationOptions
  ): Promise<Operation>
  callSC(params: CallSCParams): Promise<Operation>
  readSC(params: ReadSCParams): Promise<ReadSCData>
  executeSC(params: ExecuteScParams): Promise<Operation>
  deploySC(params: DeploySCParams): Promise<SmartContract>
  getOperationStatus(opId: string): Promise<OperationStatus>
  getEvents(filter: EventFilter): Promise<SCEvent[]>
  getNodeStatus(): Promise<NodeStatusInfo>

  /** Storage */
  getStorageKeys(
    address: string,
    filter: Uint8Array | string,
    final?: boolean
  ): Promise<Uint8Array[]>
  readStorage(
    address: string,
    keys: Uint8Array[] | string[],
    final?: boolean
  ): Promise<Uint8Array[]>
}
