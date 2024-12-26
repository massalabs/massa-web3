// a Web3Provider is the combination of a clientAPI and an private key account
import {
  CallSCParams,
  DeploySCParams,
  ExecuteScParams,
  GAS_ESTIMATION_TOLERANCE,
  Provider,
  SignedData,
} from '..'
import {
  Account,
  Address,
  MAX_GAS_CALL,
  MIN_GAS_CALL,
  minBigInt,
  populateDatastore,
  PublicAPI,
  PublicApiUrl,
  SmartContract,
  StorageCost,
} from '../..'
import { DEPLOYER_BYTECODE } from '../../generated'
import { Mas } from '../../basicElements/mas'
import {
  Operation,
  OperationType,
  OperationOptions,
  RollOperation,
  TransferOperation,
  CallOperation,
} from '../../operation'
import {
  getAbsoluteExpirePeriod,
  OperationManager,
} from '../../operation/operationManager'
import { execute } from '../../basicElements/bytecode'
import { U64_t } from '../../basicElements/serializers/number/u64'
import { ErrorMaxGas, ErrorInsufficientBalance } from '../../errors'
import { PublicProvider } from './PublicProvider'

export class Web3Provider extends PublicProvider implements Provider {
  constructor(
    public client: PublicAPI,
    public account: Account
  ) {
    super(client)
  }

  static fromRPCUrl(url: string, account?: Account): Web3Provider {
    const client = new PublicAPI(url)
    if (account) {
      return new Web3Provider(client, account)
    }
    return new PublicProvider(client) as Web3Provider
  }

  static mainnet(account?: Account): Web3Provider {
    if (account) {
      return Web3Provider.fromRPCUrl(PublicApiUrl.Mainnet, account)
    }
    return Web3Provider.fromRPCUrl(PublicApiUrl.Mainnet)
  }

