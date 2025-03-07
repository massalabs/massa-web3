import { AsyncPoolChangesFilter, ExecutedDenounciationFilter, ExecutedOpsChangesFilter, ExecutionEventFilter, LedgerChangesFilter, NewSlotExecutionOutputsFilter } from "../../generated/grpc/apis/massa/api/v1/public_pb"
import { Empty } from "../../generated/grpc/massa/model/v1/commons_pb";
import { AsyncPoolChangeType, ExecutionOutputStatus } from "../../generated/grpc/massa/model/v1/execution_pb"
import { SlotRange } from "../../generated/grpc/massa/model/v1/slot_pb"

export class FilterBuilder {
    private filters: NewSlotExecutionOutputsFilter[] = []

    addStatus(status: ExecutionOutputStatus): FilterBuilder {
        const filter = new NewSlotExecutionOutputsFilter();
        filter.setStatus(status);
        this.filters.push(filter);
        return this;
    }

    addSlotRange(slotRange: SlotRange): FilterBuilder {
        const filter = new NewSlotExecutionOutputsFilter();
        filter.setSlotRange(slotRange);
        this.filters.push(filter);
        return this;
    }

    addAsyncPoolChangesFilter(filter: {
        empty?: boolean
        type?: AsyncPoolChangeType
        handler?: string
        destinationAddress?: string
        emitterAddress?: string
        canBeExecuted?: boolean
    }): FilterBuilder {

        if (filter.empty) {
            const filter = new NewSlotExecutionOutputsFilter();
            filter.setAsyncPoolChangesFilter(new AsyncPoolChangesFilter().setNone(new Empty()));
            this.filters.push(filter);
            // return if empty
            return this;
        }

        if (filter.type) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setAsyncPoolChangesFilter(new AsyncPoolChangesFilter().setType(filter.type));
            this.filters.push(filterOut);
        }


        if (filter.handler) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setAsyncPoolChangesFilter(new AsyncPoolChangesFilter().setHandler(filter.handler));
            this.filters.push(filterOut);
        }

        if (filter.destinationAddress) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setAsyncPoolChangesFilter(new AsyncPoolChangesFilter().setDestinationAddress(filter.destinationAddress));
            this.filters.push(filterOut);
        }


        if (filter.emitterAddress) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setAsyncPoolChangesFilter(new AsyncPoolChangesFilter().setEmitterAddress(filter.emitterAddress));
            this.filters.push(filterOut);
        }


        if (filter.canBeExecuted !== undefined) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setAsyncPoolChangesFilter(new AsyncPoolChangesFilter().setCanBeExecuted(filter.canBeExecuted));
            this.filters.push(filterOut);
        }

        return this
    }

    addEmptyExecutedDenounciationFilter(): FilterBuilder {
        const filter = new NewSlotExecutionOutputsFilter();
        filter.setExecutedDenounciationFilter(new ExecutedDenounciationFilter().setNone(new Empty()));
        this.filters.push(filter);
        return this;
    }

    addEventFilter(filter: {
        empty?: boolean
        callerAddress?: string
        emitterAddress?: string
        originalOperationId?: string
        isFailure?: boolean
    }): FilterBuilder {
        if (filter.empty) {
            const filter = new NewSlotExecutionOutputsFilter();
            filter.setEventFilter(new ExecutionEventFilter().setNone(new Empty()));
            this.filters.push(filter);
            return this;
        }

        if (filter.callerAddress) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setEventFilter(new ExecutionEventFilter().setCallerAddress(filter.callerAddress));
            this.filters.push(filterOut);
        }


        if (filter.emitterAddress) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setEventFilter(new ExecutionEventFilter().setEmitterAddress(filter.emitterAddress));
            this.filters.push(filterOut);
        }

        if (filter.originalOperationId) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setEventFilter(new ExecutionEventFilter().setOriginalOperationId(filter.originalOperationId));
            this.filters.push(filterOut);
        }


        if (filter.isFailure !== undefined) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setEventFilter(new ExecutionEventFilter().setIsFailure(filter.isFailure));
            this.filters.push(filterOut);
        }

        return this
    }

    addExecutedOpsChangesFilter(filter: {
        empty?: boolean
        operationId?: string
    }): FilterBuilder {
        if (filter.empty) {
            const filter = new NewSlotExecutionOutputsFilter();
            filter.setExecutedOpsChangesFilter(new ExecutedOpsChangesFilter().setNone(new Empty()));
            this.filters.push(filter);
            return this;
        }

        if (filter.operationId) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setExecutedOpsChangesFilter(new ExecutedOpsChangesFilter().setOperationId(filter.operationId));
            this.filters.push(filterOut);
        }

        return this
    }

    addLedgerChangesFilter(filter: {
        empty?: boolean
        address?: string
    }): FilterBuilder {
        if (filter.empty) {
            const filter = new NewSlotExecutionOutputsFilter();
            filter.setLedgerChangesFilter(new LedgerChangesFilter().setNone(new Empty()));
            this.filters.push(filter);
            return this;
        }

        if (filter.address) {
            const filterOut = new NewSlotExecutionOutputsFilter();
            filterOut.setLedgerChangesFilter(new LedgerChangesFilter().setAddress(filter.address));
            this.filters.push(filterOut);
        }

        return this
    }

    build(): NewSlotExecutionOutputsFilter[] {
        return this.filters
    }
}
