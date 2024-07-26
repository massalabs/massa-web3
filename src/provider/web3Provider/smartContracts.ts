import { Account, ZERO, minBigInt, PublicAPI } from '../..'
import { U64 } from '../../basicElements/serializers/number/u64'
import { ErrorInsufficientBalance, ErrorMaxGas } from '../../errors'
import { MAX_GAS_CALL, MIN_GAS_CALL } from '../../smartContracts'
import {
  CallSCParams,
  DeploySCParams,
  ReadOnlyCallResult,
  ReadSCParams,
  GAS_ESTIMATION_TOLERANCE,
} from '..'
import * as StorageCost from '../../basicElements/storage'
import { populateDatastore } from '../../dataStore'
import { execute } from '../../basicElements/bytecode'
import { DEPLOYER_BYTECODE } from '../../generated/deployer-bytecode'
import { Mas } from '../../basicElements/mas'
import { CallOperation, OperationType } from '../../operation'
import {
  getAbsoluteExpirePeriod,
  OperationManager,
} from '../../operation/operationManager'

export class SCProvider {
  constructor(
    public client: PublicAPI,
    public account: Account
  ) {}

  /**
   * Reads smart contract function.
   * @param params - readSCParams.
   * @returns A promise that resolves to a ReadOnlyCallResult.
   */
  async readSC(params: ReadSCParams): Promise<ReadOnlyCallResult> {
    const args = params.parameter ?? new Uint8Array()
    const readOnlyParams = {
      ...params,
      parameter:
        args instanceof Uint8Array ? args : Uint8Array.from(args.serialize()),
    }
    return this.client.executeReadOnlyCall(readOnlyParams)
  }

  /**
   * Executes a smart contract call operation
   * @param params - callSCParams.
   * @returns A promise that resolves to an Operation object representing the transaction.
   */
  public async call(params: CallSCParams): Promise<string> {
    const coins = params.coins ?? BigInt(ZERO)
    await this.checkAccountBalance(coins)

    const args = params.parameter ?? new Uint8Array()
    const parameter =
      args instanceof Uint8Array ? args : Uint8Array.from(args.serialize())

    const fee = params.fee ?? (await this.client.getMinimalFee())

    let maxGas = params.maxGas
    if (!maxGas) {
      maxGas = await this.getGasEstimation(params)
    } else {
      if (maxGas > MAX_GAS_CALL) {
        throw new ErrorMaxGas({ isHigher: true, amount: MAX_GAS_CALL })
      } else if (maxGas < MIN_GAS_CALL) {
        throw new ErrorMaxGas({ isHigher: false, amount: MIN_GAS_CALL })
      }
    }

    const details: CallOperation = {
      fee,
      expirePeriod: await getAbsoluteExpirePeriod(
        this.client,
        params.periodToLive
      ),
      type: OperationType.CallSmartContractFunction,
      coins,
      maxGas,
      address: params.target,
      func: params.func,
      parameter,
    }

    const manager = new OperationManager(this.account.privateKey, this.client)
    return manager.send(details)
  }

  /**
   * Returns the gas estimation for a given function.
   *
   * @remarks To avoid running out of gas, the gas estimation is increased by 20%.
   *
   * @param params - callSCParams.
   * @throws If the read operation returns an error.
   * @returns The gas estimation for the function.
   */
  protected async getGasEstimation(params: CallSCParams): Promise<U64> {
    const result = await this.readSC(params)

    if (result.info.error) {
      throw new Error(result.info.error)
    }

    const gasCost = BigInt(result.info.gasCost)
    return minBigInt(
      // eslint-disable-next-line @typescript-eslint/no-magic-numbers
      gasCost + (gasCost * GAS_ESTIMATION_TOLERANCE) / 100n,
      MAX_GAS_CALL
    )
  }

  protected async checkAccountBalance(coins: Mas): Promise<void> {
    if (coins > BigInt(ZERO)) {
      const balance = await this.client.getBalance(
        this.account.address.toString()
      )
      if (balance < coins) {
        throw new ErrorInsufficientBalance({
          userBalance: balance,
          neededBalance: coins,
        })
      }
    }
  }

  /**
   * Deploys a smart contract on the blockchain.
   *
   * @param params - Optional deployment details with defaults as follows:
   * @param params.fee - Execution fee, auto-estimated if absent.
   * @param params.maxCoins - Maximum number of coins to use, auto-estimated if absent.
   * @param params.maxGas - Maximum execution gas, auto-estimated if absent.
   * @param params.periodToLive - Duration in blocks before the transaction expires, defaults to 10.
   * @param params.waitFinalExecution - Whether to wait for the transaction to be finalized, defaults to true.
   *
   *
   * @returns The deployed smart contract.
   *
   * @throws If the account has insufficient balance to deploy the smart contract.
   */
  protected async deploy(params: DeploySCParams): Promise<string> {
    const coins = params.coins ?? BigInt(ZERO)
    const totalCost = StorageCost.smartContract(params.byteCode.length) + coins

    await this.checkAccountBalance(totalCost)

    const args = params.parameter ?? new Uint8Array()
    const parameter =
      args instanceof Uint8Array ? args : Uint8Array.from(args.serialize())

    const datastore = populateDatastore([
      {
        data: params.byteCode,
        args: parameter,
        coins,
      },
    ])

    const fee = params.fee ?? (await this.client.getMinimalFee())

    return execute(this.client, this.account.privateKey, DEPLOYER_BYTECODE, {
      fee,
      periodToLive: params.periodToLive,
      maxCoins: totalCost,
      maxGas: params.maxGas,
      datastore,
    })
  }
}