  static buildnet(account?: Account): Web3Provider {
    if (account) {
      return Web3Provider.fromRPCUrl(PublicApiUrl.Buildnet, account)
    }
    return Web3Provider.fromRPCUrl(PublicApiUrl.Buildnet)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly _providerName: string = 'Massa web3 provider'

  get accountName(): string {
    return this.account.address.toString()
  }

  get providerName(): string {
    return this._providerName
  }

  get address(): string {
    return this.account.address.toString()
  }

  async balance(final = true): Promise<bigint> {
    return this.client.getBalance(this.address.toString(), final)
  }

  private async rollOperation(
    type: OperationType,
    amount: Mas,
    opts?: OperationOptions
  ): Promise<Operation> {
    if (type !== OperationType.RollBuy && type !== OperationType.RollSell) {
      throw new Error('Invalid roll operation type.')
    }
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (amount <= 0) {
      throw new Error('amount of rolls must be a positive non-zero value.')
    }

    const operation = new OperationManager(this.account.privateKey, this.client)
    const details: RollOperation = {
      fee: opts?.fee ?? (await this.client.getMinimalFee()),
      expirePeriod: await getAbsoluteExpirePeriod(
        this.client,
        opts?.periodToLive
      ),
      type,
      amount,
    }
    const operationId = await operation.send(details)
    return new Operation(this, operationId)
  }

  /**
   * Buys rolls.
   *
   * @param amount - The number of rolls to buy.
   * @param opts - Optional operation details.
   *
   * @returns The ID of the operation.
   * @throws If the amount of rolls is not a positive non-zero value.
   */
  async buyRolls(amount: Mas, opts?: OperationOptions): Promise<Operation> {
    return this.rollOperation(OperationType.RollBuy, amount, opts)
  }

  /**
   * Sells rolls.
   *
   * @param amount - The number of rolls to sell.
   * @param opts - Optional operation details.
   *
   * @returns The ID of the operation.
   * @throws If the amount of rolls is not a positive non-zero value.
   */
  async sellRolls(amount: Mas, opts?: OperationOptions): Promise<Operation> {
    return this.rollOperation(OperationType.RollSell, amount, opts)
  }

  /**
   * Transfers tokens.
   *
   * @param to - The address of the recipient.
   * @param amount - The amount of tokens to transfer.
   * @param opts - Optional operation details.
   *
   * @returns The ID of the operation.
   * @throws If the amount of tokens is not a positive non-zero value.
   */
  async transfer(
    to: Address | string,
    amount: Mas,
    opts?: OperationOptions
  ): Promise<Operation> {
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
    if (amount <= 0) {
      throw new Error('amount to transfer must be a positive non-zero value.')
    }

    if (typeof to === 'string') {
      to = Address.fromString(to)
    }

    const operation = new OperationManager(this.account.privateKey, this.client)
    const details: TransferOperation = {
      fee: opts?.fee ?? (await this.client.getMinimalFee()),
      expirePeriod: await getAbsoluteExpirePeriod(
        this.client,
        opts?.periodToLive
      ),
      type: OperationType.Transaction,
      amount,
      recipientAddress: to,
    }
    const operationId = await operation.send(details)
    return new Operation(this, operationId)
  }

  public async sign(data: Uint8Array | string): Promise<SignedData> {
    const bytes =
      typeof data === 'string' ? new TextEncoder().encode(data) : data
    const sig = await this.account.sign(bytes)
    return {
      publicKey: this.account.publicKey.toString(),
      signature: sig.toString(),
    }
  }

  public async callSC(params: CallSCParams): Promise<Operation> {
    const operationId = await this.call(params)
    return new Operation(this, operationId)
  }

  /**
   * Executes Binary Smart Contract Code Onchain
   *
   * Executes a binary code (smart contract) directly on the blockchain without deploying or storing it.
   * This function is particularly useful for one-off actions or tasks that require blockchain execution
   * but do not need the persistence or state of a deployed smart contract.
   *
   * @remarks
   * If the execution involves storing data or spending coins, the sender's address (i.e., the user's address
   * initiating the contract execution) will be used.
   *
   * @see {@link https://docs.massa.net/docs/learn/operation-format-execution#executesc-operation-payload} for more details
   * on the setup and usage of the datastore during execution.
   */
  public async executeSC(params: ExecuteScParams): Promise<Operation> {
    return new Operation(this, await this.executeSc(params))
  }

  public async deploySC(params: DeploySCParams): Promise<SmartContract> {
    const operationId = await this.deploy(params)

    const operation = new Operation(this, operationId)
    const deployedAddress = await operation.getDeployedAddress(
      params.waitFinalExecution
    )
    return new SmartContract(this, deployedAddress)
  }

  /**
   * Executes Binary Smart Contract Code Onchain.
   * @see {@link https://docs.massa.net/docs/learn/operation-format-execution#executesc-operation-payload} for more information on how to setup datastore.
   */
  async executeSc(params: ExecuteScParams): Promise<string> {
    return execute(this.client, this.account.privateKey, params.byteCode, {
      fee: params.fee,
      periodToLive: params.periodToLive,
      maxCoins: params.maxCoins,
      maxGas: params.maxGas,
      datastore: params.datastore,
    })
  }

  /**
   * Executes a smart contract call operation
   * @param params - callSCParams.
   * @returns A promise that resolves to an Operation object representing the transaction.
   */
  protected async call(params: CallSCParams): Promise<string> {
    const coins = params.coins ?? 0n
    await this.checkAccountBalance(coins)

    const args = params.parameter ?? new Uint8Array()
    const parameter = args instanceof Uint8Array ? args : args.serialize()

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
  protected async getGasEstimation(params: CallSCParams): Promise<U64_t> {
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
    if (coins > 0n) {
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
   *
   * @returns The deployed smart contract.
   *
   * @throws If the account has insufficient balance to deploy the smart contract.
   */
  protected async deploy(params: DeploySCParams): Promise<string> {
    const coins = params.coins ?? 0n
    const totalCost = StorageCost.smartContract(params.byteCode.length) + coins

    await this.checkAccountBalance(totalCost)

    const args = params.parameter ?? new Uint8Array()
    const parameter = args instanceof Uint8Array ? args : args.serialize()

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
      maxCoins: params?.maxCoins ?? totalCost,
      maxGas: params.maxGas,
      datastore,
    })
  }
}
