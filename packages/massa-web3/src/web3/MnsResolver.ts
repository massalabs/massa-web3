import {
  Args,
  IContractReadOperationData,
  MAX_GAS_CALL,
  bytesToStr,
} from '@massalabs/web3-utils'
import { IClientConfig } from '../interfaces/IClientConfig'
import { IMnsResolver } from '../interfaces/IMnsResolver'
import { BaseClient } from './BaseClient'
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods'
import { trySafeExecute } from '../utils/retryExecuteFunction'

export class MnsResolver extends BaseClient implements IMnsResolver {
  private contractResolver?: string

  /**
   * Constructor of the MnsResolver class.
   *
   * @param clientConfig - client configuration object.
   * @param dnsAddress - DNS address to use for resolving MNS records.
   */
  public constructor(clientConfig: IClientConfig, dnsAddress?: string) {
    super(clientConfig)
    this.contractResolver = dnsAddress
  }

  /**
   * Resolves the domain to an address.
   *
   * @param domain - Domain to resolve.
   *
   * @returns A promise that resolves to the address of the domain if it exists or throws an error if it does not.
   */
  public async resolve(domain: string): Promise<string> {
    if (!this.contractResolver) {
      throw new Error(
        'MNS resolver contract address is not set. Use setMnsResolver method to set the contract address.'
      )
    }
    if (!domain || !domain.endsWith('.massa')) {
      throw new Error(
        'Invalid domain name. Domain name should end with ".massa"'
      )
    }
    const data = {
      max_gas: MAX_GAS_CALL,
      target_address: this.contractResolver,
      target_function: 'dnsResolve',
      parameter: new Args().addString(domain).serialize(),
      caller_address: this.contractResolver,
      coins: 0,
      fee: 0,
    }

    // returns operation ids
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_CALL
    let jsonRpcCallResult: Array<IContractReadOperationData> = []
    if (this.clientConfig.retryStrategyOn) {
      jsonRpcCallResult = await trySafeExecute<
        Array<IContractReadOperationData>
      >(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[data]]])
    } else {
      jsonRpcCallResult = await this.sendJsonRPCRequest(jsonRpcRequestMethod, [
        [data],
      ])
    }

    if (jsonRpcCallResult.length <= 0) {
      throw new Error(
        'Read operation bad response. No results array in json rpc response. Inspect smart contract'
      )
    }
    if (jsonRpcCallResult[0].result.Error) {
      throw new Error(jsonRpcCallResult[0].result.Error)
    }

    return bytesToStr(jsonRpcCallResult[0].result.Ok)
  }

  /**
   * Sets the MNS resolver contract address.
   *
   * @param contractAddress - Contract address to use for resolving MNS records.
   */
  public setMnsResolver(contractAddress: string): void {
    this.contractResolver = contractAddress
  }
}
