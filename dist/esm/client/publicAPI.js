/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-non-null-assertion */
import { Mas, strToBytes } from '../basicElements';
import { MassaOpenRPCSpecification, } from '../generated/client';
import { MAX_GAS_CALL } from '../smartContracts';
import { OperationStatus } from '../operation';
import { DEFAULT_RETRY_OPTS, withRetry } from './retry';
import isEqual from 'lodash.isequal';
export class PublicAPI {
    options;
    connector;
    lastStatus;
    // eslint-disable-next-line max-params
    constructor(transport, host, port, opts = {}, options = {}) {
        this.options = options;
        this.connector = new MassaOpenRPCSpecification({
            transport: {
                type: transport,
                host,
                port,
                path: opts.path,
                protocol: opts.protocol,
            },
        });
        if (!this.options.retry) {
            this.options.retry = DEFAULT_RETRY_OPTS;
        }
    }
    async executeReadOnlyBytecode(readOnlyBytecodeExecution) {
        return withRetry(() => this.connector.execute_read_only_bytecode([readOnlyBytecodeExecution]), this.options.retry).then((r) => r[0]);
    }
    async executeMultipleReadOnlyBytecode(readOnlyBytecodeExecutions) {
        return withRetry(() => this.connector.execute_read_only_bytecode(readOnlyBytecodeExecutions), this.options.retry);
    }
    async executeReadOnlyCall(params) {
        const [res] = await withRetry(() => this.connector.execute_read_only_call([
            {
                max_gas: Number(params.maxGas ?? MAX_GAS_CALL),
                target_address: params.target,
                target_function: params.func,
                parameter: Array.from(params.parameter),
                caller_address: params.caller,
                coins: params.coins ? Mas.toString(params.coins) : null,
                fee: params.fee ? Mas.toString(params.fee) : null,
            },
        ]), this.options.retry);
        if (!res) {
            throw new Error('No result returned from execute_read_only_call');
        }
        return {
            // @ts-expect-error - wrong type returned by the API interface
            value: new Uint8Array(res.result.Ok),
            info: {
                gasCost: res.gas_cost,
                error: res.result.Error,
                events: res.output_events,
                stateChanges: {
                    ledgerChanges: res.state_changes.ledger_changes,
                    asyncPoolChanges: res.state_changes.async_pool_changes,
                    posChanges: res.state_changes.pos_changes,
                    executedOpsChanges: res.state_changes.executed_ops_changes,
                    executedDenunciationsChanges: res.state_changes.executed_denunciations_changes,
                    executionTrailHashChange: res.state_changes.execution_trail_hash_change,
                },
            },
        };
    }
    async executeMultipleReadOnlyCall(readOnlyCalls) {
        return withRetry(() => this.connector.execute_read_only_call(readOnlyCalls), this.options.retry);
    }
    async getAddressInfo(address) {
        return this.getMultipleAddressInfo([address]).then((r) => r[0]);
    }
    async getBalance(address, final = true) {
        return this.getAddressInfo(address).then((r) => {
            return Mas.fromString(final ? r.final_balance : r.candidate_balance);
        });
    }
    async getMultipleAddressInfo(addresses) {
        return withRetry(() => this.connector.get_addresses(addresses), this.options.retry);
    }
    async getAddressesBytecode(addressFilter) {
        return withRetry(() => this.connector.get_addresses_bytecode([addressFilter]), this.options.retry).then((r) => r[0]);
    }
    async executeMultipleGetAddressesBytecode(addressFilters) {
        return withRetry(() => this.connector.get_addresses_bytecode(addressFilters), this.options.retry);
    }
    async getBlock(blockId) {
        return withRetry(() => this.connector.get_blocks([blockId]), this.options.retry).then((r) => r[0]);
    }
    // todo should return an array of blockInfo, right?
    async getMultipleBlocks(blockIds) {
        return withRetry(() => this.connector.get_blocks(blockIds), this.options.retry);
    }
    async getBlockcliqueBlock(slot) {
        return withRetry(() => this.connector.get_blockclique_block_by_slot(slot), this.options.retry);
    }
    async getCliques() {
        return withRetry(() => this.connector.get_cliques(), this.options.retry);
    }
    async getDataStoreKeys(contract, filter = new Uint8Array(), final = true) {
        const addrInfo = await this.getAddressInfo(contract);
        const keys = final
            ? addrInfo.final_datastore_keys
            : addrInfo.candidate_datastore_keys;
        return keys
            .filter((key) => !filter.length ||
            isEqual(Uint8Array.from(key.slice(0, filter.length)), filter))
            .map((key) => Uint8Array.from(key));
    }
    async getDatastoreEntries(inputs, final = true) {
        const entriesQuery = inputs.map((entry) => {
            const byteKey = typeof entry.key === 'string' ? strToBytes(entry.key) : entry.key;
            return {
                key: Array.from(byteKey),
                address: entry.address,
            };
        });
        const res = await withRetry(() => this.connector.get_datastore_entries(entriesQuery), this.options.retry);
        return res.map((r) => Uint8Array.from(final ? r.final_value : r.candidate_value));
    }
    async getDatastoreEntry(key, address, final = true) {
        return this.getDatastoreEntries([{ key, address }], final).then((r) => r[0]);
    }
    async getSlotTransfers(slot) {
        return withRetry(() => this.connector.get_slots_transfers([slot]), this.options.retry).then((r) => r[0]);
    }
    async getMultipleSlotTransfers(slots) {
        return withRetry(() => this.connector.get_slots_transfers(slots), this.options.retry);
    }
    async getEndorsement(endorsementId) {
        return this.getMultipleEndorsements([endorsementId]).then((r) => r[0]);
    }
    async getMultipleEndorsements(endorsementIds) {
        return withRetry(() => this.connector.get_endorsements(endorsementIds), this.options.retry);
    }
    async getEvents(filter) {
        const formattedFilter = {
            start: filter.start,
            end: filter.end,
            emitter_address: filter.smartContractAddress,
            original_caller_address: filter.callerAddress,
            original_operation_id: filter.operationId,
            is_final: filter.isFinal,
            is_error: filter.isError,
        };
        return withRetry(() => this.connector.get_filtered_sc_output_event(formattedFilter), this.options.retry);
    }
    async getGraphInterval(start, end) {
        return withRetry(() => this.connector.get_graph_interval({ start, end }), this.options.retry);
    }
    async getOperations(operationIds) {
        return withRetry(() => this.connector.get_operations(operationIds), this.options.retry);
    }
    async getOperation(operationId) {
        return this.getOperations([operationId]).then((r) => r[0]);
    }
    async getOperationStatus(operationId) {
        const op = await this.getOperation(operationId);
        if (op.op_exec_status === null) {
            if (op.is_operation_final === null) {
                return OperationStatus.NotFound;
            }
            throw new Error('unexpected status');
        }
        if (op.in_pool) {
            return OperationStatus.PendingInclusion;
        }
        if (!op.is_operation_final) {
            return op.op_exec_status
                ? OperationStatus.SpeculativeSuccess
                : OperationStatus.SpeculativeError;
        }
        return op.op_exec_status ? OperationStatus.Success : OperationStatus.Error;
    }
    // todo rename PageRequest pagination
    async getStakers(pagination) {
        return withRetry(() => this.connector.get_stakers(pagination), this.options.retry);
    }
    async status() {
        this.lastStatus = await withRetry(() => this.connector.get_status(), this.options.retry);
        return this.lastStatus;
    }
    async getMinimalFee() {
        if (!this.lastStatus) {
            await this.status();
        }
        if (!this.lastStatus.minimal_fees) {
            throw new Error('minimal fees: not available');
        }
        return Mas.fromString(this.lastStatus.minimal_fees);
    }
    async getChainId() {
        if (!this.lastStatus) {
            await this.status();
        }
        return BigInt(this.lastStatus.chain_id);
    }
    async fetchPeriod() {
        const status = await this.status();
        if (!status.last_slot) {
            throw new Error('last slot: not available');
        }
        return status.last_slot.period;
    }
    async getCurrentSlot() {
        const { last_slot } = await this.status();
        return last_slot;
    }
    static convertOperationInput(data) {
        return {
            serialized_content: Array.from(data.data),
            creator_public_key: data.publicKey,
            signature: data.signature,
        };
    }
    async sendOperation(data) {
        return this.sendOperations([data]).then((r) => r[0]);
    }
    async sendOperations(data) {
        return this.sendMultipleOperations(data.map((e) => PublicAPI.convertOperationInput(e)));
    }
    async sendMultipleOperations(data) {
        return withRetry(() => this.connector.send_operations(data), this.options.retry);
    }
}
//# sourceMappingURL=publicAPI.js.map