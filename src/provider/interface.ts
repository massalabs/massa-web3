import { Address, EventFilter, Network, SmartContract } from '..'
import { Mas } from '../basicElements/mas'
import { Operation, OperationOptions, OperationStatus } from '../operation'
import { rpcTypes as t } from '../generated'
import {
  CallSCParams,
  DeploySCParams,
  SignedData,
  ExecuteScParams,
  SignOptions,
  NodeStatusInfo,
  ReadSCData,
  ReadSCParams,
} from './'
import { PublicStatus } from '../generated/grpc/massa/model/v1/node_pb'

export type PublicProvider = {
  balanceOf(
    addresses: string[],
    final?: boolean
  ): Promise<{ address: string; balance: bigint }[]>
  networkInfos(): Promise<Network>
  getOperationStatus(opId: string): Promise<OperationStatus>
  getEvents(filter: EventFilter): Promise<t.OutputEvents>
  getNodeStatus(): Promise<NodeStatusInfo | PublicStatus>
  readSC(params: ReadSCParams): Promise<ReadSCData>
  getStorageKeys(
    address: string,
    filter?: Uint8Array | string,
    final?: boolean
  ): Promise<Uint8Array[]>
  readStorage(
    address: string,
    keys: Uint8Array[] | string[],
    final?: boolean
  ): Promise<(Uint8Array | null)[]>
}

/**
 * Defines the expected structure for a provider.
 */
export type Provider = PublicProvider & {
  /** Retrieves the account's address. */
  get address(): string

  /** Retrieves the provider's name associated with the account. */
  get accountName(): string

  /** Retrieves the account's name. */
  get providerName(): string

  /** Initiates a balance retrieval request for the account. */
  balance(final: boolean): Promise<bigint>
  sign(
    data: Uint8Array | string,
    signOptions?: SignOptions
  ): Promise<SignedData>
  buyRolls(amount: Mas, opts?: OperationOptions): Promise<Operation>
  sellRolls(amount: Mas, opts?: OperationOptions): Promise<Operation>
  transfer(
    to: Address | string,
    amount: Mas,
    opts?: OperationOptions
  ): Promise<Operation>
  callSC(params: CallSCParams): Promise<Operation>
  executeSC(params: ExecuteScParams): Promise<Operation>
  deploySC(params: DeploySCParams): Promise<SmartContract>
}
