import { SCOutputEvent } from '../client'
import { BlockchainClient } from '../client'

/**
 * An operation object.
 */
export class Operation {
  constructor(
    public client: BlockchainClient,
    public id: string
  ) {}

  async getStatus(): Promise<OperationStatus> {
    return await this.client.getOperationStatus(this.id)
  }

  async waitSpeculativeExecution(): Promise<OperationStatus> {
    throw new Error('Not implemented')
  }

  async waitFinalExecution(): Promise<OperationStatus> {
    throw new Error('Not implemented')
  }

  async getFinalEvents(): Promise<SCOutputEvent[]> {
    throw new Error('Not implemented')
  }

  async getSpeculativeEvents(): Promise<SCOutputEvent[]> {
    throw new Error('Not implemented')
  }
}

/**
 * Operation status.
 *
 * @remarks
 * This enumeration captures the lifecycle stages of a blockchain operation, from initiation to finalization.
 */
export enum OperationStatus {
  /**
   * The operation has been recognized and is awaiting inclusion in the blockchain ledger.
   */
  PendingInclusion,

  /**
   * The operation has executed successfully; however, the block containing it has not yet been confirmed as final.
   */
  SpeculativeSuccess,

  /**
   * The operation has failed; however, the block containing the failure has not yet been confirmed as final.
   */
  SpeculativeError,

  /**
   * The operation has executed successfully and the block containing it has been confirmed as final.
   */
  Success,

  /**
   * The operation has failed and the block containing the failure has been confirmed as final.
   */
  Error,

  /**
   * The operation has not been found within the blockchain, either because it is not yet processed or does not exist.
   */
  NotFound,
}
