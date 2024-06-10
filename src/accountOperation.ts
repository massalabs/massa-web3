import { Account } from './account'
import {
  Address,
  Operation,
  OperationManager,
  OperationType,
  OptOpDetails,
  RollOperation,
  TransferOperation,
  calculateExpirePeriod,
} from './basicElements'
import { Mas } from './basicElements/mas'
import { BlockchainClient } from './client'

/**
 * A class regrouping all the account operations.
 */
export class AccountOperation {
  constructor(
    public account: Account,
    public client: BlockchainClient
  ) {}

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
      expirePeriod: calculateExpirePeriod(
        await this.client.fetchPeriod(),
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
      throw new Error('amount to trasnfer must be a positive non-zero value.')
    }

    if (typeof to === 'string') {
      to = Address.fromString(to)
    }

    const operation = new OperationManager(this.account.privateKey, this.client)
    const details: TransferOperation = {
      fee: opts?.fee ?? (await this.client.getMinimalFee()),
      expirePeriod: calculateExpirePeriod(
        await this.client.fetchPeriod(),
        opts?.periodToLive
      ),
      type: OperationType.Transaction,
      amount,
      recipientAddress: to,
    }

    return await operation.send(details)
  }

  /**
   * Fetches the balance of the account.
   *
   * @param speculative - Whether to fetch the speculative balance. Default is the final balance.
   *
   * @returns The balance of the account.
   */
  async fetchBalance(final = true): Promise<Mas> {
    return this.client.getBalance(this.account.address.toString(), final)
  }
}
