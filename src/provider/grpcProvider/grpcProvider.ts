/* eslint-disable @typescript-eslint/naming-convention */

import { Mas } from '../../basicElements'
import { Operation } from '../../operation'
import { SmartContract } from '../../smartContracts'
import { Provider, ReadSCParams, SignedData } from '..'
import { Account } from '../../account'
import { fromNanoMas } from '../../basicElements/mas'
import { GrpcPublicProvider } from './grpcPublicProvider'
import { GrpcApiUrl } from '../../utils/networks'
import { PublicServiceClient } from '../../generated/grpc/apis/massa/api/v1/PublicServiceClientPb'
import { FunctionCall, ReadOnlyExecutionCall, ReadOnlyExecutionOutput } from '../../generated/grpc/massa/model/v1/execution_pb'
import { AddressBalanceCandidate, AddressBalanceFinal, ExecuteReadOnlyCallRequest, ExecutionQueryRequestItem, QueryStateRequest } from '../../generated/grpc/apis/massa/api/v1/public_pb'
import { NativeAmount } from '../../generated/grpc/massa/model/v1/amount_pb'

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
          url,
        ),
        url,
        account
      )
    }
    return new GrpcPublicProvider(
      new PublicServiceClient(url
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
    const account = await Account.generate()
    const caller = account.address.toString()
    const maxGas = params.maxGas ?? 0n


    const request = new ExecuteReadOnlyCallRequest();
    const call = new ReadOnlyExecutionCall();
    call.setMaxGas(Number(maxGas));
    call.setCallerAddress(caller);
    call.setCallStackList([]);
    call.setFunctionCall(new FunctionCall().setTargetAddress(params.target).setTargetFunction(params.func).setParameter(args instanceof Uint8Array ? args : args.serialize()));

    // fee 
    if (params.fee) {
      call.setFee(new NativeAmount().setMantissa(Number(params.fee)).setScale(Mas.NB_DECIMALS));
    }
    request.setCall(call);
    const response = await this.client.executeReadOnlyCall(request);

    const output = response.getOutput();
    if (!output) {
      throw new Error('No output received')
    }

    return output
  }

  /**
   * Retrieves the balance of the associated account
   */
  async balance(final = true): Promise<bigint> {
    try {
      const queries = new ExecutionQueryRequestItem();
      if (final) {
        queries.setAddressBalanceFinal(new AddressBalanceFinal().setAddress(this.account.address.toString()));
      } else {
        queries.setAddressBalanceCandidate(new AddressBalanceCandidate().setAddress(this.account.address.toString()));
      }

      const response = await this.client.queryState(new QueryStateRequest().setQueriesList([queries]));

      const list = response.getResponsesList();
      const result = list[0];
      if (!result) {
        throw new Error('No response received for balance query')
      }

      if (result.hasError()) {
        throw new Error(`Query state error: ${result.getError()?.getMessage() || 'Unknown error'}`)
      }

      if (!result.hasResult()) {
        throw new Error('No response item received for balance query')
      }

      const responseItem = result.getResult();

      if (!responseItem?.hasAmount()) {
        throw new Error('No response item received for balance query')
      }

      const amount = responseItem.getAmount();
      if (!amount) {
        throw new Error('No amount received for balance query')
      }

      return BigInt(amount.getMantissa());
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
