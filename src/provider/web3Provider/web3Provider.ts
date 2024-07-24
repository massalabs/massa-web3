// a Web3Provider is the combination of a clientAPI and an private key account
import { Provider } from '..'
import {
  Account,
  Address,
  JsonRPCClient,
  getAbsoluteExpirePeriod,
  Operation,
  OperationManager,
  OperationType,
  OptOpDetails,
  RollOperation,
  TransferOperation,
  PublicApiUrl,
} from '../..'
import { Mas } from '../../basicElements/mas'
import { SCProvider } from '.'

export class Web3Provider extends SCProvider implements Provider {
  static fromRPCUrl(url: string, account: Account): Web3Provider {
    return new Web3Provider(new JsonRPCClient(url), account)
  }

  static newPublicMainnetProvider(account: Account): Web3Provider {
    return Web3Provider.fromRPCUrl(PublicApiUrl.Mainnet, account)
  }

  static newPublicBuildnetProvider(account: Account): Web3Provider {
    return Web3Provider.fromRPCUrl(PublicApiUrl.Buildnet, account)
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly _accountName: string = 'Massa web3 account'
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly _providerName: string = 'Massa web3 provider'

  get accountName(): string {
    return this._accountName
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
    opts?: OptOpDetails
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

    return await operation.send(details)
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
  async buyRolls(amount: Mas, opts?: OptOpDetails): Promise<Operation> {
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
  async sellRolls(amount: Mas, opts?: OptOpDetails): Promise<Operation> {
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
    opts?: OptOpDetails
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

    return await operation.send(details)
  }

  // async sign(data: Buffer | Uint8Array | string): Promise<void> {
  //   throw new Error("not implemented")
  // }
}
