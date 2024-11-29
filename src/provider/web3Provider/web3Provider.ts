// a Web3Provider is the combination of a clientAPI and an private key account
import {
  CallSCParams,
  DeploySCParams,
  ExecuteScParams,
  NodeStatusInfo,
  Provider,
  SignedData,
} from '..'
import { SCProvider } from './smartContracts'
import {
  Account,
  Address,
  CHAIN_ID,
  EventFilter,
  JsonRPCClient,
  Network,
  NetworkName,
  PublicApiUrl,
  SmartContract,
} from '../..'
import { rpcTypes as t } from '../../generated'
import { Mas } from '../../basicElements/mas'
import {
  Operation,
  OperationStatus,
  OperationType,
  OperationOptions,
  RollOperation,
  TransferOperation,
} from '../../operation'
import {
  getAbsoluteExpirePeriod,
  OperationManager,
} from '../../operation/operationManager'
import { formatNodeStatusObject } from '../../client/formatObjects'

export class Web3Provider extends SCProvider implements Provider {
  static fromRPCUrl(url: string, account: Account): Web3Provider {
    return new Web3Provider(new JsonRPCClient(url), account)
  }

  static mainnet(account: Account): Web3Provider {
    return Web3Provider.fromRPCUrl(PublicApiUrl.Mainnet, account)
  }

  static buildnet(account: Account): Web3Provider {
    return Web3Provider.fromRPCUrl(PublicApiUrl.Buildnet, account)
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

  async networkInfos(): Promise<Network> {
    const chainId = await this.client.getChainId()
    let name = 'Unknown'
    if (chainId === CHAIN_ID.Mainnet) {
      name = NetworkName.Mainnet
    } else if (chainId === CHAIN_ID.Buildnet) {
      name = NetworkName.Buildnet
    }

    return {
      name,
      chainId,
      url: this.client.url,
      minimalFee: await this.client.getMinimalFee(),
    }
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

  public async getOperationStatus(opId: string): Promise<OperationStatus> {
    return this.client.getOperationStatus(opId)
  }

  public async getEvents(filter: EventFilter): Promise<t.OutputEvents> {
    return this.client.getEvents(filter)
  }

  public async getNodeStatus(): Promise<NodeStatusInfo> {
    const status = await this.client.status()
    return formatNodeStatusObject(status)
  }
}
