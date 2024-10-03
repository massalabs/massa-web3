import { Args, ArrayTypes } from '../basicElements';
import { rawEventDecode } from '../utils';
import { OperationStatus } from './types';
const DEFAULT_WAIT_TIMEOUT_MS = 60000;
const DEFAULT_WAIT_PERIOD_MS = 500;
/**
 * An operation object.
 */
export class Operation {
    provider;
    id;
    constructor(provider, id) {
        this.provider = provider;
        this.id = id;
    }
    /**
     * Gets the status of the operation.
     *
     * @returns The status of the operation.
     */
    async getStatus() {
        return this.provider.getOperationStatus(this.id);
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
    wait(exitThreshold, timeout = DEFAULT_WAIT_TIMEOUT_MS, period = DEFAULT_WAIT_PERIOD_MS) {
        return new Promise((resolve) => {
            // eslint-disable-next-line @typescript-eslint/no-magic-numbers
            let elapsedTime = 0;
            const checkStatusInterval = setInterval(async () => {
                const currentStatus = await this.getStatus();
                if (currentStatus >= exitThreshold) {
                    clearInterval(checkStatusInterval);
                    resolve(currentStatus);
                }
                else if (elapsedTime >= timeout) {
                    clearInterval(checkStatusInterval);
                    resolve(OperationStatus.NotFound);
                }
                elapsedTime += period;
            }, period);
        });
    }
    /**
     * Waits for the operation to be included in a block.
     *
     * @param timeout - The maximum time to wait.
     * @param period - The time interval to check the status.
     *
     * @returns The status of the operation or NotFound if the timeout is reached.
     */
    async waitSpeculativeExecution(timeout, period) {
        return this.wait(OperationStatus.SpeculativeSuccess, timeout, period);
    }
    /**
     * Waits for the block containing the operation to be final.
     *
     * @param timeout - The maximum time to wait.
     * @param period - The time interval to check the status.
     *
     * @returns The status of the operation or NotFound if the timeout is reached.
     */
    async waitFinalExecution(timeout, period) {
        return this.wait(OperationStatus.Success, timeout, period);
    }
    /**
     * Gets the events of the operation once the block reaches the final state.
     *
     * @returns The events of the operation.
     */
    async getFinalEvents() {
        if ((await this.waitFinalExecution()) === OperationStatus.NotFound) {
            return Promise.reject(new Error('Operation not found'));
        }
        return this.provider.getEvents({ operationId: this.id, isFinal: true });
    }
    /**
     * Gets the events of the speculative execution of the operation.
     *
     * @returns The speculative events of the operation.
     */
    async getSpeculativeEvents() {
        if ((await this.waitSpeculativeExecution()) === OperationStatus.NotFound) {
            return Promise.reject(new Error('Operation not found'));
        }
        return this.provider.getEvents({ operationId: this.id, isFinal: false });
    }
    async getDeployedAddress(waitFinal = false) {
        const events = waitFinal
            ? await this.getFinalEvents()
            : await this.getSpeculativeEvents();
        const lastEvent = events.at(-1);
        if (!lastEvent) {
            throw new Error('no event received.');
        }
        if (lastEvent.context.is_error) {
            const parsedData = JSON.parse(lastEvent.data);
            throw new Error(parsedData.massa_execution_error);
        }
        const contracts = new Args(rawEventDecode(lastEvent.data)).nextArray(ArrayTypes.STRING);
        return contracts[0];
    }
}
//# sourceMappingURL=operation.js.map