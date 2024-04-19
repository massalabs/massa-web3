import { Account } from "./account"
import { Address, Operation, OperationManager, OperationType, OptOpDetails, RollOperation, TransferOperation, calculateExpirePeriod } from "./basicElements"
import { BlockchainClient } from "./client"


/**
 * A class regrouping all the account operations.
 */
export class AccountOperation {

    constructor(public account: Account, public client: BlockchainClient) {}
  
    private async rollOperation( amount: number, opts?: OptOpDetails): Promise<string> {
      const operation = new OperationManager(this.account.privateKey, this.client)
      const details: RollOperation = {
        // Todo: change with fetchMinimalFees once ready
        fee: opts?.fee || 0,
        expirePeriod: await calculateExpirePeriod(this.client, opts?.periodToLive),
        type: amount > 0 ? OperationType.RollBuy : OperationType.RollSell,
        amount: Math.abs(amount),
      }
  
      return operation.send(details)
    }
  
    /**
     * Buys rolls.
     * 
     * @param client - The client to connect to the desired blockchain.
     * @param amount - The number of rolls to buy.
     * @param opts - Optional operation details.
     * 
     * @returns The ID of the operation.
     * @throws If the amount of rolls is not a positive non-zero value.
     */
    async buyRolls(client: BlockchainClient, amount: number, opts?: OptOpDetails): Promise<string> {
      if (amount <= 0) {
        throw new Error('amount of rolls must be a positive non-zero value.')
      }
      return this.rollOperation(amount, opts)
    }
    
    /**
     * Sells rolls.
     * 
     * @param client - The client to connect to the desired blockchain.
     * @param amount - The number of rolls to sell.
     * @param opts - Optional operation details.
     * 
     * @returns The ID of the operation.
     * @throws If the amount of rolls is not a positive non-zero value.
     */
    async sellRolls(client: BlockchainClient, amount: number, opts?: OptOpDetails): Promise<Operation> {
      if (amount <= 0) {
        throw new Error('amount of rolls must be a positive non-zero value.')
      }
      return new Operation(this.client, await this.rollOperation(-amount, opts))
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
    async transfer(to: Address | string, amount: number, opts?: OptOpDetails): Promise<Operation> {
      if (amount <= 0) {
        throw new Error('amount to trasnfer must be a positive non-zero value.')
      }

      if (typeof to === 'string') {
        to = Address.fromString(to)
      }
  
      const operation = new OperationManager(this.account.privateKey, this.client)
      const details: TransferOperation = {
        // Todo: change with fetchMinimalFees once ready
        fee: opts?.fee || 0,
        expirePeriod: await calculateExpirePeriod(this.client, opts?.periodToLive),
        type: OperationType.Transaction,
        amount: amount,
        recipientAddress: to,
      }
  
      return new Operation(this.client, await operation.send(details))
    }

    /**
     * Fetches the balance of the account.
     * 
     * @param speculative - Whether to fetch the speculative balance. Default is the final balance.
     * 
     * @returns The balance of the account.
     */
    async fetchBalance(speculative: boolean = false): Promise<number> {
      return this.client.getBalance(this.account.address.toString(), speculative)
    }
  }