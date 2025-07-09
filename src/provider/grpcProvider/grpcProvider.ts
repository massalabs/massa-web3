/* eslint-disable @typescript-eslint/naming-convention */

import { Operation } from '../../operation'
import { SmartContract } from '../../smartContracts'
import { Provider, ReadSCData, ReadSCParams, SignedData } from '..'
import { Account } from '../../account'
import { GrpcPublicProvider } from './grpcPublicProvider'
import { GrpcApiUrl } from '../../utils/networks'
import { PublicServiceClient } from '../../generated/grpc/PublicServiceClientPb'

/**
 * GrpcProvider implements the Provider interface using gRPC for Massa blockchain interactions
 */
export class GrpcProvider extends GrpcPublicProvider implements Provider {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly _providerName: string = 'Massa GRPC provider'

  /**
   * Creates a new GrpcProvider instance
   * @param url - The gRPC endpoint URL
   * @param account - The account associated with this provider
   */
  constructor(
    public client: PublicServiceClient,
    public url: string,
    private account: Account
  ) {
    super(client, url)
  }

  static mainnet(account: Account): GrpcProvider
  static mainnet(): GrpcPublicProvider
  static mainnet(account?: Account): GrpcProvider | GrpcPublicProvider {
    return account
      ? GrpcProvider.fromGrpcUrl(GrpcApiUrl.Mainnet, account)
      : GrpcProvider.fromGrpcUrl(GrpcApiUrl.Mainnet)
  }

  static buildnet(account: Account): GrpcProvider
  static buildnet(): GrpcPublicProvider
  static buildnet(account?: Account): GrpcProvider | GrpcPublicProvider {
    return account
      ? GrpcProvider.fromGrpcUrl(GrpcApiUrl.Buildnet, account)
      : GrpcProvider.fromGrpcUrl(GrpcApiUrl.Buildnet)
  }

  static fromGrpcUrl(url: string, account: Account): GrpcProvider
  static fromGrpcUrl(url: string): GrpcPublicProvider
  static fromGrpcUrl(
    url: string,
    account?: Account
  ): GrpcProvider | GrpcPublicProvider {
    if (account) {
      return new GrpcProvider(new PublicServiceClient(url), url, account)
    }
    return new GrpcPublicProvider(new PublicServiceClient(url), url)
  }

  /**
   * Gets the address of the associated account
   */
  get address(): string {
    return this.account.address.toString()
  }
  /**
   * Gets the name of the associated account
   */
  get accountName(): string {
    return this.account.address.toString()
  }
  /**
   * Gets the name of the provider
   */
  get providerName(): string {
    return this._providerName
  }

  /**
   * Executes a read-only smart contract call
   */
  async readSC(params: ReadSCParams): Promise<ReadSCData> {
    const caller = params.caller ?? this.address
    return super.readSC({ ...params, caller })
  }

  /**
   * Retrieves the balance of the associated account
   */
  async balance(final = true): Promise<bigint> {
    const balance = await super.balanceOf([this.address], final)
    return balance[0].balance
  }

  /**
   * @deprecated This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for signing data.
   */
  /* eslint-disable-next-line class-methods-use-this */
  sign(): Promise<SignedData> {
    throw new Error('Method not implemented.')
  }

  /**
   * @deprecated This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for buying rolls.
   */
  /* eslint-disable-next-line class-methods-use-this */
  buyRolls(): Promise<Operation> {
    throw new Error('Method not implemented.')
  }

  /**
   * @deprecated This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for selling rolls.
   */
  /* eslint-disable-next-line class-methods-use-this */
  sellRolls(): Promise<Operation> {
    throw new Error('Method not implemented.')
  }

  /**
   * @deprecated This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for transferring assets.
   */
  /* eslint-disable-next-line class-methods-use-this */
  transfer(): Promise<Operation> {
    throw new Error('Method not implemented.')
  }

  /**
   * @deprecated This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for calling smart contracts.
   */
  /* eslint-disable-next-line class-methods-use-this */
  callSC(): Promise<Operation> {
    throw new Error('Method not implemented.')
  }

  /**
   * @deprecated This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for executing smart contracts.
   */
  /* eslint-disable-next-line class-methods-use-this */
  executeSC(): Promise<Operation> {
    throw new Error('Method not implemented.')
  }

  /**
   * @deprecated This method cannot be implemented in the GRPC provider.
   * Use another provider or alternative method for deploying smart contracts.
   */
  /* eslint-disable-next-line class-methods-use-this */
  deploySC(): Promise<SmartContract> {
    throw new Error('Method not implemented.')
  }
}
