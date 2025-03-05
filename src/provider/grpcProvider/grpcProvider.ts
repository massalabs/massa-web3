/* eslint-disable @typescript-eslint/naming-convention */

import { Mas } from '../../basicElements'
import { Operation } from '../../operation'
import { SmartContract } from '../../smartContracts'
import { Provider, ReadSCParams, SignedData } from '..'
import { Account } from '../../account'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { fromNanoMas } from '../../basicElements/mas'
import { PublicServiceClient } from '../../generated/grpc/apis/massa/api/v1/public.client'
import { ExecutionQueryRequestItem } from '../../generated/grpc/apis/massa/api/v1/public'
import { ReadOnlyExecutionOutput } from '../../generated/grpc/massa/model/v1/execution'
import { GrpcPublicProvider } from './grpcPublicProvider'
import { GrpcApiUrl } from '../../utils/networks'

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
      return new GrpcProvider(
        new PublicServiceClient(
          new GrpcWebFetchTransport({
            baseUrl: url,
          })
        ),
        url,
        account
      )
    }
    return new GrpcPublicProvider(
      new PublicServiceClient(
        new GrpcWebFetchTransport({
          baseUrl: url,
        })
      ),
      url
    )
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
  async readSC(params: ReadSCParams): Promise<ReadOnlyExecutionOutput> {
    const args = params.parameter ?? new Uint8Array()
    const caller = params.caller ?? this.account.address.toString()
    const maxGas = params.maxGas ?? 0n
    const fee = params.fee ?? fromNanoMas(0n)

    const response = await this.client.executeReadOnlyCall({
      call: {
        maxGas: maxGas,
        ...(params.fee && { fee: { mantissa: fee, scale: Mas.NB_DECIMALS } }),
        callerAddress: { value: caller },
        callStack: [],
        target: {
          oneofKind: 'functionCall',
          functionCall: {
            targetAddress: params.target,
            targetFunction: params.func,
            parameter: args instanceof Uint8Array ? args : args.serialize(),
          },
        },
      },
    })

    if (!response.response.output) {
      throw new Error('No output received')
    }

    return response.response.output
  }

  /**
   * Retrieves the balance of the associated account
   */
  async balance(final = true): Promise<bigint> {
    try {
      const queries: ExecutionQueryRequestItem[] = [
        {
          requestItem: final
            ? {
                oneofKind: 'addressBalanceFinal' as const,
                addressBalanceFinal: {
                  address: this.account.address.toString(),
                },
              }
            : {
                oneofKind: 'addressBalanceCandidate' as const,
                addressBalanceCandidate: {
                  address: this.account.address.toString(),
                },
              },
        },
      ]

      const response = await this.client.queryState({ queries })

      if (!response?.response?.responses?.[0]) {
        throw new Error('No response received for balance query')
      }

      const result = response.response.responses[0].response

      if (result.oneofKind === 'error') {
        throw new Error(
          `Query state error: ${result.error?.message || 'Unknown error'}`
        )
      }

      if (
        result.oneofKind === 'result' &&
        result.result.responseItem.oneofKind === 'amount'
      ) {
        return result.result.responseItem.amount.mantissa
      }

      throw new Error(
        `Unexpected response type: ${result.oneofKind}, ` +
          `expected 'result' with 'amount' but got '${result.oneofKind === 'result' ? result.result.responseItem.oneofKind : 'N/A'}'`
      )
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get balance: ${error.message}`)
      }
      throw new Error('Failed to get balance: Unknown error')
    }
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
