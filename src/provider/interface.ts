import { Address, SmartContract } from '..'
import { Mas } from '../basicElements/mas'
import { Operation, OperationOptions } from '../operation'
import {
  CallSCParams,
  DeploySCParams,
  SignedData,
  ExecuteScParams,
  SignOptions,
  PublicProvider,
} from './'

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
