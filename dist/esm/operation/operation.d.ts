import { SCEvent } from '../client';
import { Provider } from '../provider';
import { OperationStatus } from './types';
/**
 * An operation object.
 */
export declare class Operation {
    provider: Provider;
    id: string;
    constructor(provider: Provider, id: string);
    /**
     * Gets the status of the operation.
     *
     * @returns The status of the operation.
     */
    getStatus(): Promise<OperationStatus>;
    /**
     * Waits for the operation to reach a specific status.
     *
     * @param exitThreshold - The minimal status to wait for.
     * @param timeout - The maximum time to wait.
     * @param period - The time interval to check the status.
     *
     * @returns The status of the operation or NotFound if the timeout is reached.
     */
    private wait;
    /**
     * Waits for the operation to be included in a block.
     *
     * @param timeout - The maximum time to wait.
     * @param period - The time interval to check the status.
     *
     * @returns The status of the operation or NotFound if the timeout is reached.
     */
    waitSpeculativeExecution(timeout?: number, period?: number): Promise<OperationStatus>;
    /**
     * Waits for the block containing the operation to be final.
     *
     * @param timeout - The maximum time to wait.
     * @param period - The time interval to check the status.
     *
     * @returns The status of the operation or NotFound if the timeout is reached.
     */
    waitFinalExecution(timeout?: number, period?: number): Promise<OperationStatus>;
    /**
     * Gets the events of the operation once the block reaches the final state.
     *
     * @returns The events of the operation.
     */
    getFinalEvents(): Promise<SCEvent[]>;
    /**
     * Gets the events of the speculative execution of the operation.
     *
     * @returns The speculative events of the operation.
     */
    getSpeculativeEvents(): Promise<SCEvent[]>;
    getDeployedAddress(waitFinal?: boolean): Promise<string>;
}
