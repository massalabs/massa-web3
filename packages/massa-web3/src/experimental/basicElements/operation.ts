import { EventFilter, SCOutputEvent } from '../client'
import { BlockchainClient } from '../client'

/**
 * An operation object.
 */
export class Operation {
  constructor(
    public client: BlockchainClient,
    public id: string
  ) {}

  /**
   * Gets the status of the operation.
   *
   * @returns The status of the operation.
   */
  async getStatus(): Promise<OperationStatus> {
    return await this.client.getOperationStatus(this.id)
  }

  /**
   * Waits for the operation to reach a specific status.
   *
   * @param exitThreshold - The minimal status to wait for.
   * @param timeout - The maximum time to wait.
   * @param period - The time interval to check the status.
   *
   * @returns The status of the operation or NotFound if the timeout is reached.
   */
  private wait(
    exitThreshold: OperationStatus,
    timeout: number = 60000,
    period: number = 500
  ): Promise<OperationStatus> {
    return new Promise<OperationStatus>((resolve) => {
      let elapsedTime = 0
      const checkStatusInterval = setInterval(async () => {
        const currentStatus = await this.getStatus()
        if (currentStatus >= exitThreshold) {
          clearInterval(checkStatusInterval)
          resolve(currentStatus)
        } else if (elapsedTime >= timeout) {
          clearInterval(checkStatusInterval)
          resolve(OperationStatus.NotFound)
        }
        elapsedTime += period
      }, period)
    })
  }

  /**
   * Waits for the operation to be included in a block.
   *
   * @param timeout - The maximum time to wait.
   * @param period - The time interval to check the status.
   *
   * @returns The status of the operation or NotFound if the timeout is reached.
   */
  async waitSpeculativeExecution(
    timeout?: number,
    period?: number
  ): Promise<OperationStatus> {
    return this.wait(OperationStatus.SpeculativeSuccess, timeout, period)
  }

  /**
   * Waits for the block containing the operation to be final.
   *
   * @param timeout - The maximum time to wait.
   * @param period - The time interval to check the status.
   *
   * @returns The status of the operation or NotFound if the timeout is reached.
   */
  async waitFinalExecution(
    timeout?: number,
    period?: number
  ): Promise<OperationStatus> {
    return this.wait(OperationStatus.Success, timeout, period)
  }

  /**
   * Gets the events of the operation once the block reaches the final state.
   *
   * @returns The events of the operation.
   */
  async getFinalEvents(): Promise<SCOutputEvent[]> {
    if ((await this.waitFinalExecution()) === OperationStatus.NotFound) {
      return Promise.reject(new Error('Operation not found'))
    }

    const filter = {
      operationId: this.id,
      isFinal: true,
    } as EventFilter

    return this.client.getEvents(filter)
  }

  /**
   * Gets the events of the speculative execution of the operation.
   *
   * @returns The speculative events of the operation.
   */
  async getSpeculativeEvents(): Promise<SCOutputEvent[]> {
    if ((await this.waitSpeculativeExecution()) === OperationStatus.NotFound) {
      return Promise.reject(new Error('Operation not found'))
    }

    const filter = {
      operationId: this.id,
      isFinal: false,
    } as EventFilter

    return this.client.getEvents(filter)
  }
}

/**
 * Operation status.
 *
 * @remarks
 * This enumeration captures the lifecycle stages of a blockchain operation, from initiation to finalization.
 *
 * @privateRemarks
 * Keeps the order of the stages in the lifecycle as it is used by the wait method.
 */
export enum OperationStatus {
  /**
   * The operation has not been found within the blockchain, either because it is not yet processed or does not exist.
   */
  NotFound,

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
}
